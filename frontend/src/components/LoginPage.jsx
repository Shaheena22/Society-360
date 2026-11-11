import React, { useState, useRef } from 'react';
import {
  Mic, Lock, Mail, User, ShieldCheck, Building2, Users,
  ArrowRight, Sparkles, Check, ChevronRight, Phone, KeyRound,
  RefreshCw, CheckCircle2, AlertCircle, MapPin, Eye, EyeOff,
  Shield, Award, Activity, CheckCircle, Star, Globe2
} from 'lucide-react';
import { t } from '../services/translations';
import {
  INDIA_STATES_AND_DISTRICTS,
  getStatesList,
  getDistrictsForState,
  getDefaultDistrict
} from '../data/indiaLocations';
import { getOfficerAssignedDepts } from '../services/officersService';
import {
  OFFICIAL_LANGUAGES_22,
  LINK_LANGUAGES,
  OTHER_REGIONAL_LANGUAGES,
  ALL_LANGUAGES,
  getLanguageInfo
} from '../data/languages';
import { ALL_CIVIC_DEPARTMENTS } from '../data/civicDepartments';

export { ALL_CIVIC_DEPARTMENTS };

// Simulated registered mobile numbers for demo testing
const DEMO_REGISTERED_NUMBERS = {
  '9876543210': { name: 'Anita Deshmukh', uid: 'usr-citizen-1' },
  '9123456789': { name: 'Citizen User', uid: 'usr-citizen-demo' },
};

const SUPPORTED_LANGUAGES = ALL_LANGUAGES;

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export default function LoginPage({ onLogin, language = 'English', setLanguage }) {
  const [selectedRole, setSelectedRole] = useState('citizen'); // 'citizen' | 'staff' | 'admin'
  const [selectedDepartment, setSelectedDepartment] = useState('dept-roads');
  const [authMode, setAuthMode] = useState('email'); // 'email' | 'mobile'
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Cascading State & District selection
  const [selectedState, setSelectedState] = useState('Karnataka');
  const [selectedDistrict, setSelectedDistrict] = useState('Kalaburagi');
  const statesList = getStatesList();
  const districtsForCurrentState = getDistrictsForState(selectedState);

  const selectedDeptObj = ALL_CIVIC_DEPARTMENTS.find(d => d.id === selectedDepartment) || ALL_CIVIC_DEPARTMENTS[0];

  const handleStateChange = (e) => {
    const newState = e.target.value;
    setSelectedState(newState);
    const districts = getDistrictsForState(newState);
    if (districts.length > 0) {
      setSelectedDistrict(districts[0]);
    }
  };

  // Email / Password states
  const [email, setEmail] = useState('anita.d@gmail.com');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('');

  // Mobile / OTP states
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [otpResendCountdown, setOtpResendCountdown] = useState(0);
  const [resolvedMobileUser, setResolvedMobileUser] = useState(null);

  const otpInputRefs = useRef([]);
  const countdownRef = useRef(null);

  // Quick 1-Click Demo Login
  const handleQuickDemoLogin = (role, deptId) => {
    if (role === 'citizen') {
      onLogin({
        uid: 'usr-citizen-1',
        name: 'Anita Deshmukh',
        email: 'anita.d@gmail.com',
        role: 'citizen',
        state: 'Karnataka',
        district: 'Kalaburagi',
        city: 'Kalaburagi',
        location: 'Kalaburagi, Karnataka',
        preferredLanguage: language || 'English',
        points: 180,
        badge: 'Silver'
      });
    } else if (role === 'staff') {
      const targetDept = ALL_CIVIC_DEPARTMENTS.find(d => d.id === (deptId || 'dept-roads')) || ALL_CIVIC_DEPARTMENTS[0];
      const assignedDepts = getOfficerAssignedDepts(targetDept.email);
      onLogin({
        uid: `usr-staff-${targetDept.domain}`,
        name: targetDept.officer,
        email: targetDept.email,
        role: 'staff',
        departmentId: targetDept.id,
        departmentName: targetDept.name,
        assignedDepartments: assignedDepts,
        state: 'Karnataka',
        district: 'Kalaburagi',
        city: 'Kalaburagi',
        location: 'Kalaburagi, Karnataka',
        preferredLanguage: language || 'English',
        points: 120,
        badge: 'Silver'
      });
    } else if (role === 'admin') {
      onLogin({
        uid: 'usr-admin-1',
        name: 'Dr. Suresh Kumar',
        email: 'admin@civic.gov.in',
        role: 'admin',
        state: 'Karnataka',
        district: 'Kalaburagi',
        city: 'Kalaburagi',
        location: 'Kalaburagi, Karnataka',
        preferredLanguage: language || 'English',
        points: 450,
        badge: 'Platinum'
      });
    }
  };

  const startResendCountdown = () => {
    setOtpResendCountdown(30);
    clearInterval(countdownRef.current);
    countdownRef.current = setInterval(() => {
      setOtpResendCountdown(prev => {
        if (prev <= 1) { clearInterval(countdownRef.current); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendOtp = () => {
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setOtpError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }
    if (!isSignUp) {
      const registered = DEMO_REGISTERED_NUMBERS[mobile];
      if (!registered) {
        setOtpError('This number is not registered. Please sign up first or use Email login.');
        return;
      }
      setResolvedMobileUser(registered);
    }
    setOtpError('');
    const newOtp = generateOTP();
    setGeneratedOtp(newOtp);
    setOtp(['', '', '', '', '', '']);
    setOtpSent(true);
    setOtpVerified(false);
    startResendCountdown();
    setTimeout(() => otpInputRefs.current[0]?.focus(), 100);
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    setOtpError('');
    if (value && index < 5) otpInputRefs.current[index + 1]?.focus();
    if (value && next.every(d => d !== '')) {
      if (next.join('') === generatedOtp) {
        setOtpVerified(true);
      } else {
        setOtpError('Incorrect OTP. Please try again.');
        setOtpVerified(false);
      }
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const fillAutoOtp = () => {
    if (!generatedOtp) return;
    const digits = generatedOtp.split('');
    setOtp(digits);
    setOtpVerified(true);
    setOtpError('');
  };

  const switchAuthMode = (mode) => {
    setAuthMode(mode);
    setOtpSent(false);
    setOtpVerified(false);
    setOtpError('');
    setOtp(['', '', '', '', '', '']);
    setGeneratedOtp(null);
    setResolvedMobileUser(null);
    setMobile('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (authMode === 'mobile') {
      if (!otpVerified) {
        setOtpError('Please verify OTP first.');
        return;
      }
      if (isSignUp) {
        onLogin({
          uid: `usr_mob_${mobile}`,
          name: name || `Citizen_${mobile.slice(-4)}`,
          email: '',
          mobile,
          role: selectedRole,
          state: selectedState,
          district: selectedDistrict,
          city: selectedDistrict,
          location: `${selectedDistrict}, ${selectedState}`,
          preferredLanguage: language || 'English',
          points: 50,
          badge: 'Bronze'
        });
      } else {
        const u = resolvedMobileUser;
        onLogin({
          uid: u.uid,
          name: u.name,
          email: '',
          mobile,
          role: selectedRole,
          state: selectedState,
          district: selectedDistrict,
          city: selectedDistrict,
          location: `${selectedDistrict}, ${selectedState}`,
          preferredLanguage: language || 'English',
          points: 180,
          badge: 'Silver'
        });
      }
      return;
    }

    // Email / Password
    const cleanId = email ? email.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase() : `user_${Date.now()}`;
    const userUid = isSignUp
      ? `usr_citizen_${cleanId}`
      : selectedRole === 'admin'
      ? 'usr-admin-1'
      : selectedRole === 'staff'
      ? `usr-staff-${selectedDeptObj.domain}`
      : email && email !== 'anita.d@gmail.com'
      ? `usr_${cleanId}`
      : 'usr-citizen-1';

    const userName = isSignUp
      ? name || email.split('@')[0] || 'Registered Citizen'
      : selectedRole === 'admin'
      ? 'Dr. Suresh Kumar'
      : selectedRole === 'staff'
      ? selectedDeptObj.officer
      : name || (email === 'anita.d@gmail.com' ? 'Anita Deshmukh' : email.split('@')[0]) || 'Citizen User';

    onLogin({
      uid: userUid,
      name: userName,
      email: email || (selectedRole === 'staff' ? selectedDeptObj.email : 'user@civic.gov.in'),
      role: selectedRole,
      departmentId: selectedRole === 'staff' ? selectedDepartment : undefined,
      departmentName: selectedRole === 'staff' ? selectedDeptObj.name : undefined,
      assignedDepartments: selectedRole === 'staff' ? getOfficerAssignedDepts(selectedDeptObj.email) : undefined,
      state: selectedState,
      district: selectedDistrict,
      city: selectedDistrict,
      location: `${selectedDistrict}, ${selectedState}`,
      preferredLanguage: language || 'English',
      points: isSignUp ? 50 : 180,
      badge: isSignUp ? 'Bronze' : 'Silver'
    });
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] flex items-center justify-center p-2 sm:p-4 md:p-6 py-6 sm:py-8 font-outfit">
      {/* 50/50 Split Screen Master Card */}
      <div className="w-full max-w-7xl bg-white rounded-3xl shadow-2xl border border-amber-200/80 overflow-hidden flex flex-col lg:flex-row transition-all duration-300">

        {/* ════════════════════════════════════════════════════════════════════════
            LEFT HALF: PLAIN COLOR HERO PANEL (50%)
        ════════════════════════════════════════════════════════════════════════ */}
        <div className="w-full lg:w-1/2 relative min-h-[460px] lg:min-h-[780px] flex flex-col justify-between p-6 sm:p-8 lg:p-12 overflow-hidden bg-[#0F172A] text-white select-none">

          {/* Top Row: National Emblems & Live System Node Status */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2.5 bg-black/45 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full shadow-lg">
              <span className="text-lg">🏛️</span>
              <div className="text-left">
                <p className="text-[11px] font-bold text-amber-300 tracking-wide uppercase">MoHUA Smart Cities AI</p>
                <p className="text-[9px] text-slate-200 font-medium">Govt of India • Digital Public Good</p>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 bg-emerald-950/70 border border-emerald-400/30 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>National Node Online</span>
            </div>
          </div>

          {/* Center Content: Bold Civic Vision & Floating Glassmorphic Stats */}
          <div className="relative z-10 my-auto py-8 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                <span>{t('login_viksit_bharat', language)}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-cinzel leading-tight tracking-tight text-white drop-shadow-md">
                {t('login_hero_title_1', language)} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-amber-200">
                  {t('login_hero_title_2', language)}
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-200/90 max-w-lg leading-relaxed font-normal">
                {t('login_hero_sub', language)}
              </p>
            </div>

            {/* 3 Live Glassmorphism Metric Badges */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3 pt-2">
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-3 text-center shadow-lg transition-transform hover:-translate-y-1">
                <div className="text-amber-400 font-black text-lg sm:text-xl">98.4%</div>
                <div className="text-[10px] sm:text-[11px] font-bold text-slate-100">{t('login_stat_sla_title', language)}</div>
                <div className="text-[9px] text-amber-200/70 font-mono">{t('login_stat_sla_sub', language)}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-3 text-center shadow-lg transition-transform hover:-translate-y-1">
                <div className="text-emerald-300 font-black text-lg sm:text-xl">700+</div>
                <div className="text-[10px] sm:text-[11px] font-bold text-slate-100">{t('login_stat_wards_title', language)}</div>
                <div className="text-[9px] text-emerald-200/70 font-mono">{t('login_stat_wards_sub', language)}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-3 text-center shadow-lg transition-transform hover:-translate-y-1">
                <div className="text-cyan-300 font-black text-lg sm:text-xl">12+</div>
                <div className="text-[10px] sm:text-[11px] font-bold text-slate-100">{t('login_stat_lang_title', language)}</div>
                <div className="text-[9px] text-cyan-200/70 font-mono">{t('login_stat_lang_sub', language)}</div>
              </div>
            </div>

            {/* Frosted Citizen Voice Highlight Quote */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-xl space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 text-amber-400 text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                </div>
                <span className="text-[10px] text-slate-300 font-mono">{t('login_verified_badge', language)}</span>
              </div>
              <p className="text-xs text-slate-200 italic leading-snug">
                {t('login_quote', language)}
              </p>
              <div className="text-[11px] font-bold text-amber-300 flex items-center justify-between pt-1">
                <span>{t('login_quote_author', language)}</span>
                <span className="text-[10px] text-slate-400">{t('login_badge_citizen', language)}</span>
              </div>
            </div>
          </div>

          {/* Bottom Trust & Compliance Ribbon */}
          <div className="relative z-10 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-300 font-medium">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> {t('login_security_aes', language)}
            </span>
            <span>{t('login_dpdp_notice', language)}</span>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════════
            RIGHT HALF: LOGIN CREDENTIALS CONTAINER (50%)
        ════════════════════════════════════════════════════════════════════════ */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-start lg:justify-center bg-white overflow-y-auto py-8">
          <div className="max-w-md w-full mx-auto my-auto space-y-4">

            {/* Portal Branding Header */}
            <div className="space-y-1">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-700 via-orange-600 to-amber-500 flex items-center justify-center text-white text-lg font-black shadow-md shadow-amber-900/15 border border-amber-300">
                    🏛️
                  </div>
                  <div>
                    <h2 className="text-lg font-black font-cinzel text-amber-950 tracking-tight leading-none">
                      {t('appName', language)}
                    </h2>
                    <span className="text-[10px] font-bold text-amber-800/80">AI Citizen Governance Portal</span>
                  </div>
                </div>

                {/* Interactive Language Selector directly on Login Card */}
                {setLanguage ? (
                  <div className="flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-300/80 rounded-xl px-2.5 py-1 shadow-2xs transition-colors">
                    <Globe2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <select
                      value={language || 'English'}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="bg-transparent text-xs font-bold text-amber-950 focus:outline-none cursor-pointer font-outfit"
                      title={t('login_choose_lang', language)}
                    >
                      <optgroup label="Official 22 Languages (8th Schedule)">
                        {OFFICIAL_LANGUAGES_22.map(l => (
                          <option key={l.code} value={l.code}>{l.label}</option>
                        ))}
                      </optgroup>
                      <optgroup label="National / Link Language">
                        {LINK_LANGUAGES.map(l => (
                          <option key={l.code} value={l.code}>{l.label}</option>
                        ))}
                      </optgroup>
                      <optgroup label="Other Regional Languages">
                        {OTHER_REGIONAL_LANGUAGES.map(l => (
                          <option key={l.code} value={l.code}>{l.label}</option>
                        ))}
                      </optgroup>
                    </select>
                  </div>
                ) : (
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                    {getLanguageInfo(language || 'English').label}
                  </span>
                )}
              </div>

              <h3 className="text-2xl font-black text-slate-900 pt-2">
                {isSignUp ? t('login_create_account', language) : t('login_welcome_back', language)}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {isSignUp
                  ? t('login_create_sub', language)
                  : t('login_welcome_sub', language)}
              </p>
            </div>

            {/* Quick 1-Click Demo Login Bar */}
            <div className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-3 space-y-1.5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-amber-950 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>{t('login_instant_demo', language)}</span>
                </span>
                <span className="text-[9px] uppercase tracking-wider font-bold text-amber-700">
                  {t('login_instant_test_badge', language)}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('citizen')}
                  className="py-1.5 px-2 bg-white hover:bg-amber-100 rounded-xl border border-amber-300 text-[11px] font-bold text-amber-950 transition-all shadow-xs flex items-center justify-center gap-1 hover:border-amber-500"
                >
                  <span>👤</span> {t('login_persona_citizen', language)}
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('staff')}
                  className="py-1.5 px-2 bg-white hover:bg-indigo-50 rounded-xl border border-indigo-200 text-[11px] font-bold text-indigo-950 transition-all shadow-xs flex items-center justify-center gap-1 hover:border-indigo-400"
                >
                  <span>🏛️</span> {t('login_persona_official', language)}
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('admin')}
                  className="py-1.5 px-2 bg-white hover:bg-purple-50 rounded-xl border border-purple-200 text-[11px] font-bold text-purple-950 transition-all shadow-xs flex items-center justify-center gap-1 hover:border-purple-400"
                >
                  <span>👑</span> {t('login_persona_admin', language)}
                </button>
              </div>
            </div>

            {/* Persona Role Selection Tabs */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                <span>{t('login_persona_label', language)}</span>
                <span className="text-[10px] text-slate-400">
                  {t('login_current_label', language)}: <strong className="text-amber-800 capitalize">{t(`login_persona_${selectedRole}`, language) || selectedRole}</strong>
                </span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => { setSelectedRole('citizen'); setEmail('anita.d@gmail.com'); }}
                  className={`p-2.5 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center gap-1 ${
                    selectedRole === 'citizen'
                      ? 'border-amber-600 bg-amber-50 text-amber-950 shadow-sm font-bold'
                      : 'border-slate-200 bg-slate-50/50 hover:bg-amber-50/30 text-slate-600 hover:border-amber-300 font-medium'
                  }`}
                >
                  <span className="text-lg">👤</span>
                  <span className="text-[11px] leading-tight">{t('login_persona_citizen', language)}</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setSelectedRole('staff'); setEmail(selectedDeptObj.email); }}
                  className={`p-2.5 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center gap-1 ${
                    selectedRole === 'staff'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-950 shadow-sm font-bold'
                      : 'border-slate-200 bg-slate-50/50 hover:bg-indigo-50/30 text-slate-600 hover:border-indigo-300 font-medium'
                  }`}
                >
                  <span className="text-lg">🏛️</span>
                  <span className="text-[11px] leading-tight">{t('login_persona_official', language)}</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setSelectedRole('admin'); setEmail('admin@civic.gov.in'); }}
                  className={`p-2.5 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center gap-1 ${
                    selectedRole === 'admin'
                      ? 'border-purple-600 bg-purple-50 text-purple-950 shadow-sm font-bold'
                      : 'border-slate-200 bg-slate-50/50 hover:bg-purple-50/30 text-slate-600 hover:border-purple-300 font-medium'
                  }`}
                >
                  <span className="text-lg">👑</span>
                  <span className="text-[11px] leading-tight">{t('login_persona_admin', language)}</span>
                </button>
              </div>
            </div>

            {/* Authentication Mode Switcher (Email vs Mobile OTP) */}
            <div className="flex rounded-2xl bg-slate-100 p-1 text-xs font-bold">
              <button
                type="button"
                id="auth-tab-email"
                onClick={() => switchAuthMode('email')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl transition-all ${
                  authMode === 'email'
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80 font-bold'
                    : 'text-slate-600 hover:text-slate-900 font-medium'
                }`}
              >
                <Mail className="w-3.5 h-3.5 text-amber-700" />
                <span>{t('login_tab_email', language)}</span>
              </button>
              <button
                type="button"
                id="auth-tab-mobile"
                onClick={() => switchAuthMode('mobile')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl transition-all ${
                  authMode === 'mobile'
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80 font-bold'
                    : 'text-slate-600 hover:text-slate-900 font-medium'
                }`}
              >
                <Phone className="w-3.5 h-3.5 text-amber-700" />
                <span>{t('login_tab_mobile', language)}</span>
              </button>
            </div>

            {/* Interactive Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">

              {/* State & District Jurisdiction Section */}
              <div className="bg-amber-50/50 border border-amber-200/80 rounded-2xl p-3 space-y-2.5">
                <div className="flex items-center justify-between text-[11px] font-bold text-amber-950">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-700" />
                    <span>{t('login_jurisdiction_title', language)}</span>
                  </span>
                  <span className="text-[10px] text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md font-semibold">
                    {selectedDistrict}, {selectedState}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label htmlFor="select-state" className="text-[10px] font-bold text-slate-600 block">
                      {t('login_state_label', language)}
                    </label>
                    <select
                      id="select-state"
                      value={selectedState}
                      onChange={handleStateChange}
                      className="w-full bg-white border border-amber-200 text-xs text-slate-800 rounded-xl p-2 font-medium focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-500 shadow-2xs cursor-pointer"
                    >
                      {statesList.map(st => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="select-district" className="text-[10px] font-bold text-slate-600 block">
                      {t('login_district_label', language)}
                    </label>
                    <select
                      id="select-district"
                      value={selectedDistrict}
                      onChange={(e) => setSelectedDistrict(e.target.value)}
                      className="w-full bg-white border border-amber-200 text-xs text-slate-800 rounded-xl p-2 font-medium focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-500 shadow-2xs cursor-pointer"
                    >
                      {districtsForCurrentState.map(dst => (
                        <option key={dst} value={dst}>{dst}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Registered Department Selector for Staff */}
              {selectedRole === 'staff' && (
                <div className="space-y-1 bg-indigo-50/50 border border-indigo-200/80 rounded-2xl p-3">
                  <label className="text-[11px] font-bold text-indigo-950 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-indigo-700" />
                      <span>{t('login_dept_queue_label', language)}</span>
                    </span>
                    <span className="text-[10px] text-indigo-700">{t('login_official_jurisdiction', language)}</span>
                  </label>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="w-full bg-white border border-indigo-200 text-xs text-slate-800 rounded-xl p-2.5 font-medium focus:border-indigo-600 focus:ring-1 focus:ring-indigo-500"
                  >
                    {ALL_CIVIC_DEPARTMENTS.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.icon} {dept.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* ── EMAIL & PASSWORD AUTH ── */}
              {authMode === 'email' && (
                <div className="space-y-3">
                  {isSignUp && (
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700">{t('login_full_name', language)}</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          placeholder={t('login_name_placeholder', language) || "e.g. Anita Deshmukh"}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="w-full bg-white border border-slate-200 text-xs text-slate-800 rounded-xl pl-9 pr-3 py-2.5 font-medium focus:border-amber-600 focus:ring-1 focus:ring-amber-500 shadow-2xs"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">{t('login_email_label', language)}</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-white border border-slate-200 text-xs text-slate-800 rounded-xl pl-9 pr-3 py-2.5 font-medium focus:border-amber-600 focus:ring-1 focus:ring-amber-500 shadow-2xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-bold text-slate-700">{t('login_password_label', language)}</label>
                      {!isSignUp && (
                        <button
                          type="button"
                          onClick={() => alert('For demo: use password123 or 1-Click Demo Login')}
                          className="text-[11px] text-amber-800 hover:text-amber-900 font-semibold underline cursor-pointer"
                        >
                          {t('login_forgot', language)}
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full bg-white border border-slate-200 text-xs text-slate-800 rounded-xl pl-9 pr-10 py-2.5 font-medium focus:border-amber-600 focus:ring-1 focus:ring-amber-500 shadow-2xs"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(p => !p)}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                        title={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ── MOBILE & OTP AUTH ── */}
              {authMode === 'mobile' && (
                <div className="space-y-3">
                  {isSignUp && (
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700">{t('login_full_name', language)}</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          placeholder={t('login_name_placeholder', language) || "e.g. Anita Deshmukh"}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="w-full bg-white border border-slate-200 text-xs text-slate-800 rounded-xl pl-9 pr-3 py-2.5 font-medium focus:border-amber-600 focus:ring-1 focus:ring-amber-500 shadow-2xs"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-bold text-slate-700">
                        {isSignUp ? t('login_mobile_new', language) : t('login_mobile_reg', language)}
                      </label>
                      {!otpSent && (
                        <span className="text-[10px] text-amber-800 font-medium">{t('login_demo_label', language)}: 9876543210</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <div className="absolute left-3 top-2.5 flex items-center gap-1 text-slate-500 text-xs font-bold border-r border-slate-200 pr-2">
                          <span>🇮🇳</span> +91
                        </div>
                        <input
                          type="tel"
                          placeholder="10-digit mobile number"
                          value={mobile}
                          onChange={(e) => {
                            const v = e.target.value.replace(/\D/g, '').slice(0, 10);
                            setMobile(v);
                            setOtpSent(false);
                            setOtpVerified(false);
                            setOtpError('');
                          }}
                          maxLength={10}
                          className="w-full bg-white border border-slate-200 text-xs text-slate-800 rounded-xl pl-16 pr-3 py-2.5 font-semibold focus:border-amber-600 focus:ring-1 focus:ring-amber-500 shadow-2xs tracking-wider"
                        />
                      </div>
                      <button
                        type="button"
                        id="btn-send-otp"
                        onClick={handleSendOtp}
                        disabled={otpResendCountdown > 0}
                        className={`px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-all shadow-xs cursor-pointer ${
                          otpResendCountdown > 0
                            ? 'bg-amber-100 text-amber-600 border border-amber-200 cursor-not-allowed'
                            : 'bg-amber-600 hover:bg-amber-700 text-white border border-amber-500'
                        }`}
                      >
                        {otpSent ? (
                          <>
                            <RefreshCw className={`w-3.5 h-3.5 ${otpResendCountdown > 0 ? 'animate-spin' : ''}`} />
                            {otpResendCountdown > 0 ? `${otpResendCountdown}s` : t('login_resend', language)}
                          </>
                        ) : (
                          <>
                            <KeyRound className="w-3.5 h-3.5" />
                            <span>{t('login_send_otp', language)}</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Quick helper demo numbers */}
                    {!otpSent && (
                      <div className="flex items-center gap-1.5 pt-1 text-[11px] text-slate-500">
                        <span>{t('login_click_demo', language)}</span>
                        <button
                          type="button"
                          onClick={() => setMobile('9876543210')}
                          className="px-2 py-0.5 bg-amber-50 hover:bg-amber-100 rounded-md border border-amber-300 text-amber-900 font-mono text-[10px] font-bold cursor-pointer"
                        >
                          9876543210
                        </button>
                        <button
                          type="button"
                          onClick={() => setMobile('9123456789')}
                          className="px-2 py-0.5 bg-amber-50 hover:bg-amber-100 rounded-md border border-amber-300 text-amber-900 font-mono text-[10px] font-bold cursor-pointer"
                        >
                          9123456789
                        </button>
                      </div>
                    )}

                    {otpError && (
                      <p className="flex items-center gap-1 text-xs text-rose-600 font-semibold pt-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {otpError}
                      </p>
                    )}
                  </div>

                  {/* OTP Confirmation & Auto-Fill helper */}
                  {otpSent && (
                    <div className="space-y-2.5 pt-1">
                      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 text-xs text-emerald-900 font-medium flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{t('login_otp_sent_to', language)} <strong>+91-{mobile}</strong></span>
                        </div>
                        <button
                          type="button"
                          onClick={fillAutoOtp}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[10px] shadow-xs flex items-center gap-1 cursor-pointer"
                          title="Auto-fill OTP for test convenience"
                        >
                          <Sparkles className="w-3 h-3" /> {t('login_auto_fill', language)} ({generatedOtp})
                        </button>
                      </div>

                      {/* 6 Digit Input Boxes */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-700 block text-center">
                          {t('login_enter_otp', language)}
                        </label>
                        <div className="flex gap-2 justify-center">
                          {otp.map((digit, i) => (
                            <input
                              key={i}
                              ref={el => otpInputRefs.current[i] = el}
                              type="text"
                              inputMode="numeric"
                              maxLength={1}
                              value={digit}
                              onChange={(e) => handleOtpChange(i, e.target.value)}
                              onKeyDown={(e) => handleOtpKeyDown(i, e)}
                              className={`w-11 h-12 text-center text-lg font-black rounded-xl border-2 transition-all focus:outline-none ${
                                otpVerified
                                  ? 'border-emerald-500 bg-emerald-50/50 text-emerald-700 shadow-xs'
                                  : otpError && otp.every(d => d !== '')
                                  ? 'border-rose-400 bg-rose-50 text-rose-700'
                                  : 'border-slate-200 bg-white text-slate-800 focus:border-amber-600 focus:ring-1 focus:ring-amber-500 shadow-2xs'
                              }`}
                            />
                          ))}
                        </div>
                        {otpVerified && (
                          <p className="flex items-center justify-center gap-1 text-xs text-emerald-700 font-bold pt-1">
                            <CheckCircle2 className="w-4 h-4" /> {t('login_otp_success', language)}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Submit CTA Button */}
              <button
                type="submit"
                id="btn-login-submit"
                disabled={authMode === 'mobile' && !otpVerified}
                className={`w-full py-3 text-white font-bold text-sm rounded-xl shadow-lg flex items-center justify-center space-x-2 transition-all mt-3 border cursor-pointer ${
                  authMode === 'mobile' && !otpVerified
                    ? 'bg-amber-300 border-amber-200 cursor-not-allowed opacity-60'
                    : 'bg-gradient-to-r from-amber-700 via-orange-600 to-amber-600 hover:opacity-95 shadow-amber-900/20 border-amber-400 hover:shadow-xl hover:translate-y-[-1px]'
                }`}
              >
                <span>{isSignUp ? t('login_btn_signup', language) : t('login_btn_signin', language)}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Toggle Sign Up / Sign In */}
            <div className="text-center pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(s => !s);
                  setOtpSent(false);
                  setOtpVerified(false);
                  setOtpError('');
                  setOtp(['', '', '', '', '', '']);
                  setGeneratedOtp(null);
                  setResolvedMobileUser(null);
                  setMobile('');
                }}
                className="text-xs text-amber-800 hover:text-amber-950 font-bold underline transition-colors cursor-pointer"
              >
                {isSignUp
                  ? t('login_already_have', language)
                  : t('login_need_account', language)}
              </button>
            </div>

            {/* Micro Trust Indicators */}
            <div className="pt-2 text-center text-[10px] text-slate-400 space-y-1">
              <p className="flex items-center justify-center gap-1.5 font-medium">
                <Shield className="w-3 h-3 text-emerald-600" />
                <span>{t('login_nic_gateway', language)}</span>
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
