import React, { useState } from 'react';
import {
  Droplets, Phone, AlertTriangle, CheckCircle2, ShieldCheck,
  MapPin, ArrowLeft, Send, Sparkles, AlertOctagon,
  Waves, Wrench, ShieldAlert, Clock, Gauge, Filter
} from 'lucide-react';

export const WATER_SUBCATEGORIES = [
  { id: 'water_leakage', name: '1. Water Leakage', icon: '💧', desc: 'Main pipeline burst, joint leak, tap leakage or clean water tank overflow' },
  { id: 'water_no_supply', name: '2. No Water Supply', icon: '🚫', desc: 'Complete water supply cut-off, dry taps & irregular municipal water supply' },
  { id: 'water_contaminated', name: '3. Contaminated Water', icon: '🧪', desc: 'Unsafe for drinking, foul smell, discoloration, visible particles or sewage mix' },
  { id: 'water_low_pressure', name: '4. Low Water Pressure', icon: '📉', desc: 'Extremely weak flow, intermittent pressure or no pressure reaching upper floors' },
  { id: 'water_broken_pipeline', name: '5. Broken Water Pipeline', icon: '🔧', desc: 'Cracked, burst or crushed pipeline causing severe road damage & water loss' },
  { id: 'water_illegal_connection', name: '6. Illegal Water Connection', icon: '🔌', desc: 'Unauthorized pipe tap, water theft, bypass connection causing unequal supply' },
  { id: 'water_sewerage_overflow', name: '7. Sewerage Overflow', icon: '🌊', desc: 'Sewage water spilling on road, blocked sewer line & unbearable foul stench' },
  { id: 'water_open_drain', name: '8. Open Drain Hazard', icon: '⚠️', desc: 'Uncovered stormwater / sewage drain posing disease & child falling danger' },
  { id: 'water_drainage_blockage', name: '9. Drainage Blockage', icon: '🚧', desc: 'Garbage, plastic & silt blocking drain causing stagnant water pooling' },
  { id: 'water_rainwater_drainage', name: '10. Rainwater Drainage Problem', icon: '🌧️', desc: 'Monsoon flash flooding, waterlogged streets & blocked house entrances' },
  { id: 'water_public_drinking', name: '11. Public Drinking Water Facility', icon: '🚰', desc: 'Broken RO water plant, damaged public water booth or dry drinking tap' }
];

export default function WaterCleanlinessDashboard({ speakText, currentUser, initialFeatureModule, onBack, hideOtherModules = true }) {
  const [selectedSubcategory, setSelectedSubcategory] = useState(
    initialFeatureModule || 'water_leakage'
  );

  React.useEffect(() => {
    if (initialFeatureModule) {
      setSelectedSubcategory(initialFeatureModule);
    }
  }, [initialFeatureModule]);

  const [submittedMsg, setSubmittedMsg] = useState(null);

  // Form State for all 11 Water Modules
  const [formData, setFormData] = useState({
    // Common details
    user_name: currentUser?.name || 'Anita Deshmukh',
    user_mobile: currentUser?.phone || '+91 98450 44551',
    user_address: 'Sedam Road, Ward 12, Kalaburagi',
    gps_location: '17.3310° N, 76.8390° E',
    urgency_level: 'High',
    incident_desc: '',
    photo_file: null,

    // 1. Water Leakage
    leak_location: 'Near Water Tank Main Road, Ward 12',
    leak_source: 'Water Pipeline',
    leak_type: 'Pipe Burst / Joint Leakage',
    leak_severity: 'High',
    leak_duration: '3 Days continuous clean water flooding road',

    // 2. No Water Supply
    nosupply_area_type: 'Residential Area',
    nosupply_problem: 'No Water Supply (Complete Dry Taps for 48h)',
    nosupply_last_water_time: '2026-08-23 06:00 AM',
    nosupply_affected_people: 'Approx 150 Households',

    // 3. Contaminated Water
    contam_problem_type: 'Unsafe for Drinking, Bad Smell, Discoloration',
    contam_source: 'Pipeline Water (Municipal Tap)',
    contam_start_date: '2026-08-24',

    // 4. Low Water Pressure
    pressure_timing: 'Morning Supply Hours (06:00 - 08:00 AM)',
    pressure_affected_area: 'Entire 4th Cross Lane',
    pressure_water_source: 'Public Water Supply Tap',
    pressure_level: 'Very Low (Intermittent trickle)',
    pressure_duration: '3–7 Days',

    // 5. Broken Water Pipeline
    pipe_location: 'Under main road asphalt near City Hospital Gate',
    pipe_type: 'Main Water Pipeline (150mm DI Pipe)',
    pipe_damage_type: 'Pipe Burst & Road Damage Around Pipeline',
    pipe_severity: 'Critical',

    // 6. Illegal Water Connection
    illegal_connection_type: 'Unauthorized Pipe Connection & Bypass Connection',
    illegal_conn_pipe_type: 'Main Water Pipeline',
    illegal_supply_impact: 'Low Water Pressure & Unequal Water Distribution',
    illegal_is_anonymous: 'Yes',

    // 7. Sewerage Overflow
    sewer_location: 'Opposite Community Hall, Ward 12',
    sewer_overflow_type: 'Manhole Overflow & Blocked Sewer Pipe',
    sewer_type: 'Sewage Water on Road & Dirty Water Accumulation',
    sewer_health_impact: 'Bad Smell, Mosquitoes / Insects, Risk of Disease',
    sewer_smell_intensity: 'Strong / Very Strong',
    sewer_duration: '4 Days overflowing',

    // 8. Open Drain
    opendrain_location: 'Beside Primary School Footpath',
    opendrain_type: 'Open Channel Drain / Stormwater Drain',
    opendrain_safety_risk: 'Bad Smell, Mosquitoes, Risk to Children & Accident Risk',
    opendrain_desc: 'Deep uncovered concrete drain with broken slabs where children walk',

    // 9. Drainage Blockage
    drainblock_location: 'Corner of Vegetable Market Cross',
    drainblock_type: 'Blocked Drain & Water Stagnation',
    drainblock_cause: 'Garbage, Plastic Waste & Construction Material',
    drainblock_overflow_status: 'Water Overflow & Sewage Stagnation',

    // 10. Rainwater Drainage Problem
    rainwater_flood_area: 'Residential Area Flooding & Road Waterlogging',
    rainwater_property_impact: 'House Entrance Blocked & Road Waterlogging',
    rainwater_accumulation_level: 'High (1.5 feet stagnant water)',
    rainwater_duration: '24 Hours after rain',
    rainwater_road_condition: 'Completely submerged with blocked culverts',

    // 11. Public Drinking Water Facility
    pubwater_location: 'Central Bus Stand Platform 3 Water Booth',
    pubwater_facility_type: 'RO Water Facility / Drinking Water Tap',
    pubwater_problem_type: 'No Water, Broken Tap & Water Leakage',
    pubwater_facility_condition: 'Damaged & Not Usable',
    pubwater_datetime: new Date().toISOString().slice(0, 16)
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const subcatObj = WATER_SUBCATEGORIES.find(s => s.id === selectedSubcategory);
    const ticketId = `WTR-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const msg = `Water grievance registered under [${subcatObj?.name}]. Ticket ID: ${ticketId}. Auto-routed to KUWSDB (Karnataka Urban Water Supply & Drainage Board) Quick Response Maintenance Van.`;
    setSubmittedMsg(msg);

    if (speakText) {
      speakText(`Water complaint submitted. Ticket number ${ticketId}. Water Board technical squad dispatched.`);
    }
  };

  const selectedSubcatObj = WATER_SUBCATEGORIES.find(s => s.id === selectedSubcategory) || WATER_SUBCATEGORIES[0];

  return (
    <div className="space-y-6 font-outfit">
      
      {/* 1. TOP WATER & SANITATION BANNER */}
      <div className="ethnic-card p-6 rounded-3xl bg-gradient-to-r from-slate-950 via-cyan-950 to-blue-950 text-white border-2 border-cyan-400 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-bold font-cinzel flex items-center gap-1.5 w-fit">
              <Waves className="w-3.5 h-3.5 text-cyan-400" />
              <span>KUWSDB • Jal Jeevan Mission • City Water Supply & Sewerage Board</span>
            </span>
            <h2 className="text-xl md:text-2xl font-black font-cinzel text-white flex items-center space-x-2">
              <span>Water Supply & Sanitation Directorate</span>
              <span className="text-2xl">💧</span>
            </h2>
            <p className="text-xs text-cyan-200/90 font-medium">
              Pipeline burst repair, safe drinking water monitoring, sewer overflow triage & public drinking booth maintenance.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="tel:1916"
              className="px-4 py-2.5 rounded-2xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold shadow-lg flex items-center space-x-2 border border-cyan-300 animate-pulse"
            >
              <Phone className="w-4 h-4" />
              <span>1916 Water Board 24x7</span>
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
          <div className="flex items-center space-x-2 text-cyan-200">
            <Wrench className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Emergency Jetting Machine & Pipeline Gang Standby</span>
          </div>
          <div className="flex items-center space-x-2 text-blue-200">
            <Filter className="w-4 h-4 text-blue-400 shrink-0" />
            <span>Daily Water Quality Lab Testing Active</span>
          </div>
          <div className="flex items-center space-x-2 text-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>4-Hour Severe Sewer Overflow SLA</span>
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
              Select Water Defect ({WATER_SUBCATEGORIES.length} Modules)
            </h3>
            <span className="text-[11px] font-bold text-cyan-900">Tap to launch specialized form</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {WATER_SUBCATEGORIES.map((subcat) => (
              <button
                key={subcat.id}
                type="button"
                onClick={() => {
                  setSelectedSubcategory(subcat.id);
                  if (speakText) speakText(`Selected ${subcat.name}`);
                }}
                className={`p-3 rounded-2xl border-2 text-left transition-all flex flex-col justify-between space-y-2 ${
                  selectedSubcategory === subcat.id
                    ? 'border-cyan-600 bg-cyan-50 shadow-md ring-2 ring-cyan-300'
                    : 'border-amber-200 bg-white hover:border-amber-400 hover:bg-amber-50/50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-xl p-1.5 rounded-xl bg-cyan-100 border border-cyan-300 shrink-0">{subcat.icon}</span>
                  <span className="text-xs font-black text-slate-950 line-clamp-2">{subcat.name}</span>
                </div>
                <p className="text-[10px] text-slate-600 font-medium line-clamp-2">{subcat.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3. DYNAMIC TARGETED FORM */}
      <div className="ethnic-card p-6 rounded-3xl shadow-xl gold-glow border-2 border-cyan-400 space-y-6">
        
        {/* Active Module Header */}
        <div className="p-4 bg-cyan-50 rounded-2xl border border-cyan-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <span className="text-3xl p-2 rounded-2xl bg-white shadow border border-cyan-300">{selectedSubcatObj.icon}</span>
            <div>
              <h4 className="text-sm font-black text-cyan-950">{selectedSubcatObj.name}</h4>
              <p className="text-xs text-cyan-800 font-medium">{selectedSubcatObj.desc}</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-cyan-200 text-cyan-950 font-bold text-xs border border-cyan-400 self-start sm:self-auto">
            {selectedSubcategory.includes('sewerage') || selectedSubcategory.includes('broken') ? '🚨 4h Emergency Leakage SLA' : '24h Water Board SLA'}
          </span>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-5 text-xs">

          {/* Module 1: Water Leakage */}
          {selectedSubcategory === 'water_leakage' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Leakage Location *</label>
                  <input
                    type="text"
                    value={formData.leak_location}
                    onChange={(e) => handleChange('leak_location', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Water Source *</label>
                  <select
                    value={formData.leak_source}
                    onChange={(e) => handleChange('leak_source', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option>Water Pipeline</option>
                    <option>Public Water Supply Tap</option>
                    <option>Underground Pipeline</option>
                    <option>Water Tank</option>
                    <option>Tap / Connection</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Leakage Type *</label>
                  <select
                    value={formData.leak_type}
                    onChange={(e) => handleChange('leak_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option>Pipe Leakage</option>
                    <option>Broken Pipe / Burst</option>
                    <option>Joint Leakage</option>
                    <option>Tap Leakage</option>
                    <option>Tank Overflow</option>
                    <option>Unknown</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Leakage Severity *</label>
                  <select
                    value={formData.leak_severity}
                    onChange={(e) => handleChange('leak_severity', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Critical</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Duration *</label>
                  <input
                    type="text"
                    value={formData.leak_duration}
                    onChange={(e) => handleChange('leak_duration', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 2: No Water Supply */}
          {selectedSubcategory === 'water_no_supply' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Area Type *</label>
                  <select
                    value={formData.nosupply_area_type}
                    onChange={(e) => handleChange('nosupply_area_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option>Residential Area</option>
                    <option>Commercial Area</option>
                    <option>School / College Area</option>
                    <option>Hospital Area</option>
                    <option>Slum / Low-Income Area</option>
                    <option>Rural / Village Area</option>
                    <option>Urban Area</option>
                    <option>Industrial Area</option>
                    <option>Government / Public Area</option>
                    <option>Roadside Area</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Supply Problem *</label>
                  <select
                    value={formData.nosupply_problem}
                    onChange={(e) => handleChange('nosupply_problem', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option>No Water Supply</option>
                    <option>Low Water Pressure</option>
                    <option>Irregular Water Supply</option>
                    <option>Pipeline Problem</option>
                    <option>Water Tank Problem</option>
                    <option>Supply Cut-Off</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Last Water Received Date/Time *</label>
                  <input
                    type="text"
                    value={formData.nosupply_last_water_time}
                    onChange={(e) => handleChange('nosupply_last_water_time', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="font-bold text-amber-950">Affected People / Households *</label>
                <input
                  type="text"
                  value={formData.nosupply_affected_people}
                  onChange={(e) => handleChange('nosupply_affected_people', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                />
              </div>
            </div>
          )}

          {/* Module 3: Contaminated Water */}
          {selectedSubcategory === 'water_contaminated' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Water Problem Type *</label>
                  <select
                    value={formData.contam_problem_type}
                    onChange={(e) => handleChange('contam_problem_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option>Unsafe for Drinking</option>
                    <option>Bad Taste</option>
                    <option>Bad Smell</option>
                    <option>Discoloration / Muddy Water</option>
                    <option>Visible Particles / Worms</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Water Source *</label>
                  <select
                    value={formData.contam_source}
                    onChange={(e) => handleChange('contam_source', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option>Tap Water (Municipal)</option>
                    <option>Pipeline Water</option>
                    <option>Borewell</option>
                    <option>Well</option>
                    <option>River / Lake / Pond</option>
                    <option>Water Tank</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Start Date of Contamination *</label>
                  <input
                    type="date"
                    value={formData.contam_start_date}
                    onChange={(e) => handleChange('contam_start_date', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 4: Low Water Pressure */}
          {selectedSubcategory === 'water_low_pressure' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Supply Timing *</label>
                  <input
                    type="text"
                    value={formData.pressure_timing}
                    onChange={(e) => handleChange('pressure_timing', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Affected Area *</label>
                  <input
                    type="text"
                    value={formData.pressure_affected_area}
                    onChange={(e) => handleChange('pressure_affected_area', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Water Source *</label>
                  <select
                    value={formData.pressure_water_source}
                    onChange={(e) => handleChange('pressure_water_source', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option>Tap Water</option>
                    <option>Pipeline</option>
                    <option>Borewell</option>
                    <option>Water Tank</option>
                    <option>Public Water Supply</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Pressure Level *</label>
                  <select
                    value={formData.pressure_level}
                    onChange={(e) => handleChange('pressure_level', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option>Very Low</option>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>Intermittent</option>
                    <option>No Pressure</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Problem Duration *</label>
                  <select
                    value={formData.pressure_duration}
                    onChange={(e) => handleChange('pressure_duration', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option>Less than 1 Day</option>
                    <option>1–2 Days</option>
                    <option>3–7 Days</option>
                    <option>More than 1 Week</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Module 5: Broken Water Pipeline */}
          {selectedSubcategory === 'water_broken_pipeline' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Pipeline Location *</label>
                  <input
                    type="text"
                    value={formData.pipe_location}
                    onChange={(e) => handleChange('pipe_location', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Pipeline Type *</label>
                  <select
                    value={formData.pipe_type}
                    onChange={(e) => handleChange('pipe_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option>Main Water Pipeline</option>
                    <option>Local Distribution Pipeline</option>
                    <option>Household Connection</option>
                    <option>Underground Pipeline</option>
                    <option>Public Water Pipeline</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Damage Type *</label>
                  <select
                    value={formData.pipe_damage_type}
                    onChange={(e) => handleChange('pipe_damage_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option>Pipe Broken</option>
                    <option>Pipe Cracked</option>
                    <option>Joint Broken</option>
                    <option>Pipe Burst</option>
                    <option>Leakage</option>
                    <option>Road Damage Around Pipeline</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Module 6: Illegal Water Connection */}
          {selectedSubcategory === 'water_illegal_connection' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Connection Type *</label>
                  <select
                    value={formData.illegal_conn_pipe_type}
                    onChange={(e) => handleChange('illegal_conn_pipe_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option>Main Water Pipeline</option>
                    <option>Public Water Pipeline</option>
                    <option>Household Connection</option>
                    <option>Underground Pipeline</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Illegal Connection Type *</label>
                  <select
                    value={formData.illegal_connection_type}
                    onChange={(e) => handleChange('illegal_connection_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option>Unauthorized Pipe Connection</option>
                    <option>Water Theft</option>
                    <option>Illegal Pipeline Extension</option>
                    <option>Bypass Connection</option>
                    <option>Unauthorized Tap Connection</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Water Supply Impact *</label>
                  <select
                    value={formData.illegal_supply_impact}
                    onChange={(e) => handleChange('illegal_supply_impact', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option>Low Water Pressure</option>
                    <option>No Water Supply</option>
                    <option>Water Leakage</option>
                    <option>Unequal Water Distribution</option>
                    <option>No Major Impact</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Module 7: Sewerage Overflow */}
          {selectedSubcategory === 'water_sewerage_overflow' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Location *</label>
                  <input
                    type="text"
                    value={formData.sewer_location}
                    onChange={(e) => handleChange('sewer_location', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Overflow Type *</label>
                  <select
                    value={formData.sewer_overflow_type}
                    onChange={(e) => handleChange('sewer_overflow_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option>Drain Overflow</option>
                    <option>Sewage Pipe Overflow</option>
                    <option>Manhole Overflow</option>
                    <option>Blocked Sewer</option>
                    <option>Open Sewerage</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Smell Intensity *</label>
                  <select
                    value={formData.sewer_smell_intensity}
                    onChange={(e) => handleChange('sewer_smell_intensity', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option>Mild</option>
                    <option>Moderate</option>
                    <option>Strong</option>
                    <option>Very Strong / Unbearable</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Module 8: Open Drain */}
          {selectedSubcategory === 'water_open_drain' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Drain Location *</label>
                  <input
                    type="text"
                    value={formData.opendrain_location}
                    onChange={(e) => handleChange('opendrain_location', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Drain Type *</label>
                  <select
                    value={formData.opendrain_type}
                    onChange={(e) => handleChange('opendrain_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option>Roadside Drain</option>
                    <option>Residential Drain</option>
                    <option>Stormwater Drain</option>
                    <option>Sewer Drain</option>
                    <option>Open Channel Drain</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Health / Safety Risk *</label>
                  <input
                    type="text"
                    value={formData.opendrain_safety_risk}
                    onChange={(e) => handleChange('opendrain_safety_risk', e.target.value)}
                    placeholder="Mosquitoes, Bad Smell, Child Falling Risk..."
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 9: Drainage Blockage */}
          {selectedSubcategory === 'water_drainage_blockage' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Blockage Location *</label>
                  <input
                    type="text"
                    value={formData.drainblock_location}
                    onChange={(e) => handleChange('drainblock_location', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Blockage Type *</label>
                  <select
                    value={formData.drainblock_type}
                    onChange={(e) => handleChange('drainblock_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option>Blocked Drain</option>
                    <option>Broken Drain Cover</option>
                    <option>Garbage in Drain</option>
                    <option>Sewage Flow Stoppage</option>
                    <option>Water Stagnation</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Blockage Cause *</label>
                  <select
                    value={formData.drainblock_cause}
                    onChange={(e) => handleChange('drainblock_cause', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option>Garbage / Plastic Waste</option>
                    <option>Mud / Soil Silt</option>
                    <option>Leaves / Garden Waste</option>
                    <option>Sewage Waste</option>
                    <option>Construction Material</option>
                    <option>Unknown</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Module 10: Rainwater Drainage Problem */}
          {selectedSubcategory === 'water_rainwater_drainage' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Flood Area *</label>
                  <select
                    value={formData.rainwater_flood_area}
                    onChange={(e) => handleChange('rainwater_flood_area', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option>Road Flooding</option>
                    <option>Residential Area Flooding</option>
                    <option>Agricultural Area Flooding</option>
                    <option>Urban Flooding</option>
                    <option>River Flooding</option>
                    <option>Drainage Flooding</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Water Accumulation Level *</label>
                  <select
                    value={formData.rainwater_accumulation_level}
                    onChange={(e) => handleChange('rainwater_accumulation_level', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Severe</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Road / Property Impact *</label>
                  <input
                    type="text"
                    value={formData.rainwater_property_impact}
                    onChange={(e) => handleChange('rainwater_property_impact', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 11: Public Drinking Water Facility */}
          {selectedSubcategory === 'water_public_drinking' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Facility Location *</label>
                  <input
                    type="text"
                    value={formData.pubwater_location}
                    onChange={(e) => handleChange('pubwater_location', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Facility Type *</label>
                  <select
                    value={formData.pubwater_facility_type}
                    onChange={(e) => handleChange('pubwater_facility_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option>Public Drinking Water Tap</option>
                    <option>Water Cooler</option>
                    <option>RO Water Facility</option>
                    <option>Drinking Water Tank</option>
                    <option>Public Water Booth</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Problem Type *</label>
                  <select
                    value={formData.pubwater_problem_type}
                    onChange={(e) => handleChange('pubwater_problem_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option>No Water</option>
                    <option>Dirty / Contaminated Water</option>
                    <option>Low Water Pressure</option>
                    <option>Broken Tap</option>
                    <option>Water Leakage</option>
                    <option>Facility Not Working</option>
                    <option>Damaged Facility</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* COMMON CONTACT & LOCATION SECTION */}
          <div className="p-4 bg-cyan-50/70 rounded-2xl border border-cyan-300 space-y-4">
            <h5 className="font-black text-cyan-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-cyan-700" />
              <span>Location Coordinates & Complainant Contact</span>
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
                <label className="font-bold text-amber-950">Address / Landmark *</label>
                <input
                  type="text"
                  value={formData.user_address}
                  onChange={(e) => handleChange('user_address', e.target.value)}
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
                  className="w-full bg-cyan-100 border border-cyan-300 rounded-xl p-2 text-xs text-cyan-950 font-bold"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-amber-950">Urgency Level *</label>
                <select
                  value={formData.urgency_level}
                  onChange={(e) => handleChange('urgency_level', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs font-bold text-slate-800"
                >
                  <option value="Critical">Critical (Severe Pipe Burst / Sewage Flooding)</option>
                  <option value="High">High (Within 4 Hours)</option>
                  <option value="Medium">Medium (Within 24 Hours)</option>
                  <option value="Low">Low (General Maintenance)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-bold text-xs rounded-xl shadow-lg hover:opacity-95 flex items-center justify-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>Dispatch to Water Supply & Sewerage Board</span>
          </button>
        </form>
      </div>
    </div>
  );
}
