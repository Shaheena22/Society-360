import React, { useState } from 'react';
import {
  Building2, Phone, AlertTriangle, CheckCircle2, ShieldCheck,
  FileText, Clock, ArrowLeft, Send, Sparkles, MapPin,
  Calendar, FileCheck, DollarSign, UserX, AlertOctagon, HelpCircle
} from 'lucide-react';

export const GOVERNANCE_SUBCATEGORIES = [
  { id: 'gov_service_delay', name: '1. Government Service Delay', icon: '📄', desc: 'Pending citizen service applications beyond standard Citizen Charter SLA days' },
  { id: 'gov_office_delay', name: '2. Office Service Delay', icon: '🏢', desc: 'Unresponsive department counters, missing staff & repeated office visits without result' },
  { id: 'gov_scheme_payment_delay', name: '3. Benefit/Scheme Payment Delay', icon: '💳', desc: 'Delayed DBT subsidies, withheld housing installments & unpaid scholarship funds' },
  { id: 'gov_cert_delay', name: '4. Certificate/Document Delay', icon: '📑', desc: 'Pending Caste, Income, Domicile, Mutation & Birth/Death certificates' },
  { id: 'gov_school_misconduct', name: '5. School/College Official Misconduct', icon: '🏫', desc: 'Illegal capitation fees, certificate withholding & discriminatory administration' },
  { id: 'gov_health_corruption', name: '6. Healthcare Service Corruption', icon: '🏥', desc: 'Selling free hospital medicines, demanding cash for operations & fake lab tests' },
  { id: 'gov_bribery_demand', name: '7. Bribery / Illegal Payment Demand', icon: '💰', desc: 'Direct bribe solicitation, agent commissions & speed-money extortion' },
  { id: 'gov_officer_misconduct', name: '8. Government Officer Misconduct', icon: '📢', desc: 'Harassment, verbal abuse, intentional harassment & insubordination' },
  { id: 'gov_complaint_not_actioned', name: '9. Complaint Not Actioned', icon: '📝', desc: 'Previous grievance closed without resolution or no action taken after multiple reminders' },
  { id: 'gov_excessive_delay', name: '10. Excessive Administrative Delay', icon: '⏳', desc: 'Severe delay (> 30 days) with automatic Lokayukta / Janaspandana escalation flag' }
];

export default function PublicGovernanceDashboard({ speakText, currentUser, initialFeatureModule, onBack, hideOtherModules = true }) {
  const [selectedSubcategory, setSelectedSubcategory] = useState(
    initialFeatureModule || 'gov_service_delay'
  );

  React.useEffect(() => {
    if (initialFeatureModule) {
      setSelectedSubcategory(initialFeatureModule);
    }
  }, [initialFeatureModule]);

  const [submittedMsg, setSubmittedMsg] = useState(null);

  // Form State for all 10 Governance Modules
  const [formData, setFormData] = useState({
    // Common user details
    user_name: currentUser?.name || 'Suresh Kumar Patil',
    user_mobile: currentUser?.phone || '+91 98450 44321',
    user_address: 'Mini Vidhana Soudha Road, Ward 12, Kalaburagi',
    gps_location: '17.3304° N, 76.8355° E',
    department_name: 'Revenue & Land Administration Department (Nadakacheri)',
    service_name: 'Khata Transfer & Land Mutation (Sakala Service)',
    application_id: 'SAK-2026-KA-009841',
    application_date: '2026-06-10',
    expected_completion_date: '2026-06-30',
    current_status: 'Under Inactive Review',
    delay_duration: '45 Days Overdue (Critical SLA Breach)',
    identity_preference: 'Confidential',
    previous_complaint: 'Yes',
    previous_complaint_id: 'PG-2026-88120',
    urgency_level: 'Critical',
    incident_desc: '',
    evidence_file: null,

    // 2. Office Service Delay
    office_name: 'Sub-Registrar Office, Mini Vidhana Soudha, Kalaburagi',
    office_num_visits: '5 In-Person Visits',
    office_counter_officer: 'Counter # 3 (Mutation Clerk)',

    // 3. Scheme Payment Delay
    scheme_name: 'PM-KISAN / Gruha Lakshmi Direct Benefit Transfer',
    scheme_expected_amount: '₹6,000 / Installment',
    scheme_actual_amount: '₹0 (Pending for 3 consecutive quarters)',
    scheme_bank_status: 'Aadhaar NPCI Seeded & Verified, File Stuck at District Treasury',

    // 4. Certificate Delay
    cert_type: 'OBC / Non-Creamy Layer Certificate',
    cert_office: 'Old City Center Nadakacheri, Kalaburagi',

    // 5. School Misconduct
    school_inst_name: 'Adarsha PU Composite College',
    school_person_involved: 'Principal & Accounts Section Head',
    school_misconduct_type: 'Withholding 10th Marks Card for Unofficial Building Fund Fee',

    // 6. Healthcare Corruption
    health_hospital_name: 'Gulbarga Institute of Medical Sciences (GIMS Hospital)',
    health_dept: 'Orthopedic Surgery & Pharmacy Ward',
    health_amount_demanded: '₹12,000 for government-subsidized titanium implant surgery',

    // 7. Bribery Demand
    bribe_amount_demanded: '₹5,000 Cash demanded for spot verification sign-off',
    bribe_payment_method: 'Cash / Middleman Token',

    // 8. Officer Misconduct
    officer_name_designation: 'S. N. Joshi (Junior Engineer / Section Incharge)',
    officer_incident_date: '2026-08-14',

    // 9. Complaint Not Actioned
    not_actioned_prev_id: 'CP-2026-KMC-44102',
    not_actioned_followups: '4 Online Status Inquiries & 2 Registered Speed-Post Notices',

    // 10. Excessive Delay
    excessive_days_pending: '75 Days (Permissible Sakala SLA: 21 Days)',
    excessive_escalation_tier: 'Tier 3 Direct Escalation to Principal Secretary & Lokayukta'
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const subcatObj = GOVERNANCE_SUBCATEGORIES.find(s => s.id === selectedSubcategory);
    const ticketId = `GOV-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const msg = `Grievance registered under [${subcatObj?.name}]. Ticket ID: ${ticketId}. Auto-routed to District Grievance Redressal Officer (DGRO) & Janaspandana SLA Tracker.`;
    setSubmittedMsg(msg);

    if (speakText) {
      speakText(`Public Governance complaint filed. Ticket number ${ticketId}. Escalation timer started.`);
    }
  };

  const selectedSubcatObj = GOVERNANCE_SUBCATEGORIES.find(s => s.id === selectedSubcategory) || GOVERNANCE_SUBCATEGORIES[0];

  return (
    <div className="space-y-6 font-outfit">
      
      {/* 1. TOP PUBLIC GOVERNANCE & DELAYS BANNER */}
      <div className="ethnic-card p-6 rounded-3xl bg-gradient-to-r from-slate-950 via-yellow-950 to-amber-950 text-white border-2 border-yellow-400 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-400/40 text-yellow-300 text-xs font-bold font-cinzel flex items-center gap-1.5 w-fit">
              <Building2 className="w-3.5 h-3.5 text-yellow-400" />
              <span>Karnataka Sakala Mission • Janaspandana 1902 Directorate</span>
            </span>
            <h2 className="text-xl md:text-2xl font-black font-cinzel text-white flex items-center space-x-2">
              <span>Public Governance & Administrative Delays</span>
              <span className="text-2xl">🏛️</span>
            </h2>
            <p className="text-xs text-yellow-200/90 font-medium">
              SLA delay calculation, automatic Lokayukta escalation, certificate tracking & government service accountability.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="tel:1902"
              className="px-4 py-2.5 rounded-2xl bg-yellow-600 hover:bg-yellow-700 text-white text-xs font-bold shadow-lg flex items-center space-x-2 border border-yellow-300"
            >
              <Phone className="w-4 h-4" />
              <span>1902 Janaspandana Helpline</span>
            </a>
            {onBack && (
              <button
                onClick={onBack}
                className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center space-x-1.5 border border-white/20"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Hub</span>
              </button>
            )}
          </div>
        </div>

        {/* Live Status Strip */}
        <div className="p-3 bg-white/10 rounded-2xl border border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="flex items-center space-x-2 text-yellow-200">
            <Clock className="w-4 h-4 text-yellow-400 shrink-0" />
            <span>Sakala Statutory Guarantee: Compensatory ₹20/Day on Delay</span>
          </div>
          <div className="flex items-center space-x-2 text-amber-200">
            <FileCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Digital Certificate Verification Active</span>
          </div>
          <div className="flex items-center space-x-2 text-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Automatic Higher-Authority Escalation Enabled</span>
          </div>
        </div>
      </div>

      {/* Success Notification */}
      {submittedMsg && (
        <div className="p-4 bg-emerald-50 border-2 border-emerald-400 rounded-3xl text-xs font-bold text-emerald-950 flex items-center justify-between shadow-lg">
          <div className="flex items-center space-x-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{submittedMsg}</span>
          </div>
          <button
            onClick={() => setSubmittedMsg(null)}
            className="text-emerald-700 hover:text-emerald-900 font-bold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* 2. SUBCATEGORY PICKER (Only shown if hideOtherModules is false) */}
      {!hideOtherModules && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black font-cinzel text-amber-950 uppercase tracking-wide">
              Select Governance Problem Type ({GOVERNANCE_SUBCATEGORIES.length} Modules)
            </h3>
            <span className="text-[11px] font-bold text-yellow-900">Select module to launch targeted form</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {GOVERNANCE_SUBCATEGORIES.map((subcat) => (
              <button
                key={subcat.id}
                type="button"
                onClick={() => {
                  setSelectedSubcategory(subcat.id);
                  if (speakText) speakText(`Selected ${subcat.name}`);
                }}
                className={`p-3 rounded-2xl border-2 text-left transition-all flex flex-col justify-between space-y-2 ${
                  selectedSubcategory === subcat.id
                    ? 'border-yellow-600 bg-yellow-50 shadow-md ring-2 ring-yellow-300'
                    : 'border-amber-200 bg-white hover:border-amber-400 hover:bg-amber-50/50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-xl p-1.5 rounded-xl bg-amber-100 border border-amber-300 shrink-0">{subcat.icon}</span>
                  <span className="text-xs font-black text-amber-950 line-clamp-2">{subcat.name}</span>
                </div>
                <p className="text-[10px] text-amber-900/70 font-medium line-clamp-2">{subcat.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3. DYNAMIC TARGETED FORM */}
      <div className="ethnic-card p-6 rounded-3xl shadow-xl gold-glow border-2 border-yellow-400 space-y-6">
        
        {/* Active Module Header */}
        <div className="p-4 bg-yellow-50 rounded-2xl border border-yellow-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <span className="text-3xl p-2 rounded-2xl bg-white shadow border border-yellow-300">{selectedSubcatObj.icon}</span>
            <div>
              <h4 className="text-sm font-black text-amber-950">{selectedSubcatObj.name}</h4>
              <p className="text-xs text-yellow-900 font-medium">{selectedSubcatObj.desc}</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-yellow-200 text-yellow-950 font-bold text-xs border border-yellow-400 self-start sm:self-auto">
            Sakala SLA Monitored
          </span>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-5 text-xs">

          {/* Module 1: Government Service Delay */}
          {selectedSubcategory === 'gov_service_delay' && (
            <div className="space-y-4">
              <div className="p-3 bg-amber-100/70 rounded-2xl border border-amber-300 text-amber-950 font-bold flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-yellow-700 animate-spin" />
                  <span>AI Delay Duration Engine: Calculated 45 days past legal SLA. Eligible for compensatory claim.</span>
                </div>
                <span className="bg-rose-700 text-white px-2.5 py-1 rounded-xl text-[11px]">Overdue Alert</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Department Name *</label>
                  <input
                    type="text"
                    value={formData.department_name}
                    onChange={(e) => handleChange('department_name', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Service Requested *</label>
                  <input
                    type="text"
                    value={formData.service_name}
                    onChange={(e) => handleChange('service_name', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Application / Sakala GSC Number *</label>
                  <input
                    type="text"
                    value={formData.application_id}
                    onChange={(e) => handleChange('application_id', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 2: Office Service Delay */}
          {selectedSubcategory === 'gov_office_delay' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Public Office Name *</label>
                  <input
                    type="text"
                    value={formData.office_name}
                    onChange={(e) => handleChange('office_name', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Number of In-Person Visits *</label>
                  <input
                    type="text"
                    value={formData.office_num_visits}
                    onChange={(e) => handleChange('office_num_visits', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Counter / Officer In-Charge Details</label>
                  <input
                    type="text"
                    value={formData.office_counter_officer}
                    onChange={(e) => handleChange('office_counter_officer', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 3: Benefit/Scheme Payment Delay */}
          {selectedSubcategory === 'gov_scheme_payment_delay' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Government Scheme Name *</label>
                  <input
                    type="text"
                    value={formData.scheme_name}
                    onChange={(e) => handleChange('scheme_name', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Expected Payment Amount *</label>
                  <input
                    type="text"
                    value={formData.scheme_expected_amount}
                    onChange={(e) => handleChange('scheme_expected_amount', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Actual Payment Status</label>
                  <input
                    type="text"
                    value={formData.scheme_actual_amount}
                    onChange={(e) => handleChange('scheme_actual_amount', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 4: Certificate Delay */}
          {selectedSubcategory === 'gov_cert_delay' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Document / Certificate Type *</label>
                  <input
                    type="text"
                    value={formData.cert_type}
                    onChange={(e) => handleChange('cert_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Issuing Office / Center *</label>
                  <input
                    type="text"
                    value={formData.cert_office}
                    onChange={(e) => handleChange('cert_office', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Expected Delivery Date</label>
                  <input
                    type="date"
                    value={formData.expected_completion_date}
                    onChange={(e) => handleChange('expected_completion_date', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 5: School Official Misconduct */}
          {selectedSubcategory === 'gov_school_misconduct' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Educational Institution Name *</label>
                  <input
                    type="text"
                    value={formData.school_inst_name}
                    onChange={(e) => handleChange('school_inst_name', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Person / Designation Involved *</label>
                  <input
                    type="text"
                    value={formData.school_person_involved}
                    onChange={(e) => handleChange('school_person_involved', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 6: Healthcare Service Corruption */}
          {selectedSubcategory === 'gov_health_corruption' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Government Hospital / Clinic *</label>
                  <input
                    type="text"
                    value={formData.health_hospital_name}
                    onChange={(e) => handleChange('health_hospital_name', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Irregular Amount / Bribe Demanded</label>
                  <input
                    type="text"
                    value={formData.health_amount_demanded}
                    onChange={(e) => handleChange('health_amount_demanded', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 7: Bribery Demand */}
          {selectedSubcategory === 'gov_bribery_demand' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Amount Demanded (₹) *</label>
                  <input
                    type="text"
                    value={formData.bribe_amount_demanded}
                    onChange={(e) => handleChange('bribe_amount_demanded', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Payment Mode Demanded *</label>
                  <input
                    type="text"
                    value={formData.bribe_payment_method}
                    onChange={(e) => handleChange('bribe_payment_method', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 8: Officer Misconduct */}
          {selectedSubcategory === 'gov_officer_misconduct' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Officer Details / Designation *</label>
                  <input
                    type="text"
                    value={formData.officer_name_designation}
                    onChange={(e) => handleChange('officer_name_designation', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Incident Date *</label>
                  <input
                    type="date"
                    value={formData.officer_incident_date}
                    onChange={(e) => handleChange('officer_incident_date', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 9: Complaint Not Actioned */}
          {selectedSubcategory === 'gov_complaint_not_actioned' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Previous Unresolved Complaint ID *</label>
                  <input
                    type="text"
                    value={formData.not_actioned_prev_id}
                    onChange={(e) => handleChange('not_actioned_prev_id', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Follow-up History</label>
                  <input
                    type="text"
                    value={formData.not_actioned_followups}
                    onChange={(e) => handleChange('not_actioned_followups', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 10: Excessive Administrative Delay */}
          {selectedSubcategory === 'gov_excessive_delay' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Number of Days Pending *</label>
                  <input
                    type="text"
                    value={formData.excessive_days_pending}
                    onChange={(e) => handleChange('excessive_days_pending', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Escalation Tier Action</label>
                  <input
                    type="text"
                    value={formData.excessive_escalation_tier}
                    readOnly
                    className="w-full bg-yellow-100 border border-yellow-300 rounded-xl p-2.5 text-amber-950 font-bold"
                  />
                </div>
              </div>
            </div>
          )}

          {/* COMMON FIELDS SECTION (Universal to all 10 Governance Modules) */}
          <div className="p-4 bg-yellow-50/70 rounded-2xl border border-yellow-300 space-y-4">
            <h5 className="font-black text-amber-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-yellow-700" />
              <span>Complainant Identification & Evidence Details</span>
            </h5>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-amber-950">Citizen Name *</label>
                <input
                  type="text"
                  value={formData.user_name}
                  onChange={(e) => handleChange('user_name', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs text-slate-800"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-amber-950">Mobile Number *</label>
                <input
                  type="text"
                  value={formData.user_mobile}
                  onChange={(e) => handleChange('user_mobile', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs text-slate-800"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-amber-950">Identity Preference *</label>
                <select
                  value={formData.identity_preference}
                  onChange={(e) => handleChange('identity_preference', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs font-bold text-amber-950"
                >
                  <option value="Confidential">Confidential (Identity Masked from Local Office)</option>
                  <option value="Public">Public (Standard Citizen Grievance)</option>
                  <option value="Anonymous">Anonymous (Full Whistleblower Protection)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-amber-950">Office / Service Location *</label>
                <input
                  type="text"
                  value={formData.user_address}
                  onChange={(e) => handleChange('user_address', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs text-slate-800"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-amber-950">GPS Coordinates</label>
                <input
                  type="text"
                  value={formData.gps_location}
                  readOnly
                  className="w-full bg-yellow-100 border border-yellow-300 rounded-xl p-2 text-xs text-amber-950 font-bold"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-amber-950">Urgency Level *</label>
                <select
                  value={formData.urgency_level}
                  onChange={(e) => handleChange('urgency_level', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs font-bold text-amber-950"
                >
                  <option value="Critical">Critical - Immediate High-Level Intervention</option>
                  <option value="High">High - Legal Delay Limit Breached</option>
                  <option value="Medium">Medium - Regular Follow-Up</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-amber-950">Detailed Incident / File Delay Description *</label>
              <textarea
                rows={2}
                value={formData.incident_desc}
                onChange={(e) => handleChange('incident_desc', e.target.value)}
                placeholder="Specify application history, interactions with clerks, reasons cited for delay..."
                className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs text-slate-800 font-medium"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-yellow-700 to-amber-700 text-white font-bold text-xs rounded-xl shadow-lg hover:opacity-95 flex items-center justify-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>Lodge Governance Grievance & Trigger SLA Clock</span>
          </button>
        </form>
      </div>
    </div>
  );
}
