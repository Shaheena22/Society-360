import React, { useState } from 'react';
import {
  AlertTriangle, Phone, Flame, Car, Building2, Waves, Mountain,
  TreePine, ShieldAlert, CheckCircle2, Clock, MapPin, Camera,
  Mic, AlertCircle, ArrowLeft, Send, Check, X, ChevronRight, Siren
} from 'lucide-react';
import { api } from '../services/api';

export const EMERGENCY_SECTIONS = [
  {
    id: 'emergency_fire',
    title: '1. Fire Emergency',
    icon: '🔥',
    color: 'from-red-800 to-orange-900',
    border: 'border-red-400',
    desc: 'Building fires, vehicle blazes, electrical & forest fires with instant 101 dispatch'
  },
  {
    id: 'emergency_accident',
    title: '2. Accident Reporting',
    icon: '🚑',
    color: 'from-rose-800 to-red-900',
    border: 'border-rose-400',
    desc: 'Road collisions, pedestrian accidents, ambulance dispatch & traffic clearance'
  },
  {
    id: 'emergency_building_safety',
    title: '3. Building Safety Hazard',
    icon: '🏢',
    color: 'from-amber-800 to-stone-900',
    border: 'border-amber-400',
    desc: 'Structural cracks, collapse risk, gas leaks, unsafe balconies & occupant evacuation'
  },
  {
    id: 'emergency_flood',
    title: '4. Flood Reporting',
    icon: '🌊',
    color: 'from-blue-800 to-cyan-900',
    border: 'border-blue-400',
    desc: 'Road flooding, submerged underpasses, river overflow, trapped residents & SDRF rescue'
  },
  {
    id: 'emergency_landslide',
    title: '5. Landslide Reporting',
    icon: '⛰️',
    color: 'from-stone-800 to-amber-950',
    border: 'border-stone-400',
    desc: 'Slope collapse, rockfall road blockage, mudflows & slope stabilization response'
  },
  {
    id: 'emergency_fallen_tree',
    title: '6. Fallen Tree',
    icon: '🌳',
    color: 'from-emerald-800 to-green-900',
    border: 'border-emerald-400',
    desc: 'Uprooted trees blocking roads, fallen on power lines/vehicles & chainsaw clearance'
  }
];

export default function EmergencySafetyDashboard({ speakText, currentUser, initialFeatureModule, onBack }) {
  const [activeSubcategory, setActiveSubcategory] = useState(initialFeatureModule || null);
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State for each emergency category
  const [formData, setFormData] = useState({
    // 1. Fire Emergency
    fire_incident_type: 'Building Fire (Commercial / Residential)',
    fire_address: 'Main Market Complex, Ward 12, Kalaburagi',
    fire_landmark: 'Near Central Bank Building',
    fire_datetime: new Date().toISOString().slice(0, 16),
    fire_description: '',
    fire_severity: 'Critical',
    fire_trapped: 'No',
    fire_injured_count: '0',
    fire_nearby_hazards: 'Gas cylinders on ground floor, overhead electrical transformer',
    fire_complainant_name: currentUser?.name || 'Anita Deshmukh',
    fire_mobile_number: currentUser?.phone || '+91 98765 43210',
    fire_gps: '17.1582, 76.8422 (Ward 12)',
    fire_photo: null,

    // 2. Accident Reporting
    accident_type: 'Vehicle Collision (Car & Two-Wheeler)',
    accident_location: 'Ring Road Junction, Near Flyover, Kalaburagi',
    accident_landmark: 'Opposite HP Petrol Pump',
    accident_datetime: new Date().toISOString().slice(0, 16),
    accident_vehicles_involved: '2 (Car & Bike)',
    accident_vehicle_details: 'KA-32-M-4821 (White Sedan), KA-32-EE-1092 (Motorcycle)',
    accident_injured_count: '1',
    accident_seriously_injured: 'Yes',
    accident_ambulance_required: 'Yes',
    accident_traffic_obstruction: 'Yes',
    accident_description: '',
    accident_witness_details: 'Shopkeeper at petrol pump tea stall',
    accident_gps: '17.1590, 76.8430',
    accident_name: currentUser?.name || 'Anita Deshmukh',
    accident_phone: currentUser?.phone || '+91 98765 43210',
    accident_photo: null,

    // 3. Building Safety Hazard
    bld_hazard_type: 'Structural Cracks & Balcony Collapse Risk',
    bld_address: 'Building #42, Shivaji Nagar Main Road, Ward 12',
    bld_type: 'Residential Apartment (G+4)',
    bld_floors: '4 Floors',
    bld_location_within: 'Pillar #3 & 2nd Floor Balcony Slab',
    bld_description: '',
    bld_severity: 'High - Serious Collapse Risk',
    bld_occupied: 'Yes',
    bld_people_at_risk: '16 Families (~60 People)',
    bld_datetime_noticed: new Date().toISOString().slice(0, 16),
    bld_gps: '17.1575, 76.8410',
    bld_name: currentUser?.name || 'Anita Deshmukh',
    bld_phone: currentUser?.phone || '+91 98765 43210',
    bld_photo: null,

    // 4. Flood Reporting
    flood_type: 'Road & Underpass Waterlogging / Drainage Overflow',
    flood_location: 'Railway Station Underpass & Colony Road, Kalaburagi',
    flood_landmark: 'Near Station West Gate',
    flood_datetime: new Date().toISOString().slice(0, 16),
    flood_water_level: 'High (3 to 4 Feet Submerged)',
    flood_area_affected: 'Approx 500 meters stretch, 20 shops',
    flood_people_affected: '200+ commuters & local residents',
    flood_houses_affected: '12 ground-floor houses & 8 shops',
    flood_roads_blocked: 'Yes',
    flood_electricity_affected: 'Yes',
    flood_trapped: 'No',
    flood_evacuation: 'Yes',
    flood_gps: '17.1560, 76.8440',
    flood_name: currentUser?.name || 'Anita Deshmukh',
    flood_phone: currentUser?.phone || '+91 98765 43210',
    flood_photo: null,

    // 5. Landslide Reporting
    landslide_type: 'Hill Slope Collapse & Rockfall Road Blockage',
    landslide_location: 'Ghat Section Road, Outer Ring Route',
    landslide_landmark: 'Near Viewpoint Km Stone 14',
    landslide_datetime: new Date().toISOString().slice(0, 16),
    landslide_severity: 'Major Slope Failure (Entire lane blocked)',
    landslide_road_blocked: 'Yes',
    landslide_buildings_affected: 'No',
    landslide_trapped_injured: 'No',
    landslide_vehicles_affected: '1 Truck stranded safely',
    landslide_affected_area: 'Approx 80 meters road stretch',
    landslide_risk_further: 'High (Active rain & loose gravel)',
    landslide_gps: '17.1620, 76.8500',
    landslide_name: currentUser?.name || 'Anita Deshmukh',
    landslide_phone: currentUser?.phone || '+91 98765 43210',
    landslide_photo: null,

    // 6. Fallen Tree
    tree_location: 'Court Road, Opposite Civil Hospital Main Gate',
    tree_landmark: 'Near Govt Hospital Gate #2',
    tree_datetime: new Date().toISOString().slice(0, 16),
    tree_cause: 'Heavy Rain & Wind Storm',
    tree_blocking_road: 'Yes',
    tree_on_building: 'No',
    tree_on_vehicle: 'Yes (1 Parked Car Damaged)',
    tree_wires_affected: 'Yes (HT Power Cable Snapped)',
    tree_injured: 'No',
    tree_traffic_obstruction: 'Complete',
    tree_urgency: 'Emergency / Immediate Removal',
    tree_gps: '17.1585, 76.8415',
    tree_name: currentUser?.name || 'Anita Deshmukh',
    tree_phone: currentUser?.phone || '+91 98765 43210',
    tree_photo: null
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field, e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, [field]: url }));
      if (speakText) speakText('Emergency photo evidence attached.');
    }
  };

  const handleSubmitSection = async (categoryId) => {
    setIsSubmitting(true);
    let title = '';
    let description = '';
    let address = 'Kalaburagi City';
    let customFields = {};
    let priority = 'High';

    if (categoryId === 'emergency_fire') {
      title = 'Fire Emergency Rapid Alert';
      address = formData.fire_address;
      priority = formData.fire_severity === 'Critical' ? 'High' : 'High';
      customFields = {
        incidentType: formData.fire_incident_type,
        exactAddress: formData.fire_address,
        landmark: formData.fire_landmark,
        dateTimeOfIncident: formData.fire_datetime,
        description: formData.fire_description,
        severity: formData.fire_severity,
        anyoneTrapped: formData.fire_trapped,
        peopleInjuredCount: formData.fire_injured_count,
        nearbyHazards: formData.fire_nearby_hazards,
        complainantName: formData.fire_complainant_name,
        mobileNumber: formData.fire_mobile_number,
        gpsLocation: formData.fire_gps
      };
      description = `[FIRE EMERGENCY] ${formData.fire_incident_type} at ${formData.fire_address} (Near ${formData.fire_landmark}). Severity: ${formData.fire_severity}. Trapped: ${formData.fire_trapped}. Injured: ${formData.fire_injured_count}. Hazards: ${formData.fire_nearby_hazards}. Complainant: ${formData.fire_complainant_name} (${formData.fire_mobile_number}). GPS: ${formData.fire_gps}. Details: ${formData.fire_description || 'Fire emergency reported for immediate 101 dispatch.'}`;
    } else if (categoryId === 'emergency_accident') {
      title = 'Accident Reporting Emergency';
      address = formData.accident_location;
      priority = 'High';
      customFields = {
        accidentType: formData.accident_type,
        exactLocation: formData.accident_location,
        landmark: formData.accident_landmark,
        dateTime: formData.accident_datetime,
        vehiclesInvolvedCount: formData.accident_vehicles_involved,
        vehicleDetails: formData.accident_vehicle_details,
        injuredPeopleCount: formData.accident_injured_count,
        seriouslyInjured: formData.accident_seriously_injured,
        ambulanceRequired: formData.accident_ambulance_required,
        trafficObstruction: formData.accident_traffic_obstruction,
        description: formData.accident_description,
        witnessDetails: formData.accident_witness_details,
        gpsLocation: formData.accident_gps,
        complainantName: formData.accident_name,
        mobileNumber: formData.accident_phone
      };
      description = `[ACCIDENT REPORT] ${formData.accident_type} at ${formData.accident_location} (Near ${formData.accident_landmark}). Vehicles: ${formData.accident_vehicle_details}. Injured: ${formData.accident_injured_count} (Serious: ${formData.accident_seriously_injured}). Ambulance needed: ${formData.accident_ambulance_required}. Traffic blocked: ${formData.accident_traffic_obstruction}. Complainant: ${formData.accident_name} (${formData.accident_phone}). Details: ${formData.accident_description || 'Accident reported.'}`;
    } else if (categoryId === 'emergency_building_safety') {
      title = 'Building Safety Hazard Alert';
      address = formData.bld_address;
      priority = 'High';
      customFields = {
        hazardType: formData.bld_hazard_type,
        buildingAddress: formData.bld_address,
        buildingType: formData.bld_type,
        numberOfFloors: formData.bld_floors,
        locationWithinBuilding: formData.bld_location_within,
        description: formData.bld_description,
        severityLevel: formData.bld_severity,
        isOccupied: formData.bld_occupied,
        peopleAtRiskCount: formData.bld_people_at_risk,
        dateTimeNoticed: formData.bld_datetime_noticed,
        gpsLocation: formData.bld_gps,
        complainantName: formData.bld_name,
        contactNumber: formData.bld_phone
      };
      description = `[BUILDING SAFETY HAZARD] ${formData.bld_hazard_type} at ${formData.bld_address} (${formData.bld_type}, ${formData.bld_floors}). Spot: ${formData.bld_location_within}. Severity: ${formData.bld_severity}. Occupied: ${formData.bld_occupied} (~${formData.bld_people_at_risk} at risk). Complainant: ${formData.bld_name} (${formData.bld_phone}). Details: ${formData.bld_description || 'Building safety hazard reported.'}`;
    } else if (categoryId === 'emergency_flood') {
      title = 'Flood & Waterlogging Emergency';
      address = formData.flood_location;
      priority = 'High';
      customFields = {
        floodType: formData.flood_type,
        exactLocation: formData.flood_location,
        landmark: formData.flood_landmark,
        dateTime: formData.flood_datetime,
        waterLevel: formData.flood_water_level,
        areaAffected: formData.flood_area_affected,
        peopleAffectedCount: formData.flood_people_affected,
        housesAffectedCount: formData.flood_houses_affected,
        roadsBlocked: formData.flood_roads_blocked,
        electricityAffected: formData.flood_electricity_affected,
        peopleTrapped: formData.flood_trapped,
        evacuationRequired: formData.flood_evacuation,
        gpsLocation: formData.flood_gps,
        complainantName: formData.flood_name,
        mobileNumber: formData.flood_phone
      };
      description = `[FLOOD REPORT] ${formData.flood_type} at ${formData.flood_location} (Near ${formData.flood_landmark}). Water Level: ${formData.flood_water_level}. Area: ${formData.flood_area_affected}. Houses: ${formData.flood_houses_affected}. Roads blocked: ${formData.flood_roads_blocked}, Power off: ${formData.flood_electricity_affected}, Evacuation needed: ${formData.flood_evacuation}. Complainant: ${formData.flood_name} (${formData.flood_phone}).`;
    } else if (categoryId === 'emergency_landslide') {
      title = 'Landslide & Slope Collapse Alert';
      address = formData.landslide_location;
      priority = 'High';
      customFields = {
        landslideType: formData.landslide_type,
        exactLocation: formData.landslide_location,
        landmark: formData.landslide_landmark,
        dateTime: formData.landslide_datetime,
        sizeSeverity: formData.landslide_severity,
        roadBlocked: formData.landslide_road_blocked,
        buildingsAffected: formData.landslide_buildings_affected,
        peopleTrappedInjured: formData.landslide_trapped_injured,
        vehiclesAffected: formData.landslide_vehicles_affected,
        affectedArea: formData.landslide_affected_area,
        riskOfFurtherLandslide: formData.landslide_risk_further,
        gpsLocation: formData.landslide_gps,
        complainantName: formData.landslide_name,
        contactNumber: formData.landslide_phone
      };
      description = `[LANDSLIDE REPORT] ${formData.landslide_type} at ${formData.landslide_location} (Near ${formData.landslide_landmark}). Severity: ${formData.landslide_severity}. Road Blocked: ${formData.landslide_road_blocked}. Vehicles: ${formData.landslide_vehicles_affected}. Further Risk: ${formData.landslide_risk_further}. Complainant: ${formData.landslide_name} (${formData.landslide_phone}).`;
    } else if (categoryId === 'emergency_fallen_tree') {
      title = 'Fallen Tree Road Clearance Request';
      address = formData.tree_location;
      priority = 'High';
      customFields = {
        exactLocation: formData.tree_location,
        landmark: formData.tree_landmark,
        dateTime: formData.tree_datetime,
        cause: formData.tree_cause,
        treeBlockingRoad: formData.tree_blocking_road,
        treeFallenOnBuilding: formData.tree_on_building,
        treeFallenOnVehicle: formData.tree_on_vehicle,
        electricalWiresAffected: formData.tree_wires_affected,
        peopleInjured: formData.tree_injured,
        trafficObstruction: formData.tree_traffic_obstruction,
        urgencyLevel: formData.tree_urgency,
        gpsLocation: formData.tree_gps,
        complainantName: formData.tree_name,
        mobileNumber: formData.tree_phone
      };
      description = `[FALLEN TREE HAZARD] Fallen tree at ${formData.tree_location} (Near ${formData.tree_landmark}). Cause: ${formData.tree_cause}. Traffic Obstruction: ${formData.tree_traffic_obstruction}. Power wires affected: ${formData.tree_wires_affected}, Vehicle hit: ${formData.tree_on_vehicle}. Urgency: ${formData.tree_urgency}. Complainant: ${formData.tree_name} (${formData.tree_phone}).`;
    }

    const payload = {
      reporterId: currentUser?.uid || 'usr-citizen-1',
      reporterName: currentUser?.name || 'Anita Deshmukh',
      category: categoryId,
      subcategory: categoryId,
      customFields,
      rawDescription: description,
      inputMode: 'text',
      languageUsed: 'English',
      mediaUrls: [],
      priority,
      location: {
        lat: 17.1582 + (Math.random() - 0.5) * 0.04,
        lng: 76.8422 + (Math.random() - 0.5) * 0.04,
        address,
        ward: 'Ward 12'
      }
    };

    try {
      const res = await api.createComplaint(payload);
      setIsSubmitting(false);
      if (res.success) {
        setSubmitSuccess(res.message || `${title} dispatched with urgent priority to Emergency Disaster Operations Center.`);
        if (speakText) speakText(`${title} dispatched immediately to Emergency Command.`);
      }
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  const selectedCategoryObj = EMERGENCY_SECTIONS.find(s => s.id === activeSubcategory);

  return (
    <div className="space-y-6 font-outfit text-amber-950">
      
      {/* 1. TOP ETHNIC HERO BANNER FOR EMERGENCY & DISASTER RESPONSE */}
      <div className="ethnic-card p-6 rounded-3xl bg-gradient-to-r from-red-950 via-slate-900 to-amber-950 text-white border-2 border-red-500 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-rose-300 font-bold text-xs uppercase tracking-wider mb-1 font-cinzel">
            <Siren className="w-4 h-4 text-rose-400 animate-pulse" />
            <span>Disaster Management & Emergency Response Cell • Kalaburagi District</span>
          </div>
          <h2 className="text-2xl font-black font-cinzel text-white flex items-center gap-2">
            <span>Public Safety & Emergency Operations</span>
            <span className="text-2xl">🚨</span>
          </h2>
          <p className="text-xs text-amber-100/90 mt-1 font-bold">
            24x7 Rapid Dispatch: Fire 101 • Ambulance 108 • National Emergency 112 • SDRF Disaster 1077
          </p>
        </div>

        {/* Rapid SOS Buttons */}
        <div className="flex items-center space-x-2 shrink-0 flex-wrap gap-2">
          <a
            href="tel:101"
            className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1 shadow-md animate-bounce"
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Call Fire (101)</span>
          </a>
          <a
            href="tel:108"
            className="px-3.5 py-1.5 bg-rose-700 hover:bg-rose-800 text-white rounded-xl text-xs font-bold flex items-center space-x-1 shadow-md"
          >
            <Car className="w-3.5 h-3.5" />
            <span>Call 108 Ambulance</span>
          </a>
        </div>
      </div>

      {/* 2. EMERGENCY HOTLINE DIRECTORY */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <a
          href="tel:101"
          className="p-3 rounded-2xl bg-red-50 border-2 border-red-300 hover:border-red-500 text-red-950 flex items-center space-x-2.5 transition-all shadow-sm group"
        >
          <span className="text-2xl p-1.5 rounded-xl bg-red-200 border border-red-300">🔥</span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-red-700">Fire Brigade</p>
            <p className="text-sm font-black text-red-950 group-hover:text-red-700">101 Emergency</p>
          </div>
        </a>

        <a
          href="tel:108"
          className="p-3 rounded-2xl bg-rose-50 border-2 border-rose-300 hover:border-rose-500 text-rose-950 flex items-center space-x-2.5 transition-all shadow-sm group"
        >
          <span className="text-2xl p-1.5 rounded-xl bg-rose-200 border border-rose-300">🚑</span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-rose-700">Trauma Ambulance</p>
            <p className="text-sm font-black text-rose-950 group-hover:text-rose-700">108 Rapid Care</p>
          </div>
        </a>

        <a
          href="tel:112"
          className="p-3 rounded-2xl bg-amber-50 border-2 border-amber-300 hover:border-amber-500 text-amber-950 flex items-center space-x-2.5 transition-all shadow-sm group"
        >
          <span className="text-2xl p-1.5 rounded-xl bg-amber-200 border border-amber-300">🚨</span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-amber-700">National Emergency</p>
            <p className="text-sm font-black text-amber-950 group-hover:text-amber-700">112 Unified</p>
          </div>
        </a>

        <a
          href="tel:1077"
          className="p-3 rounded-2xl bg-blue-50 border-2 border-blue-300 hover:border-blue-500 text-blue-950 flex items-center space-x-2.5 transition-all shadow-sm group"
        >
          <span className="text-2xl p-1.5 rounded-xl bg-blue-200 border border-blue-300">🌊</span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-blue-700">Disaster Control</p>
            <p className="text-sm font-black text-blue-950 group-hover:text-blue-700">1077 SDRF Help</p>
          </div>
        </a>
      </div>

      {/* NOTIFICATION MESSAGE */}
      {submitSuccess && (
        <div className="p-4 bg-emerald-50 border-2 border-emerald-400 rounded-2xl text-xs font-bold text-emerald-900 flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{submitSuccess}</span>
          </div>
          <button onClick={() => setSubmitSuccess(null)} className="text-emerald-700 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. MAIN SECTION HUB: SELECT SPECIFIC EMERGENCY SUBCATEGORY (1-by-1) */}
      {/* ========================================================================= */}
      {activeSubcategory === null && (
        <div className="space-y-4">
          <div className="text-center space-y-1">
            <h3 className="text-lg font-black font-cinzel text-amber-950">Select Emergency Situation to Dispatch</h3>
            <p className="text-xs text-amber-800/80 font-bold">Choose one of the 6 emergency domains below for instantaneous response coordination</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {EMERGENCY_SECTIONS.map((sec) => (
              <button
                key={sec.id}
                onClick={() => {
                  setActiveSubcategory(sec.id);
                  if (speakText) speakText(`Selected ${sec.title}. Opening emergency report form.`);
                }}
                className={`ethnic-card p-5 rounded-3xl text-left space-y-3 hover:scale-[1.02] transition-transform gold-glow border-2 ${sec.border} group`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl p-2 rounded-2xl bg-amber-100 border border-amber-300">{sec.icon}</span>
                  <ChevronRight className="w-5 h-5 text-amber-700 group-hover:translate-x-1 transition-transform" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-amber-950 group-hover:text-red-700 leading-tight">
                    {sec.title}
                  </h4>
                  <p className="text-[11px] text-amber-800/80 mt-1 leading-snug">
                    {sec.desc}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* ACTIVE EMERGENCY READINESS WIDGET */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="ethnic-card p-5 rounded-3xl border-2 border-red-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-red-950 font-cinzel flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
                  Fire & Rescue Station Readiness (Kalaburagi)
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-bold border border-emerald-300">
                  4 Units on Standby
                </span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-800">
                <div className="p-2.5 bg-red-50/70 rounded-xl border border-red-200 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-red-950">Central Fire Station Kalaburagi</p>
                    <p className="text-[10px] text-red-800">Main Road • Response Time: &lt;7 Mins</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 font-mono">Ready 🚒</span>
                </div>
              </div>
            </div>

            <div className="ethnic-card p-5 rounded-3xl border-2 border-amber-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-amber-950 font-cinzel flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-amber-700" />
                  District Disaster Management Authority (DDMA)
                </span>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 text-[10px] font-bold border border-blue-300">
                  24x7 Control Room
                </span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-800">
                <div className="p-2.5 bg-amber-50/70 rounded-xl border border-amber-200 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-amber-950">SDRF Emergency Water & Tree Clearance Unit</p>
                    <p className="text-[10px] text-amber-800">Hydraulic Cutters & Heavy Pumpers Deployed</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 font-mono">Active 🚨</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. DEDICATED CUSTOM SUB-PORTALS FOR EACH OF THE 6 EMERGENCY CATEGORIES */}
      {/* ========================================================================= */}
      {activeSubcategory && selectedCategoryObj && (
        <div className="ethnic-card p-6 rounded-3xl space-y-6 shadow-xl gold-glow border-2 border-red-400">
          
          {/* Header & Back Button */}
          <div className="flex items-center justify-between border-b border-amber-200 pb-4">
            <button
              onClick={() => setActiveSubcategory(null)}
              className="px-3.5 py-1.5 rounded-xl bg-amber-100 text-amber-950 hover:bg-amber-200 text-xs font-bold flex items-center space-x-1 border border-amber-300"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Emergency Modules</span>
            </button>

            <div className="text-right">
              <span className="px-3 py-1 rounded-full bg-red-100 text-red-900 text-xs font-bold border border-red-300">
                {selectedCategoryObj.icon} {selectedCategoryObj.title}
              </span>
            </div>
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* FORM 1: FIRE EMERGENCY */}
          {/* --------------------------------------------------------------------- */}
          {activeSubcategory === 'emergency_fire' && (
            <form onSubmit={(e) => { e.preventDefault(); handleSubmitSection(activeSubcategory); }} className="space-y-4">
              <div className="p-3 bg-red-50 rounded-2xl border border-red-300 text-xs text-red-950 font-bold flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-red-600 shrink-0" />
                  <span>Immediate Life-Safety Protocol: Dispatches simultaneously to Fire Station & Police Control.</span>
                </div>
                <a href="tel:101" className="px-3 py-1 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700">
                  Call 101 Now
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Complaint / Incident Type *</label>
                  <select
                    value={formData.fire_incident_type}
                    onChange={(e) => handleInputChange('fire_incident_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                  >
                    <option>Building Fire (Commercial / Residential)</option>
                    <option>Vehicle Fire (Car / Bus / Truck / Two-Wheeler)</option>
                    <option>Electrical Fire / Transformer Sparking</option>
                    <option>Forest Fire / Grassland Blaze</option>
                    <option>Industrial / Chemical Fire</option>
                    <option>Garbage / Open Waste Fire</option>
                    <option>Other Fire Emergency</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Exact Location / Address *</label>
                  <input
                    type="text"
                    required
                    value={formData.fire_address}
                    onChange={(e) => handleInputChange('fire_address', e.target.value)}
                    placeholder="Building name, street, road address"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Landmark *</label>
                  <input
                    type="text"
                    required
                    value={formData.fire_landmark}
                    onChange={(e) => handleInputChange('fire_landmark', e.target.value)}
                    placeholder="Prominent nearby building or landmark"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Date and Time of Incident *</label>
                  <input
                    type="datetime-local"
                    value={formData.fire_datetime}
                    onChange={(e) => handleInputChange('fire_datetime', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Severity Level *</label>
                  <select
                    value={formData.fire_severity}
                    onChange={(e) => handleInputChange('fire_severity', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                  >
                    <option value="Low">Low - Contained / Minor Smoke</option>
                    <option value="Medium">Medium - Spreading Fire</option>
                    <option value="Critical">Critical - Major Blaze / Life Threat</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Is Anyone Trapped? *</label>
                  <div className="flex items-center space-x-4 pt-1.5">
                    {['Yes', 'No'].map((opt) => (
                      <label key={opt} className="flex items-center space-x-1.5 cursor-pointer text-xs font-bold">
                        <input
                          type="radio"
                          name="fire_trapped"
                          checked={formData.fire_trapped === opt}
                          onChange={() => handleInputChange('fire_trapped', opt)}
                        />
                        <span className={opt === 'Yes' ? 'text-red-700 font-black' : 'text-slate-800'}>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Number of People Affected / Injured</label>
                  <input
                    type="text"
                    value={formData.fire_injured_count}
                    onChange={(e) => handleInputChange('fire_injured_count', e.target.value)}
                    placeholder="E.g. 0, 2 people, multiple"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Nearby Hazards *</label>
                  <input
                    type="text"
                    required
                    value={formData.fire_nearby_hazards}
                    onChange={(e) => handleInputChange('fire_nearby_hazards', e.target.value)}
                    placeholder="Gas cylinders, chemical drums, electrical transformer, fuel tank"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Description of the Fire *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.fire_description}
                  onChange={(e) => handleInputChange('fire_description', e.target.value)}
                  placeholder="Describe color of smoke, intensity, floors on fire, escape status..."
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Complainant Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fire_complainant_name}
                    onChange={(e) => handleInputChange('fire_complainant_name', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Mobile Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.fire_mobile_number}
                    onChange={(e) => handleInputChange('fire_mobile_number', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Current Location / GPS *</label>
                  <input
                    type="text"
                    value={formData.fire_gps}
                    onChange={(e) => handleInputChange('fire_gps', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Photo / Video Evidence</label>
                <label className="flex items-center space-x-2 px-4 py-2.5 bg-amber-50 border border-amber-300 rounded-xl text-xs font-bold cursor-pointer hover:bg-amber-100">
                  <Camera className="w-4 h-4 text-amber-700" />
                  <span>{formData.fire_photo ? 'Fire Photo Attached' : 'Attach Fire Photo Evidence'}</span>
                  <input type="file" accept="image/*" onChange={(e) => handleFileUpload('fire_photo', e)} className="hidden" />
                </label>
                {formData.fire_photo && (
                  <img src={formData.fire_photo} alt="Fire preview" className="w-24 h-24 object-cover rounded-xl border border-red-400 mt-1" />
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-gradient-to-r from-red-700 via-orange-600 to-red-600 text-white font-bold text-xs rounded-xl shadow-lg hover:opacity-95 flex items-center justify-center space-x-2 border border-red-400"
              >
                <span>Dispatch Fire Brigade Rapid Engine (101 SLA)</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* --------------------------------------------------------------------- */}
          {/* FORM 2: ACCIDENT REPORTING */}
          {/* --------------------------------------------------------------------- */}
          {activeSubcategory === 'emergency_accident' && (
            <form onSubmit={(e) => { e.preventDefault(); handleSubmitSection(activeSubcategory); }} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Accident Type *</label>
                  <select
                    value={formData.accident_type}
                    onChange={(e) => handleInputChange('accident_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                  >
                    <option>Road Accident (Vehicle Collision)</option>
                    <option>Pedestrian Hit & Run</option>
                    <option>Two-Wheeler Skid / Crash</option>
                    <option>Heavy Vehicle (Bus / Truck) Overturning</option>
                    <option>Multi-Vehicle Pile-up</option>
                    <option>Other Accident</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Exact Accident Location *</label>
                  <input
                    type="text"
                    required
                    value={formData.accident_location}
                    onChange={(e) => handleInputChange('accident_location', e.target.value)}
                    placeholder="Road, flyover, cross or junction"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Landmark *</label>
                  <input
                    type="text"
                    required
                    value={formData.accident_landmark}
                    onChange={(e) => handleInputChange('accident_landmark', e.target.value)}
                    placeholder="Nearby petrol pump, signal, hotel"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Date and Time *</label>
                  <input
                    type="datetime-local"
                    value={formData.accident_datetime}
                    onChange={(e) => handleInputChange('accident_datetime', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Number of Vehicles Involved *</label>
                  <input
                    type="text"
                    required
                    value={formData.accident_vehicles_involved}
                    onChange={(e) => handleInputChange('accident_vehicles_involved', e.target.value)}
                    placeholder="E.g. 2 vehicles"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Vehicle Details / Registration Numbers</label>
                  <input
                    type="text"
                    value={formData.accident_vehicle_details}
                    onChange={(e) => handleInputChange('accident_vehicle_details', e.target.value)}
                    placeholder="E.g. KA-32-M-4821 (Car), KA-32-EE-1092 (Bike)"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>
              </div>

              {/* Injury & Triage Assessment */}
              <div className="p-3.5 bg-rose-50 rounded-2xl border border-rose-300 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="font-bold text-rose-950 block">Number of Injured People *</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={formData.accident_injured_count}
                    onChange={(e) => handleInputChange('accident_injured_count', e.target.value)}
                    className="w-full bg-white border border-rose-300 rounded-xl p-1.5 text-xs mt-1 font-bold"
                  />
                </div>

                <div>
                  <label className="font-bold text-rose-950 block">Seriously Injured? *</label>
                  <div className="flex items-center space-x-3 pt-1.5">
                    {['Yes', 'No'].map((opt) => (
                      <label key={opt} className="flex items-center space-x-1 font-bold cursor-pointer text-rose-900">
                        <input
                          type="radio"
                          name="acc_serious"
                          checked={formData.accident_seriously_injured === opt}
                          onChange={() => handleInputChange('accident_seriously_injured', opt)}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-bold text-rose-950 block">Ambulance Required? *</label>
                  <div className="flex items-center space-x-3 pt-1.5">
                    {['Yes', 'No'].map((opt) => (
                      <label key={opt} className="flex items-center space-x-1 font-bold cursor-pointer text-rose-900">
                        <input
                          type="radio"
                          name="acc_amb"
                          checked={formData.accident_ambulance_required === opt}
                          onChange={() => handleInputChange('accident_ambulance_required', opt)}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-bold text-rose-950 block">Traffic Obstruction? *</label>
                  <div className="flex items-center space-x-3 pt-1.5">
                    {['Yes', 'No'].map((opt) => (
                      <label key={opt} className="flex items-center space-x-1 font-bold cursor-pointer text-rose-900">
                        <input
                          type="radio"
                          name="acc_traffic"
                          checked={formData.accident_traffic_obstruction === opt}
                          onChange={() => handleInputChange('accident_traffic_obstruction', opt)}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Brief Description of Accident *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.accident_description}
                  onChange={(e) => handleInputChange('accident_description', e.target.value)}
                  placeholder="Describe how the crash occurred and current scene status..."
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Witness Details (if available)</label>
                  <input
                    type="text"
                    value={formData.accident_witness_details}
                    onChange={(e) => handleInputChange('accident_witness_details', e.target.value)}
                    placeholder="Bystander or shop info"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Complainant Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.accident_name}
                    onChange={(e) => handleInputChange('accident_name', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Mobile Number & GPS *</label>
                  <input
                    type="text"
                    required
                    value={formData.accident_phone}
                    onChange={(e) => handleInputChange('accident_phone', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Photo / Video Evidence</label>
                <label className="flex items-center space-x-2 px-4 py-2.5 bg-amber-50 border border-amber-300 rounded-xl text-xs font-bold cursor-pointer hover:bg-amber-100">
                  <Camera className="w-4 h-4 text-amber-700" />
                  <span>{formData.accident_photo ? 'Accident Photo Attached' : 'Attach Photo Evidence'}</span>
                  <input type="file" accept="image/*" onChange={(e) => handleFileUpload('accident_photo', e)} className="hidden" />
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-rose-800 to-red-700 text-white font-bold text-xs rounded-xl shadow-md hover:opacity-95 flex items-center justify-center space-x-2 border border-rose-300"
              >
                <span>Dispatch Accident Response, 108 Ambulance & Traffic Patrol</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* --------------------------------------------------------------------- */}
          {/* FORM 3: BUILDING SAFETY HAZARD */}
          {/* --------------------------------------------------------------------- */}
          {activeSubcategory === 'emergency_building_safety' && (
            <form onSubmit={(e) => { e.preventDefault(); handleSubmitSection(activeSubcategory); }} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Hazard Type *</label>
                  <select
                    value={formData.bld_hazard_type}
                    onChange={(e) => handleInputChange('bld_hazard_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                  >
                    <option>Structural Cracks & Balcony Collapse Risk</option>
                    <option>Severe Foundation Subsidence / Tilting</option>
                    <option>Dilapidated / Unsafe Old Building</option>
                    <option>Exposed High-Voltage Electrical Wiring in Lobby</option>
                    <option>Commercial Gas Cylinder Leakage Risk</option>
                    <option>Illegal Rooftop Construction Load Hazard</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Building Address *</label>
                  <input
                    type="text"
                    required
                    value={formData.bld_address}
                    onChange={(e) => handleInputChange('bld_address', e.target.value)}
                    placeholder="Building name, plot #, street"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Building Type *</label>
                  <select
                    value={formData.bld_type}
                    onChange={(e) => handleInputChange('bld_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-medium"
                  >
                    <option>Residential Apartment</option>
                    <option>Commercial Complex / Mall</option>
                    <option>Public / Government Building</option>
                    <option>School / Hospital Structure</option>
                    <option>Industrial Warehouse</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Number of Floors *</label>
                  <input
                    type="text"
                    required
                    value={formData.bld_floors}
                    onChange={(e) => handleInputChange('bld_floors', e.target.value)}
                    placeholder="E.g. 4 Floors, Ground + 2"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Exact Location Within Building *</label>
                  <input
                    type="text"
                    required
                    value={formData.bld_location_within}
                    onChange={(e) => handleInputChange('bld_location_within', e.target.value)}
                    placeholder="E.g. Basement pillar, 2nd floor balcony, roof"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Severity Level *</label>
                  <select
                    value={formData.bld_severity}
                    onChange={(e) => handleInputChange('bld_severity', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                  >
                    <option value="Low">Low - Maintenance Inspection Required</option>
                    <option value="Medium">Medium - Visible Hazard</option>
                    <option value="High">High - Serious Collapse Risk</option>
                    <option value="Critical">Critical - Imminent Danger / Evacuation Required</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Description of the Hazard *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.bld_description}
                  onChange={(e) => handleInputChange('bld_description', e.target.value)}
                  placeholder="Detail visible cracks, falling debris, creaking sounds, gas smell..."
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Is Building Occupied? *</label>
                  <div className="flex items-center space-x-4 pt-1.5">
                    {['Yes', 'No'].map((opt) => (
                      <label key={opt} className="flex items-center space-x-1.5 cursor-pointer text-xs font-bold">
                        <input
                          type="radio"
                          name="bld_occ"
                          checked={formData.bld_occupied === opt}
                          onChange={() => handleInputChange('bld_occupied', opt)}
                        />
                        <span className={opt === 'Yes' ? 'text-amber-950' : 'text-slate-800'}>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Approx People at Risk *</label>
                  <input
                    type="text"
                    required
                    value={formData.bld_people_at_risk}
                    onChange={(e) => handleInputChange('bld_people_at_risk', e.target.value)}
                    placeholder="E.g. 50 residents"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Date / Time Noticed *</label>
                  <input
                    type="datetime-local"
                    value={formData.bld_datetime_noticed}
                    onChange={(e) => handleInputChange('bld_datetime_noticed', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Complainant Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.bld_name}
                    onChange={(e) => handleInputChange('bld_name', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Contact Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.bld_phone}
                    onChange={(e) => handleInputChange('bld_phone', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Photo / Video Evidence</label>
                  <label className="flex items-center space-x-2 px-4 py-2.5 bg-amber-50 border border-amber-300 rounded-xl text-xs font-bold cursor-pointer hover:bg-amber-100">
                    <Camera className="w-4 h-4 text-amber-700" />
                    <span>{formData.bld_photo ? 'Evidence Attached' : 'Attach Photo'}</span>
                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload('bld_photo', e)} className="hidden" />
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-amber-800 to-stone-800 text-white font-bold text-xs rounded-xl shadow-md hover:opacity-95 flex items-center justify-center space-x-2 border border-amber-300"
              >
                <span>Dispatch Municipal Structural Engineering Inspection</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* --------------------------------------------------------------------- */}
          {/* FORM 4: FLOOD REPORTING */}
          {/* --------------------------------------------------------------------- */}
          {activeSubcategory === 'emergency_flood' && (
            <form onSubmit={(e) => { e.preventDefault(); handleSubmitSection(activeSubcategory); }} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Flood Type *</label>
                  <select
                    value={formData.flood_type}
                    onChange={(e) => handleInputChange('flood_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                  >
                    <option>Road & Underpass Waterlogging / Drainage Overflow</option>
                    <option>Residential Area Inundation</option>
                    <option>River / Canal Breach & Overflow</option>
                    <option>Flash Flood / Heavy Rainfall Deluge</option>
                    <option>Stormwater Drain Backflow</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Exact Location *</label>
                  <input
                    type="text"
                    required
                    value={formData.flood_location}
                    onChange={(e) => handleInputChange('flood_location', e.target.value)}
                    placeholder="Locality, underpass, colony name"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Landmark *</label>
                  <input
                    type="text"
                    required
                    value={formData.flood_landmark}
                    onChange={(e) => handleInputChange('flood_landmark', e.target.value)}
                    placeholder="Near bridge, railway gate, bus stop"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Date and Time *</label>
                  <input
                    type="datetime-local"
                    value={formData.flood_datetime}
                    onChange={(e) => handleInputChange('flood_datetime', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Water Level *</label>
                  <select
                    value={formData.flood_water_level}
                    onChange={(e) => handleInputChange('flood_water_level', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                  >
                    <option>Low (Ankle deep / 6 inches)</option>
                    <option>Medium (Knee deep / 1.5 to 2 Feet)</option>
                    <option>High (3 to 4 Feet Submerged)</option>
                    <option>Critical (5+ Feet / Roof level threat)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Area Affected *</label>
                  <input
                    type="text"
                    required
                    value={formData.flood_area_affected}
                    onChange={(e) => handleInputChange('flood_area_affected', e.target.value)}
                    placeholder="E.g. 500m road, entire layout"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>
              </div>

              {/* Triage & Assessment Grid */}
              <div className="p-3.5 bg-blue-50 rounded-2xl border border-blue-300 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="font-bold text-blue-950 block">Roads Blocked?</span>
                  <div className="flex items-center space-x-3 pt-1">
                    {['Yes', 'No'].map((opt) => (
                      <label key={opt} className="flex items-center space-x-1 font-bold cursor-pointer text-blue-900">
                        <input
                          type="radio"
                          name="fld_roads"
                          checked={formData.flood_roads_blocked === opt}
                          onChange={() => handleInputChange('flood_roads_blocked', opt)}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-bold text-blue-950 block">Electricity Affected?</span>
                  <div className="flex items-center space-x-3 pt-1">
                    {['Yes', 'No'].map((opt) => (
                      <label key={opt} className="flex items-center space-x-1 font-bold cursor-pointer text-blue-900">
                        <input
                          type="radio"
                          name="fld_power"
                          checked={formData.flood_electricity_affected === opt}
                          onChange={() => handleInputChange('flood_electricity_affected', opt)}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-bold text-blue-950 block">People Trapped?</span>
                  <div className="flex items-center space-x-3 pt-1">
                    {['Yes', 'No'].map((opt) => (
                      <label key={opt} className="flex items-center space-x-1 font-bold cursor-pointer text-blue-900">
                        <input
                          type="radio"
                          name="fld_trapped"
                          checked={formData.flood_trapped === opt}
                          onChange={() => handleInputChange('flood_trapped', opt)}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-bold text-blue-950 block">Evacuation Required?</span>
                  <div className="flex items-center space-x-3 pt-1">
                    {['Yes', 'No'].map((opt) => (
                      <label key={opt} className="flex items-center space-x-1 font-bold cursor-pointer text-blue-900">
                        <input
                          type="radio"
                          name="fld_evac"
                          checked={formData.flood_evacuation === opt}
                          onChange={() => handleInputChange('flood_evacuation', opt)}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Complainant Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.flood_name}
                    onChange={(e) => handleInputChange('flood_name', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Mobile Number & GPS *</label>
                  <input
                    type="text"
                    required
                    value={formData.flood_phone}
                    onChange={(e) => handleInputChange('flood_phone', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Photo / Video Evidence</label>
                  <label className="flex items-center space-x-2 px-4 py-2.5 bg-amber-50 border border-amber-300 rounded-xl text-xs font-bold cursor-pointer hover:bg-amber-100">
                    <Camera className="w-4 h-4 text-amber-700" />
                    <span>{formData.flood_photo ? 'Flood Photo Attached' : 'Attach Photo'}</span>
                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload('flood_photo', e)} className="hidden" />
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-blue-800 to-cyan-800 text-white font-bold text-xs rounded-xl shadow-md hover:opacity-95 flex items-center justify-center space-x-2 border border-blue-300"
              >
                <span>Dispatch SDRF Flood Pumps & Emergency Relief Team</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* --------------------------------------------------------------------- */}
          {/* FORM 5: LANDSLIDE REPORTING */}
          {/* --------------------------------------------------------------------- */}
          {activeSubcategory === 'emergency_landslide' && (
            <form onSubmit={(e) => { e.preventDefault(); handleSubmitSection(activeSubcategory); }} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Landslide Type *</label>
                  <select
                    value={formData.landslide_type}
                    onChange={(e) => handleInputChange('landslide_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                  >
                    <option>Hill Slope Collapse & Rockfall Road Blockage</option>
                    <option>Debris Flow / Heavy Mudslide</option>
                    <option>Retaining Wall Failure on Highway</option>
                    <option>Soil Erosion & Embankment Cave-in</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Exact Location *</label>
                  <input
                    type="text"
                    required
                    value={formData.landslide_location}
                    onChange={(e) => handleInputChange('landslide_location', e.target.value)}
                    placeholder="Road, Km marker, hillside address"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Landmark *</label>
                  <input
                    type="text"
                    required
                    value={formData.landslide_landmark}
                    onChange={(e) => handleInputChange('landslide_landmark', e.target.value)}
                    placeholder="Nearby temple, bridge, bend"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Date and Time *</label>
                  <input
                    type="datetime-local"
                    value={formData.landslide_datetime}
                    onChange={(e) => handleInputChange('landslide_datetime', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Size / Severity of Landslide *</label>
                  <select
                    value={formData.landslide_severity}
                    onChange={(e) => handleInputChange('landslide_severity', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                  >
                    <option>Minor Rockfall (Passable with caution)</option>
                    <option>Moderate Blockage (Single lane blocked)</option>
                    <option>Major Slope Failure (Entire road blocked)</option>
                    <option>Catastrophic (Structure / Vehicle buried)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Risk of Further Landslide *</label>
                  <select
                    value={formData.landslide_risk_further}
                    onChange={(e) => handleInputChange('landslide_risk_further', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                  >
                    <option value="High">High (Active rain & unstable slopes)</option>
                    <option value="Medium">Medium (Loose boulders pending)</option>
                    <option value="Low">Low (Slope stabilized)</option>
                  </select>
                </div>
              </div>

              {/* Assessment checklist */}
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-300 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div>
                  <span className="font-bold text-amber-950 block">Road Blocked?</span>
                  <span className="text-red-700 font-bold">{formData.landslide_road_blocked}</span>
                </div>
                <div>
                  <span className="font-bold text-amber-950 block">Buildings Hit?</span>
                  <span className="text-slate-800 font-bold">{formData.landslide_buildings_affected}</span>
                </div>
                <div>
                  <span className="font-bold text-amber-950 block">People Trapped?</span>
                  <span className="text-slate-800 font-bold">{formData.landslide_trapped_injured}</span>
                </div>
                <div>
                  <span className="font-bold text-amber-950 block">Vehicles Trapped?</span>
                  <span className="text-slate-800 font-bold">{formData.landslide_vehicles_affected}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Complainant Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.landslide_name}
                    onChange={(e) => handleInputChange('landslide_name', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Contact Number & GPS *</label>
                  <input
                    type="text"
                    required
                    value={formData.landslide_phone}
                    onChange={(e) => handleInputChange('landslide_phone', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Photo / Video Evidence</label>
                  <label className="flex items-center space-x-2 px-4 py-2.5 bg-amber-50 border border-amber-300 rounded-xl text-xs font-bold cursor-pointer hover:bg-amber-100">
                    <Camera className="w-4 h-4 text-amber-700" />
                    <span>{formData.landslide_photo ? 'Photo Attached' : 'Attach Photo'}</span>
                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload('landslide_photo', e)} className="hidden" />
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-stone-800 to-amber-900 text-white font-bold text-xs rounded-xl shadow-md hover:opacity-95 flex items-center justify-center space-x-2 border border-amber-300"
              >
                <span>Dispatch Heavy Excavators & Highway Clearance Unit</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* --------------------------------------------------------------------- */}
          {/* FORM 6: FALLEN TREE */}
          {/* --------------------------------------------------------------------- */}
          {activeSubcategory === 'emergency_fallen_tree' && (
            <form onSubmit={(e) => { e.preventDefault(); handleSubmitSection(activeSubcategory); }} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Exact Location *</label>
                  <input
                    type="text"
                    required
                    value={formData.tree_location}
                    onChange={(e) => handleInputChange('tree_location', e.target.value)}
                    placeholder="Street, colony or avenue name"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Landmark *</label>
                  <input
                    type="text"
                    required
                    value={formData.tree_landmark}
                    onChange={(e) => handleInputChange('tree_landmark', e.target.value)}
                    placeholder="Near hospital gate, school, circle"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Date and Time *</label>
                  <input
                    type="datetime-local"
                    value={formData.tree_datetime}
                    onChange={(e) => handleInputChange('tree_datetime', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Cause of Fall *</label>
                  <select
                    value={formData.tree_cause}
                    onChange={(e) => handleInputChange('tree_cause', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                  >
                    <option>Heavy Rain & Wind Storm</option>
                    <option>Natural Decay / Termite Damage</option>
                    <option>Road Digging / Root Damage</option>
                    <option>Vehicle Impact Collision</option>
                    <option>Unknown</option>
                  </select>
                </div>
              </div>

              {/* Impact Checklist Grid */}
              <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-300 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="font-bold text-emerald-950 block">Tree Blocking Road?</span>
                  <span className="text-emerald-900 font-bold">{formData.tree_blocking_road}</span>
                </div>
                <div>
                  <span className="font-bold text-emerald-950 block">Fallen on Vehicle?</span>
                  <span className="text-rose-700 font-bold">{formData.tree_on_vehicle}</span>
                </div>
                <div>
                  <span className="font-bold text-emerald-950 block">Wires Affected (Power)?</span>
                  <span className="text-red-700 font-bold">{formData.tree_wires_affected}</span>
                </div>
                <div>
                  <span className="font-bold text-emerald-950 block">Fallen on Building?</span>
                  <span className="text-slate-800 font-bold">{formData.tree_on_building}</span>
                </div>
                <div>
                  <span className="font-bold text-emerald-950 block">People Injured?</span>
                  <span className="text-slate-800 font-bold">{formData.tree_injured}</span>
                </div>
                <div>
                  <span className="font-bold text-emerald-950 block">Traffic Obstruction:</span>
                  <span className="text-emerald-950 font-bold">{formData.tree_traffic_obstruction}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Complainant Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.tree_name}
                    onChange={(e) => handleInputChange('tree_name', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Mobile Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.tree_phone}
                    onChange={(e) => handleInputChange('tree_phone', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Photo / Video Evidence</label>
                  <label className="flex items-center space-x-2 px-4 py-2.5 bg-amber-50 border border-amber-300 rounded-xl text-xs font-bold cursor-pointer hover:bg-amber-100">
                    <Camera className="w-4 h-4 text-amber-700" />
                    <span>{formData.tree_photo ? 'Tree Photo Attached' : 'Attach Photo'}</span>
                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload('tree_photo', e)} className="hidden" />
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-emerald-800 to-green-800 text-white font-bold text-xs rounded-xl shadow-md hover:opacity-95 flex items-center justify-center space-x-2 border border-emerald-300"
              >
                <span>Dispatch Forest & Municipal Tree Cutting Unit</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}

        </div>
      )}

    </div>
  );
}
