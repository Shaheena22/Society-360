import React from 'react';
import { ShieldCheck, Lock, FileText, ArrowLeft, CheckCircle2, Eye, Server } from 'lucide-react';

export default function PrivacyPolicyPage({ onBack }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 font-outfit text-slate-800">
      
      {/* Top Header & Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-xs font-bold text-amber-900 bg-amber-100/80 hover:bg-amber-200/80 px-4 py-2 rounded-xl transition-colors border border-amber-300/60"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portal</span>
        </button>
      )}

      <div className="bg-gradient-to-r from-amber-900 via-orange-900 to-amber-950 text-white rounded-3xl p-8 shadow-xl border border-amber-500/30 space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-200 border border-amber-300/30 text-xs font-bold">
          <Lock className="w-3.5 h-3.5 text-amber-300" />
          <span>Statutory Compliance • DPDP Act 2023 & IT Act 2000</span>
        </div>
        <h1 className="text-3xl font-black font-cinzel tracking-tight text-white">
          Privacy & Citizen Data Protection Policy
        </h1>
        <p className="text-xs text-amber-100/80 max-w-2xl font-mono">
          Last Updated: March 2026 • Government of Karnataka & Central University of Karnataka Civic Initiative
        </p>
      </div>

      {/* Main Content Sections */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-8 text-sm leading-relaxed">
        
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 font-cinzel flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center text-xs font-black">1</span>
            <span>Commitment to Citizen Privacy</span>
          </h2>
          <p className="text-slate-600 text-xs">
            Society 360 ("the Portal") is committed to protecting the privacy and personal liberties of citizens engaging with public administrative grievance systems. All data handling protocols adhere strictly to the Digital Personal Data Protection Act, 2023 (DPDP Act) and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 font-cinzel flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center text-xs font-black">2</span>
            <span>Information We Collect</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Identity & Contact Details</span>
              </h3>
              <p className="text-slate-600">
                Citizen full name, mobile number (for SMS ticket tracking and OTP authentication), email address, and assigned municipal ward.
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Incident Geospatial Coordinates</span>
              </h3>
              <p className="text-slate-600">
                GPS latitude/longitude coordinates captured strictly at the moment of grievance filing or QR code scan, used solely for routing repair crews.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 font-cinzel flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center text-xs font-black">3</span>
            <span>Anonymous & Whistleblower Protections</span>
          </h2>
          <p className="text-slate-600 text-xs">
            When filing complaints under the Anti-Corruption (Lokayukta) or Women & Child Safety modules, citizens may toggle the <strong>Anonymous Submission</strong> option. In anonymous mode, reporter name, phone number, and IP identity are decoupled and redacted from public view and officer ticketing consoles, ensuring immunity under the Whistle Blowers Protection Act.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 font-cinzel flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center text-xs font-black">4</span>
            <span>Data Retention & Right to Erasure</span>
          </h2>
          <p className="text-slate-600 text-xs">
            Personal contact details are retained for the statutory period required to resolve the civic grievance and conclude the 30-day citizen audit verification window. Citizens reserve the absolute right to request redaction of their personal profile data following verified ticket resolution.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 font-cinzel flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center text-xs font-black">5</span>
            <span>Security & Cryptographic Audit Trails</span>
          </h2>
          <p className="text-slate-600 text-xs">
            All database transactions and status transitions are secured using industry-standard TLS 1.3 encryption and immutable SHA-256 integrity logs to prevent unauthorized officer tampering or deletion of pending citizen complaints.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-slate-200 text-xs text-slate-500">
          <p>
            For data privacy inquiries, contact the designated Grievance Data Protection Officer:
          </p>
          <p className="font-mono text-slate-800 font-bold">
            dpo@society360.gov.in • Central University of Karnataka, Kalaburagi - 585367
          </p>
        </section>

      </div>

    </div>
  );
}
