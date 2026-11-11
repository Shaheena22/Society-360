import React, { useState } from 'react';
import {
  Trees, Phone, AlertTriangle, CheckCircle2, ShieldCheck,
  Flame, MapPin, ArrowLeft, Send, Sparkles, AlertOctagon,
  Wind, Droplets, Volume2, Factory, Shovel, ShieldAlert
} from 'lucide-react';

export const ENVIRONMENT_SUBCATEGORIES = [
  { id: 'env_illegal_tree_cutting', name: '1. Illegal Tree Cutting', icon: '🪓', desc: 'Unauthorized felling of heritage trees, green avenue destruction & timber theft' },
  { id: 'env_deforestation_reporting', name: '2. Deforestation Reporting', icon: '🌲', desc: 'Forest land encroachment, mass tree clearance & reserved forest habitat destruction' },
  { id: 'env_air_pollution', name: '3. Air Pollution', icon: '💨', desc: 'Toxic chimney emissions, construction dust, high AQI smog & vehicular smoke' },
  { id: 'env_water_pollution', name: '4. Water Pollution', icon: '🌊', desc: 'Sewage/industrial effluent mixing in lakes, rivers, open wells & toxic froth' },
  { id: 'env_noise_pollution', name: '5. Noise Pollution', icon: '📢', desc: 'Loudspeakers beyond 10 PM, high decibel generators & industrial hammering in silent zones' },
  { id: 'env_illegal_mining', name: '6. Illegal Mining & Quarrying', icon: '⛏️', desc: 'Illegal sand mining from river beds, stone quarry blasting & hillock destruction' },
  { id: 'env_industrial_pollution', name: '7. Industrial Pollution', icon: '🏭', desc: 'Chemical leakage, hazardous solid waste dumping, black boiler smoke & fly ash' },
  { id: 'env_burning_waste', name: '8. Burning of Waste', icon: '🔥', desc: 'Open garbage burning, plastic/tyre combustion & toxic leaf burning in residential colonies' },
  { id: 'env_loss_green_space', name: '9. Loss of Green Space', icon: '🌱', desc: 'Public park land conversion, commercial encroachment & garden green cover destruction' },
  { id: 'env_wildlife_animal_welfare', name: '10. Wildlife / Forest Animal Welfare', icon: '🐾', desc: 'Wild animals entering city fringes, injured peacocks/deer & poaching traps' }
];

export default function EnvironmentDashboard({ speakText, currentUser, initialFeatureModule, onBack, hideOtherModules = true }) {
  const [selectedSubcategory, setSelectedSubcategory] = useState(
    initialFeatureModule || 'env_illegal_tree_cutting'
  );

  React.useEffect(() => {
    if (initialFeatureModule) {
      setSelectedSubcategory(initialFeatureModule);
    }
  }, [initialFeatureModule]);

  const [submittedMsg, setSubmittedMsg] = useState(null);

  // Form State for all 10 Environment Modules
  const [formData, setFormData] = useState({
    // Common Details
    user_name: currentUser?.name || 'Pooja Patil',
    user_mobile: currentUser?.phone || '+91 98453 22019',
    user_location: 'Sedam Road, Near University Campus, Kalaburagi',
    gps_location: '17.3350° N, 76.8410° E',
    urgency_level: 'High',
    incident_desc: '',
    photo_file: null,

    // 1. Illegal Tree Cutting
    tree_type: 'Mature Neem & Gulmohar (Over 30 years old)',
    tree_cutting_details: 'Unpermitted felling with chainsaws on public road avenue for commercial hoarding',

    // 2. Deforestation
    forest_area_details: 'Reserved Forest Fringe, Kusnoor Hills Area',
    forest_damage_desc: 'Clearance of 2 acres of scrub forest using earthmovers without Forest Department clearance',

    // 3. Air Pollution
    air_pollution_source: 'Stone Crusher Unit / Cement Boiler Chimney',
    air_pollution_type: 'Thick White Silica Dust & Smog engulfing residential school area',

    // 4. Water Pollution
    water_source: 'Bennethora River / Sharana Basaveshwara Lake',
    water_problem_type: 'Chemical Pollution & Sewage Mixing with Bad Smell and Fish Mortality',
    water_contamination_details: 'Direct discharge of untreated dyeing unit effluent into public lake',

    // 5. Noise Pollution
    noise_source: 'High-Decibel Commercial Loudspeakers & Diesel Generators after 11 PM',
    noise_time: '23:30 PM (Continuous for 4 hours violating Silent Zone rules)',

    // 6. Illegal Mining
    mining_location: 'Kagna River Bed, Sedam Taluk',
    mining_activity_details: 'Illegal mechanized sand extraction using heavy excavators and 10 tippers without permit',

    // 7. Industrial Pollution
    industry_name: 'Maruti Chemicals & Agro Chemical Processing Plant',
    industry_pollution_type: 'Chemical Pollution, Hazardous Waste Dumping, Smoke / Dust Pollution',
    industry_waste_details: 'Acidic sludge dumped openly near irrigation canal with pungent sulfur gas emissions',

    // 8. Burning of Waste
    waste_burning_location: 'Vacant Plot behind City Market, Ward 12',
    waste_burning_type: 'Plastic Waste, Rubber / Tyre Waste, Dry Leaves / Garden Waste',
    waste_burning_duration: 'Over 3 hours continuous toxic black smoke',

    // 9. Loss of Green Space
    green_space_type: 'Public Park / Municipal Garden',
    green_problem_details: 'Land Conversion / Illegal Commercial Building Construction inside public children park',

    // 10. Wildlife Welfare
    wildlife_location: 'Outskirts of Kalaburagi City, near ring road forest buffer',
    wildlife_animal_type: 'Spotted Deer / Blackbuck herd with 1 injured calf',
    wildlife_problem_details: 'Stray dog pack attack and vehicle impact on injured forest calf'
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const subcatObj = ENVIRONMENT_SUBCATEGORIES.find(s => s.id === selectedSubcategory);
    const ticketId = `ENV-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const msg = `Complaint logged under [${subcatObj?.name}]. Ticket ID: ${ticketId}. Auto-routed to Karnataka State Pollution Control Board (KSPCB), Forest Department & Tree Authority Cell.`;
    setSubmittedMsg(msg);

    if (speakText) {
      speakText(`Environment complaint submitted. Ticket number ${ticketId}. Pollution Control Board notified.`);
    }
  };

  const selectedSubcatObj = ENVIRONMENT_SUBCATEGORIES.find(s => s.id === selectedSubcategory) || ENVIRONMENT_SUBCATEGORIES[0];

  return (
    <div className="space-y-6 font-outfit">
      
      {/* 1. TOP ENVIRONMENT BANNER */}
      <div className="ethnic-card p-6 rounded-3xl bg-gradient-to-r from-slate-950 via-emerald-950 to-green-950 text-white border-2 border-emerald-400 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold font-cinzel flex items-center gap-1.5 w-fit">
              <Trees className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ministry of Environment, Forest & Climate Change (MoEFCC) • KSPCB Cell</span>
            </span>
            <h2 className="text-xl md:text-2xl font-black font-cinzel text-white flex items-center space-x-2">
              <span>Environment & Forest Protection Cell</span>
              <span className="text-2xl">🌿</span>
            </h2>
            <p className="text-xs text-emerald-200/90 font-medium">
              Illegal tree felling enforcement, KSPCB air/water pollution action, anti-waste burning & wildlife habitat protection.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="tel:1926"
              className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-lg flex items-center space-x-2 border border-emerald-300"
            >
              <Phone className="w-4 h-4" />
              <span>1926 Forest Emergency Help</span>
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
            <Trees className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Tree Preservation Act & Tree Officer Inspection Squad Active</span>
          </div>
          <div className="flex items-center space-x-2 text-green-200">
            <Wind className="w-4 h-4 text-green-400 shrink-0" />
            <span>KSPCB Industrial Air & Water Quality Monitor Online</span>
          </div>
          <div className="flex items-center space-x-2 text-teal-200">
            <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
            <span>Anti-Waste Burning NGT Penalty Enforcement Enabled</span>
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
              Select Environment Offence ({ENVIRONMENT_SUBCATEGORIES.length} Modules)
            </h3>
            <span className="text-[11px] font-bold text-emerald-900">Tap to launch specialized form</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {ENVIRONMENT_SUBCATEGORIES.map((subcat) => (
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
            KSPCB / Forest 24h SLA
          </span>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-5 text-xs">

          {/* Module 1: Illegal Tree Cutting */}
          {selectedSubcategory === 'env_illegal_tree_cutting' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Tree Species / Type *</label>
                  <input
                    type="text"
                    value={formData.tree_type}
                    onChange={(e) => handleChange('tree_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Cutting Details & Ongoing Action *</label>
                  <input
                    type="text"
                    value={formData.tree_cutting_details}
                    onChange={(e) => handleChange('tree_cutting_details', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 2: Deforestation Reporting */}
          {selectedSubcategory === 'env_deforestation_reporting' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Forest Area Details *</label>
                  <input
                    type="text"
                    value={formData.forest_area_details}
                    onChange={(e) => handleChange('forest_area_details', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Damage Description *</label>
                  <input
                    type="text"
                    value={formData.forest_damage_desc}
                    onChange={(e) => handleChange('forest_damage_desc', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 3: Air Pollution */}
          {selectedSubcategory === 'env_air_pollution' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Pollution Source *</label>
                  <input
                    type="text"
                    value={formData.air_pollution_source}
                    onChange={(e) => handleChange('air_pollution_source', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Pollution Type *</label>
                  <input
                    type="text"
                    value={formData.air_pollution_type}
                    onChange={(e) => handleChange('air_pollution_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 4: Water Pollution */}
          {selectedSubcategory === 'env_water_pollution' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Water Body / Source *</label>
                  <input
                    type="text"
                    value={formData.water_source}
                    onChange={(e) => handleChange('water_source', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Problem Type *</label>
                  <select
                    value={formData.water_problem_type}
                    onChange={(e) => handleChange('water_problem_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option>Dirty / Contaminated Water</option>
                    <option>Sewage Mixing in Water Body</option>
                    <option>Industrial Waste / Effluent Discharge</option>
                    <option>Chemical Pollution & Bad Smell</option>
                    <option>Garbage / Plastic Dumping</option>
                    <option>Oil / Fuel Leakage</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="font-bold text-amber-950">Contamination Details *</label>
                <input
                  type="text"
                  value={formData.water_contamination_details}
                  onChange={(e) => handleChange('water_contamination_details', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                />
              </div>
            </div>
          )}

          {/* Module 5: Noise Pollution */}
          {selectedSubcategory === 'env_noise_pollution' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Noise Source *</label>
                  <select
                    value={formData.noise_source}
                    onChange={(e) => handleChange('noise_source', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option>Loud Music / DJ System</option>
                    <option>Construction Noise during Night Hours</option>
                    <option>Residential / Commercial Noise</option>
                    <option>Vehicle / Horn Noise</option>
                    <option>Industrial Noise & Hammering</option>
                    <option>Loudspeaker in Silent Zone</option>
                    <option>Generator Noise without Silencer</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Time of Occurrence *</label>
                  <input
                    type="text"
                    value={formData.noise_time}
                    onChange={(e) => handleChange('noise_time', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 6: Illegal Mining */}
          {selectedSubcategory === 'env_illegal_mining' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Mining Location *</label>
                  <input
                    type="text"
                    value={formData.mining_location}
                    onChange={(e) => handleChange('mining_location', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Activity Details *</label>
                  <input
                    type="text"
                    value={formData.mining_activity_details}
                    onChange={(e) => handleChange('mining_activity_details', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 7: Industrial Pollution */}
          {selectedSubcategory === 'env_industrial_pollution' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Industry Name *</label>
                  <input
                    type="text"
                    value={formData.industry_name}
                    onChange={(e) => handleChange('industry_name', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Pollution Type *</label>
                  <input
                    type="text"
                    value={formData.industry_pollution_type}
                    onChange={(e) => handleChange('industry_pollution_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="font-bold text-amber-950">Waste & Emission Details *</label>
                <input
                  type="text"
                  value={formData.industry_waste_details}
                  onChange={(e) => handleChange('industry_waste_details', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                />
              </div>
            </div>
          )}

          {/* Module 8: Burning of Waste */}
          {selectedSubcategory === 'env_burning_waste' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Burning Location *</label>
                  <input
                    type="text"
                    value={formData.waste_burning_location}
                    onChange={(e) => handleChange('waste_burning_location', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Waste Type *</label>
                  <input
                    type="text"
                    value={formData.waste_burning_type}
                    onChange={(e) => handleChange('waste_burning_type', e.target.value)}
                    placeholder="Plastic, Leaves, Tyre, Chemical, Food..."
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Duration of Burning *</label>
                  <input
                    type="text"
                    value={formData.waste_burning_duration}
                    onChange={(e) => handleChange('waste_burning_duration', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 9: Loss of Green Space */}
          {selectedSubcategory === 'env_loss_green_space' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Green Space Type *</label>
                  <select
                    value={formData.green_space_type}
                    onChange={(e) => handleChange('green_space_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option>Public Park / Municipal Garden</option>
                    <option>Urban Green Area / Buffer Belt</option>
                    <option>Forest Area Fringe</option>
                    <option>Lake Bund Greenery</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Problem Details *</label>
                  <input
                    type="text"
                    value={formData.green_problem_details}
                    onChange={(e) => handleChange('green_problem_details', e.target.value)}
                    placeholder="Tree Removal, Land Conversion, Illegal Construction, Green Area Damage"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 10: Wildlife Welfare */}
          {selectedSubcategory === 'env_wildlife_animal_welfare' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Wildlife Species / Animal Type *</label>
                  <input
                    type="text"
                    value={formData.wildlife_animal_type}
                    onChange={(e) => handleChange('wildlife_animal_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Incident / Problem Details *</label>
                  <input
                    type="text"
                    value={formData.wildlife_problem_details}
                    onChange={(e) => handleChange('wildlife_problem_details', e.target.value)}
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
              <span>Location, Photos & Complainant Contact</span>
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
                <label className="font-bold text-amber-950">Incident Location / Landmark *</label>
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
                  <option value="High">High (Immediate Action Required)</option>
                  <option value="Medium">Medium (Within 24 Hours)</option>
                  <option value="Low">Low (General Compliance Inquiry)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-emerald-700 to-green-800 text-white font-bold text-xs rounded-xl shadow-lg hover:opacity-95 flex items-center justify-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>Dispatch Complaint to Pollution Control Board & Forest Cell</span>
          </button>
        </form>
      </div>
    </div>
  );
}
