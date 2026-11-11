import React, { useState } from 'react';
import {
  Users, Phone, AlertTriangle, CheckCircle2, ShieldCheck,
  Scale, Heart, FileText, ArrowLeft, Send, Sparkles, MapPin,
  Lock, EyeOff, UserCheck, ShieldAlert, Award, HelpingHand, Accessibility, UserX
} from 'lucide-react';

export const SOCIAL_RIGHTS_SUBCATEGORIES = [
  { id: 'social_scheme_awareness', name: '1. Lack of Awareness of Government Welfare Schemes', icon: '📢', desc: 'Direct entitlement check, eligibility guidance & scheme catalog application' },
  { id: 'social_benefit_delay_denial', name: '2. Delay or Denial of Welfare Benefits', icon: '💳', desc: 'Arbitrary rejection, DBT fund withholding & delayed social welfare pensions' },
  { id: 'social_legal_aid', name: '3. Difficulty Accessing Free Legal Aid', icon: '⚖️', desc: 'District Legal Services Authority (DLSA) lawyer assignment & court fee waiver' },
  { id: 'social_citizen_rights_awareness', name: '4. Lack of Awareness About Citizen Rights', icon: '📜', desc: 'RTI filing help, consumer rights & fundamental civic entitlement counselling' },
  { id: 'social_discrimination', name: '5. Discrimination and Social Exclusion', icon: '🚫', desc: 'Caste, gender, religious discrimination, social boycott & harassment reporting' },
  { id: 'social_senior_citizen_access', name: '6. Senior Citizens Unable to Access Welfare Services', icon: '👴', desc: 'Doorstep pension DBT, healthcare caregiver aid & elderly abuse protection' },
  { id: 'social_disability_support', name: '7. Lack of Support Awareness for Persons with Disabilities', icon: '♿', desc: 'UDID card registration, assistive aids, wheelchair access & disability pension' },
  { id: 'social_unemployment_awareness', name: '8. Unemployment and Lack of Awareness of Employment Support', icon: '💼', desc: 'Youth employment coaching, government job notification & NCS registration' },
  { id: 'social_women_welfare_awareness', name: '9. Lack of Awareness About Women’s Welfare Services', icon: '👩', desc: 'One-Stop Sakhi Center, Mahila Shakti Kendra, widow rehabilitation & self-help groups' },
  { id: 'social_homeless_vulnerable', name: '10. Difficulty Finding Support for Homeless and Vulnerable People', icon: '🏠', desc: 'Emergency rescue shelter, food, clothing & medical rehabilitation assistance' },
  { id: 'social_child_welfare_education', name: '11. Lack of Awareness About Child Welfare and Education Support', icon: '🧒', desc: 'RTE 25% free school quota, orphan child sponsorship & pre-matric books/uniforms' },
  { id: 'social_informal_workers_security', name: '12. Lack of Awareness About Social Security for Informal Workers', icon: '👷', desc: 'e-Shram card registration, PM-SYM pension, accident insurance & maternity grant' }
];

export default function SocialRightsWelfareDashboard({ speakText, currentUser, initialFeatureModule, onBack, hideOtherModules = true }) {
  const [selectedSubcategory, setSelectedSubcategory] = useState(
    initialFeatureModule || 'social_scheme_awareness'
  );

  React.useEffect(() => {
    if (initialFeatureModule) {
      setSelectedSubcategory(initialFeatureModule);
    }
  }, [initialFeatureModule]);

  const [submittedMsg, setSubmittedMsg] = useState(null);

  // Form State for all 12 Social Rights & Welfare Modules
  const [formData, setFormData] = useState({
    // Common User Details
    user_name: currentUser?.name || 'Basavaraj Deshmukh',
    user_age: '38',
    user_gender: 'Male',
    user_mobile: currentUser?.phone || '+91 98452 33120',
    user_email: currentUser?.email || 'basavaraj.d@example.com',
    user_state: 'Karnataka',
    user_district: 'Kalaburagi',
    user_address: 'Ward 12, Brahampur, Kalaburagi',
    user_employment_status: 'Unorganized Daily Wage Earner',
    user_annual_income: '₹54,000',
    user_category: 'OBC / Rural Household',
    user_education_level: 'High School (10th Pass)',
    gps_location: '17.3320° N, 76.8360° E',
    identity_preference: 'Confidential',
    previous_complaint: 'No',
    urgency_level: 'High',
    incident_desc: '',
    evidence_file: null,
    preferred_contact_method: 'Phone Call / SMS',

    // 1. Lack of Awareness of Government Welfare Schemes
    scheme_known_name: 'PM-SYM Pension & Gruha Jyothi Free Electricity',

    // 2. Delay or Denial of Welfare Benefits
    benefit_scheme_name: 'National Disability Pension Scheme (Indira Gandhi NDOPS)',
    benefit_app_number: 'NDOPS-KA-2026-009841',
    benefit_app_date: '2026-04-10',
    benefit_issue_type: 'Delayed', // 'Delayed' | 'Rejected' | 'Denied' | 'Other'
    benefit_rejection_reason: 'Aadhaar bank seeding failure at taluk treasury',

    // 3. Free Legal Aid
    legal_issue_type: 'Land tenancy encroachment dispute & domestic maintenance claim',
    legal_income_range: 'Below ₹1,00,000 / annum (Eligible for Free Legal Aid under LSA Act)',
    legal_preferred_lang: 'Kannada / English',

    // 4. Citizen Rights Awareness
    rights_issue_type: 'RTI Application Refusal & Police Station Public Entry Denial',
    rights_incident_location: 'Taluk Municipal Revenue Office, Kalaburagi',
    rights_incident_date: '2026-08-20',
    rights_person_org_involved: 'Taluk Revenue Officer & Station Desk Staff',

    // 5. Discrimination
    discrim_type: 'Caste Discrimination in Public Water Access / Village Hall',
    discrim_location: 'Village Community Water Borewell & Temple Road',
    discrim_datetime: '2026-08-22 10:30 AM',
    discrim_org_person: 'Local Dominant Caste Group Leaders',
    discrim_witness_details: 'Neighbouring Dalit household witnesses',

    // 6. Senior Citizens Welfare Access
    senior_name: 'Maruti Rao Patil',
    senior_age: '78 Years',
    senior_alternate_contact: '+91 94481 22910',
    senior_contact_relationship: 'Son / Neighbor Caregiver',
    senior_service_needed: 'Sandhya Suraksha Old Age Pension & Free Doorstep Chronic Health Check',

    // 7. Persons with Disabilities (PwD)
    pwd_support_needed: 'UDID Swavlamban Card + Free Motorized Tricycle + Disability Allowance',
    pwd_disability_info: 'Locomotor Disability (70% Permanent Mobility Impairment)',
    pwd_already_applied: 'Yes',

    // 8. Unemployment & Employment Support
    unemp_skills: 'Electrician Wiring, Plumbing & Solar Panel Installation',
    unemp_experience: '3 Years apprentice experience on local residential sites',
    unemp_preferred_field: 'Government Technical Apprentice / Renewable Energy Solar Unit',

    // 9. Women’s Welfare Services
    women_scheme_needed: 'Sakhi One-Stop Center Legal Counseling & Stree Shakti Microcredit',

    // 10. Homeless and Vulnerable People
    homeless_person_name: 'Unknown elderly destitute couple and 2 children',
    homeless_age_range: 'Elderly 65+ & Children approx 6-8 years',
    homeless_location: 'Under Brahampur Railway Flyover, Ward 12',
    homeless_support_types: 'Shelter, Food, Medical Help, Clothing',
    homeless_people_count: '4 People',

    // 11. Child Welfare and Education Support
    child_parent_name: 'Anita Deshmukh (Single Mother)',
    child_parent_relation: 'Mother',
    child_age: '9 Years (Class 4 Dropout)',
    child_support_type: 'RTE 25% Free School Admission + Free Mid-day Meal & Uniform Kit',

    // 12. Social Security for Informal Workers
    informal_occupation: 'Head-load Construction Worker & Street Vendor',
    informal_monthly_income: '₹7,500',
    informal_work_experience: '8 Years in informal construction labour market',
    informal_support_needed: 'e-Shram Accident Cover (₹2 Lakh) + BOCW Labour Welfare Board Card',
    informal_existing_reg: 'No'
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const subcatObj = SOCIAL_RIGHTS_SUBCATEGORIES.find(s => s.id === selectedSubcategory);
    const ticketId = `SOC-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const msg = `Application registered under [${subcatObj?.name}]. Ticket ID: ${ticketId}. Auto-routed to Social Welfare Directorate, District Legal Services Authority (DLSA) & Janaspandana Citizen Rights Desk (SLA: 24h).`;
    setSubmittedMsg(msg);

    if (speakText) {
      speakText(`Social rights request submitted. Ticket number ${ticketId}. Social welfare cell alerted.`);
    }
  };

  const selectedSubcatObj = SOCIAL_RIGHTS_SUBCATEGORIES.find(s => s.id === selectedSubcategory) || SOCIAL_RIGHTS_SUBCATEGORIES[0];

  return (
    <div className="space-y-6 font-outfit">
      
      {/* 1. TOP SOCIAL RIGHTS & WELFARE BANNER */}
      <div className="ethnic-card p-6 rounded-3xl bg-gradient-to-r from-slate-950 via-purple-950 to-indigo-950 text-white border-2 border-purple-400 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-300 text-xs font-bold font-cinzel flex items-center gap-1.5 w-fit">
              <Scale className="w-3.5 h-3.5 text-purple-400" />
              <span>National Human Rights Commission (NHRC) • Social Justice & DLSA Legal Aid</span>
            </span>
            <h2 className="text-xl md:text-2xl font-black font-cinzel text-white flex items-center space-x-2">
              <span>Social Rights & Welfare Directorate</span>
              <span className="text-2xl">🤝</span>
            </h2>
            <p className="text-xs text-purple-200/90 font-medium">
              Free legal aid, anti-discrimination support, PwD disability welfare, senior citizen safety & informal worker social security.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="tel:15100"
              className="px-4 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-lg flex items-center space-x-2 border border-purple-300"
            >
              <Phone className="w-4 h-4" />
              <span>15100 Free Legal Aid (NALSA)</span>
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
          <div className="flex items-center space-x-2 text-purple-200">
            <Scale className="w-4 h-4 text-purple-400 shrink-0" />
            <span>Free DLSA Legal Aid & Lawyer Assignment Active</span>
          </div>
          <div className="flex items-center space-x-2 text-pink-200">
            <HelpingHand className="w-4 h-4 text-pink-400 shrink-0" />
            <span>Sakhi One-Stop Women Crisis Support On-Duty</span>
          </div>
          <div className="flex items-center space-x-2 text-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Confidential & Whistleblower Masking Guaranteed</span>
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
              Select Social Rights & Welfare Area ({SOCIAL_RIGHTS_SUBCATEGORIES.length} Modules)
            </h3>
            <span className="text-[11px] font-bold text-purple-900">Tap to launch specialized form</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {SOCIAL_RIGHTS_SUBCATEGORIES.map((subcat) => (
              <button
                key={subcat.id}
                type="button"
                onClick={() => {
                  setSelectedSubcategory(subcat.id);
                  if (speakText) speakText(`Selected ${subcat.name}`);
                }}
                className={`p-3 rounded-2xl border-2 text-left transition-all flex flex-col justify-between space-y-2 ${
                  selectedSubcategory === subcat.id
                    ? 'border-purple-600 bg-purple-50 shadow-md ring-2 ring-purple-300'
                    : 'border-amber-200 bg-white hover:border-amber-400 hover:bg-amber-50/50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-xl p-1.5 rounded-xl bg-purple-100 border border-purple-300 shrink-0">{subcat.icon}</span>
                  <span className="text-xs font-black text-slate-950 line-clamp-2">{subcat.name}</span>
                </div>
                <p className="text-[10px] text-slate-600 font-medium line-clamp-2">{subcat.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3. DYNAMIC TARGETED FORM */}
      <div className="ethnic-card p-6 rounded-3xl shadow-xl gold-glow border-2 border-purple-400 space-y-6">
        
        {/* Active Module Header */}
        <div className="p-4 bg-purple-50 rounded-2xl border border-purple-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <span className="text-3xl p-2 rounded-2xl bg-white shadow border border-purple-300">{selectedSubcatObj.icon}</span>
            <div>
              <h4 className="text-sm font-black text-purple-950">{selectedSubcatObj.name}</h4>
              <p className="text-xs text-purple-800 font-medium">{selectedSubcatObj.desc}</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-purple-200 text-purple-950 font-bold text-xs border border-purple-400 self-start sm:self-auto">
            Social Justice 24h SLA
          </span>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-5 text-xs">

          {/* Module 1: Lack of Awareness of Government Welfare Schemes */}
          {selectedSubcategory === 'social_scheme_awareness' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Welfare Scheme Name (if known)</label>
                  <input
                    type="text"
                    value={formData.scheme_known_name}
                    onChange={(e) => handleChange('scheme_known_name', e.target.value)}
                    placeholder="E.g. PM-SYM, Gruha Lakshmi, Sandhya Suraksha"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Education Qualification *</label>
                  <input
                    type="text"
                    value={formData.user_education_level}
                    onChange={(e) => handleChange('user_education_level', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 2: Delay or Denial of Welfare Benefits */}
          {selectedSubcategory === 'social_benefit_delay_denial' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Welfare Scheme Name *</label>
                  <input
                    type="text"
                    value={formData.benefit_scheme_name}
                    onChange={(e) => handleChange('benefit_scheme_name', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Application / Reference Number *</label>
                  <input
                    type="text"
                    value={formData.benefit_app_number}
                    onChange={(e) => handleChange('benefit_app_number', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Type of Issue *</label>
                  <select
                    value={formData.benefit_issue_type}
                    onChange={(e) => handleChange('benefit_issue_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option value="Delayed">Delayed past SLA</option>
                    <option value="Rejected">Rejected unfairly</option>
                    <option value="Denied">Denied by clerk without written reason</option>
                    <option value="Other">Other discrepancy</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="font-bold text-amber-950">Reason Given for Rejection (if any)</label>
                <input
                  type="text"
                  value={formData.benefit_rejection_reason}
                  onChange={(e) => handleChange('benefit_rejection_reason', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                />
              </div>
            </div>
          )}

          {/* Module 3: Difficulty Accessing Free Legal Aid */}
          {selectedSubcategory === 'social_legal_aid' && (
            <div className="space-y-4">
              <div className="p-3 bg-purple-50 rounded-2xl border border-purple-300 text-purple-950 font-bold flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Scale className="w-5 h-5 text-purple-700" />
                  <span>NALSA / DLSA Free Legal Services: Direct advocate assignment for low-income citizens.</span>
                </div>
                <span className="bg-purple-700 text-white px-2.5 py-1 rounded-xl text-[11px]">Free Representation</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Type of Legal Issue *</label>
                  <input
                    type="text"
                    value={formData.legal_issue_type}
                    onChange={(e) => handleChange('legal_issue_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Income Eligibility Category *</label>
                  <input
                    type="text"
                    value={formData.legal_income_range}
                    readOnly
                    className="w-full bg-purple-100 border border-purple-300 rounded-xl p-2.5 text-purple-950 font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Preferred Language *</label>
                  <input
                    type="text"
                    value={formData.legal_preferred_lang}
                    onChange={(e) => handleChange('legal_preferred_lang', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 4: Citizen Rights Awareness */}
          {selectedSubcategory === 'social_citizen_rights_awareness' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Type of Rights Issue *</label>
                  <input
                    type="text"
                    value={formData.rights_issue_type}
                    onChange={(e) => handleChange('rights_issue_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Location Where Issue Occurred *</label>
                  <input
                    type="text"
                    value={formData.rights_incident_location}
                    onChange={(e) => handleChange('rights_incident_location', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Person / Organization Involved</label>
                  <input
                    type="text"
                    value={formData.rights_person_org_involved}
                    onChange={(e) => handleChange('rights_person_org_involved', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 5: Discrimination and Social Exclusion */}
          {selectedSubcategory === 'social_discrimination' && (
            <div className="space-y-4">
              <div className="p-3 bg-red-50 rounded-2xl border border-red-300 text-red-950 font-bold flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShieldAlert className="w-5 h-5 text-red-600" />
                  <span>Zero-Tolerance Protection: Direct link to SC/ST Protection Cell & Human Rights Registry.</span>
                </div>
                <span className="bg-red-600 text-white px-2.5 py-1 rounded-xl text-[11px]">Strict Whistleblower Mask</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Type of Discrimination *</label>
                  <input
                    type="text"
                    value={formData.discrim_type}
                    onChange={(e) => handleChange('discrim_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Location of Incident *</label>
                  <input
                    type="text"
                    value={formData.discrim_location}
                    onChange={(e) => handleChange('discrim_location', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Organization / Person Involved</label>
                  <input
                    type="text"
                    value={formData.discrim_org_person}
                    onChange={(e) => handleChange('discrim_org_person', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 6: Senior Citizens Welfare Access */}
          {selectedSubcategory === 'social_senior_citizen_access' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Senior Citizen's Name *</label>
                  <input
                    type="text"
                    value={formData.senior_name}
                    onChange={(e) => handleChange('senior_name', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Age (Senior Citizen) *</label>
                  <input
                    type="text"
                    value={formData.senior_age}
                    onChange={(e) => handleChange('senior_age', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Alternate Contact Person & Relation</label>
                  <input
                    type="text"
                    value={formData.senior_contact_relationship}
                    onChange={(e) => handleChange('senior_contact_relationship', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 7: Persons with Disabilities */}
          {selectedSubcategory === 'social_disability_support' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Type of Support Needed *</label>
                  <input
                    type="text"
                    value={formData.pwd_support_needed}
                    onChange={(e) => handleChange('pwd_support_needed', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Disability Information (With Consent)</label>
                  <input
                    type="text"
                    value={formData.pwd_disability_info}
                    onChange={(e) => handleChange('pwd_disability_info', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 8: Unemployment Support Awareness */}
          {selectedSubcategory === 'social_unemployment_awareness' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Candidate Skills & Trades *</label>
                  <input
                    type="text"
                    value={formData.unemp_skills}
                    onChange={(e) => handleChange('unemp_skills', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Previous Work Experience *</label>
                  <input
                    type="text"
                    value={formData.unemp_experience}
                    onChange={(e) => handleChange('unemp_experience', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Preferred Job Field</label>
                  <input
                    type="text"
                    value={formData.unemp_preferred_field}
                    onChange={(e) => handleChange('unemp_preferred_field', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 9: Women’s Welfare Services */}
          {selectedSubcategory === 'social_women_welfare_awareness' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="font-bold text-amber-950">Women’s Welfare Service / Scheme Required *</label>
                <input
                  type="text"
                  value={formData.women_scheme_needed}
                  onChange={(e) => handleChange('women_scheme_needed', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                />
              </div>
            </div>
          )}

          {/* Module 10: Homeless and Vulnerable People */}
          {selectedSubcategory === 'social_homeless_vulnerable' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Current Location *</label>
                  <input
                    type="text"
                    value={formData.homeless_location}
                    onChange={(e) => handleChange('homeless_location', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Number of People Needing Help *</label>
                  <input
                    type="text"
                    value={formData.homeless_people_count}
                    onChange={(e) => handleChange('homeless_people_count', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Type of Support Needed *</label>
                  <input
                    type="text"
                    value={formData.homeless_support_types}
                    onChange={(e) => handleChange('homeless_support_types', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 11: Child Welfare and Education Support */}
          {selectedSubcategory === 'social_child_welfare_education' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Parent / Guardian Name *</label>
                  <input
                    type="text"
                    value={formData.child_parent_name}
                    onChange={(e) => handleChange('child_parent_name', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Child's Age *</label>
                  <input
                    type="text"
                    value={formData.child_age}
                    onChange={(e) => handleChange('child_age', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Education Support Needed *</label>
                  <input
                    type="text"
                    value={formData.child_support_type}
                    onChange={(e) => handleChange('child_support_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 12: Social Security for Informal Workers */}
          {selectedSubcategory === 'social_informal_workers_security' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Occupation / Type of Work *</label>
                  <input
                    type="text"
                    value={formData.informal_occupation}
                    onChange={(e) => handleChange('informal_occupation', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Monthly Income *</label>
                  <input
                    type="text"
                    value={formData.informal_monthly_income}
                    onChange={(e) => handleChange('informal_monthly_income', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Social Security Needed *</label>
                  <input
                    type="text"
                    value={formData.informal_support_needed}
                    onChange={(e) => handleChange('informal_support_needed', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* COMMON USER PROFILE & DETAILS SECTION (Universal to all 12 Social Rights Modules) */}
          <div className="p-4 bg-purple-50/70 rounded-2xl border border-purple-300 space-y-4">
            <h5 className="font-black text-purple-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-purple-700" />
              <span>Applicant Identification, Location & Contact Preferences</span>
            </h5>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-amber-950">Full Name *</label>
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
                <label className="font-bold text-amber-950">Email ID (Optional)</label>
                <input
                  type="email"
                  value={formData.user_email}
                  onChange={(e) => handleChange('user_email', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs text-slate-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-amber-950">State & District *</label>
                <input
                  type="text"
                  value={`${formData.user_district}, ${formData.user_state}`}
                  readOnly
                  className="w-full bg-purple-100 border border-purple-300 rounded-xl p-2 text-xs text-purple-950 font-bold"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-amber-950">Identity Preference *</label>
                <select
                  value={formData.identity_preference}
                  onChange={(e) => handleChange('identity_preference', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs font-bold text-purple-950"
                >
                  <option value="Confidential">Confidential (Whistleblower/Protected)</option>
                  <option value="Public">Public (Display on beneficiary roster)</option>
                  <option value="Anonymous">Anonymous (No identity disclosed)</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="font-bold text-amber-950">Preferred Contact Method</label>
                <select
                  value={formData.preferred_contact_method}
                  onChange={(e) => handleChange('preferred_contact_method', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs font-bold text-purple-950"
                >
                  <option>Phone Call / SMS</option>
                  <option>WhatsApp / Email</option>
                  <option>In-Person Taluk Legal Aid Cell Visit</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-amber-950">Problem Description & Required Assistance *</label>
              <textarea
                rows={2}
                value={formData.incident_desc}
                onChange={(e) => handleChange('incident_desc', e.target.value)}
                placeholder="Describe your welfare entitlement problem, duration faced, legal aid requirements..."
                className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs text-slate-800 font-medium"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-700 to-indigo-700 text-white font-bold text-xs rounded-xl shadow-lg hover:opacity-95 flex items-center justify-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>Submit Social Welfare & Rights Request</span>
          </button>
        </form>
      </div>
    </div>
  );
}
