import React, { useState } from 'react';
import {
  Stethoscope, Phone, AlertTriangle, CheckCircle2, ShieldCheck,
  Heart, MapPin, ArrowLeft, Send, Sparkles, AlertOctagon,
  Building2, Activity, Syringe, Droplets, Pill, ShieldAlert
} from 'lucide-react';

export const HEALTH_SUBCATEGORIES = [
  { id: 'health_medical_camp', name: '1. Medical Camp Request', icon: '🏕️', desc: 'Free public health camp for village, school, community center or workplace' },
  { id: 'health_nearest_hospital', name: '2. Nearest Hospital / Clinic Finder', icon: '🏥', desc: 'Locate 24x7 emergency department, government district hospital or PHC clinic' },
  { id: 'health_ambulance_assistance', name: '3. Ambulance Assistance (108 / 102)', icon: '🚑', desc: 'Emergency 108 trauma & 102 maternal health ambulance dispatch' },
  { id: 'health_blood_donor', name: '4. Blood Donor Request', icon: '🩸', desc: 'Urgent blood units matching from verified voluntary donor registry' },
  { id: 'health_medicine_availability', name: '5. Medicine Availability', icon: '💊', desc: 'Pradhan Mantri Jan Aushadhi Kendra generic medicine stock verification' },
  { id: 'health_public_health_hazard', name: '6. Public Health Hazard', icon: '☣️', desc: 'Epidemic outbreak, dengue larvae breeding, open sewage chemical risk' },
  { id: 'health_vaccination_info', name: '7. Vaccination Information & Center', icon: '💉', desc: 'Universal Immunization Programme (UIP) infant & adult vaccine slots' },
  { id: 'health_sanitation_health_risk', name: '8. Sanitation Health Risk', icon: '⚠️', desc: 'Contaminated drainage posing infectious disease & mosquito outbreak danger' },
  { id: 'health_emergency_medical_location', name: '9. Emergency Medical Location + Ambulance', icon: '🚨', desc: 'GPS-guided emergency triage dispatch with nearest ICU bed reservation' },
  { id: 'health_elderly_health_assistance', name: '10. Elderly Health Assistance', icon: '👴', desc: 'Doorstep chronic illness care, palliative medical checkup & emergency contact' }
];

export default function HealthMedicalDashboard({ speakText, currentUser, initialFeatureModule, onBack, hideOtherModules = true }) {
  const [selectedSubcategory, setSelectedSubcategory] = useState(
    initialFeatureModule || 'health_medical_camp'
  );

  React.useEffect(() => {
    if (initialFeatureModule) {
      setSelectedSubcategory(initialFeatureModule);
    }
  }, [initialFeatureModule]);

  const [submittedMsg, setSubmittedMsg] = useState(null);

  // Form State for all 10 Health & Medical Modules
  const [formData, setFormData] = useState({
    // Common User / Patient Details
    user_name: currentUser?.name || 'Dr. Ramesh Kulkarni',
    user_mobile: currentUser?.phone || '+91 98450 11223',
    user_location: 'Ward 12, Sedam Road, Kalaburagi',
    gps_location: '17.3325° N, 76.8380° E',
    urgency_level: 'High',
    incident_desc: '',
    photo_file: null,

    // 1. Medical Camp Request
    camp_area_type: 'Village / Rural Area',
    camp_location: 'Government Primary School Ground, Brahampur',
    camp_people_count: '250 - 300 Citizens',
    camp_services: 'General Checkup, Blood Test, Eye Checkup, Health Awareness',
    camp_date: '2026-09-05',

    // 2. Nearest Hospital
    hospital_patient_condition: 'High Fever, Dehydration & Acute Respiratory Shortness',
    hospital_req_dept: 'General Medicine / Pulmonology Emergency',

    // 3. Ambulance Assistance
    amb_patient_name: 'Lakshmi Bai',
    amb_contact_number: '+91 98450 11223',
    amb_emergency_type: 'Accident / Trauma (108 Ambulance)',
    amb_pickup_location: 'Near Old Bus Stand Signal, Ward 12',
    amb_dest_hospital: 'Gulbarga Institute of Medical Sciences (GIMS) Trauma Centre',

    // 4. Blood Donor Request
    blood_patient_reg: 'GIMS-IPD-2026-0941',
    blood_patient_name: 'Vijay Kumar',
    blood_patient_age: '34 Years',
    blood_group: 'O Negative (O-ve)',
    blood_ml_req: '2 Units (700 ml Whole Blood / PRBC)',
    blood_hospital_name: 'GIMS Government Blood Bank, Kalaburagi',
    blood_govt_id: 'Aadhaar: XXXX-XXXX-8821',
    blood_req_date: '2026-08-26 (Immediate Required)',

    // 5. Medicine Availability
    med_name: 'Insulin Glargine 100 IU/ml & Telmisartan 40mg',
    med_quantity: '2 Vials & 3 Strips (30 Tablets)',

    // 6. Public Health Hazard
    hazard_location: 'Ward 12 Storm Drain near Vegetable Market',
    hazard_type: 'Dengue Mosquito Larvae Breeding & Stagnant Sewage Overflow',
    hazard_desc: 'Large pool of dark chemical sewage standing for 2 weeks with intense mosquito swarm',

    // 7. Vaccination Information
    vax_name: 'Tetanus Toxoid (TT) & Pentavalent Booster',
    vax_people_count: '45 Children & Pregnant Women',
    vax_info_req: 'Mobile Vaccination Team Visit & Next Weekly Slot Details',
    vax_center_location: 'Ward 12 Urban Primary Health Centre (UPHC)',

    // 8. Sanitation Health Risk
    sanitation_area_location: 'Behind Primary School, Station Road',
    sanitation_problem: 'Broken sewer line overflowing into school playground with severe foul odor',

    // 9. Emergency Medical Location + Ambulance
    emerg_type: 'Cardiac Chest Pain with Sweating & Breathlessness',
    emerg_facility_needed: 'ICU Bed with 24x7 Cath Lab / Cardiology',

    // 10. Elderly Health Assistance
    elderly_name: 'Shankarappa Patil',
    elderly_age: '82 Years',
    elderly_address: 'House # 42, 3rd Cross, Brahampur, Kalaburagi',
    elderly_health_problem: 'Bedridden Chronic Stroke & High Blood Pressure',
    elderly_req_assistance: 'Monthly Doctor Home Visit & Free BP/Sugar Medicine Supply',
    elderly_emergency_contact: '+91 94481 00922 (Son - Anand Patil)'
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const subcatObj = HEALTH_SUBCATEGORIES.find(s => s.id === selectedSubcategory);
    const ticketId = `MED-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const msg = `Medical request registered under [${subcatObj?.name}]. Ticket ID: ${ticketId}. Auto-routed to District Health Office (DHO), 108 Emergency Control Room & GIMS Hospital.`;
    setSubmittedMsg(msg);

    if (speakText) {
      speakText(`Health and medical request submitted. Ticket number ${ticketId}. Medical rapid response alerted.`);
    }
  };

  const selectedSubcatObj = HEALTH_SUBCATEGORIES.find(s => s.id === selectedSubcategory) || HEALTH_SUBCATEGORIES[0];

  return (
    <div className="space-y-6 font-outfit">
      
      {/* 1. TOP HEALTH & MEDICAL BANNER */}
      <div className="ethnic-card p-6 rounded-3xl bg-gradient-to-r from-slate-950 via-emerald-950 to-teal-950 text-white border-2 border-emerald-400 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold font-cinzel flex items-center gap-1.5 w-fit">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>National Health Mission (NHM) • 108 Emergency Response Cell</span>
            </span>
            <h2 className="text-xl md:text-2xl font-black font-cinzel text-white flex items-center space-x-2">
              <span>Health & Medical Support System</span>
              <span className="text-2xl">🩺</span>
            </h2>
            <p className="text-xs text-emerald-200/90 font-medium">
              108 Emergency Ambulance triage, Free Blood matching, Jan Aushadhi generic medicines & public health hazard response.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="tel:108"
              className="px-4 py-2.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-lg flex items-center space-x-2 border border-red-300 animate-pulse"
            >
              <Phone className="w-4 h-4" />
              <span>108 Medical Emergency</span>
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
          <div className="flex items-center space-x-2 text-emerald-200">
            <Activity className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>108 & 102 GPS-Linked Ambulance Dispatch Ready</span>
          </div>
          <div className="flex items-center space-x-2 text-red-200">
            <Droplets className="w-4 h-4 text-rose-400 shrink-0" />
            <span>District Blood Bank Voluntary Donor Network Live</span>
          </div>
          <div className="flex items-center space-x-2 text-teal-200">
            <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
            <span>Zero-Delay Emergency Life Triage Protocol</span>
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
              Select Health & Medical Category ({HEALTH_SUBCATEGORIES.length} Modules)
            </h3>
            <span className="text-[11px] font-bold text-emerald-900">Tap to launch specialized form</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {HEALTH_SUBCATEGORIES.map((subcat) => (
              <button
                key={subcat.id}
                type="button"
                onClick={() => {
                  setSelectedSubcategory(subcat.id);
                  if (speakText) speakText(`Selected ${subcat.name}`);
                }}
                className={`p-3 rounded-2xl border-2 text-left transition-all flex flex-col justify-between space-y-2 ${
                  selectedSubcategory === subcat.id
                    ? 'border-emerald-600 bg-emerald-50 shadow-md ring-2 ring-emerald-300'
                    : 'border-amber-200 bg-white hover:border-amber-400 hover:bg-amber-50/50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-xl p-1.5 rounded-xl bg-emerald-100 border border-emerald-300 shrink-0">{subcat.icon}</span>
                  <span className="text-xs font-black text-slate-950 line-clamp-2">{subcat.name}</span>
                </div>
                <p className="text-[10px] text-slate-600 font-medium line-clamp-2">{subcat.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3. DYNAMIC TARGETED FORM */}
      <div className="ethnic-card p-6 rounded-3xl shadow-xl gold-glow border-2 border-emerald-400 space-y-6">
        
        {/* Active Module Header */}
        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <span className="text-3xl p-2 rounded-2xl bg-white shadow border border-emerald-300">{selectedSubcatObj.icon}</span>
            <div>
              <h4 className="text-sm font-black text-emerald-950">{selectedSubcatObj.name}</h4>
              <p className="text-xs text-emerald-800 font-medium">{selectedSubcatObj.desc}</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-200 text-emerald-950 font-bold text-xs border border-emerald-400 self-start sm:self-auto">
            {selectedSubcategory.includes('ambulance') || selectedSubcategory.includes('blood') || selectedSubcategory.includes('emergency') ? '🚨 Rapid Emergency SLA' : 'District Health SLA'}
          </span>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-5 text-xs">

          {/* Module 1: Medical Camp Request */}
          {selectedSubcategory === 'health_medical_camp' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Area Type *</label>
                  <select
                    value={formData.camp_area_type}
                    onChange={(e) => handleChange('camp_area_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option>Village / Rural Area</option>
                    <option>School / College</option>
                    <option>Community Center / Slum</option>
                    <option>Workplace / Industrial Area</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Camp Location Address *</label>
                  <input
                    type="text"
                    value={formData.camp_location}
                    onChange={(e) => handleChange('camp_location', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Estimated Number of People *</label>
                  <input
                    type="text"
                    value={formData.camp_people_count}
                    onChange={(e) => handleChange('camp_people_count', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Required Services *</label>
                  <input
                    type="text"
                    value={formData.camp_services}
                    onChange={(e) => handleChange('camp_services', e.target.value)}
                    placeholder="General Checkup, Blood Test, Eye Checkup, Dental, Vaccination..."
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Proposed Date *</label>
                  <input
                    type="date"
                    value={formData.camp_date}
                    onChange={(e) => handleChange('camp_date', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 2: Nearest Hospital / Clinic */}
          {selectedSubcategory === 'health_nearest_hospital' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Patient Condition *</label>
                  <input
                    type="text"
                    value={formData.hospital_patient_condition}
                    onChange={(e) => handleChange('hospital_patient_condition', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Required Department *</label>
                  <input
                    type="text"
                    value={formData.hospital_req_dept}
                    onChange={(e) => handleChange('hospital_req_dept', e.target.value)}
                    placeholder="Emergency, Pediatrics, Cardiology, Orthopedics, Maternity..."
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 3: Ambulance Assistance */}
          {selectedSubcategory === 'health_ambulance_assistance' && (
            <div className="space-y-4">
              <div className="p-3 bg-red-50 rounded-2xl border border-red-300 text-red-950 font-bold flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-red-600 animate-pulse" />
                  <span>108 / 102 GPS Ambulance Rapid Dispatch Engine Activated.</span>
                </div>
                <a href="tel:108" className="bg-red-600 text-white px-3 py-1 rounded-xl text-xs font-bold">Call 108 Direct</a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Patient Name *</label>
                  <input
                    type="text"
                    value={formData.amb_patient_name}
                    onChange={(e) => handleChange('amb_patient_name', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Emergency Contact Number *</label>
                  <input
                    type="text"
                    value={formData.amb_contact_number}
                    onChange={(e) => handleChange('amb_contact_number', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Emergency Type *</label>
                  <select
                    value={formData.amb_emergency_type}
                    onChange={(e) => handleChange('amb_emergency_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option>Accident / Trauma (108 Ambulance)</option>
                    <option>Pregnant Woman / Delivery (102 Janani Shishu)</option>
                    <option>Cardiac / Stroke Emergency</option>
                    <option>Severe Breathing Difficulty</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Pickup Location *</label>
                  <input
                    type="text"
                    value={formData.amb_pickup_location}
                    onChange={(e) => handleChange('amb_pickup_location', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Destination Hospital *</label>
                  <input
                    type="text"
                    value={formData.amb_dest_hospital}
                    onChange={(e) => handleChange('amb_dest_hospital', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 4: Blood Donor Request */}
          {selectedSubcategory === 'health_blood_donor' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Patient Name *</label>
                  <input
                    type="text"
                    value={formData.blood_patient_name}
                    onChange={(e) => handleChange('blood_patient_name', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Patient Age *</label>
                  <input
                    type="text"
                    value={formData.blood_patient_age}
                    onChange={(e) => handleChange('blood_patient_age', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Blood Group *</label>
                  <select
                    value={formData.blood_group}
                    onChange={(e) => handleChange('blood_group', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-red-600"
                  >
                    <option>A Positive (A+)</option>
                    <option>A Negative (A-)</option>
                    <option>B Positive (B+)</option>
                    <option>B Negative (B-)</option>
                    <option>O Positive (O+)</option>
                    <option>O Negative (O-)</option>
                    <option>AB Positive (AB+)</option>
                    <option>AB Negative (AB-)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Units / ml Required *</label>
                  <input
                    type="text"
                    value={formData.blood_ml_req}
                    onChange={(e) => handleChange('blood_ml_req', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Hospital Name *</label>
                  <input
                    type="text"
                    value={formData.blood_hospital_name}
                    onChange={(e) => handleChange('blood_hospital_name', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Hospital Reg / Govt ID</label>
                  <input
                    type="text"
                    value={formData.blood_govt_id}
                    onChange={(e) => handleChange('blood_govt_id', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Required Date *</label>
                  <input
                    type="text"
                    value={formData.blood_req_date}
                    onChange={(e) => handleChange('blood_req_date', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 5: Medicine Availability */}
          {selectedSubcategory === 'health_medicine_availability' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Medicine Name / Composition *</label>
                  <input
                    type="text"
                    value={formData.med_name}
                    onChange={(e) => handleChange('med_name', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Quantity Required *</label>
                  <input
                    type="text"
                    value={formData.med_quantity}
                    onChange={(e) => handleChange('med_quantity', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 6: Public Health Hazard */}
          {selectedSubcategory === 'health_public_health_hazard' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Hazard Location *</label>
                  <input
                    type="text"
                    value={formData.hazard_location}
                    onChange={(e) => handleChange('hazard_location', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Hazard Type *</label>
                  <input
                    type="text"
                    value={formData.hazard_type}
                    onChange={(e) => handleChange('hazard_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="font-bold text-amber-950">Hazard Description *</label>
                <textarea
                  rows={2}
                  value={formData.hazard_desc}
                  onChange={(e) => handleChange('hazard_desc', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                />
              </div>
            </div>
          )}

          {/* Module 7: Vaccination Information */}
          {selectedSubcategory === 'health_vaccination_info' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Vaccine Name *</label>
                  <input
                    type="text"
                    value={formData.vax_name}
                    onChange={(e) => handleChange('vax_name', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Number of People Requiring Vaccine *</label>
                  <input
                    type="text"
                    value={formData.vax_people_count}
                    onChange={(e) => handleChange('vax_people_count', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Vaccine Center / PHC Location *</label>
                  <input
                    type="text"
                    value={formData.vax_center_location}
                    onChange={(e) => handleChange('vax_center_location', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 8: Sanitation Health Risk */}
          {selectedSubcategory === 'health_sanitation_health_risk' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Area Location *</label>
                  <input
                    type="text"
                    value={formData.sanitation_area_location}
                    onChange={(e) => handleChange('sanitation_area_location', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Sanitation Problem Details *</label>
                  <input
                    type="text"
                    value={formData.sanitation_problem}
                    onChange={(e) => handleChange('sanitation_problem', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 9: Emergency Medical Location + Ambulance */}
          {selectedSubcategory === 'health_emergency_medical_location' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Emergency Type *</label>
                  <input
                    type="text"
                    value={formData.emerg_type}
                    onChange={(e) => handleChange('emerg_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Medical Facility Needed *</label>
                  <input
                    type="text"
                    value={formData.emerg_facility_needed}
                    onChange={(e) => handleChange('emerg_facility_needed', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 10: Elderly Health Assistance */}
          {selectedSubcategory === 'health_elderly_health_assistance' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Elderly Citizen Name *</label>
                  <input
                    type="text"
                    value={formData.elderly_name}
                    onChange={(e) => handleChange('elderly_name', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Age *</label>
                  <input
                    type="text"
                    value={formData.elderly_age}
                    onChange={(e) => handleChange('elderly_age', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Emergency Contact Person *</label>
                  <input
                    type="text"
                    value={formData.elderly_emergency_contact}
                    onChange={(e) => handleChange('elderly_emergency_contact', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Health Problem Description *</label>
                  <input
                    type="text"
                    value={formData.elderly_health_problem}
                    onChange={(e) => handleChange('elderly_health_problem', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Required Medical Assistance *</label>
                  <input
                    type="text"
                    value={formData.elderly_req_assistance}
                    onChange={(e) => handleChange('elderly_req_assistance', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* COMMON CONTACT & LOCATION SECTION */}
          <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-300 space-y-4">
            <h5 className="font-black text-emerald-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-700" />
              <span>Contact Person & Patient GPS Location</span>
            </h5>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-amber-950">Complainant / Citizen Name *</label>
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
                <label className="font-bold text-amber-950">Current Address / Landmark *</label>
                <input
                  type="text"
                  value={formData.user_location}
                  onChange={(e) => handleChange('user_location', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs text-slate-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-amber-950">GPS Coordinates (Auto-Captured)</label>
                <input
                  type="text"
                  value={formData.gps_location}
                  readOnly
                  className="w-full bg-emerald-100 border border-emerald-300 rounded-xl p-2 text-xs text-emerald-950 font-bold"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-amber-950">Urgency Level *</label>
                <select
                  value={formData.urgency_level}
                  onChange={(e) => handleChange('urgency_level', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs font-bold text-slate-800"
                >
                  <option value="Emergency">Emergency (Immediate 108 Ambulance Dispatch)</option>
                  <option value="High">High (Within 2 Hours)</option>
                  <option value="Medium">Medium (Within 24 Hours)</option>
                  <option value="Low">Low (General Health Inquiry)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold text-xs rounded-xl shadow-lg hover:opacity-95 flex items-center justify-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>Dispatch Medical Request & Notify Health Directorate</span>
          </button>
        </form>
      </div>
    </div>
  );
}
