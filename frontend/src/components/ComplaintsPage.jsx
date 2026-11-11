import React, { useState, useEffect } from 'react';
import {
  Plus, Search, Filter, CheckCircle2, Clock, AlertTriangle,
  MapPin, ThumbsUp, QrCode, Sparkles, FileText, ArrowRight,
  ShieldCheck, AlertCircle, RefreshCw, X, ChevronDown, Check,
  Share2, Eye, ShieldAlert, Building2, User
} from 'lucide-react';
import CreateComplaintModal from './CreateComplaintModal';
import ComplaintQRCard from './ComplaintQRCard';
import { api } from '../services/api';
import { t, translateStatus } from '../services/translations';

// Initial seed data for complaints if backend is loading/offline
const INITIAL_DEMO_COMPLAINTS = [
  {
    id: 'CMP-2026-001',
    reporterId: 'usr-citizen-1',
    reporterName: 'Anita Deshmukh',
    reporterPhone: '+91 9876543210',
    type: 'Roads & Public Infrastructure',
    category: 'roads',
    problem: 'Potholes / Crater on Road',
    description: 'Large deep crater pothole (~1.5m diameter) near Central University Main Gate road causing serious traffic jams and motorcycle skids during evening commute.',
    aiGeneratedDescription: 'High-severity road infrastructure hazard on University Access Road, Ward 12. Poses immediate risk to two-wheelers.',
    location: {
      address: 'Main Gate Road, CUK Campus, Kalaburagi',
      ward: 'Ward 12',
      landmark: 'Near University Entrance Arch',
      lat: 17.1582,
      lng: 76.8422
    },
    priority: 'High',
    status: 'In Progress',
    departmentId: 'dept-roads',
    departmentName: 'Roads & Civil Infrastructure Dept (PWD)',
    assignedOfficer: 'Er. Rajesh Sharma (Executive Engineer)',
    confirmations: ['usr-citizen-1', 'usr-citizen-2', 'usr-admin-1'],
    mediaUrls: ['https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=600'],
    createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
    slaDeadline: new Date(Date.now() + 12 * 3600 * 1000).toISOString(),
    routingHistory: [
      { departmentId: 'dept-roads', timestamp: new Date(Date.now() - 36 * 3600 * 1000).toISOString(), reason: 'Auto-routed to PWD Division 2.' }
    ]
  },
  {
    id: 'CMP-2026-002',
    reporterId: 'usr-citizen-1',
    reporterName: 'Anita Deshmukh',
    reporterPhone: '+91 9876543210',
    type: 'Water Supply & Sanitation',
    category: 'water',
    problem: 'Contaminated / Turbid Tap Water',
    description: 'Muddy and foul-smelling tap water flowing through municipal taps for 3 consecutive days in Sector 4. Risk of waterborne illness for families.',
    aiGeneratedDescription: 'Water Quality Alert: Mud contamination reported in municipal pipeline supply, Ward 12.',
    location: {
      address: 'House #44, CUK Faculty Colony, Kalaburagi',
      ward: 'Ward 12',
      landmark: 'Behind Community Water Tank',
      lat: 17.159,
      lng: 76.843
    },
    priority: 'Emergency',
    status: 'Submitted',
    departmentId: 'dept-water',
    departmentName: 'Water Supply & Sewerage Board (KUWSDB)',
    assignedOfficer: 'Eng. Suresh Reddy (Chief Water Officer)',
    confirmations: ['usr-citizen-1', 'usr-citizen-3'],
    mediaUrls: [],
    createdAt: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
    slaDeadline: new Date(Date.now() + 18 * 3600 * 1000).toISOString(),
    routingHistory: [
      { departmentId: 'dept-water', timestamp: new Date(Date.now() - 6 * 3600 * 1000).toISOString(), reason: 'Dispatched to KUWSDB Quality Testing Squad.' }
    ]
  },
  {
    id: 'CMP-2026-003',
    reporterId: 'usr-citizen-1',
    reporterName: 'Anita Deshmukh',
    reporterPhone: '+91 9876543210',
    type: 'Street Lighting & Electricity',
    category: 'electricity',
    problem: 'Street Light Not Functional (Single Pole)',
    description: 'Streetlight pole #42 outside ladies hostel perimeter has been defunct for 10 days, leaving the pathway completely dark after 7 PM.',
    aiGeneratedDescription: 'Public Safety & Lighting: Defunct sodium fixture on perimeter pathway, Ward 12.',
    location: {
      address: 'Perimeter Road, Near Hostel Block B, Kalaburagi',
      ward: 'Ward 12',
      landmark: 'Pole #GESCOM-42',
      lat: 17.157,
      lng: 76.841
    },
    priority: 'Normal',
    status: 'Resolved',
    departmentId: 'dept-electricity',
    departmentName: 'Electricity Board & Urban Lighting (HESCOM)',
    assignedOfficer: 'Er. P. Deshmukh (Superintending Engineer)',
    confirmations: ['usr-citizen-1'],
    mediaUrls: [],
    createdAt: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
    slaDeadline: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    resolvedAt: new Date(Date.now() - 18 * 3600 * 1000).toISOString(),
    resolutionNotes: 'Bulb and capacitor unit replaced by GESCOM line squad. Verified active.',
    routingHistory: [
      { departmentId: 'dept-electricity', timestamp: new Date(Date.now() - 72 * 3600 * 1000).toISOString(), reason: 'Assigned to Ward Lighting Inspector.' }
    ]
  },
  {
    id: 'CMP-2026-004',
    reporterId: 'usr-citizen-99',
    reporterName: 'Rahul Verma',
    reporterPhone: '+91 9845012344',
    type: 'Waste Management & Cleanliness (Swachhata)',
    category: 'waste',
    problem: 'Public Garbage Bin Overflowing',
    description: 'Commercial market garbage bin overflowing onto the pedestrian pathway. Dogs and cattle scattering plastic bags.',
    aiGeneratedDescription: 'Sanitation Alert: Overflowing dumper placer bin at Super Market Circle.',
    location: {
      address: 'Main Market Road, Near Vegetable Mandi, Kalaburagi',
      ward: 'Ward 4',
      landmark: 'Super Market Circle',
      lat: 17.3341,
      lng: 76.8285
    },
    priority: 'High',
    status: 'Submitted',
    departmentId: 'dept-waste',
    departmentName: 'Sanitation, Solid Waste & Swachh Bharat Cell',
    assignedOfficer: 'Inspector Vijay Patil (Chief Sanitary Officer)',
    confirmations: ['usr-citizen-99', 'usr-citizen-5'],
    mediaUrls: [],
    createdAt: new Date(Date.now() - 14 * 3600 * 1000).toISOString(),
    slaDeadline: new Date(Date.now() + 10 * 3600 * 1000).toISOString(),
    routingHistory: [
      { departmentId: 'dept-waste', timestamp: new Date(Date.now() - 14 * 3600 * 1000).toISOString(), reason: 'Dispatched to SWM Solid Waste Truck #KA-32-G-401.' }
    ]
  },
  {
    id: 'CMP-2026-005',
    reporterId: 'usr-citizen-88',
    reporterName: 'Sunita Patil',
    reporterPhone: '+91 9741098765',
    type: 'Women & Child Safety',
    category: 'safety',
    problem: 'Dark / Unlit Alleyway Causing Safety Hazard',
    description: 'Narrow transit alley connecting bus stop to residential layout has no illumination. Multiple complaints of harassment by antisocial elements.',
    aiGeneratedDescription: 'Vulnerable public corridor requiring immediate high-mast illumination and police patrol.',
    location: {
      address: 'Alleyway connecting Old Bus Stand to Shanti Nagar, Kalaburagi',
      ward: 'Ward 7',
      landmark: 'Near Old Bus Depot Gate 2',
      lat: 17.331,
      lng: 76.836
    },
    priority: 'Emergency',
    status: 'In Progress',
    departmentId: 'dept-safety',
    departmentName: 'Women & Child Safety / Police Special Cell',
    assignedOfficer: 'Smt. Ananya Sen (DSP Women Cell)',
    confirmations: ['usr-citizen-88', 'usr-citizen-1', 'usr-citizen-9'],
    mediaUrls: [],
    createdAt: new Date(Date.now() - 20 * 3600 * 1000).toISOString(),
    slaDeadline: new Date(Date.now() + 4 * 3600 * 1000).toISOString(),
    routingHistory: [
      { departmentId: 'dept-safety', timestamp: new Date(Date.now() - 20 * 3600 * 1000).toISOString(), reason: 'Escalated to ACP Traffic & Patrol Unit.' }
    ]
  }
];

export default function ComplaintsPage({
  currentUser,
  language = 'English',
  speakText
}) {
  const [complaints, setComplaints] = useState(() => {
    const saved = localStorage.getItem('civic_complaints_cache');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_DEMO_COMPLAINTS;
  });

  // Default to 'user' tab as required: "show user raised complaints by default"
  const [activeTab, setActiveTab] = useState('user'); // 'user' | 'all'
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterPriority, setFilterPriority] = useState('ALL');
  const [selectedQRComplaint, setSelectedQRComplaint] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('civic_complaints_cache', JSON.stringify(complaints));
  }, [complaints]);

  // Load from API on mount
  useEffect(() => {
    async function loadApiComplaints() {
      try {
        const res = await api.getComplaints();
        if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
          // Merge with initial complaints to ensure user raised items exist
          setComplaints(prev => {
            const map = new Map();
            prev.forEach(c => map.set(c.id, c));
            res.data.forEach(c => map.set(c.id, { ...c, type: c.category, problem: c.subcategory || c.category }));
            return Array.from(map.values());
          });
        }
      } catch (err) {
        console.warn('API getComplaints failed or offline, using local cache:', err);
      }
    }
    loadApiComplaints();
  }, []);

  // Show temporary toast
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Handle new complaint from modal
  const handleComplaintCreated = (newComplaint) => {
    setComplaints(prev => [newComplaint, ...prev]);
    setActiveTab('user'); // Make sure user sees their newly raised complaint!
    showToast(`Complaint #${newComplaint.id} lodged successfully! Auto-routed to department.`);
  };

  // Upvote / Confirm Complaint
  const handleConfirm = async (complaintId) => {
    const userId = currentUser?.uid || 'usr-citizen-1';
    setComplaints(prev => prev.map(c => {
      if (c.id === complaintId) {
        const hasConfirmed = c.confirmations?.includes(userId);
        const nextConfirmations = hasConfirmed
          ? c.confirmations.filter(id => id !== userId)
          : [...(c.confirmations || []), userId];
        return { ...c, confirmations: nextConfirmations };
      }
      return c;
    }));

    try {
      await api.confirmComplaint(complaintId, userId);
    } catch (e) {
      // offline fallback is already handled in state
    }
    showToast('Community confirmation recorded. Higher upvotes accelerate officer priority!');
  };

  // Dispute false resolution
  const handleDispute = async (complaintId) => {
    const reason = window.prompt('Please specify why this complaint is not properly resolved:');
    if (!reason || !reason.trim()) return;

    setComplaints(prev => prev.map(c => {
      if (c.id === complaintId) {
        return {
          ...c,
          status: 'In Progress',
          disputeNotes: reason.trim(),
          priority: 'Emergency'
        };
      }
      return c;
    }));

    try {
      await api.disputeResolution(complaintId, currentUser?.uid || 'usr-citizen-1', reason.trim());
    } catch (e) {
      // ignore
    }
    showToast(`Ticket #${complaintId} disputed and re-opened as Urgent! Vigilance alerted.`);
  };

  // Filter complaints based on Tab, Search, and Dropdowns
  const currentUserId = currentUser?.uid || 'usr-citizen-1';
  const currentUserName = currentUser?.name || 'Anita Deshmukh';

  const displayedComplaints = complaints.filter(c => {
    // 1. Tab check (Default is user raised complaints)
    if (activeTab === 'user') {
      const isOwner = (c.reporterId === currentUserId) ||
                      (c.reporterName && c.reporterName.toLowerCase() === currentUserName.toLowerCase());
      if (!isOwner) return false;
    }

    // 2. Status filter
    if (filterStatus !== 'ALL' && c.status !== filterStatus) {
      return false;
    }

    // 3. Priority filter
    if (filterPriority !== 'ALL' && c.priority !== filterPriority) {
      return false;
    }

    // 4. Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = c.id?.toLowerCase().includes(q);
      const matchProblem = c.problem?.toLowerCase().includes(q);
      const matchType = c.type?.toLowerCase().includes(q);
      const matchDesc = c.description?.toLowerCase().includes(q);
      const matchAddr = c.location?.address?.toLowerCase().includes(q);
      if (!matchId && !matchProblem && !matchType && !matchDesc && !matchAddr) {
        return false;
      }
    }

    return true;
  });

  // Count stats
  const userRaisedCount = complaints.filter(c => 
    c.reporterId === currentUserId || (c.reporterName && c.reporterName.toLowerCase() === currentUserName.toLowerCase())
  ).length;

  const inProgressCount = complaints.filter(c => c.status === 'In Progress').length;
  const resolvedCount = complaints.filter(c => c.status === 'Resolved').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 font-outfit">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-amber-400 flex items-center space-x-3 text-xs font-semibold animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner & Header */}
      <div className="bg-gradient-to-r from-amber-900 via-orange-800 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-amber-500/30">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-200 border border-amber-300/30 text-xs font-bold mb-3">
              <span>🏛️ Municipal Citizen Grievance Redressal</span>
              <span>•</span>
              <span className="font-mono">SLA Mandated</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-cinzel tracking-tight text-white">
              {t('comp_header_title', language)}
            </h1>
            <p className="text-sm text-amber-100/80 mt-1 max-w-2xl font-normal">
              {t('comp_header_sub', language)}
            </p>
          </div>

          {/* Primary Create Button */}
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="self-start md:self-auto px-6 py-3.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white font-black text-sm rounded-2xl shadow-lg shadow-orange-950/40 flex items-center space-x-2.5 transition-all transform hover:-translate-y-0.5 border border-amber-300 font-outfit"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
            <span>{t('comp_btn_lodge', language)}</span>
          </button>
        </div>

        {/* Quick KPI Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-amber-500/30 text-xs">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
            <p className="text-amber-200/80 font-medium">{t('comp_tab_my', language)}</p>
            <p className="text-xl font-black text-white font-cinzel mt-0.5">{userRaisedCount}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
            <p className="text-amber-200/80 font-medium">{t('dash_active_tickets', language)}</p>
            <p className="text-xl font-black text-white font-cinzel mt-0.5">{complaints.length}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
            <p className="text-amber-200/80 font-medium">{t('status_in_progress', language)}</p>
            <p className="text-xl font-black text-amber-300 font-cinzel mt-0.5">{inProgressCount}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
            <p className="text-amber-200/80 font-medium">{t('comp_tab_resolved', language)}</p>
            <p className="text-xl font-black text-emerald-300 font-cinzel mt-0.5">{resolvedCount}</p>
          </div>
        </div>
      </div>

      {/* Tabs & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Tab Switcher: User Raised (Default) vs All */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 self-start">
          <button
            onClick={() => setActiveTab('user')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'user'
                ? 'bg-amber-700 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>{t('comp_tab_my', language)} ({userRaisedCount})</span>
          </button>
          
          <button
            onClick={() => setActiveTab('all')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'all'
                ? 'bg-amber-700 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>{t('comp_tab_all', language)} ({complaints.length})</span>
          </button>
        </div>

        {/* Search and Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search Box */}
          <div className="relative min-w-[200px] flex-1 sm:flex-initial">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('comp_search_placeholder', language)}
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
          >
            <option value="ALL">{t('allStatuses', language)}</option>
            <option value="Submitted">{t('status_submitted', language)}</option>
            <option value="In Progress">{t('status_in_progress', language)}</option>
            <option value="Resolved">{t('status_resolved', language)}</option>
          </select>

          {/* Priority Filter */}
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
          >
            <option value="ALL">All Priorities</option>
            <option value="Emergency">Emergency</option>
            <option value="High">High</option>
            <option value="Normal">Normal</option>
          </select>
        </div>

      </div>

      {/* Notice Banner */}
      {activeTab === 'user' && (
        <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-2xl flex items-center justify-between text-xs text-amber-900 font-medium">
          <div className="flex items-center space-x-2">
            <span className="text-base">📌</span>
            <span>
              Showing complaints raised by <strong>{currentUserName}</strong>. You can add more complaints or view the entire city feed anytime.
            </span>
          </div>
          <button
            onClick={() => setActiveTab('all')}
            className="text-amber-800 font-bold hover:underline shrink-0 ml-2"
          >
            Switch to All Complaints →
          </button>
        </div>
      )}

      {/* Complaints List Grid / Feed */}
      {displayedComplaints.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-amber-50 border border-amber-200 text-amber-800 mx-auto flex items-center justify-center text-2xl shadow-inner">
            📋
          </div>
          <div className="max-w-md mx-auto space-y-1">
            <h3 className="text-base font-bold text-slate-900">
              {activeTab === 'user' ? 'No Complaints Raised Yet' : 'No Matching Complaints Found'}
            </h3>
            <p className="text-xs text-slate-500">
              {activeTab === 'user'
                ? 'You have not submitted any civic complaints yet. Click the button below to report an issue in your ward.'
                : 'Try adjusting your search terms or filters to locate specific tickets.'}
            </p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-5 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs rounded-xl shadow-md transition-all inline-flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Lodge a New Complaint</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayedComplaints.map((item) => {
            const isUserOwner = (item.reporterId === currentUserId) ||
                                (item.reporterName && item.reporterName.toLowerCase() === currentUserName.toLowerCase());
            const hasConfirmed = item.confirmations?.includes(currentUserId);
            const confirmCount = item.confirmations?.length || 0;

            const isResolved = item.status === 'Resolved';
            const isInProgress = item.status === 'In Progress';

            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl border p-5 transition-all hover:shadow-md flex flex-col justify-between space-y-4 ${
                  item.priority === 'Emergency'
                    ? 'border-rose-300 shadow-rose-100/50'
                    : isResolved
                    ? 'border-emerald-200'
                    : 'border-slate-200'
                }`}
              >
                {/* Card Header: Ticket ID, Priority, Status */}
                <div>
                  <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-100">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-bold text-amber-900 bg-amber-100/80 px-2 py-0.5 rounded-md border border-amber-200">
                          {item.id}
                        </span>
                        {isUserOwner && (
                          <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">
                            Raised By You
                          </span>
                        )}
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase font-mono ${
                          item.priority === 'Emergency'
                            ? 'bg-rose-100 text-rose-700 border border-rose-200'
                            : item.priority === 'High'
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {item.priority} Priority
                        </span>
                      </div>
                      
                      <h3 className="text-sm font-bold text-slate-900 mt-1.5 leading-snug">
                        {item.problem || item.type}
                      </h3>
                      <p className="text-[11px] text-slate-500 font-medium">
                        Domain: {item.type}
                      </p>
                    </div>

                    {/* Status Pill */}
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold shrink-0 flex items-center space-x-1 ${
                      isResolved
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : isInProgress
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : 'bg-blue-100 text-blue-800 border border-blue-200'
                    }`}>
                      {isResolved ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Resolved</span>
                        </>
                      ) : isInProgress ? (
                        <>
                          <Clock className="w-3 h-3 text-amber-600 animate-spin" />
                          <span>In Progress</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-3 h-3 text-blue-600" />
                          <span>Submitted</span>
                        </>
                      )}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-700 mt-3 leading-relaxed font-normal line-clamp-3">
                    {item.description}
                  </p>

                  {/* Location & Address */}
                  <div className="mt-3 p-2.5 bg-slate-50 rounded-xl text-xs space-y-1 border border-slate-100">
                    <div className="flex items-start space-x-1.5 text-slate-700">
                      <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                      <span className="font-semibold text-slate-800">
                        {item.location?.address || 'Kalaburagi City'}
                      </span>
                    </div>
                    {item.location?.landmark && (
                      <p className="text-[11px] text-slate-500 pl-5">
                        Landmark: {item.location.landmark}
                      </p>
                    )}
                  </div>

                  {/* Officer & SLA Note */}
                  <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-3 border-t border-slate-100 mt-3 gap-2">
                    <div>
                      <span className="font-semibold text-slate-700">Officer: </span>
                      <span>{item.assignedOfficer || 'Auto-Assigned Nodal Officer'}</span>
                    </div>
                    <div className="font-mono text-amber-800 font-medium">
                      📅 {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  
                  {/* Upvote / Confirm Button */}
                  <button
                    onClick={() => handleConfirm(item.id)}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      hasConfirmed
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                    title="Confirm this civic problem to increase officer priority"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{confirmCount} Verified</span>
                  </button>

                  <div className="flex items-center space-x-2">
                    {/* QR Code Receipt */}
                    <button
                      onClick={() => setSelectedQRComplaint(item)}
                      className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
                      title="View Digital QR Receipt"
                    >
                      <QrCode className="w-4 h-4 text-amber-800" />
                    </button>

                    {/* Dispute False Resolution (If Resolved) */}
                    {isResolved && (
                      <button
                        onClick={() => handleDispute(item.id)}
                        className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition-colors"
                        title="If the problem is not fixed, dispute to escalate to Lokayukta Vigilance"
                      >
                        Dispute Resolution
                      </button>
                    )}
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Create Complaint Modal */}
      <CreateComplaintModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        currentUser={currentUser}
        onComplaintCreated={handleComplaintCreated}
      />

      {/* QR Code Receipt Modal */}
      {selectedQRComplaint && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-amber-300 relative space-y-4">
            <button
              onClick={() => setSelectedQRComplaint(null)}
              className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-700 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
            <ComplaintQRCard
              complaint={selectedQRComplaint}
              language={language}
              speakText={speakText}
            />
          </div>
        </div>
      )}

    </div>
  );
}
