import React, { useState } from 'react';
import {
  Briefcase, GraduationCap, Users, Search, CheckCircle2, Building2,
  FileText, ArrowLeft, Upload, Sparkles, AlertTriangle, ShieldCheck,
  Send, Compass, Award, HelpCircle, Phone, MapPin, User, ChevronRight
} from 'lucide-react';

export const UNEMPLOYMENT_SUBCATEGORIES = [
  { id: 'unemployment_skills', name: '1. Youth Skill Training Hub Request', icon: '🛠️', desc: 'Vocational & technical training programs (Computer/IT, Tailoring, Electrical, Automotive)' },
  { id: 'unemployment_gig', name: '2. Local Worker Placement Support', icon: '🛵', desc: 'Placement support for driver, delivery, retail, security, technician, factory jobs' },
  { id: 'unemployment_job_vacancy', name: '3. Job Vacancy Assistance', icon: '💼', desc: 'AI matching jobs, required skills, salary range, distance and eligibility finder' },
  { id: 'unemployment_gov_job_scheme', name: '4. Government Job Scheme Information', icon: '🏛️', desc: 'MGNREGA, PMKVY, employment guarantee, self-employment & startup schemes' },
  { id: 'unemployment_apprenticeship', name: '5. Apprenticeship Request', icon: '🎓', desc: 'For students and fresh graduates in IT, Banking, Healthcare, Manufacturing' },
  { id: 'unemployment_internship', name: '6. Internship Opportunity Support', icon: '💻', desc: 'Semester/year-round student internships with stipend matching' },
  { id: 'unemployment_resume_assistance', name: '7. Resume/CV Assistance', icon: '📄', desc: 'AI ATS optimization, grammar check, skill suggestions & keyword builder' },
  { id: 'unemployment_job_fair', name: '8. Job Fair Request', icon: '🎪', desc: 'Upcoming municipal mega job fairs, participating companies & registration' },
  { id: 'unemployment_skill_cert', name: '9. Skill Certification Support', icon: '📜', desc: 'NSDC/Skill India recognized skill certification & previous training validation' },
  { id: 'unemployment_daily_wage', name: '10. Daily Wage Worker Support', icon: '🔨', desc: 'Construction, masonry, cleaning, painting, plumbing daily labour opportunities' },
  { id: 'unemployment_migrant_worker', name: '11. Migrant Worker Employment Support', icon: '🧳', desc: 'Inter-district/state migrant workers, registration, accommodation & food support' },
  { id: 'unemployment_women_employment', name: '12. Women Employment Support', icon: '👩‍💼', desc: 'Skill development, work-from-home, childcare assistance & self-help entrepreneurship' },
  { id: 'unemployment_job_scam', name: '13. Job Scam / Fraud Reporting', icon: '🚨', desc: 'Report fake job offers, recruitment scams, payment demands & fake placement agents' },
  { id: 'unemployment_career_guidance', name: '14. Career Guidance', icon: '🧭', desc: 'Career roadmap, learning tracks, strengths assessment & higher studies counselling' }
];

export default function UnemploymentJobsDashboard({ speakText, currentUser, initialFeatureModule, onBack, hideOtherModules = true }) {
  const [selectedSubcategory, setSelectedSubcategory] = useState(
    initialFeatureModule || 'unemployment_skills'
  );

  React.useEffect(() => {
    if (initialFeatureModule) {
      setSelectedSubcategory(initialFeatureModule);
    }
  }, [initialFeatureModule]);

  const [submittedMsg, setSubmittedMsg] = useState(null);

  // Form state for all 14 Unemployment subcategories
  const [formData, setFormData] = useState({
    // Common User Profile Fields
    user_name: currentUser?.name || 'Rahul Patil',
    user_age: '24',
    user_gender: 'Male',
    user_mobile: currentUser?.phone || '+91 98450 12345',
    user_email: currentUser?.email || 'rahul.patil@example.com',
    user_address: 'Ward 12, Sedam Road, Kalaburagi',
    user_district: 'Kalaburagi / Karnataka',
    user_education: 'Diploma in Computer Science / IT',
    user_employment_status: 'Unemployed (Actively Seeking)',
    user_current_skills: 'Python, Web Development, Basic Hardware Troubleshooting',

    // 1. Youth Skill Training
    skill_required: 'Python & Web Full Stack Development',
    skill_category: 'Computer/IT',
    skill_preferred_center: 'Govt Tool Room & Training Centre (GTTC), Kalaburagi',
    skill_training_mode: 'Hybrid (Offline Lab + Online Theory)',
    skill_training_duration: '3 Months Intensive',
    skill_gov_scheme: 'Pradhan Mantri Kaushal Vikas Yojana (PMKVY 4.0)',
    skill_cert_required: 'Yes',

    // 2. Local Worker Placement
    gig_job_type: 'Technician & Office IT Support',
    gig_preferred_location: 'Kalaburagi City / Ward 12 Vicinity',
    gig_max_travel: '10 km',
    gig_expected_salary: '₹18,000 - ₹22,000 / month',
    gig_shift_pref: 'Day Shift Only',
    gig_full_part: 'Full-Time',
    gig_available_from: 'Immediate',

    // 3. Job Vacancy Assistance
    job_role_required: 'Junior Software Associate / Data Entry Operator',
    job_preferred_industry: 'Information Technology / E-Governance',
    job_work_mode: 'On-site / Hybrid',
    job_willing_relocate: 'Yes',

    // 4. Gov Job Scheme Information
    scheme_emp_category: 'Youth Skill & Self-Employment Subsidy (CMEGP)',
    scheme_skill_level: 'Intermediate Technical',
    scheme_income_range: 'Below ₹2,50,000 / annum',
    scheme_already_applied: 'No',

    // 5. Apprenticeship Request
    apprentice_college: 'Government Polytechnic College, Kalaburagi',
    apprentice_branch: 'Computer Science Engineering',
    apprentice_grad_year: '2025',
    apprentice_industry: 'IT & Software Development',
    apprentice_duration: '1 Year Apprenticeship',

    // 6. Internship Opportunity Support
    intern_course: 'Bachelor of Computer Applications (BCA)',
    intern_semester: 'Final Semester (6th Sem)',
    intern_domain: 'Frontend UI/UX & Cloud Databases',
    intern_stipend_expected: '₹8,000 / month',
    intern_start_date: '2026-09-01',

    // 7. Resume/CV Assistance
    resume_objective: 'Seeking an entry-level software associate position to build scalable civic web applications',
    resume_target_role: 'Associate React Developer / IT Specialist',
    resume_languages: 'Kannada, English, Hindi',

    // 8. Job Fair Request
    fair_industry_interest: 'IT, Banking, Logistics, Civil Services',
    fair_location_pref: 'Gulbarga University Auditorium Grounds',
    fair_pref_date: '2026-09-15',

    // 9. Skill Certification Support
    cert_skill_to_certify: 'Automotive Electrical & Solar Technician',
    cert_body: 'National Skill Development Corporation (NSDC)',
    cert_category: 'Electrical & Electronics',

    // 10. Daily Wage Worker Support
    wage_native_place: 'Afzalpur Taluk, Kalaburagi',
    wage_work_type: 'Plumbing & Water Line Maintenance',
    wage_expected_daily: '₹750 / day',
    wage_working_hours: '8:30 AM to 5:30 PM',

    // 11. Migrant Worker Employment Support
    migrant_native_state: 'Karnataka (Rural Afzalpur)',
    migrant_native_district: 'Kalaburagi',
    migrant_current_city: 'Kalaburagi City Center',
    migrant_reason_migration: 'Rural drought and lack of local agricultural work',
    migrant_accommodation_needed: 'Yes',
    migrant_transport_needed: 'Yes',
    migrant_food_support: 'Yes',
    migrant_support_type: 'Job placement + Municipal Shelter accommodation',

    // 12. Women Employment Support
    women_work_type: 'Work-from-Home / Teaching / Data Management',
    women_childcare_info_needed: 'Yes',
    women_safe_transport_needed: 'Yes',
    women_entrepreneurship_support: 'Self-Help Group (SHG) Micro-Loan Assistance',

    // 13. Job Scam / Fraud Reporting
    scam_company_name: 'FastTrack Career Consultancy Pvt Ltd',
    scam_recruiter_name: 'Vikram Singh / HR Manager',
    scam_recruiter_phone: '+91 99001 88412',
    scam_job_position: 'Data Entry Executive (Work from Home)',
    scam_fraud_type: 'Registration fee scam / Advance laptop security demand',
    scam_amount_demanded: '₹4,500',
    scam_amount_paid: '₹1,500',
    scam_payment_method: 'UPI to unregistered personal number',
    scam_description: 'Demanded ₹4,500 advance security deposit for courier laptop dispatch. Stopped answering calls once ₹1,500 was paid.',

    // 14. Career Guidance
    career_favorite_subjects: 'Mathematics, Computer Programming, Web Designing',
    career_goal: 'Become a Senior Full Stack Engineer in Government Digital Mission',
    career_strengths: 'Analytical problem solving, quick learner, bilingual proficiency',
    career_areas_to_improve: 'Data structures algorithms & interview communication'
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = (e) => {
    if (e) e.preventDefault();
    const subcatObj = UNEMPLOYMENT_SUBCATEGORIES.find(s => s.id === selectedSubcategory);
    const appId = `EMP-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

    const message = `Application registered under [${subcatObj?.name}]. Application / Ticket ID: ${appId}. Profile synced with National Career Service (NCS) and Kalaburagi District Employment Exchange Cell.`;
    setSubmittedMsg(message);

    if (speakText) {
      speakText(`Application lodged successfully for ${subcatObj?.name}. Ticket number ${appId}. Matching jobs and training centers will be notified.`);
    }
  };

  const selectedSubcatObj = UNEMPLOYMENT_SUBCATEGORIES.find(s => s.id === selectedSubcategory) || UNEMPLOYMENT_SUBCATEGORIES[0];

  return (
    <div className="space-y-6 font-outfit">
      
      {/* 1. TOP EMPLOYMENT & SKILL MISSION BANNER */}
      <div className="ethnic-card p-6 rounded-3xl bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-950 text-white border-2 border-blue-400 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs font-bold font-cinzel flex items-center gap-1.5 w-fit">
              <Briefcase className="w-3.5 h-3.5 text-blue-400" />
              <span>National Career Service (NCS) • Skill India Mission</span>
            </span>
            <h2 className="text-xl md:text-2xl font-black font-cinzel text-white flex items-center space-x-2">
              <span>Unemployment & Youth Employment Portal</span>
              <span className="text-2xl">💼</span>
            </h2>
            <p className="text-xs text-blue-200/90 font-medium">
              Free skill development, district job fairs, apprenticeship matchmaking, and AI resume/job scam detection.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="tel:18004253456"
              className="px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-lg flex items-center space-x-2 border border-blue-300"
            >
              <Phone className="w-4 h-4" />
              <span>District Career Helpline</span>
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
          <div className="flex items-center space-x-2 text-blue-200">
            <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
            <span>342 Active Local Job Vacancies in Kalaburagi District</span>
          </div>
          <div className="flex items-center space-x-2 text-emerald-200">
            <GraduationCap className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>18 Government Free Skill Training Hubs Open for Enrollment</span>
          </div>
          <div className="flex items-center space-x-2 text-amber-200">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>AI Job Scam & Fake Placement Agency Shield Active</span>
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
              Select Employment Service / Grievance ({UNEMPLOYMENT_SUBCATEGORIES.length} Modules)
            </h3>
            <span className="text-[11px] font-bold text-blue-900">Select module to launch targeted form</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {UNEMPLOYMENT_SUBCATEGORIES.map((subcat) => (
              <button
                key={subcat.id}
                type="button"
                onClick={() => {
                  setSelectedSubcategory(subcat.id);
                  if (speakText) speakText(`Selected ${subcat.name}`);
                }}
                className={`p-3 rounded-2xl border-2 text-left transition-all flex flex-col justify-between space-y-2 ${
                  selectedSubcategory === subcat.id
                    ? 'border-blue-600 bg-blue-50 shadow-md ring-2 ring-blue-300'
                    : 'border-amber-200 bg-white hover:border-amber-400 hover:bg-amber-50/50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-xl p-1.5 rounded-xl bg-blue-100 border border-blue-300 shrink-0">{subcat.icon}</span>
                  <span className="text-xs font-black text-slate-900 line-clamp-2">{subcat.name}</span>
                </div>
                <p className="text-[10px] text-slate-600 font-medium line-clamp-2">{subcat.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3. DYNAMIC INTERACTIVE FORM FOR SELECTED MODULE */}
      <div className="ethnic-card p-6 rounded-3xl shadow-xl gold-glow border-2 border-blue-300 space-y-6">
        
        {/* Module Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-200 pb-4">
          <div className="space-y-0.5">
            <span className="px-3 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-300 text-[11px] font-bold">
              Active Module
            </span>
            <h4 className="text-lg font-black font-cinzel text-amber-950 flex items-center gap-2 pt-1">
              <span>{selectedSubcatObj.icon}</span>
              <span>{selectedSubcatObj.name}</span>
            </h4>
            <p className="text-xs text-amber-800 font-medium">{selectedSubcatObj.desc}</p>
          </div>
        </div>

        {/* Common Profile Preview Strip */}
        <div className="p-3 bg-amber-50/80 rounded-2xl border border-amber-300 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-[10px] font-bold text-amber-900 block uppercase">Candidate Name</span>
            <input
              type="text"
              value={formData.user_name}
              onChange={(e) => handleChange('user_name', e.target.value)}
              className="bg-white border border-amber-300 rounded-lg p-1.5 text-xs font-bold text-slate-800 w-full mt-0.5"
            />
          </div>
          <div>
            <span className="text-[10px] font-bold text-amber-900 block uppercase">Age & Gender</span>
            <div className="flex gap-1 mt-0.5">
              <input
                type="text"
                value={formData.user_age}
                onChange={(e) => handleChange('user_age', e.target.value)}
                className="bg-white border border-amber-300 rounded-lg p-1.5 text-xs font-bold text-slate-800 w-12 text-center"
              />
              <select
                value={formData.user_gender}
                onChange={(e) => handleChange('user_gender', e.target.value)}
                className="bg-white border border-amber-300 rounded-lg p-1.5 text-xs font-bold text-slate-800 flex-1"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div>
            <span className="text-[10px] font-bold text-amber-900 block uppercase">Mobile Number</span>
            <input
              type="text"
              value={formData.user_mobile}
              onChange={(e) => handleChange('user_mobile', e.target.value)}
              className="bg-white border border-amber-300 rounded-lg p-1.5 text-xs font-bold text-slate-800 w-full mt-0.5"
            />
          </div>
          <div>
            <span className="text-[10px] font-bold text-amber-900 block uppercase">Education Level</span>
            <input
              type="text"
              value={formData.user_education}
              onChange={(e) => handleChange('user_education', e.target.value)}
              className="bg-white border border-amber-300 rounded-lg p-1.5 text-xs font-bold text-slate-800 w-full mt-0.5"
            />
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* 1. YOUTH SKILL TRAINING HUB REQUEST */}
        {/* ------------------------------------------------------------------ */}
        {selectedSubcategory === 'unemployment_skills' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Training Category *</label>
                <select
                  value={formData.skill_category}
                  onChange={(e) => handleChange('skill_category', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                >
                  <option>Computer/IT</option>
                  <option>Digital Marketing</option>
                  <option>Tailoring & Apparel</option>
                  <option>Electrical & Electronics</option>
                  <option>Plumbing & Sanitary</option>
                  <option>Welding & Fabrication</option>
                  <option>Automotive Repair</option>
                  <option>Construction Skills</option>
                  <option>Agriculture & Food Processing</option>
                  <option>Beauty & Wellness</option>
                  <option>Retail & Sales</option>
                  <option>Other Vocational Skill</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Skill / Training Required *</label>
                <input
                  type="text"
                  value={formData.skill_required}
                  onChange={(e) => handleChange('skill_required', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Preferred Training Center</label>
                <input
                  type="text"
                  value={formData.skill_preferred_center}
                  onChange={(e) => handleChange('skill_preferred_center', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Training Mode</label>
                <select
                  value={formData.skill_training_mode}
                  onChange={(e) => handleChange('skill_training_mode', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-medium"
                >
                  <option>Offline Classroom & Lab</option>
                  <option>Online Live Classes</option>
                  <option>Hybrid (Offline + Online)</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Duration Preference</label>
                <input
                  type="text"
                  value={formData.skill_training_duration}
                  onChange={(e) => handleChange('skill_training_duration', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Govt Scheme / Program</label>
                <input
                  type="text"
                  value={formData.skill_gov_scheme}
                  onChange={(e) => handleChange('skill_gov_scheme', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* 2. LOCAL WORKER PLACEMENT SUPPORT */}
        {/* ------------------------------------------------------------------ */}
        {selectedSubcategory === 'unemployment_gig' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Job Category *</label>
                <select
                  value={formData.gig_job_type}
                  onChange={(e) => handleChange('gig_job_type', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                >
                  <option>Office Work / Data Entry</option>
                  <option>Construction Worker</option>
                  <option>Commercial Driver</option>
                  <option>Delivery Executive</option>
                  <option>Retail Sales Representative</option>
                  <option>Factory Machine Operator</option>
                  <option>Security Guard</option>
                  <option>Housekeeping Staff</option>
                  <option>Agriculture Farm Worker</option>
                  <option>Technician / Electrician</option>
                  <option>Computer/IT Assistant</option>
                  <option>Other Local Work</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Expected Salary *</label>
                <input
                  type="text"
                  value={formData.gig_expected_salary}
                  onChange={(e) => handleChange('gig_expected_salary', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Maximum Travel Distance</label>
                <input
                  type="text"
                  value={formData.gig_max_travel}
                  onChange={(e) => handleChange('gig_max_travel', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* 7. RESUME / CV ASSISTANCE */}
        {/* ------------------------------------------------------------------ */}
        {selectedSubcategory === 'unemployment_resume_assistance' && (
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-300 space-y-2">
              <div className="flex items-center space-x-2 text-blue-950 font-bold text-xs">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>AI Automated Resume Builder & ATS Score Optimizer</span>
              </div>
              <p className="text-[11px] text-blue-900 font-medium">
                Our AI engine auto-formats your career objective, standardizes technical keywords, corrects grammar, and generates a government-ready biodata in seconds.
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-amber-950">Career Objective *</label>
              <textarea
                rows={2}
                value={formData.resume_objective}
                onChange={(e) => handleChange('resume_objective', e.target.value)}
                className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Target Job Role *</label>
                <input
                  type="text"
                  value={formData.resume_target_role}
                  onChange={(e) => handleChange('resume_target_role', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Languages Known</label>
                <input
                  type="text"
                  value={formData.resume_languages}
                  onChange={(e) => handleChange('resume_languages', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* 11. MIGRANT WORKER EMPLOYMENT SUPPORT */}
        {/* ------------------------------------------------------------------ */}
        {selectedSubcategory === 'unemployment_migrant_worker' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Native State & District *</label>
                <input
                  type="text"
                  value={`${formData.migrant_native_district}, ${formData.migrant_native_state}`}
                  onChange={(e) => handleChange('migrant_native_district', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Current City & Address *</label>
                <input
                  type="text"
                  value={formData.migrant_current_city}
                  onChange={(e) => handleChange('migrant_current_city', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Support Required *</label>
                <select
                  value={formData.migrant_support_type}
                  onChange={(e) => handleChange('migrant_support_type', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                >
                  <option>Job placement + Municipal Shelter</option>
                  <option>Immediate Food & Ration kit support</option>
                  <option>Legal wage recovery assistance</option>
                  <option>Skill training & certification</option>
                  <option>Transportation support</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* 13. JOB SCAM / FRAUD REPORTING */}
        {/* ------------------------------------------------------------------ */}
        {selectedSubcategory === 'unemployment_job_scam' && (
          <div className="space-y-4">
            <div className="p-3.5 bg-rose-50 rounded-2xl border border-rose-300 text-xs text-rose-950 font-bold flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                <span>Job Fraud Alert Engine: Automatically flags unauthorized recruitment fee demands and alerts cyber cell.</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Suspect Company / Recruiter *</label>
                <input
                  type="text"
                  value={formData.scam_company_name}
                  onChange={(e) => handleChange('scam_company_name', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Recruiter Phone / Contact</label>
                <input
                  type="text"
                  value={formData.scam_recruiter_phone}
                  onChange={(e) => handleChange('scam_recruiter_phone', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Fraud Category *</label>
                <select
                  value={formData.scam_fraud_type}
                  onChange={(e) => handleChange('scam_fraud_type', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                >
                  <option>Registration fee scam</option>
                  <option>Interview / Offer letter fee scam</option>
                  <option>Work-from-home advance payment fraud</option>
                  <option>Fake recruitment agency</option>
                  <option>Fake internship with unpaid security</option>
                  <option>Identity & document misuse</option>
                </select>
              </div>
            </div>

            <div className="p-3.5 bg-rose-50 rounded-2xl border border-rose-300 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="font-bold text-rose-950 block">Amount Demanded (₹)</label>
                <input
                  type="text"
                  value={formData.scam_amount_demanded}
                  onChange={(e) => handleChange('scam_amount_demanded', e.target.value)}
                  className="w-full bg-white border border-rose-300 rounded-xl p-2 text-xs mt-1 font-bold text-rose-900"
                />
              </div>
              <div>
                <label className="font-bold text-rose-950 block">Amount Paid (₹)</label>
                <input
                  type="text"
                  value={formData.scam_amount_paid}
                  onChange={(e) => handleChange('scam_amount_paid', e.target.value)}
                  className="w-full bg-white border border-rose-300 rounded-xl p-2 text-xs mt-1 font-bold text-rose-900"
                />
              </div>
              <div>
                <label className="font-bold text-rose-950 block">Payment Method Used</label>
                <input
                  type="text"
                  value={formData.scam_payment_method}
                  onChange={(e) => handleChange('scam_payment_method', e.target.value)}
                  className="w-full bg-white border border-rose-300 rounded-xl p-2 text-xs mt-1 font-bold text-slate-800"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-amber-950">Full Description of the Fraud Incident *</label>
              <textarea
                rows={2}
                value={formData.scam_description}
                onChange={(e) => handleChange('scam_description', e.target.value)}
                className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
              />
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* 14. CAREER GUIDANCE */}
        {/* ------------------------------------------------------------------ */}
        {selectedSubcategory === 'unemployment_career_guidance' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Favorite Subjects / Skills *</label>
                <input
                  type="text"
                  value={formData.career_favorite_subjects}
                  onChange={(e) => handleChange('career_favorite_subjects', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Career Goal / Dream Profession</label>
                <input
                  type="text"
                  value={formData.career_goal}
                  onChange={(e) => handleChange('career_goal', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleFormSubmit}
          className="w-full py-3.5 bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-600 hover:opacity-95 text-white font-bold text-xs rounded-2xl shadow-xl flex items-center justify-center space-x-2 border border-blue-400"
        >
          <Send className="w-4 h-4" />
          <span>Submit to District Employment Exchange & NCS Database</span>
        </button>

      </div>
    </div>
  );
}
