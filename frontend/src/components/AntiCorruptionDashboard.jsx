import React, { useState } from 'react';
import {
  Scale, ShieldAlert, Phone, AlertTriangle, FileText, CheckCircle2, Lock,
  Building2, UserCheck, Calculator, ArrowLeft, Send, Sparkles, HelpCircle,
  EyeOff, Award, ChevronRight, Upload, Search, ShieldCheck, DollarSign
} from 'lucide-react';

export const CORRUPTION_SUBCATEGORIES = [
  { id: 'corruption_bribery', name: '1. Bribery Demand by Office Staff', icon: '💰', desc: 'Direct cash/online bribe demands for certificates, inspections, or speedy work' },
  { id: 'corruption_misconduct', name: '2. Official Misconduct / Service Denial', icon: '📋', desc: 'Arbitrary service refusal, harassment, unauthorized delays & misbehavior' },
  { id: 'corruption_illegal_commission', name: '3. Illegal Commission / Extra Money Demand', icon: '💵', desc: 'Charging over the official government fee (e.g. ₹500 fee + ₹1,000 commission)' },
  { id: 'corruption_gov_scheme', name: '4. Corruption in Government Schemes', icon: '🏛️', desc: 'Siphoning scheme funds, cuts from pensions, housing or scholarships' },
  { id: 'corruption_fake_docs', name: '5. Fake Government Documents', icon: '📄', desc: 'Forged caste, income, birth/death certificates or fraudulent permits' },
  { id: 'corruption_tender_irregularity', name: '6. Tender / Contract Irregularity', icon: '📑', desc: 'Fake bidding, contractor favoritism, substandard public construction' },
  { id: 'corruption_recruitment_bribe', name: '7. Recruitment / Job Bribe', icon: '💼', desc: 'Payment demanded for government jobs, exam leaks or interview rigging' },
  { id: 'corruption_police_misconduct', name: '8. Police Misconduct', icon: '👮', desc: 'Refusal to file FIR, unlawful detention, bribery or witness threats' },
  { id: 'corruption_land_record_manipulation', name: '9. Land / Property Record Manipulation', icon: '🏠', desc: 'Unauthorized RTC/khata changes, forged survey numbers or illegal registration' },
  { id: 'corruption_ration_corruption', name: '10. Ration / Food Scheme Corruption', icon: '🍚', desc: 'Short ration distribution, overcharging & diversion of PDS grains' },
  { id: 'corruption_school_misconduct', name: '11. School / College Official Misconduct', icon: '🎓', desc: 'Illegal capitation fees, certificate withholding, discrimination & exam malpractice' },
  { id: 'corruption_healthcare_corruption', name: '12. Healthcare Service Corruption', icon: '🏥', desc: 'Selling free hospital medicines, demanding bribes for surgeries/beds & fake bills' }
];

export default function AntiCorruptionDashboard({ speakText, currentUser, initialFeatureModule, onBack, hideOtherModules = true }) {
  const [selectedSubcategory, setSelectedSubcategory] = useState(
    initialFeatureModule || 'corruption_bribery'
  );

  React.useEffect(() => {
    if (initialFeatureModule) {
      setSelectedSubcategory(initialFeatureModule);
    }
  }, [initialFeatureModule]);

  const [submittedMessage, setSubmittedMessage] = useState(null);

  // Common and Subcategory-specific form state
  const [formData, setFormData] = useState({
    // Common fields
    identity_preference: 'Confidential', // 'Public' | 'Confidential' | 'Anonymous'
    urgency_level: 'High',
    incident_date: new Date().toISOString().slice(0, 10),
    incident_time: '11:30',
    gps_location: '17.3297° N, 76.8343° E (Kalaburagi City)',
    witness_details: '',
    previous_complaint: 'No',
    previous_complaint_id: '',
    evidence_file: null,
    incident_description: '',

    // 1. Bribery Demand
    bribe_dept_name: 'Revenue & Tehsildar Office, Kalaburagi',
    bribe_dept_address: 'Mini Vidhana Soudha, Main Road',
    bribe_official_name: 'R. K. Kulkarni',
    bribe_official_designation: 'First Division Assistant (FDA)',
    bribe_service_requested: 'Land Mutation Certificate & Khata Transfer',
    bribe_purpose_visit: 'Document submission & verification',
    bribe_amount_demanded: '5000',
    bribe_amount_paid: '0',
    bribe_reason_given: 'Speed up file processing and bypass objection',
    bribe_payment_method: 'Cash',
    bribe_category: 'Bribe for document processing',

    // 2. Official Misconduct / Service Denial
    misconduct_dept_name: 'Kalaburagi City Municipal Corporation',
    misconduct_office_address: 'Station Road, Kalaburagi',
    misconduct_official_name: 'S. N. Patil',
    misconduct_designation: 'Assistant Executive Engineer',
    misconduct_service_requested: 'Sanction for Domestic Water Connection',
    misconduct_ref_number: 'APP-2026-KMC-9941',
    misconduct_service_status: 'Service Denied',
    misconduct_reason_given: 'File misplaced / Officer unavailable indefinitely',
    misconduct_prev_visits: '4',
    misconduct_category: 'Unauthorized refusal',

    // 3. Illegal Commission / Extra Money Demand
    comm_dept_name: 'Regional Transport Office (RTO), Kalaburagi',
    comm_agent_name: 'Vijay Agency / Token Counter Staff',
    comm_designation: 'Licensing Agent / Counter Clerk',
    comm_service_involved: 'Commercial Driving License Renewal',
    comm_official_fee: '500',
    comm_extra_demanded: '1200',
    comm_reason_given: 'Processing facilitation and immediate token issuance',
    comm_receipt_provided: 'No',
    comm_payment_method: 'UPI (QR Code shown at side desk)',

    // 4. Corruption in Government Schemes
    scheme_name: 'Pradhan Mantri Awas Yojana (Urban)',
    scheme_category: 'Housing',
    scheme_department: 'Urban Poverty Alleviation Board',
    scheme_app_number: 'PMAY-U-2026-4821',
    scheme_beneficiary_name: currentUser?.name || 'Anita Deshmukh',
    scheme_beneficiary_id: 'BEN-KA-99120',
    scheme_location: 'Ward 12, Kalaburagi',
    scheme_expected_benefit: '₹1,50,00,000 Installment Subsidy',
    scheme_benefit_received: '₹1,00,000 Received (₹50,000 Withheld)',
    scheme_amount_demanded: '15000',
    scheme_official_name: 'Field Officer Mahendra',
    scheme_reason: 'Cut demanded to release 2nd construction stage installment',

    // 5. Fake Government Documents
    fake_doc_type: 'Income & Caste Certificate',
    fake_doc_number: 'RD-0038842199-KAR',
    fake_issuing_dept: 'Revenue Department / Nadakacheri',
    fake_issuing_office: 'Old City Center Nadakacheri',
    fake_person_involved: 'Fake Stamp Syndicate / Local Middleman',
    fake_doc_date: '2026-06-15',
    fake_purpose: 'Availing minority educational quota seats',
    fake_why_fake: 'QR code fails verification and barcode belongs to different citizen',
    fake_verification_attempted: 'Yes',
    fake_verification_result: 'Not found in official Bhoomi/Seva Sindhu portal',

    // 6. Tender / Contract Irregularity
    tender_number: 'KMC-ROAD-TNDR-2026-08',
    tender_dept: 'Public Works Department (PWD) / KMC Civil Cell',
    tender_project_name: 'Ward 12 Stormwater Drain & Bitumen Road Asphalt Project',
    tender_contractor: 'Apex Infra Projects Pvt Ltd',
    tender_contract_value: '₹2,40,00,000',
    tender_estimated_cost: '₹1,60,00,000',
    tender_method: 'E-Procurement Single Bidder Manipulation',
    tender_irregularity_category: 'Bid manipulation & Overpricing',
    tender_bidders_involved: 'Apex Infra and 2 dummy sister firms',
    tender_conflict_details: 'Sub-contractor is closely related to municipal supervising engineer',
    tender_work_completed: 'Partially (20%)',
    tender_quality_issue: 'Inferior grade asphalt disintegrating within 2 weeks of rain',
    tender_amount_involved: '₹80,00,000 Excess Inflation',

    // 7. Recruitment / Job Bribe
    recruitment_org: 'Karnataka Municipal Administrative Services Board',
    recruitment_job_position: 'Junior Health Inspector (Group C)',
    recruitment_type: 'Direct Government Recruitment',
    recruitment_notif_no: 'KMASB/REC/2026/04',
    recruitment_official_name: 'Middleman claiming access to Selection Committee',
    recruitment_amount_demanded: '400000',
    recruitment_amount_paid: '0',
    recruitment_payment_method: 'Advance Cash & Original Marks Sheet Deposit',
    recruitment_reason: 'Guarantee selection in interview and physical document stage',
    recruitment_app_number: 'JHI-APP-8841',
    recruitment_category: 'Bribe for job selection',

    // 8. Police Misconduct
    police_station_name: 'Brahampur Police Station, Kalaburagi',
    police_station_address: 'Main Road, Brahampur Circle',
    police_officer_name: 'Sub-Inspector (PSI) R. Hiremath',
    police_badge_no: 'PSI-KA-32-441',
    police_designation: 'Station In-Charge Sub-Inspector',
    police_type_misconduct: 'Refusal to register complaint',
    police_fir_filed: 'No',
    police_fir_no: 'Refused registration',
    police_money_demanded: '₹10,000 demanded to accept theft FIR',
    police_category: 'Refusal to register FIR & Bribe demand',

    // 9. Land / Property Record Manipulation
    land_survey_no: 'Survey # 142/2B, Ward 12',
    land_property_type: 'Agricultural converted to Residential Plot',
    land_address: 'Sedam Road outskirts, Kalaburagi',
    land_owner_name: 'Govind Rao Deshmukh (Deceased)',
    land_co_owner: 'Anita Deshmukh (Legal Heir)',
    land_doc_no: 'REG-KAL-2026-9921',
    land_record_type: 'Pahani / RTC Patta & E-Swathu Khata',
    land_manipulation_nature: 'Unauthorized ownership change',
    land_official_involved: 'Village Accountant & Sub-Registrar Clerk',
    land_amount_involved: '₹45,00,000 Property Value',
    land_category: 'Unauthorized ownership change & Forged mutation',

    // 10. Ration / Food Scheme Corruption
    ration_shop_no: 'Fair Price Shop (FPS) # 44, Ward 12',
    ration_dealer_name: 'Gopal Reddy',
    ration_shop_location: 'Near Old Water Tank, Kalaburagi',
    ration_card_no: 'BPL-KAR-0842-1192',
    ration_beneficiary_name: currentUser?.name || 'Anita Deshmukh',
    ration_scheme_name: 'Anna Bhagya / NFSA BPL Scheme',
    ration_entitlement: '20 kg Rice, 5 kg Wheat, 1 kg Sugar',
    ration_quantity_received: '12 kg Rice, 3 kg Wheat',
    ration_quantity_expected: '20 kg Rice, 5 kg Wheat',
    ration_amount_paid: '₹150 (Charged illegitimately for free grains)',
    ration_items_missing: '8 kg Rice short, 2 kg Wheat short, Sugar completely denied',
    ration_overcharge_details: 'Demanding ₹15/kg for grains allocated free by government',
    ration_category: 'Less ration supplied & Overcharging',

    // 11. School / College Official Misconduct
    school_inst_name: 'Adarsha PU College & Science Institute',
    school_inst_type: 'Government Aided Educational Institution',
    school_address: 'University Road, Kalaburagi',
    school_department: 'Administration & Examination Branch',
    school_official_name: 'Principal S. M. Channur',
    school_designation: 'Head Principal',
    school_misconduct_cat: 'Unauthorized fee & Certificate withholding',
    school_amount_involved: '₹12,000 mandatory cash donation demand',
    school_description: 'Withholding Transfer Certificate (TC) and 2nd PU marks cards unless cash building fund receipt is purchased',

    // 12. Healthcare Service Corruption
    health_hospital_name: 'Kalaburagi District Civil General Hospital (GIMS)',
    health_hospital_type: 'Government Teaching Hospital',
    health_address: 'Sedam Road, Kalaburagi',
    health_department: 'Orthopedic Surgery & Free Pharmacy Counter',
    health_staff_name: 'Staff Nurse & Pharmacy In-Charge',
    health_staff_designation: 'Senior Pharmacy Officer',
    health_service_required: 'Emergency Fracture Implant Surgery & Antibiotics',
    health_category: 'Free medicine being sold & Bribe for surgery date',
    health_amount_demanded: '8000',
    health_amount_paid: '3000',
    health_official_fee: '0 (Government Free Scheme)',
    health_extra_amount: '8000',
    health_payment_method: 'Direct cash handed in private chamber',
    health_description: 'Free government surgical implants and antibiotics redirected to nearby private pharmacy and sold at full retail price'
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleQuickReportSubmit = (e) => {
    if (e) e.preventDefault();
    const subcatObj = CORRUPTION_SUBCATEGORIES.find(s => s.id === selectedSubcategory);
    const complaintId = `VIG-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

    const message = `Whistleblower Grievance logged under [${subcatObj?.name}]. Complaint ID: ${complaintId}. Forwarded to Karnataka Lokayukta / Anti-Corruption Bureau with High Priority Vigilance Escort.`;
    setSubmittedMessage(message);

    if (speakText) {
      speakText(`Anti-corruption grievance lodged successfully. Reference number ${complaintId}. Confidential whistleblower protection active.`);
    }
  };

  const selectedSubcatObj = CORRUPTION_SUBCATEGORIES.find(s => s.id === selectedSubcategory) || CORRUPTION_SUBCATEGORIES[0];

  return (
    <div className="space-y-6 font-outfit">
      
      {/* 1. TOP 24x7 VIGILANCE HOTLINE BANNER */}
      <div className="ethnic-card p-6 rounded-3xl bg-gradient-to-r from-slate-950 via-rose-950 to-amber-950 text-white border-2 border-rose-400 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full bg-rose-600/30 border border-rose-400 text-rose-300 text-xs font-bold font-cinzel flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-rose-400" />
                <span>Zero Tolerance Governance Cell • Central Vigilance Portal</span>
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black font-cinzel text-white flex items-center space-x-2">
              <span>Anti-Corruption & Whistleblower Operations</span>
              <span className="text-2xl">⚖️</span>
            </h2>
            <p className="text-xs text-rose-200/90 font-medium">
              Direct statutory link to **Karnataka Lokayukta**, **Anti-Corruption Bureau (ACB)**, and **Central Vigilance Commission (CVC)**.
            </p>
          </div>

          {/* Quick SOS Hotline Triggers */}
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="tel:1064"
              className="px-4 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black shadow-lg flex items-center space-x-2 border border-rose-300 animate-pulse transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>1064 ACB Hotline</span>
            </a>
            <a
              href="tel:1964"
              className="px-4 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-black shadow-lg flex items-center space-x-2 border border-amber-300 transition-all"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>1964 CVC Vigilance</span>
            </a>
            {onBack && (
              <button
                onClick={onBack}
                className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center space-x-1.5 border border-white/20 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Hub</span>
              </button>
            )}
          </div>
        </div>

        {/* Protection Assurance Strip */}
        <div className="p-3 bg-white/10 rounded-2xl border border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="flex items-center space-x-2 text-rose-200">
            <Lock className="w-4 h-4 text-rose-400 shrink-0" />
            <span>Encrypted Identity Masking (Whistleblower Protection Act)</span>
          </div>
          <div className="flex items-center space-x-2 text-amber-200">
            <UserCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Direct Assignment to Special Vigilance Superintendent</span>
          </div>
          <div className="flex items-center space-x-2 text-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Mandatory 48-Hour Preliminary Inquiry SLA</span>
          </div>
        </div>
      </div>

      {/* Success Notification */}
      {submittedMessage && (
        <div className="p-4 bg-emerald-50 border-2 border-emerald-400 rounded-3xl text-xs font-bold text-emerald-950 flex items-center justify-between shadow-lg">
          <div className="flex items-center space-x-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{submittedMessage}</span>
          </div>
          <button
            onClick={() => setSubmittedMessage(null)}
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
              Select Specific Corruption Category ({CORRUPTION_SUBCATEGORIES.length} Areas)
            </h3>
            <span className="text-[11px] font-bold text-amber-800">Tap category to view specialized form</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {CORRUPTION_SUBCATEGORIES.map((subcat) => (
              <button
                key={subcat.id}
                type="button"
                onClick={() => {
                  setSelectedSubcategory(subcat.id);
                  if (speakText) speakText(`Selected ${subcat.name}`);
                }}
                className={`p-3 rounded-2xl border-2 text-left transition-all flex flex-col justify-between space-y-2 ${
                  selectedSubcategory === subcat.id
                    ? 'border-rose-600 bg-rose-50 shadow-md ring-2 ring-rose-300'
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

      {/* 3. DYNAMIC INTERACTIVE FORM FOR SELECTED SUBCATEGORY */}
      <div className="ethnic-card p-6 rounded-3xl shadow-xl gold-glow border-2 border-rose-300 space-y-6">
        
        {/* Subcategory Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-200 pb-4">
          <div className="space-y-0.5">
            <span className="px-3 py-0.5 rounded-full bg-rose-100 text-rose-900 border border-rose-300 text-[11px] font-bold">
              Active Category Module
            </span>
            <h4 className="text-lg font-black font-cinzel text-amber-950 flex items-center gap-2 pt-1">
              <span>{selectedSubcatObj.icon}</span>
              <span>{selectedSubcatObj.name}</span>
            </h4>
            <p className="text-xs text-amber-800 font-medium">{selectedSubcatObj.desc}</p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-slate-700">Identity Mode:</span>
            <select
              value={formData.identity_preference}
              onChange={(e) => handleChange('identity_preference', e.target.value)}
              className="bg-white border border-rose-300 rounded-xl px-3 py-1.5 text-xs font-bold text-rose-950 focus:border-rose-600 shadow-sm"
            >
              <option value="Confidential">Confidential (Name hidden from accused)</option>
              <option value="Anonymous">Anonymous (100% Identity Masked)</option>
              <option value="Public">Public Citizen Disclosure</option>
            </select>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* 1. BRIBERY DEMAND BY OFFICE STAFF */}
        {/* ------------------------------------------------------------------ */}
        {selectedSubcategory === 'corruption_bribery' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Office / Department Name *</label>
                <input
                  type="text"
                  value={formData.bribe_dept_name}
                  onChange={(e) => handleChange('bribe_dept_name', e.target.value)}
                  placeholder="E.g. Revenue Office, City Municipal Council"
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Office Address / Location *</label>
                <input
                  type="text"
                  value={formData.bribe_dept_address}
                  onChange={(e) => handleChange('bribe_dept_address', e.target.value)}
                  placeholder="Street, locality, city"
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Staff / Official Name</label>
                <input
                  type="text"
                  value={formData.bribe_official_name}
                  onChange={(e) => handleChange('bribe_official_name', e.target.value)}
                  placeholder="Official or desk staff name"
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Designation / Role</label>
                <input
                  type="text"
                  value={formData.bribe_official_designation}
                  onChange={(e) => handleChange('bribe_official_designation', e.target.value)}
                  placeholder="E.g. FDA, Revenue Inspector, Caseworker"
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Service Requested *</label>
                <input
                  type="text"
                  value={formData.bribe_service_requested}
                  onChange={(e) => handleChange('bribe_service_requested', e.target.value)}
                  placeholder="E.g. Khata Transfer, Trade License, Building Plan Sanction"
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Bribe Category *</label>
                <select
                  value={formData.bribe_category}
                  onChange={(e) => handleChange('bribe_category', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                >
                  <option>Bribe demanded for certificate</option>
                  <option>Bribe for approval / sanction</option>
                  <option>Bribe for government service delivery</option>
                  <option>Bribe for document processing</option>
                  <option>Bribe for inspection clearance</option>
                  <option>Bribe for faster / tatkal service</option>
                  <option>Other bribery extortion</option>
                </select>
              </div>
            </div>

            <div className="p-3.5 bg-rose-50 rounded-2xl border border-rose-300 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="font-bold text-rose-950 block">Amount Demanded (₹) *</label>
                <input
                  type="number"
                  value={formData.bribe_amount_demanded}
                  onChange={(e) => handleChange('bribe_amount_demanded', e.target.value)}
                  className="w-full bg-white border border-rose-300 rounded-xl p-2 text-xs mt-1 font-bold text-rose-900"
                />
              </div>
              <div>
                <label className="font-bold text-rose-950 block">Amount Paid So Far (₹)</label>
                <input
                  type="number"
                  value={formData.bribe_amount_paid}
                  onChange={(e) => handleChange('bribe_amount_paid', e.target.value)}
                  className="w-full bg-white border border-rose-300 rounded-xl p-2 text-xs mt-1 font-bold text-slate-800"
                />
              </div>
              <div>
                <label className="font-bold text-rose-950 block">Payment Method</label>
                <select
                  value={formData.bribe_payment_method}
                  onChange={(e) => handleChange('bribe_payment_method', e.target.value)}
                  className="w-full bg-white border border-rose-300 rounded-xl p-2 text-xs mt-1 font-bold text-slate-800"
                >
                  <option>Cash Demand in Person</option>
                  <option>UPI / QR Code Transfer</option>
                  <option>Direct Bank Transfer / Account</option>
                  <option>Gift / In-kind demand</option>
                  <option>Through Middleman / Broker</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-amber-950">Reason Given for Payment</label>
              <input
                type="text"
                value={formData.bribe_reason_given}
                onChange={(e) => handleChange('bribe_reason_given', e.target.value)}
                placeholder="What reason did the official give for demanding money?"
                className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
              />
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* 2. OFFICIAL MISCONDUCT / SERVICE DENIAL */}
        {/* ------------------------------------------------------------------ */}
        {selectedSubcategory === 'corruption_misconduct' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Department / Office Name *</label>
                <input
                  type="text"
                  value={formData.misconduct_dept_name}
                  onChange={(e) => handleChange('misconduct_dept_name', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Office Address *</label>
                <input
                  type="text"
                  value={formData.misconduct_office_address}
                  onChange={(e) => handleChange('misconduct_office_address', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Official Name & Designation</label>
                <input
                  type="text"
                  value={`${formData.misconduct_official_name} (${formData.misconduct_designation})`}
                  onChange={(e) => handleChange('misconduct_official_name', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Application / Ack Reference Number</label>
                <input
                  type="text"
                  value={formData.misconduct_ref_number}
                  onChange={(e) => handleChange('misconduct_ref_number', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Nature of Misconduct *</label>
                <select
                  value={formData.misconduct_category}
                  onChange={(e) => handleChange('misconduct_category', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                >
                  <option>Service denial</option>
                  <option>Unnecessary delay (&gt; 30 days)</option>
                  <option>Misbehavior & verbal abuse</option>
                  <option>Abuse of authority</option>
                  <option>Discrimination based on community/gender</option>
                  <option>Harassment</option>
                  <option>Unauthorized refusal to accept application</option>
                  <option>Failure to respond to statutory RTI/SLA</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Number of Previous Visits</label>
                <input
                  type="number"
                  value={formData.misconduct_prev_visits}
                  onChange={(e) => handleChange('misconduct_prev_visits', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-amber-950">Reason Given by Official for Denial/Delay</label>
              <textarea
                rows={2}
                value={formData.misconduct_reason_given}
                onChange={(e) => handleChange('misconduct_reason_given', e.target.value)}
                className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
              />
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* 3. ILLEGAL COMMISSION / EXTRA MONEY DEMAND (With Auto Calculation) */}
        {/* ------------------------------------------------------------------ */}
        {selectedSubcategory === 'corruption_illegal_commission' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Department / Organization *</label>
                <input
                  type="text"
                  value={formData.comm_dept_name}
                  onChange={(e) => handleChange('comm_dept_name', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Official / Agent Name</label>
                <input
                  type="text"
                  value={formData.comm_agent_name}
                  onChange={(e) => handleChange('comm_agent_name', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Service Involved *</label>
                <input
                  type="text"
                  value={formData.comm_service_involved}
                  onChange={(e) => handleChange('comm_service_involved', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Receipt Provided? *</label>
                <select
                  value={formData.comm_receipt_provided}
                  onChange={(e) => handleChange('comm_receipt_provided', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                >
                  <option value="No">No Receipt for extra money</option>
                  <option value="Yes">Partial Receipt provided</option>
                </select>
              </div>
            </div>

            {/* Auto Calculation Card */}
            <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-300 space-y-3">
              <div className="flex items-center space-x-2 text-amber-950 font-bold text-xs">
                <Calculator className="w-4 h-4 text-amber-600" />
                <span>Excess & Illegal Extra Payment Calculator</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Official Gov Fee (₹)</label>
                  <input
                    type="number"
                    value={formData.comm_official_fee}
                    onChange={(e) => handleChange('comm_official_fee', e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs font-bold text-slate-900"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-rose-700">Illegal Extra Demanded (₹)</label>
                  <input
                    type="number"
                    value={formData.comm_extra_demanded}
                    onChange={(e) => handleChange('comm_extra_demanded', e.target.value)}
                    className="w-full bg-white border border-rose-400 rounded-xl p-2 text-xs font-bold text-rose-900"
                  />
                </div>
                <div className="p-2.5 bg-rose-100/70 border border-rose-300 rounded-xl text-center flex flex-col justify-center">
                  <span className="text-[10px] uppercase font-bold text-rose-950">Total Amount Extorted</span>
                  <span className="text-base font-black text-rose-900 font-mono">
                    ₹{(Number(formData.comm_official_fee) || 0) + (Number(formData.comm_extra_demanded) || 0)}
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-rose-800 font-bold flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600 inline shrink-0" />
                <span>AI Flags: Extortion rate is {Math.round(((Number(formData.comm_extra_demanded) || 0) / (Number(formData.comm_official_fee) || 1)) * 100)}% over the official government gazetted rate.</span>
              </p>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* 4. CORRUPTION IN GOVERNMENT SCHEMES */}
        {/* ------------------------------------------------------------------ */}
        {selectedSubcategory === 'corruption_gov_scheme' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Scheme Name *</label>
                <input
                  type="text"
                  value={formData.scheme_name}
                  onChange={(e) => handleChange('scheme_name', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Scheme Category *</label>
                <select
                  value={formData.scheme_category}
                  onChange={(e) => handleChange('scheme_category', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                >
                  <option>Housing (PMAY / Rajiv Gandhi)</option>
                  <option>Scholarship (Post-Matric / NSP)</option>
                  <option>Pension (Old Age / Widow / Disability)</option>
                  <option>Employment (MGNREGA / Skill)</option>
                  <option>Farmer Scheme (PM-Kisan / Ganga Kalyana)</option>
                  <option>Healthcare Scheme (Ayushman Bharat / Arogya)</option>
                  <option>Food Subsidy (Anna Bhagya PDS)</option>
                  <option>Women & Child Welfare Grants</option>
                  <option>Other Government Scheme</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Application / Beneficiary ID</label>
                <input
                  type="text"
                  value={formData.scheme_app_number}
                  onChange={(e) => handleChange('scheme_app_number', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
            </div>

            <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-300 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="font-bold text-amber-950 block">Expected Scheme Benefit</label>
                <input
                  type="text"
                  value={formData.scheme_expected_benefit}
                  onChange={(e) => handleChange('scheme_expected_benefit', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs mt-1 font-bold text-slate-800"
                />
              </div>
              <div>
                <label className="font-bold text-amber-950 block">Benefit Actually Received</label>
                <input
                  type="text"
                  value={formData.scheme_benefit_received}
                  onChange={(e) => handleChange('scheme_benefit_received', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs mt-1 font-bold text-slate-800"
                />
              </div>
              <div>
                <label className="font-bold text-rose-950 block">Bribe Demanded to Release (₹)</label>
                <input
                  type="number"
                  value={formData.scheme_amount_demanded}
                  onChange={(e) => handleChange('scheme_amount_demanded', e.target.value)}
                  className="w-full bg-white border border-rose-300 rounded-xl p-2 text-xs mt-1 font-bold text-rose-900"
                />
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* 5. FAKE GOVERNMENT DOCUMENTS */}
        {/* ------------------------------------------------------------------ */}
        {selectedSubcategory === 'corruption_fake_docs' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Document Type *</label>
                <select
                  value={formData.fake_doc_type}
                  onChange={(e) => handleChange('fake_doc_type', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                >
                  <option>Income certificate</option>
                  <option>Caste certificate</option>
                  <option>Residence certificate</option>
                  <option>Land / RTC / Mutation document</option>
                  <option>Aadhaar-related fraudulent document</option>
                  <option>Birth / Death certificate</option>
                  <option>Government ID / Staff Card</option>
                  <option>Building Trade License / Permit</option>
                  <option>Other Fake Government Document</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Suspected Document Number</label>
                <input
                  type="text"
                  value={formData.fake_doc_number}
                  onChange={(e) => handleChange('fake_doc_number', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Issuing Office / Suspect</label>
                <input
                  type="text"
                  value={formData.fake_issuing_office}
                  onChange={(e) => handleChange('fake_issuing_office', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-amber-950">Why do you believe this document is forged/fake? *</label>
              <textarea
                rows={2}
                value={formData.fake_why_fake}
                onChange={(e) => handleChange('fake_why_fake', e.target.value)}
                placeholder="Explain discrepancies in seals, QR codes, signatures or mismatched records..."
                className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
              />
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* 6. TENDER / CONTRACT IRREGULARITY */}
        {/* ------------------------------------------------------------------ */}
        {selectedSubcategory === 'corruption_tender_irregularity' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Tender / Contract Number *</label>
                <input
                  type="text"
                  value={formData.tender_number}
                  onChange={(e) => handleChange('tender_number', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Department / Body *</label>
                <input
                  type="text"
                  value={formData.tender_dept}
                  onChange={(e) => handleChange('tender_dept', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Contractor / Company Name</label>
                <input
                  type="text"
                  value={formData.tender_contractor}
                  onChange={(e) => handleChange('tender_contractor', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Contract Value</label>
                <input
                  type="text"
                  value={formData.tender_contract_value}
                  onChange={(e) => handleChange('tender_contract_value', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Nature of Irregularity *</label>
                <select
                  value={formData.tender_irregularity_category}
                  onChange={(e) => handleChange('tender_irregularity_category', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                >
                  <option>Fake bidding / Cartelization</option>
                  <option>Bid manipulation & Overpricing</option>
                  <option>Favoritism to specific contractor</option>
                  <option>Substandard / Poor quality civil work</option>
                  <option>Conflict of interest with supervising engineers</option>
                  <option>Payment released without work completion</option>
                  <option>Contract violation & forged bills</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Estimated Siphoned Amount</label>
                <input
                  type="text"
                  value={formData.tender_amount_involved}
                  onChange={(e) => handleChange('tender_amount_involved', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* 7. RECRUITMENT / JOB BRIBE */}
        {/* ------------------------------------------------------------------ */}
        {selectedSubcategory === 'corruption_recruitment_bribe' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Department / Organization *</label>
                <input
                  type="text"
                  value={formData.recruitment_org}
                  onChange={(e) => handleChange('recruitment_org', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Job Position *</label>
                <input
                  type="text"
                  value={formData.recruitment_job_position}
                  onChange={(e) => handleChange('recruitment_job_position', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Recruitment Category *</label>
                <select
                  value={formData.recruitment_category}
                  onChange={(e) => handleChange('recruitment_category', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                >
                  <option>Bribe for job selection</option>
                  <option>Bribe for interview marks manipulation</option>
                  <option>Bribe for promotion / transfer</option>
                  <option>Fake recruitment / fake appointment letter</option>
                  <option>Exam paper leak / optical manipulation</option>
                </select>
              </div>
            </div>

            <div className="p-3.5 bg-rose-50 rounded-2xl border border-rose-300 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-bold text-rose-950 block">Bribe Amount Demanded (₹) *</label>
                <input
                  type="number"
                  value={formData.recruitment_amount_demanded}
                  onChange={(e) => handleChange('recruitment_amount_demanded', e.target.value)}
                  className="w-full bg-white border border-rose-300 rounded-xl p-2 text-xs mt-1 font-bold text-rose-900"
                />
              </div>
              <div>
                <label className="font-bold text-rose-950 block">Recruiter / Middleman Name</label>
                <input
                  type="text"
                  value={formData.recruitment_official_name}
                  onChange={(e) => handleChange('recruitment_official_name', e.target.value)}
                  className="w-full bg-white border border-rose-300 rounded-xl p-2 text-xs mt-1 font-bold text-slate-800"
                />
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* 8. POLICE MISCONDUCT */}
        {/* ------------------------------------------------------------------ */}
        {selectedSubcategory === 'corruption_police_misconduct' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Police Station Name *</label>
                <input
                  type="text"
                  value={formData.police_station_name}
                  onChange={(e) => handleChange('police_station_name', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Officer Name & Badge No.</label>
                <input
                  type="text"
                  value={`${formData.police_officer_name} (${formData.police_badge_no})`}
                  onChange={(e) => handleChange('police_officer_name', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Type of Misconduct *</label>
                <select
                  value={formData.police_category}
                  onChange={(e) => handleChange('police_category', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                >
                  <option>Bribe demand for filing/closing case</option>
                  <option>Refusal to register FIR / complaint</option>
                  <option>Abuse of authority & threats</option>
                  <option>Harassment & intimidation</option>
                  <option>Unlawful detention / Custodial harassment</option>
                  <option>Evidence tampering / Case manipulation</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-amber-950">Money Demanded / Received (if applicable)</label>
              <input
                type="text"
                value={formData.police_money_demanded}
                onChange={(e) => handleChange('police_money_demanded', e.target.value)}
                className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
              />
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* 9. LAND / PROPERTY RECORD MANIPULATION */}
        {/* ------------------------------------------------------------------ */}
        {selectedSubcategory === 'corruption_land_record_manipulation' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Property / Survey Number *</label>
                <input
                  type="text"
                  value={formData.land_survey_no}
                  onChange={(e) => handleChange('land_survey_no', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Owner / Legal Heir Name</label>
                <input
                  type="text"
                  value={formData.land_owner_name}
                  onChange={(e) => handleChange('land_owner_name', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Type of Manipulation *</label>
                <select
                  value={formData.land_category}
                  onChange={(e) => handleChange('land_category', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                >
                  <option>Unauthorized ownership change</option>
                  <option>Fake land record & Pahani alteration</option>
                  <option>Illegal registration / Forged signature</option>
                  <option>Duplicate registration issuance</option>
                  <option>Survey number boundary manipulation</option>
                  <option>Illegal encroachment with official collusion</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-amber-950">Officials / Persons Involved</label>
              <input
                type="text"
                value={formData.land_official_involved}
                onChange={(e) => handleChange('land_official_involved', e.target.value)}
                placeholder="Village Accountant, Revenue Inspector, Sub-Registrar staff"
                className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
              />
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* 10. RATION / FOOD SCHEME CORRUPTION */}
        {/* ------------------------------------------------------------------ */}
        {selectedSubcategory === 'corruption_ration_corruption' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Ration Shop Number / Name *</label>
                <input
                  type="text"
                  value={formData.ration_shop_no}
                  onChange={(e) => handleChange('ration_shop_no', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Ration Card Number *</label>
                <input
                  type="text"
                  value={formData.ration_card_no}
                  onChange={(e) => handleChange('ration_card_no', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Ration Irregularity Category *</label>
                <select
                  value={formData.ration_category}
                  onChange={(e) => handleChange('ration_category', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                >
                  <option>Less ration supplied (Short quantity)</option>
                  <option>Overcharging for free/subsidized foodgrains</option>
                  <option>Ration denial / biometric tampering</option>
                  <option>Diversion of foodgrains to black market</option>
                  <option>Dealer demanding bribe to renew card</option>
                  <option>Poor quality / rotten grains distributed</option>
                </select>
              </div>
            </div>

            <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-300 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="font-bold text-amber-950 block">Entitled Quantity</label>
                <input
                  type="text"
                  value={formData.ration_quantity_expected}
                  onChange={(e) => handleChange('ration_quantity_expected', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs mt-1 font-bold text-slate-800"
                />
              </div>
              <div>
                <label className="font-bold text-rose-950 block">Quantity Actually Received</label>
                <input
                  type="text"
                  value={formData.ration_quantity_received}
                  onChange={(e) => handleChange('ration_quantity_received', e.target.value)}
                  className="w-full bg-white border border-rose-300 rounded-xl p-2 text-xs mt-1 font-bold text-rose-900"
                />
              </div>
              <div>
                <label className="font-bold text-rose-950 block">Overcharged Amount (₹)</label>
                <input
                  type="text"
                  value={formData.ration_amount_paid}
                  onChange={(e) => handleChange('ration_amount_paid', e.target.value)}
                  className="w-full bg-white border border-rose-300 rounded-xl p-2 text-xs mt-1 font-bold text-rose-900"
                />
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* 11. SCHOOL / COLLEGE OFFICIAL MISCONDUCT */}
        {/* ------------------------------------------------------------------ */}
        {selectedSubcategory === 'corruption_school_misconduct' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Institution Name *</label>
                <input
                  type="text"
                  value={formData.school_inst_name}
                  onChange={(e) => handleChange('school_inst_name', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Official Name & Designation</label>
                <input
                  type="text"
                  value={`${formData.school_official_name} (${formData.school_designation})`}
                  onChange={(e) => handleChange('school_official_name', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Misconduct Category *</label>
                <select
                  value={formData.school_misconduct_cat}
                  onChange={(e) => handleChange('school_misconduct_cat', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                >
                  <option>Unauthorized fee / Capitation demand</option>
                  <option>Certificate / Marks Card withholding</option>
                  <option>Harassment & Abuse of authority</option>
                  <option>Discrimination / Unfair treatment</option>
                  <option>Exam malpractice / Attendance tampering</option>
                  <option>Scholarship money siphoning</option>
                  <option>Admission irregularity</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-amber-950">Amount Demanded (if applicable)</label>
              <input
                type="text"
                value={formData.school_amount_involved}
                onChange={(e) => handleChange('school_amount_involved', e.target.value)}
                className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
              />
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* 12. HEALTHCARE SERVICE CORRUPTION */}
        {/* ------------------------------------------------------------------ */}
        {selectedSubcategory === 'corruption_healthcare_corruption' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Hospital Name *</label>
                <input
                  type="text"
                  value={formData.health_hospital_name}
                  onChange={(e) => handleChange('health_hospital_name', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Staff Name & Department</label>
                <input
                  type="text"
                  value={`${formData.health_staff_name} (${formData.health_department})`}
                  onChange={(e) => handleChange('health_staff_name', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">Corruption Category *</label>
                <select
                  value={formData.health_category}
                  onChange={(e) => handleChange('health_category', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                >
                  <option>Free medicine being sold</option>
                  <option>Bribe for surgery / treatment / bed</option>
                  <option>Bribe for medical / disability certificate</option>
                  <option>Unauthorized fee / Overcharging</option>
                  <option>Denial of free service</option>
                  <option>Priority allotment based on cash payment</option>
                  <option>Ayushman / Health insurance scheme fraud</option>
                  <option>Staff absenteeism during duty hours</option>
                </select>
              </div>
            </div>

            <div className="p-3.5 bg-rose-50 rounded-2xl border border-rose-300 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="font-bold text-rose-950 block">Official Fee (₹)</label>
                <input
                  type="number"
                  value={formData.health_official_fee}
                  onChange={(e) => handleChange('health_official_fee', e.target.value)}
                  className="w-full bg-white border border-rose-300 rounded-xl p-2 text-xs mt-1 font-bold text-slate-800"
                />
              </div>
              <div>
                <label className="font-bold text-rose-950 block">Extra Bribe Demanded (₹) *</label>
                <input
                  type="number"
                  value={formData.health_extra_amount}
                  onChange={(e) => handleChange('health_extra_amount', e.target.value)}
                  className="w-full bg-white border border-rose-300 rounded-xl p-2 text-xs mt-1 font-bold text-rose-900"
                />
              </div>
              <div>
                <label className="font-bold text-rose-950 block">Payment Mode</label>
                <input
                  type="text"
                  value={formData.health_payment_method}
                  onChange={(e) => handleChange('health_payment_method', e.target.value)}
                  className="w-full bg-white border border-rose-300 rounded-xl p-2 text-xs mt-1 font-bold text-slate-800"
                />
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* COMMON FIELDS AT BOTTOM OF ALL MODULES (As Per Standard Architecture) */}
        {/* ------------------------------------------------------------------ */}
        <div className="pt-4 border-t border-amber-200 space-y-4">
          <div className="flex items-center space-x-2 text-amber-950 font-bold text-xs">
            <FileText className="w-4 h-4 text-amber-600" />
            <span>Detailed Incident Dossier & Evidence Submission</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div className="space-y-1">
              <label className="text-xs font-bold text-amber-950">Incident Date & Time *</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={formData.incident_date}
                  onChange={(e) => handleChange('incident_date', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs text-slate-800 font-medium"
                />
                <input
                  type="time"
                  value={formData.incident_time}
                  onChange={(e) => handleChange('incident_time', e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs text-slate-800 font-medium"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-amber-950">GPS Coordinates / Location Address *</label>
              <input
                type="text"
                value={formData.gps_location}
                onChange={(e) => handleChange('gps_location', e.target.value)}
                className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs text-slate-800 font-medium"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-amber-950">Detailed Incident Description *</label>
            <textarea
              rows={3}
              value={formData.incident_description}
              onChange={(e) => handleChange('incident_description', e.target.value)}
              placeholder="Provide a clear, factual account of the corruption incident, dates, officials involved, and exact words spoken..."
              className="w-full bg-white border border-amber-300 rounded-2xl p-3 text-xs text-slate-800 font-medium focus:border-rose-600"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div className="space-y-1">
              <label className="text-xs font-bold text-amber-950">Witness Details (Optional)</label>
              <input
                type="text"
                value={formData.witness_details}
                onChange={(e) => handleChange('witness_details', e.target.value)}
                placeholder="Names or contacts of bystanders/citizens present"
                className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-amber-950">Supporting Evidence (Audio, Video, Receipt, Photos)</label>
              <label className="w-full p-2.5 bg-white border border-dashed border-rose-400 rounded-xl flex items-center justify-center space-x-2 text-xs font-bold text-rose-900 cursor-pointer hover:bg-rose-50/50">
                <Upload className="w-4 h-4 text-rose-600" />
                <span>Upload Encrypted Evidence Files</span>
                <input
                  type="file"
                  multiple
                  onChange={(e) => handleChange('evidence_file', e.target.files?.[0]?.name || 'evidence_attached.pdf')}
                  className="hidden"
                />
              </label>
              {formData.evidence_file && (
                <p className="text-[11px] text-emerald-800 font-bold">✓ Attached: {formData.evidence_file}</p>
              )}
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="button"
            onClick={handleQuickReportSubmit}
            className="w-full py-3.5 bg-gradient-to-r from-rose-700 via-red-600 to-amber-700 hover:opacity-95 text-white font-bold text-xs rounded-2xl shadow-xl shadow-rose-950/20 flex items-center justify-center space-x-2 border border-rose-400"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Submit Encrypted Grievance to Vigilance Directorate & Lokayukta</span>
          </button>
        </div>

      </div>
    </div>
  );
}
