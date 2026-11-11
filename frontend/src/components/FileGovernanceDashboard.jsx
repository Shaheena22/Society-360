import React, { useState } from 'react';
import {
  FileText, Clock, AlertTriangle, ShieldAlert, CheckCircle2, TrendingUp,
  Building2, UserCheck, Users, Search, Filter, ArrowLeft, ArrowRight, Activity, Sparkles,
  Bot, Award, AlertCircle, RefreshCw, Send, History, Check, X, ChevronRight, MessageSquare
} from 'lucide-react';
import { api } from '../services/api';

export default function FileGovernanceDashboard({ speakText, currentUser, initialFeatureModule }) {
  // Active selected module feature (null = show module options grid, or selected feature ID)
  const [activeFeatureModule, setActiveFeatureModule] = useState(initialFeatureModule || null);
  
  // Delay Bucket Filter State
  const [delayFilter, setDelayFilter] = useState('all');

  // Delay Complaint Form State (Citizen feature)
  const [selectedFileForComplaint, setSelectedFileForComplaint] = useState(null);
  const [complaintReason, setComplaintReason] = useState('');
  const [complaintMsg, setComplaintMsg] = useState(null);

  // Officer Delay Justification Form State
  const [selectedFileForJustification, setSelectedFileForJustification] = useState(null);
  const [officerJustificationReason, setOfficerJustificationReason] = useState('Verification Pending at Site');
  const [officerNotes, setOfficerNotes] = useState('');
  const [justificationMsg, setJustificationMsg] = useState(null);

  // Mock File Dataset covering all delay monitoring attributes
  const [filesList] = useState([
    {
      id: 'FILE-2026-104',
      title: 'Main Arterial Road Pothole & Sewer Leakage',
      category: 'Civic Infrastructure & Sanitation',
      department: 'Sanitation & Solid Waste Board',
      officer: 'Inspector Vijay Patil',
      officerScore: 96,
      createdDaysAgo: 4,
      slaDays: 5,
      delayDays: 0,
      priority: 'High',
      status: 'Under Process',
      currentStep: 2,
      expectedCompletion: '2026-08-09',
      aiDelayPrediction: 'Low Risk (12% delay likelihood)',
      delayReason: 'None • On Track',
      escalationLevel: 'Level 0 (Assigned Officer)'
    },
    {
      id: 'FILE-2026-089',
      title: 'Commercial Complex Illegal Waste Dumping',
      category: 'Civic Infrastructure & Sanitation',
      department: 'Sanitation & Solid Waste Board',
      officer: 'Er. Rajesh Sharma',
      officerScore: 91,
      createdDaysAgo: 38,
      slaDays: 7,
      delayDays: 31,
      priority: 'High',
      status: 'Delayed > 30 Days',
      currentStep: 3,
      expectedCompletion: '2026-08-12',
      aiDelayPrediction: 'High Risk (89% delay likelihood)',
      delayReason: 'Site Inspection Clearance Pending',
      escalationLevel: 'Level 2 (Department Head Escalated)'
    },
    {
      id: 'FILE-2026-062',
      title: 'Ward 12 Drinking Water Pipe Burst & Contamination',
      category: 'Civic Infrastructure & Sanitation',
      department: 'Water Supply & Sewerage Board',
      officer: 'Eng. Suresh Reddy',
      officerScore: 88,
      createdDaysAgo: 18,
      slaDays: 3,
      delayDays: 15,
      priority: 'High',
      status: 'Delayed > 15 Days',
      currentStep: 3,
      expectedCompletion: '2026-08-10',
      aiDelayPrediction: 'Moderate Risk (65% delay likelihood)',
      delayReason: 'Replacement Material Allocation',
      escalationLevel: 'Level 1 (Supervisor Alerted)'
    },
    {
      id: 'FILE-2026-041',
      title: 'Bribe Demand Complaint Against Permit Clearance',
      category: 'Anti-Corruption & Vigilance',
      department: 'Anti-Corruption & Vigilance Directorate',
      officer: 'Director K. Singh',
      officerScore: 94,
      createdDaysAgo: 65,
      slaDays: 14,
      delayDays: 51,
      priority: 'High',
      status: 'Delayed > 60 Days',
      currentStep: 4,
      expectedCompletion: '2026-08-15',
      aiDelayPrediction: 'Critical Delay Risk (94%)',
      delayReason: 'Legal Compliance Audit Pending',
      escalationLevel: 'Level 3 (Director General Escalated)'
    },
    {
      id: 'FILE-2026-118',
      title: 'Senior Citizen Pension Certificate Processing Delay',
      category: 'Social Rights & Welfare',
      department: 'Social Welfare Cell',
      officer: 'Officer Meena Rao',
      officerScore: 85,
      createdDaysAgo: 9,
      slaDays: 7,
      delayDays: 2,
      priority: 'Normal',
      status: 'Delayed > 7 Days',
      currentStep: 2,
      expectedCompletion: '2026-08-08',
      aiDelayPrediction: 'Near SLA Breach (45%)',
      delayReason: 'Document Verification Delay',
      escalationLevel: 'Level 1 (Supervisor Reminder Sent)'
    }
  ]);

  // Officer performance metrics
  const officerRankings = [
    { name: 'Inspector Vijay Patil', dept: 'Sanitation Board', score: 96, avgTime: '14.2 Hrs', pending: 8, overdue: 0, status: 'Active' },
    { name: 'Director K. Singh', dept: 'Anti-Corruption Cell', score: 94, avgTime: '16.5 Hrs', pending: 3, overdue: 1, status: 'Active' },
    { name: 'Er. Rajesh Sharma', dept: 'Roads & Civil Infra', score: 91, avgTime: '19.8 Hrs', pending: 12, overdue: 3, status: 'Active' },
    { name: 'Eng. Suresh Reddy', dept: 'Water Supply Board', score: 88, avgTime: '22.1 Hrs', pending: 9, overdue: 2, status: 'Active' },
    { name: 'Officer Meena Rao', dept: 'Social Welfare Cell', score: 85, avgTime: '26.4 Hrs', pending: 14, overdue: 4, status: 'Active' },
    { name: 'Officer K. Verma', dept: 'Urban Planning Dept', score: 62, avgTime: '72.0 Hrs', pending: 22, overdue: 11, status: 'Inactive (5 Days)' }
  ];

  // Department efficiency rankings
  const departmentRankings = [
    { name: 'Sanitation & Solid Waste Board', score: 98, responseTime: '4.2 Hrs', resolutionRate: '98.5%', status: 'Top Performer' },
    { name: 'Water Supply & Sewerage Board', score: 92, responseTime: '8.6 Hrs', resolutionRate: '94.0%', status: 'Top Performer' },
    { name: 'Roads & Civil Infrastructure', score: 87, responseTime: '14.1 Hrs', resolutionRate: '89.2%', status: 'Average' },
    { name: 'Anti-Corruption & Vigilance', score: 82, responseTime: '18.5 Hrs', resolutionRate: '84.5%', status: 'Average' },
    { name: 'Social Welfare Cell', score: 74, responseTime: '32.0 Hrs', resolutionRate: '76.1%', status: 'Underperforming' }
  ];

  // Filter files based on active module selection
  const getFilteredFiles = (moduleKey) => {
    if (moduleKey === 'delay_7d') return filesList.filter(f => f.delayDays >= 7 && f.delayDays < 15);
    if (moduleKey === 'delay_15d') return filesList.filter(f => f.delayDays >= 15 && f.delayDays < 30);
    if (moduleKey === 'delay_30d') return filesList.filter(f => f.delayDays >= 30 && f.delayDays < 60);
    if (moduleKey === 'delay_60d') return filesList.filter(f => f.delayDays >= 60);
    if (delayFilter === '7d') return filesList.filter(f => f.delayDays >= 7 && f.delayDays < 15);
    if (delayFilter === '15d') return filesList.filter(f => f.delayDays >= 15 && f.delayDays < 30);
    if (delayFilter === '30d') return filesList.filter(f => f.delayDays >= 30 && f.delayDays < 60);
    if (delayFilter === '60d') return filesList.filter(f => f.delayDays >= 60);
    return filesList;
  };

  const handleLodgeComplaintAgainstDelay = async (e) => {
    e.preventDefault();
    if (!selectedFileForComplaint) return;
    const res = await api.submitDelayComplaint(selectedFileForComplaint.id, complaintReason, currentUser?.uid || 'usr-citizen-1');
    setComplaintMsg(res.message);
    if (speakText) speakText(res.message);
    setSelectedFileForComplaint(null);
    setComplaintReason('');
  };

  const handleOfficerJustificationSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFileForJustification) return;
    const res = await api.submitDelayJustification(selectedFileForJustification.id, currentUser?.uid || 'usr-staff-roads', officerJustificationReason + ': ' + officerNotes);
    setJustificationMsg(res.message);
    if (speakText) speakText(res.message);
    setSelectedFileForJustification(null);
    setOfficerNotes('');
  };

  return (
    <div className="space-y-6 font-outfit text-amber-950">
      
      {/* 1. TOP ROYAL ETHNIC GOVERNANCE BANNER */}
      <div className="ethnic-card p-6 rounded-3xl bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 text-white border-2 border-amber-400 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-300 font-bold text-xs uppercase tracking-wider mb-1 font-cinzel">
            <Building2 className="w-4 h-4 text-amber-400" />
            <span>Public Governance & File Delay Monitoring System • IEEE 830 Standard</span>
          </div>
          <h2 className="text-2xl font-black font-cinzel text-white">
            Public Governance & Delay Features
          </h2>
          <p className="text-xs text-amber-100/90 mt-1 font-bold">
            Select a specific governance module option below to view detailed tracking & SLA metrics
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <span className="px-3.5 py-1.5 bg-amber-500/20 text-amber-300 border border-amber-400/50 rounded-xl text-xs font-bold font-mono">
            SLA Compliance: 94.2% 🟢
          </span>
        </div>
      </div>

      {/* SUCCESS / COMPLAINT NOTIFICATION ALERTS */}
      {complaintMsg && (
        <div className="p-4 bg-emerald-50 border-2 border-emerald-400 rounded-2xl text-xs font-bold text-emerald-900 flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>{complaintMsg}</span>
          </div>
          <button onClick={() => setComplaintMsg(null)} className="text-emerald-700 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {justificationMsg && (
        <div className="p-4 bg-amber-50 border-2 border-amber-400 rounded-2xl text-xs font-bold text-amber-950 flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-amber-700" />
            <span>{justificationMsg}</span>
          </div>
          <button onClick={() => setJustificationMsg(null)} className="text-amber-700 hover:text-amber-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. MAIN MODULE OPTIONS GRID (Select Feature One by One) */}
      {/* ========================================================================= */}
      {activeFeatureModule === null && (
        <div className="space-y-4">
          <div className="text-center space-y-1">
            <h3 className="text-lg font-black font-cinzel text-amber-950">Select a Governance Feature Option</h3>
            <p className="text-xs text-amber-800/80 font-bold">Choose an option card to open its dedicated view</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* Option 1: Civic File Delay > 7 Days */}
            <button
              onClick={() => {
                setActiveFeatureModule('delay_7d');
                speakText?.('Viewing Civic File Delay Greater Than 7 Days');
              }}
              className="ethnic-card p-5 rounded-3xl text-left space-y-3 hover:scale-[1.02] transition-transform gold-glow border-2 border-amber-300 group"
            >
              <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-xl font-bold text-amber-900">
                📁
              </div>
              <div>
                <h4 className="text-sm font-bold text-amber-950 group-hover:text-amber-700 flex items-center justify-between">
                  <span>Civic File Delay &gt; 7 Days</span>
                  <ChevronRight className="w-4 h-4 text-amber-600" />
                </h4>
                <p className="text-xs text-amber-800/80 mt-0.5">Files pending between 7 to 14 days with initial supervisor alerts.</p>
              </div>
            </button>

            {/* Option 2: Civic File Delay > 15 Days */}
            <button
              onClick={() => {
                setActiveFeatureModule('delay_15d');
                speakText?.('Viewing Civic File Delay Greater Than 15 Days');
              }}
              className="ethnic-card p-5 rounded-3xl text-left space-y-3 hover:scale-[1.02] transition-transform gold-glow border-2 border-orange-300 group"
            >
              <div className="w-10 h-10 rounded-2xl bg-orange-100 border border-orange-300 flex items-center justify-center text-xl font-bold text-orange-900">
                📁
              </div>
              <div>
                <h4 className="text-sm font-bold text-amber-950 group-hover:text-orange-700 flex items-center justify-between">
                  <span>Civic File Delay &gt; 15 Days</span>
                  <ChevronRight className="w-4 h-4 text-orange-600" />
                </h4>
                <p className="text-xs text-amber-800/80 mt-0.5">Moderate delay cases requiring officer review and status update.</p>
              </div>
            </button>

            {/* Option 3: Civic File Delay > 30 Days */}
            <button
              onClick={() => {
                setActiveFeatureModule('delay_30d');
                speakText?.('Viewing Civic File Delay Greater Than 30 Days');
              }}
              className="ethnic-card p-5 rounded-3xl text-left space-y-3 hover:scale-[1.02] transition-transform gold-glow border-2 border-rose-400 group bg-rose-50/20"
            >
              <div className="w-10 h-10 rounded-2xl bg-rose-100 border border-rose-300 flex items-center justify-center text-xl font-bold text-rose-900">
                📁
              </div>
              <div>
                <h4 className="text-sm font-bold text-amber-950 group-hover:text-rose-700 flex items-center justify-between">
                  <span>Civic File Delay &gt; 30 Days</span>
                  <ChevronRight className="w-4 h-4 text-rose-600" />
                </h4>
                <p className="text-xs text-amber-800/80 mt-0.5">Critical overdue files auto-escalated to Department Head.</p>
              </div>
            </button>

            {/* Option 4: Civic File Delay > 60 Days */}
            <button
              onClick={() => {
                setActiveFeatureModule('delay_60d');
                speakText?.('Viewing Civic File Delay Greater Than 60 Days');
              }}
              className="ethnic-card p-5 rounded-3xl text-left space-y-3 hover:scale-[1.02] transition-transform gold-glow border-2 border-purple-400 group bg-purple-50/20"
            >
              <div className="w-10 h-10 rounded-2xl bg-purple-100 border border-purple-300 flex items-center justify-center text-xl font-bold text-purple-900">
                📁
              </div>
              <div>
                <h4 className="text-sm font-bold text-amber-950 group-hover:text-purple-700 flex items-center justify-between">
                  <span>Civic File Delay &gt; 60 Days</span>
                  <ChevronRight className="w-4 h-4 text-purple-600" />
                </h4>
                <p className="text-xs text-amber-800/80 mt-0.5">Severe bottleneck cases escalated to Director General oversight.</p>
              </div>
            </button>

            {/* Option 5: SLA Compliance & Multi-Level Escalation */}
            <button
              onClick={() => {
                setActiveFeatureModule('sla_escalation');
                speakText?.('Viewing SLA Compliance and Multi-Level Escalation Hierarchy');
              }}
              className="ethnic-card p-5 rounded-3xl text-left space-y-3 hover:scale-[1.02] transition-transform gold-glow border-2 border-amber-400 group"
            >
              <div className="w-10 h-10 rounded-2xl bg-amber-700 text-white flex items-center justify-center text-xl font-bold">
                🚨
              </div>
              <div>
                <h4 className="text-sm font-bold text-amber-950 group-hover:text-amber-700 flex items-center justify-between">
                  <span>SLA & Multi-Level Escalation</span>
                  <ChevronRight className="w-4 h-4 text-amber-600" />
                </h4>
                <p className="text-xs text-amber-800/80 mt-0.5">4-tier escalation hierarchy (Officer → Supervisor → Head → Director).</p>
              </div>
            </button>

            {/* Option 6: Delay Analytics & Department Heatmap */}
            <button
              onClick={() => {
                setActiveFeatureModule('analytics');
                speakText?.('Viewing Delay Analytics and Department Heatmap');
              }}
              className="ethnic-card p-5 rounded-3xl text-left space-y-3 hover:scale-[1.02] transition-transform gold-glow border-2 border-amber-400 group"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-800 to-blue-700 text-white flex items-center justify-center text-xl font-bold">
                📈
              </div>
              <div>
                <h4 className="text-sm font-bold text-amber-950 group-hover:text-indigo-800 flex items-center justify-between">
                  <span>Delay Analytics & Heatmap</span>
                  <ChevronRight className="w-4 h-4 text-indigo-700" />
                </h4>
                <p className="text-xs text-amber-800/80 mt-0.5">Root cause breakdown, peak delay times & department heatmaps.</p>
              </div>
            </button>

            {/* Option 7: Officer & Department Productivity */}
            <button
              onClick={() => {
                setActiveFeatureModule('officer_dept');
                speakText?.('Viewing Officer and Department Productivity Scores');
              }}
              className="ethnic-card p-5 rounded-3xl text-left space-y-3 hover:scale-[1.02] transition-transform gold-glow border-2 border-amber-400 group"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-800 to-teal-700 text-white flex items-center justify-center text-xl font-bold">
                👤
              </div>
              <div>
                <h4 className="text-sm font-bold text-amber-950 group-hover:text-emerald-800 flex items-center justify-between">
                  <span>Officer & Dept Ranking</span>
                  <ChevronRight className="w-5 h-5 text-emerald-700" />
                </h4>
                <p className="text-xs text-amber-800/80 mt-0.5">Efficiency scorecards, pending workload & inactive officer alerts.</p>
              </div>
            </button>

            {/* Option 8: AI Delay Prediction & Tracking */}
            <button
              onClick={() => {
                setActiveFeatureModule('live_tracking');
                speakText?.('Viewing AI Delay Prediction and Live File Tracking');
              }}
              className="ethnic-card p-5 rounded-3xl text-left space-y-3 hover:scale-[1.02] transition-transform gold-glow border-2 border-amber-400 group"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-700 to-orange-600 text-white flex items-center justify-center text-xl font-bold">
                🤖
              </div>
              <div>
                <h4 className="text-base font-bold text-amber-950 group-hover:text-amber-700 flex items-center justify-between">
                  <span>AI Delay Prediction & Tracking</span>
                  <ChevronRight className="w-5 h-5 text-amber-600" />
                </h4>
                <p className="text-xs text-amber-800/80 mt-0.5">AI completion date predictions, delay risk scores & movement history.</p>
              </div>
            </button>

            {/* Option 9: Lodge Delay Complaint & Officer Justifications */}
            <button
              onClick={() => {
                setActiveFeatureModule('accountability');
                speakText?.('Viewing Lodge Delay Complaint and Officer Justification');
              }}
              className="ethnic-card p-5 rounded-3xl text-left space-y-3 hover:scale-[1.02] transition-transform gold-glow border-2 border-rose-400 group"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-700 to-red-600 text-white flex items-center justify-center text-xl font-bold">
                📝
              </div>
              <div>
                <h4 className="text-base font-bold text-amber-950 group-hover:text-rose-700 flex items-center justify-between">
                  <span>Lodge Delay Complaint & Audit</span>
                  <ChevronRight className="w-5 h-5 text-rose-600" />
                </h4>
                <p className="text-xs text-amber-800/80 mt-0.5">1-click citizen complaint against delay & officer justification forms.</p>
              </div>
            </button>

            {/* Option 10: Governance Dashboard Widgets */}
            <button
              onClick={() => {
                setActiveFeatureModule('widgets');
                speakText?.('Viewing Governance Live Status Widgets');
              }}
              className="ethnic-card p-5 rounded-3xl text-left space-y-3 hover:scale-[1.02] transition-transform gold-glow border-2 border-amber-400 group"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-slate-900 to-indigo-900 text-white flex items-center justify-center text-xl font-bold">
                🟢
              </div>
              <div>
                <h4 className="text-base font-bold text-amber-950 group-hover:text-indigo-800 flex items-center justify-between">
                  <span>Governance Live Widgets</span>
                  <ChevronRight className="w-5 h-5 text-indigo-700" />
                </h4>
                <p className="text-xs text-amber-800/80 mt-0.5">10 live status cards: Total Received, SLA %, Escalated, Satisfaction.</p>
              </div>
            </button>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. DEDICATED MODULE FEATURE VIEW (With "Back to Governance Modules" button) */}
      {/* ========================================================================= */}
      {activeFeatureModule !== null && (
        <div className="space-y-5">
          
          {/* Back Navigation Bar */}
          <div className="flex items-center justify-between border-b border-amber-300 pb-3">
            <button
              onClick={() => {
                setActiveFeatureModule(null);
                speakText?.('Returned to Governance Feature Options');
              }}
              className="px-3.5 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 text-xs font-bold flex items-center space-x-1 border border-amber-300 shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>← Back to Governance Modules</span>
            </button>

            <span className="text-xs font-bold font-cinzel text-amber-900 uppercase">
              {activeFeatureModule.startsWith('delay_') ? `Civic File Delay Threshold: ${activeFeatureModule.replace('delay_', '> ')}` : activeFeatureModule.toUpperCase()}
            </span>
          </div>

          {/* FEATURE 1: DELAY BUCKETS (>7, >15, >30, >60 Days) */}
          {(activeFeatureModule.startsWith('delay_') || activeFeatureModule === 'delay_buckets') && (
            <div className="space-y-4">
              <div className="ethnic-card p-5 rounded-3xl space-y-4 border-2 border-amber-300 shadow-md">
                <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                  <h4 className="text-sm font-bold text-amber-950 font-cinzel">
                    Files Filtered by Threshold: {activeFeatureModule.replace('delay_', 'Overdue > ')}
                  </h4>
                  <span className="text-xs font-bold font-mono bg-amber-100 text-amber-900 px-3 py-1 rounded-full border border-amber-300">
                    {getFilteredFiles(activeFeatureModule).length} Overdue Files Found
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-amber-300 bg-amber-100/70 text-amber-950 font-bold">
                        <th className="p-3">File ID</th>
                        <th className="p-3">Title & Category</th>
                        <th className="p-3">Department & Officer</th>
                        <th className="p-3">SLA / Delay Days</th>
                        <th className="p-3">Status & Escalation</th>
                        <th className="p-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-amber-200">
                      {getFilteredFiles(activeFeatureModule).map((f) => (
                        <tr key={f.id} className="hover:bg-amber-50/50">
                          <td className="p-3 font-mono font-bold text-amber-900">{f.id}</td>
                          <td className="p-3">
                            <p className="font-bold text-amber-950">{f.title}</p>
                            <p className="text-[10px] text-amber-800 font-semibold">{f.category}</p>
                          </td>
                          <td className="p-3">
                            <p className="font-bold text-slate-800">{f.department}</p>
                            <p className="text-[10px] text-slate-600 font-semibold">Handling: {f.officer} (Score: {f.officerScore}%)</p>
                          </td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                              f.delayDays > 30 ? 'bg-rose-100 text-rose-900 border border-rose-300' : 'bg-amber-100 text-amber-900 border border-amber-300'
                            }`}>
                              {f.delayDays > 0 ? `+${f.delayDays} Days Overdue` : 'On Time'}
                            </span>
                            <p className="text-[10px] text-slate-500 mt-0.5">SLA Limit: {f.slaDays} Days</p>
                          </td>
                          <td className="p-3">
                            <p className="font-bold text-slate-900 text-[11px]">{f.status}</p>
                            <span className="text-[10px] text-purple-900 bg-purple-100 px-2 py-0.5 rounded-full font-semibold border border-purple-300">
                              {f.escalationLevel}
                            </span>
                          </td>
                          <td className="p-3 text-right space-x-1">
                            <button
                              onClick={() => { setSelectedFileForComplaint(f); setActiveFeatureModule('accountability'); }}
                              className="px-2.5 py-1 bg-rose-600 text-white rounded-lg text-[10px] font-bold hover:bg-rose-700"
                            >
                              Lodge Complaint
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* FEATURE 2: GOVERNANCE DASHBOARD WIDGETS */}
          {activeFeatureModule === 'widgets' && (
            <div className="space-y-6">
              <div className="border-b border-amber-200 pb-2">
                <h3 className="text-base font-black font-cinzel text-amber-950">
                  🟢 Governance Dashboard Live Status Widgets (10 Metrics)
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                <div className="ethnic-card p-4 rounded-2xl border-2 border-emerald-400 bg-emerald-50/40 text-center space-y-1 gold-glow">
                  <span className="text-xs font-bold text-emerald-950">🟢 Total Files Received</span>
                  <p className="text-2xl font-black text-emerald-950 font-mono">1,248</p>
                </div>
                <div className="ethnic-card p-4 rounded-2xl border-2 border-amber-400 bg-amber-50/40 text-center space-y-1 gold-glow">
                  <span className="text-xs font-bold text-amber-950">🟡 Files Under Process</span>
                  <p className="text-2xl font-black text-amber-950 font-mono">142</p>
                </div>
                <div className="ethnic-card p-4 rounded-2xl border-2 border-rose-400 bg-rose-50/40 text-center space-y-1 gold-glow">
                  <span className="text-xs font-bold text-rose-950">🔴 Delayed &gt; 30 Days</span>
                  <p className="text-2xl font-black text-rose-950 font-mono">18</p>
                </div>
                <div className="ethnic-card p-4 rounded-2xl border-2 border-blue-400 bg-blue-50/40 text-center space-y-1 gold-glow">
                  <span className="text-xs font-bold text-blue-950">🔵 Resolved Today</span>
                  <p className="text-2xl font-black text-blue-950 font-mono">34</p>
                </div>
                <div className="ethnic-card p-4 rounded-2xl border-2 border-indigo-400 bg-indigo-50/40 text-center space-y-1 gold-glow">
                  <span className="text-xs font-bold text-indigo-950">📈 Avg Processing Time</span>
                  <p className="text-2xl font-black text-indigo-950 font-mono">18.4 Hrs</p>
                </div>
                <div className="ethnic-card p-4 rounded-2xl border-2 border-teal-400 bg-teal-50/40 text-center space-y-1 gold-glow">
                  <span className="text-xs font-bold text-teal-950">📊 SLA Compliance %</span>
                  <p className="text-2xl font-black text-teal-950 font-mono">94.2%</p>
                </div>
                <div className="ethnic-card p-4 rounded-2xl border-2 border-purple-400 bg-purple-50/40 text-center space-y-1 gold-glow">
                  <span className="text-xs font-bold text-purple-950">🚨 Escalated Files</span>
                  <p className="text-2xl font-black text-purple-950 font-mono">12</p>
                </div>
                <div className="ethnic-card p-4 rounded-2xl border-2 border-amber-400 bg-amber-50/40 text-center space-y-1 gold-glow">
                  <span className="text-xs font-bold text-amber-950">👤 Active Officers</span>
                  <p className="text-2xl font-black text-amber-950 font-mono">48</p>
                </div>
                <div className="ethnic-card p-4 rounded-2xl border-2 border-cyan-400 bg-cyan-50/40 text-center space-y-1 gold-glow">
                  <span className="text-xs font-bold text-cyan-950">🏢 Dept Performance</span>
                  <p className="text-2xl font-black text-cyan-950 font-mono">88.5%</p>
                </div>
                <div className="ethnic-card p-4 rounded-2xl border-2 border-amber-400 bg-amber-50/40 text-center space-y-1 gold-glow">
                  <span className="text-xs font-bold text-amber-950">⭐ Citizen Score</span>
                  <p className="text-2xl font-black text-amber-950 font-mono">4.8 / 5.0</p>
                </div>
              </div>
            </div>
          )}

          {/* FEATURE 3: SLA & MULTI-LEVEL ESCALATION */}
          {activeFeatureModule === 'sla_escalation' && (
            <div className="ethnic-card p-6 rounded-3xl space-y-4 border-2 border-amber-300 shadow-md">
              <h4 className="text-sm font-bold text-amber-950 uppercase tracking-wider text-center font-cinzel">
                Automatic SLA Escalation Workflow Hierarchy
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-300 space-y-1">
                  <span className="text-xs font-bold text-amber-900">Level 1 (Day 1 - 7)</span>
                  <p className="text-xs font-black text-amber-950">Handling Officer</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-2xl border border-orange-300 space-y-1">
                  <span className="text-xs font-bold text-orange-900">Level 2 (Day 8 - 15)</span>
                  <p className="text-xs font-black text-orange-950">Supervisor Alert</p>
                </div>
                <div className="p-3 bg-rose-50 rounded-2xl border border-rose-300 space-y-1">
                  <span className="text-xs font-bold text-rose-900">Level 3 (Day 16 - 30)</span>
                  <p className="text-xs font-black text-rose-950">Department Head</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-2xl border border-purple-300 space-y-1">
                  <span className="text-xs font-bold text-purple-900">Level 4 (&gt; 30 Days)</span>
                  <p className="text-xs font-black text-purple-950">Director General Oversight</p>
                </div>
              </div>
            </div>
          )}

          {/* FEATURE 4: DELAY ANALYTICS */}
          {activeFeatureModule === 'analytics' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="ethnic-card p-5 rounded-3xl space-y-4 border-2 border-amber-300 shadow-md">
                <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider">Primary Delay Reasons Breakdown</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-amber-950 mb-1">
                      <span>1. Site Verification Clearance Pending</span>
                      <span>38%</span>
                    </div>
                    <div className="w-full bg-amber-100 rounded-full h-2 border border-amber-300">
                      <div className="bg-amber-600 h-2 rounded-full w-[38%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold text-amber-950 mb-1">
                      <span>2. Inspector & Field Staff Shortage</span>
                      <span>28%</span>
                    </div>
                    <div className="w-full bg-amber-100 rounded-full h-2 border border-amber-300">
                      <div className="bg-orange-600 h-2 rounded-full w-[28%]"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="ethnic-card p-5 rounded-3xl space-y-4 border-2 border-amber-300 shadow-md">
                <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider">Department Delay Index</h4>
                <div className="space-y-2">
                  <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-300 flex justify-between text-xs font-bold">
                    <span>Sanitation & Waste Board</span>
                    <span>0.4 Days Avg Delay</span>
                  </div>
                  <div className="p-2.5 bg-rose-50 rounded-xl border border-rose-300 flex justify-between text-xs font-bold">
                    <span>Social Welfare & Pension Cell</span>
                    <span>9.5 Days Avg Delay</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FEATURE 5: OFFICER & DEPT RANKING */}
          {activeFeatureModule === 'officer_dept' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="ethnic-card p-5 rounded-3xl space-y-3 border-2 border-amber-300 shadow-md">
                <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider">Officer Productivity Rankings</h4>
                <div className="space-y-2">
                  {officerRankings.map((off, idx) => (
                    <div key={idx} className="p-3 bg-white rounded-2xl border border-amber-200 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-amber-950">{off.name}</p>
                        <p className="text-[10px] text-amber-800">{off.dept} • Avg: {off.avgTime}</p>
                      </div>
                      <span className="font-mono font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full">
                        Score: {off.score}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="ethnic-card p-5 rounded-3xl space-y-3 border-2 border-amber-300 shadow-md">
                <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider">Department Overall Rankings</h4>
                <div className="space-y-2">
                  {departmentRankings.map((dept, idx) => (
                    <div key={idx} className="p-3 bg-white rounded-2xl border border-amber-200 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-amber-950">{dept.name}</p>
                        <p className="text-[10px] text-amber-800">Resolution: {dept.resolutionRate}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                        Score: {dept.score}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* FEATURE 6: AI DELAY PREDICTION & TRACKING */}
          {activeFeatureModule === 'live_tracking' && (
            <div className="ethnic-card p-6 rounded-3xl space-y-5 border-2 border-amber-300 shadow-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-amber-200 pb-3">
                <div>
                  <span className="text-xs font-bold text-amber-800 font-mono">Selected Track File: FILE-2026-089</span>
                  <h4 className="text-base font-bold text-amber-950">Commercial Complex Illegal Waste Dumping</h4>
                </div>
                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-300 text-right">
                  <span className="text-[11px] font-bold text-amber-900 flex items-center justify-end gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>AI Delay Risk Prediction</span>
                  </span>
                  <p className="text-xs font-black text-rose-700">High Risk (89% Delay Likelihood)</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-300 text-xs">
                  <p className="font-bold text-emerald-950">Step 1: Complaint Filed & Documented (2026-07-01)</p>
                </div>
                <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-300 text-xs">
                  <p className="font-bold text-emerald-950">Step 2: Smart Officer Assigned to Er. Rajesh Sharma (2026-07-02)</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-300 text-xs">
                  <p className="font-bold text-amber-950">Step 3: Field Verification (IN PROGRESS - Handling Officer: Er. Rajesh Sharma)</p>
                </div>
              </div>
            </div>
          )}

          {/* FEATURE 7: LODGE DELAY COMPLAINT & OFFICER JUSTIFICATION */}
          {activeFeatureModule === 'accountability' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="ethnic-card p-5 rounded-3xl space-y-4 border-2 border-rose-300 shadow-md">
                <h4 className="text-xs font-bold text-rose-950 uppercase tracking-wider font-cinzel">
                  1-Click Citizen Complaint Against Delay
                </h4>
                <form onSubmit={handleLodgeComplaintAgainstDelay} className="space-y-3 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-amber-950">Select Overdue File ID</label>
                    <select
                      onChange={(e) => setSelectedFileForComplaint(filesList.find(f => f.id === e.target.value))}
                      className="w-full bg-white border border-amber-300 rounded-xl p-2 font-bold"
                    >
                      <option value="">-- Choose Overdue File --</option>
                      {filesList.filter(f => f.delayDays > 0).map(f => (
                        <option key={f.id} value={f.id}>{f.id} - {f.title} ({f.delayDays}d overdue)</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-amber-950">Reason for Delay Complaint</label>
                    <textarea
                      rows={3}
                      placeholder="Describe inconvenience caused by SLA delay..."
                      value={complaintReason}
                      onChange={(e) => setComplaintReason(e.target.value)}
                      required
                      className="w-full bg-white border border-amber-300 rounded-xl p-2 font-medium"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs rounded-xl shadow-sm"
                  >
                    Lodge Complaint Against Delay & Alert Supervisor
                  </button>
                </form>
              </div>

              <div className="ethnic-card p-5 rounded-3xl space-y-4 border-2 border-amber-400 shadow-md">
                <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider font-cinzel">
                  Officer Delay Justification Form
                </h4>
                <form onSubmit={handleOfficerJustificationSubmit} className="space-y-3 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-amber-950">Select File Requiring Justification</label>
                    <select
                      onChange={(e) => setSelectedFileForJustification(filesList.find(f => f.id === e.target.value))}
                      className="w-full bg-white border border-amber-300 rounded-xl p-2 font-bold"
                    >
                      <option value="">-- Choose Pending File --</option>
                      {filesList.map(f => (
                        <option key={f.id} value={f.id}>{f.id} - {f.title}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-amber-950">Officer Detailed Justification Note</label>
                    <textarea
                      rows={2}
                      placeholder="Provide mandatory official explanation for audit trail..."
                      value={officerNotes}
                      onChange={(e) => setOfficerNotes(e.target.value)}
                      required
                      className="w-full bg-white border border-amber-300 rounded-xl p-2 font-medium"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs rounded-xl shadow-sm"
                  >
                    Submit Official Justification to Audit Log
                  </button>
                </form>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
