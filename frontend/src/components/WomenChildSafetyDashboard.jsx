import React, { useState } from 'react';
import {
  ShieldAlert, Phone, Heart, Users, MapPin, Camera, Mic, AlertTriangle,
  CheckCircle2, Clock, Eye, EyeOff, Lock, Sparkles, Building2, HelpCircle,
  FileText, Check, X, ChevronRight, AlertCircle, ArrowLeft, Send, Search,
  Radio, Calendar, User, Shield
} from 'lucide-react';
import { api } from '../services/api';

export const SAFETY_SECTIONS = [
  {
    id: 'safety_unsafe_public_place',
    title: '1. Unsafe Public Place',
    icon: '🛡️',
    color: 'from-purple-800 to-indigo-900',
    border: 'border-purple-300',
    desc: 'Dark alleys, abandoned spots, unlit parks, broken infra & unsafe transit points'
  },
  {
    id: 'safety_street_harassment',
    title: '2. Street Harassment Reporting',
    icon: '🚨',
    color: 'from-rose-800 to-pink-900',
    border: 'border-rose-300',
    desc: 'Catcalling, stalking, verbal abuse, physical contact, gestures & ongoing threats'
  },
  {
    id: 'safety_missing_child',
    title: '3. Missing Child Assistance',
    icon: '🧒',
    color: 'from-amber-800 to-orange-900',
    border: 'border-amber-300',
    desc: 'Rapid amber alert dispatch, photo search, last seen location & FIR coordination'
  },
  {
    id: 'safety_child_labour',
    title: '4. Child Labour Reporting',
    icon: '🛑',
    color: 'from-red-800 to-amber-900',
    border: 'border-red-300',
    desc: 'Minors in hazardous industries, dhabas, garages, brick kilns & forced labor'
  },
  {
    id: 'safety_school_safety',
    title: '5. School Safety Issue',
    icon: '🏫',
    color: 'from-indigo-800 to-blue-900',
    border: 'border-indigo-300',
    desc: 'Severe bullying, unsafe transport, boundary breaches, substance peddling & campus hazards'
  },
  {
    id: 'safety_women_safety_location',
    title: '6. Women Safety Location',
    icon: '👩',
    color: 'from-fuchsia-800 to-pink-900',
    border: 'border-fuchsia-300',
    desc: 'Lighting audits, CCTV deadzones, loitering spots & Pink Police booth requests'
  },
  {
    id: 'safety_domestic_support',
    title: '7. Domestic Support Referral',
    icon: '🏠',
    color: 'from-purple-900 to-slate-900',
    border: 'border-purple-400',
    desc: 'Emergency safe shelter, free legal aid, trauma counselling & encrypted discreet intake'
  },
  {
    id: 'safety_child_welfare',
    title: '8. Child Welfare Assistance',
    icon: '🧸',
    color: 'from-teal-800 to-emerald-900',
    border: 'border-teal-300',
    desc: 'Abandoned minors, medical emergencies, nutrition/food aid & Childline 1098 referrals'
  }
];

export default function WomenChildSafetyDashboard({ speakText, currentUser, initialFeatureModule, onBack }) {
  const [activeSubcategory, setActiveSubcategory] = useState(initialFeatureModule || null);
  const [discreetMode, setDiscreetMode] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State for each category
  const [formData, setFormData] = useState({
    // 1. Unsafe Public Place
    unsafe_address: 'Main Market Road, Ward 12, Kalaburagi',
    unsafe_place_type: 'Dark Alley / Unlit Street',
    unsafe_description: '',
    unsafe_datetime: new Date().toISOString().slice(0, 16),
    unsafe_landmark: 'Near Old Bus Stand Water Tank',
    unsafe_frequency: 'Daily after sunset',
    unsafe_severity: 'High',
    unsafe_contact: currentUser ? `${currentUser.name} (${currentUser.phone || '+91 9876543210'})` : '',
    unsafe_anonymous: false,
    unsafe_photo: null,

    // 2. Street Harassment
    harass_location: 'Station Road Junction, Kalaburagi',
    harass_datetime: new Date().toISOString().slice(0, 16),
    harass_type: 'Catcalling / Verbal Harassment',
    harass_description: '',
    harass_suspect_description: '',
    harass_ongoing: 'No',
    harass_witness_details: '',
    harass_immediate_danger: 'No',
    harass_police_assistance: 'Yes',
    harass_contact: currentUser ? `${currentUser.name} (${currentUser.phone || ''})` : '',
    harass_anonymous: true,
    harass_evidence: null,

    // 3. Missing Child Assistance
    missing_child_name: '',
    missing_child_age: '',
    missing_child_gender: 'Boy',
    missing_datetime_last_seen: new Date().toISOString().slice(0, 16),
    missing_last_location: 'Central Park Play Area, Ward 12',
    missing_clothing: 'Blue t-shirt, dark denim shorts, red sandals',
    missing_id_marks: 'Small birthmark on left wrist, wears black spectacles',
    missing_height_appearance: 'Approx 3 feet 8 inches, slim build, short wavy hair',
    missing_parent_name: currentUser?.name || '',
    missing_parent_contact: currentUser?.phone || '+91 98765 00000',
    missing_fir_number: '',
    missing_additional_info: 'Speaks Kannada and Hindi. Carries a small green water bottle.',
    missing_photo: null,

    // 4. Child Labour Reporting
    labour_location: 'Auto Garage & Tea Stall, Ring Road, Kalaburagi',
    labour_workplace_type: 'Restaurant / Tea Stall (Dhaba)',
    labour_child_age: '9 - 11 years',
    labour_child_count: '2',
    labour_work_type: 'Carrying heavy hot kettles, dishwashing and scrap metal handling',
    labour_working_hours: '7:00 AM to 9:00 PM daily (14+ hours)',
    labour_employer_details: 'Ramesh Tea Corner, Owner: Ramesh (Shop #14)',
    labour_datetime_observed: new Date().toISOString().slice(0, 16),
    labour_description: '',
    labour_photo: null,
    labour_contact: '',
    labour_anonymous: true,

    // 5. School Safety Issue
    school_name: 'Govt Higher Secondary Model School',
    school_location: 'Near University Road, Ward 12',
    school_safety_type: 'Ragging / Severe Bullying',
    school_description: '',
    school_datetime: new Date().toISOString().slice(0, 16),
    school_authority_involved: 'Senior student group & bus attendant negligence',
    school_students_affected: 'Multiple students (Class 8 & 9)',
    school_ongoing: 'Yes',
    school_severity: 'High',
    school_photo: null,
    school_reporter_details: currentUser ? `${currentUser.name} (Parent/Citizen)` : '',
    school_anonymous: false,

    // 6. Women Safety Location
    women_safety_location: 'Underpass connecting Ward 11 and Ward 12',
    women_safety_landmark: 'Next to Railway Overbridge',
    women_safety_concern_type: 'Pitch Dark / Complete Streetlight Failure',
    women_safety_unsafe_hours: 'Post 7:30 PM until dawn (All Night)',
    women_safety_description: '',
    women_safety_lighting: 'Pitch dark (all 6 light fixtures non-functional)',
    women_safety_cctv: 'No CCTV surveillance installed',
    women_safety_frequency: 'Daily occurrence',
    women_safety_improvement: 'Install 2 High-Mast LED Poles, 4 CCTV Cameras & initiate Pink Police PCR patrol',
    women_safety_photo: null,
    women_safety_contact: currentUser ? `${currentUser.name}` : '',
    women_safety_anonymous: false,

    // 7. Domestic Support Referral
    domestic_support_type: 'Emergency Safe Shelter & Legal Protection Order',
    domestic_nature_of_problem: 'Continuous physical violence, domestic abuse and financial deprivation',
    domestic_current_location: 'Ward 12, Kalaburagi (Safe with neighbour currently)',
    domestic_in_danger: 'Yes',
    domestic_medical_needed: 'Yes',
    domestic_shelter_needed: 'Yes',
    domestic_counselling_needed: 'Yes',
    domestic_legal_needed: 'Yes',
    domestic_preferred_contact: 'Discreet WhatsApp Message / Encrypted In-App Notice',
    domestic_safe_time: 'Between 10:00 AM and 12:30 PM (When alone)',
    domestic_contact_details: 'Encrypted safe line: +91 98765 11223',
    domestic_anonymous: true,

    // 8. Child Welfare Assistance
    welfare_child_name: 'Unknown / Rescued Child',
    welfare_approx_age: '5 - 6 years',
    welfare_gender: 'Girl',
    welfare_current_location: 'Near Railway Station Platform 1 Shelter',
    welfare_concern_type: 'Abandoned / Severe Malnutrition & Illness',
    welfare_condition_desc: 'Child appears malnourished, alone without guardians, feverish and in distress',
    welfare_parent_details: 'Not found in vicinity. Begging handlers fled upon inquiry.',
    welfare_medical_needed: 'Yes',
    welfare_food_shelter_needed: 'Yes',
    welfare_datetime: new Date().toISOString().slice(0, 16),
    welfare_photo: null,
    welfare_contact: currentUser ? `${currentUser.name}` : '',
    welfare_anonymous: false
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field, e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, [field]: url }));
      if (speakText) speakText('Photo evidence attached successfully.');
    }
  };

  const handleSubmitSection = async (categoryId) => {
    setIsSubmitting(true);
    let title = '';
    let description = '';
    let address = 'Kalaburagi City';
    let isAnonymous = false;
    let customFields = {};
    let priority = 'High';

    if (categoryId === 'safety_unsafe_public_place') {
      title = 'Unsafe Public Place Report';
      address = formData.unsafe_address;
      isAnonymous = formData.unsafe_anonymous;
      priority = formData.unsafe_severity === 'Critical' ? 'High' : 'Medium';
      customFields = {
        locationAddress: formData.unsafe_address,
        placeType: formData.unsafe_place_type,
        description: formData.unsafe_description,
        dateTimeNoticed: formData.unsafe_datetime,
        landmark: formData.unsafe_landmark,
        frequency: formData.unsafe_frequency,
        severityLevel: formData.unsafe_severity,
        reporterContact: formData.unsafe_contact,
        isAnonymous: formData.unsafe_anonymous
      };
      description = `[UNSAFE PUBLIC PLACE] ${formData.unsafe_place_type} at ${formData.unsafe_address} (Near ${formData.unsafe_landmark}). Severity: ${formData.unsafe_severity}. Frequency: ${formData.unsafe_frequency}. Details: ${formData.unsafe_description || 'Unsafe area reported for municipal safety action.'}`;
    } else if (categoryId === 'safety_street_harassment') {
      title = 'Street Harassment Grievance';
      address = formData.harass_location;
      isAnonymous = formData.harass_anonymous;
      priority = formData.harass_immediate_danger === 'Yes' ? 'High' : 'High';
      customFields = {
        location: formData.harass_location,
        dateTime: formData.harass_datetime,
        harassmentType: formData.harass_type,
        description: formData.harass_description,
        suspectDescription: formData.harass_suspect_description,
        isOngoing: formData.harass_ongoing,
        witnessDetails: formData.harass_witness_details,
        immediateDanger: formData.harass_immediate_danger,
        policeAssistanceRequired: formData.harass_police_assistance,
        reporterContact: formData.harass_contact,
        isAnonymous: formData.harass_anonymous
      };
      description = `[STREET HARASSMENT] ${formData.harass_type} at ${formData.harass_location}. Ongoing: ${formData.harass_ongoing}. Immediate Danger: ${formData.harass_immediate_danger}. Police SOS: ${formData.harass_police_assistance}. Suspect: ${formData.harass_suspect_description || 'Not specified'}. Description: ${formData.harass_description || 'Harassment reported.'}`;
    } else if (categoryId === 'safety_missing_child') {
      title = 'Missing Child Emergency Alert';
      address = formData.missing_last_location;
      isAnonymous = false;
      priority = 'High';
      customFields = {
        childName: formData.missing_child_name || 'Unspecified Name',
        age: formData.missing_child_age,
        gender: formData.missing_child_gender,
        dateTimeLastSeen: formData.missing_datetime_last_seen,
        lastKnownLocation: formData.missing_last_location,
        clothingWorn: formData.missing_clothing,
        idMarks: formData.missing_id_marks,
        heightAppearance: formData.missing_height_appearance,
        parentName: formData.missing_parent_name,
        parentContact: formData.missing_parent_contact,
        firNumber: formData.missing_fir_number,
        additionalInfo: formData.missing_additional_info
      };
      description = `[URGENT: MISSING CHILD] Child: ${formData.missing_child_name}, Age: ${formData.missing_child_age}, Gender: ${formData.missing_child_gender}. Last seen at ${formData.missing_last_location} on ${formData.missing_datetime_last_seen}. Clothing: ${formData.missing_clothing}. Marks: ${formData.missing_id_marks}. Parent Contact: ${formData.missing_parent_contact}. FIR: ${formData.missing_fir_number || 'Under filing'}.`;
    } else if (categoryId === 'safety_child_labour') {
      title = 'Child Labour & Exploitation Report';
      address = formData.labour_location;
      isAnonymous = formData.labour_anonymous;
      priority = 'High';
      customFields = {
        location: formData.labour_location,
        workplaceType: formData.labour_workplace_type,
        approxAge: formData.labour_child_age,
        childrenCount: formData.labour_child_count,
        workType: formData.labour_work_type,
        workingHours: formData.labour_working_hours,
        employerDetails: formData.labour_employer_details,
        dateTimeObserved: formData.labour_datetime_observed,
        description: formData.labour_description,
        isAnonymous: formData.labour_anonymous
      };
      description = `[CHILD LABOUR REPORT] ${formData.labour_child_count} child(ren) (~${formData.labour_child_age}) observed at ${formData.labour_workplace_type} (${formData.labour_location}). Work: ${formData.labour_work_type}. Hours: ${formData.labour_working_hours}. Employer: ${formData.labour_employer_details}. Details: ${formData.labour_description || 'Child labour observed.'}`;
    } else if (categoryId === 'safety_school_safety') {
      title = 'School Safety Incident Report';
      address = formData.school_location;
      isAnonymous = formData.school_anonymous;
      priority = formData.school_severity === 'Critical' ? 'High' : 'High';
      customFields = {
        schoolName: formData.school_name,
        schoolLocation: formData.school_location,
        safetyIssueType: formData.school_safety_type,
        description: formData.school_description,
        dateTime: formData.school_datetime,
        authorityInvolved: formData.school_authority_involved,
        studentsAffected: formData.school_students_affected,
        isOngoing: formData.school_ongoing,
        severityLevel: formData.school_severity,
        reporterDetails: formData.school_reporter_details,
        isAnonymous: formData.school_anonymous
      };
      description = `[SCHOOL SAFETY ISSUE] ${formData.school_name} (${formData.school_location}) - ${formData.school_safety_type}. Ongoing: ${formData.school_ongoing}. Students affected: ${formData.school_students_affected}. Authority/Personnel: ${formData.school_authority_involved}. Details: ${formData.school_description || 'Safety issue reported.'}`;
    } else if (categoryId === 'safety_women_safety_location') {
      title = 'Women Safety Location Audit';
      address = formData.women_safety_location;
      isAnonymous = formData.women_safety_anonymous;
      priority = 'Medium';
      customFields = {
        exactLocation: formData.women_safety_location,
        landmark: formData.women_safety_landmark,
        safetyConcernType: formData.women_safety_concern_type,
        unsafeHours: formData.women_safety_unsafe_hours,
        description: formData.women_safety_description,
        lightingCondition: formData.women_safety_lighting,
        cctvAvailability: formData.women_safety_cctv,
        frequencyOfIncidents: formData.women_safety_frequency,
        suggestedImprovement: formData.women_safety_improvement,
        isAnonymous: formData.women_safety_anonymous
      };
      description = `[WOMEN SAFETY LOCATION] ${formData.women_safety_location} (Near ${formData.women_safety_landmark}). Concern: ${formData.women_safety_concern_type}. Lighting: ${formData.women_safety_lighting}. CCTV: ${formData.women_safety_cctv}. Suggested: ${formData.women_safety_improvement}. Unsafe hours: ${formData.women_safety_unsafe_hours}.`;
    } else if (categoryId === 'safety_domestic_support') {
      title = 'Discreet Domestic Support & Shelter Referral';
      address = formData.domestic_current_location;
      isAnonymous = formData.domestic_anonymous;
      priority = 'High';
      customFields = {
        supportType: formData.domestic_support_type,
        natureOfProblem: formData.domestic_nature_of_problem,
        currentLocation: formData.domestic_current_location,
        currentlyInDanger: formData.domestic_in_danger,
        medicalHelpRequired: formData.domestic_medical_needed,
        shelterRequired: formData.domestic_shelter_needed,
        counsellingRequired: formData.domestic_counselling_needed,
        legalAssistanceRequired: formData.domestic_legal_needed,
        preferredContactMethod: formData.domestic_preferred_contact,
        safeContactTime: formData.domestic_safe_time,
        contactDetails: formData.domestic_contact_details,
        isAnonymous: formData.domestic_anonymous
      };
      description = `[DOMESTIC SUPPORT REFERRAL] Support: ${formData.domestic_support_type}. In Danger: ${formData.domestic_in_danger}. Medical needed: ${formData.domestic_medical_needed}, Shelter: ${formData.domestic_shelter_needed}, Legal: ${formData.domestic_legal_needed}. Safe time: ${formData.domestic_safe_time}. Preferred mode: ${formData.domestic_preferred_contact}.`;
    } else if (categoryId === 'safety_child_welfare') {
      title = 'Child Welfare & Protection Request';
      address = formData.welfare_current_location;
      isAnonymous = formData.welfare_anonymous;
      priority = 'High';
      customFields = {
        childName: formData.welfare_child_name,
        approxAge: formData.welfare_approx_age,
        gender: formData.welfare_gender,
        currentLocation: formData.welfare_current_location,
        welfareConcernType: formData.welfare_concern_type,
        conditionDescription: formData.welfare_condition_desc,
        parentDetails: formData.welfare_parent_details,
        medicalAssistanceRequired: formData.welfare_medical_needed,
        foodShelterRequired: formData.welfare_food_shelter_needed,
        dateTimeObserved: formData.welfare_datetime,
        isAnonymous: formData.welfare_anonymous
      };
      description = `[CHILD WELFARE ASSISTANCE] Child: ${formData.welfare_child_name} (~${formData.welfare_approx_age}, ${formData.welfare_gender}) at ${formData.welfare_current_location}. Concern: ${formData.welfare_concern_type}. Condition: ${formData.welfare_condition_desc}. Medical needed: ${formData.welfare_medical_needed}, Food/Shelter: ${formData.welfare_food_shelter_needed}.`;
    }

    const payload = {
      reporterId: isAnonymous ? null : currentUser?.uid || 'usr-citizen-1',
      reporterName: isAnonymous ? 'Anonymous Citizen (Discreet)' : currentUser?.name || 'Anita Deshmukh',
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
        setSubmitSuccess(res.message || `${title} submitted successfully and prioritized by Women & Child Safety Cell.`);
        if (speakText) speakText(`${title} dispatched with high priority.`);
      }
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  // Discreet Exit function (switches to a neutral view immediately)
  if (discreetMode) {
    return (
      <div className="p-8 bg-amber-50 rounded-3xl border-2 border-amber-300 text-center space-y-4 font-outfit">
        <div className="text-4xl">🌤️</div>
        <h3 className="text-xl font-bold text-amber-950">Kalaburagi City Daily Civic Weather & Services Notice</h3>
        <p className="text-xs text-amber-800">Normal municipal operations active. Green score 84/100.</p>
        <button
          onClick={() => setDiscreetMode(false)}
          className="px-4 py-2 bg-amber-700 text-white rounded-xl text-xs font-bold shadow-md hover:bg-amber-800"
        >
          Return to Safety Portal
        </button>
      </div>
    );
  }

  const selectedCategoryObj = SAFETY_SECTIONS.find(s => s.id === activeSubcategory);

  return (
    <div className="space-y-6 font-outfit text-amber-950">
      
      {/* 1. TOP ETHNIC HERO BANNER FOR WOMEN & CHILD SAFETY */}
      <div className="ethnic-card p-6 rounded-3xl bg-gradient-to-r from-purple-950 via-slate-900 to-rose-950 text-white border-2 border-amber-400 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-pink-300 font-bold text-xs uppercase tracking-wider mb-1 font-cinzel">
            <ShieldAlert className="w-4 h-4 text-pink-400" />
            <span>Women & Child Safety & Protection Cell • Government of Karnataka</span>
          </div>
          <h2 className="text-2xl font-black font-cinzel text-white flex items-center gap-2">
            <span>Women & Child Safety Portal</span>
            <span className="text-2xl">🛡️</span>
          </h2>
          <p className="text-xs text-amber-100/90 mt-1 font-bold">
            24x7 Emergency Helplines • Missing Child Alerts • Street Harassment SOS • Safe Zones • Child Labour Vigilance
          </p>
        </div>

        {/* Action Controls & Discreet Switch */}
        <div className="flex items-center space-x-2 shrink-0 flex-wrap gap-2">
          <button
            onClick={() => setDiscreetMode(true)}
            className="px-3 py-1.5 bg-slate-800/90 hover:bg-slate-700 text-pink-200 border border-pink-400/40 rounded-xl text-xs font-bold flex items-center space-x-1"
            title="Quickly hide sensitive content"
          >
            <EyeOff className="w-3.5 h-3.5 text-pink-300" />
            <span>Quick Hide (Discreet)</span>
          </button>

          <a
            href="tel:112"
            className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1 shadow-md animate-pulse"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>SOS 112</span>
          </a>
        </div>
      </div>

      {/* 2. EMERGENCY HELPLINE SHORTCUTS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <a
          href="tel:112"
          className="p-3 rounded-2xl bg-rose-50 border-2 border-rose-300 hover:border-rose-500 text-rose-950 flex items-center space-x-2.5 transition-all shadow-sm group"
        >
          <span className="text-2xl p-1.5 rounded-xl bg-rose-200 border border-rose-300">🚨</span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-rose-700">National Emergency</p>
            <p className="text-sm font-black text-rose-950 group-hover:text-rose-700">112 Helpline</p>
          </div>
        </a>

        <a
          href="tel:1098"
          className="p-3 rounded-2xl bg-teal-50 border-2 border-teal-300 hover:border-teal-500 text-teal-950 flex items-center space-x-2.5 transition-all shadow-sm group"
        >
          <span className="text-2xl p-1.5 rounded-xl bg-teal-200 border border-teal-300">🧸</span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-teal-700">Child Welfare</p>
            <p className="text-sm font-black text-teal-950 group-hover:text-teal-700">1098 Childline</p>
          </div>
        </a>

        <a
          href="tel:181"
          className="p-3 rounded-2xl bg-purple-50 border-2 border-purple-300 hover:border-purple-500 text-purple-950 flex items-center space-x-2.5 transition-all shadow-sm group"
        >
          <span className="text-2xl p-1.5 rounded-xl bg-purple-200 border border-purple-300">👩</span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-purple-700">Women in Distress</p>
            <p className="text-sm font-black text-purple-950 group-hover:text-purple-700">181 Helpline</p>
          </div>
        </a>

        <a
          href="tel:1091"
          className="p-3 rounded-2xl bg-pink-50 border-2 border-pink-300 hover:border-pink-500 text-pink-950 flex items-center space-x-2.5 transition-all shadow-sm group"
        >
          <span className="text-2xl p-1.5 rounded-xl bg-pink-200 border border-pink-300">🛡️</span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-pink-700">Women Police Patrol</p>
            <p className="text-sm font-black text-pink-950 group-hover:text-pink-700">1091 Pink Patrol</p>
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
      {/* 3. MAIN SECTION HUB: SELECT SPECIFIC SAFETY SUBCATEGORY (1-by-1) */}
      {/* ========================================================================= */}
      {activeSubcategory === null && (
        <div className="space-y-4">
          <div className="text-center space-y-1">
            <h3 className="text-lg font-black font-cinzel text-amber-950">Select a Women & Child Safety Grievance Module</h3>
            <p className="text-xs text-amber-800/80 font-bold">Choose one of the 8 dedicated domains below to fill out required safety details</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SAFETY_SECTIONS.map((sec) => (
              <button
                key={sec.id}
                onClick={() => {
                  setActiveSubcategory(sec.id);
                  if (speakText) speakText(`Selected ${sec.title}. Opening custom safety form.`);
                }}
                className={`ethnic-card p-5 rounded-3xl text-left space-y-3 hover:scale-[1.02] transition-transform gold-glow border-2 ${sec.border} group`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl p-2 rounded-2xl bg-amber-100 border border-amber-300">{sec.icon}</span>
                  <ChevronRight className="w-5 h-5 text-amber-700 group-hover:translate-x-1 transition-transform" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-amber-950 group-hover:text-amber-700 leading-tight">
                    {sec.title}
                  </h4>
                  <p className="text-[11px] text-amber-800/80 mt-1 leading-snug">
                    {sec.desc}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* ACTIVE SAFETY BROADCAST & SAFE HAVENS WIDGET */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            {/* Live Missing Child Alerts Broadcast */}
            <div className="ethnic-card p-5 rounded-3xl border-2 border-amber-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-amber-950 font-cinzel flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping"></span>
                  Active Missing Child Rapid Alerts (Ward 12)
                </span>
                <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-900 text-[10px] font-bold border border-rose-300">
                  1 Active Alert
                </span>
              </div>
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs space-y-1">
                <div className="flex justify-between font-bold text-amber-950">
                  <span>Aarav Kumar (Age 7)</span>
                  <span className="text-rose-700 font-mono">FIR #KA-KLB-094</span>
                </div>
                <p className="text-[11px] text-slate-700">Last seen near Central Park bus stop in red striped tee.</p>
                <div className="flex items-center justify-between pt-1 text-[10px] text-amber-900 font-bold">
                  <span>Reported: 2 hours ago</span>
                  <span className="text-indigo-800 underline cursor-pointer">View Photo & Details</span>
                </div>
              </div>
            </div>

            {/* Pink Safe Spaces & Police Kiosks */}
            <div className="ethnic-card p-5 rounded-3xl border-2 border-amber-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-amber-950 font-cinzel flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-purple-700" />
                  Verified Safe Havens & Pink Booths
                </span>
                <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-900 text-[10px] font-bold border border-purple-300">
                  24x7 Monitored
                </span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-800">
                <div className="p-2.5 bg-purple-50/70 rounded-xl border border-purple-200 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-purple-950">Ward 12 Pink Police Kiosk</p>
                    <p className="text-[10px] text-purple-800">Opposite Bus Stand Main Gate • 2 Female Constables</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-700">Open 24/7</span>
                </div>
                <div className="p-2.5 bg-purple-50/70 rounded-xl border border-purple-200 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-purple-950">Sakhi One-Stop Crisis Center</p>
                    <p className="text-[10px] text-purple-800">Civil Hospital Complex • Medical & Legal Aid</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-700">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. DEDICATED CUSTOM SUB-PORTALS FOR EACH OF THE 8 CATEGORIES */}
      {/* ========================================================================= */}
      {activeSubcategory && selectedCategoryObj && (
        <div className="ethnic-card p-6 rounded-3xl space-y-6 shadow-xl gold-glow border-2 border-amber-400">
          
          {/* Header & Back Button */}
          <div className="flex items-center justify-between border-b border-amber-200 pb-4">
            <button
              onClick={() => setActiveSubcategory(null)}
              className="px-3.5 py-1.5 rounded-xl bg-amber-100 text-amber-950 hover:bg-amber-200 text-xs font-bold flex items-center space-x-1 border border-amber-300"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Safety Modules</span>
            </button>

            <div className="text-right">
              <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-bold border border-purple-300">
                {selectedCategoryObj.icon} {selectedCategoryObj.title}
              </span>
            </div>
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* FORM 1: UNSAFE PUBLIC PLACE */}
          {/* --------------------------------------------------------------------- */}
          {activeSubcategory === 'safety_unsafe_public_place' && (
            <form onSubmit={(e) => { e.preventDefault(); handleSubmitSection(activeSubcategory); }} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Location / Exact Address *</label>
                  <input
                    type="text"
                    required
                    value={formData.unsafe_address}
                    onChange={(e) => handleInputChange('unsafe_address', e.target.value)}
                    placeholder="E.g. Main Market Underpass, Ward 12"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Type of Unsafe Place *</label>
                  <select
                    value={formData.unsafe_place_type}
                    onChange={(e) => handleInputChange('unsafe_place_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-medium cursor-pointer"
                  >
                    <option>Dark Alley / Unlit Street</option>
                    <option>Abandoned Building / Empty Plot</option>
                    <option>Isolated Bus Stop / Railway Halt</option>
                    <option>Underpass / Pedestrian Subway</option>
                    <option>Unlit Park / Playground after dark</option>
                    <option>Overgrown Bushes / Narrow Blind Spot</option>
                    <option>Liquor Shop Vicinity with Loitering</option>
                    <option>Other Unsafe Public Spot</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Landmark Near Location *</label>
                  <input
                    type="text"
                    required
                    value={formData.unsafe_landmark}
                    onChange={(e) => handleInputChange('unsafe_landmark', e.target.value)}
                    placeholder="E.g. Near Govt High School Water Tank"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Date and Time Noticed *</label>
                  <input
                    type="datetime-local"
                    value={formData.unsafe_datetime}
                    onChange={(e) => handleInputChange('unsafe_datetime', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">How Frequently Problem Occurs *</label>
                  <select
                    value={formData.unsafe_frequency}
                    onChange={(e) => handleInputChange('unsafe_frequency', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-medium"
                  >
                    <option>Daily after sunset</option>
                    <option>Late night (11:00 PM to 5:00 AM)</option>
                    <option>Weekends & Holidays</option>
                    <option>Frequent & Ongoing</option>
                    <option>Occasional / One-time</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Severity Level *</label>
                  <select
                    value={formData.unsafe_severity}
                    onChange={(e) => handleInputChange('unsafe_severity', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                  >
                    <option value="Low">Low - Needs Routine Improvement</option>
                    <option value="Moderate">Moderate - Safety Hazard Present</option>
                    <option value="High">High - Serious Threat to Commuters</option>
                    <option value="Critical">Critical - Immediate Threat / Emergency</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Description of Safety Issue *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.unsafe_description}
                  onChange={(e) => handleInputChange('unsafe_description', e.target.value)}
                  placeholder="Describe why this place is unsafe (e.g. broken lights, aggressive groups gathering, no escape routes)..."
                  className="w-full bg-white border border-amber-300 rounded-xl p-3 text-xs text-slate-800 font-medium"
                />
              </div>

              {/* Photo Evidence & Contact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Photo / Video Evidence</label>
                  <label className="flex items-center space-x-2 px-4 py-2.5 bg-amber-50 border border-amber-300 rounded-xl text-xs font-bold cursor-pointer hover:bg-amber-100">
                    <Camera className="w-4 h-4 text-amber-700" />
                    <span>{formData.unsafe_photo ? 'Change Photo Evidence' : 'Attach Photo Evidence'}</span>
                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload('unsafe_photo', e)} className="hidden" />
                  </label>
                  {formData.unsafe_photo && (
                    <img src={formData.unsafe_photo} alt="Preview" className="w-20 h-20 object-cover rounded-xl border border-amber-400 mt-1" />
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-amber-950">Reporter Contact Details</label>
                  <input
                    type="text"
                    disabled={formData.unsafe_anonymous}
                    value={formData.unsafe_contact}
                    onChange={(e) => handleInputChange('unsafe_contact', e.target.value)}
                    placeholder="Your Name & Phone / Email"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs text-slate-800 font-medium disabled:bg-slate-100"
                  />
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.unsafe_anonymous}
                      onChange={(e) => handleInputChange('unsafe_anonymous', e.target.checked)}
                      className="w-4 h-4 text-amber-600 rounded"
                    />
                    <span className="text-xs font-bold text-amber-950">Anonymous Reporting Option (Keep Identity Secret)</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-purple-800 to-indigo-800 text-white font-bold text-xs rounded-xl shadow-md hover:opacity-95 flex items-center justify-center space-x-2 border border-purple-300"
              >
                <span>Dispatch Unsafe Public Place Report</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* --------------------------------------------------------------------- */}
          {/* FORM 2: STREET HARASSMENT REPORTING */}
          {/* --------------------------------------------------------------------- */}
          {activeSubcategory === 'safety_street_harassment' && (
            <form onSubmit={(e) => { e.preventDefault(); handleSubmitSection(activeSubcategory); }} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Location of Incident *</label>
                  <input
                    type="text"
                    required
                    value={formData.harass_location}
                    onChange={(e) => handleInputChange('harass_location', e.target.value)}
                    placeholder="Exact street, junction or bus stop"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Date and Time *</label>
                  <input
                    type="datetime-local"
                    value={formData.harass_datetime}
                    onChange={(e) => handleInputChange('harass_datetime', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Type of Harassment *</label>
                  <select
                    value={formData.harass_type}
                    onChange={(e) => handleInputChange('harass_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                  >
                    <option>Catcalling / Verbal Abuse</option>
                    <option>Stalking / Following On Foot or Vehicle</option>
                    <option>Inappropriate Gestures / Flashing</option>
                    <option>Physical Groping / Unwanted Contact</option>
                    <option>Threatening / Aggressive Intimidation</option>
                    <option>Group Harassment in Transit</option>
                    <option>Other Street Harassment</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Whether Incident is Ongoing? *</label>
                  <div className="flex items-center space-x-4 pt-1.5">
                    {['Yes', 'No'].map((opt) => (
                      <label key={opt} className="flex items-center space-x-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="harass_ongoing"
                          checked={formData.harass_ongoing === opt}
                          onChange={() => handleInputChange('harass_ongoing', opt)}
                          className="w-4 h-4 text-rose-600"
                        />
                        <span className={`text-xs font-bold ${opt === 'Yes' ? 'text-rose-700' : 'text-slate-800'}`}>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Description of Incident *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.harass_description}
                  onChange={(e) => handleInputChange('harass_description', e.target.value)}
                  placeholder="Detail the sequence of events..."
                  className="w-full bg-white border border-amber-300 rounded-xl p-3 text-xs text-slate-800 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Description of Person Involved (Optional, if safe)</label>
                  <input
                    type="text"
                    value={formData.harass_suspect_description}
                    onChange={(e) => handleInputChange('harass_suspect_description', e.target.value)}
                    placeholder="Clothing, approx height, vehicle plate/model, features"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Witness Details (Optional)</label>
                  <input
                    type="text"
                    value={formData.harass_witness_details}
                    onChange={(e) => handleInputChange('harass_witness_details', e.target.value)}
                    placeholder="Nearby shopkeepers, passengers, bystander info"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>
              </div>

              {/* Emergency Flags */}
              <div className="p-3 bg-rose-50 rounded-2xl border border-rose-300 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-rose-950 block">Immediate Danger?</label>
                  <div className="flex items-center space-x-3 pt-1">
                    {['Yes', 'No'].map((opt) => (
                      <label key={opt} className="flex items-center space-x-1 text-xs font-bold text-rose-900 cursor-pointer">
                        <input
                          type="radio"
                          name="harass_immediate_danger"
                          checked={formData.harass_immediate_danger === opt}
                          onChange={() => handleInputChange('harass_immediate_danger', opt)}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-rose-950 block">Police / Emergency Assistance Required?</label>
                  <div className="flex items-center space-x-3 pt-1">
                    {['Yes', 'No'].map((opt) => (
                      <label key={opt} className="flex items-center space-x-1 text-xs font-bold text-rose-900 cursor-pointer">
                        <input
                          type="radio"
                          name="harass_police_assistance"
                          checked={formData.harass_police_assistance === opt}
                          onChange={() => handleInputChange('harass_police_assistance', opt)}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Anonymous & Media */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Photo / Video / Audio Evidence</label>
                  <label className="flex items-center space-x-2 px-4 py-2.5 bg-amber-50 border border-amber-300 rounded-xl text-xs font-bold cursor-pointer hover:bg-amber-100">
                    <Camera className="w-4 h-4 text-amber-700" />
                    <span>{formData.harass_evidence ? 'Evidence Attached' : 'Attach Photo/Video/Audio'}</span>
                    <input type="file" onChange={(e) => handleFileUpload('harass_evidence', e)} className="hidden" />
                  </label>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-amber-950">Reporter Contact Details</label>
                  <input
                    type="text"
                    disabled={formData.harass_anonymous}
                    value={formData.harass_contact}
                    onChange={(e) => handleInputChange('harass_contact', e.target.value)}
                    placeholder="Contact number"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs text-slate-800 disabled:bg-slate-100"
                  />
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.harass_anonymous}
                      onChange={(e) => handleInputChange('harass_anonymous', e.target.checked)}
                      className="w-4 h-4 text-rose-600 rounded"
                    />
                    <span className="text-xs font-bold text-amber-950">Anonymous Reporting Mode</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-rose-800 to-pink-800 text-white font-bold text-xs rounded-xl shadow-md hover:opacity-95 flex items-center justify-center space-x-2 border border-rose-300"
              >
                <span>Dispatch Harassment Grievance & Alert Pink Patrol</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* --------------------------------------------------------------------- */}
          {/* FORM 3: MISSING CHILD ASSISTANCE */}
          {/* --------------------------------------------------------------------- */}
          {activeSubcategory === 'safety_missing_child' && (
            <form onSubmit={(e) => { e.preventDefault(); handleSubmitSection(activeSubcategory); }} className="space-y-4">
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-300 text-xs text-amber-900 font-bold flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
                <span>Immediate Priority: Missing child profiles are broadcast to Childline 1098, Local Police & Civic Ward volunteers.</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Child's Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.missing_child_name}
                    onChange={(e) => handleInputChange('missing_child_name', e.target.value)}
                    placeholder="Full name of child"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Age *</label>
                  <input
                    type="text"
                    required
                    value={formData.missing_child_age}
                    onChange={(e) => handleInputChange('missing_child_age', e.target.value)}
                    placeholder="E.g. 7 years"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Gender *</label>
                  <select
                    value={formData.missing_child_gender}
                    onChange={(e) => handleInputChange('missing_child_gender', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                  >
                    <option>Boy</option>
                    <option>Girl</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Date and Time Last Seen *</label>
                  <input
                    type="datetime-local"
                    value={formData.missing_datetime_last_seen}
                    onChange={(e) => handleInputChange('missing_datetime_last_seen', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Last Known Location *</label>
                  <input
                    type="text"
                    required
                    value={formData.missing_last_location}
                    onChange={(e) => handleInputChange('missing_last_location', e.target.value)}
                    placeholder="Address, park, school or junction"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Clothing Worn *</label>
                  <input
                    type="text"
                    required
                    value={formData.missing_clothing}
                    onChange={(e) => handleInputChange('missing_clothing', e.target.value)}
                    placeholder="Colors of shirt, pants, shoes, cap"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Physical Identification Marks *</label>
                  <input
                    type="text"
                    required
                    value={formData.missing_id_marks}
                    onChange={(e) => handleInputChange('missing_id_marks', e.target.value)}
                    placeholder="Birthmarks, scars, spectacles, tattoos"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Height / Approximate Appearance *</label>
                  <input
                    type="text"
                    required
                    value={formData.missing_height_appearance}
                    onChange={(e) => handleInputChange('missing_height_appearance', e.target.value)}
                    placeholder="Height (e.g. 3ft 8in), build, hair"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Parent / Guardian Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.missing_parent_name}
                    onChange={(e) => handleInputChange('missing_parent_name', e.target.value)}
                    placeholder="Guardian full name"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Parent / Guardian Contact Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.missing_parent_contact}
                    onChange={(e) => handleInputChange('missing_parent_contact', e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Police Complaint / FIR Number (if available)</label>
                  <input
                    type="text"
                    value={formData.missing_fir_number}
                    onChange={(e) => handleInputChange('missing_fir_number', e.target.value)}
                    placeholder="E.g. FIR/2026/049"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Additional Information</label>
                <textarea
                  rows={2}
                  value={formData.missing_additional_info}
                  onChange={(e) => handleInputChange('missing_additional_info', e.target.value)}
                  placeholder="Languages spoken, medical requirements, allergies, last known companions..."
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>

              {/* Photo Upload */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Recent Photograph of Child *</label>
                <label className="flex items-center space-x-2 px-4 py-2.5 bg-amber-50 border border-amber-300 rounded-xl text-xs font-bold cursor-pointer hover:bg-amber-100">
                  <Camera className="w-4 h-4 text-amber-700" />
                  <span>{formData.missing_photo ? 'Change Child Photograph' : 'Upload Clear Recent Photograph'}</span>
                  <input type="file" accept="image/*" onChange={(e) => handleFileUpload('missing_photo', e)} className="hidden" />
                </label>
                {formData.missing_photo && (
                  <img src={formData.missing_photo} alt="Child" className="w-24 h-24 object-cover rounded-2xl border-2 border-amber-400 mt-2" />
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-gradient-to-r from-amber-700 via-orange-600 to-red-600 text-white font-bold text-xs rounded-xl shadow-lg hover:opacity-95 flex items-center justify-center space-x-2 border border-amber-300"
              >
                <span>Trigger Rapid Missing Child Amber Alert</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* --------------------------------------------------------------------- */}
          {/* FORM 4: CHILD LABOUR REPORTING */}
          {/* --------------------------------------------------------------------- */}
          {activeSubcategory === 'safety_child_labour' && (
            <form onSubmit={(e) => { e.preventDefault(); handleSubmitSection(activeSubcategory); }} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Location Where Child Labour Was Observed *</label>
                  <input
                    type="text"
                    required
                    value={formData.labour_location}
                    onChange={(e) => handleInputChange('labour_location', e.target.value)}
                    placeholder="Shop, building or road name"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Type of Workplace *</label>
                  <select
                    value={formData.labour_workplace_type}
                    onChange={(e) => handleInputChange('labour_workplace_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                  >
                    <option>Restaurant / Tea Stall (Dhaba)</option>
                    <option>Brick Kiln / Quarry</option>
                    <option>Auto Repair Garage / Workshop</option>
                    <option>Construction Site</option>
                    <option>Hazardous Factory / Chemical Unit</option>
                    <option>Domestic Household Work</option>
                    <option>Retail Shop / Commercial Market</option>
                    <option>Agricultural Farm</option>
                    <option>Street Selling / Begging Syndicate</option>
                    <option>Other Workplace</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Approximate Age of Child *</label>
                  <input
                    type="text"
                    required
                    value={formData.labour_child_age}
                    onChange={(e) => handleInputChange('labour_child_age', e.target.value)}
                    placeholder="E.g. 8 - 10 years"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Number of Children Involved *</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.labour_child_count}
                    onChange={(e) => handleInputChange('labour_child_count', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Working Hours (if known)</label>
                  <input
                    type="text"
                    value={formData.labour_working_hours}
                    onChange={(e) => handleInputChange('labour_working_hours', e.target.value)}
                    placeholder="E.g. 8 AM to 8 PM, all 7 days"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Date and Time Observed *</label>
                  <input
                    type="datetime-local"
                    value={formData.labour_datetime_observed}
                    onChange={(e) => handleInputChange('labour_datetime_observed', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Type of Work Being Performed *</label>
                <input
                  type="text"
                  required
                  value={formData.labour_work_type}
                  onChange={(e) => handleInputChange('labour_work_type', e.target.value)}
                  placeholder="E.g. Cleaning heavy vessels, handling toxic welding, loading cement"
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Employer / Business Details (if known)</label>
                  <input
                    type="text"
                    value={formData.labour_employer_details}
                    onChange={(e) => handleInputChange('labour_employer_details', e.target.value)}
                    placeholder="Owner name, enterprise name, contact"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Photo/Video Evidence (if safely available)</label>
                  <label className="flex items-center space-x-2 px-4 py-2.5 bg-amber-50 border border-amber-300 rounded-xl text-xs font-bold cursor-pointer hover:bg-amber-100">
                    <Camera className="w-4 h-4 text-amber-700" />
                    <span>{formData.labour_photo ? 'Evidence Attached' : 'Discreet Photo Evidence'}</span>
                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload('labour_photo', e)} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Description of the Situation *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.labour_description}
                  onChange={(e) => handleInputChange('labour_description', e.target.value)}
                  placeholder="Describe working conditions, visible signs of abuse or deprivation..."
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-300 flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.labour_anonymous}
                    onChange={(e) => handleInputChange('labour_anonymous', e.target.checked)}
                    className="w-4 h-4 text-amber-600 rounded"
                  />
                  <span className="text-xs font-bold text-amber-950">Anonymous Reporting (Recommended for citizen safety)</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-red-800 to-amber-800 text-white font-bold text-xs rounded-xl shadow-md hover:opacity-95 flex items-center justify-center space-x-2 border border-red-300"
              >
                <span>Dispatch Child Labour Vigilance Inspection</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* --------------------------------------------------------------------- */}
          {/* FORM 5: SCHOOL SAFETY ISSUE */}
          {/* --------------------------------------------------------------------- */}
          {activeSubcategory === 'safety_school_safety' && (
            <form onSubmit={(e) => { e.preventDefault(); handleSubmitSection(activeSubcategory); }} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">School Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.school_name}
                    onChange={(e) => handleInputChange('school_name', e.target.value)}
                    placeholder="E.g. Model Higher Primary School"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">School Location *</label>
                  <input
                    type="text"
                    required
                    value={formData.school_location}
                    onChange={(e) => handleInputChange('school_location', e.target.value)}
                    placeholder="Address, Ward, Area"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Type of Safety Issue *</label>
                  <select
                    value={formData.school_safety_type}
                    onChange={(e) => handleInputChange('school_safety_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                  >
                    <option>Ragging / Severe Bullying</option>
                    <option>Lack of Boundary Wall / Broken Gates</option>
                    <option>Inappropriate Staff / Driver Behavior</option>
                    <option>Unsafe School Bus / Van Transport</option>
                    <option>Substance Abuse / Tobacco Peddling near Gate</option>
                    <option>Unhygienic / Broken Sanitation Facilities</option>
                    <option>Structural / Electrical Hazard in Campus</option>
                    <option>Other School Safety Concern</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Date and Time *</label>
                  <input
                    type="datetime-local"
                    value={formData.school_datetime}
                    onChange={(e) => handleInputChange('school_datetime', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Person / Authority Involved (if applicable)</label>
                  <input
                    type="text"
                    value={formData.school_authority_involved}
                    onChange={(e) => handleInputChange('school_authority_involved', e.target.value)}
                    placeholder="Staff, senior students, driver, outsider"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Number of Students Affected *</label>
                  <input
                    type="text"
                    required
                    value={formData.school_students_affected}
                    onChange={(e) => handleInputChange('school_students_affected', e.target.value)}
                    placeholder="E.g. Single student, whole class, 10+ students"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Description of Problem *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.school_description}
                  onChange={(e) => handleInputChange('school_description', e.target.value)}
                  placeholder="Detailed description of the safety violation..."
                  className="w-full bg-white border border-amber-300 rounded-xl p-3 text-xs text-slate-800 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-300 space-y-2">
                  <label className="text-xs font-bold text-amber-950 block">Whether Issue is Still Occurring? *</label>
                  <div className="flex items-center space-x-4">
                    {['Yes', 'No'].map((opt) => (
                      <label key={opt} className="flex items-center space-x-1.5 text-xs font-bold cursor-pointer">
                        <input
                          type="radio"
                          name="school_ongoing"
                          checked={formData.school_ongoing === opt}
                          onChange={() => handleInputChange('school_ongoing', opt)}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Severity Level *</label>
                  <select
                    value={formData.school_severity}
                    onChange={(e) => handleInputChange('school_severity', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                  >
                    <option value="Low">Low</option>
                    <option value="Moderate">Moderate</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Photo / Video Evidence</label>
                  <label className="flex items-center space-x-2 px-4 py-2.5 bg-amber-50 border border-amber-300 rounded-xl text-xs font-bold cursor-pointer hover:bg-amber-100">
                    <Camera className="w-4 h-4 text-amber-700" />
                    <span>{formData.school_photo ? 'Evidence Attached' : 'Attach School Photo Evidence'}</span>
                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload('school_photo', e)} className="hidden" />
                  </label>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-amber-950">Reporter Details & Anonymous Option</label>
                  <input
                    type="text"
                    disabled={formData.school_anonymous}
                    value={formData.school_reporter_details}
                    onChange={(e) => handleInputChange('school_reporter_details', e.target.value)}
                    placeholder="Name & role (Parent/Teacher/Student)"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs text-slate-800 disabled:bg-slate-100"
                  />
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.school_anonymous}
                      onChange={(e) => handleInputChange('school_anonymous', e.target.checked)}
                      className="w-4 h-4 text-indigo-600 rounded"
                    />
                    <span className="text-xs font-bold text-amber-950">Anonymous Reporting Option</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-indigo-800 to-blue-800 text-white font-bold text-xs rounded-xl shadow-md hover:opacity-95 flex items-center justify-center space-x-2 border border-indigo-300"
              >
                <span>Submit School Safety Grievance to Block Education Officer</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* --------------------------------------------------------------------- */}
          {/* FORM 6: WOMEN SAFETY LOCATION */}
          {/* --------------------------------------------------------------------- */}
          {activeSubcategory === 'safety_women_safety_location' && (
            <form onSubmit={(e) => { e.preventDefault(); handleSubmitSection(activeSubcategory); }} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Exact Location *</label>
                  <input
                    type="text"
                    required
                    value={formData.women_safety_location}
                    onChange={(e) => handleInputChange('women_safety_location', e.target.value)}
                    placeholder="Street, underpass, park or junction name"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Landmark *</label>
                  <input
                    type="text"
                    required
                    value={formData.women_safety_landmark}
                    onChange={(e) => handleInputChange('women_safety_landmark', e.target.value)}
                    placeholder="Nearby landmark (metro, hospital, market)"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Type of Safety Concern *</label>
                  <select
                    value={formData.women_safety_concern_type}
                    onChange={(e) => handleInputChange('women_safety_concern_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                  >
                    <option>Pitch Dark / Complete Streetlight Failure</option>
                    <option>No CCTV Coverage / Blindspot</option>
                    <option>Isolated & Deserted Stretch</option>
                    <option>Loitering / Anti-social Gathering</option>
                    <option>Lack of Women Police Patrolling</option>
                    <option>Overgrown Vegetation / Blocked Footpaths</option>
                    <option>Other Infrastructure Safety Concern</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Date/Time or Usual Unsafe Hours *</label>
                  <input
                    type="text"
                    required
                    value={formData.women_safety_unsafe_hours}
                    onChange={(e) => handleInputChange('women_safety_unsafe_hours', e.target.value)}
                    placeholder="E.g. Post 7:00 PM, Late Night, 24x7"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Lighting Condition *</label>
                  <select
                    value={formData.women_safety_lighting}
                    onChange={(e) => handleInputChange('women_safety_lighting', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-medium"
                  >
                    <option>Pitch dark (all light fixtures non-functional)</option>
                    <option>Dimly lit / Fused sodium bulbs</option>
                    <option>Intermittent / Flickering lights</option>
                    <option>Poor light distribution</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Availability of CCTV / Security (if known) *</label>
                  <select
                    value={formData.women_safety_cctv}
                    onChange={(e) => handleInputChange('women_safety_cctv', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-medium"
                  >
                    <option>No CCTV surveillance installed</option>
                    <option>CCTV present but offline/broken</option>
                    <option>CCTV present but unmonitored</option>
                    <option>Security guards unavailable</option>
                    <option>Unknown</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Description of the Problem *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.women_safety_description}
                  onChange={(e) => handleInputChange('women_safety_description', e.target.value)}
                  placeholder="Detail safety hazards experienced by female commuters in this spot..."
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Frequency of Incidents *</label>
                  <select
                    value={formData.women_safety_frequency}
                    onChange={(e) => handleInputChange('women_safety_frequency', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-medium"
                  >
                    <option>Daily occurrence</option>
                    <option>Regular (multiple times a week)</option>
                    <option>Occasional</option>
                    <option>Newly emerged safety hazard</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Suggested Safety Improvement *</label>
                  <input
                    type="text"
                    required
                    value={formData.women_safety_improvement}
                    onChange={(e) => handleInputChange('women_safety_improvement', e.target.value)}
                    placeholder="E.g. Install High-Mast Light, Pink Booth, CCTV"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Photo / Video Evidence</label>
                  <label className="flex items-center space-x-2 px-4 py-2.5 bg-amber-50 border border-amber-300 rounded-xl text-xs font-bold cursor-pointer hover:bg-amber-100">
                    <Camera className="w-4 h-4 text-amber-700" />
                    <span>{formData.women_safety_photo ? 'Photo Attached' : 'Attach Location Photo'}</span>
                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload('women_safety_photo', e)} className="hidden" />
                  </label>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-amber-950">Reporter Contact Details</label>
                  <input
                    type="text"
                    disabled={formData.women_safety_anonymous}
                    value={formData.women_safety_contact}
                    onChange={(e) => handleInputChange('women_safety_contact', e.target.value)}
                    placeholder="Your contact number"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs text-slate-800 disabled:bg-slate-100"
                  />
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.women_safety_anonymous}
                      onChange={(e) => handleInputChange('women_safety_anonymous', e.target.checked)}
                      className="w-4 h-4 text-fuchsia-600 rounded"
                    />
                    <span className="text-xs font-bold text-amber-950">Anonymous Reporting Option</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-fuchsia-800 to-pink-800 text-white font-bold text-xs rounded-xl shadow-md hover:opacity-95 flex items-center justify-center space-x-2 border border-fuchsia-300"
              >
                <span>Submit Women Safety Audit to City Infrastructure & Police</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* --------------------------------------------------------------------- */}
          {/* FORM 7: DOMESTIC SUPPORT REFERRAL */}
          {/* --------------------------------------------------------------------- */}
          {activeSubcategory === 'safety_domestic_support' && (
            <form onSubmit={(e) => { e.preventDefault(); handleSubmitSection(activeSubcategory); }} className="space-y-4">
              <div className="p-3 bg-purple-50 rounded-2xl border border-purple-300 text-xs text-purple-950 font-bold flex items-center gap-2">
                <Lock className="w-5 h-5 text-purple-700 shrink-0" />
                <span>100% Encrypted & Confidential: Requests route directly to Sakhi One-Stop Crisis Center & protection counselors.</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Type of Support Required *</label>
                  <select
                    value={formData.domestic_support_type}
                    onChange={(e) => handleInputChange('domestic_support_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                  >
                    <option>Emergency Safe Shelter & Protection Order</option>
                    <option>Free Legal Aid & Protection Officer Assistance</option>
                    <option>Psychological Counselling & Trauma Therapy</option>
                    <option>Immediate Police Intervention / Rescue</option>
                    <option>Medical Attention & Forensic Support</option>
                    <option>Rehabilitation & Financial Skill Training</option>
                    <option>Child Custody & Protection Support</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Current Location *</label>
                  <input
                    type="text"
                    required
                    value={formData.domestic_current_location}
                    onChange={(e) => handleInputChange('domestic_current_location', e.target.value)}
                    placeholder="Safe address or current shelter"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Nature of the Problem *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.domestic_nature_of_problem}
                  onChange={(e) => handleInputChange('domestic_nature_of_problem', e.target.value)}
                  placeholder="Detail the circumstances (physical violence, emotional abuse, dowry harassment, threats)..."
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>

              {/* Requirement Checklist Grid */}
              <div className="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-300 space-y-3">
                <p className="text-xs font-black uppercase text-amber-950 font-cinzel">Intervention Assessment Checklist</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="font-bold text-amber-950 block">Currently in Danger? *</label>
                    <div className="flex items-center space-x-3 pt-1">
                      {['Yes', 'No'].map((opt) => (
                        <label key={opt} className="flex items-center space-x-1 font-bold cursor-pointer">
                          <input
                            type="radio"
                            name="domestic_in_danger"
                            checked={formData.domestic_in_danger === opt}
                            onChange={() => handleInputChange('domestic_in_danger', opt)}
                          />
                          <span className={opt === 'Yes' ? 'text-rose-700' : 'text-slate-800'}>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-amber-950 block">Immediate Medical Help? *</label>
                    <div className="flex items-center space-x-3 pt-1">
                      {['Yes', 'No'].map((opt) => (
                        <label key={opt} className="flex items-center space-x-1 font-bold cursor-pointer">
                          <input
                            type="radio"
                            name="domestic_medical_needed"
                            checked={formData.domestic_medical_needed === opt}
                            onChange={() => handleInputChange('domestic_medical_needed', opt)}
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-amber-950 block">Safe Shelter Required? *</label>
                    <div className="flex items-center space-x-3 pt-1">
                      {['Yes', 'No'].map((opt) => (
                        <label key={opt} className="flex items-center space-x-1 font-bold cursor-pointer">
                          <input
                            type="radio"
                            name="domestic_shelter_needed"
                            checked={formData.domestic_shelter_needed === opt}
                            onChange={() => handleInputChange('domestic_shelter_needed', opt)}
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-amber-950 block">Counselling Required? *</label>
                    <div className="flex items-center space-x-3 pt-1">
                      {['Yes', 'No'].map((opt) => (
                        <label key={opt} className="flex items-center space-x-1 font-bold cursor-pointer">
                          <input
                            type="radio"
                            name="domestic_counselling_needed"
                            checked={formData.domestic_counselling_needed === opt}
                            onChange={() => handleInputChange('domestic_counselling_needed', opt)}
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-amber-950 block">Legal Assistance Required? *</label>
                    <div className="flex items-center space-x-3 pt-1">
                      {['Yes', 'No'].map((opt) => (
                        <label key={opt} className="flex items-center space-x-1 font-bold cursor-pointer">
                          <input
                            type="radio"
                            name="domestic_legal_needed"
                            checked={formData.domestic_legal_needed === opt}
                            onChange={() => handleInputChange('domestic_legal_needed', opt)}
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Safe Contact Coordination */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Preferred Contact Method *</label>
                  <select
                    value={formData.domestic_preferred_contact}
                    onChange={(e) => handleInputChange('domestic_preferred_contact', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                  >
                    <option>Discreet WhatsApp Message</option>
                    <option>Encrypted In-App Chat</option>
                    <option>Disguised Phone Call</option>
                    <option>In-Person NGO Worker Visit</option>
                    <option>Discreet Email</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Safe Contact Time *</label>
                  <input
                    type="text"
                    required
                    value={formData.domestic_safe_time}
                    onChange={(e) => handleInputChange('domestic_safe_time', e.target.value)}
                    placeholder="E.g. 10:00 AM - 12:00 PM when alone"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Contact Details *</label>
                  <input
                    type="text"
                    required
                    value={formData.domestic_contact_details}
                    onChange={(e) => handleInputChange('domestic_contact_details', e.target.value)}
                    placeholder="Phone number / safe email"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>
              </div>

              <div className="p-3 bg-purple-50 rounded-2xl border border-purple-300 flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.domestic_anonymous}
                    onChange={(e) => handleInputChange('domestic_anonymous', e.target.checked)}
                    className="w-4 h-4 text-purple-600 rounded"
                  />
                  <span className="text-xs font-bold text-purple-950">Anonymous / Private Request Option (Discreet Encrypted Vault)</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white font-bold text-xs rounded-xl shadow-lg hover:opacity-95 flex items-center justify-center space-x-2 border border-purple-400"
              >
                <span>Dispatch Confidential Domestic Referral to Sakhi Crisis Cell</span>
                <Lock className="w-4 h-4 text-purple-300" />
              </button>
            </form>
          )}

          {/* --------------------------------------------------------------------- */}
          {/* FORM 8: CHILD WELFARE ASSISTANCE */}
          {/* --------------------------------------------------------------------- */}
          {activeSubcategory === 'safety_child_welfare' && (
            <form onSubmit={(e) => { e.preventDefault(); handleSubmitSection(activeSubcategory); }} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Child's Name (if known)</label>
                  <input
                    type="text"
                    value={formData.welfare_child_name}
                    onChange={(e) => handleInputChange('welfare_child_name', e.target.value)}
                    placeholder="Name or 'Unknown'"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Approximate Age *</label>
                  <input
                    type="text"
                    required
                    value={formData.welfare_approx_age}
                    onChange={(e) => handleInputChange('welfare_approx_age', e.target.value)}
                    placeholder="E.g. 5 - 6 years"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Gender *</label>
                  <select
                    value={formData.welfare_gender}
                    onChange={(e) => handleInputChange('welfare_gender', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                  >
                    <option>Girl</option>
                    <option>Boy</option>
                    <option>Other / Unknown</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Current Location *</label>
                  <input
                    type="text"
                    required
                    value={formData.welfare_current_location}
                    onChange={(e) => handleInputChange('welfare_current_location', e.target.value)}
                    placeholder="Platform, market, bus stand or junction"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Type of Welfare Concern *</label>
                  <select
                    value={formData.welfare_concern_type}
                    onChange={(e) => handleInputChange('welfare_concern_type', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                  >
                    <option>Abandoned / Severe Malnutrition & Illness</option>
                    <option>Orphaned Child Needing Emergency Shelter</option>
                    <option>Physical Abuse / Neglect by Caregiver</option>
                    <option>Child Found Begging on Traffic Signal</option>
                    <option>Child in Need of Immediate Medical Attention</option>
                    <option>Runaway Child at Transit Station</option>
                    <option>Other Child Welfare Emergency</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Description of the Child's Condition *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.welfare_condition_desc}
                  onChange={(e) => handleInputChange('welfare_condition_desc', e.target.value)}
                  placeholder="Describe health, visible injuries, emotional state, surroundings..."
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Parent / Guardian Details (if known)</label>
                  <input
                    type="text"
                    value={formData.welfare_parent_details}
                    onChange={(e) => handleInputChange('welfare_parent_details', e.target.value)}
                    placeholder="Guardian name / whereabouts if known"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Date and Time Observed *</label>
                  <input
                    type="datetime-local"
                    value={formData.welfare_datetime}
                    onChange={(e) => handleInputChange('welfare_datetime', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>
              </div>

              {/* Assistance Checkboxes */}
              <div className="p-3 bg-teal-50 rounded-2xl border border-teal-300 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-teal-950 block">Medical Assistance Required? *</label>
                  <div className="flex items-center space-x-3 pt-1">
                    {['Yes', 'No'].map((opt) => (
                      <label key={opt} className="flex items-center space-x-1 text-xs font-bold text-teal-900 cursor-pointer">
                        <input
                          type="radio"
                          name="welfare_medical_needed"
                          checked={formData.welfare_medical_needed === opt}
                          onChange={() => handleInputChange('welfare_medical_needed', opt)}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-teal-950 block">Food / Shelter Required? *</label>
                  <div className="flex items-center space-x-3 pt-1">
                    {['Yes', 'No'].map((opt) => (
                      <label key={opt} className="flex items-center space-x-1 text-xs font-bold text-teal-900 cursor-pointer">
                        <input
                          type="radio"
                          name="welfare_food_shelter_needed"
                          checked={formData.welfare_food_shelter_needed === opt}
                          onChange={() => handleInputChange('welfare_food_shelter_needed', opt)}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">Photo / Video Evidence (if appropriate and safe)</label>
                  <label className="flex items-center space-x-2 px-4 py-2.5 bg-amber-50 border border-amber-300 rounded-xl text-xs font-bold cursor-pointer hover:bg-amber-100">
                    <Camera className="w-4 h-4 text-amber-700" />
                    <span>{formData.welfare_photo ? 'Evidence Attached' : 'Attach Photo Evidence'}</span>
                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload('welfare_photo', e)} className="hidden" />
                  </label>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-amber-950">Reporter Contact Details</label>
                  <input
                    type="text"
                    disabled={formData.welfare_anonymous}
                    value={formData.welfare_contact}
                    onChange={(e) => handleInputChange('welfare_contact', e.target.value)}
                    placeholder="Your contact number"
                    className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs text-slate-800 disabled:bg-slate-100"
                  />
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.welfare_anonymous}
                      onChange={(e) => handleInputChange('welfare_anonymous', e.target.checked)}
                      className="w-4 h-4 text-teal-600 rounded"
                    />
                    <span className="text-xs font-bold text-amber-950">Anonymous Reporting Option</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-teal-800 to-emerald-800 text-white font-bold text-xs rounded-xl shadow-md hover:opacity-95 flex items-center justify-center space-x-2 border border-teal-300"
              >
                <span>Dispatch Child Welfare Request to Childline 1098 & CWC</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}

        </div>
      )}

    </div>
  );
}
