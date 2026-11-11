import React, { useState } from 'react';
import {
  Compass, Phone, AlertTriangle, CheckCircle2, ShieldCheck,
  Camera, MapPin, ArrowLeft, Send, Sparkles, AlertOctagon,
  HardHat, Bus, Droplets, Eye, Sliders
} from 'lucide-react';

export const ROADS_SUBCATEGORIES = [
  { id: 'roads_pothole', name: '1. Pothole Reporting', icon: '🕳️', desc: 'Crater-like road potholes, asphalt depth damage & accident hazards' },
  { id: 'roads_damaged_road', name: '2. Damaged Road', icon: '🛣️', desc: 'Asphalt erosion, road caving, surface cracks & unfinished diggings' },
  { id: 'roads_damaged_bridge', name: '3. Damaged Bridge / Flyover', icon: '🌉', desc: 'Structural cracks, expansion joint damage & loose parapet railings' },
  { id: 'roads_road_obstruction', name: '4. Road Obstruction', icon: '🚧', desc: 'Fallen barricades, abandoned debris, mud heaps & construction blockage' },
  { id: 'roads_traffic_signal', name: '5. Traffic Signal Problem', icon: '🚦', desc: 'Dead traffic lights, blinking errors, physical damage & junction hazards' },
  { id: 'roads_unsafe_footpath', name: '6. Missing / Unsafe Footpath', icon: '🚸', desc: 'Missing pedestrian walkway, broken paver tiles & open drain slabs' },
  { id: 'roads_bus_stop', name: '7. Bus Stop Infrastructure Problem', icon: '🚌', desc: 'Broken bus shelter, missing seating, rusted roof & damaged signboards' },
  { id: 'roads_drainage_problem', name: '8. Public Drainage Problem', icon: '🚰', desc: 'Choked road storm drain, stagnant waterlogging & monsoon overflow' },
  { id: 'roads_broken_infra', name: '9. Broken Public Infrastructure', icon: '🧱', desc: 'Damaged guard rails, median divider damage & broken street furniture' },
  { id: 'roads_unsafe_construction', name: '10. Unsafe Construction / Public Structure', icon: '🏗️', desc: 'Unbarricaded deep trenches, falling debris & hazardous roadwork' },
  { id: 'roads_illegal_parking', name: '11. Illegal / Unsafe Parking', icon: '🅿️', desc: 'Vehicles blocking pedestrian paths, double parking & blind corner hazards' },
  { id: 'roads_accessibility_problem', name: '12. Accessibility Infrastructure Problem', icon: '♿', desc: 'Missing wheelchair ramps, broken tactile tiles for blind & inaccessible steps' }
];

export default function RoadsInfrastructureDashboard({ speakText, currentUser, initialFeatureModule, onBack, hideOtherModules = true }) {
  const [selectedSubcategory, setSelectedSubcategory] = useState(
    initialFeatureModule || 'roads_pothole'
  );

  React.useEffect(() => {
    if (initialFeatureModule) {
      setSelectedSubcategory(initialFeatureModule);
    }
  }, [initialFeatureModule]);

  const [submittedMsg, setSubmittedMsg] = useState(null);

  // Form State for all 12 Roads Modules
  const [formData, setFormData] = useState({
    // Common User & Road Location Data
    user_name: currentUser?.name || 'Ramesh Shinde',
    user_mobile: currentUser?.phone || '+91 98450 77123',
    road_name: 'Sedam Main Road (Near Central Bus Terminal)',
    area_ward: 'Ward 12, Brahampur, Kalaburagi',
    gps_location: '17.3325° N, 76.8390° E',
    problem_type: 'Pothole & Surface Erosion',
    incident_datetime: new Date().toISOString().slice(0, 16),
    safety_risk: 'High (Risk to Two-Wheelers and Emergency Ambulances)',
    previous_complaint: 'No',
    urgency_level: 'High',
    incident_desc: '',
    photo_file: null,

    // 1. Pothole
    pothole_size: 'Large (> 2 feet diameter)',
    pothole_depth: 'Approx 6-8 inches deep with loose sharp ballast stones',
    pothole_duration: '3 Weeks (Worsening after recent rains)',

    // 2. Damaged Road
    road_damage_type: 'Severe Bitumen Stripping & Trench Sinking',
    road_damage_length: 'Approx 150 meters stretch along left carriage lane',

    // 3. Damaged Bridge
    bridge_name: 'Railway Crossing Flyover / Ring Road Overpass',
    bridge_damage_type: 'Expansion joint gap widening & concrete spalling',
    bridge_traffic_impact: 'High (Buses decelerating dangerously at joint)',

    // 4. Road Obstruction
    obstruction_type: 'Uncleared Construction Gravel & Concrete Slabs',
    obstruction_cause: 'Unfinished Cable Trench Work Left by Private Contractor',

    // 5. Traffic Signal
    signal_location: 'Brahampur 4-Way Traffic Junction',
    signal_problem: 'Red & Green lights simultaneous flickering / Total power blank',

    // 6. Unsafe Footpath
    footpath_condition: 'Broken concrete pavers with 2-foot exposed drop into drain',
    footpath_pedestrian_risk: 'High for Senior Citizens, Visually Impaired & Children',

    // 7. Bus Stop
    bus_stop_name: 'Model High School KSRTC / City Bus Shelter',
    bus_shelter_condition: 'Rusted tin sheet collapsed & seating benches broken',

    // 8. Drainage Problem
    drain_blockage_level: '100% Choked with silt causing 1-foot stagnant road flooding',

    // 9. Broken Public Infra
    infra_type: 'Road Center Median Steel Railing & Crash Barrier',

    // 10. Unsafe Construction
    unsafe_structure_type: 'Deep Storm Drain Excavation without Safety Mesh or Warning Lights',

    // 11. Illegal Parking
    illegal_vehicle_details: '3 Heavy Trucks & Commercial Cargo Vans Block Left Turn Lane',

    // 12. Accessibility Problem
    accessibility_facility: 'Public Hospital Pedestrian Crossing Ramp & Bus Shelter Entrance'
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const subcatObj = ROADS_SUBCATEGORIES.find(s => s.id === selectedSubcategory);
    const ticketId = `ROADS-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const msg = `Grievance registered under [${subcatObj?.name}]. Ticket ID: ${ticketId}. Auto-routed to Public Works Department (PWD) & City Municipal Civil Engineering Cell (SLA: 48h).`;
    setSubmittedMsg(msg);

    if (speakText) {
      speakText(`Road infrastructure defect logged. Ticket number ${ticketId}. PWD repair division assigned.`);
    }
  };

  const selectedSubcatObj = ROADS_SUBCATEGORIES.find(s => s.id === selectedSubcategory) || ROADS_SUBCATEGORIES[0];

  return (
    <div className="space-y-6 font-outfit">
      
      {/* 1. TOP ROADS & INFRASTRUCTURE BANNER */}
      <div className="ethnic-card p-6 rounded-3xl bg-gradient-to-r from-slate-950 via-stone-950 to-slate-900 text-white border-2 border-slate-500 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full bg-slate-500/20 border border-slate-400/40 text-slate-300 text-xs font-bold font-cinzel flex items-center gap-1.5 w-fit">
              <Compass className="w-3.5 h-3.5 text-slate-300" />
              <span>National Highway & City PWD Road Safety Infrastructure Cell</span>
            </span>
            <h2 className="text-xl md:text-2xl font-black font-cinzel text-white flex items-center space-x-2">
              <span>Roads & Public Infrastructure Operations</span>
              <span className="text-2xl">🛣️</span>
            </h2>
            <p className="text-xs text-slate-200/90 font-medium">
              AI pothole severity detection, bridge safety inspection, footpath repairs & before/after road work tracking.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="tel:1073"
              className="px-4 py-2.5 rounded-2xl bg-slate-700 hover:bg-slate-800 text-white text-xs font-bold shadow-lg flex items-center space-x-2 border border-slate-400"
            >
              <Phone className="w-4 h-4" />
              <span>1073 National Highway Helpline</span>
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
          <div className="flex items-center space-x-2 text-slate-200">
            <HardHat className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Pothole Quick-Repair Rapid Jetpatcher Active</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-200">
            <Camera className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>AI Computer Vision Defect Severity Estimator</span>
          </div>
          <div className="flex items-center space-x-2 text-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Before & After Repair Geo-Tagged Verification</span>
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
              Select Road & Infrastructure Problem ({ROADS_SUBCATEGORIES.length} Modules)
            </h3>
            <span className="text-[11px] font-bold text-slate-800">Tap to launch specialized form</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {ROADS_SUBCATEGORIES.map((subcat) => (
              <button
                key={subcat.id}
                type="button"
                onClick={() => {
                  setSelectedSubcategory(subcat.id);
                  if (speakText) speakText(`Selected ${subcat.name}`);
                }}
                className={`p-3 rounded-2xl border-2 text-left transition-all flex flex-col justify-between space-y-2 ${
                  selectedSubcategory === subcat.id
                    ? 'border-slate-800 bg-slate-100 shadow-md ring-2 ring-slate-400'
                    : 'border-amber-200 bg-white hover:border-amber-400 hover:bg-amber-50/50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-xl p-1.5 rounded-xl bg-slate-100 border border-slate-300 shrink-0">{subcat.icon}</span>
                  <span className="text-xs font-black text-slate-950 line-clamp-2">{subcat.name}</span>
                </div>
                <p className="text-[10px] text-slate-600 font-medium line-clamp-2">{subcat.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3. DYNAMIC TARGETED FORM */}
      <div className="ethnic-card p-6 rounded-3xl shadow-xl gold-glow border-2 border-slate-400 space-y-6">
        
        {/* Active Module Header */}
        <div className="p-4 bg-slate-100 rounded-2xl border border-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <span className="text-3xl p-2 rounded-2xl bg-white shadow border border-slate-300">{selectedSubcatObj.icon}</span>
            <div>
              <h4 className="text-sm font-black text-slate-950">{selectedSubcatObj.name}</h4>
              <p className="text-xs text-slate-700 font-medium">{selectedSubcatObj.desc}</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-slate-800 text-white font-bold text-xs border border-slate-600 self-start sm:self-auto">
            48h PWD Repair SLA
          </span>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-5 text-xs">

          {/* Module 1: Pothole Reporting */}
          {selectedSubcategory === 'roads_pothole' && (
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-300 text-amber-950 font-bold flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Camera className="w-5 h-5 text-amber-700" />
                  <span>AI Computer Vision Pothole Depth Analyzer: Severity Classified as Critical (Score: 8.8/10).</span>
                </div>
                <span className="bg-amber-700 text-white px-2.5 py-1 rounded-xl text-[11px]">Rapid Patching Priority</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Pothole Approximate Size *</label>
                  <select
                    value={formData.pothole_size}
                    onChange={(e) => handleChange('pothole_size', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option>Large (&gt; 2 feet diameter)</option>
                    <option>Medium (1 - 2 feet diameter)</option>
                    <option>Small (Deep sharp crater &lt; 1 foot)</option>
                    <option>Cluster of Multiple Potholes</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Estimated Depth *</label>
                  <input
                    type="text"
                    value={formData.pothole_depth}
                    onChange={(e) => handleChange('pothole_depth', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Duration Pothole Has Existed *</label>
                  <input
                    type="text"
                    value={formData.pothole_duration}
                    onChange={(e) => handleChange('pothole_duration', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 2: Damaged Road */}
          {selectedSubcategory === 'roads_damaged_road' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Road Damage Type *</label>
                  <select
                    value={formData.road_damage_type}
                    onChange={(e) => handleChange('road_damage_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option>Severe Bitumen Stripping & Trench Sinking</option>
                    <option>Alligator Cracks / Surface Disintegration</option>
                    <option>Water Pipeline Digging Unpaved</option>
                    <option>Complete Asphalt Loss / Muddy Slush</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Approximate Damage Stretch / Length *</label>
                  <input
                    type="text"
                    value={formData.road_damage_length}
                    onChange={(e) => handleChange('road_damage_length', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 3: Damaged Bridge */}
          {selectedSubcategory === 'roads_damaged_bridge' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Bridge / Flyover Name *</label>
                  <input
                    type="text"
                    value={formData.bridge_name}
                    onChange={(e) => handleChange('bridge_name', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Structural Damage Observed *</label>
                  <input
                    type="text"
                    value={formData.bridge_damage_type}
                    onChange={(e) => handleChange('bridge_damage_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Traffic Safety Impact *</label>
                  <input
                    type="text"
                    value={formData.bridge_traffic_impact}
                    onChange={(e) => handleChange('bridge_traffic_impact', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 4: Road Obstruction */}
          {selectedSubcategory === 'roads_road_obstruction' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Obstruction Description *</label>
                  <input
                    type="text"
                    value={formData.obstruction_type}
                    onChange={(e) => handleChange('obstruction_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Cause of Blockage *</label>
                  <input
                    type="text"
                    value={formData.obstruction_cause}
                    onChange={(e) => handleChange('obstruction_cause', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 5: Traffic Signal Problem */}
          {selectedSubcategory === 'roads_traffic_signal' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Signal Junction Location *</label>
                  <input
                    type="text"
                    value={formData.signal_location}
                    onChange={(e) => handleChange('signal_location', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Fault Type Observed *</label>
                  <input
                    type="text"
                    value={formData.signal_problem}
                    onChange={(e) => handleChange('signal_problem', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 6: Unsafe Footpath */}
          {selectedSubcategory === 'roads_unsafe_footpath' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Footpath Condition *</label>
                  <input
                    type="text"
                    value={formData.footpath_condition}
                    onChange={(e) => handleChange('footpath_condition', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Pedestrian Risk Level *</label>
                  <input
                    type="text"
                    value={formData.footpath_pedestrian_risk}
                    onChange={(e) => handleChange('footpath_pedestrian_risk', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 7: Bus Stop Infrastructure Problem */}
          {selectedSubcategory === 'roads_bus_stop' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Bus Stop / Shelter Name *</label>
                  <input
                    type="text"
                    value={formData.bus_stop_name}
                    onChange={(e) => handleChange('bus_stop_name', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Shelter & Seating Condition *</label>
                  <input
                    type="text"
                    value={formData.bus_shelter_condition}
                    onChange={(e) => handleChange('bus_shelter_condition', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 8: Public Drainage Problem */}
          {selectedSubcategory === 'roads_drainage_problem' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="font-bold text-amber-950">Drainage Blockage & Waterlogging Description *</label>
                <input
                  type="text"
                  value={formData.drain_blockage_level}
                  onChange={(e) => handleChange('drain_blockage_level', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                />
              </div>
            </div>
          )}

          {/* Module 9: Broken Public Infrastructure */}
          {selectedSubcategory === 'roads_broken_infra' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="font-bold text-amber-950">Public Infrastructure Type Damaged *</label>
                <input
                  type="text"
                  value={formData.infra_type}
                  onChange={(e) => handleChange('infra_type', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                />
              </div>
            </div>
          )}

          {/* Module 10: Unsafe Construction */}
          {selectedSubcategory === 'roads_unsafe_construction' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="font-bold text-amber-950">Unsafe Construction / Trench Details *</label>
                <input
                  type="text"
                  value={formData.unsafe_structure_type}
                  onChange={(e) => handleChange('unsafe_structure_type', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                />
              </div>
            </div>
          )}

          {/* Module 11: Illegal Parking */}
          {selectedSubcategory === 'roads_illegal_parking' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="font-bold text-amber-950">Vehicles & Traffic Obstruction Details *</label>
                <input
                  type="text"
                  value={formData.illegal_vehicle_details}
                  onChange={(e) => handleChange('illegal_vehicle_details', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                />
              </div>
            </div>
          )}

          {/* Module 12: Accessibility Problem */}
          {selectedSubcategory === 'roads_accessibility_problem' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="font-bold text-amber-950">Inaccessible Facility / Missing Wheelchair Ramp Details *</label>
                <input
                  type="text"
                  value={formData.accessibility_facility}
                  onChange={(e) => handleChange('accessibility_facility', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                />
              </div>
            </div>
          )}

          {/* COMMON FIELDS SECTION (Universal to all 12 Roads Modules) */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-300 space-y-4">
            <h5 className="font-black text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-slate-700" />
              <span>Location, Reporter Details & Evidence Capture</span>
            </h5>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-amber-950">Reporter Name *</label>
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
                <label className="font-bold text-amber-950">Road / Landmark Name *</label>
                <input
                  type="text"
                  value={formData.road_name}
                  onChange={(e) => handleChange('road_name', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs text-slate-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-amber-950">Area / Ward *</label>
                <input
                  type="text"
                  value={formData.area_ward}
                  onChange={(e) => handleChange('area_ward', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs text-slate-800"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-amber-950">GPS Coordinates</label>
                <input
                  type="text"
                  value={formData.gps_location}
                  readOnly
                  className="w-full bg-slate-200 border border-slate-300 rounded-xl p-2 text-xs text-slate-900 font-bold"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-amber-950">Safety Risk Classification *</label>
                <select
                  value={formData.safety_risk}
                  onChange={(e) => handleChange('safety_risk', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs font-bold text-amber-950"
                >
                  <option>High (Risk to Two-Wheelers and Emergency Ambulances)</option>
                  <option>Medium (Traffic slow-down & pedestrian hazard)</option>
                  <option>Low (Minor cosmetic / early erosion)</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-amber-950">Detailed Defect Description</label>
              <textarea
                rows={2}
                value={formData.incident_desc}
                onChange={(e) => handleChange('incident_desc', e.target.value)}
                placeholder="Mention specific lane, nearest pole/shop number, recurring water pooling..."
                className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs text-slate-800 font-medium"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-slate-800 to-slate-900 text-white font-bold text-xs rounded-xl shadow-lg hover:opacity-95 flex items-center justify-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>Dispatch Road Inspection & Repair Order</span>
          </button>
        </form>
      </div>
    </div>
  );
}
