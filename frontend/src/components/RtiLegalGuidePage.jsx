import React, { useState } from 'react';
import {
  Scale, FileText, Download, Copy, Check, ArrowRight,
  ShieldCheck, AlertCircle, BookOpen, ExternalLink, HelpCircle,
  Building2, Phone, MapPin, Printer, ChevronDown, ChevronRight,
  Gavel, Clock, CheckCircle2, User, Search
} from 'lucide-react';
import { t } from '../services/translations';

export const RTI_TEMPLATES = [
  {
    id: 'road_tender',
    title: 'Road Tender, Contractor Details & Measurement Book',
    dept: 'Public Works Department (PWD) / Municipal Corporation',
    subject: 'Information regarding tender allocation, contractor bill payments, and asphalt thickness for road work',
    questions: [
      '1. Provide certified copy of the Work Order and Tender Agreement executed for the construction/repair of the specified road stretch.',
      '2. What was the sanctioned estimate, tender value, and total amount disbursed to the contractor till date?',
      '3. What is the contractual defect liability period (warranty period) during which the contractor is legally obligated to repair potholes and cracks at zero municipal cost?',
      '4. Provide certified copies of the Quality Inspection Report and Asphalt Core Thickness Test conducted by the Executive Engineer prior to passing final bills.',
      '5. Under Section 2(j)(i) of the RTI Act 2005, please specify the date, time, and venue when the undersigned citizen can physically inspect the measurement book (MB) and road records.'
    ]
  },
  {
    id: 'water_pipeline',
    title: 'Water Supply Pipeline Works & Water Quality Test Reports',
    dept: 'Urban Water Supply & Sewerage Board (KUWSDB)',
    subject: 'Information regarding pipeline repair contracts, contamination lab test reports, and water tank cleaning logs',
    questions: [
      '1. Provide certified copies of the microbiological and chemical water purity test reports conducted for tap water in the specified ward over the past 6 months.',
      '2. What is the scheduled periodicity of cleaning, desilting, and chlorination for the municipal overhead water reservoir supplying this sector?',
      '3. Provide the log sheet of citizen complaints registered regarding dirty/turbid tap water and the corresponding action-taken reports by the Assistant Executive Engineer.',
      '4. What funds were sanctioned and spent on pipeline replacement and leak repairs in this ward during the financial year 2024-2026?'
    ]
  },
  {
    id: 'sakala_delay',
    title: 'Delay in Issuance of Caste / Income / Domicile Certificate',
    dept: 'Revenue Department / Nadakacheri / Tahsildar Office',
    subject: 'Information regarding unacted application for government certificate beyond statutory Sakala SLA',
    questions: [
      '1. State the daily progress made on my application (Acknowledgement / GSC Number provided below) from the date of submission to the present date.',
      '2. Please provide the names, designations, and contact numbers of the designated officers with whom my application file remained pending, and the period of delay at each desk.',
      '3. As per the Karnataka Sakala Services Act 2011, what is the mandatory time limit for delivery of this certificate, and what compensatory delay penalty has been computed against the defaulting officer?'
    ]
  },
  {
    id: 'street_lighting',
    title: 'Street Lighting Maintenance Contract & Defunct LED Replacement',
    dept: 'Electricity Supply Company (HESCOM/GESCOM) & Municipal Works',
    subject: 'Information regarding energy-saving lighting contracts, maintenance logs, and defective bulb replacement status',
    questions: [
      '1. Name of the agency/contractor awarded the Annual Maintenance Contract (AMC) for streetlights in Ward 12, along with contractual SLA response timelines.',
      '2. Number of non-functional streetlights identified during the last monthly ward audit and the count of fixtures replaced with date of installation.',
      '3. Penalty clauses applicable to the contractor for failure to replace defective lamps within 24 hours of citizen reporting, and total penalty deducted till date.'
    ]
  },
  {
    id: 'ward_funds',
    title: 'Ward Grant Fund Allocation, Expenditure & Citizen Works',
    dept: 'City Municipal Corporation / Ward Committee',
    subject: 'Information regarding allocation, utilization, and unspent balances of Ward Development Grants (15th Finance Commission)',
    questions: [
      '1. Total grant amount sanctioned under the Ward Development Fund and 15th Finance Commission grants for this ward during FY 2024-2025 and 2025-2026.',
      '2. Itemized list of all civil works, sanitation procurements, and park maintenance works sanctioned, indicating sanctioned budget vs actual expenditure.',
      '3. Certified copies of the minutes of the Ward Committee meetings conducted over the preceding 12 months.'
    ]
  }
];

export const LEGAL_REMEDIES = [
  {
    id: 'rti_act',
    title: '1. Right to Information Act, 2005 (RTI)',
    authority: 'Public Information Officer (PIO) & First Appellate Authority (FAA)',
    cost: '₹10 Application Fee (BPL Cardholders Exempt)',
    timeline: '30 Days (48 Hours if Life or Liberty is involved)',
    icon: '📜',
    color: 'from-amber-700 to-orange-800',
    summary: 'Constitutional tool to legally compel any government body to furnish certified contracts, inspection reports, contractor bills, and measurement records.',
    steps: [
      'Draft application under Section 6(1) stating clearly what certified copies or information are required.',
      'Address to the "Public Information Officer (PIO)", [Department Name], [City Corporation / District Office].',
      'Affix ₹10 Court Fee Stamp, or attach ₹10 Indian Postal Order (IPO) payable to the Accounts Officer, or pay online at rtionline.gov.in (for Central Depts) or your state RTI portal.',
      'Submit in person and obtain a stamped Acknowledgement Receipt with date and seal, or send via Speed Post / Registered Post AD.',
      'Under Section 7(1), the PIO must reply within 30 calendar days.',
      'FIRST APPEAL (Section 19(1)): If no reply is received within 30 days or false info is given, file a First Appeal within 30 days to the First Appellate Authority (usually the Deputy Commissioner / Director). Zero fee.',
      'SECOND APPEAL (Section 19(3)): If still aggrieved, appeal to the State Information Commission (SIC) within 90 days. The Information Commissioner can impose a penalty of ₹250/day up to ₹25,000 on the officer under Section 20(1).'
    ]
  },
  {
    id: 'sakala_act',
    title: '2. Sakala Services Act, 2011 (Guarantee of Services)',
    authority: 'Competent Officer & Sakala Appellate Authority',
    cost: 'Free of Cost',
    timeline: 'Service Specific (e.g. 7 to 30 Days)',
    icon: '⏱️',
    color: 'from-emerald-700 to-teal-800',
    summary: 'Statutory guarantee that certificates, water connections, and municipal services MUST be delivered within specified days, or the officer pays a fine to you.',
    steps: [
      'Whenever applying for any state/municipal service (caste cert, road repair, building plan, water meter), always demand a GSC (Guarantee of Services Citizen) Number.',
      'If the service is not provided within the prescribed Sakala timeframe, file a First Appeal to the designated Sakala Appellate Officer.',
      'Under Section 15 of the Sakala Act, the citizen is entitled to compensatory cost of ₹20 per day of delay, up to a maximum of ₹500, deducted directly from the defaulting officer’s monthly salary!',
      'File online at sakala.kar.nic.in or call Sakala Citizen Helpline 080-44554455.'
    ]
  },
  {
    id: 'lokayukta',
    title: '3. Karnataka Lokayukta / Anti-Corruption Commission',
    authority: 'Lokayukta Police Station & Judicial Directorate',
    cost: 'Free of Cost',
    timeline: 'Immediate for Bribe Traps; 60-90 Days for Inquiries',
    icon: '⚖️',
    color: 'from-slate-800 to-zinc-950',
    summary: 'Autonomous anti-corruption ombudsman with investigative police power to arrest corrupt officials demanding bribes and seize unaccounted assets.',
    steps: [
      'BRIBE DEMANDS (TRAP CASES): If any government officer, revenue clerk, or police officer demands cash or speed money, DO NOT PAY.',
      'Contact the Lokayukta Superintendent of Police (SP) or toll-free Anti-Corruption Helpline: 1064 or 1800-425-5345.',
      'Lokayukta Police will arrange a legal phenolphthalein powder trap to catch the corrupt official red-handed during the bribe exchange under the Prevention of Corruption Act.',
      'WRITTEN COMPLAINTS (FORM I & II): For maladministration, scheme embezzlement, or illegal assets, submit a complaint in Form I accompanied by an affidavit in Form II duly notarized.',
      'Whistleblower protection is granted; identity can be kept strictly confidential from the accused department.'
    ]
  },
  {
    id: 'consumer_court',
    title: '4. Consumer Disputes Commission (E-Daakhil)',
    authority: 'District Consumer Disputes Redressal Commission (DCDRC)',
    cost: 'Nominal filing fee (Free for claims under ₹5 Lakhs)',
    timeline: 'Statutory 90 Days Disposal Target',
    icon: '🛒',
    color: 'from-blue-700 to-indigo-900',
    summary: 'Municipal corporations and state utility boards (Electricity, Water, Municipal Transit) are "Service Providers" under the Consumer Protection Act, 2019.',
    steps: [
      'If municipal negligence (such as contaminated drinking water causing hospitalization, power surge damaging appliances, or unmaintained bus station accident) causes harm, you can sue for compensation.',
      'First send a 15-day Legal Notice to the Municipal Commissioner / Executive Engineer detailing the deficiency and demanding compensation.',
      'If ignored, file a consumer complaint online via the official Government of India E-Daakhil portal (edaakhil.nic.in) or physically submit 3 copies at your District Consumer Court.',
      'You DO NOT need a lawyer — citizens can argue their own cases (party-in-person).',
      'The Consumer Court has the judicial power to award financial damages and order immediate repair works.'
    ]
  },
  {
    id: 'writ_pil',
    title: '5. High Court Writ Petition (Article 226) & PIL',
    authority: 'High Court of Karnataka / State High Court',
    cost: 'Minimal Court Fees / Free for Letter Petitions',
    timeline: 'Urgent Hearing within 48-72 Hours for Public Hazards',
    icon: '🏛️',
    color: 'from-purple-800 to-indigo-950',
    summary: 'Constitutional power to obtain a Writ of Mandamus ordering the Municipal Commissioner or Mayor to fix roads, clear hazards, or face Contempt of Court.',
    steps: [
      'WRIT OF MANDAMUS: When a public authority fails to discharge its statutory duty (e.g. city roads remain lethally damaged despite multiple notices), a citizen can approach the High Court under Article 226.',
      'The court issues a judicial Writ commanding the authority to perform its duty within a strict court-monitored deadline.',
      'LETTER PIL: You do not always need a formal petition. A well-documented letter sent to the "Chief Justice, High Court of Karnataka" accompanied by news clippings and photographs of the hazardous public defect can be converted into a Suo-Motu Public Interest Litigation (PIL).'
    ]
  },
  {
    id: 'fir_police',
    title: '6. Criminal Police Complaint (IPC / BNS Negligence)',
    authority: 'Station House Officer (SHO) & Judicial Magistrate',
    cost: 'Zero Cost',
    timeline: 'Immediate FIR Registration',
    icon: '🚨',
    color: 'from-rose-800 to-red-950',
    summary: 'When municipal negligence (open manholes, live electrical wires, unbarricaded construction pits) causes injury or death, it is a criminal offence.',
    steps: [
      'Statutory Provisions: Section 268/290 (Public Nuisance), Section 336/337/338 (Endangering life or personal safety by negligence) under Indian Penal Code / Bharatiya Nyaya Sanhita (BNS).',
      'Submit a written complaint to the local Police Station detailing the location, contractor/corporation in charge, and the hazardous condition.',
      'Demand registration of a First Information Report (FIR) under Section 154 of CrPC / BNSS.',
      'If the police station refuses to file an FIR, send the complaint via Registered Post to the Superintendent of Police (SP) / Commissioner of Police under Section 154(3).',
      'If still unacted, file a private complaint before the Judicial Magistrate of First Class (JMFC) under Section 156(3) or Section 200.'
    ]
  },
  {
    id: 'ward_committee',
    title: '7. Mandatory Ward Committee Meetings (74th Amendment)',
    authority: 'Ward Corporator & Ward Nodal Officer',
    cost: 'Free Civic Participation',
    timeline: 'Monthly Mandatory Meeting',
    icon: '👥',
    color: 'from-yellow-700 to-amber-900',
    summary: 'Under the 74th Constitutional Amendment and Municipal Corporation Acts, citizens have the legal right to attend monthly Ward Committee meetings and audit local budgets.',
    steps: [
      'Every municipal ward has an official Ward Committee comprising the Corporator, Ward Engineers, Health Inspector, and nominated citizen representatives.',
      'By law, Ward Committees must convene at least once every month in a public hall.',
      'Citizens can physically attend, raise defect files, demand itemized accounting of local ward expenditures, and review sanitation routes.',
      'The minutes of these meetings are public documents accessible under RTI.'
    ]
  }
];

export default function RtiLegalGuidePage({ currentUser, onBack, language = 'English' }) {
  const [activeTab, setActiveTab] = useState('remedies'); // 'remedies' | 'rti_generator' | 'helplines'
  
  // RTI Generator State
  const [selectedTemplateId, setSelectedTemplateId] = useState(RTI_TEMPLATES[0].id);
  const [applicantName, setApplicantName] = useState(currentUser?.name || 'Anita Deshmukh');
  const [applicantPhone, setApplicantPhone] = useState(currentUser?.phone || '+91 9876543210');
  const [applicantAddress, setApplicantAddress] = useState('Flat 402, Shanti Nagar, Ward 12, Kalaburagi - 585102');
  const [targetDepartment, setTargetDepartment] = useState('City Municipal Corporation, Kalaburagi');
  const [locationDetails, setLocationDetails] = useState('Main University Access Road from Gate 1 to Hostel Block, Ward 12');
  const [additionalQuestions, setAdditionalQuestions] = useState('');
  const [copiedRti, setCopiedRti] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const activeTemplate = RTI_TEMPLATES.find(t => t.id === selectedTemplateId) || RTI_TEMPLATES[0];

  // Generate the formatted RTI Application text
  const generateRtiText = () => {
    const today = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });

    return `FORM 'A'
APPLICATION FOR SEEKING INFORMATION UNDER SECTION 6(1) OF THE RIGHT TO INFORMATION ACT, 2005

To,
The Public Information Officer (PIO) / Assistant PIO,
${targetDepartment},
Kalaburagi, Karnataka.

1. FULL NAME OF APPLICANT:
   ${applicantName}

2. CONTACT DETAILS:
   Address: ${applicantAddress}
   Mobile: ${applicantPhone}

3. PARTICULARS OF INFORMATION SOUGHT:
   (a) Subject Matter:
       ${activeTemplate.subject}
   (b) Incident / Work Location:
       ${locationDetails}
   (c) Specific Period of Information:
       From 1st April 2024 to ${today}

4. SPECIFIC QUESTIONS / DETAILS REQUESTED:
${activeTemplate.questions.map((q) => `   ${q}`).join('\n')}
${additionalQuestions.trim() ? `\n   Additional Queries:\n   ${additionalQuestions.trim()}` : ''}

5. APPLICATION FEE DETAILS:
   Enclosed herewith Court Fee Stamp / Indian Postal Order (IPO) of ₹10 (Rupees Ten Only) bearing serial number: _______________ dated _______________, payable to the designated Public Authority as per Rule 3 of the RTI Rules.
   [Or]
   Applicant belongs to Below Poverty Line (BPL) category. Certified copy of BPL Card No: _______________ is attached herewith for fee waiver under Section 7(5).

6. STATUTORY TIMELINE:
   As mandated under Section 7(1) of the RTI Act 2005, the requested certified information must be furnished within 30 days of receipt.

Place: Kalaburagi
Date: ${today}

_____________________________
Signature of Citizen Applicant
(${applicantName})`;
  };

  const handleCopyRti = () => {
    navigator.clipboard.writeText(generateRtiText());
    setCopiedRti(true);
    setTimeout(() => setCopiedRti(false), 3000);
  };

  const handlePrintRti = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>RTI Application - ${applicantName}</title>
          <style>
            body { font-family: 'Times New Roman', serif; padding: 40px; line-height: 1.6; font-size: 13pt; color: #111; }
            pre { white-space: pre-wrap; font-family: inherit; font-size: 13pt; }
            @media print { body { padding: 0; } }
          </style>
        </head>
        <body>
          <pre>${generateRtiText()}</pre>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => { printWindow.print(); }, 500);
  };

  const filteredRemedies = LEGAL_REMEDIES.filter(r => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return r.title.toLowerCase().includes(q) ||
           r.summary.toLowerCase().includes(q) ||
           r.authority.toLowerCase().includes(q);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-outfit text-slate-800">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-amber-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden border border-amber-500/30 space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-200 border border-amber-300/30 text-xs font-bold">
          <Gavel className="w-3.5 h-3.5 text-amber-300" />
          <span>{t('rti_tag', language)}</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black font-cinzel tracking-tight text-white">
              {t('rti_header_title', language)}
            </h1>
            <p className="text-xs sm:text-sm text-amber-100/80 max-w-3xl mt-1 leading-relaxed font-normal">
              {t('rti_header_sub', language)}
            </p>
          </div>

          {onBack && (
            <button
              onClick={onBack}
              className="self-start md:self-auto px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-amber-100 border border-white/20 text-xs font-bold transition-colors shrink-0"
            >
              {t('rti_btn_back', language)}
            </button>
          )}
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-amber-500/30 text-xs font-bold">
          <button
            onClick={() => setActiveTab('remedies')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'remedies'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-white/10 text-amber-200 hover:bg-white/15'
            }`}
          >
            ⚖️ {t('rti_tab_remedies', language)}
          </button>
          <button
            onClick={() => setActiveTab('rti_generator')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'rti_generator'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-white/10 text-amber-200 hover:bg-white/15'
            }`}
          >
            ✍️ {t('rti_tab_generator', language)}
          </button>
          <button
            onClick={() => setActiveTab('helplines')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'helplines'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-white/10 text-amber-200 hover:bg-white/15'
            }`}
          >
            📞 {t('rti_tab_helplines', language)}
          </button>
        </div>
      </div>

      {/* TAB 1: 7 STATUTORY LEGAL REMEDIES */}
      {activeTab === 'remedies' && (
        <div className="space-y-6">
          
          {/* Search bar & Notice */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search legal remedies (e.g. Lokayukta, Sakala, RTI, FIR, Consumer)..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>All mechanisms are legally binding under Indian Law</span>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="space-y-6">
            {filteredRemedies.map((remedy) => (
              <div
                key={remedy.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-start space-x-3">
                    <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-200 text-2xl flex items-center justify-center shrink-0 shadow-inner">
                      {remedy.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 font-cinzel">
                        {remedy.title}
                      </h3>
                      <p className="text-xs text-amber-900 font-semibold mt-0.5">
                        Jurisdiction / Authority: {remedy.authority}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 self-start text-[11px] font-mono font-bold">
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg">
                      Cost: {remedy.cost}
                    </span>
                    <span className="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-lg">
                      ⏱️ {remedy.timeline}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  {remedy.summary}
                </p>

                {/* Step by Step Legal Procedure */}
                <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <p className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider flex items-center gap-1.5">
                    <span>📋 Step-by-Step Legal Procedure:</span>
                  </p>
                  <ol className="space-y-1.5 text-xs text-slate-700 list-decimal pl-4 leading-relaxed">
                    {remedy.steps.map((step, idx) => (
                      <li key={idx} className="pl-1">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* TAB 2: INTERACTIVE RTI DRAFT GENERATOR */}
      {activeTab === 'rti_generator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Form: Select template & customize */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5 text-xs">
            <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
              <div className="w-9 h-9 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-lg">
                ✍️
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 font-cinzel">RTI Application Formulator</h2>
                <p className="text-[11px] text-slate-500">Drafts legally compliant Form 'A' under Section 6(1)</p>
              </div>
            </div>

            {/* Template Selector */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Choose Civic Investigation Template
              </label>
              <select
                value={selectedTemplateId}
                onChange={(e) => setSelectedTemplateId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 font-semibold text-slate-800 focus:ring-2 focus:ring-amber-500"
              >
                {RTI_TEMPLATES.map((tmpl) => (
                  <option key={tmpl.id} value={tmpl.id}>
                    {tmpl.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Department */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Public Authority / Department Office
              </label>
              <input
                type="text"
                value={targetDepartment}
                onChange={(e) => setTargetDepartment(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Location / Spot Details */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Specific Work Location / Road / Facility
              </label>
              <input
                type="text"
                value={locationDetails}
                onChange={(e) => setLocationDetails(e.target.value)}
                placeholder="e.g. Ward 12 Main PWD Road from Bus Stop to Hospital"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Applicant Details */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="font-bold text-slate-800 uppercase text-[10px] font-mono">Citizen Applicant Details:</span>
              <div>
                <label className="block text-[11px] font-medium text-slate-500 mb-0.5">Full Name</label>
                <input
                  type="text"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-500 mb-0.5">Phone Number</label>
                <input
                  type="tel"
                  value={applicantPhone}
                  onChange={(e) => setApplicantPhone(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-500 mb-0.5">Residential Postal Address</label>
                <textarea
                  rows={2}
                  value={applicantAddress}
                  onChange={(e) => setApplicantAddress(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                />
              </div>
            </div>

            {/* Additional Custom Question */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Add Custom Query / Specific Question (Optional)
              </label>
              <textarea
                rows={2}
                value={additionalQuestions}
                onChange={(e) => setAdditionalQuestions(e.target.value)}
                placeholder="e.g. 6. Provide the names of junior engineers responsible for Ward 12 road maintenance."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs"
              />
            </div>

          </div>

          {/* Right Live Preview: Formatted RTI ready to print / copy */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-amber-700" />
                  <span className="text-xs font-bold uppercase font-mono tracking-wider text-slate-800">
                    Live Form 'A' Document Preview
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleCopyRti}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all"
                  >
                    {copiedRti ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedRti ? 'Copied to Clipboard!' : 'Copy Full Text'}</span>
                  </button>

                  <button
                    onClick={handlePrintRti}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold shadow-sm transition-all"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print / Save PDF</span>
                  </button>
                </div>
              </div>

              {/* Formatted Text View */}
              <div className="mt-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 font-mono text-xs leading-relaxed text-slate-800 overflow-x-auto max-h-[500px] overflow-y-auto whitespace-pre-wrap select-all">
                {generateRtiText()}
              </div>
            </div>

            {/* Statutory Instructions Box */}
            <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-2xl text-[11px] text-amber-950 space-y-1 font-outfit">
              <span className="font-bold block flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
                <span>How to File this Document Physically:</span>
              </span>
              <p className="text-slate-700">
                1. Print this application on plain A4 paper and sign with date.
                <br />
                2. Purchase a ₹10 Court Fee Stamp (from any court or notary) or ₹10 Indian Postal Order (IPO from Post Office).
                <br />
                3. Submit to the Office of the Public Information Officer (PIO) and retain a signed, stamped acknowledgement copy.
                <br />
                4. By law, the officer must furnish the certified documents within <strong>30 calendar days</strong>.
              </p>
            </div>

          </div>

        </div>
      )}

      {/* TAB 3: STATUTORY HELPLINES & OFFICIAL DIRECTORY */}
      {activeTab === 'helplines' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 text-xs">
          <div>
            <h2 className="text-base font-bold text-slate-900 font-cinzel">
              Government Portals & Statutory Helplines
            </h2>
            <p className="text-slate-500">
              Direct access to central, state, and judicial grievance infrastructure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-lg">🏛️</span>
              <h3 className="font-bold text-slate-900 text-sm">CPGRAMS (Central Government)</h3>
              <p className="text-slate-600">
                Centralized Public Grievance Redress and Monitoring System for ministries and central agencies.
              </p>
              <div className="pt-2 border-t border-slate-200 font-mono font-bold text-amber-900">
                <span>Web: pgportal.gov.in</span>
                <br />
                <span>Toll-Free: 1800-11-4000</span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-lg">⚖️</span>
              <h3 className="font-bold text-slate-900 text-sm">Karnataka Lokayukta Police</h3>
              <p className="text-slate-600">
                Immediate anti-corruption reporting for bribery traps and official extortion complaints.
              </p>
              <div className="pt-2 border-t border-slate-200 font-mono font-bold text-rose-800">
                <span>Toll-Free: 1064</span>
                <br />
                <span>Helpline: 1800-425-5345</span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-lg">⏱️</span>
              <h3 className="font-bold text-slate-900 text-sm">Karnataka Sakala Mission</h3>
              <p className="text-slate-600">
                Track GSC numbers and claim ₹20/day delay compensation for government service backlogs.
              </p>
              <div className="pt-2 border-t border-slate-200 font-mono font-bold text-emerald-800">
                <span>Web: sakala.kar.nic.in</span>
                <br />
                <span>Call Center: 080-44554455</span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-lg">📜</span>
              <h3 className="font-bold text-slate-900 text-sm">RTI Online Portal</h3>
              <p className="text-slate-600">
                File Section 6(1) applications online to central departments and monitor first appeal status.
              </p>
              <div className="pt-2 border-t border-slate-200 font-mono font-bold text-blue-800">
                <span>Web: rtionline.gov.in</span>
                <br />
                <span>Fee: ₹10 (NetBanking / UPI)</span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-lg">🛒</span>
              <h3 className="font-bold text-slate-900 text-sm">E-Daakhil Consumer Forum</h3>
              <p className="text-slate-600">
                Digital filing of consumer cases against municipal corporations and utilities for deficient services.
              </p>
              <div className="pt-2 border-t border-slate-200 font-mono font-bold text-purple-800">
                <span>Web: edaakhil.nic.in</span>
                <br />
                <span>National Helpline: 1915</span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-lg">🚨</span>
              <h3 className="font-bold text-slate-900 text-sm">National Emergency Helpline</h3>
              <p className="text-slate-600">
                Pan-India unified emergency response for police, fire hazards, ambulance, and women safety.
              </p>
              <div className="pt-2 border-t border-slate-200 font-mono font-bold text-rose-700">
                <span>Dial: 112 (Police / Fire / Health)</span>
                <br />
                <span>Women Helpline: 1091 / 181</span>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
