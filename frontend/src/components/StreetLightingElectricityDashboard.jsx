import React, { useState } from 'react';
import {
  Zap, Phone, AlertTriangle, CheckCircle2, ShieldCheck,
  Flame, MapPin, ArrowLeft, Send, Sparkles, AlertOctagon,
  Building, Sun, Eye, BatteryCharging
} from 'lucide-react';

export const ELECTRICITY_SUBCATEGORIES = [
  { id: 'elec_streetlight_not_working', name: '1. Street Light Not Working', icon: '💡', desc: 'Single streetlight bulb fused, flickering or inactive timer switch' },
  { id: 'elec_multiple_lights_off', name: '2. Multiple Street Lights Off', icon: '🌑', desc: 'Entire street or lane dark due to phase fault or feeder line tripping' },
  { id: 'elec_power_outage', name: '3. Electricity Power Outage', icon: '🔌', desc: 'Unscheduled blackout, load shedding or localized area power cut' },
  { id: 'elec_fluctuation', name: '4. Electricity Fluctuation / Low Voltage', icon: '⚡', desc: 'High voltage spikes damaging home appliances or severe dimming voltage' },
  { id: 'elec_exposed_wire', name: '5. Exposed Electrical Wire', icon: '🔥', desc: 'Dangling live cable, uninsulated joint & extreme pedestrian shock hazard' },
  { id: 'elec_damaged_pole', name: '6. Damaged Electrical Pole', icon: '🏚️', desc: 'Leaning concrete pole, vehicle hit damage or rusted base ready to collapse' },
  { id: 'elec_spark_fire_risk', name: '7. Electrical Spark / Fire Risk', icon: '💥', desc: 'Active sparking on pole, blast sound, smoke emission & fire emergency' },
  { id: 'elec_transformer_problem', name: '8. Transformer Problem', icon: '🏠', desc: 'Transformer oil leak, continuous loud humming, tripping or blown fuse unit' },
  { id: 'elec_tree_wire_conflict', name: '9. Tree / Electric Wire Conflict', icon: '🌳', desc: 'Overgrown tree branches resting on high-tension wires causing short circuits' },
  { id: 'elec_coverage_problem', name: '10. Street Lighting Coverage Problem', icon: '🛣️', desc: 'Pitch dark public stretch lacking street poles creating women safety hazard' },
  { id: 'elec_public_building_problem', name: '11. Public Building Electricity Problem', icon: '🏢', desc: 'Power failure in government hospital, primary school or community hall' },
  { id: 'elec_equipment_damage', name: '12. Public Electrical Equipment Damage', icon: '🔋', desc: 'Vandalized feeder pillar box, open junction box & exposed circuit breakers' }
];

export default function StreetLightingElectricityDashboard({ speakText, currentUser, initialFeatureModule, onBack, hideOtherModules = true }) {
  const [selectedSubcategory, setSelectedSubcategory] = useState(
    initialFeatureModule || 'elec_streetlight_not_working'
  );

  React.useEffect(() => {
    if (initialFeatureModule) {
      setSelectedSubcategory(initialFeatureModule);
    }
  }, [initialFeatureModule]);

  const [submittedMsg, setSubmittedMsg] = useState(null);

  // Form State for all 12 Electricity Modules
  const [formData, setFormData] = useState({
    // Common User & Location Details
    user_name: currentUser?.name || 'Vikas Rathod',
    user_mobile: currentUser?.phone || '+91 98450 88219',
    consumer_number: 'GESCOM-RR-098412-B',
    street_address: '4th Cross, Station Road, Brahampur, Kalaburagi',
    pole_number: 'GESCOM-POLE-W12-084',
    gps_location: '17.3340° N, 76.8402° E',
    problem_type: 'Street Light Not Working',
    incident_datetime: new Date().toISOString().slice(0, 16),
    safety_risk: 'High',
    previous_complaint: 'No',
    urgency_level: 'High',
    incident_desc: '',
    photo_file: null,

    // 1. Streetlight Single
    streetlight_type: 'LED Street Luminaire (45W)',
    streetlight_duration: '4 Days inactive',

    // 2. Multiple Lights
    multi_poles_count: '8 Consecutive Poles Dark (Entire 200m stretch)',

    // 3. Power Outage
    outage_start_time: '2026-08-25 18:30',
    outage_frequency: 'Daily 2-3 hours recurring without prior notice',

    // 4. Voltage Fluctuation
    fluctuation_voltage_level: 'Low Voltage (140V) preventing pump and refrigerator operation',

    // 5. Exposed Wire
    exposed_wire_location: 'Hanging 4 feet above footpath near school gate',
    exposed_wire_condition: 'Live Sparking Wire Exposed to Rain Puddles',

    // 6. Damaged Pole
    pole_damage_type: 'Severely Leaning (45 degrees) after heavy rain and wind',

    // 7. Spark Fire Risk
    spark_frequency: 'Continuous sparking with loud popping noise every 5 minutes',

    // 8. Transformer Problem
    transformer_number: 'TR-W12-100KVA-04',
    transformer_issue: 'Heavy oil leakage and continuous burning smell',

    // 9. Tree Conflict
    tree_branch_condition: 'Dense banyan tree branches wrapped around 11kV line',

    // 10. Coverage Problem
    coverage_dark_length: '350 meters unlit isolated road connecting bus stand',

    // 11. Public Building
    building_name: 'Government Primary Health Centre (PHC), Ward 12',
    building_dept: 'Health Department (Emergency cold storage backup at risk)',

    // 12. Equipment Damage
    equipment_box_type: 'Ground Feeder Pillar Box with door ripped open and exposed busbars'
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const subcatObj = ELECTRICITY_SUBCATEGORIES.find(s => s.id === selectedSubcategory);
    const ticketId = `ELEC-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const msg = `Grievance registered under [${subcatObj?.name}]. Ticket ID: ${ticketId}. Auto-routed to GESCOM (Gulbarga Electricity Supply Company) Quick Response Van (SLA: 4h Emergency / 24h Normal).`;
    setSubmittedMsg(msg);

    if (speakText) {
      speakText(`Electrical defect logged. Ticket number ${ticketId}. GESCOM line maintenance team dispatched.`);
    }
  };

  const selectedSubcatObj = ELECTRICITY_SUBCATEGORIES.find(s => s.id === selectedSubcategory) || ELECTRICITY_SUBCATEGORIES[0];

  return (
    <div className="space-y-6 font-outfit">
      
      {/* 1. TOP STREET LIGHTING & ELECTRICITY BANNER */}
      <div className="ethnic-card p-6 rounded-3xl bg-gradient-to-r from-slate-950 via-yellow-950 to-amber-950 text-white border-2 border-yellow-400 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-400/40 text-yellow-300 text-xs font-bold font-cinzel flex items-center gap-1.5 w-fit">
              <Zap className="w-3.5 h-3.5 text-yellow-400" />
              <span>GESCOM Power Grid • National Street Lighting Programme (SLNP)</span>
            </span>
            <h2 className="text-xl md:text-2xl font-black font-cinzel text-white flex items-center space-x-2">
              <span>Street Lighting & Electricity Grid Cell</span>
              <span className="text-2xl">💡</span>
            </h2>
            <p className="text-xs text-yellow-200/90 font-medium">
              Real-time streetlight fault tracking, electrical hazard SOS triage, transformer failure dispatch & power outage alerts.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="tel:1912"
              className="px-4 py-2.5 rounded-2xl bg-yellow-600 hover:bg-yellow-700 text-white text-xs font-bold shadow-lg flex items-center space-x-2 border border-yellow-300 animate-pulse"
            >
              <Phone className="w-4 h-4" />
              <span>1912 24x7 Power Emergency</span>
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
            <Zap className="w-4 h-4 text-yellow-400 shrink-0" />
            <span>GESCOM Feeder Gang Quick Response Van On-Call</span>
          </div>
          <div className="flex items-center space-x-2 text-amber-200">
            <Flame className="w-4 h-4 text-rose-400 shrink-0" />
            <span>High-Tension Wire & Transformer Flash Alert Active</span>
          </div>
          <div className="flex items-center space-x-2 text-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>4-Hour Emergency Shock Hazard SLA</span>
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
              Select Lighting & Electricity Defect ({ELECTRICITY_SUBCATEGORIES.length} Modules)
            </h3>
            <span className="text-[11px] font-bold text-yellow-900">Tap to launch specialized form</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {ELECTRICITY_SUBCATEGORIES.map((subcat) => (
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
            {selectedSubcategory.includes('spark') || selectedSubcategory.includes('wire') ? '🚨 4h Shock Emergency SLA' : '24h GESCOM SLA'}
          </span>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-5 text-xs">

          {/* Module 1: Streetlight Single */}
          {selectedSubcategory === 'elec_streetlight_not_working' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Streetlight Luminaire Type *</label>
                  <select
                    value={formData.streetlight_type}
                    onChange={(e) => handleChange('streetlight_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option>LED Street Luminaire (45W / 70W)</option>
                    <option>Sodium Vapor Yellow Light</option>
                    <option>High Mast Tower Floodlight</option>
                    <option>Solar Street Light Unit</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Duration Inactive *</label>
                  <input
                    type="text"
                    value={formData.streetlight_duration}
                    onChange={(e) => handleChange('streetlight_duration', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 2: Multiple Lights Off */}
          {selectedSubcategory === 'elec_multiple_lights_off' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="font-bold text-amber-950">Number of Consecutive Poles / Dark Area Length *</label>
                <input
                  type="text"
                  value={formData.multi_poles_count}
                  onChange={(e) => handleChange('multi_poles_count', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                />
              </div>
            </div>
          )}

          {/* Module 3: Power Outage */}
          {selectedSubcategory === 'elec_power_outage' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Outage Start Date & Time *</label>
                  <input
                    type="text"
                    value={formData.outage_start_time}
                    onChange={(e) => handleChange('outage_start_time', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Outage Frequency / Daily Recurrence *</label>
                  <input
                    type="text"
                    value={formData.outage_frequency}
                    onChange={(e) => handleChange('outage_frequency', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 4: Voltage Fluctuation */}
          {selectedSubcategory === 'elec_fluctuation' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="font-bold text-amber-950">Voltage Condition & Equipment Affected *</label>
                <input
                  type="text"
                  value={formData.fluctuation_voltage_level}
                  onChange={(e) => handleChange('fluctuation_voltage_level', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                />
              </div>
            </div>
          )}

          {/* Module 5: Exposed Wire */}
          {selectedSubcategory === 'elec_exposed_wire' && (
            <div className="space-y-4">
              <div className="p-3 bg-red-50 rounded-2xl border border-red-300 text-red-950 font-bold flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Flame className="w-5 h-5 text-red-600 animate-pulse" />
                  <span>Immediate Shock Hazard Alert: Auto-dispatches GESCOM emergency line cut-off squad.</span>
                </div>
                <span className="bg-red-600 text-white px-2.5 py-1 rounded-xl text-[11px]">Emergency Protocol</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Exposed Wire Location *</label>
                  <input
                    type="text"
                    value={formData.exposed_wire_location}
                    onChange={(e) => handleChange('exposed_wire_location', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Wire State & Pedestrian Danger *</label>
                  <input
                    type="text"
                    value={formData.exposed_wire_condition}
                    onChange={(e) => handleChange('exposed_wire_condition', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 6: Damaged Pole */}
          {selectedSubcategory === 'elec_damaged_pole' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="font-bold text-amber-950">Pole Structural Damage Description *</label>
                <input
                  type="text"
                  value={formData.pole_damage_type}
                  onChange={(e) => handleChange('pole_damage_type', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                />
              </div>
            </div>
          )}

          {/* Module 7: Spark Fire Risk */}
          {selectedSubcategory === 'elec_spark_fire_risk' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="font-bold text-amber-950">Sparking / Smoke Frequency *</label>
                <input
                  type="text"
                  value={formData.spark_frequency}
                  onChange={(e) => handleChange('spark_frequency', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                />
              </div>
            </div>
          )}

          {/* Module 8: Transformer Problem */}
          {selectedSubcategory === 'elec_transformer_problem' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Transformer Number / Location *</label>
                  <input
                    type="text"
                    value={formData.transformer_number}
                    onChange={(e) => handleChange('transformer_number', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Observed Defect *</label>
                  <input
                    type="text"
                    value={formData.transformer_issue}
                    onChange={(e) => handleChange('transformer_issue', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 9: Tree Conflict */}
          {selectedSubcategory === 'elec_tree_wire_conflict' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="font-bold text-amber-950">Tree Branch & High-Tension Wire Contact Details *</label>
                <input
                  type="text"
                  value={formData.tree_branch_condition}
                  onChange={(e) => handleChange('tree_branch_condition', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                />
              </div>
            </div>
          )}

          {/* Module 10: Coverage Problem */}
          {selectedSubcategory === 'elec_coverage_problem' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="font-bold text-amber-950">Unlit Stretch Length & Safety Impact *</label>
                <input
                  type="text"
                  value={formData.coverage_dark_length}
                  onChange={(e) => handleChange('coverage_dark_length', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                />
              </div>
            </div>
          )}

          {/* Module 11: Public Building */}
          {selectedSubcategory === 'elec_public_building_problem' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Public Building Name *</label>
                  <input
                    type="text"
                    value={formData.building_name}
                    onChange={(e) => handleChange('building_name', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Critical Impact *</label>
                  <input
                    type="text"
                    value={formData.building_dept}
                    onChange={(e) => handleChange('building_dept', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 12: Equipment Damage */}
          {selectedSubcategory === 'elec_equipment_damage' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="font-bold text-amber-950">Damaged Equipment / Feeder Box Description *</label>
                <input
                  type="text"
                  value={formData.equipment_box_type}
                  onChange={(e) => handleChange('equipment_box_type', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                />
              </div>
            </div>
          )}

          {/* COMMON FIELDS SECTION (Universal to all 12 Electricity Modules) */}
          <div className="p-4 bg-yellow-50 rounded-2xl border border-yellow-300 space-y-4">
            <h5 className="font-black text-amber-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-yellow-700" />
              <span>Location, Consumer Number & Pole Marker</span>
            </h5>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-amber-950">Consumer / Citizen Name *</label>
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
                <label className="font-bold text-amber-950">Electricity Consumer / Meter No.</label>
                <input
                  type="text"
                  value={formData.consumer_number}
                  onChange={(e) => handleChange('consumer_number', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs text-slate-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-amber-950">Street Address / Landmark *</label>
                <input
                  type="text"
                  value={formData.street_address}
                  onChange={(e) => handleChange('street_address', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs text-slate-800"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-amber-950">Pole Number (Stenciled on Pole)</label>
                <input
                  type="text"
                  value={formData.pole_number}
                  onChange={(e) => handleChange('pole_number', e.target.value)}
                  placeholder="E.g. W12-P-084"
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs text-slate-800 font-bold"
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
            </div>

            <div className="space-y-1">
              <label className="font-bold text-amber-950">Additional Electrical Hazard Notes</label>
              <textarea
                rows={2}
                value={formData.incident_desc}
                onChange={(e) => handleChange('incident_desc', e.target.value)}
                placeholder="Mention if near public water source, schools, high footfall zones, transformer smoke..."
                className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs text-slate-800 font-medium"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-yellow-600 to-amber-700 text-white font-bold text-xs rounded-xl shadow-lg hover:opacity-95 flex items-center justify-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>Dispatch GESCOM Line Gang & Technical Crew</span>
          </button>
        </form>
      </div>
    </div>
  );
}
