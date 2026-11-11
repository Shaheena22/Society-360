import React, { useState } from 'react';
import {
  Car, Phone, AlertTriangle, CheckCircle2, ShieldCheck,
  MapPin, ArrowLeft, Send, Sparkles, AlertOctagon,
  Bus, Navigation, ShieldAlert, Clock, Gauge, CreditCard
} from 'lucide-react';

export const TRAFFIC_SUBCATEGORIES = [
  { id: 'traffic_illegal_parking', name: '1. Illegal Parking', icon: '🚗', desc: 'No-parking zone violation, footpath encroachment & blocking emergency gate' },
  { id: 'traffic_signal_problem', name: '2. Traffic Signal Problem', icon: '🚦', desc: 'Signal light fused, red/green stuck, timer erratic or junction signal blackout' },
  { id: 'traffic_road_congestion', name: '3. Road Congestion / Gridlock', icon: '🚙', desc: 'Severe traffic bottleneck, standstill bottleneck & junction choke point' },
  { id: 'traffic_dangerous_driving', name: '4. Dangerous Driving Reporting', icon: '🏎️', desc: 'Reckless overspeeding, wrong-side driving, footpath riding & drunken driving' },
  { id: 'traffic_bus_stop_problem', name: '5. Bus Stop Infrastructure Problem', icon: '🚏', desc: 'Broken bus stop shelter, missing seating, no lighting & unmaintained structure' },
  { id: 'traffic_bus_service_issue', name: '6. Public Bus Service Issue', icon: '🚌', desc: 'Bus trip cancellations, extreme delays, overcrowding & skipped stops' },
  { id: 'traffic_overcharging', name: '7. Auto / Taxi Overcharging', icon: '🚕', desc: 'Refusal to use meter, extortionate fare demand & app-based surge extortion' },
  { id: 'traffic_missing_road_markings', name: '8. Missing Road Markings', icon: '🛣️', desc: 'Faded zebra crossings, missing lane dividers & unpainted speed bumps' },
  { id: 'traffic_school_zone_traffic', name: '9. School-Zone Traffic Problem', icon: '🏫', desc: 'Rash vehicular movement near school gates, missing speed calming & pedestrian danger' }
];

export default function TrafficTransportDashboard({ speakText, currentUser, initialFeatureModule, onBack, hideOtherModules = true }) {
  const [selectedSubcategory, setSelectedSubcategory] = useState(
    initialFeatureModule || 'traffic_illegal_parking'
  );

  React.useEffect(() => {
    if (initialFeatureModule) {
      setSelectedSubcategory(initialFeatureModule);
    }
  }, [initialFeatureModule]);

  const [submittedMsg, setSubmittedMsg] = useState(null);

  // Form State for all 9 Traffic & Transport Modules
  const [formData, setFormData] = useState({
    // Common User Details
    user_name: currentUser?.name || 'Sanjay Kulkarni',
    user_mobile: currentUser?.phone || '+91 98450 67123',
    user_location: 'Station Road, Near Railway Station Circle, Kalaburagi',
    gps_location: '17.3360° N, 76.8430° E',
    urgency_level: 'High',
    incident_datetime: new Date().toISOString().slice(0, 16),
    photo_file: null,

    // 1. Illegal Parking
    parking_vehicle_no: 'KA-32-MB-4902 (Commercial Delivery Van)',
    parking_area_type: 'Market Area / Commercial Street',
    parking_issue: 'Footpath Parking & Blocking Emergency Hospital Ambulance Access',

    // 2. Traffic Signal Problem
    signal_location: 'Sedam Road - Ring Road 4-Way Junction',
    signal_problem_type: 'Red Light Not Working & Signal Timing Problem',
    signal_status: 'Partially Working / Flickering',

    // 3. Road Congestion
    congestion_location: 'City Bus Stand Circle to Central Market Stretch',
    congestion_reason: 'Illegal Parking & Narrow Road Bottleneck with Heavy Vehicle Breakdown',
    congestion_level: 'Severe / Standstill Gridlock',

    // 4. Dangerous Driving
    driving_vehicle_no: 'KA-32-Z-8821 (Private Bus / SUV)',
    driving_issue: 'Wrong-Side Driving, Over Speeding & Driving on Pedestrian Footpath',
    driving_behavior: 'Aggressive Driving, Sudden Lane Change & Excessive Honking',
    driving_desc: 'Vehicle driving 70km/h on wrong lane forcing school autos off the road',

    // 5. Bus Stop Problem
    bus_stop_name: 'Super Market Main Bus Stop, Ward 12',
    bus_stop_problem: 'Bus Stop Shelter Missing, No Seating, Cleanliness Problem',
    bus_stop_condition: 'Damaged / Unsafe for Senior Citizens & Women',

    // 6. Public Bus Service Issue
    bus_route_no: 'Route 14A (Central Bus Stand to University Campus)',
    bus_vehicle_no: 'KA-32-F-1104',
    bus_service_problem: 'Bus Delay / Not Arriving for 90 Minutes & Overcrowded Bus',
    bus_issue_type: 'Delay / Irregular Service & Driver Skipping Designated Bus Stop',
    bus_passenger_impact: 'Significant Delay & Safety Risk for Daily Commuters',

    // 7. Auto/Taxi Overcharging
    auto_vehicle_no: 'KA-32-TR-3419 (Auto Rickshaw)',
    auto_pickup: 'Kalaburagi Railway Station',
    auto_dest: 'Sedam Road High Court Complex',
    auto_charged_fare: '₹250 (Refused meter; official fare is ₹70)',
    auto_vehicle_type: 'Auto Rickshaw',
    auto_payment_method: 'Cash / UPI Demand',

    // 8. Missing Road Markings
    marking_location: 'High Court Ring Road Crossway',
    marking_type: 'Zebra Crossing, Centre Lane Marking & Speed Bump Marking',
    marking_issue: 'Completely Missing / Faded causing frequent pedestrian close calls',

    // 9. School-Zone Traffic Problem
    school_location: 'St. Joseph School Gate, Main Road',
    school_safety_issue: 'Accident Risk, No Speed Breaker, No School-Zone Sign & Unsafe Road Crossing',
    school_peak_time: 'School Opening Time (08:00 - 09:00 AM) & Closing Time (03:30 - 04:30 PM)'
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const subcatObj = TRAFFIC_SUBCATEGORIES.find(s => s.id === selectedSubcategory);
    const ticketId = `TRF-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const msg = `Complaint filed under [${subcatObj?.name}]. Ticket ID: ${ticketId}. Auto-routed to City Traffic Police Control Room, RTO Transport Commissioner & KKRTC City Bus Cell.`;
    setSubmittedMsg(msg);

    if (speakText) {
      speakText(`Traffic complaint filed. Ticket number ${ticketId}. Traffic Police Control Room alerted.`);
    }
  };

  const selectedSubcatObj = TRAFFIC_SUBCATEGORIES.find(s => s.id === selectedSubcategory) || TRAFFIC_SUBCATEGORIES[0];

  return (
    <div className="space-y-6 font-outfit">
      
      {/* 1. TOP TRAFFIC & TRANSPORT BANNER */}
      <div className="ethnic-card p-6 rounded-3xl bg-gradient-to-r from-slate-950 via-red-950 to-amber-950 text-white border-2 border-red-400 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full bg-red-500/20 border border-red-400/40 text-red-300 text-xs font-bold font-cinzel flex items-center gap-1.5 w-fit">
              <Navigation className="w-3.5 h-3.5 text-red-400" />
              <span>City Traffic Police Management System • KKRTC Public Transport Cell</span>
            </span>
            <h2 className="text-xl md:text-2xl font-black font-cinzel text-white flex items-center space-x-2">
              <span>Traffic & Transport Management Cell</span>
              <span className="text-2xl">🚦</span>
            </h2>
            <p className="text-xs text-red-200/90 font-medium">
              Traffic signal fault dispatch, illegal parking towing, rash driving enforcement & public bus service grievance portal.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="tel:103"
              className="px-4 py-2.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-lg flex items-center space-x-2 border border-red-300 animate-pulse"
            >
              <Phone className="w-4 h-4" />
              <span>103 Traffic Helpline</span>
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
          <div className="flex items-center space-x-2 text-red-200">
            <Car className="w-4 h-4 text-red-400 shrink-0" />
            <span>Traffic Towing Squad & Crane Mobilization Ready</span>
          </div>
          <div className="flex items-center space-x-2 text-amber-200">
            <Bus className="w-4 h-4 text-amber-400 shrink-0" />
            <span>KKRTC Bus Route Real-Time Monitoring Desk Active</span>
          </div>
          <div className="flex items-center space-x-2 text-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Traffic Violation E-Challan Integration Online</span>
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
              Select Traffic & Transport Issue ({TRAFFIC_SUBCATEGORIES.length} Modules)
            </h3>
            <span className="text-[11px] font-bold text-red-900">Tap to launch specialized form</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {TRAFFIC_SUBCATEGORIES.map((subcat) => (
              <button
                key={subcat.id}
                type="button"
                onClick={() => {
                  setSelectedSubcategory(subcat.id);
                  if (speakText) speakText(`Selected ${subcat.name}`);
                }}
                className={`p-3 rounded-2xl border-2 text-left transition-all flex flex-col justify-between space-y-2 ${
                  selectedSubcategory === subcat.id
                    ? 'border-red-600 bg-red-50 shadow-md ring-2 ring-red-300'
                    : 'border-amber-200 bg-white hover:border-amber-400 hover:bg-amber-50/50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-xl p-1.5 rounded-xl bg-red-100 border border-red-300 shrink-0">{subcat.icon}</span>
                  <span className="text-xs font-black text-slate-950 line-clamp-2">{subcat.name}</span>
                </div>
                <p className="text-[10px] text-slate-600 font-medium line-clamp-2">{subcat.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3. DYNAMIC TARGETED FORM */}
      <div className="ethnic-card p-6 rounded-3xl shadow-xl gold-glow border-2 border-red-400 space-y-6">
        
        {/* Active Module Header */}
        <div className="p-4 bg-red-50 rounded-2xl border border-red-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <span className="text-3xl p-2 rounded-2xl bg-white shadow border border-red-300">{selectedSubcatObj.icon}</span>
            <div>
              <h4 className="text-sm font-black text-red-950">{selectedSubcatObj.name}</h4>
              <p className="text-xs text-red-800 font-medium">{selectedSubcatObj.desc}</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-red-200 text-red-950 font-bold text-xs border border-red-400 self-start sm:self-auto">
            Traffic Control 2h SLA
          </span>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-5 text-xs">

          {/* Module 1: Illegal Parking */}
          {selectedSubcategory === 'traffic_illegal_parking' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Vehicle Number (if visible) *</label>
                  <input
                    type="text"
                    value={formData.parking_vehicle_no}
                    onChange={(e) => handleChange('parking_vehicle_no', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Area Type *</label>
                  <select
                    value={formData.parking_area_type}
                    onChange={(e) => handleChange('parking_area_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option>Residential Area</option>
                    <option>Commercial Area / Market</option>
                    <option>School / College Area</option>
                    <option>Hospital Area</option>
                    <option>Main Road / Highway</option>
                    <option>Designated Parking Zone Violation</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Parking Issue *</label>
                  <select
                    value={formData.parking_issue}
                    onChange={(e) => handleChange('parking_issue', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option>No-Parking Zone Violation</option>
                    <option>Footpath / Pedestrian Walkway Parking</option>
                    <option>Roadside Double Parking</option>
                    <option>Blocking Building / Gate Entrance</option>
                    <option>Blocking Emergency / Ambulance Access</option>
                    <option>Wrong-Side Parking</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Module 2: Traffic Signal Problem */}
          {selectedSubcategory === 'traffic_signal_problem' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Signal Location / Junction *</label>
                  <input
                    type="text"
                    value={formData.signal_location}
                    onChange={(e) => handleChange('signal_location', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Problem Type *</label>
                  <select
                    value={formData.signal_problem_type}
                    onChange={(e) => handleChange('signal_problem_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option>Signal Not Working (Complete Blackout)</option>
                    <option>Red Light Not Working</option>
                    <option>Green Light Not Working</option>
                    <option>Yellow Light Not Working</option>
                    <option>Signal Timing Problem / Rapid Switch</option>
                    <option>Signal Light Damaged</option>
                    <option>Signal Visibility Problem (Tree Blocked)</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Signal Status *</label>
                  <select
                    value={formData.signal_status}
                    onChange={(e) => handleChange('signal_status', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option>Completely Not Working</option>
                    <option>Partially Working</option>
                    <option>Flickering</option>
                    <option>Incorrect Timing</option>
                    <option>Intermittent</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Module 3: Road Congestion */}
          {selectedSubcategory === 'traffic_road_congestion' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Traffic Location *</label>
                  <input
                    type="text"
                    value={formData.congestion_location}
                    onChange={(e) => handleChange('congestion_location', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Apparent Reason *</label>
                  <select
                    value={formData.congestion_reason}
                    onChange={(e) => handleChange('congestion_reason', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option>Heavy Traffic Peak Hour</option>
                    <option>Road Accident</option>
                    <option>Road Construction / Dug Up Trench</option>
                    <option>Illegal Parking & Bottleneck</option>
                    <option>Traffic Signal Failure</option>
                    <option>Road Blockage</option>
                    <option>Vehicle Breakdown</option>
                    <option>Public Event / Rally</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Traffic Severity Level *</label>
                  <select
                    value={formData.congestion_level}
                    onChange={(e) => handleChange('congestion_level', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option>Severe / Standstill Gridlock</option>
                    <option>High (Crawling Traffic)</option>
                    <option>Medium (15-20 Min Delay)</option>
                    <option>Low (Minor Slowdown)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Module 4: Dangerous Driving */}
          {selectedSubcategory === 'traffic_dangerous_driving' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Offending Vehicle Number *</label>
                  <input
                    type="text"
                    value={formData.driving_vehicle_no}
                    onChange={(e) => handleChange('driving_vehicle_no', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Driving Violation Issue *</label>
                  <select
                    value={formData.driving_issue}
                    onChange={(e) => handleChange('driving_issue', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option>Over Speeding</option>
                    <option>Wrong-Side Driving</option>
                    <option>Rash / Reckless Driving</option>
                    <option>Dangerous Overtaking</option>
                    <option>Red Light Jumping Violation</option>
                    <option>Drunk / Suspicious Driving</option>
                    <option>Mobile Phone Use While Driving</option>
                    <option>Driving on Pedestrian Footpath</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Observed Driving Behavior *</label>
                  <input
                    type="text"
                    value={formData.driving_behavior}
                    onChange={(e) => handleChange('driving_behavior', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="font-bold text-amber-950">Description of Incident</label>
                <textarea
                  rows={2}
                  value={formData.driving_desc}
                  onChange={(e) => handleChange('driving_desc', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                />
              </div>
            </div>
          )}

          {/* Module 5: Bus Stop Problem */}
          {selectedSubcategory === 'traffic_bus_stop_problem' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Bus Stop Name & Location *</label>
                  <input
                    type="text"
                    value={formData.bus_stop_name}
                    onChange={(e) => handleChange('bus_stop_name', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Problem Type *</label>
                  <input
                    type="text"
                    value={formData.bus_stop_problem}
                    onChange={(e) => handleChange('bus_stop_problem', e.target.value)}
                    placeholder="Shelter Missing, Broken Seating, No Lighting, Cleanliness..."
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Bus Stop Condition *</label>
                  <select
                    value={formData.bus_stop_condition}
                    onChange={(e) => handleChange('bus_stop_condition', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option>Good</option>
                    <option>Needs Repair</option>
                    <option>Damaged</option>
                    <option>Unsafe</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Module 6: Public Bus Service Issue */}
          {selectedSubcategory === 'traffic_bus_service_issue' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Bus Route No. *</label>
                  <input
                    type="text"
                    value={formData.bus_route_no}
                    onChange={(e) => handleChange('bus_route_no', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Bus Registration No. (if known)</label>
                  <input
                    type="text"
                    value={formData.bus_vehicle_no}
                    onChange={(e) => handleChange('bus_vehicle_no', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Service Problem *</label>
                  <input
                    type="text"
                    value={formData.bus_service_problem}
                    onChange={(e) => handleChange('bus_service_problem', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 7: Auto / Taxi Overcharging */}
          {selectedSubcategory === 'traffic_overcharging' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Vehicle Number *</label>
                  <input
                    type="text"
                    value={formData.auto_vehicle_no}
                    onChange={(e) => handleChange('auto_vehicle_no', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Pickup Location *</label>
                  <input
                    type="text"
                    value={formData.auto_pickup}
                    onChange={(e) => handleChange('auto_pickup', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Destination Location *</label>
                  <input
                    type="text"
                    value={formData.auto_dest}
                    onChange={(e) => handleChange('auto_dest', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Charged / Extorted Fare *</label>
                  <input
                    type="text"
                    value={formData.auto_charged_fare}
                    onChange={(e) => handleChange('auto_charged_fare', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-bold"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module 8: Missing Road Markings */}
          {selectedSubcategory === 'traffic_missing_road_markings' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Road Location *</label>
                  <input
                    type="text"
                    value={formData.marking_location}
                    onChange={(e) => handleChange('marking_location', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Marking Type *</label>
                  <select
                    value={formData.marking_type}
                    onChange={(e) => handleChange('marking_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option>Lane Marking / Center Line</option>
                    <option>Zebra Pedestrian Crossing</option>
                    <option>Speed Bump Marking</option>
                    <option>Edge Line / Stop Line</option>
                    <option>Turn Arrow Marking</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Marking Issue *</label>
                  <select
                    value={formData.marking_issue}
                    onChange={(e) => handleChange('marking_issue', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option>Completely Missing</option>
                    <option>Faded / Not Visible</option>
                    <option>Damaged by Tar Work</option>
                    <option>Incorrect Marking</option>
                    <option>Partially Missing</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Module 9: School-Zone Traffic Problem */}
          {selectedSubcategory === 'traffic_school_zone_traffic' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">School Name & Location *</label>
                  <input
                    type="text"
                    value={formData.school_location}
                    onChange={(e) => handleChange('school_location', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Safety Issue *</label>
                  <input
                    type="text"
                    value={formData.school_safety_issue}
                    onChange={(e) => handleChange('school_safety_issue', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-amber-950">Peak Time of Hazard *</label>
                  <input
                    type="text"
                    value={formData.school_peak_time}
                    onChange={(e) => handleChange('school_peak_time', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* COMMON CONTACT & LOCATION SECTION */}
          <div className="p-4 bg-red-50/70 rounded-2xl border border-red-300 space-y-4">
            <h5 className="font-black text-red-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-red-700" />
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
                <label className="font-bold text-amber-950">Incident Location / Junction *</label>
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
                  className="w-full bg-red-100 border border-red-300 rounded-xl p-2 text-xs text-red-950 font-bold"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-amber-950">Urgency Level *</label>
                <select
                  value={formData.urgency_level}
                  onChange={(e) => handleChange('urgency_level', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs font-bold text-slate-800"
                >
                  <option value="Emergency">Emergency (Immediate Gridlock / Accident Obstruction)</option>
                  <option value="High">High (Within 2 Hours)</option>
                  <option value="Medium">Medium (Within 24 Hours)</option>
                  <option value="Low">Low (General Infrastructure Request)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-red-600 to-amber-700 text-white font-bold text-xs rounded-xl shadow-lg hover:opacity-95 flex items-center justify-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>Dispatch to Traffic Police & Transport Directorate</span>
          </button>
        </form>
      </div>
    </div>
  );
}
