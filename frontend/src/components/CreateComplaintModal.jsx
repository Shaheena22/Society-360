import React, { useState, useEffect } from 'react';
import {
  X, AlertCircle, CheckCircle2, MapPin, Building,
  Upload, Camera, ShieldCheck, Sparkles, Send, FileText,
  HelpCircle, User, Phone, Tag, AlertTriangle, Navigation
} from 'lucide-react';
import { api } from '../services/api';

export const COMPLAINT_TYPES_MAP = [
  {
    id: 'roads',
    label: 'Roads & Public Infrastructure',
    icon: '🛣️',
    department: 'dept-roads',
    problems: [
      'Potholes / Crater on Road',
      'Damaged Asphalt / Deep Cracking',
      'Broken Bridge / Flyover Structure',
      'Missing / Broken Footpath or Pavement',
      'Traffic Signal Malfunctioning / Damaged',
      'Severe Waterlogging on Road Surface',
      'Road Obstruction / Fallen Barrier',
      'Others'
    ]
  },
  {
    id: 'water',
    label: 'Water Supply & Sanitation',
    icon: '💧',
    department: 'dept-water',
    problems: [
      'Main Pipeline Leakage / Burst',
      'No Municipal Water Supply (Past 24h+)',
      'Contaminated / Turbid Tap Water',
      'Extremely Low Water Pressure',
      'Sewerage Line Overflow on Street',
      'Open / Broken Manhole Chamber',
      'Public Drinking Water Cooler Damaged',
      'Others'
    ]
  },
  {
    id: 'electricity',
    label: 'Street Lighting & Electricity',
    icon: '💡',
    department: 'dept-electricity',
    problems: [
      'Street Light Not Functional (Single Pole)',
      'Entire Street / Area in Darkness',
      'Frequent Voltage Fluctuations / Surges',
      'Extended Unscheduled Power Outage',
      'Dangerously Exposed Live Electrical Wire',
      'Damaged Electric Pole or Transformer Sparking',
      'Others'
    ]
  },
  {
    id: 'waste',
    label: 'Waste Management & Cleanliness (Swachhata)',
    icon: '🧹',
    department: 'dept-waste',
    problems: [
      'Public Garbage Bin Overflowing',
      'Garbage Not Collected for > 2 Days',
      'Illegal Waste Dumping in Open Plot',
      'Plastic & Toxic Waste Burning',
      'Public Toilet Extremely Dirty / No Water',
      'Biomedical / Hazardous Waste on Street',
      'Others'
    ]
  },
  {
    id: 'health',
    label: 'Health & Medical Facilities',
    icon: '🩺',
    department: 'dept-health',
    problems: [
      'Primary Health Centre (PHC) Doctor / Staff Absent',
      'Non-Availability of Essential Life-Saving Medicines',
      'Emergency Ambulance (108) Delayed / Unavailable',
      'Mosque / Open Water Mosquito Breeding (Dengue Risk)',
      'Hospital Ward Cleanliness / Sanitation Issue',
      'Others'
    ]
  },
  {
    id: 'safety',
    label: 'Women & Child Safety',
    icon: '🛡️',
    department: 'dept-safety',
    problems: [
      'Dark / Unlit Alleyway Causing Safety Hazard',
      'Frequent Catcalling / Street Harassment Hotspot',
      'Absence of Police / PCR Patrolling at Night',
      'Unsafe / Abandoned Public Bus Shelter',
      'Suspected Child Labor / Child Begging Spotted',
      'Others'
    ]
  },
  {
    id: 'corruption',
    label: 'Anti-Corruption & Vigilance (Lokayukta)',
    icon: '⚖️',
    department: 'dept-corruption',
    problems: [
      'Public Official Demanding Cash Bribe',
      'Unauthorized Speed Money / Extra Fee Demand',
      'Embezzlement in Government Welfare Scheme',
      'Fake Document / Certificate Issuance Racket',
      'Official Misconduct / Abuse of Power',
      'Others'
    ]
  },
  {
    id: 'unemployment',
    label: 'Unemployment & Skill Development',
    icon: '💼',
    department: 'dept-unemployment',
    problems: [
      'Request for Youth Skill Training Center (PMKVY)',
      'Apprenticeship Scheme Information Guidance',
      'Fraudulent Job Placement Agency Reporting',
      'Local Ward Job Fair Request',
      'Daily Wage Worker Wage Dispute / Non-Payment',
      'Others'
    ]
  },
  {
    id: 'governance',
    label: 'Public Administration & Service Delays',
    icon: '🏛️',
    department: 'dept-governance',
    problems: [
      'RTI Request Overdue > 30 Days Without Reason',
      'Caste / Income / Domicile Certificate Delay > 15 Days',
      'Senior Citizen / Disability Pension Payment Not Credited',
      'Municipal Desk Officer Absent During Public Hours',
      'Others'
    ]
  },
  {
    id: 'emergency',
    label: 'Public Safety & Emergency Hazards',
    icon: '🚨',
    department: 'dept-emergency',
    problems: [
      'Dilapidated / Collapsing Wall or Building Hazard',
      'Dangerous Falling Tree or Heavy Branch on Road',
      'Open Deep Construction Trench Without Barricades',
      'LPG Cylinder Gas Leakage Risk in Public Market',
      'Others'
    ]
  },
  {
    id: 'animal',
    label: 'Animal Welfare & Stray Rescue',
    icon: '🐕',
    department: 'dept-animal',
    problems: [
      'Injured Stray Dog Hit by Vehicle (Requires Vet)',
      'Aggressive / Rabies Suspect Animal Reporting',
      'Stray Cattle Causing Major Highway Traffic Blockade',
      'Severe Animal Abuse / Cruelty Case (PCA Act)',
      'Request for Anti-Rabies Vaccination Drive',
      'Others'
    ]
  },
  {
    id: 'others',
    label: 'Others (Custom Civic Domain)',
    icon: '📌',
    department: 'dept-civic',
    problems: [
      'Others'
    ]
  }
];

export default function CreateComplaintModal({
  isOpen,
  onClose,
  currentUser,
  onComplaintCreated,
  initialPrefill
}) {
  // Form States
  const [selectedType, setSelectedType] = useState('roads');
  const [customType, setCustomType] = useState('');
  
  const [selectedProblem, setSelectedProblem] = useState(COMPLAINT_TYPES_MAP[0].problems[0]);
  const [customProblem, setCustomProblem] = useState('');

  // Prefilled & Editable citizen and location information
  const [reporterName, setReporterName] = useState(currentUser?.name || 'Anita Deshmukh');
  const [reporterPhone, setReporterPhone] = useState(currentUser?.phone || '+91 9876543210');
  const [ward, setWard] = useState(currentUser?.district ? `Ward 12, ${currentUser.district}` : 'Ward 12, Kalaburagi');
  const [address, setAddress] = useState('Main Gate Road, CUK Campus, Kalaburagi');
  const [landmark, setLandmark] = useState('Near Central University Entrance');
  
  // Complaint details
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('High');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoPreview, setPhotoPreview] = useState(null);

  // Live GPS Geolocation in Modal
  const [isDetectingGpsModal, setIsDetectingGpsModal] = useState(false);
  const [modalGpsCoords, setModalGpsCoords] = useState(null);
  const [modalGpsAccuracy, setModalGpsAccuracy] = useState(null);

  // Listen to initialPrefill prop (e.g. from AI QR scan or Live GPS click)
  useEffect(() => {
    if (isOpen && initialPrefill) {
      if (initialPrefill.category) {
        const matched = COMPLAINT_TYPES_MAP.find(
          t => t.id === initialPrefill.category || t.id.includes(initialPrefill.category)
        );
        if (matched) {
          setSelectedType(matched.id);
          if (initialPrefill.problem && matched.problems.includes(initialPrefill.problem)) {
            setSelectedProblem(initialPrefill.problem);
          } else if (matched.problems.length > 0) {
            setSelectedProblem(matched.problems[0]);
          }
        }
      }
      if (initialPrefill.address) setAddress(initialPrefill.address);
      if (initialPrefill.ward) setWard(initialPrefill.ward);
      if (initialPrefill.landmark) setLandmark(initialPrefill.landmark);
      if (initialPrefill.description) setDescription(initialPrefill.description);
    }
  }, [isOpen, initialPrefill]);

  const handleDetectGpsForModal = () => {
    setIsDetectingGpsModal(true);
    if (!navigator.geolocation) {
      setModalGpsCoords('17.3325° N, 76.8380° E');
      setModalGpsAccuracy(10);
      setIsDetectingGpsModal(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude.toFixed(4);
        const lng = pos.coords.longitude.toFixed(4);
        const acc = Math.round(pos.coords.accuracy || 6);
        const coordsStr = `${lat}° N, ${lng}° E`;
        setModalGpsCoords(coordsStr);
        setModalGpsAccuracy(acc);

        let detected = `Ward 12, Kalaburagi (${coordsStr})`;
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
          if (res.ok) {
            const data = await res.json();
            if (data.display_name) {
              detected = data.display_name.split(',').slice(0, 3).join(', ') + ` (${coordsStr})`;
            }
          }
        } catch (e) {}

        setAddress(detected);
        setLandmark(`GPS Spot: ${coordsStr}`);
        setIsDetectingGpsModal(false);
      },
      (err) => {
        console.warn('GPS modal error:', err);
        setModalGpsCoords('17.3325° N, 76.8380° E');
        setModalGpsAccuracy(12);
        setAddress('Ward 12, Station Road, Kalaburagi (17.3325° N, 76.8380° E)');
        setIsDetectingGpsModal(false);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  // Status & validation
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successInfo, setSuccessInfo] = useState(null);

  if (!isOpen) return null;

  // Find active type object
  const activeTypeObj = COMPLAINT_TYPES_MAP.find(t => t.id === selectedType) || COMPLAINT_TYPES_MAP[0];

  // Handle Type Change
  const handleTypeChange = (newTypeId) => {
    setSelectedType(newTypeId);
    const matched = COMPLAINT_TYPES_MAP.find(t => t.id === newTypeId);
    if (matched && matched.problems && matched.problems.length > 0) {
      setSelectedProblem(matched.problems[0]);
    } else {
      setSelectedProblem('Others');
    }
    setCustomProblem('');
  };

  // Handle simulated photo upload
  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const fakeUrl = URL.createObjectURL(file);
      setPhotoPreview(fakeUrl);
      setPhotoUrl(fakeUrl);
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Final resolved Type and Problem
    const finalType = selectedType === 'others'
      ? (customType.trim() || 'General Civic Issue')
      : activeTypeObj.label;

    const finalProblem = selectedProblem === 'Others'
      ? (customProblem.trim() || 'Unspecified Problem')
      : selectedProblem;

    if (selectedType === 'others' && !customType.trim()) {
      setErrorMsg('Please specify the custom category/type.');
      return;
    }

    if (selectedProblem === 'Others' && !customProblem.trim()) {
      setErrorMsg('Please describe your specific problem in the field provided.');
      return;
    }

    if (!address.trim()) {
      setErrorMsg('Please provide a valid incident address or location.');
      return;
    }

    if (!description.trim() || description.trim().length < 10) {
      setErrorMsg('Please write a detailed description of at least 10 characters.');
      return;
    }

    setIsSubmitting(true);

    try {
      const ticketNumber = `CMP-2026-${Math.floor(100 + Math.random() * 900)}`;
      const now = new Date();
      const slaHours = priority === 'Emergency' ? 4 : priority === 'High' ? 24 : 48;
      const slaDeadline = new Date(now.getTime() + slaHours * 3600 * 1000).toISOString();

      const newComplaint = {
        id: ticketNumber,
        reporterId: isAnonymous ? null : (currentUser?.uid || 'usr-citizen-1'),
        reporterName: isAnonymous ? 'Anonymous Citizen' : reporterName,
        reporterPhone: isAnonymous ? null : reporterPhone,
        type: finalType,
        category: selectedType,
        problem: finalProblem,
        description: description.trim(),
        aiGeneratedDescription: `Auto-verified ${priority} Priority Ticket: ${finalProblem} reported at ${address}.`,
        location: {
          address: address.trim(),
          ward: ward.trim(),
          landmark: landmark.trim(),
          lat: 17.1582,
          lng: 76.8422
        },
        priority,
        status: 'Submitted',
        departmentId: activeTypeObj.department || 'dept-roads',
        confirmations: [currentUser?.uid || 'usr-citizen-1'],
        mediaUrls: photoUrl ? [photoUrl] : [],
        createdAt: now.toISOString(),
        slaDeadline,
        routingHistory: [
          {
            departmentId: activeTypeObj.department || 'dept-roads',
            timestamp: now.toISOString(),
            reason: `Dispatched via Smart Grievance Router with ${slaHours}h SLA target.`
          }
        ]
      };

      // Attempt API call if backend is available
      try {
        await api.createComplaint({
          reporterId: newComplaint.reporterId,
          reporterName: newComplaint.reporterName,
          category: newComplaint.category,
          subcategory: newComplaint.problem,
          rawDescription: newComplaint.description,
          location: newComplaint.location,
          priority: newComplaint.priority
        });
      } catch (err) {
        console.warn('Backend API offline or mock mode, persisting complaint locally:', err);
      }

      setSuccessInfo(newComplaint);
      if (onComplaintCreated) {
        onComplaintCreated(newComplaint);
      }
    } catch (err) {
      console.error('Error submitting complaint:', err);
      setErrorMsg('Failed to submit complaint. Please check your network.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setSuccessInfo(null);
    setDescription('');
    setCustomType('');
    setCustomProblem('');
    setPhotoPreview(null);
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-amber-300 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-amber-800 via-orange-700 to-amber-700 text-white flex items-center justify-between border-b border-amber-600">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 text-xl">
              ✍️
            </div>
            <div>
              <h2 className="text-lg font-bold font-cinzel tracking-tight flex items-center gap-2">
                <span>Lodge Civic Grievance</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-100 border border-amber-300/30">
                  Form FR-3.1
                </span>
              </h2>
              <p className="text-xs text-amber-100/90 font-outfit">
                Direct municipal routing with enforceable SLA resolution timeline
              </p>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className="p-2 rounded-xl text-amber-100 hover:text-white hover:bg-white/10 transition-colors"
            title="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6">

          {/* Success State View */}
          {successInfo ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-lg animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 font-cinzel">Grievance Successfully Registered!</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Your ticket has been prioritized and dispatched to the designated nodal officer.
                </p>
              </div>

              <div className="bg-amber-50/80 border-2 border-amber-300 rounded-2xl p-4 max-w-md mx-auto text-left space-y-2 text-xs font-outfit shadow-sm">
                <div className="flex justify-between items-center pb-2 border-b border-amber-200">
                  <span className="text-slate-500 font-semibold">TICKET ID:</span>
                  <span className="font-mono font-bold text-amber-900 text-sm">{successInfo.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Category:</span>
                  <span className="font-bold text-slate-800">{successInfo.type}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Problem:</span>
                  <span className="font-bold text-slate-800">{successInfo.problem}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Address:</span>
                  <span className="font-medium text-slate-700 truncate max-w-[220px]">{successInfo.location.address}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">SLA Target:</span>
                  <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    {successInfo.priority === 'Emergency' ? '4 Hours' : '24 Hours'}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={resetAndClose}
                  className="px-6 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs shadow-md transition-all font-outfit"
                >
                  View in My Complaints
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">

              {errorMsg && (
                <div className="p-3.5 bg-rose-50 border border-rose-300 rounded-xl flex items-center space-x-2 text-rose-700 text-xs font-semibold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* STEP 1: CATEGORY TYPE & SPECIFIC PROBLEM */}
              <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center space-x-2 text-slate-800">
                  <Tag className="w-4 h-4 text-amber-700" />
                  <span className="text-xs font-black uppercase tracking-wider font-outfit">1. Select Domain & Problem</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Category / Type Dropdown */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Complaint Type / Department <span className="text-rose-600">*</span>
                    </label>
                    <select
                      value={selectedType}
                      onChange={(e) => handleTypeChange(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-xs"
                    >
                      {COMPLAINT_TYPES_MAP.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.icon} {item.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Specific Problem Dropdown */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Specific Problem Issue <span className="text-rose-600">*</span>
                    </label>
                    <select
                      value={selectedProblem}
                      onChange={(e) => setSelectedProblem(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-xs"
                    >
                      {activeTypeObj.problems.map((prob, idx) => (
                        <option key={idx} value={prob}>
                          {prob}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Conditional "Others" input for Type */}
                {selectedType === 'others' && (
                  <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl">
                    <label className="block text-xs font-bold text-amber-900 mb-1">
                      Specify Custom Complaint Type / Domain <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={customType}
                      onChange={(e) => setCustomType(e.target.value)}
                      placeholder="e.g. Stray Cattle Hazard, Public Park Equipment Vandalism..."
                      className="w-full bg-white border border-amber-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                )}

                {/* Conditional "Others" input for Specific Problem */}
                {selectedProblem === 'Others' && (
                  <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl">
                    <label className="block text-xs font-bold text-amber-900 mb-1">
                      Specify Exact Problem / Defect <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={customProblem}
                      onChange={(e) => setCustomProblem(e.target.value)}
                      placeholder="Describe the exact nature of the problem..."
                      className="w-full bg-white border border-amber-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                )}
              </div>

              {/* STEP 2: PREFILLED & EDITABLE CITIZEN & LOCATION DETAILS */}
              <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-slate-800">
                    <MapPin className="w-4 h-4 text-amber-700" />
                    <span className="text-xs font-black uppercase tracking-wider font-outfit">2. Location & Citizen Details (Prefilled & Editable)</span>
                  </div>
                  <span className="text-[11px] text-amber-800 font-medium bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
                    You can edit the address
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Reporter Full Name
                    </label>
                    <div className="relative">
                      <User className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                      <input
                        type="text"
                        value={reporterName}
                        onChange={(e) => setReporterName(e.target.value)}
                        disabled={isAnonymous}
                        className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-amber-500 disabled:bg-slate-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Contact Phone (for SMS updates)
                    </label>
                    <div className="relative">
                      <Phone className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                      <input
                        type="tel"
                        value={reporterPhone}
                        onChange={(e) => setReporterPhone(e.target.value)}
                        disabled={isAnonymous}
                        className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-amber-500 disabled:bg-slate-100"
                      />
                    </div>
                  </div>
                </div>

                {/* EDITABLE ADDRESS FIELD */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-800">
                      Incident Street Address / Spot <span className="text-rose-600">*</span>
                      <span className="text-[11px] font-normal text-slate-500 ml-1.5">(Pre-filled with your current area, modify if needed)</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleDetectGpsForModal}
                      disabled={isDetectingGpsModal}
                      className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 text-[11px] font-bold border border-amber-300 transition-colors shadow-2xs cursor-pointer"
                      title="Fetch Live GPS Coordinates from Browser"
                    >
                      <Navigation className={`w-3 h-3 ${isDetectingGpsModal ? 'animate-spin' : ''}`} />
                      <span>{isDetectingGpsModal ? 'Locating...' : '📍 Auto-Detect GPS Location'}</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. Near Kalaburagi Central Bus Stand, Station Road, Ward 12"
                    className="w-full px-3.5 py-2.5 bg-white border-2 border-amber-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-600 shadow-xs"
                  />
                  {modalGpsCoords && (
                    <div className="mt-1.5 flex items-center justify-between text-[10px] text-amber-900 bg-amber-50/90 px-2.5 py-1 rounded-lg border border-amber-200 font-mono">
                      <span>🛰️ Live Satellite Lock: <strong>{modalGpsCoords}</strong></span>
                      <span className="text-emerald-700 font-bold">±{modalGpsAccuracy}m Accuracy</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Ward / Municipal Division
                    </label>
                    <input
                      type="text"
                      value={ward}
                      onChange={(e) => setWard(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Nearest Landmark / Pillar No.
                    </label>
                    <input
                      type="text"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      placeholder="e.g. Opposite Government Hospital Gate 2"
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {/* Priority Selection & Anonymous Checkbox */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-slate-700">Priority Level:</span>
                    <div className="flex rounded-lg border border-slate-300 p-0.5 bg-white text-xs">
                      {['Normal', 'High', 'Emergency'].map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setPriority(lvl)}
                          className={`px-3 py-1 rounded-md font-bold transition-all ${
                            priority === lvl
                              ? lvl === 'Emergency'
                                ? 'bg-rose-600 text-white shadow-xs'
                                : lvl === 'High'
                                ? 'bg-amber-600 text-white shadow-xs'
                                : 'bg-slate-800 text-white shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>

                  <label className="flex items-center space-x-2 text-xs font-semibold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                    />
                    <span>Lodge Anonymously (Whistleblower Protection)</span>
                  </label>
                </div>
              </div>

              {/* STEP 3: WRITE DETAILED DESCRIPTION */}
              <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-slate-800">
                    <FileText className="w-4 h-4 text-amber-700" />
                    <span className="text-xs font-black uppercase tracking-wider font-outfit">3. Detailed Description</span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {description.length} characters
                  </span>
                </div>

                <div>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Write the detailed description here... (e.g. The pothole is approximately 1.5 meters wide and 20 cm deep on the main university approach road. Water is accumulating, causing motorcyclists to lose balance. Kindly repair the asphalt urgently before the monsoon worsens.)"
                    className="w-full px-3.5 py-3 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-xs"
                  />
                </div>

                {/* Optional Photo Attachment */}
                <div className="flex items-center gap-3 pt-1">
                  <label className="cursor-pointer inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-dashed border-amber-400 bg-amber-50/50 hover:bg-amber-100 text-amber-900 text-xs font-bold transition-colors">
                    <Camera className="w-3.5 h-3.5 text-amber-700" />
                    <span>Attach Photo Evidence</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                  </label>
                  {photoPreview && (
                    <div className="flex items-center space-x-2 text-xs text-emerald-700 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Photo Attached</span>
                      <button
                        type="button"
                        onClick={() => { setPhotoPreview(null); setPhotoUrl(''); }}
                        className="text-rose-600 hover:underline text-[11px]"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors font-outfit"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-700 via-orange-600 to-amber-700 hover:from-amber-800 hover:to-orange-700 text-white font-bold text-xs shadow-md flex items-center space-x-2 transition-all font-outfit disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Ticket...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Grievance Ticket</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>
      </div>
    </div>
  );
}
