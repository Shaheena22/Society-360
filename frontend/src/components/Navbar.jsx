import React from 'react';
import {
  Menu, ShieldAlert, Eye, LogOut, Globe2, ChevronDown,
  User, Check, Sparkles, Building2
} from 'lucide-react';
import { t } from '../services/translations';
import {
  OFFICIAL_LANGUAGES_22,
  LINK_LANGUAGES,
  OTHER_REGIONAL_LANGUAGES
} from '../data/languages';

export default function Navbar({
  pageTitle = 'Dashboard / Home',
  language,
  setLanguage,
  isHighContrast,
  setIsHighContrast,
  isLargeText,
  setIsLargeText,
  onTriggerSafety,
  currentUser,
  onLogout,
  onOpenLogin,
  onToggleMobileSidebar
}) {
  const roleLabel = currentUser?.role === 'admin'
    ? 'Super Admin'
    : currentUser?.role === 'staff'
    ? 'Gov Official'
    : 'Citizen User';

  const roleBadgeStyle = currentUser?.role === 'admin'
    ? 'bg-purple-100 text-purple-900 border-purple-300'
    : currentUser?.role === 'staff'
    ? 'bg-blue-100 text-blue-900 border-blue-300'
    : 'bg-amber-100 text-amber-900 border-amber-300';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-300/60 shadow-xs font-outfit">
      {/* Top Heritage Ribbon */}
      <div className="h-1 w-full bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700"></div>

      <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        
        {/* Left Section: Mobile Menu Toggle & Page Title */}
        <div className="flex items-center space-x-3">
          {/* Mobile Hamburger Button */}
          <button
            onClick={onToggleMobileSidebar}
            className="md:hidden p-2 text-slate-700 hover:text-amber-900 hover:bg-amber-100 rounded-xl transition-colors border border-slate-200"
            title="Open Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold text-amber-900 bg-amber-100/90 px-2 py-0.5 rounded-md border border-amber-300/60 hidden sm:inline-block">
                Society 360
              </span>
              <span className="text-slate-400 hidden sm:inline-block">•</span>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 font-cinzel tracking-tight flex items-center gap-1.5">
                {pageTitle}
              </h2>
            </div>
          </div>
        </div>

        {/* Right Section: Language, Accessibility, SOS, User Profile & Sign Out */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Language Selector (All 22 Official Languages with native script & English in parentheses) */}
          <div className="relative flex items-center">
            <Globe2 className="w-3.5 h-3.5 text-amber-700 absolute left-2.5 pointer-events-none hidden sm:inline-block" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-slate-50 border border-slate-300 text-xs font-bold text-slate-800 rounded-xl pl-2 sm:pl-7 pr-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-xs cursor-pointer font-outfit max-w-[160px] sm:max-w-[210px] truncate"
              title="Select Language / भाषा चुनें"
            >
              <optgroup label="Official 22 Languages (8th Schedule)">
                {OFFICIAL_LANGUAGES_22.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.label}
                  </option>
                ))}
              </optgroup>
              <optgroup label="National / Link Language">
                {LINK_LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.label}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Other Regional Languages">
                {OTHER_REGIONAL_LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.label}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Accessibility Contrast & Font */}
          <div className="flex items-center bg-slate-100 border border-slate-200 rounded-xl p-0.5">
            <button
              onClick={() => setIsHighContrast(!isHighContrast)}
              title="Toggle High Contrast Mode"
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                isHighContrast ? 'bg-amber-700 text-white' : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsLargeText(!isLargeText)}
              title="Toggle Large Text Mode"
              className={`px-2 py-1 text-xs font-bold rounded-lg transition-colors ${
                isLargeText ? 'bg-amber-700 text-white' : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              A+
            </button>
          </div>

          {/* Emergency SOS Button */}
          <button
            onClick={onTriggerSafety}
            className="flex items-center space-x-1 px-3 py-1.5 bg-gradient-to-r from-rose-700 to-red-600 hover:from-rose-800 hover:to-red-700 text-white text-xs font-bold rounded-xl pulse-emergency shadow-sm transition-all font-outfit border border-rose-400 cursor-pointer"
            title="Emergency SOS Live Distress Dispatch"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t('sosSafety', language)}</span>
          </button>

          {/* User Account / Sign Out Section */}
          {currentUser ? (
            <div className="flex items-center space-x-2 pl-1">
              <div className="flex items-center space-x-2 px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-200 shadow-xs">
                <div
                  className="w-7 h-7 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 text-white text-xs font-bold flex items-center justify-center border border-amber-300 shadow-2xs shrink-0"
                >
                  {currentUser.name?.[0] || 'U'}
                </div>
                <div className="hidden md:block leading-tight text-left">
                  <p className="text-xs font-bold text-slate-900 truncate max-w-[130px]">
                    {currentUser.name}
                  </p>
                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border uppercase font-mono ${roleBadgeStyle}`}>
                    {roleLabel}
                  </span>
                </div>
              </div>

              {onLogout && (
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-white hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-200 text-xs font-bold transition-all shadow-xs cursor-pointer"
                  title="Sign Out of this Account"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t('logOut', language)}</span>
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all border border-amber-400 cursor-pointer font-outfit"
              title="Sign In or Register"
            >
              <User className="w-3.5 h-3.5" />
              <span>{t('signInRegister', language)}</span>
            </button>
          )}

        </div>

      </div>
    </header>
  );
}
