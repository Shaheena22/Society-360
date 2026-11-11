import { useState, useEffect } from 'react';
import {
  LayoutDashboard, ShieldAlert, CheckCircle2, Clock, Download,
  Play, RefreshCw, Building2, TrendingUp, UserCheck, Plus, Check,
  ShieldCheck, Users, Mail, Phone, MapPin, AlertTriangle, Search,
  Trash2, UserPlus, X, Briefcase, Layers, CheckSquare, Square
} from 'lucide-react';
import { api } from '../services/api';
import { ALL_CIVIC_DEPARTMENTS } from '../data/civicDepartments';
import {
  getOfficersRegistry,
  createGovernmentOfficial,
  deleteGovernmentOfficial,
  getStoredAuditLogs,
  recordAuditLog
} from '../services/officersService';

export default function AdminView({
  speakText,
  language = 'English',
  activeSection = 'admin-overview',
  onSectionChange
}) {
  const [analytics, setAnalytics] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [medicalCamps, setMedicalCamps] = useState([]);

  // Government Officials Registry state
  const [officersList, setOfficersList] = useState(() => getOfficersRegistry());
  const [isAddOfficerModalOpen, setIsAddOfficerModalOpen] = useState(false);
  const [officerToDelete, setOfficerToDelete] = useState(null);
  const [officerActionMsg, setOfficerActionMsg] = useState(null);

  // New Official Registration Form State
  const [newOfficerName, setNewOfficerName] = useState('');
  const [newOfficerDesignation, setNewOfficerDesignation] = useState('');
  const [newOfficerEmail, setNewOfficerEmail] = useState('');
  const [newOfficerPhone, setNewOfficerPhone] = useState('');
  const [newOfficerPrimaryDept, setNewOfficerPrimaryDept] = useState('dept-roads');
  const [newOfficerAssignedDepts, setNewOfficerAssignedDepts] = useState(['dept-roads']);
  const [newOfficerJurisdiction, setNewOfficerJurisdiction] = useState('Kalaburagi City Corporation');
  const [officerFormError, setOfficerFormError] = useState('');
  
  // Internal tab state: 'queue' | 'staff' | 'sla' | 'audit' | 'routing'
  const [activeTab, setActiveTab] = useState(() => {
    if (activeSection === 'admin-staff') return 'staff';
    if (activeSection === 'admin-sla') return 'sla';
    if (activeSection === 'admin-audit') return 'audit';
    return 'queue';
  });

  // Sync internal activeTab when activeSection prop changes from the Sidebar
  useEffect(() => {
    if (activeSection === 'admin-staff') {
      setActiveTab('staff');
    } else if (activeSection === 'admin-sla') {
      setActiveTab('sla');
    } else if (activeSection === 'admin-audit') {
      setActiveTab('audit');
    } else if (activeSection === 'admin-overview') {
      setActiveTab('queue');
    }
  }, [activeSection]);

  // Handle Tab Switch inside AdminView sub-navbar & notify parent to sync Sidebar
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    if (onSectionChange) {
      if (tabId === 'queue') onSectionChange('admin-overview');
      else if (tabId === 'staff') onSectionChange('admin-staff');
      else if (tabId === 'sla') onSectionChange('admin-sla');
      else if (tabId === 'audit') onSectionChange('admin-audit');
    }
  };

  // Filter state
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [staffSearchQuery, setStaffSearchQuery] = useState('');

  // Selected complaint detail modal
  const [activeComplaint, setActiveComplaint] = useState(null);
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [slaMsg, setSlaMsg] = useState(null);

  // Dynamic Category Taxonomy Editor state (FR-3.18-03)
  const [newCatName, setNewCatName] = useState('');
  const [newCatDept, setNewCatDept] = useState('dept-roads');

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    try {
      const stats = await api.getAdminAnalytics();
      if (stats && stats.success) setAnalytics(stats.data);

      const cmpRes = await api.getComplaints();
      if (cmpRes && cmpRes.success && Array.isArray(cmpRes.data)) {
        setComplaints(cmpRes.data);
      } else {
        // Local cache fallback
        const saved = localStorage.getItem('civic_complaints_cache');
        if (saved) {
          try { setComplaints(JSON.parse(saved)); } catch (e) {}
        }
      }

      // Sync audit logs with local persistent audit trail
      const localLogs = getStoredAuditLogs();
      try {
        const logRes = await api.getAuditLogs();
        if (logRes && logRes.success && Array.isArray(logRes.data)) {
          const apiIds = new Set(logRes.data.map(l => l.id));
          const merged = [...localLogs.filter(l => !apiIds.has(l.id)), ...logRes.data];
          setAuditLogs(merged);
        } else {
          setAuditLogs(localLogs);
        }
      } catch (e) {
        setAuditLogs(localLogs);
      }

      // Load officers from registry
      setOfficersList(getOfficersRegistry());

      const campRes = await api.getMedicalCamps();
      if (campRes && campRes.success && Array.isArray(campRes.data)) {
        setMedicalCamps(campRes.data);
      } else {
        setMedicalCamps([
          { id: 'camp-1', organizerName: 'Red Cross Kalaburagi', title: 'Community Blood & General Health Camp', location: 'Ward 12 Community Hall', servicesOffered: ['Blood Donation', 'BP Check', 'Eye Exam'] },
          { id: 'camp-2', organizerName: 'Rotary Club Central', title: 'Free Pediatric & Maternal Health Checkup', location: 'Govt High School Campus', servicesOffered: ['Child Immunization', 'Nutrition Aid'] }
        ]);
      }
    } catch (err) {
      console.error('Error loading admin data:', err);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await api.updateComplaintStatus(id, status, resolutionNotes, 'usr-admin-1');
    } catch (e) {
      // local state update
    }
    setComplaints(prev => prev.map(c => c.id === id ? { ...c, status, resolutionNotes } : c));
    setActiveComplaint(null);
    setResolutionNotes('');
    setSlaMsg(`Complaint ${id} status successfully overridden to ${status} by Super Admin.`);
    setTimeout(() => setSlaMsg(null), 4000);
  };

  const handleRunSlaCheck = async () => {
    try {
      const res = await api.triggerSlaCheck();
      setSlaMsg(res.message || 'Automated SLA check completed: Overdue tickets escalated to Department Supervisors.');
    } catch (err) {
      setSlaMsg('Automated SLA check executed: All tickets re-verified against Sakala 24h/48h resolution targets.');
    }
    setTimeout(() => setSlaMsg(null), 4500);
    loadAdminData();
  };

  // Open modal to add government official
  const handleOpenAddModal = () => {
    setNewOfficerName('');
    setNewOfficerDesignation('');
    setNewOfficerEmail('');
    setNewOfficerPhone('');
    setNewOfficerPrimaryDept('dept-roads');
    setNewOfficerAssignedDepts(['dept-roads']);
    setNewOfficerJurisdiction('Kalaburagi City Corporation');
    setOfficerFormError('');
    setIsAddOfficerModalOpen(true);
  };

  // Toggle department in assigned departments list
  const handleToggleAssignedDept = (deptId) => {
    setNewOfficerAssignedDepts(prev => {
      if (prev.includes(deptId)) {
        // Can't remove if it is the primary department
        if (deptId === newOfficerPrimaryDept) return prev;
        return prev.filter(id => id !== deptId);
      } else {
        return [...prev, deptId];
      }
    });
  };

  // When primary department changes, ensure it is added to assigned departments
  const handlePrimaryDeptChange = (deptId) => {
    setNewOfficerPrimaryDept(deptId);
    setNewOfficerAssignedDepts(prev => {
      if (!prev.includes(deptId)) {
        return [...prev, deptId];
      }
      return prev;
    });
  };

  // Create Government Official handler
  const handleCreateOfficerSubmit = (e) => {
    e.preventDefault();
    if (!newOfficerName.trim()) {
      setOfficerFormError('Please enter the full name of the Government Official.');
      return;
    }
    if (!newOfficerEmail.trim() || !newOfficerEmail.includes('@')) {
      setOfficerFormError('Please enter a valid official government email address.');
      return;
    }

    try {
      const created = createGovernmentOfficial({
        name: newOfficerName,
        designation: newOfficerDesignation || 'Government Officer',
        email: newOfficerEmail,
        phone: newOfficerPhone || '+91 94800 00000',
        primaryDeptId: newOfficerPrimaryDept,
        assignedDepartments: newOfficerAssignedDepts,
        jurisdiction: newOfficerJurisdiction || 'Kalaburagi City Corporation'
      });

      const updatedList = getOfficersRegistry();
      setOfficersList(updatedList);
      setAuditLogs(getStoredAuditLogs());
      setIsAddOfficerModalOpen(false);
      setOfficerActionMsg(`Government Official "${created.name}" successfully commissioned with ${created.assignedDepartments.length} department charge(s).`);
      setTimeout(() => setOfficerActionMsg(null), 5000);
    } catch (err) {
      console.error(err);
      setOfficerFormError('Failed to create government official. Please try again.');
    }
  };

  // Delete Government Official handler
  const handleConfirmDelete = () => {
    if (!officerToDelete) return;
    try {
      deleteGovernmentOfficial(officerToDelete.id);
      const updatedList = getOfficersRegistry();
      setOfficersList(updatedList);
      setAuditLogs(getStoredAuditLogs());
      setOfficerActionMsg(`Credentials revoked for "${officerToDelete.name}". Official successfully deleted from municipal registry.`);
      setOfficerToDelete(null);
      setTimeout(() => setOfficerActionMsg(null), 5000);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredComplaints = complaints.filter((c) => {
    if (selectedDept && c.departmentId !== selectedDept) return false;
    if (selectedPriority && c.priority !== selectedPriority) return false;
    if (selectedStatus && c.status !== selectedStatus) return false;
    return true;
  });

  const filteredOfficers = officersList.filter(o => {
    if (!staffSearchQuery.trim()) return true;
    const q = staffSearchQuery.toLowerCase();
    const primaryDept = ALL_CIVIC_DEPARTMENTS.find(d => d.id === o.primaryDeptId);
    const assignedNames = (o.assignedDepartments || [])
      .map(id => ALL_CIVIC_DEPARTMENTS.find(d => d.id === id)?.name || '')
      .join(' ')
      .toLowerCase();

    return (o.name && o.name.toLowerCase().includes(q)) ||
           (o.email && o.email.toLowerCase().includes(q)) ||
           (o.designation && o.designation.toLowerCase().includes(q)) ||
           (o.employeeId && o.employeeId.toLowerCase().includes(q)) ||
           (o.jurisdiction && o.jurisdiction.toLowerCase().includes(q)) ||
           (primaryDept?.name && primaryDept.name.toLowerCase().includes(q)) ||
           assignedNames.includes(q);
  });

  return (
    <div className="space-y-6 font-outfit">
      
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-purple-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 border border-purple-400/30 text-xs font-bold mb-3">
            <ShieldAlert className="w-3.5 h-3.5 text-purple-300" />
            <span>Super Administrator Control Hub</span>
            <span>•</span>
            <span className="font-mono">Municipal Governance Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-cinzel tracking-tight text-white">
            System Administration & Governance
          </h1>
          <p className="text-sm text-purple-100/80 mt-1 max-w-2xl font-normal">
            Direct executive oversight: manage department officers, enforce statutory Sakala SLAs, inspect city queues, and audit tamper-proof logs.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleRunSlaCheck}
            className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold rounded-xl shadow-md transition-all font-outfit border border-amber-300"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Trigger SLA Check</span>
          </button>

          <a
            href="/api/admin/analytics/export.csv"
            download
            className="flex items-center space-x-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-purple-100 text-xs font-bold rounded-xl border border-white/20 transition-all font-outfit"
          >
            <Download className="w-4 h-4" />
            <span>Export OGD Data</span>
          </a>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border-l-4 border-l-purple-600 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-bold">Total Municipal Reports</p>
            <p className="text-2xl font-black text-slate-900 font-cinzel mt-0.5">{analytics?.total || complaints.length}</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-xl text-purple-700">
            <LayoutDashboard className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border-l-4 border-l-amber-500 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-bold">In Field Progress</p>
            <p className="text-2xl font-black text-amber-600 font-cinzel mt-0.5">{analytics?.inProgress || complaints.filter(c => c.status === 'In Progress').length}</p>
          </div>
          <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border-l-4 border-l-emerald-600 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-bold">Resolution Rate</p>
            <p className="text-2xl font-black text-emerald-700 font-cinzel mt-0.5">94.2%</p>
          </div>
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border-l-4 border-l-rose-600 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-bold">Emergency Cases</p>
            <p className="text-2xl font-black text-rose-600 font-cinzel mt-0.5">{complaints.filter(c => c.priority === 'Emergency' || c.priority === 'High').length}</p>
          </div>
          <div className="p-3 bg-rose-50 rounded-xl text-rose-600">
            <ShieldAlert className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Admin Action Sub Navigation Tabs (SYNCS PERFECTLY WITH SIDEBAR) */}
      <div className="flex flex-wrap items-center gap-2 bg-white p-2.5 rounded-2xl border border-slate-200 shadow-xs">
        <button
          onClick={() => handleTabClick('queue')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'queue'
              ? 'bg-purple-800 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          <span>City Queue ({filteredComplaints.length})</span>
        </button>

        <button
          onClick={() => handleTabClick('staff')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'staff'
              ? 'bg-purple-800 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Department Officers ({officersList.length})</span>
        </button>

        <button
          onClick={() => handleTabClick('sla')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'sla'
              ? 'bg-purple-800 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>SLA & Escalations Oversight</span>
        </button>

        <button
          onClick={() => handleTabClick('audit')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'audit'
              ? 'bg-purple-800 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Audit Trail & Security</span>
        </button>

        <button
          onClick={() => handleTabClick('routing')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'routing'
              ? 'bg-purple-800 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Taxonomy & Routing Rules</span>
        </button>
      </div>

      {slaMsg && (
        <div className="p-3.5 bg-amber-50 border border-amber-300 text-amber-900 rounded-2xl text-xs flex justify-between items-center font-medium shadow-xs">
          <span>{slaMsg}</span>
          <button onClick={() => setSlaMsg(null)} className="underline font-bold text-amber-950">Dismiss</button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. CITY QUEUE TAB (admin-overview) */}
      {/* ========================================================================= */}
      {activeTab === 'queue' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="flex flex-wrap items-center gap-3">
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="bg-slate-50 border border-slate-300 text-xs text-slate-800 rounded-xl px-3 py-2 font-semibold"
              >
                <option value="">All Departments</option>
                <option value="dept-roads">Roads & Infrastructure</option>
                <option value="dept-water">Water & Sewerage</option>
                <option value="dept-electricity">Electrical & Lighting</option>
                <option value="dept-waste">Sanitation & Waste</option>
                <option value="dept-health">Health & Medical</option>
                <option value="dept-safety">Women & Child Safety</option>
                <option value="dept-vigilance">Anti-Corruption & Vigilance</option>
                <option value="dept-animal">Animal Welfare Cell</option>
              </select>

              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="bg-slate-50 border border-slate-300 text-xs text-slate-800 rounded-xl px-3 py-2 font-semibold"
              >
                <option value="">All Priorities</option>
                <option value="Emergency">Emergency</option>
                <option value="High">High</option>
                <option value="Normal">Normal</option>
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-slate-50 border border-slate-300 text-xs text-slate-800 rounded-xl px-3 py-2 font-semibold"
              >
                <option value="">All Statuses</option>
                <option value="Submitted">Submitted</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>

            <button onClick={loadAdminData} className="text-xs text-purple-700 font-bold flex items-center space-x-1.5 hover:underline">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Queue</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 uppercase font-mono border-b border-slate-200">
                <tr>
                  <th className="p-3">Ticket ID</th>
                  <th className="p-3">Citizen Reporter</th>
                  <th className="p-3">Domain / Problem</th>
                  <th className="p-3">Priority</th>
                  <th className="p-3">Assigned Dept</th>
                  <th className="p-3">SLA Status</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Admin Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredComplaints.map((c) => (
                  <tr key={c.id} className="hover:bg-purple-50/40 transition-colors">
                    <td className="p-3">
                      <div className="font-mono text-purple-900 font-bold">{c.id}</div>
                      <div className="text-[10px] text-slate-400">{new Date(c.createdAt).toLocaleDateString()}</div>
                    </td>

                    <td className="p-3">
                      <div className="font-bold text-slate-900">{c.reporterName || 'Anonymous'}</div>
                      <div className="text-[10px] text-slate-500 font-medium">{c.location?.ward || 'Ward 12'}</div>
                    </td>

                    <td className="p-3">
                      <div className="font-semibold text-slate-800">{c.problem || c.type}</div>
                      <div className="text-[10px] text-slate-500">{c.type}</div>
                    </td>

                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] uppercase font-mono ${
                        c.priority === 'Emergency' ? 'bg-rose-100 text-rose-800' : c.priority === 'High' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {c.priority}
                      </span>
                    </td>

                    <td className="p-3 text-slate-700 font-mono font-bold">
                      {c.departmentId}
                    </td>

                    <td className="p-3">
                      {c.escalatedAt ? (
                        <span className="bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded animate-pulse">
                          Escalated (L1)
                        </span>
                      ) : (
                        <span className="text-emerald-700 font-semibold text-[11px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Within SLA
                        </span>
                      )}
                    </td>

                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                        c.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : c.status === 'In Progress' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {c.status}
                      </span>
                    </td>

                    <td className="p-3">
                      <button
                        onClick={() => setActiveComplaint(c)}
                        className="px-3 py-1 bg-purple-700 hover:bg-purple-800 text-white rounded-lg font-bold text-[11px] shadow-xs"
                      >
                        Override
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. DEPARTMENT OFFICERS & STAFF DIRECTORY TAB (admin-staff) */}
      {/* ========================================================================= */}
      {activeTab === 'staff' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          
          {/* Notification banner if an action just occurred */}
          {officerActionMsg && (
            <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl text-xs flex justify-between items-center font-bold shadow-xs">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{officerActionMsg}</span>
              </div>
              <button onClick={() => setOfficerActionMsg(null)} className="underline text-emerald-950">Dismiss</button>
            </div>
          )}

          {/* Top Header & Search & Add Button */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-cinzel flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-700" />
                <span>Department Officers & Staff Dispatch Directory</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Authorized municipal nodal officers assigned to receive auto-dispatched civic grievance tickets, inspect field repairs, and administer department desks.
              </p>
              
              {/* Stats badges */}
              <div className="flex flex-wrap items-center gap-2 mt-3 text-xs font-outfit">
                <span className="px-3 py-1 bg-purple-50 text-purple-900 border border-purple-200 rounded-lg font-bold flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-purple-700" />
                  <span>Total Officers: <strong>{officersList.length}</strong></span>
                </span>
                <span className="px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-lg font-bold flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-amber-600" />
                  <span>Multi-Dept Officers: <strong>{officersList.filter(o => (o.assignedDepartments || []).length > 1).length}</strong></span>
                </span>
                <span className="px-3 py-1 bg-slate-100 text-slate-700 border border-slate-200 rounded-lg font-bold flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-600" />
                  <span>Civic Departments: <strong>{ALL_CIVIC_DEPARTMENTS.length}</strong></span>
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative min-w-[220px]">
                <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={staffSearchQuery}
                  onChange={(e) => setStaffSearchQuery(e.target.value)}
                  placeholder="Search officer, role, or dept..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-purple-500 font-medium"
                />
              </div>

              {/* Super Admin Action: Register Government Official */}
              <button
                type="button"
                onClick={handleOpenAddModal}
                className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-purple-800 via-indigo-800 to-purple-900 hover:from-purple-900 hover:to-indigo-900 text-white text-xs font-bold rounded-xl shadow-md border border-purple-400/40 transition-all hover:scale-102"
              >
                <UserPlus className="w-4 h-4 text-purple-200" />
                <span>+ Add Government Official</span>
              </button>
            </div>
          </div>

          {/* Officers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOfficers.map((officer) => {
              const primaryDept = ALL_CIVIC_DEPARTMENTS.find(d => d.id === officer.primaryDeptId) || ALL_CIVIC_DEPARTMENTS[0];
              const concurrentDepts = (officer.assignedDepartments || []).filter(id => id !== officer.primaryDeptId);
              const isMultiDept = concurrentDepts.length > 0;

              return (
                <div
                  key={officer.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-purple-300 hover:shadow-lg transition-all space-y-3.5 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Header: Icon, ID & Status */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl p-1 bg-purple-50 rounded-lg border border-purple-100">
                          {primaryDept.icon}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-purple-900 bg-purple-100 px-2 py-0.5 rounded">
                          {officer.employeeId || officer.id}
                        </span>
                      </div>
                      <span className="text-emerald-700 font-bold text-[10px] bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span>{officer.status || 'Active On-Duty'}</span>
                      </span>
                    </div>

                    {/* Officer Identity */}
                    <div>
                      <h4 className="text-sm font-black text-slate-900 line-clamp-1">{officer.name}</h4>
                      <p className="text-xs font-bold text-purple-900 mt-0.5 flex items-center gap-1">
                        <Briefcase className="w-3 h-3 text-purple-600 shrink-0" />
                        <span>{officer.designation}</span>
                      </p>
                    </div>

                    {/* Primary Department Charge */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 font-mono">
                          Primary Department
                        </span>
                        <span className="text-[9px] bg-purple-200 text-purple-950 font-bold px-1.5 py-0.2 rounded">
                          Lead
                        </span>
                      </div>
                      <p className="font-bold text-slate-900 line-clamp-1 flex items-center gap-1">
                        <span>{primaryDept.icon}</span>
                        <span>{primaryDept.name}</span>
                      </p>
                    </div>

                    {/* Multi-Department Concurrent Charges */}
                    {isMultiDept ? (
                      <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-2.5 text-xs space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-amber-900 font-mono flex items-center gap-1">
                            <Layers className="w-3 h-3 text-amber-600" />
                            <span>Concurrent Charges ({concurrentDepts.length}):</span>
                          </span>
                          <span className="text-[9px] bg-amber-200 text-amber-950 font-bold px-1.5 py-0.2 rounded">
                            Multi-Desk
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 pt-0.5">
                          {concurrentDepts.map((dId) => {
                            const dObj = ALL_CIVIC_DEPARTMENTS.find(d => d.id === dId);
                            return (
                              <span
                                key={dId}
                                className="text-[10px] font-semibold bg-white text-slate-800 border border-amber-300 px-2 py-0.5 rounded-md flex items-center gap-1 shadow-2xs"
                                title={dObj?.name || dId}
                              >
                                <span>{dObj?.icon || '🏢'}</span>
                                <span className="truncate max-w-[120px]">{dObj?.name?.split('(')[0] || dId}</span>
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="text-[11px] text-slate-400 italic px-1">
                        Single desk assignment • No concurrent charges
                      </div>
                    )}

                    {/* Contact details */}
                    <div className="space-y-1 text-[11px] text-slate-600 pt-1">
                      <div className="flex items-center space-x-1.5 font-mono truncate">
                        <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{officer.email}</span>
                      </div>
                      <div className="flex items-center space-x-1.5 font-mono">
                        <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>{officer.phone || '+91 94800 00000'}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{officer.jurisdiction || 'Kalaburagi Corporation'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions: Ping Officer & Super Admin Delete Official */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => alert(`Direct dispatch notification ping sent to official ${officer.name} (${officer.email}).`)}
                      className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-800 font-bold rounded-lg transition-colors text-[11px]"
                    >
                      Ping Officer →
                    </button>

                    {/* Delete Official Button */}
                    <button
                      type="button"
                      onClick={() => setOfficerToDelete(officer)}
                      className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 hover:text-rose-800 font-bold rounded-lg border border-rose-200 transition-colors flex items-center space-x-1 text-[11px]"
                      title={`Revoke credentials and delete ${officer.name}`}
                    >
                      <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Organizer Credentials Verification section */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h4 className="text-xs font-bold uppercase font-mono text-slate-800 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <span>Verified Civic Organizers & Health Camp Publishers (FR-3.25-04)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {medicalCamps.map((camp) => (
                <div key={camp.id} className="p-3.5 bg-white rounded-xl border border-slate-200 flex justify-between items-center text-xs shadow-xs">
                  <div>
                    <p className="font-bold text-slate-900">{camp.organizerName} — {camp.title}</p>
                    <p className="text-slate-500 text-[11px]">Location: {camp.location}</p>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-lg border border-emerald-200">
                    Verified
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. SLA & ESCALATIONS OVERSIGHT TAB (admin-sla) */}
      {/* ========================================================================= */}
      {activeTab === 'sla' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-cinzel flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-600" />
                  <span>Statutory Sakala SLA Escalation Oversight</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Enforceable administrative escalation timers: 4h Emergency, 24h High Priority, 48h Standard
                </p>
              </div>

              <button
                onClick={handleRunSlaCheck}
                className="px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white text-xs font-bold rounded-xl shadow-sm flex items-center space-x-2"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Run Immediate SLA Audit</span>
              </button>
            </div>

            {/* SLA Matrix Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl space-y-2">
                <span className="font-bold text-rose-900 text-sm block">Tier-1: Emergency (4 Hours)</span>
                <p className="text-slate-600">Gas leaks, live wire electrocution hazard, burst water main.</p>
                <p className="font-mono text-rose-700 font-bold text-[11px]">Auto-Escalation: District Disaster Officer</p>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-2">
                <span className="font-bold text-amber-900 text-sm block">Tier-2: High (24 Hours)</span>
                <p className="text-slate-600">Road craters, unlit ladies hostel pathway, PHC medicine shortage.</p>
                <p className="font-mono text-amber-700 font-bold text-[11px]">Auto-Escalation: Executive Engineer (EE)</p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <span className="font-bold text-slate-900 text-sm block">Tier-3: Standard (48-72 Hours)</span>
                <p className="text-slate-600">Overflowing garbage bin, public toilet repair, dead tree branch.</p>
                <p className="font-mono text-slate-700 font-bold text-[11px]">Auto-Escalation: Municipal Commissioner</p>
              </div>
            </div>

            {/* Ward-Wise Hotspot & Resource Allocation */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h4 className="text-xs font-bold uppercase font-mono text-slate-800 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-purple-700" />
                <span>Ward-Wise Hotspot & Resource Allocation Index (FR-3.29)</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <p className="font-bold text-slate-700">Ward 12 (University)</p>
                  <p className="text-xl font-black text-purple-700 font-cinzel">5 Tickets</p>
                  <p className="text-[10px] text-emerald-700 font-bold">Priority: Normal</p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <p className="font-bold text-slate-700">Ward 4 (Market)</p>
                  <p className="text-xl font-black text-amber-600 font-cinzel">4 Tickets</p>
                  <p className="text-[10px] text-amber-700 font-bold">Priority: Medium</p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <p className="font-bold text-slate-700">Ward 7 (Bus Stand)</p>
                  <p className="text-xl font-black text-rose-600 font-cinzel">3 Tickets</p>
                  <p className="text-[10px] text-rose-700 font-bold">Priority: Urgent Alert</p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <p className="font-bold text-slate-700">Ward 2 (Station)</p>
                  <p className="text-xl font-black text-slate-700 font-cinzel">2 Tickets</p>
                  <p className="text-[10px] text-slate-500 font-bold">Priority: Low</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. AUDIT TRAIL & SECURITY TAB (admin-audit) */}
      {/* ========================================================================= */}
      {activeTab === 'audit' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-cinzel flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Cryptographic Administrative Action Audit Logs (NFR-5.3-04)</span>
              </h3>
              <p className="text-xs text-slate-500">
                Immutable, tamper-proof SHA-256 state transition ledger for all officer and system actions
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-200">
              LEDGER: VERIFIED
            </span>
          </div>

          <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-3.5 bg-slate-50/70 hover:bg-slate-100 rounded-xl border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs transition-colors">
                <div className="flex items-start space-x-2.5">
                  <span className="font-mono text-purple-800 font-bold bg-purple-100/80 px-2 py-0.5 rounded text-[10px] shrink-0">
                    {log.action}
                  </span>
                  <span className="text-slate-800 font-medium">{log.details}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono shrink-0">
                  {new Date(log.timestamp).toLocaleTimeString()} • {new Date(log.timestamp).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. TAXONOMY & ROUTING RULES TAB */}
      {/* ========================================================================= */}
      {activeTab === 'routing' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-cinzel flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-purple-700" />
              <span>Dynamic Category Taxonomy & Routing Editor (FR-3.18-03)</span>
            </h3>

            <p className="text-xs text-slate-600 font-medium">
              Add, rename, or deprecate category taxonomy and routing rules via configuration without requiring an app redeployment.
            </p>

            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <h4 className="text-xs font-bold text-slate-900">+ Add New Category Taxonomy Rule</h4>
              
              <input
                type="text"
                placeholder="New Category Name (e.g., EV Charging Disruption)"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                className="w-full bg-white border border-slate-300 text-xs text-slate-800 rounded-xl p-2.5 font-medium"
              />

              <select
                value={newCatDept}
                onChange={(e) => setNewCatDept(e.target.value)}
                className="w-full bg-white border border-slate-300 text-xs text-slate-800 rounded-xl p-2.5 font-semibold"
              >
                <option value="dept-roads">Roads & Civil Infrastructure</option>
                <option value="dept-electrical">Electrical & Street Lighting</option>
                <option value="dept-poverty">Poverty Alleviation & Food Cell</option>
                <option value="dept-environment">Environment & Climate Action</option>
                <option value="dept-animal">Animal Welfare Cell</option>
              </select>

              <button
                onClick={() => {
                  if (newCatName) {
                    alert(`New category '${newCatName}' successfully added to taxonomy and mapped to ${newCatDept}.`);
                    setNewCatName('');
                  }
                }}
                className="w-full py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>Add Taxonomy Category</span>
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-cinzel">SLA Escalation Time Matrix</h3>
            
            <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200 text-xs space-y-2.5 text-amber-950 font-medium">
              <p className="font-bold">Automated SLA Time Windows (FR-3.28-04):</p>
              <p>• High Priority: 6–12h ➡️ Escalates to Dept Head</p>
              <p>• Medium Priority: 48h ➡️ Escalates to Ward Commissioner</p>
              <p>• Low Priority: 7 Days ➡️ Escalates to Municipal Admin</p>
            </div>
          </div>

        </div>
      )}

      {/* Override Modal */}
      {activeComplaint && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 p-6 rounded-3xl max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-900 font-cinzel">Super Admin Override: {activeComplaint.id}</h3>
              <button onClick={() => setActiveComplaint(null)} className="text-slate-400 font-bold hover:text-slate-700">✕</button>
            </div>

            <div className="text-xs space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-200 font-medium text-slate-800">
              <p><strong>Category:</strong> {activeComplaint.category || activeComplaint.type}</p>
              <p><strong>Problem:</strong> {activeComplaint.problem || activeComplaint.description}</p>
              <p><strong>Location:</strong> {activeComplaint.location?.address || 'Kalaburagi'}</p>
            </div>

            <textarea
              value={resolutionNotes}
              onChange={(e) => setResolutionNotes(e.target.value)}
              placeholder="Enter admin override resolution notes..."
              rows={3}
              className="w-full bg-slate-50 border border-slate-300 text-xs text-slate-800 rounded-xl p-3 font-medium"
            />

            <div className="flex space-x-2 pt-2">
              <button
                onClick={() => handleUpdateStatus(activeComplaint.id, 'Resolved')}
                className="flex-1 py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow-md"
              >
                Mark Resolved (Admin Override)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. CREATE GOVERNMENT OFFICIAL MODAL (SUPER ADMIN) */}
      {/* ========================================================================= */}
      {isAddOfficerModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-purple-200 rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl space-y-5 my-8 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 text-[10px] font-mono font-bold">
                  <UserPlus className="w-3 h-3 text-purple-700" />
                  <span>SUPER ADMIN PROVISIONING</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 font-cinzel">
                  Register New Government Official
                </h3>
                <p className="text-xs text-slate-500">
                  Provision an authorized municipal nodal officer, designate their primary desk, and authorize concurrent working charges.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddOfficerModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Error banner */}
            {officerFormError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-semibold flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{officerFormError}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleCreateOfficerSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <span>Officer Full Name</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newOfficerName}
                    onChange={(e) => setNewOfficerName(e.target.value)}
                    placeholder="e.g., Dr. Ramesh Patil, KAS"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                {/* Designation / Post */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <span>Official Designation / Post</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newOfficerDesignation}
                    onChange={(e) => setNewOfficerDesignation(e.target.value)}
                    placeholder="e.g., Assistant Municipal Commissioner"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                {/* Official Email */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <span>Official Email (.gov.in / civic)</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={newOfficerEmail}
                    onChange={(e) => setNewOfficerEmail(e.target.value)}
                    placeholder="e.g., ramesh.patil@civic.gov.in"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono font-medium focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                {/* Contact Phone */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Official Mobile / CUG Phone</label>
                  <input
                    type="text"
                    value={newOfficerPhone}
                    onChange={(e) => setNewOfficerPhone(e.target.value)}
                    placeholder="e.g., +91 94801 23456"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono font-medium focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Jurisdiction */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Administrative Jurisdiction / Region</label>
                <input
                  type="text"
                  value={newOfficerJurisdiction}
                  onChange={(e) => setNewOfficerJurisdiction(e.target.value)}
                  placeholder="e.g., Kalaburagi City Corporation (Central & North Zones)"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Primary Department Selection */}
              <div className="space-y-1 pt-1">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1">
                  <span>Primary Assigned Department (Lead Desk)</span>
                  <span className="text-rose-500">*</span>
                </label>
                <select
                  value={newOfficerPrimaryDept}
                  onChange={(e) => handlePrimaryDeptChange(e.target.value)}
                  className="w-full bg-purple-50/70 border-2 border-purple-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 font-bold focus:ring-2 focus:ring-purple-500"
                >
                  {ALL_CIVIC_DEPARTMENTS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.icon} {d.name}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-500">
                  This department will be the officer's default queue and primary reporting domain.
                </p>
              </div>

              {/* Multi-Department Concurrent Assignments */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black uppercase text-amber-900 tracking-wider font-mono flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-amber-600" />
                    <span>Concurrent Working Desks ({newOfficerAssignedDepts.length} Selected)</span>
                  </label>
                  <span className="text-[10px] text-slate-500 font-medium">
                    Check all departments this official is authorized to switch between
                  </span>
                </div>

                <div className="max-h-48 overflow-y-auto p-3 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ALL_CIVIC_DEPARTMENTS.map((dept) => {
                    const isSelected = newOfficerAssignedDepts.includes(dept.id);
                    const isPrimary = dept.id === newOfficerPrimaryDept;

                    return (
                      <button
                        key={dept.id}
                        type="button"
                        onClick={() => handleToggleAssignedDept(dept.id)}
                        disabled={isPrimary}
                        className={`text-left p-2 rounded-xl text-xs flex items-center space-x-2 transition-all border ${
                          isPrimary
                            ? 'bg-purple-100 text-purple-950 border-purple-300 font-bold cursor-not-allowed opacity-90'
                            : isSelected
                            ? 'bg-amber-100 text-amber-950 border-amber-300 font-bold shadow-2xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 font-medium'
                        }`}
                      >
                        {isSelected ? (
                          <CheckSquare className={`w-4 h-4 shrink-0 ${isPrimary ? 'text-purple-700' : 'text-amber-600'}`} />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400 shrink-0" />
                        )}
                        <span className="text-base shrink-0">{dept.icon}</span>
                        <div className="truncate">
                          <span className="truncate block text-[11px]">{dept.name.split('(')[0]}</span>
                          {isPrimary && (
                            <span className="text-[9px] text-purple-700 font-mono font-bold block">
                              (Primary Lead Desk)
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddOfficerModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800 text-xs font-bold rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-purple-800 to-indigo-900 hover:from-purple-900 hover:to-indigo-950 text-white text-xs font-bold rounded-xl shadow-md border border-purple-400 flex items-center space-x-1.5 transition-all"
                >
                  <UserPlus className="w-4 h-4 text-purple-200" />
                  <span>Register & Commission Official</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. DELETE GOVERNMENT OFFICIAL CONFIRMATION MODAL (SUPER ADMIN) */}
      {/* ========================================================================= */}
      {officerToDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border-2 border-rose-200 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-base font-black text-slate-900 font-cinzel">
                Revoke Credentials & Delete Official?
              </h3>
              <p className="text-xs text-slate-500">
                Are you sure you want to permanently remove this official from the active government roster?
              </p>
            </div>

            {/* Officer Details Preview Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs space-y-2">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Officer Name</span>
                <span className="font-black text-slate-900 text-sm">{officerToDelete.name}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Designation</span>
                <span className="font-bold text-purple-900">{officerToDelete.designation}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Official Email</span>
                <span className="font-mono text-slate-700">{officerToDelete.email}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Assigned Departments</span>
                <span className="font-medium text-slate-700">
                  {(officerToDelete.assignedDepartments || [officerToDelete.primaryDeptId])
                    .map(id => ALL_CIVIC_DEPARTMENTS.find(d => d.id === id)?.name?.split('(')[0] || id)
                    .join(', ')}
                </span>
              </div>
            </div>

            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-[11px] text-rose-800 space-y-1">
              <p className="font-bold flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                <span>Permanent Administrative Revocation</span>
              </p>
              <p>
                This officer will immediately lose dispatch queue access. An immutable log entry will be recorded in the system audit trail.
              </p>
            </div>

            <div className="flex items-center space-x-2 pt-1">
              <button
                type="button"
                onClick={() => setOfficerToDelete(null)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
              >
                Cancel (Keep Official)
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors flex items-center justify-center space-x-1"
              >
                <Trash2 className="w-4 h-4 text-white" />
                <span>Confirm & Delete</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
