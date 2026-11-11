import React from 'react';
import {
  LayoutDashboard, FileText, Wrench, Globe2, Lightbulb,
  ShieldAlert, Users, Clock, History, Building2, LogOut,
  ChevronLeft, ChevronRight, X, ShieldCheck, Lock, Scale
} from 'lucide-react';
import { t } from '../services/translations';

export default function Sidebar({
  currentUser,
  currentTab,
  setCurrentTab,
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen,
  onLogout,
  onTriggerSafety,
  language = 'English'
}) {
  const isAdmin = currentUser?.role === 'admin';
  const isStaff = currentUser?.role === 'staff';
  const isCitizen = !isAdmin && !isStaff;

  const roleBadgeLabel = isAdmin
    ? 'Super Admin'
    : isStaff
    ? 'Gov Official'
    : 'Citizen User';

  const roleBadgeColor = isAdmin
    ? 'bg-purple-100 text-purple-900 border-purple-300'
    : isStaff
    ? 'bg-blue-100 text-blue-900 border-blue-300'
    : 'bg-amber-100 text-amber-900 border-amber-300';

  const navItemClass = (tabId) => {
    const isActive = currentTab === tabId;
    return `w-full flex items-center ${
      isCollapsed ? 'justify-center px-2' : 'space-x-3 px-3.5'
    } py-2.5 rounded-2xl text-xs font-bold font-outfit transition-all ${
      isActive
        ? 'bg-gradient-to-r from-amber-700 via-orange-600 to-amber-700 text-white shadow-md shadow-amber-900/20 border border-amber-400/40'
        : 'text-slate-700 hover:text-amber-900 hover:bg-amber-100/60'
    }`;
  };

  const adminItemClass = (tabId) => {
    const isActive = currentTab === tabId;
    return `w-full flex items-center ${
      isCollapsed ? 'justify-center px-2' : 'space-x-3 px-3.5'
    } py-2.5 rounded-2xl text-xs font-bold font-outfit transition-all ${
      isActive
        ? 'bg-gradient-to-r from-purple-800 to-indigo-900 text-white shadow-md shadow-purple-950/20 border border-purple-400/50'
        : 'text-purple-950 hover:text-purple-700 hover:bg-purple-100/60'
    }`;
  };

  const staffItemClass = (tabId) => {
    const isActive = currentTab === tabId;
    return `w-full flex items-center ${
      isCollapsed ? 'justify-center px-2' : 'space-x-3 px-3.5'
    } py-2.5 rounded-2xl text-xs font-bold font-outfit transition-all ${
      isActive
        ? 'bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-md shadow-blue-950/20 border border-blue-400/50'
        : 'text-blue-950 hover:text-blue-700 hover:bg-blue-100/60'
    }`;
  };

  const handleNavClick = (tabId) => {
    setCurrentTab(tabId);
    if (setIsMobileOpen) setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 md:sticky md:top-0 bg-[#FFFDF9] border-r-2 border-amber-300/60 shadow-xl transition-all duration-300 flex flex-col justify-between ${
          isCollapsed ? 'w-20' : 'w-64'
        } ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Top Branding & User Info */}
        <div className="p-4 border-b border-amber-200/80 space-y-3">
          
          {/* Brand Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5 overflow-hidden">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-700 via-orange-600 to-amber-500 flex items-center justify-center text-white text-lg shadow-md border-2 border-amber-300 shrink-0">
                🏛️
              </div>
              {!isCollapsed && (
                <div className="leading-none">
                  <span className="font-black font-cinzel text-base text-amber-950 tracking-tight block">
                    Society 360
                  </span>
                  <span className="text-[10px] text-amber-800 font-bold font-outfit">
                    {isAdmin ? 'Super Admin HQ' : isStaff ? 'Official Desk' : 'AI Civic Companion'}
                  </span>
                </div>
              )}
            </div>

            {/* Close on mobile */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="md:hidden p-1 text-slate-500 hover:text-slate-800 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Desktop Collapse Toggle */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden md:flex p-1.5 rounded-xl text-amber-900 hover:bg-amber-100 transition-colors border border-amber-200 shrink-0"
              title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* User Profile Pill */}
          {!isCollapsed ? (
            <div className="p-2.5 bg-amber-50/90 rounded-2xl border border-amber-200/80 flex items-center space-x-2.5 shadow-xs">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 text-white font-black text-xs flex items-center justify-center shrink-0 border border-amber-300">
                {currentUser?.name?.[0] || 'U'}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-900 truncate leading-tight">
                  {currentUser?.name || 'Citizen User'}
                </p>
                <div className="flex items-center space-x-1 mt-0.5">
                  <span className={`text-[9px] uppercase font-extrabold px-1.5 py-0.2 rounded border ${roleBadgeColor}`}>
                    {roleBadgeLabel}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center" title={`${currentUser?.name || 'User'} (${roleBadgeLabel})`}>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 text-white font-black text-xs flex items-center justify-center border border-amber-300">
                {currentUser?.name?.[0] || 'U'}
              </div>
            </div>
          )}

        </div>

        {/* Navigation Links (Scrollable & Strict Role Exclusivity) */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">

          {/* ════════════════════════════════════════════════════════════════ */}
          {/* 1. CITIZEN EXCLUSIVE NAVIGATION (Only shown for Citizen User)     */}
          {/* ════════════════════════════════════════════════════════════════ */}
          {isCitizen && (
            <div className="space-y-1">
              {!isCollapsed && (
                <p className="px-3 text-[10px] font-black uppercase text-amber-950/70 tracking-wider font-mono">
                  {t('tabCitizen', language)}
                </p>
              )}

              {/* Dashboard / Home */}
              <button
                onClick={() => handleNavClick('dashboard')}
                className={navItemClass('dashboard')}
                title="Overview & City Dashboard"
              >
                <LayoutDashboard className="w-4 h-4 shrink-0" />
                {!isCollapsed && <span>{t('nav_dashboard', language)}</span>}
              </button>

              {/* Complaints (Core requirement) */}
              <button
                onClick={() => handleNavClick('complaints')}
                className={navItemClass('complaints')}
                title="Complaints & Grievances (User Raised & Citywide)"
              >
                <FileText className="w-4 h-4 shrink-0" />
                {!isCollapsed && (
                  <div className="flex-1 flex items-center justify-between">
                    <span>{t('nav_complaints', language)}</span>
                    <span className="text-[10px] px-2 py-0.2 rounded-full bg-amber-200/80 text-amber-950 font-bold border border-amber-300">
                      Active
                    </span>
                  </div>
                )}
              </button>

              {/* Civic Services & Features */}
              <button
                onClick={() => handleNavClick('services')}
                className={navItemClass('services')}
                title="Municipal Feature Modules & Services"
              >
                <Wrench className="w-4 h-4 shrink-0" />
                {!isCollapsed && <span>{t('nav_services', language)}</span>}
              </button>

              {/* Public Transparency & RTI */}
              <button
                onClick={() => handleNavClick('transparency')}
                className={navItemClass('transparency')}
                title="Public Transparency, RTI & City Health Score"
              >
                <Globe2 className="w-4 h-4 shrink-0" />
                {!isCollapsed && <span>{t('nav_transparency', language)}</span>}
              </button>

              {/* Suggestions & Feedback System */}
              <button
                onClick={() => handleNavClick('feedback')}
                className={navItemClass('feedback')}
                title="Participatory Suggestions & Amenity Feedback"
              >
                <Lightbulb className="w-4 h-4 shrink-0" />
                {!isCollapsed && <span>{t('nav_feedback', language)}</span>}
              </button>

              {/* RTI & Non-App Legal Remedies Guide */}
              <button
                onClick={() => handleNavClick('rti-legal')}
                className={navItemClass('rti-legal')}
                title="RTI Form A Generator & Non-App Statutory Legal Rights"
              >
                <Scale className="w-4 h-4 shrink-0" />
                {!isCollapsed && <span>{t('nav_rti_legal', language)}</span>}
              </button>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════════ */}
          {/* 2. ADMIN EXCLUSIVE NAVIGATION (Only shown for Super Admin)       */}
          {/* ════════════════════════════════════════════════════════════════ */}
          {isAdmin && (
            <div className="space-y-1">
              {!isCollapsed && (
                <div className="flex items-center space-x-1.5 px-3 mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-700" />
                  <p className="text-[10px] font-black uppercase text-purple-900 tracking-wider font-mono">
                    {t('tabAdmin', language)}
                  </p>
                </div>
              )}

              {/* Admin Control Center */}
              <button
                onClick={() => handleNavClick('admin-overview')}
                className={adminItemClass('admin-overview')}
                title="Super Admin Governance Control"
              >
                <ShieldAlert className="w-4 h-4 shrink-0" />
                {!isCollapsed && <span>{t('nav_admin_overview', language)}</span>}
              </button>

              {/* Department Officers & Staff */}
              <button
                onClick={() => handleNavClick('admin-staff')}
                className={adminItemClass('admin-staff')}
                title="Department Staffing & Dispatch Management"
              >
                <Users className="w-4 h-4 shrink-0" />
                {!isCollapsed && <span>{t('nav_admin_staff', language)}</span>}
              </button>

              {/* SLA & Escalation Oversight */}
              <button
                onClick={() => handleNavClick('admin-sla')}
                className={adminItemClass('admin-sla')}
                title="SLA Violations & Automatic Escalations"
              >
                <Clock className="w-4 h-4 shrink-0" />
                {!isCollapsed && <span>{t('nav_admin_sla', language)}</span>}
              </button>

              {/* System Audit Logs */}
              <button
                onClick={() => handleNavClick('admin-audit')}
                className={adminItemClass('admin-audit')}
                title="Cryptographic System Audit Trail"
              >
                <History className="w-4 h-4 shrink-0" />
                {!isCollapsed && <span>{t('nav_admin_audit', language)}</span>}
              </button>

              {/* Public Transparency Portal */}
              <button
                onClick={() => handleNavClick('transparency')}
                className={adminItemClass('transparency')}
                title="Open Governance & Municipal Health"
              >
                <Globe2 className="w-4 h-4 shrink-0" />
                {!isCollapsed && <span>{t('nav_transparency', language)}</span>}
              </button>

              {/* Legal & RTI Regulations */}
              <button
                onClick={() => handleNavClick('rti-legal')}
                className={adminItemClass('rti-legal')}
                title="RTI & Statutory Regulations"
              >
                <Scale className="w-4 h-4 shrink-0" />
                {!isCollapsed && <span>{t('nav_rti_legal', language)}</span>}
              </button>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════════ */}
          {/* 3. STAFF EXCLUSIVE NAVIGATION (Only shown for Gov Official)      */}
          {/* ════════════════════════════════════════════════════════════════ */}
          {isStaff && (
            <div className="space-y-1">
              {!isCollapsed && (
                <div className="flex items-center space-x-1.5 px-3 mb-1">
                  <Building2 className="w-3.5 h-3.5 text-blue-700" />
                  <p className="text-[10px] font-black uppercase text-blue-900 tracking-wider font-mono">
                    {t('tabStaff', language)}
                  </p>
                </div>
              )}
              <button
                onClick={() => handleNavClick('staff-workbench')}
                className={staffItemClass('staff-workbench')}
                title="Officer Grievance Workbench"
              >
                <Building2 className="w-4 h-4 shrink-0" />
                {!isCollapsed && <span>{t('nav_staff_workbench', language)}</span>}
              </button>

              <button
                onClick={() => handleNavClick('transparency')}
                className={staffItemClass('transparency')}
                title="Municipal Transparency Portal"
              >
                <Globe2 className="w-4 h-4 shrink-0" />
                {!isCollapsed && <span>{t('nav_transparency', language)}</span>}
              </button>

              <button
                onClick={() => handleNavClick('rti-legal')}
                className={staffItemClass('rti-legal')}
                title="RTI & Sakala Compliance"
              >
                <Scale className="w-4 h-4 shrink-0" />
                {!isCollapsed && <span>{t('nav_rti_legal', language)}</span>}
              </button>
            </div>
          )}

        </div>

        {/* Bottom Section: Policies, SOS, and Logout */}
        <div className="p-3 border-t border-amber-200/80 space-y-2 bg-amber-50/40">
          
          {/* Privacy and Terms links */}
          {!isCollapsed ? (
            <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold px-2 py-1">
              <button
                onClick={() => handleNavClick('privacy')}
                className="hover:text-amber-900 transition-colors"
              >
                Privacy
              </button>
              <span>•</span>
              <button
                onClick={() => handleNavClick('terms')}
                className="hover:text-amber-900 transition-colors"
              >
                Terms
              </button>
              {isCitizen && (
                <>
                  <span>•</span>
                  <button
                    onClick={() => handleNavClick('feedback')}
                    className="hover:text-amber-900 transition-colors"
                  >
                    Feedback
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="flex justify-center space-x-2 text-slate-400">
              <button onClick={() => handleNavClick('privacy')} title="Privacy Policy">
                <Lock className="w-3.5 h-3.5 hover:text-amber-800" />
              </button>
              <button onClick={() => handleNavClick('terms')} title="Terms of Service">
                <Scale className="w-3.5 h-3.5 hover:text-amber-800" />
              </button>
            </div>
          )}

          {/* Emergency SOS Quick Button */}
          <button
            onClick={onTriggerSafety}
            className={`w-full flex items-center ${
              isCollapsed ? 'justify-center p-2' : 'space-x-2 px-3 py-2'
            } rounded-xl bg-gradient-to-r from-rose-700 to-red-600 hover:from-rose-800 hover:to-red-700 text-white text-xs font-bold shadow-md pulse-emergency transition-all border border-rose-400 cursor-pointer`}
            title="Emergency SOS Distress Alert"
          >
            <ShieldAlert className="w-4 h-4 shrink-0" />
            {!isCollapsed && <span>Emergency SOS</span>}
          </button>

          {/* Logout Button */}
          {onLogout && (
            <button
              onClick={onLogout}
              className={`w-full flex items-center ${
                isCollapsed ? 'justify-center p-2' : 'space-x-2 px-3 py-2'
              } rounded-xl bg-white hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-200 text-xs font-bold transition-colors cursor-pointer shadow-2xs`}
              title="Sign Out of Account"
            >
              <LogOut className="w-4 h-4 shrink-0 text-rose-600" />
              {!isCollapsed && <span>Sign Out</span>}
            </button>
          )}

        </div>

      </aside>
    </>
  );
}
