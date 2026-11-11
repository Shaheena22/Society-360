import React, { useState } from 'react';
import {
  Dog, Phone, AlertTriangle, CheckCircle2, ShieldCheck,
  Heart, MapPin, ArrowLeft, Send, Sparkles, AlertOctagon,
  Stethoscope, Home, Camera, ShieldAlert, Users, Search
} from 'lucide-react';

export const ANIMAL_WELFARE_SUBCATEGORIES = [
  { id: 'animal_injured_reporting', name: '1. Report Injured Animal', icon: '🐾', desc: 'Centralized emergency dispatch for injured, road accident & distressed stray animals' },
  { id: 'animal_rescue_delay', name: '2. Delay in Rescuing Injured / Stray Animals', icon: '⏳', desc: 'Escalate overdue rescue requests, critical triage & emergency rescue dispatch' },
  { id: 'animal_nearby_orgs', name: '3. Find Nearby Animal Rescue Organizations', icon: '📍', desc: 'Local NGO contacts, volunteer networks & animal welfare helpline directory' },
  { id: 'animal_missing_pet', name: '4. Missing Pet Reporting & Reunification', icon: '🔍', desc: 'Photo matching, community lost & found pet bulletin & ward microchip scan' },
  { id: 'animal_adoption_awareness', name: '5. Animal Adoption Support', icon: '🐕', desc: 'Adopt stray puppies/kittens, foster care network & shelter adoption drives' },
  { id: 'animal_abandonment', name: '6. Abandonment of Pets & Domestic Animals', icon: '🚪', desc: 'Report dumped pets, cruel abandonment & illegal breeder dumping' },
  { id: 'animal_shelter_info', name: '7. Animal Shelters & Sanctuaries Directory', icon: '🏠', desc: 'Short-stay & long-term municipal shelter admission for destitute animals' },
  { id: 'animal_emergency_vet', name: '8. Emergency Veterinary Assistance', icon: '🩺', desc: '24x7 Government Veterinary Hospital ambulance, trauma surgeon on call' },
  { id: 'animal_food_water_support', name: '9. Food & Water Support for Stray Animals', icon: '🍲', desc: 'Community feeder bowls, water pots installation & stray animal feeding drives' },
  { id: 'animal_abuse_cruelty', name: '10. Animal Abuse & Cruelty Reporting (PCA Act)', icon: '🚨', desc: 'Strict anti-cruelty FIR registration under Prevention of Cruelty to Animals Act' },
  { id: 'animal_volunteer_coordination', name: '11. Rescuer & Volunteer Coordination', icon: '🤝', desc: 'Join ward animal rescue network, foster caregiver registry & transport van' },
  { id: 'animal_vaccine_sterilization', name: '12. Animal Vaccination & ABC Sterilization', icon: '💉', desc: 'Anti-Rabies Drive (ARV) & Animal Birth Control (ABC) ward scheduling' },
  { id: 'animal_shelter_found_pet', name: '13. Finding Shelter for a Found Animal or Pet', icon: '🦮', desc: 'Temporary foster care, healthy/sick intake & urgent animal shelter placement' }
];

export default function AnimalWelfareDashboard({ speakText, currentUser, initialFeatureModule, onBack, hideOtherModules = true }) {
  const [selectedSubcategory, setSelectedSubcategory] = useState(
    initialFeatureModule || 'animal_injured_reporting'
  );

  React.useEffect(() => {
    if (initialFeatureModule) {
      setSelectedSubcategory(initialFeatureModule);
    }
  }, [initialFeatureModule]);

  const [submittedMsg, setSubmittedMsg] = useState(null);

  // Form State for all 13 Animal Welfare Modules
  const [formData, setFormData] = useState({
    // Common reporter & location details
    reporter_name: currentUser?.name || 'Dr. Shweta Kulkarni',
    reporter_mobile: currentUser?.phone || '+91 98450 99881',
    reporter_email: currentUser?.email || 'shweta.k@example.com',
    animal_type: 'Stray Dog (Canine)',
    animal_desc: 'Brown Indie stray dog, approx 2 years old',
    exact_location: 'Near Old Bus Stand Signal, Sedam Road, Kalaburagi',
    gps_location: '17.3318° N, 76.8370° E',
    incident_datetime: new Date().toISOString().slice(0, 16),
    urgency_level: 'High',
    is_anonymous: 'No',
    photo_file: null,
    video_file: null,
    additional_notes: '',

    // 1. Injured Animal
    injury_condition: 'Fractured hind leg from vehicle collision, active bleeding, cannot stand',

    // 2. Rescue Delay
    delay_prev_request_time: '2026-08-25 09:00 AM (8 Hours Elapsed)',
    delay_org_contacted: 'City Municipal Animal Control Helpline',
    delay_current_status: 'Animal in severe pain under shop shutter, bleeding continuous',

    // 3. Nearby Orgs
    nearby_help_type: 'Immediate Ambulance & Trauma Stretcher Pickup',
    nearby_preferred_radius: 'Within 5 km radius',

    // 4. Missing Pet
    pet_name: 'Bruno',
    pet_breed: 'Golden Retriever Mix',
    pet_gender: 'Male',
    pet_age: '3 Years',
    pet_color_marks: 'Golden brown coat with white patch on chest, red nylon collar',
    pet_date_missing: '2026-08-24 19:30',
    pet_last_seen: 'Brahampur Residential Cross near City Park',

    // 5. Adoption
    adopt_pref_type: 'Indie Puppy / Kitten',
    adopt_pref_age: '2 - 4 Months (Vaccinated)',
    adopt_pref_gender: 'Female',
    adopt_experience: 'Has owned 2 dogs previously, pet-friendly independent house with garden',
    adopt_reason: 'Looking to give loving permanent home to rescued stray',

    // 6. Abandonment
    abandon_condition: 'Tied with tight rope to electrical pole in rain without food/water',
    abandon_suspected_owner: 'Tenant vacated house # 44 yesterday night',

    // 7. Shelter Info
    shelter_reason: 'Rescued pregnant indie dog needing safe delivery space',
    shelter_num_animals: '1 Mother dog + anticipated litter',
    shelter_duration: '4 - 6 Weeks foster shelter',

    // 8. Emergency Vet
    vet_emergency_desc: 'Acute poisoning symptoms / severe respiratory distress and seizures',
    vet_transport_available: 'No (Emergency Mobile Vet Van Needed)',

    // 9. Food & Water
    food_support_type: 'Both Food and Clean Water Pots',
    food_animals_count: 'Pack of approx 8 - 10 stray dogs in Ward 12 market area',
    food_frequency: 'Daily feeding support & installation of cement water troughs',

    // 10. Abuse and Cruelty (PCA Act)
    abuse_type: 'Physical Beating with Iron Rod & Intentional Poisoning Threat',
    abuse_person_responsible: 'Local commercial shop owner on 4th Cross',
    abuse_witness_details: 'Vegetable vendor and 2 local residents',
    abuse_immediate_danger: 'Yes (Immediate Police & SPCA Intercept Required)',

    // 11. Coordination
    volunteer_role: 'Volunteer / Foster Caregiver',
    volunteer_area: 'Kalaburagi City North & Ward 12',
    volunteer_availability: 'Weekends + Evenings (10 hrs/week)',
    volunteer_transport: 'Yes (Two-wheeler with carrier basket)',

    // 12. Vaccine & Sterilization
    vax_status: 'Unvaccinated / Rabies booster due',
    vax_sterilize_status: 'Not Sterilized (Ear-notch absent)',
    vax_help_needed: 'Both Anti-Rabies Vaccine + Animal Birth Control (ABC) Surgery',
    vax_animal_count: '6 Stray Dogs in lane',

    // 13. Shelter for Found Pet
    found_breed: 'Lhasa Apso / Shih Tzu (Lost Domestic Pet)',
    found_age: 'Approx 1.5 - 2 Years',
    found_gender: 'Male',
    found_marks: 'White & Grey fluffy coat, clean well-groomed ears',
    found_condition: 'Healthy (Appears recently lost / escaped home)',
    found_temp_care_available: 'Yes',
    found_how_long_keep: 'Can foster at home for 3 - 4 days until owner/shelter is located'
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const subcatObj = ANIMAL_WELFARE_SUBCATEGORIES.find(s => s.id === selectedSubcategory);
    const ticketId = `ANM-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const msg = `Dispatch recorded under [${subcatObj?.name}]. Ticket ID: ${ticketId}. Auto-routed to Society for Prevention of Cruelty to Animals (SPCA), Govt Veterinary Hospital & District Animal Ambulance Squad (Emergency SLA: 1h).`;
    setSubmittedMsg(msg);

    if (speakText) {
      speakText(`Animal welfare request logged. Ticket number ${ticketId}. Mobile rescue ambulance alerted.`);
    }
  };

  const selectedSubcatObj = ANIMAL_WELFARE_SUBCATEGORIES.find(s => s.id === selectedSubcategory) || ANIMAL_WELFARE_SUBCATEGORIES[0];

  return (
    <div className="space-y-6 font-outfit">
      
      {/* 1. TOP ANIMAL WELFARE BANNER */}
      <div className="ethnic-card p-6 rounded-3xl bg-gradient-to-r from-slate-950 via-orange-950 to-amber-950 text-white border-2 border-orange-400 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full bg-orange-500/20 border border-orange-400/40 text-orange-300 text-xs font-bold font-cinzel flex items-center gap-1.5 w-fit">
              <Dog className="w-3.5 h-3.5 text-orange-400" />
              <span>Animal Welfare Board of India (AWBI) • SPCA Rapid Rescue Emergency</span>
            </span>
            <h2 className="text-xl md:text-2xl font-black font-cinzel text-white flex items-center space-x-2">
              <span>Animal Welfare & Emergency Rescue Directorate</span>
              <span className="text-2xl">🐕</span>
            </h2>
            <p className="text-xs text-orange-200/90 font-medium">
              24x7 Animal Ambulance dispatch, PCA anti-cruelty enforcement, missing pet reunification & veterinary trauma triage.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="tel:1962"
              className="px-4 py-2.5 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-lg flex items-center space-x-2 border border-orange-300 animate-pulse"
            >
              <Phone className="w-4 h-4" />
              <span>1962 Animal Ambulance Toll-Free</span>
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
          <div className="flex items-center space-x-2 text-orange-200">
            <Stethoscope className="w-4 h-4 text-orange-400 shrink-0" />
            <span>Mobile Vet Ambulance On-Duty 24x7</span>
          </div>
          <div className="flex items-center space-x-2 text-amber-200">
            <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
            <span>PCA Anti-Cruelty Police Liaison Active</span>
          </div>
          <div className="flex items-center space-x-2 text-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>1-Hour Emergency Life-Saving Rescue SLA</span>
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
              Select Animal Rescue Service ({ANIMAL_WELFARE_SUBCATEGORIES.length} Modules)
            </h3>
            <span className="text-[11px] font-bold text-orange-900">Tap to launch specialized form</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {ANIMAL_WELFARE_SUBCATEGORIES.map((subcat) => (
              <button
                key={subcat.id}
                type="button"
                onClick={() => {
                  setSelectedSubcategory(subcat.id);
                  if (speakText) speakText(`Selected ${subcat.name}`);
                }}
                className={`p-3 rounded-2xl border-2 text-left transition-all flex flex-col justify-between space-y-2 ${
                  selectedSubcategory === subcat.id
                    ? 'border-orange-600 bg-orange-50 shadow-md ring-2 ring-orange-300'
                    : 'border-amber-200 bg-white hover:border-amber-400 hover:bg-amber-50/50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-xl p-1.5 rounded-xl bg-orange-100 border border-orange-300 shrink-0">{subcat.icon}</span>
                  <span className="text-xs font-black text-slate-950 line-clamp-2">{subcat.name}</span>
                </div>
                <p className="text-[10px] text-slate-600 font-medium line-clamp-2">{subcat.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3. DYNAMIC TARGETED FORM */}
      <div className="ethnic-card p-6 rounded-3xl shadow-xl gold-glow border-2 border-orange-400 space-y-6">
        
        {/* Active Module Header */}
        <div className="p-4 bg-orange-50 rounded-2xl border border-orange-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <span className="text-3xl p-2 rounded-2xl bg-white shadow border border-orange-300">{selectedSubcatObj.icon}</span>
            <div>
              <h4 className="text-sm font-black text-orange-950">{selectedSubcatObj.name}</h4>
              <p className="text-xs text-orange-800 font-medium">{selectedSubcatObj.desc}</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-orange-200 text-orange-950 font-bold text-xs border border-orange-400 self-start sm:self-auto">
            {selectedSubcategory.includes('injured') || selectedSubcategory.includes('abuse') || selectedSubcategory.includes('vet') ? '🚨 1h Rapid Rescue SLA' : '24h SPCA SLA'}
          </span>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-5 text-xs">

          {/* Module 1: Injured Animal Reporting */}
          {selectedSubcategory === 'animal_injured_reporting' && (
            <div className="space-y-4">
              <div className="p-3 bg-red-50 rounded-2xl border border-red-300 text-red-950 font-bold flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Stethoscope className="w-5 h-5 text-red-600 animate-pulse" />
                  <span>Rapid Veterinary Trauma Dispatch: Direct alert to Nearest Mobile Veterinary Ambulance.</span>
                </div>
                <span className="bg-red-600 text-white px-2.5 py-1 rounded-xl text-[11px]">Emergency Ambulance Alert</span>
              </div>
              <div className="space-y-1">
                <label className="font-bold text-amber-950">Animal Condition & Injury Details *</label>
                <textarea
                  rows={2}
                  value={formData.injury_condition}
                  onChange={(e) => handleChange('injury_condition', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                />
              </div>
            </div>
          )}

          {/* Module 2: Delay in Rescuing Animals */}
          {selectedSubcategory === 'animal_rescue_delay' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Date/Time of Previous Rescue Request *</label>
                  <input
                    type="text"
                    value={formData.delay_prev_request_time}
                    onChange={(e) => handleChange('delay_prev_request_time', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Rescue Organization Contacted (if any)</label>
                  <input
                    type="text"
                    value={formData.delay_org_contacted}
                    onChange={(e) => handleChange('delay_org_contacted', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="font-bold text-amber-950">Current Status of Animal & Delay Details *</label>
                <input
                  type="text"
                  value={formData.delay_current_status}
                  onChange={(e) => handleChange('delay_current_status', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                />
              </div>
            </div>
          )}

          {/* Module 3: Nearby Rescue Organizations */}
          {selectedSubcategory === 'animal_nearby_orgs' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Type of Help Required *</label>
                  <input
                    type="text"
                    value={formData.nearby_help_type}
                    onChange={(e) => handleChange('nearby_help_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Preferred Area / Distance</label>
                  <input
                    type="text"
                    value={formData.nearby_preferred_radius}
                    onChange={(e) => handleChange('nearby_preferred_radius', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 4: Missing Pet Reporting */}
          {selectedSubcategory === 'animal_missing_pet' && (
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-300 text-amber-950 font-bold flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Search className="w-5 h-5 text-amber-700" />
                  <span>AI Lost Pet Broadcast: Instant alert sent to registered local pet owners and clinic networks.</span>
                </div>
                <span className="bg-amber-700 text-white px-2.5 py-1 rounded-xl text-[11px]">Community Broadcast</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Pet Name *</label>
                  <input
                    type="text"
                    value={formData.pet_name}
                    onChange={(e) => handleChange('pet_name', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Breed *</label>
                  <input
                    type="text"
                    value={formData.pet_breed}
                    onChange={(e) => handleChange('pet_breed', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Gender *</label>
                  <select
                    value={formData.pet_gender}
                    onChange={(e) => handleChange('pet_gender', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Age (Pet) *</label>
                  <input
                    type="text"
                    value={formData.pet_age}
                    onChange={(e) => handleChange('pet_age', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Colour & Identification Marks *</label>
                  <input
                    type="text"
                    value={formData.pet_color_marks}
                    onChange={(e) => handleChange('pet_color_marks', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Last Seen Location & Date/Time *</label>
                  <input
                    type="text"
                    value={`${formData.pet_last_seen} (${formData.pet_date_missing})`}
                    onChange={(e) => handleChange('pet_last_seen', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 5: Animal Adoption */}
          {selectedSubcategory === 'animal_adoption_awareness' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Animal Preference *</label>
                  <input
                    type="text"
                    value={formData.adopt_pref_type}
                    onChange={(e) => handleChange('adopt_pref_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Preferred Age of Animal *</label>
                  <input
                    type="text"
                    value={formData.adopt_pref_age}
                    onChange={(e) => handleChange('adopt_pref_age', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Previous Pet Ownership Experience *</label>
                  <input
                    type="text"
                    value={formData.adopt_experience}
                    onChange={(e) => handleChange('adopt_experience', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 6: Abandonment of Pets */}
          {selectedSubcategory === 'animal_abandonment' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Condition of Abandoned Animal *</label>
                  <input
                    type="text"
                    value={formData.abandon_condition}
                    onChange={(e) => handleChange('abandon_condition', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Suspected Owner Details (if known)</label>
                  <input
                    type="text"
                    value={formData.abandon_suspected_owner}
                    onChange={(e) => handleChange('abandon_suspected_owner', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 7: Animal Shelters */}
          {selectedSubcategory === 'animal_shelter_info' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Reason for Searching for Shelter *</label>
                  <input
                    type="text"
                    value={formData.shelter_reason}
                    onChange={(e) => handleChange('shelter_reason', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Required Shelter Duration *</label>
                  <input
                    type="text"
                    value={formData.shelter_duration}
                    onChange={(e) => handleChange('shelter_duration', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 8: Emergency Veterinary Help */}
          {selectedSubcategory === 'animal_emergency_vet' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Medical Emergency Description *</label>
                  <input
                    type="text"
                    value={formData.vet_emergency_desc}
                    onChange={(e) => handleChange('vet_emergency_desc', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Transportation Available? *</label>
                  <select
                    value={formData.vet_transport_available}
                    onChange={(e) => handleChange('vet_transport_available', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option>No (Emergency Mobile Vet Van Needed)</option>
                    <option>Yes (Can transport to veterinary clinic)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Module 9: Food and Water Support */}
          {selectedSubcategory === 'animal_food_water_support' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Type of Support Needed *</label>
                  <select
                    value={formData.food_support_type}
                    onChange={(e) => handleChange('food_support_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option>Both Food and Clean Water Pots</option>
                    <option>Food Support (Daily Stray Feeding)</option>
                    <option>Water Trough Installation (Summer Hydration)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Approximate Number of Animals *</label>
                  <input
                    type="text"
                    value={formData.food_animals_count}
                    onChange={(e) => handleChange('food_animals_count', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 10: Animal Abuse & Cruelty (PCA Act) */}
          {selectedSubcategory === 'animal_abuse_cruelty' && (
            <div className="space-y-4">
              <div className="p-3 bg-red-50 rounded-2xl border border-red-300 text-red-950 font-bold flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShieldAlert className="w-5 h-5 text-red-600" />
                  <span>PCA Act Statutory Offence: Direct prosecution via Animal Welfare Board and Local Police Thana.</span>
                </div>
                <span className="bg-red-600 text-white px-2.5 py-1 rounded-xl text-[11px]">Anti-Cruelty FIR Registry</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Type of Abuse / Cruelty *</label>
                  <input
                    type="text"
                    value={formData.abuse_type}
                    onChange={(e) => handleChange('abuse_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Person / Entity Responsible (if known)</label>
                  <input
                    type="text"
                    value={formData.abuse_person_responsible}
                    onChange={(e) => handleChange('abuse_person_responsible', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 11: Rescuer & Volunteer Coordination */}
          {selectedSubcategory === 'animal_volunteer_coordination' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Your Volunteer Role *</label>
                  <select
                    value={formData.volunteer_role}
                    onChange={(e) => handleChange('volunteer_role', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option>Volunteer / Community Feeder</option>
                    <option>Active Animal Rescuer</option>
                    <option>NGO / Shelter Representative</option>
                    <option>Veterinarian / Para-Vet</option>
                    <option>Foster Care Provider</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Area / Ward Covered *</label>
                  <input
                    type="text"
                    value={formData.volunteer_area}
                    onChange={(e) => handleChange('volunteer_area', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Availability & Skills *</label>
                  <input
                    type="text"
                    value={formData.volunteer_availability}
                    onChange={(e) => handleChange('volunteer_availability', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 12: Animal Vaccination & Sterilization */}
          {selectedSubcategory === 'animal_vaccine_sterilization' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Type of Information / Help Needed *</label>
                  <select
                    value={formData.vax_help_needed}
                    onChange={(e) => handleChange('vax_help_needed', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option>Both Anti-Rabies Vaccine + Animal Birth Control (ABC) Surgery</option>
                    <option>Anti-Rabies Vaccination Drive (ARV)</option>
                    <option>Animal Birth Control (ABC) Sterilization Catch & Release</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Approximate Number of Animals *</label>
                  <input
                    type="text"
                    value={formData.vax_animal_count}
                    onChange={(e) => handleChange('vax_animal_count', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 13: Finding Shelter for a Found Animal or Pet */}
          {selectedSubcategory === 'animal_shelter_found_pet' && (
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-300 text-amber-950 font-bold flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Home className="w-5 h-5 text-orange-600" />
                  <span>Found Pet Triage: Matches against missing pet alerts and arranges temporary foster placement.</span>
                </div>
                <span className="bg-orange-700 text-white px-2.5 py-1 rounded-xl text-[11px]">Found Pet Placement</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Breed (if known)</label>
                  <input
                    type="text"
                    value={formData.found_breed}
                    onChange={(e) => handleChange('found_breed', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Animal Age (approx) *</label>
                  <input
                    type="text"
                    value={formData.found_age}
                    onChange={(e) => handleChange('found_age', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Gender *</label>
                  <select
                    value={formData.found_gender}
                    onChange={(e) => handleChange('found_gender', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Unknown</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Animal Health Condition *</label>
                  <select
                    value={formData.found_condition}
                    onChange={(e) => handleChange('found_condition', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option value="Healthy">Healthy</option>
                    <option value="Injured">Injured</option>
                    <option value="Sick">Sick</option>
                    <option value="Abandoned">Abandoned</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Is Temporary Care Available? *</label>
                  <select
                    value={formData.found_temp_care_available}
                    onChange={(e) => handleChange('found_temp_care_available', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option value="Yes">Yes (I can keep the animal temporarily)</option>
                    <option value="No">No (Need immediate rescue pickup)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">How Long Can You Keep the Animal?</label>
                  <input
                    type="text"
                    value={formData.found_how_long_keep}
                    onChange={(e) => handleChange('found_how_long_keep', e.target.value)}
                    placeholder="E.g. 2 days, 1 week"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* COMMON REPORTER & LOCATION DETAILS SECTION (Universal to all 13 Animal Modules) */}
          <div className="p-4 bg-orange-50/70 rounded-2xl border border-orange-300 space-y-4">
            <h5 className="font-black text-orange-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-orange-700" />
              <span>Reporter Contact & Location Coordinates</span>
            </h5>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-amber-950">Reporter Name *</label>
                <input
                  type="text"
                  value={formData.reporter_name}
                  onChange={(e) => handleChange('reporter_name', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs text-slate-800"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-amber-950">Mobile Number *</label>
                <input
                  type="text"
                  value={formData.reporter_mobile}
                  onChange={(e) => handleChange('reporter_mobile', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs text-slate-800"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-amber-950">Animal Type *</label>
                <select
                  value={formData.animal_type}
                  onChange={(e) => handleChange('animal_type', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs font-bold text-slate-800"
                >
                  <option>Stray Dog (Canine)</option>
                  <option>Cat / Kitten (Feline)</option>
                  <option>Cattle / Cow / Calf (Bovine)</option>
                  <option>Bird / Pigeon / Eagle (Avian)</option>
                  <option>Horse / Donkey / Mule</option>
                  <option>Wild / Exotic Animal</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-amber-950">Exact Location / Landmark *</label>
                <input
                  type="text"
                  value={formData.exact_location}
                  onChange={(e) => handleChange('exact_location', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs text-slate-800"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-amber-950">GPS Coordinates</label>
                <input
                  type="text"
                  value={formData.gps_location}
                  readOnly
                  className="w-full bg-orange-100 border border-orange-300 rounded-xl p-2 text-xs text-orange-950 font-bold"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-amber-950">Urgency Level *</label>
                <select
                  value={formData.urgency_level}
                  onChange={(e) => handleChange('urgency_level', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs font-bold text-slate-800"
                >
                  <option value="Emergency">Emergency (Immediate Life Risk / Bleeding)</option>
                  <option value="High">High (Needs rescue today)</option>
                  <option value="Medium">Medium (Within 24 hours)</option>
                  <option value="Low">Low (General inquiry / Adoption)</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-amber-950">Additional Description & Physical Landmarks</label>
              <textarea
                rows={2}
                value={formData.additional_notes}
                onChange={(e) => handleChange('additional_notes', e.target.value)}
                placeholder="Mention where the animal is hiding, aggression status, nearby water sources..."
                className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs text-slate-800 font-medium"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-700 text-white font-bold text-xs rounded-xl shadow-lg hover:opacity-95 flex items-center justify-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>Dispatch Animal Rescue & Veterinary Ambulance</span>
          </button>
        </form>
      </div>
    </div>
  );
}
