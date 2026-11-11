import React, { useState } from 'react';
import {
  ArrowLeft, ArrowRight, ShieldCheck, Sparkles, Building2,
  Phone, AlertTriangle, CheckCircle2, ChevronRight, ExternalLink
} from 'lucide-react';
import { t, translateDomain } from '../services/translations';

// Import the specialized feature components
import RoadsInfrastructureDashboard from './RoadsInfrastructureDashboard';
import WaterCleanlinessDashboard from './WaterCleanlinessDashboard';
import StreetLightingElectricityDashboard from './StreetLightingElectricityDashboard';
import SwachhataView from './SwachhataView';
import HealthMedicalDashboard from './HealthMedicalDashboard';
import WomenChildSafetyDashboard from './WomenChildSafetyDashboard';
import AntiCorruptionDashboard from './AntiCorruptionDashboard';
import UnemploymentJobsDashboard from './UnemploymentJobsDashboard';
import EmergencySafetyDashboard from './EmergencySafetyDashboard';
import AnimalWelfareDashboard from './AnimalWelfareDashboard';
import FileGovernanceDashboard from './FileGovernanceDashboard';

export const CIVIC_FEATURE_MODULES = [
  {
    id: 'roads',
    title: 'Roads & Public Infrastructure',
    icon: '🛣️',
    color: 'from-amber-700 to-orange-800',
    border: 'border-amber-300',
    dept: 'Public Works Dept (PWD)',
    desc: 'Report craters, bridge structural cracks, broken footpaths, road waterlogging, and track PWD road repair crews.',
    stats: '24h SLA Target • GPS Auto-Tagging'
  },
  {
    id: 'water',
    title: 'Water Supply & Sanitation',
    icon: '💧',
    color: 'from-blue-700 to-cyan-800',
    border: 'border-blue-300',
    dept: 'Water Board (KUWSDB)',
    desc: 'Pipeline burst emergencies, turbid tap water testing, low pressure reports, and open sewer clearance.',
    stats: 'Emergency Pipeline Squad 24x7'
  },
  {
    id: 'electricity',
    title: 'Street Lighting & Electricity',
    icon: '💡',
    color: 'from-yellow-600 to-amber-700',
    border: 'border-yellow-300',
    dept: 'Electricity Supply Co. (HESCOM)',
    desc: 'Single pole outages, entire dark avenues, live wire hazards, transformer sparks, and energy conservation.',
    stats: 'GESCOM Hotline Integration'
  },
  {
    id: 'swachhata',
    title: 'Swachhata & Waste Management',
    icon: '🧹',
    color: 'from-emerald-700 to-teal-800',
    border: 'border-emerald-300',
    dept: 'Swachh Bharat Mission (SBM)',
    desc: 'Commercial garbage bin overflow, door-to-door waste vehicle delays, plastic burning, and public toilet hygiene ratings.',
    stats: 'Smart QR Washroom Audits'
  },
  {
    id: 'health',
    title: 'Health & Medical Support',
    icon: '🩺',
    color: 'from-rose-700 to-red-800',
    border: 'border-rose-300',
    dept: 'District Health & Family Welfare',
    desc: 'PHC staff shortages, emergency 108 ambulance dispatching, mosquito dengue fogging, and emergency blood donor registry.',
    stats: 'Live Blood Group Matching'
  },
  {
    id: 'safety',
    title: 'Women & Child Safety Patrol',
    icon: '🛡️',
    color: 'from-purple-700 to-indigo-900',
    border: 'border-purple-300',
    dept: 'Police Special Cell & 112 Dispatch',
    desc: 'Unlit vulnerable pathways, catcalling hotspots, PCR night patrol requests, and discreet SOS distress beacon.',
    stats: '1-Click Discreet SOS Dispatched'
  },
  {
    id: 'corruption',
    title: 'Anti-Corruption & Vigilance',
    icon: '⚖️',
    color: 'from-slate-800 to-zinc-950',
    border: 'border-slate-400',
    dept: 'Karnataka Lokayukta / Vigilance',
    desc: 'Whistleblower protected reporting of bribery demands, speed money, fake documents, and tender irregularities.',
    stats: '100% Encrypted & Anonymous'
  },
  {
    id: 'unemployment',
    title: 'Unemployment & Skill Hub',
    icon: '💼',
    color: 'from-indigo-700 to-blue-900',
    border: 'border-indigo-300',
    dept: 'District Employment & Skill Mission',
    desc: 'PMKVY vocational training registration, local apprenticeship schemes, daily wage worker welfare, and job fair schedules.',
    stats: 'Govt Skill Certified Programs'
  },
  {
    id: 'emergency',
    title: 'Disaster & Fire Emergency',
    icon: '🚨',
    color: 'from-red-700 to-rose-900',
    border: 'border-red-400',
    dept: 'State Disaster Management (SDMA)',
    desc: 'Building collapse structural risks, public fire hazards, flood inundated underpasses, and falling tree clearances.',
    stats: 'Immediate Tier-1 Escalation'
  },
  {
    id: 'animal',
    title: 'Animal Welfare & Stray Rescue',
    icon: '🐕',
    color: 'from-orange-700 to-amber-900',
    border: 'border-orange-300',
    dept: 'Animal Husbandry & Vet Services',
    desc: 'Injured stray animal emergency veterinary medical support, anti-rabies vaccination drives, and cruelty reporting.',
    stats: 'Vet Ambulance & NGO Partners'
  },
  {
    id: 'file_governance',
    title: 'Administrative Delay & RTI',
    icon: '🏛️',
    color: 'from-amber-800 to-yellow-900',
    border: 'border-amber-300',
    dept: 'Public Administrative Reforms',
    desc: 'File movement tracking, caste/income certificate backlogs exceeding 15 days, and RTI appeal follow-ups.',
    stats: 'Automated Officer Escalations'
  }
];

export default function CivicServicesPage({
  currentUser,
  language = 'English',
  speakText,
  initialActiveModule = null
}) {
  const [activeModuleId, setActiveModuleId] = useState(initialActiveModule);

  // If a specific module is selected, render its dedicated full-featured dashboard
  if (activeModuleId) {
    const activeModuleObj = CIVIC_FEATURE_MODULES.find(m => m.id === activeModuleId);

    return (
      <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 font-outfit animate-in fade-in duration-150">
        {/* Navigation Breadcrumb Bar */}
        <div className="bg-white p-4 rounded-2xl border border-amber-300/80 shadow-sm flex items-center justify-between">
          <button
            onClick={() => setActiveModuleId(null)}
            className="flex items-center space-x-2 text-xs font-bold text-amber-950 hover:text-amber-700 transition-colors bg-amber-50 px-3.5 py-2 rounded-xl border border-amber-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Back to All Civic Services</span>
          </button>
          
          <div className="flex items-center space-x-2 text-xs text-slate-600 font-semibold">
            <span className="text-base">{activeModuleObj?.icon}</span>
            <span>{activeModuleObj?.title}</span>
            <span>•</span>
            <span className="text-amber-800 font-bold">{activeModuleObj?.dept}</span>
          </div>
        </div>

        {/* Render Selected Feature Component */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-6">
          {activeModuleId === 'roads' && (
            <RoadsInfrastructureDashboard currentUser={currentUser} speakText={null} onBack={() => setActiveModuleId(null)} />
          )}
          {activeModuleId === 'water' && (
            <WaterCleanlinessDashboard currentUser={currentUser} speakText={null} onBack={() => setActiveModuleId(null)} />
          )}
          {activeModuleId === 'electricity' && (
            <StreetLightingElectricityDashboard currentUser={currentUser} speakText={null} onBack={() => setActiveModuleId(null)} />
          )}
          {activeModuleId === 'swachhata' && (
            <SwachhataView language={language} speakText={null} />
          )}
          {activeModuleId === 'health' && (
            <HealthMedicalDashboard currentUser={currentUser} speakText={null} onBack={() => setActiveModuleId(null)} />
          )}
          {activeModuleId === 'safety' && (
            <WomenChildSafetyDashboard currentUser={currentUser} speakText={null} onBack={() => setActiveModuleId(null)} />
          )}
          {activeModuleId === 'corruption' && (
            <AntiCorruptionDashboard currentUser={currentUser} speakText={null} onBack={() => setActiveModuleId(null)} />
          )}
          {activeModuleId === 'unemployment' && (
            <UnemploymentJobsDashboard currentUser={currentUser} speakText={null} onBack={() => setActiveModuleId(null)} />
          )}
          {activeModuleId === 'emergency' && (
            <EmergencySafetyDashboard currentUser={currentUser} speakText={null} onBack={() => setActiveModuleId(null)} />
          )}
          {activeModuleId === 'animal' && (
            <AnimalWelfareDashboard currentUser={currentUser} speakText={null} onBack={() => setActiveModuleId(null)} />
          )}
          {activeModuleId === 'file_governance' && (
            <FileGovernanceDashboard currentUser={currentUser} speakText={null} onBack={() => setActiveModuleId(null)} />
          )}
        </div>
      </div>
    );
  }

  // Otherwise, render the Civic Services Directory
  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 font-outfit">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-orange-800 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-amber-500/30">
        <div className="relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-200 border border-amber-300/30 text-xs font-bold mb-3">
            <span>🏛️ Municipal Departments & Public Utilities</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-cinzel tracking-tight text-white">
            {t('serv_header_title', language)}
          </h1>
          <p className="text-sm text-amber-100/80 mt-1 max-w-2xl font-normal">
            {t('serv_header_sub', language)}
          </p>
        </div>
      </div>

      {/* Grid of Feature Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CIVIC_FEATURE_MODULES.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveModuleId(item.id)}
            className="group cursor-pointer bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-xl hover:border-amber-400 transition-all transform hover:-translate-y-1 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <span className="text-[10px] uppercase font-mono font-bold text-amber-900 bg-amber-100/80 px-2 py-0.5 rounded border border-amber-200">
                  {item.stats}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                  {translateDomain(item.id, language) || item.title}
                </h3>
                <p className="text-xs text-amber-900/80 font-bold mt-0.5">
                  {item.dept}
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-800 group-hover:text-amber-950">
              <span>{t('serv_open_module', language) || 'Open Dedicated Toolkit'}</span>
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
