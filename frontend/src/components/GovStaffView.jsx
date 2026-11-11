import { useState, useEffect } from 'react';
import {
  Building2, CheckCircle2, Clock, ShieldAlert, Camera, Send, RefreshCw, Filter,
  Link2, History, AlertTriangle, ArrowRight, UserCheck, Layers, ChevronRight, QrCode,
  Download, Printer, Plus, X, Tag, ArrowRightLeft, Check
} from 'lucide-react';
import { api } from '../services/api';
import { ALL_CIVIC_DEPARTMENTS, DEPARTMENT_OFFICER_ROLES } from '../data/civicDepartments';
import { CATEGORY_TAXONOMY } from './CitizenView';
import { t, translateCategory } from '../services/translations';
import QRScannerModal from './QRScannerModal';
import { generateQRCodeDataURL } from '../services/qrService';
import { getOfficerAssignedDepts } from '../services/officersService';
export { DEPARTMENT_OFFICER_ROLES };

export default function GovStaffView({ currentUser, speakText, language = 'English' }) {
  const [activeDept, setActiveDept] = useState(currentUser?.departmentId || 'dept-roads');
  const [complaints, setComplaints] = useState([]);
  const [activeComplaint, setActiveComplaint] = useState(null);
  const [routingHistoryComplaint, setRoutingHistoryComplaint] = useState(null);
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [resolutionPhoto, setResolutionPhoto] = useState(null);
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedModuleFilter, setSelectedModuleFilter] = useState('');
  const [isGovQRScannerOpen, setIsGovQRScannerOpen] = useState(false);
  const [onSiteVerificationCode, setOnSiteVerificationCode] = useState('');
  const [switchNotice, setSwitchNotice] = useState(null);

  // Determine authorized departments for this official
  const assignedDeptIds = currentUser?.assignedDepartments || getOfficerAssignedDepts(currentUser);
  const isConcurrentActive = activeDept !== (currentUser?.departmentId || 'dept-roads');

  // Handle department workbench switch
  const handleSwitchDepartment = (targetDeptId) => {
    setActiveDept(targetDeptId);
    const targetDept = ALL_CIVIC_DEPARTMENTS.find(d => d.id === targetDeptId) || ALL_CIVIC_DEPARTMENTS[0];
    const notice = `Active Desk Switched to ${targetDept.name}. Complaint queue, SLA timers, and action modules updated.`;
    setSwitchNotice(notice);
    setTimeout(() => setSwitchNotice(null), 5000);
    if (speakText) {
      speakText(`Active working desk switched to ${targetDept.name}.`);
    }
  };

  // Department Officer Asset QR Code Generator state
  const [showQRGeneratorModal, setShowQRGeneratorModal] = useState(false);
  const [qrAssetModule, setQrAssetModule] = useState('');
  const [qrAssetName, setQrAssetName] = useState('');
  const [qrAssetLocation, setQrAssetLocation] = useState('Ward 12 Municipal Infrastructure, Kalaburagi');
  const [generatedDeptQr, setGeneratedDeptQr] = useState(null);

  const currentDeptObj = ALL_CIVIC_DEPARTMENTS.find(d => d.id === activeDept) || ALL_CIVIC_DEPARTMENTS[0];
  const deptDomain = currentDeptObj?.domain || activeDept.replace('dept-', '');
  const deptModules = CATEGORY_TAXONOMY.filter(cat => cat.moduleId === deptDomain);

  useEffect(() => {
    loadDeptComplaints();
    setSelectedModuleFilter('');
    if (deptModules.length > 0) {
      setQrAssetModule(deptModules[0].id);
      setQrAssetName(deptModules[0].name);
    }
  }, [activeDept]);

  const handleGenerateDeptQR = async () => {
    const assetNum = Math.floor(100 + Math.random() * 900);
    const assetId = `ASSET-WARD12-${deptDomain.toUpperCase()}-${assetNum}`;
    const selectedModObj = deptModules.find(m => m.id === qrAssetModule) || deptModules[0];
    const categoryKey = selectedModObj?.id || qrAssetModule || `${deptDomain}_general`;
    const assetLabel = qrAssetName || selectedModObj?.name || 'Department Infrastructure';

    // Structured payload for instant pre-routing to this officer
    const payload = `CIVIC_ASSET|${deptDomain}|${categoryKey}|${assetId}|${qrAssetLocation}|Ward 12|${assetLabel}`;
    const dataUrl = await generateQRCodeDataURL(payload, { width: 340 });

    setGeneratedDeptQr({
      id: assetId,
      domain: deptDomain,
      domainName: currentDeptObj.name,
      category: selectedModObj?.name || qrAssetModule,
      assetName: assetLabel,
      location: qrAssetLocation,
      dataUrl,
      officer: currentUser?.name || currentDeptObj.officer,
      createdAt: new Date().toLocaleDateString()
    });
    if (speakText) speakText(`Official municipal QR sticker created for ${assetId}. Ready to print and stick on government property.`);
  };

  const loadDeptComplaints = async () => {
    try {
      const res = await api.getComplaints();
      if (res.success && res.data) {
        const domainKey = currentDeptObj?.domain || activeDept.replace('dept-', '');
        const matched = res.data.filter(c => {
          if (c.departmentId === activeDept) return true;
          if (c.coRoutedDepartments?.includes(activeDept)) return true;
          if (c.domain === domainKey) return true;
          if (domainKey === 'waste' && (c.domain === 'waste' || c.domain === 'civic')) return true;
          if (domainKey === 'corruption' && (c.domain === 'corruption' || c.category?.toLowerCase().includes('bribe') || c.category?.toLowerCase().includes('corruption'))) return true;
          if (domainKey === 'emergency' && (c.domain === 'emergency' || c.category?.startsWith('emergency_'))) return true;
          if (domainKey === 'safety' && (c.domain === 'safety' || c.category?.startsWith('safety_'))) return true;
          return false;
        });
        setComplaints(matched);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    const res = await api.updateComplaintStatus(id, status, resolutionNotes, currentUser?.uid || `usr-staff-${deptDomain}`);
    if (res.success) {
      speakText(`Issue ${id} status updated to ${status}. Action logged by ${t(`domain_${deptDomain}`, language) || currentDeptObj.name}.`);
      setActiveComplaint(null);
      setResolutionNotes('');
      setResolutionPhoto(null);
      loadDeptComplaints();
    }
  };

  const getModuleTicketCount = (modName, modKey, modId) => {
    return complaints.filter(c => {
      if (c.category === modName) return true;
      if (c.categoryKey === modKey) return true;
      if (c.categoryId === modId) return true;
      if (c.category && modName && c.category.toLowerCase().includes(modName.toLowerCase())) return true;
      return false;
    }).length;
  };

  const filtered = complaints.filter(c => {
    if (filterStatus && c.status !== filterStatus) return false;
    if (selectedModuleFilter) {
      const matchesMod = 
        c.category === selectedModuleFilter || 
        c.categoryKey === selectedModuleFilter || 
        c.categoryId === selectedModuleFilter ||
        (c.category && c.category.toLowerCase().includes(selectedModuleFilter.toLowerCase()));
      if (!matchesMod) return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Active Desk Switch Notification Toast/Banner */}
      {switchNotice && (
        <div className="p-4 bg-gradient-to-r from-emerald-900 to-slate-900 text-white rounded-2xl border-2 border-emerald-400 shadow-lg text-xs font-bold flex justify-between items-center animate-in fade-in slide-in-from-top-2 duration-300 font-outfit">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{switchNotice}</span>
          </div>
          <button
            type="button"
            onClick={() => setSwitchNotice(null)}
            className="text-emerald-300 hover:text-white underline text-xs"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Government Authority Header */}
      <div className="ethnic-card p-6 rounded-3xl bg-gradient-to-r from-amber-900 via-slate-900 to-indigo-950 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-2 border-amber-400 font-outfit">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-amber-300 font-bold text-xs uppercase tracking-wider mb-1 font-cinzel">
            <Building2 className="w-4 h-4 text-amber-400" />
            <span>{t('tabStaff', language) || 'Government Officers Portal'} • {t('govPortalConsole', language) || 'Dedicated Department Console'}</span>
            {isConcurrentActive && (
              <span className="bg-amber-500 text-slate-950 font-bold px-2 py-0.5 rounded-full text-[10px] uppercase font-mono tracking-normal animate-pulse">
                ⚡ Concurrent Desk
              </span>
            )}
          </div>
          <h2 className="text-2xl font-black font-cinzel text-white flex items-center gap-2">
            <span>{currentDeptObj.icon}</span>
            <span>{t(`domain_${deptDomain}`, language) || currentDeptObj.name}</span>
          </h2>
          <p className="text-xs text-amber-100/90 font-bold flex flex-wrap items-center gap-1.5 pt-1">
            <span>{t('officerInCharge', language) || 'Officer-in-Charge'}: <strong>{currentUser?.name || currentDeptObj.officer}</strong></span>
            <span>•</span>
            <span>Email: <span className="font-mono text-amber-200">{currentUser?.email || currentDeptObj.email}</span></span>
            <span>•</span>
            <span>Domain: <span className="font-mono bg-amber-500/20 px-2 py-0.5 rounded text-amber-200 font-bold border border-amber-400/40">{t(`domain_${deptDomain}`, language) || deptDomain.toUpperCase()}</span></span>
            <span>•</span>
            <span>Jurisdiction: <span className="font-mono bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-200 font-bold border border-emerald-400/40">📍 {[currentUser?.district, currentUser?.state].filter(Boolean).join(', ') || 'Kalaburagi, Karnataka'}</span></span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Quick Desk Switcher for ANY government staff or admin */}
          <div className="flex items-center space-x-2 bg-white/10 px-3 py-1.5 rounded-xl border border-white/20">
            <span className="text-[11px] text-amber-200 font-bold flex items-center gap-1">
              <ArrowRightLeft className="w-3.5 h-3.5 text-amber-300" />
              <span>Switch Desk:</span>
            </span>
            <select
              value={activeDept}
              onChange={(e) => handleSwitchDepartment(e.target.value)}
              className="bg-slate-900 text-amber-200 text-xs font-bold rounded-lg px-2 py-1 border border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 cursor-pointer"
            >
              {ALL_CIVIC_DEPARTMENTS.map(d => {
                const isAssigned = assignedDeptIds.includes(d.id);
                return (
                  <option key={d.id} value={d.id}>
                    {d.icon} {t(`domain_${d.domain}`, language) || d.name} {isAssigned ? '★ (Assigned)' : ''}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Department Asset QR Generator Action */}
          <button
            type="button"
            onClick={() => {
              setShowQRGeneratorModal(true);
              if (speakText) speakText('Opening Department QR Sticker Generator for field tagging.');
            }}
            className="px-3.5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 text-xs font-black rounded-xl border border-amber-300 shadow-md flex items-center space-x-1.5 transition-all hover:scale-105"
          >
            <QrCode className="w-4 h-4 text-slate-950" />
            <span>Generate Asset QR Stickers</span>
          </button>

          <span className="px-3.5 py-2 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-xl border border-white/30">
            {complaints.length} {t('departmentTickets', language) || 'Tickets'}
          </span>
          <button onClick={loadDeptComplaints} className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-xl border border-white/30 shadow-sm">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MULTI-DEPARTMENT WORKING DESKS BAR (CONCURRENT CHARGES) */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-r from-amber-50 via-white to-amber-50 border-2 border-amber-300 rounded-3xl p-5 shadow-md space-y-3 font-outfit">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200 pb-2.5">
          <div className="space-y-0.5">
            <div className="flex items-center space-x-2">
              <Layers className="w-4 h-4 text-amber-700" />
              <h3 className="text-xs font-black text-amber-950 uppercase tracking-wider font-cinzel">
                Multi-Department Working Desks & Concurrent Jurisdiction
              </h3>
              <span className="bg-amber-200 text-amber-900 text-[10px] font-bold font-mono px-2 py-0.5 rounded-full border border-amber-300">
                {assignedDeptIds.length} Assigned Desks
              </span>
            </div>
            <p className="text-[11px] text-amber-900/80 font-medium">
              You are authorized to triage citizen grievances across multiple departments. Click any desk below to switch your working workbench instantly:
            </p>
          </div>

          <div className="text-[11px] font-mono text-slate-500 font-bold shrink-0">
            Current Desk: <span className="text-amber-900 font-black">{currentDeptObj.name.split('(')[0]}</span>
          </div>
        </div>

        {/* Assigned Department Desks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 pt-1">
          {assignedDeptIds.map((deptId) => {
            const deptObj = ALL_CIVIC_DEPARTMENTS.find(d => d.id === deptId);
            if (!deptObj) return null;
            const isActive = deptId === activeDept;

            return (
              <button
                key={deptId}
                type="button"
                onClick={() => handleSwitchDepartment(deptId)}
                className={`p-3 rounded-2xl text-left transition-all border flex items-center space-x-3 shadow-xs ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white border-amber-500 shadow-md ring-2 ring-amber-400/50 scale-[1.02]'
                    : 'bg-white hover:bg-amber-100/60 text-slate-800 border-amber-200 hover:border-amber-400'
                }`}
              >
                <span className="text-2xl shrink-0 p-1 bg-white/20 rounded-xl">{deptObj.icon}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className={`text-xs font-black truncate ${isActive ? 'text-white' : 'text-slate-900'}`}>
                      {deptObj.name.split('(')[0]}
                    </p>
                    {isActive && (
                      <span className="p-0.5 bg-white text-amber-700 rounded-full shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <p className={`text-[10px] font-bold mt-0.5 ${isActive ? 'text-amber-100' : 'text-slate-500'}`}>
                    {isActive ? 'Active Desk' : 'Switch to Desk →'}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* DOMAIN SPECIFIC MODULES BREAKDOWN (Only modules belonging to this department's domain) */}
      <div className="ethnic-card p-5 rounded-3xl space-y-3 shadow-md gold-glow border-2 border-amber-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200 pb-2">
          <div>
            <h3 className="text-xs font-black text-amber-950 uppercase tracking-wider flex items-center space-x-1.5 font-cinzel">
              <Layers className="w-4 h-4 text-amber-700" />
              <span>{t(`domain_${deptDomain}`, language) || currentDeptObj.name} • {t('monitoredModules', language) || 'Monitored Modules'} ({deptModules.length} {t('subcategoriesCount', language) || 'Subcategories'})</span>
            </h3>
            <p className="text-[11px] text-amber-900/80 font-bold">
              {t('tapModuleToFilter', language) || 'Tap any module below to filter and triage tickets exclusively filed under that specific problem type.'}
            </p>
          </div>
          {selectedModuleFilter && (
            <button
              onClick={() => {
                setSelectedModuleFilter('');
                if (speakText) speakText('Cleared module filter. Showing all department complaints.');
              }}
              className="text-xs font-bold text-amber-900 hover:text-amber-950 bg-amber-100 px-3 py-1 rounded-xl border border-amber-300 shrink-0"
            >
              ✕ {t('clearModuleFilter', language) || 'Clear Filter'} ({t('showAll', language) || 'Show All'} {complaints.length})
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {deptModules.map((mod) => {
            const ticketCount = getModuleTicketCount(mod.name, mod.key, mod.id);
            const isSelected = selectedModuleFilter === mod.name || selectedModuleFilter === mod.id;
            return (
              <button
                key={mod.id}
                type="button"
                onClick={() => {
                  const next = isSelected ? '' : mod.name;
                  setSelectedModuleFilter(next);
                  if (speakText) speakText(next ? `Filtered for module ${translateCategory(mod, language)}` : 'Showing all department tickets');
                }}
                className={`p-3.5 rounded-2xl border-2 text-left space-y-2 transition-all flex flex-col justify-between shadow-xs ${
                  isSelected
                    ? 'bg-amber-700 text-white border-amber-800 ring-2 ring-amber-500 shadow-md scale-[1.02]'
                    : 'bg-white text-slate-900 border-amber-200 hover:border-amber-400 hover:bg-amber-50/60'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-2xl p-1.5 bg-amber-50 rounded-xl border border-amber-200">{mod.icon}</span>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-white text-amber-900' : 'bg-amber-100 text-amber-900 border border-amber-300'
                  }`}>
                    {ticketCount} {t('departmentTickets', language) ? '' : 'Tickets'}
                  </span>
                </div>
                <p className="text-xs font-bold leading-snug line-clamp-2">{translateCategory(mod, language)}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-amber-500 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs text-slate-500 font-bold">{t('pendingAction', language) || 'Pending Officer Action'}</p>
            <p className="text-2xl font-black text-amber-700">{filtered.filter(c => c.status !== 'Resolved').length}</p>
          </div>
          <div className="p-3 bg-amber-50 rounded-xl text-amber-700">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-emerald-600 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs text-slate-500 font-bold">{t('resolvedVerified', language) || 'Resolved & Verified'}</p>
            <p className="text-2xl font-black text-emerald-700">{filtered.filter(c => c.status === 'Resolved').length}</p>
          </div>
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-700">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-rose-600 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs text-slate-500 font-bold">{t('highPriorityAlerts', language) || 'High Priority / Urgent'}</p>
            <p className="text-2xl font-black text-rose-700">{filtered.filter(c => c.priority === 'High' && c.status !== 'Resolved').length}</p>
          </div>
          <div className="p-3 bg-rose-50 rounded-xl text-rose-700">
            <ShieldAlert className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Assigned Complaints Table */}
      <div className="glass-panel p-6 rounded-2xl space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              {t('grievanceQueue', language) || 'Department Grievance Queue'}: {t(`domain_${deptDomain}`, language) || currentDeptObj.name} ({filtered.length} {t('departmentTickets', language) || 'Tickets'})
            </h3>
            {selectedModuleFilter && (
              <p className="text-xs text-amber-800 font-bold mt-0.5">
                {t('filteredForModule', language) || 'Filtered for Module'}: <span className="underline">{translateCategory({ name: selectedModuleFilter, id: selectedModuleFilter }, language)}</span>
              </p>
            )}
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-white border border-slate-300 text-xs text-slate-800 rounded-xl px-3 py-1.5 font-bold shadow-sm"
          >
            <option value="">{t('allStatuses', language) || 'All Statuses'}</option>
            <option value="Submitted">{t('status_submitted', language) || 'Submitted'}</option>
            <option value="In Progress">{t('status_in_progress', language) || 'In Progress'}</option>
            <option value="Resolved">{t('status_resolved', language) || 'Resolved'}</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 uppercase font-mono border-b border-slate-200">
              <tr>
                <th className="p-3">{t('colComplaintId', language) || 'Complaint ID'}</th>
                <th className="p-3">{t('colCategory', language) || 'Category / Module'}</th>
                <th className="p-3">{t('colPriority', language) || 'Priority'}</th>
                <th className="p-3">{t('colLocationWard', language) || 'Location & Ward'}</th>
                <th className="p-3">{t('colCoRouted', language) || 'Co-Routed Depts'}</th>
                <th className="p-3">{t('colSlaDeadline', language) || 'SLA Deadline'}</th>
                <th className="p-3">{t('colStatus', language) || 'Status'}</th>
                <th className="p-3">{t('colActions', language) || 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3">
                    <div className="font-mono text-blue-700 font-bold">{c.id}</div>
                    <div className="text-[10px] text-slate-500">{new Date(c.createdAt).toLocaleDateString()}</div>
                  </td>

                  <td className="p-3 font-semibold text-slate-800">
                    {translateCategory({ name: c.category, id: c.category }, language)}
                  </td>

                  <td className="p-3">
                    <span className={`px-2.5 py-0.5 rounded-full font-bold ${
                      c.priority === 'High' ? 'bg-rose-100 text-rose-800 border border-rose-200' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {c.priority}
                    </span>
                  </td>

                  <td className="p-3 text-slate-800 font-medium">
                    <div>{c.location.address}</div>
                    <div className="text-[10px] text-slate-500 font-bold">{c.location.ward}</div>
                  </td>

                  <td className="p-3">
                    {c.coRoutedDepartments?.length ? (
                      <div className="flex items-center space-x-1 text-amber-700 font-bold bg-amber-50 px-2 py-1 rounded border border-amber-200 text-[10px]">
                        <Link2 className="w-3 h-3" />
                        <span>Co-routed: {c.coRoutedDepartments.join(', ')}</span>
                      </div>
                    ) : (
                      <span className="text-slate-400 font-mono text-[11px]">Primary Only</span>
                    )}
                  </td>

                  <td className="p-3 font-mono font-medium text-slate-600">
                    {new Date(c.slaDeadline).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                  </td>

                  <td className="p-3">
                    <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] uppercase ${
                      c.status === 'Verified Resolved'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : c.status === 'Disputed / Re-Opened'
                        ? 'bg-rose-600 text-white animate-pulse shadow-xs'
                        : c.status === 'Resolved'
                        ? 'bg-amber-500 text-slate-950 font-black'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {c.status === 'Disputed / Re-Opened' ? '🚨 Disputed by Citizen' : (t(`status_${c.status?.toLowerCase().replace(' ', '_')}`, language) || c.status)}
                    </span>
                  </td>

                  <td className="p-3 space-x-1">
                    <button
                      onClick={() => setActiveComplaint(c)}
                      className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] rounded-lg shadow-sm"
                    >
                      {t('btnUpdateResolve', language) || 'Update & Resolve'}
                    </button>
                    <button
                      onClick={() => setRoutingHistoryComplaint(c)}
                      title="View Routing History Timeline (FR-3.28-06)"
                      className="p-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-300 inline-flex items-center"
                    >
                      <History className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Resolution Action Modal */}
      {activeComplaint && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 p-6 rounded-3xl max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-900">{t('officerActionModalTitle', language) || 'Officer Action'}: {activeComplaint.id}</h3>
              <button onClick={() => setActiveComplaint(null)} className="text-slate-400 hover:text-slate-800 font-bold">✕</button>
            </div>

            <div className="text-xs space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-800 font-medium">
              <p><strong>{t('colCategory', language) || 'Topic'}:</strong> {translateCategory({ name: activeComplaint.category, id: activeComplaint.category }, language)}</p>
              <p><strong>{t('citizenDescription', language) || 'Citizen Description'}:</strong> {activeComplaint.description}</p>
              <p><strong>Location:</strong> {activeComplaint.location.address} ({activeComplaint.location.ward})</p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800">{t('officialActionRemarks', language) || 'Official Action Notes / Inspection Remarks'}</label>
              <textarea
                value={resolutionNotes}
                onChange={(e) => setResolutionNotes(e.target.value)}
                placeholder="Enter work details, contractor notes, or resolution confirmation..."
                rows={3}
                className="w-full bg-slate-50 border border-slate-300 text-xs text-slate-800 rounded-xl p-3 font-medium"
              />
            </div>

            {/* On-Site Verification QR & Photo Upload */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800 flex items-center space-x-1">
                  <QrCode className="w-4 h-4 text-amber-700" />
                  <span>On-Site QR Verification</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setIsGovQRScannerOpen(true);
                    if (speakText) speakText('Opening scanner for on-site physical asset QR verification');
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-950 font-bold text-xs flex items-center justify-center space-x-1.5 shadow-xs"
                >
                  <QrCode className="w-3.5 h-3.5 text-amber-700" />
                  <span>{onSiteVerificationCode ? `✓ ${onSiteVerificationCode}` : 'Scan Municipal Asset QR'}</span>
                </button>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800 flex items-center space-x-1">
                  <Camera className="w-4 h-4 text-emerald-600" />
                  <span>{t('uploadProofPhoto', language) || 'Upload Proof Photo'}</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setResolutionPhoto(e.target.files?.[0] ? URL.createObjectURL(e.target.files[0]) : null)}
                  className="block w-full text-[11px] text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-[11px] file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-500 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex space-x-2 pt-2">
              <button
                onClick={() => handleUpdateStatus(activeComplaint.id, 'In Progress')}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow"
              >
                {t('btnSetInProgress', language) || 'Set In Progress'}
              </button>

              <button
                onClick={() => handleUpdateStatus(activeComplaint.id, 'Resolved')}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow"
              >
                {t('btnMarkResolved', language) || 'Mark Issue Resolved'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OFFICER ON-SITE FIELD QR SCANNER MODAL */}
      <QRScannerModal
        isOpen={isGovQRScannerOpen}
        onClose={() => setIsGovQRScannerOpen(false)}
        onScanSuccess={(parsed) => {
          const code = parsed.assetId || parsed.complaintId || parsed.raw;
          setOnSiteVerificationCode(code);
          setResolutionNotes(prev => `${prev ? prev + ' ' : ''}[On-Site Physical QR Verified: ${code}]`);
          if (speakText) speakText(`On-site verification confirmed for asset ${code}`);
        }}
        language={language}
        speakText={speakText}
      />

      {/* DEPARTMENT OFFICER ASSET QR CODE GENERATOR MODAL */}
      {showQRGeneratorModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border-2 border-amber-400 p-6 rounded-3xl max-w-xl w-full relative space-y-5 shadow-2xl animate-fadeIn max-h-[90vh] overflow-y-auto font-outfit">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-700 to-orange-600 text-white flex items-center justify-center shadow">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black font-cinzel text-amber-950">
                    {t(`domain_${deptDomain}`, language) || currentDeptObj.name} • Asset QR Generator
                  </h3>
                  <p className="text-[11px] text-slate-500 font-bold">
                    Generate scannable field QR stickers for government property under your authority.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowQRGeneratorModal(false)}
                className="text-slate-400 hover:text-slate-700 font-black p-1 bg-slate-100 hover:bg-slate-200 rounded-full w-8 h-8 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {/* Department Auto-Binding Notice */}
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-amber-950 text-xs flex items-center space-x-2.5">
                <Tag className="w-5 h-5 text-amber-700 shrink-0" />
                <div>
                  <p className="font-bold">Officer Direct Auto-Routing:</p>
                  <p className="text-[11px] text-amber-900/80">
                    Complaints filed through this QR sticker will route directly to <strong>{currentUser?.name || currentDeptObj.officer}</strong> ({t(`domain_${deptDomain}`, language) || currentDeptObj.name}).
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800">Problem Type / Subcategory</label>
                  <select
                    value={qrAssetModule}
                    onChange={(e) => {
                      setQrAssetModule(e.target.value);
                      const mod = deptModules.find(m => m.id === e.target.value);
                      if (mod) setQrAssetName(mod.name);
                    }}
                    className="w-full bg-slate-50 border border-slate-300 text-xs text-slate-800 rounded-xl p-2.5 font-bold focus:ring-2 focus:ring-amber-500"
                  >
                    {deptModules.map(m => (
                      <option key={m.id} value={m.id}>{m.icon} {translateCategory(m, language)}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800">Asset Label / Property Name</label>
                  <input
                    type="text"
                    value={qrAssetName}
                    onChange={(e) => setQrAssetName(e.target.value)}
                    placeholder="e.g. Streetlight Pole #401, SBM Dumpster #09"
                    className="w-full bg-slate-50 border border-slate-300 text-xs text-slate-800 rounded-xl p-2.5 font-semibold focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">Physical Location & Ward</label>
                <input
                  type="text"
                  value={qrAssetLocation}
                  onChange={(e) => setQrAssetLocation(e.target.value)}
                  placeholder="e.g. Ward 12 Main Circle, Kalaburagi"
                  className="w-full bg-slate-50 border border-slate-300 text-xs text-slate-800 rounded-xl p-2.5 font-medium focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <button
                type="button"
                onClick={handleGenerateDeptQR}
                className="w-full py-3 bg-gradient-to-r from-amber-700 via-orange-600 to-amber-700 hover:opacity-95 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center space-x-2 border border-amber-300 transition-all hover:scale-[1.01]"
              >
                <QrCode className="w-4 h-4" />
                <span>Generate Official Department QR Sticker</span>
              </button>

              {/* Generated QR Sticker Preview Card */}
              {generatedDeptQr && (
                <div className="p-4 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 border-2 border-amber-400 text-slate-900 rounded-3xl space-y-3 shadow-md">
                  <div className="flex items-center justify-between border-b border-amber-300/80 pb-2">
                    <span className="text-xs font-black font-cinzel text-amber-950">
                      MUNICIPAL GOVERNMENT PROPERTY STICKER
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-600 text-white font-bold">
                      VERIFIED OFFICIAL
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-2xl border border-amber-200 shadow-inner">
                    {generatedDeptQr.dataUrl && (
                      <img
                        src={generatedDeptQr.dataUrl}
                        alt="Asset QR"
                        className="w-32 h-32 rounded-xl border-2 border-amber-400 p-1 shadow-sm shrink-0"
                      />
                    )}
                    <div className="text-left space-y-1">
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Asset Tag ID</p>
                      <p className="font-mono font-black text-sm text-amber-950">{generatedDeptQr.id}</p>
                      <p className="text-xs font-bold text-slate-900">{generatedDeptQr.assetName}</p>
                      <p className="text-[11px] text-amber-900 font-bold">🏛️ {generatedDeptQr.domainName}</p>
                      <p className="text-[11px] text-slate-600 font-medium">📍 {generatedDeptQr.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 pt-1">
                    <a
                      href={generatedDeptQr.dataUrl}
                      download={`Society360_${generatedDeptQr.id}.png`}
                      className="flex-1 py-2.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 shadow-sm"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Sticker PNG</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="px-4 py-2.5 bg-white hover:bg-amber-50 text-amber-950 rounded-xl text-xs font-bold border border-amber-300 flex items-center space-x-1.5 shadow-xs"
                    >
                      <Printer className="w-4 h-4 text-amber-700" />
                      <span>Print Sticker</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
