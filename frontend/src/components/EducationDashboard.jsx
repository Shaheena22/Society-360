import React, { useState } from 'react';
import {
  GraduationCap, Building2, Users, BookOpen, Laptop, Bus, HelpCircle,
  CheckCircle2, ArrowLeft, Send, Sparkles, AlertTriangle, ShieldCheck,
  Phone, MapPin, Upload, FileText
} from 'lucide-react';

export const EDUCATION_SUBCATEGORIES = [
  { id: 'education_infrastructure', name: '1. School Infrastructure Problem', icon: '🏫', desc: 'Damaged classrooms, cracked walls, roof leakage, unsafe buildings & broken doors' },
  { id: 'education_teacher_staff', name: '2. Teacher / Staff Issue', icon: '👩‍🏫', desc: 'Teacher absenteeism, misbehavior, unauthorized fee demand, negligence & discrimination' },
  { id: 'education_missing_facilities', name: '3. Missing School Facilities', icon: '📚', desc: 'Lack of drinking water, non-functional girls toilets, no computer lab, library or electricity' },
  { id: 'education_scholarship', name: '4. Scholarship Information', icon: '🎓', desc: 'Post-matric, minority, merit scholarship status, delayed payment & eligibility guide' },
  { id: 'education_skill_training', name: '5. Student Skill Training', icon: '💻', desc: 'Coding, robotics, AI/ML, vocational skills & science lab training requests' },
  { id: 'education_digital_support', name: '6. Digital Education Support', icon: '🖥️', desc: 'Free student tablet/laptop request, Wi-Fi connectivity & digital smart classroom support' },
  { id: 'education_dropout_assistance', name: '7. Dropout Assistance', icon: '🤝', desc: 'Financial aid, family counselling, open schooling & re-admission support for at-risk students' },
  { id: 'education_transport', name: '8. School Transport Problem', icon: '🚌', desc: 'Bus route delays, overcrowding, unsafe driver behavior, lack of student bus passes' }
];

export default function EducationDashboard({ speakText, currentUser, initialFeatureModule, onBack, hideOtherModules = true }) {
  const [selectedSubcategory, setSelectedSubcategory] = useState(
    initialFeatureModule || 'education_infrastructure'
  );

  React.useEffect(() => {
    if (initialFeatureModule) {
      setSelectedSubcategory(initialFeatureModule);
    }
  }, [initialFeatureModule]);

  const [submittedMsg, setSubmittedMsg] = useState(null);

  // Form state for all 8 Education categories
  const [formData, setFormData] = useState({
    // Common student / institution details
    student_name: currentUser?.name || 'Pooja Patil',
    student_age: '15',
    student_gender: 'Female',
    student_mobile: currentUser?.phone || '+91 98451 99882',
    school_name: 'Government Girls Model High School, Brahampur',
    school_address: 'Near Old Bus Stand Road, Kalaburagi',
    school_code: 'UDISE-29040812901',
    district: 'Kalaburagi',
    mandal_taluk: 'Kalaburagi Urban',
    ward_village: 'Ward 12',
    gps_location: '17.3297° N, 76.8343° E',
    urgency_level: 'High',
    description: '',

    // 1. School Infrastructure Problem
    infra_problem_type: 'Roof leakage & cracked walls in Science Lab',
    infra_specific_location: 'Room # 14 (Ground Floor Science Wing)',
    infra_students_affected: '45 Students in Class 10',
    infra_safety_risk: 'Yes (Risk of plaster collapse during monsoon)',

    // 2. Teacher / Staff Issue
    teacher_name: 'Science Teacher & Laboratory In-charge',
    teacher_designation: 'Senior Secondary Assistant Teacher',
    teacher_issue_type: 'Teacher absenteeism & unauthorized fee demand',
    teacher_students_affected: 'Entire 9th and 10th grade batches',

    // 3. Missing School Facilities
    facility_missing: 'Functional Separate Girls Toilets & Safe Drinking Water RO Filter',
    facility_current_condition: 'All 3 toilet doors broken with no running tap water',

    // 4. Scholarship Information
    scholarship_name: 'Karnataka Post-Matric & Minority Pre-Matric Scholarship',
    scholarship_app_number: 'NSP-KA-2026-991204',
    scholarship_problem_faced: 'Application approved by college but DBT payment delayed by 6 months',
    scholarship_income_range: 'Below ₹1,50,000 / annum',

    // 5. Student Skill Training
    skill_interest: 'Python Coding, Web Design & AI Literacy',
    skill_training_mode: 'Weekly Hands-on Computer Lab Classes',

    // 6. Digital Education Support
    digital_device_available: 'No (Family lacks smartphone/laptop for online studies)',
    digital_support_type: 'Student Tablet & Free Education Data Sim Card',

    // 7. Dropout Assistance
    dropout_current_status: 'Out of school since 4 months due to family financial distress',
    dropout_reason: 'Inability to afford textbooks & transportation',
    dropout_support_required: 'Free text books, uniform scholarship & bus pass re-admission',

    // 8. School Transport Problem
    transport_route_number: 'Route # 12B (Afzalpur Cross to Model School)',
    transport_bus_number: 'KA-32-F-1104',
    transport_issue_type: 'Bus not arriving on time & heavy overcrowding',
    transport_affected_students: 'Approx 60 students traveling daily'
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = (e) => {
    if (e) e.preventDefault();
    const subcatObj = EDUCATION_SUBCATEGORIES.find(s => s.id === selectedSubcategory);
    const appId = `EDU-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

    const message = `Education Grievance logged under [${subcatObj?.name}]. Ticket Reference: ${appId}. Dispatched to Department of School Education & Literacy (DDPI Kalaburagi).`;
    setSubmittedMsg(message);

    if (speakText) {
      speakText(`Education grievance recorded successfully under ${subcatObj?.name}. Ticket number ${appId}. Escalated to District Education Officer.`);
    }
  };

  const selectedSubcatObj = EDUCATION_SUBCATEGORIES.find(s => s.id === selectedSubcategory) || EDUCATION_SUBCATEGORIES[0];

  return (
    <div className="space-y-6 font-outfit">
      
      {/* 1. TOP EDUCATION PORTAL BANNER */}
      <div className="ethnic-card p-6 rounded-3xl bg-gradient-to-r from-slate-950 via-indigo-950 to-purple-950 text-white border-2 border-indigo-400 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 text-xs font-bold font-cinzel flex items-center gap-1.5 w-fit">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
              <span>Samagra Shiksha Karnataka • Department of School Education (DDPI)</span>
            </span>
            <h2 className="text-xl md:text-2xl font-black font-cinzel text-white flex items-center space-x-2">
              <span>Education & Student Welfare Cell</span>
              <span className="text-2xl">🎓</span>
            </h2>
            <p className="text-xs text-indigo-200/90 font-medium">
              School infrastructure grievances, scholarship helpdesk, student digital tablet support & dropout prevention.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="tel:18004253456"
              className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-lg flex items-center space-x-2 border border-indigo-300"
            >
              <Phone className="w-4 h-4" />
              <span>Student Helpline 1800-425</span>
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

        {/* Live Metrics Strip */}
        <div className="p-3 bg-white/10 rounded-2xl border border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="flex items-center space-x-2 text-indigo-200">
            <Building2 className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>Direct Escalation to Deputy Director of Public Instruction (DDPI)</span>
          </div>
          <div className="flex items-center space-x-2 text-purple-200">
            <GraduationCap className="w-4 h-4 text-purple-400 shrink-0" />
            <span>State Pre/Post-Matric Scholarship DBT Tracking Active</span>
          </div>
          <div className="flex items-center space-x-2 text-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Special Protection Cell for Girls Sanitation & Student Safety</span>
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
              Select Education Problem Area ({EDUCATION_SUBCATEGORIES.length} Categories)
            </h3>
            <span className="text-[11px] font-bold text-indigo-900">Select module to launch targeted form</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {EDUCATION_SUBCATEGORIES.map((subcat) => (
              <button
                key={subcat.id}
                type="button"
                onClick={() => {
                  setSelectedSubcategory(subcat.id);
                  if (speakText) speakText(`Selected ${subcat.name}`);
                }}
                className={`p-3 rounded-2xl border-2 text-left transition-all flex flex-col justify-between space-y-2 ${
                  selectedSubcategory === subcat.id
                    ? 'border-indigo-600 bg-indigo-50 shadow-md ring-2 ring-indigo-300'
                    : 'border-amber-200 bg-white hover:border-amber-400 hover:bg-amber-50/50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-xl p-1.5 rounded-xl bg-indigo-100 border border-indigo-300 shrink-0">{subcat.icon}</span>
                  <span className="text-xs font-black text-slate-900 line-clamp-2">{subcat.name}</span>
                </div>
                <p className="text-[10px] text-slate-600 font-medium line-clamp-2">{subcat.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3. DYNAMIC FORM */}
      <div className="ethnic-card p-6 rounded-3xl shadow-xl gold-glow border-2 border-indigo-300 space-y-6">
        
        {/* Module Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-200 pb-4">
          <div className="space-y-0.5">
            <span className="px-3 py-0.5 rounded-full bg-indigo-100 text-indigo-900 border border-indigo-300 text-[11px] font-bold">
              Active Category Module
            </span>
            <h4 className="text-lg font-black font-cinzel text-amber-950 flex items-center gap-2 pt-1">
              <span>{selectedSubcatObj.icon}</span>
              <span>{selectedSubcatObj.name}</span>
            </h4>
            <p className="text-xs text-amber-800 font-medium">{selectedSubcatObj.desc}</p>
          </div>
        </div>

        {/* Institution / Student Common Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          <div className="space-y-1">
            <label className="text-xs font-bold text-amber-950">School / College Name *</label>
            <input
              type="text"
              value={formData.school_name}
              onChange={(e) => handleChange('school_name', e.target.value)}
              className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-amber-950">School Address / Ward *</label>
            <input
              type="text"
              value={formData.school_address}
              onChange={(e) => handleChange('school_address', e.target.value)}
              className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-amber-950">School / UDISE Code (if known)</label>
            <input
              type="text"
              value={formData.school_code}
              onChange={(e) => handleChange('school_code', e.target.value)}
              className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
            />
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* 1. SCHOOL INFRASTRUCTURE PROBLEM */}
        {/* ------------------------------------------------------------------ */}
        {selectedSubcategory === 'education_infrastructure' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Infrastructure Problem Type *</label>
                <select
                  value={formData.infra_problem_type}
                  onChange={(e) => handleChange('infra_problem_type', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                >
                  <option>Roof leakage & ceiling crack</option>
                  <option>Damaged classroom floor / walls</option>
                  <option>Broken doors & windows</option>
                  <option>Dilapidated unsafe building wing</option>
                  <option>Damaged school boundary wall</option>
                  <option>Faulty electrical wiring in classrooms</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Specific Location in Campus</label>
                <input
                  type="text"
                  value={formData.infra_specific_location}
                  onChange={(e) => handleChange('infra_specific_location', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Number of Students Affected</label>
                <input
                  type="text"
                  value={formData.infra_students_affected}
                  onChange={(e) => handleChange('infra_students_affected', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* 4. SCHOLARSHIP INFORMATION */}
        {/* ------------------------------------------------------------------ */}
        {selectedSubcategory === 'education_scholarship' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Scholarship Scheme Name *</label>
                <input
                  type="text"
                  value={formData.scholarship_name}
                  onChange={(e) => handleChange('scholarship_name', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Application / NSP Number</label>
                <input
                  type="text"
                  value={formData.scholarship_app_number}
                  onChange={(e) => handleChange('scholarship_app_number', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Problem Faced *</label>
                <select
                  value={formData.scholarship_problem_faced}
                  onChange={(e) => handleChange('scholarship_problem_faced', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                >
                  <option>Scholarship DBT payment delayed</option>
                  <option>Application rejected unfairly</option>
                  <option>College not verifying documents</option>
                  <option>Payment not received in bank account</option>
                  <option>Income certificate verification issue</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Description & Action */}
        <div className="space-y-1 pt-2">
          <label className="text-xs font-bold text-amber-950">Complete Description of the Grievance *</label>
          <textarea
            rows={2}
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Provide specific details of the issue, affected class, dates, or assistance needed..."
            className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
          />
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleFormSubmit}
          className="w-full py-3.5 bg-gradient-to-r from-indigo-700 via-purple-600 to-indigo-600 hover:opacity-95 text-white font-bold text-xs rounded-2xl shadow-xl flex items-center justify-center space-x-2 border border-indigo-400"
        >
          <Send className="w-4 h-4" />
          <span>Dispatch Ticket to District Education Officer (DDPI / BEO)</span>
        </button>

      </div>
    </div>
  );
}
