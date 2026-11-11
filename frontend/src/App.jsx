import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LoginPage from './components/LoginPage';
import CitizenDashboard from './components/CitizenDashboard';
import ComplaintsPage from './components/ComplaintsPage';
import CivicServicesPage from './components/CivicServicesPage';
import FeedbackSuggestionsPage from './components/FeedbackSuggestionsPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsOfServicePage from './components/TermsOfServicePage';
import RtiLegalGuidePage from './components/RtiLegalGuidePage';
import TransparencyView from './components/TransparencyView';
import AdminView from './components/AdminView';
import GovStaffView from './components/GovStaffView';
import CivicChatbot from './components/CivicChatbot';
import CreateComplaintModal from './components/CreateComplaintModal';
import { api } from './services/api';
import { t } from './services/translations';
import { ShieldAlert, Heart, FileText, Lock, Scale, MessageSquare } from 'lucide-react';
import { speakText as assistantSpeak, getVoiceLangCode } from './services/voiceAssistant';

export default function App() {
  // Default user state (seeded with Citizen user so app opens cleanly, can be changed via Login or Role Switcher)
  const [currentUser, setCurrentUser] = useState({
    uid: 'usr-citizen-1',
    name: 'Anita Deshmukh',
    email: 'anita.d@gmail.com',
    phone: '+91 9876543210',
    role: 'citizen',
    state: 'Karnataka',
    district: 'Kalaburagi',
    city: 'Kalaburagi',
    location: 'Kalaburagi, Karnataka',
    preferredLanguage: 'English',
    points: 180,
    badge: 'Silver'
  });

  // Active navigation tab
  // 'dashboard' | 'complaints' | 'services' | 'transparency' | 'feedback' | 'privacy' | 'terms'
  // Admin tabs: 'admin-overview' | 'admin-staff' | 'admin-sla' | 'admin-audit'
  // Staff tabs: 'staff-workbench'
  const [currentTab, setCurrentTab] = useState('dashboard');

  // Sidebar Layout States
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Global Create Complaint Modal State
  const [isGlobalCreateModalOpen, setIsGlobalCreateModalOpen] = useState(false);
  const [modalPrefillData, setModalPrefillData] = useState(null);

  const handleOpenCreateComplaint = (prefillData = null) => {
    setModalPrefillData(prefillData);
    setIsGlobalCreateModalOpen(true);
  };

  // General Settings
  const [language, setLanguage] = useState('English');
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isLargeText, setIsLargeText] = useState(false);

  // Emergency safety modal state (FR-3.12)
  const [showSafetyAlert, setShowSafetyAlert] = useState(false);
  const [safetyLog, setSafetyLog] = useState(null);

  // Multilingual Speech Synthesis Readback (Only invoked on explicit user click, never automatically)
  const speakText = (text, overrideLang) => {
    if (!text) return;
    const targetLang = overrideLang || language;
    const langCode = getVoiceLangCode(targetLang);
    assistantSpeak(text, { lang: langCode });
  };

  // Login handler (NO automatic bot speech)
  const handleLogin = (userObj) => {
    setCurrentUser(userObj);
    if (userObj.role === 'admin') {
      setCurrentTab('admin-overview');
    } else if (userObj.role === 'staff') {
      setCurrentTab('staff-workbench');
    } else {
      setCurrentTab('dashboard');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentTab('login');
  };

  // Quick Demo Role Switcher for verifying Citizen vs Admin sidebar!
  const handleSwitchRole = (newRole) => {
    if (newRole === 'admin') {
      setCurrentUser({
        uid: 'usr-admin-1',
        name: 'Dr. Suresh Kumar',
        email: 'admin@civic.gov.in',
        phone: '+91 9845012345',
        role: 'admin',
        state: 'Karnataka',
        district: 'Kalaburagi',
        city: 'Kalaburagi',
        location: 'Kalaburagi, Karnataka',
        preferredLanguage: language,
        points: 450,
        badge: 'Platinum'
      });
      setCurrentTab('admin-overview');
    } else if (newRole === 'staff') {
      setCurrentUser({
        uid: 'usr-staff-roads',
        name: 'Er. Rajesh Sharma',
        email: 'staff.roads@civic.gov.in',
        phone: '+91 98450 11001',
        role: 'staff',
        departmentId: 'dept-roads',
        departmentName: 'Roads & Civil Infrastructure Dept (PWD)',
        assignedDepartments: ['dept-roads', 'dept-water', 'dept-civic'],
        state: 'Karnataka',
        district: 'Kalaburagi',
        city: 'Kalaburagi',
        location: 'Kalaburagi, Karnataka',
        preferredLanguage: language,
        points: 120,
        badge: 'Silver'
      });
      setCurrentTab('staff-workbench');
    } else {
      setCurrentUser({
        uid: 'usr-citizen-1',
        name: 'Anita Deshmukh',
        email: 'anita.d@gmail.com',
        phone: '+91 9876543210',
        role: 'citizen',
        state: 'Karnataka',
        district: 'Kalaburagi',
        city: 'Kalaburagi',
        location: 'Kalaburagi, Karnataka',
        preferredLanguage: language,
        points: 180,
        badge: 'Silver'
      });
      setCurrentTab('dashboard');
    }
  };

  // Emergency safety trigger
  const handleTriggerSafety = async () => {
    setShowSafetyAlert(true);
    try {
      const res = await api.triggerSafety({
        userId: currentUser?.uid || 'ANONYMOUS',
        location: { lat: 17.1582, lng: 76.8422, address: 'Central University Main Gate, Kalaburagi' },
        voicePhrase: 'Help Emergency Trigger'
      });
      if (res && res.success) {
        setSafetyLog(res.data);
      }
    } catch (err) {
      console.warn('Safety API call offline:', err);
    }
  };

  // If user is logged out, render LoginPage unless viewing public privacy/terms/transparency/rti
  if (!currentUser && currentTab !== 'privacy' && currentTab !== 'terms' && currentTab !== 'transparency' && currentTab !== 'rti-legal') {
    return (
      <div className={`min-h-screen bg-[#FAF8F5] text-slate-900 ${isHighContrast ? 'high-contrast' : ''} ${isLargeText ? 'large-text' : ''}`}>
        <Navbar
          pageTitle="Citizen Authentication"
          language={language}
          setLanguage={setLanguage}
          isHighContrast={isHighContrast}
          setIsHighContrast={setIsHighContrast}
          isLargeText={isLargeText}
          setIsLargeText={setIsLargeText}
          onTriggerSafety={handleTriggerSafety}
          currentUser={currentUser}
          onLogout={null}
          onOpenLogin={() => setCurrentTab('login')}
          onToggleMobileSidebar={() => {}}
        />
        <LoginPage onLogin={handleLogin} language={language} setLanguage={setLanguage} />
        <CivicChatbot currentUser={currentUser} language={language} setLanguage={setLanguage} speakText={speakText} />
      </div>
    );
  }

  // Determine current page title for Navbar
  const getPageTitle = () => {
    switch (currentTab) {
      case 'dashboard': return t('nav_dashboard', language);
      case 'complaints': return t('nav_complaints', language);
      case 'services': return t('nav_services', language);
      case 'transparency': return t('nav_transparency', language);
      case 'feedback': return t('nav_feedback', language);
      case 'privacy': return t('nav_privacy', language);
      case 'terms': return t('nav_terms', language);
      case 'rti-legal': return t('nav_rti_legal', language);
      case 'admin-overview': return t('nav_admin_overview', language);
      case 'admin-staff': return t('nav_admin_staff', language);
      case 'admin-sla': return t('nav_admin_sla', language);
      case 'admin-audit': return t('nav_admin_audit', language);
      case 'staff-workbench': return t('nav_staff_workbench', language);
      case 'login': return t('nav_login', language);
      default: return t('appName', language);
    }
  };

  return (
    <div className={`min-h-screen bg-[#FAF8F5] text-slate-900 flex ${isHighContrast ? 'high-contrast' : ''} ${isLargeText ? 'large-text' : ''}`}>
      
      {/* 1. ROLE-AWARE SIDEBAR (User sidebar always + Admin section if currentUser.role === 'admin') */}
      <Sidebar
        currentUser={currentUser}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        isMobileOpen={isMobileSidebarOpen}
        setIsMobileOpen={setIsMobileSidebarOpen}
        onLogout={handleLogout}
        onOpenLogin={() => setCurrentTab('login')}
        onTriggerSafety={handleTriggerSafety}
        language={language}
      />

      {/* 2. MAIN LAYOUT WRAPPER */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Sticky Header */}
        <Navbar
          pageTitle={getPageTitle()}
          language={language}
          setLanguage={setLanguage}
          isHighContrast={isHighContrast}
          setIsHighContrast={setIsHighContrast}
          isLargeText={isLargeText}
          setIsLargeText={setIsLargeText}
          onTriggerSafety={handleTriggerSafety}
          currentUser={currentUser}
          onLogout={handleLogout}
          onOpenLogin={() => setCurrentTab('login')}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />

        {/* Dynamic Page Router */}
        <main className="flex-1 pb-16">
          
          {/* Dashboard / Home View (Strictly for Citizen Users) */}
          {currentTab === 'dashboard' && (!currentUser || currentUser.role === 'citizen') && (
            <CitizenDashboard
              currentUser={currentUser}
              onNavigate={(tab) => setCurrentTab(tab)}
              onOpenCreateComplaint={handleOpenCreateComplaint}
              language={language}
            />
          )}

          {/* Admin Home: if admin visits dashboard or admin-overview */}
          {(currentTab === 'dashboard' || currentTab === 'admin-overview' || currentTab === 'admin-staff' || currentTab === 'admin-sla' || currentTab === 'admin-audit') && currentUser?.role === 'admin' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <AdminView
                speakText={null}
                language={language}
                activeSection={currentTab === 'dashboard' ? 'admin-overview' : currentTab}
                onSectionChange={(newSection) => setCurrentTab(newSection)}
              />
            </div>
          )}

          {/* Staff Home: if officer visits dashboard or staff-workbench */}
          {(currentTab === 'dashboard' || currentTab === 'staff-workbench') && currentUser?.role === 'staff' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <GovStaffView
                currentUser={currentUser}
                speakText={speakText}
                language={language}
              />
            </div>
          )}

          {/* Complaints Page (Citizen Raised & City Grievances) */}
          {currentTab === 'complaints' && (!currentUser || currentUser.role === 'citizen') && (
            <ComplaintsPage
              currentUser={currentUser}
              language={language}
              speakText={speakText}
            />
          )}

          {/* Civic Services / Feature Modules Directory (Citizen) */}
          {currentTab === 'services' && (!currentUser || currentUser.role === 'citizen') && (
            <CivicServicesPage
              currentUser={currentUser}
              language={language}
              speakText={speakText}
            />
          )}

          {/* Transparency & RTI Portal (Universal) */}
          {currentTab === 'transparency' && (
            <TransparencyView language={language} />
          )}

          {/* Suggestions & Citizen Feedback System (Citizen) */}
          {currentTab === 'feedback' && (!currentUser || currentUser.role === 'citizen') && (
            <FeedbackSuggestionsPage currentUser={currentUser} language={language} />
          )}

          {/* Privacy Policy Page */}
          {currentTab === 'privacy' && (
            <PrivacyPolicyPage
              language={language}
              onBack={() => setCurrentTab(currentUser?.role === 'admin' ? 'admin-overview' : currentUser?.role === 'staff' ? 'staff-workbench' : 'dashboard')}
            />
          )}

          {/* Terms of Service Page */}
          {currentTab === 'terms' && (
            <TermsOfServicePage
              language={language}
              onBack={() => setCurrentTab(currentUser?.role === 'admin' ? 'admin-overview' : currentUser?.role === 'staff' ? 'staff-workbench' : 'dashboard')}
            />
          )}

          {/* RTI & Statutory Legal Remedies Guide */}
          {currentTab === 'rti-legal' && (
            <RtiLegalGuidePage
              currentUser={currentUser}
              language={language}
              onBack={() => setCurrentTab(currentUser?.role === 'admin' ? 'admin-overview' : currentUser?.role === 'staff' ? 'staff-workbench' : 'dashboard')}
            />
          )}

          {/* Account Authentication & Sign In Page */}
          {currentTab === 'login' && (
            <div className="w-full max-w-7xl mx-auto py-6 px-2 sm:px-4 font-outfit">
              {currentUser && (
                <div className="flex items-center justify-between mb-4 bg-amber-50 p-3.5 rounded-2xl border border-amber-200 text-xs shadow-xs">
                  <span className="text-amber-950 font-semibold">
                    Currently signed in as: <strong className="text-amber-900">{currentUser.name}</strong> ({currentUser.role})
                  </span>
                  <button
                    onClick={() => setCurrentTab('dashboard')}
                    className="px-3 py-1 bg-white hover:bg-amber-100 rounded-xl border border-amber-300 font-bold text-amber-950 transition-all shadow-xs cursor-pointer"
                  >
                    ← {t('nav_dashboard', language)}
                  </button>
                </div>
              )}
              <LoginPage onLogin={handleLogin} language={language} setLanguage={setLanguage} />
            </div>
          )}

        </main>

        {/* Global Persistent Footer with Role-Aware Links */}
        <footer className="border-t border-amber-200/80 bg-white py-6 px-4 text-center text-xs text-slate-500 space-y-3 shadow-inner font-outfit">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-amber-950">
            {currentUser?.role === 'admin' ? (
              <>
                <button
                  onClick={() => setCurrentTab('admin-overview')}
                  className="hover:text-amber-700 hover:underline transition-colors"
                >
                  {t('nav_admin_overview', language)}
                </button>
                <span>•</span>
                <button
                  onClick={() => setCurrentTab('admin-staff')}
                  className="hover:text-amber-700 hover:underline transition-colors"
                >
                  {t('nav_admin_staff', language)}
                </button>
                <span>•</span>
                <button
                  onClick={() => setCurrentTab('admin-sla')}
                  className="hover:text-amber-700 hover:underline transition-colors"
                >
                  {t('nav_admin_sla', language)}
                </button>
                <span>•</span>
                <button
                  onClick={() => setCurrentTab('admin-audit')}
                  className="hover:text-amber-700 hover:underline transition-colors"
                >
                  {t('nav_admin_audit', language)}
                </button>
              </>
            ) : currentUser?.role === 'staff' ? (
              <>
                <button
                  onClick={() => setCurrentTab('staff-workbench')}
                  className="hover:text-amber-700 hover:underline transition-colors"
                >
                  {t('nav_staff_workbench', language)}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setCurrentTab('dashboard')}
                  className="hover:text-amber-700 hover:underline transition-colors"
                >
                  {t('nav_dashboard', language)}
                </button>
                <span>•</span>
                <button
                  onClick={() => setCurrentTab('complaints')}
                  className="hover:text-amber-700 hover:underline transition-colors"
                >
                  {t('nav_complaints', language)}
                </button>
                <span>•</span>
                <button
                  onClick={() => setCurrentTab('services')}
                  className="hover:text-amber-700 hover:underline transition-colors"
                >
                  {t('nav_services', language)}
                </button>
                <span>•</span>
                <button
                  onClick={() => setCurrentTab('feedback')}
                  className="hover:text-amber-700 hover:underline transition-colors"
                >
                  {t('nav_feedback', language)}
                </button>
              </>
            )}
            <span>•</span>
            <button
              onClick={() => setCurrentTab('transparency')}
              className="hover:text-amber-700 hover:underline transition-colors"
            >
              {t('nav_transparency', language)}
            </button>
            <span>•</span>
            <button
              onClick={() => setCurrentTab('rti-legal')}
              className="text-amber-800 hover:text-amber-950 hover:underline transition-colors flex items-center gap-1"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>{t('nav_rti_legal', language)}</span>
            </button>
            <span>•</span>
            <button
              onClick={() => setCurrentTab('privacy')}
              className="text-amber-800 hover:text-amber-950 hover:underline transition-colors flex items-center gap-1"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{t('nav_privacy', language)}</span>
            </button>
            <span>•</span>
            <button
              onClick={() => setCurrentTab('terms')}
              className="text-amber-800 hover:text-amber-950 hover:underline transition-colors flex items-center gap-1"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>{t('nav_terms', language)}</span>
            </button>
          </div>

          <div className="text-[11px] text-slate-400 space-y-0.5">
            <p className="font-semibold text-slate-600">
              Society 360 v2.0 • AI-Powered Citizen Civic Companion (IEEE Std 830-1998 Compliant)
            </p>
            <p>
              Central University of Karnataka • Team 8: Shaheena, Divya Bharati, Sayista, Nitin Pal
            </p>
          </div>
        </footer>

      </div>

      {/* Global Create Complaint Modal */}
      <CreateComplaintModal
        isOpen={isGlobalCreateModalOpen}
        onClose={() => setIsGlobalCreateModalOpen(false)}
        currentUser={currentUser}
        initialPrefill={modalPrefillData}
        onComplaintCreated={(newCmp) => {
          setCurrentTab('complaints');
        }}
      />

      {/* Emergency Safety Alert Overlay Modal */}
      {showSafetyAlert && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border-2 border-rose-600 p-6 rounded-3xl max-w-md w-full text-center space-y-4 shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-full bg-rose-100 flex items-center justify-center pulse-emergency">
              <ShieldAlert className="w-10 h-10 text-rose-600" />
            </div>

            <h3 className="text-xl font-black text-slate-900 font-cinzel">DISCREET EMERGENCY SAFETY MODE (FR-3.12)</h3>
            
            <p className="text-xs text-slate-600 font-medium">
              Live GPS coordinates & encrypted audio payload dispatched instantly to configured trusted contacts.
            </p>

            <div className="bg-slate-50 p-4 rounded-2xl border border-rose-300 text-left text-xs space-y-2 font-mono">
              <p className="text-rose-700 font-bold">Alert Status: DISPATCHED</p>
              <p className="text-slate-800">📍 Location: 17.1582 N, 76.8422 E (Kalaburagi)</p>
              <p className="text-slate-800">📱 Trusted Contacts Notified: +91 9876543211, Emergency 112</p>
              <p className="text-slate-500 text-[10px]">Background audio logger engaged per legal consent guidelines.</p>
            </div>

            <button
              onClick={() => setShowSafetyAlert(false)}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md"
            >
              Dismiss Emergency Overlay
            </button>
          </div>
        </div>
      )}

      {/* 24/7 AI Civic Chatbot (Silent default, speech is strictly user-triggered) */}
      <CivicChatbot
        currentUser={currentUser}
        language={language}
        setLanguage={setLanguage}
        speakText={speakText}
      />

    </div>
  );
}
