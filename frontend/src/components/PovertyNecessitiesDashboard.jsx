import React, { useState } from 'react';
import {
  HeartHandshake, Phone, AlertTriangle, CheckCircle2, ShieldCheck,
  Building2, Users, ArrowLeft, Send, Sparkles, MapPin,
  Utensils, Home, Baby, Coins, Briefcase, UserCheck, ShoppingBag, Eye, Award
} from 'lucide-react';

export const POVERTY_SUBCATEGORIES = [
  { id: 'poverty_hunger', name: '1. Hunger & Food Insecurity', icon: '🍚', desc: 'Emergency food shortage, ration scarcity & immediate community kitchen support' },
  { id: 'poverty_homelessness', name: '2. Homelessness Assistance', icon: '🏠', desc: 'Emergency night shelter, rehabilitation & safe living condition assistance' },
  { id: 'poverty_basic_necessities', name: '3. Lack of Basic Necessities', icon: '🍛', desc: 'Critical need for clothing, clean water, blankets, medicine & sanitary items' },
  { id: 'poverty_child_malnutrition', name: '4. Child Malnutrition Reporting', icon: '👶', desc: 'Severely malnourished infants, Anganwadi nutrition top-up & medical monitoring' },
  { id: 'poverty_financial_distress', name: '5. Financial Distress Support', icon: '💰', desc: 'Indebtedness, loss of family earning member & emergency social safety DBT' },
  { id: 'poverty_daily_wage', name: '6. Daily Wage Worker Assistance', icon: '👷', desc: 'Labour chowk placement, MGNREGA job card registration & fair wage protection' },
  { id: 'poverty_vulnerable_family', name: '7. Vulnerable Family Support', icon: '🧑‍🦽', desc: 'Special assistance for single women, disabled heads of household & destitute families' },
  { id: 'poverty_food_request', name: '8. Food/Essential Item Request', icon: '🧺', desc: 'Doorstep food kit delivery, dry ration packets & baby food formula requests' },
  { id: 'poverty_elderly_support', name: '9. Elderly Basic Needs Support', icon: '👴', desc: 'Abandoned senior citizens, old age pension enrollment & medical caregiver aid' },
  { id: 'poverty_economic_vulnerability', name: '10. Economic Vulnerability Assessment', icon: '📊', desc: 'BPL / Antyodaya card eligibility check & comprehensive multi-scheme enrolment' }
];

export default function PovertyNecessitiesDashboard({ speakText, currentUser, initialFeatureModule, onBack, hideOtherModules = true }) {
  const [selectedSubcategory, setSelectedSubcategory] = useState(
    initialFeatureModule || 'poverty_hunger'
  );

  React.useEffect(() => {
    if (initialFeatureModule) {
      setSelectedSubcategory(initialFeatureModule);
    }
  }, [initialFeatureModule]);

  const [submittedMsg, setSubmittedMsg] = useState(null);

  // Form State for all 10 Poverty Modules
  const [formData, setFormData] = useState({
    // Common User Details
    user_name: currentUser?.name || 'Anita Deshmukh',
    user_age: '32',
    user_mobile: currentUser?.phone || '+91 98451 99230',
    user_address: 'Slum Cluster, Ward 12, Brahampur, Kalaburagi',
    user_district: 'Kalaburagi / Karnataka',
    gps_location: '17.3312° N, 76.8378° E',
    family_size: '5',
    num_children: '3',
    employment_status: 'Unemployed / Casual Labor',
    monthly_income: '₹4,500',
    identity_preference: 'Confidential',
    previous_complaint: 'No',
    urgency_level: 'High',
    incident_desc: '',
    evidence_file: null,

    // 1. Hunger
    hunger_duration: '3 Days without sufficient meal',
    hunger_service_suggested: 'Kalaburagi Indira Canteen & Ward 12 Food Cell',

    // 2. Homelessness
    homeless_native_place: 'Rural Afzalpur Taluk',
    homeless_living_condition: 'Under Railway Overbridge footpath',
    homeless_duration: '6 Months',
    homeless_shelter_needed: 'Emergency Municipal Night Shelter',

    // 3. Basic Necessities
    necessity_required_item: 'Warm Blankets, Dry Ration & Safe Drinking Water Cans',
    necessity_quantity: 'For family of 5 members',
    necessity_duration: 'Immediate / Urgent need',

    // 4. Child Malnutrition
    child_name: 'Aarav (Age 3)',
    child_age: '3 Years',
    child_gender: 'Male',
    child_weight: '8.2 kg (Underweight - Severe Red Category)',
    child_health_info: 'Weakness, lethargy & vitamin deficiency symptoms',
    child_parent_guardian: 'Anita Deshmukh (Mother)',

    // 5. Financial Distress
    distress_reason: 'Sudden demise of earning spouse & medical debts',
    distress_duration: 'Past 4 Months',
    distress_prev_assistance: 'None received yet',

    // 6. Daily Wage Worker
    worker_skills: 'Masonry Helper, Construction Loading & Tile Laying',
    worker_type: 'Unskilled / Semi-skilled Construction Helper',
    worker_expected_wage: '₹550 / day',
    worker_availability: 'Immediate (All 7 Days)',
    worker_exp: '4 Years experience in local building construction',
    worker_id: 'KA-BOCW-2026-9912',

    // 7. Vulnerable Family
    vuln_support_type: 'Widow Pension + Free Children School Supplies + Food Kit',
    vuln_special_condition: 'Single mother with disabled child dependent',

    // 8. Food/Essential Request
    food_req_items: '10 kg Rice, 5 kg Atta, 2L Cooking Oil, 2 kg Dal, Baby Milk Powder',
    food_req_quantity: '1 Standard Monthly Relief Hamper',
    food_preferred_mode: 'Doorstep Volunteer Delivery',

    // 9. Elderly Support
    elderly_name: 'Govindappa Hiremath (Age 74)',
    elderly_age: '74 Years',
    elderly_caregiver: 'Living alone, no family support',
    elderly_assistance: 'Monthly Old Age Pension DBT + Free Chronic Medicines Delivery',
    elderly_emergency_contact: '+91 94480 11234 (Neighbor)',

    // 10. Economic Vulnerability
    vuln_housing_condition: 'Kutcha Mud House with Tin Roof',
    vuln_basic_needs_status: 'Severe shortage of cooking fuel and clean drinking water',
    vuln_computed_level: 'High Vulnerability (Priority 1 Beneficiary)'
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const subcatObj = POVERTY_SUBCATEGORIES.find(s => s.id === selectedSubcategory);
    const ticketId = `POV-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const msg = `Grievance registered under [${subcatObj?.name}]. Ticket ID: ${ticketId}. Auto-routed to Social Welfare Directorate & District Food Safety Cell (SLA: 24h).`;
    setSubmittedMsg(msg);

    if (speakText) {
      speakText(`Poverty assistance request submitted. Ticket ${ticketId}. District welfare cell alerted.`);
    }
  };

  const selectedSubcatObj = POVERTY_SUBCATEGORIES.find(s => s.id === selectedSubcategory) || POVERTY_SUBCATEGORIES[0];

  return (
    <div className="space-y-6 font-outfit">
      
      {/* 1. TOP POVERTY & BASIC NECESSITIES BANNER */}
      <div className="ethnic-card p-6 rounded-3xl bg-gradient-to-r from-slate-950 via-amber-950 to-orange-950 text-white border-2 border-amber-400 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold font-cinzel flex items-center gap-1.5 w-fit">
              <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />
              <span>National Social Assistance Programme (NSAP) • PM-GKAY Food Support</span>
            </span>
            <h2 className="text-xl md:text-2xl font-black font-cinzel text-white flex items-center space-x-2">
              <span>Poverty & Basic Necessities Support</span>
              <span className="text-2xl">🏠</span>
            </h2>
            <p className="text-xs text-amber-200/90 font-medium">
              Emergency hunger response, homeless shelters, child malnutrition tracking, worker placement & social security.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="tel:1967"
              className="px-4 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-lg flex items-center space-x-2 border border-amber-300"
            >
              <Phone className="w-4 h-4" />
              <span>1967 Food & Ration Helpline</span>
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
          <div className="flex items-center space-x-2 text-amber-200">
            <Utensils className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Indira & Annapurna Canteens Operational 24x7</span>
          </div>
          <div className="flex items-center space-x-2 text-orange-200">
            <Home className="w-4 h-4 text-orange-400 shrink-0" />
            <span>4 District Municipal Night Shelters Available</span>
          </div>
          <div className="flex items-center space-x-2 text-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Zero-Hunger Emergency Dispatch Active</span>
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
              Select Poverty & Basic Necessity Problem ({POVERTY_SUBCATEGORIES.length} Modules)
            </h3>
            <span className="text-[11px] font-bold text-amber-800">Tap to launch form</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {POVERTY_SUBCATEGORIES.map((subcat) => (
              <button
                key={subcat.id}
                type="button"
                onClick={() => {
                  setSelectedSubcategory(subcat.id);
                  if (speakText) speakText(`Selected ${subcat.name}`);
                }}
                className={`p-3 rounded-2xl border-2 text-left transition-all flex flex-col justify-between space-y-2 ${
                  selectedSubcategory === subcat.id
                    ? 'border-amber-600 bg-amber-50 shadow-md ring-2 ring-amber-300'
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
      <div className="ethnic-card p-6 rounded-3xl shadow-xl gold-glow border-2 border-amber-400 space-y-6">
        
        {/* Active Module Header */}
        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <span className="text-3xl p-2 rounded-2xl bg-white shadow border border-amber-300">{selectedSubcatObj.icon}</span>
            <div>
              <h4 className="text-sm font-black text-amber-950">{selectedSubcatObj.name}</h4>
              <p className="text-xs text-amber-800 font-medium">{selectedSubcatObj.desc}</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-200 text-amber-900 font-bold text-xs border border-amber-400 self-start sm:self-auto">
            Priority Assistance 24h SLA
          </span>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-5 text-xs">

          {/* Module 1: Hunger & Food Insecurity */}
          {selectedSubcategory === 'poverty_hunger' && (
            <div className="space-y-4">
              <div className="p-3 bg-red-50 rounded-2xl border border-red-300 text-red-950 font-bold flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Utensils className="w-5 h-5 text-red-600 animate-pulse" />
                  <span>AI Hunger Support: Instant routing to Indira Community Kitchens & Local Ward Relief.</span>
                </div>
                <span className="text-red-700 bg-red-100 px-2.5 py-1 rounded-xl text-[11px]">Immediate Meal Dispatch</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Food Shortage Duration *</label>
                  <select
                    value={formData.hunger_duration}
                    onChange={(e) => handleChange('hunger_duration', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-amber-950"
                  >
                    <option>Immediate / Zero food left today</option>
                    <option>1 - 2 Days shortage</option>
                    <option>3 - 5 Days shortage</option>
                    <option>Chronic monthly food insufficiency</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Number of Dependent Children *</label>
                  <input
                    type="number"
                    value={formData.num_children}
                    onChange={(e) => handleChange('num_children', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Nearest Suggested Food Service</label>
                  <input
                    type="text"
                    value={formData.hunger_service_suggested}
                    readOnly
                    className="w-full bg-amber-100 border border-amber-300 rounded-xl p-2.5 text-amber-950 font-bold"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 2: Homelessness Assistance */}
          {selectedSubcategory === 'poverty_homelessness' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Native Place / Origin *</label>
                  <input
                    type="text"
                    value={formData.homeless_native_place}
                    onChange={(e) => handleChange('homeless_native_place', e.target.value)}
                    placeholder="Village / Taluk / State"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Current Living Condition *</label>
                  <select
                    value={formData.homeless_living_condition}
                    onChange={(e) => handleChange('homeless_living_condition', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-amber-950"
                  >
                    <option>Footpath / Open Roadside</option>
                    <option>Under Bridge / Flyover</option>
                    <option>Railway Platform / Bus Stand Shed</option>
                    <option>Temporary Polythene Tent</option>
                    <option>Abandoned Public Building</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Duration of Homelessness *</label>
                  <input
                    type="text"
                    value={formData.homeless_duration}
                    onChange={(e) => handleChange('homeless_duration', e.target.value)}
                    placeholder="E.g. 2 months, 1 year"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 3: Lack of Basic Necessities */}
          {selectedSubcategory === 'poverty_basic_necessities' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Required Essential Items *</label>
                  <input
                    type="text"
                    value={formData.necessity_required_item}
                    onChange={(e) => handleChange('necessity_required_item', e.target.value)}
                    placeholder="E.g. Blankets, cooking stove, water cans"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Quantity / Family Coverage *</label>
                  <input
                    type="text"
                    value={formData.necessity_quantity}
                    onChange={(e) => handleChange('necessity_quantity', e.target.value)}
                    placeholder="E.g. For 5 family members"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Urgency Level *</label>
                  <select
                    value={formData.urgency_level}
                    onChange={(e) => handleChange('urgency_level', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-amber-950"
                  >
                    <option value="High">High - Critical for survival</option>
                    <option value="Medium">Medium - Needed within 48 hours</option>
                    <option value="Low">Low - General welfare request</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Module 4: Child Malnutrition Reporting */}
          {selectedSubcategory === 'poverty_child_malnutrition' && (
            <div className="space-y-4">
              <div className="p-3 bg-pink-50 rounded-2xl border border-pink-300 text-pink-950 font-bold flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Baby className="w-5 h-5 text-pink-600" />
                  <span>Anganwadi Rapid Response: Direct link to Poshan Abhiyaan Child Nutrition Officer.</span>
                </div>
                <span className="text-pink-700 bg-pink-100 px-2.5 py-1 rounded-xl text-[11px]">Special Diet Allocation</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Child's Name & Age *</label>
                  <input
                    type="text"
                    value={formData.child_name}
                    onChange={(e) => handleChange('child_name', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Approximate Weight / Growth Status</label>
                  <input
                    type="text"
                    value={formData.child_weight}
                    onChange={(e) => handleChange('child_weight', e.target.value)}
                    placeholder="E.g. 8 kg (Severely underweight)"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Parent / Guardian Contact</label>
                  <input
                    type="text"
                    value={formData.child_parent_guardian}
                    onChange={(e) => handleChange('child_parent_guardian', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 5: Financial Distress */}
          {selectedSubcategory === 'poverty_financial_distress' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Reason for Financial Distress *</label>
                  <select
                    value={formData.distress_reason}
                    onChange={(e) => handleChange('distress_reason', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-amber-950"
                  >
                    <option>Sudden demise of earning spouse & medical debts</option>
                    <option>Severe illness / Permanent disability of earner</option>
                    <option>Job loss / Crop failure / Natural disaster loss</option>
                    <option>Exploitative private moneylender debt cycle</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Duration of Distress *</label>
                  <input
                    type="text"
                    value={formData.distress_duration}
                    onChange={(e) => handleChange('distress_duration', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 6: Daily Wage Worker Assistance */}
          {selectedSubcategory === 'poverty_daily_wage' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Worker Skills & Trades *</label>
                  <input
                    type="text"
                    value={formData.worker_skills}
                    onChange={(e) => handleChange('worker_skills', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Expected Daily Wage *</label>
                  <input
                    type="text"
                    value={formData.worker_expected_wage}
                    onChange={(e) => handleChange('worker_expected_wage', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Construction Worker ID / MGNREGA Card</label>
                  <input
                    type="text"
                    value={formData.worker_id}
                    onChange={(e) => handleChange('worker_id', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 7: Vulnerable Family Support */}
          {selectedSubcategory === 'poverty_vulnerable_family' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Type of Support Required *</label>
                  <input
                    type="text"
                    value={formData.vuln_support_type}
                    onChange={(e) => handleChange('vuln_support_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Special Household Condition *</label>
                  <input
                    type="text"
                    value={formData.vuln_special_condition}
                    onChange={(e) => handleChange('vuln_special_condition', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 8: Food/Essential Item Request */}
          {selectedSubcategory === 'poverty_food_request' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Required Grocery & Nutrition Items *</label>
                  <input
                    type="text"
                    value={formData.food_req_items}
                    onChange={(e) => handleChange('food_req_items', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Quantity Package</label>
                  <input
                    type="text"
                    value={formData.food_req_quantity}
                    onChange={(e) => handleChange('food_req_quantity', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Preferred Delivery Mode *</label>
                  <select
                    value={formData.food_preferred_mode}
                    onChange={(e) => handleChange('food_preferred_mode', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-amber-950"
                  >
                    <option>Doorstep Volunteer Delivery</option>
                    <option>Pickup from Nearest Anganwadi Center</option>
                    <option>Pickup from Ward Fair Price Ration Shop</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Module 9: Elderly Support */}
          {selectedSubcategory === 'poverty_elderly_support' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Senior Citizen Name & Age *</label>
                  <input
                    type="text"
                    value={formData.elderly_name}
                    onChange={(e) => handleChange('elderly_name', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Assistance Required *</label>
                  <input
                    type="text"
                    value={formData.elderly_assistance}
                    onChange={(e) => handleChange('elderly_assistance', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Emergency Contact Number</label>
                  <input
                    type="text"
                    value={formData.elderly_emergency_contact}
                    onChange={(e) => handleChange('elderly_emergency_contact', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 10: Economic Vulnerability Assessment */}
          {selectedSubcategory === 'poverty_economic_vulnerability' && (
            <div className="space-y-4">
              <div className="p-3 bg-amber-100 rounded-2xl border border-amber-300 text-amber-950 font-bold flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-amber-700" />
                  <span>Automated AI Multi-Dimensional Poverty Index (MPI) Score Generator</span>
                </div>
                <span className="bg-amber-700 text-white px-3 py-1 rounded-xl text-xs font-bold">{formData.vuln_computed_level}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Housing Condition *</label>
                  <input
                    type="text"
                    value={formData.vuln_housing_condition}
                    onChange={(e) => handleChange('vuln_housing_condition', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Basic Amenities Status *</label>
                  <input
                    type="text"
                    value={formData.vuln_basic_needs_status}
                    onChange={(e) => handleChange('vuln_basic_needs_status', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* COMMON FIELDS SECTION (Universal to all 10 Poverty Modules) */}
          <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-300 space-y-4">
            <h5 className="font-black text-amber-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-700" />
              <span>Beneficiary Household & Verification Details</span>
            </h5>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-amber-950">Beneficiary Name *</label>
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
                <label className="font-bold text-amber-950">Family Size *</label>
                <input
                  type="number"
                  value={formData.family_size}
                  onChange={(e) => handleChange('family_size', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs text-slate-800"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-amber-950">Monthly Income *</label>
                <input
                  type="text"
                  value={formData.monthly_income}
                  onChange={(e) => handleChange('monthly_income', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs text-slate-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-amber-950">Location / Address *</label>
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
                  className="w-full bg-amber-100 border border-amber-300 rounded-xl p-2 text-xs text-amber-950 font-bold"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-amber-950">Identity Preference *</label>
                <select
                  value={formData.identity_preference}
                  onChange={(e) => handleChange('identity_preference', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs font-bold text-amber-950"
                >
                  <option value="Confidential">Confidential (Protected Identity)</option>
                  <option value="Public">Public (Display name on volunteer board)</option>
                  <option value="Anonymous">Anonymous (Full Masking)</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-amber-950">Detailed Grievance / Additional Notes</label>
              <textarea
                rows={2}
                value={formData.incident_desc}
                onChange={(e) => handleChange('incident_desc', e.target.value)}
                placeholder="Describe current living distress, urgent medical/food requirements, or specific requests..."
                className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs text-slate-800 font-medium"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-amber-700 to-orange-600 text-white font-bold text-xs rounded-xl shadow-lg hover:opacity-95 flex items-center justify-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>Submit Poverty & Basic Necessity Request</span>
          </button>
        </form>
      </div>
    </div>
  );
}
