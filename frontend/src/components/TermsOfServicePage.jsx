import React from 'react';
import { FileText, Scale, ArrowLeft, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function TermsOfServicePage({ onBack }) {
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
          <Scale className="w-3.5 h-3.5 text-amber-300" />
          <span>Terms of Public Service • IEEE Std 830-1998 Governance</span>
        </div>
        <h1 className="text-3xl font-black font-cinzel tracking-tight text-white">
          Terms of Service & Grievance Redressal Charter
        </h1>
        <p className="text-xs text-amber-100/80 max-w-2xl font-mono">
          Binding Service Level Agreement (SLA) & Citizen Code of Conduct
        </p>
      </div>

      {/* Main Content Sections */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-8 text-sm leading-relaxed">
        
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 font-cinzel flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center text-xs font-black">1</span>
            <span>Acceptance of Civic Service Charter</span>
          </h2>
          <p className="text-slate-600 text-xs">
            By accessing and submitting grievances through Society 360, you agree to comply with this Citizen Charter, designed in accordance with the Karnataka Sakala Services Act, 2011 and municipal governance transparency directives.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 font-cinzel flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center text-xs font-black">2</span>
            <span>Binding Service Level Agreement (SLA) Targets</span>
          </h2>
          <p className="text-slate-600 text-xs">
            Government nodal officers assigned to tickets are subject to statutory resolution timeframes:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl">
              <span className="font-bold text-rose-800 block">Emergency Tier (4 Hours)</span>
              <span className="text-slate-600 text-[11px]">Live wire hazards, burst water mains, gas leaks, and disaster threats.</span>
            </div>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl">
              <span className="font-bold text-amber-800 block">High Priority (24 Hours)</span>
              <span className="text-slate-600 text-[11px]">Deep road craters, unlit dark pathways, PHC medicine shortages.</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="font-bold text-slate-800 block">Standard Tier (48-72 Hours)</span>
              <span className="text-slate-600 text-[11px]">Regular garbage clearing, public toilet repairs, tree pruning.</span>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 font-cinzel flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center text-xs font-black">3</span>
            <span>Citizen Rights: False Resolution Disputes</span>
          </h2>
          <p className="text-slate-600 text-xs">
            If an assigned officer prematurely marks a ticket as "Resolved" without executing physical repairs, the citizen has the statutory right to click <strong>"Dispute Resolution"</strong> within 7 days. This automatically escalates the file to the Municipal Commissioner and Lokayukta Vigilance Directorate.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 font-cinzel flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center text-xs font-black">4</span>
            <span>Prohibition of Frivolous & Malicious Reporting</span>
          </h2>
          <p className="text-slate-600 text-xs">
            Citizens must certify that all uploaded photographic evidence and defect descriptions reflect genuine municipal hazards. The deliberate submission of fabricated reports, spam requests, or defamatory statements against public officers is punishable under Section 182 of the Indian Penal Code (IPC) and IT Act 2000.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 font-cinzel flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center text-xs font-black">5</span>
            <span>Disclaimers & Force Majeure</span>
          </h2>
          <p className="text-slate-600 text-xs">
            While Society 360 guarantees automated dispatch and escalation monitoring, physical execution timelines may be temporarily altered during natural disasters, civil emergencies, or code-of-conduct enforcement windows.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-slate-200 text-xs text-slate-500">
          <p>
            Governing Law: Jurisdiction shall lie exclusively with the competent courts of Kalaburagi, Karnataka.
          </p>
          <p className="font-mono text-slate-800 font-bold">
            legal@society360.gov.in • Municipal Grievance Cell
          </p>
        </section>

      </div>

    </div>
  );
}
