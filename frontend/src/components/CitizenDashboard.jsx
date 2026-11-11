import React, { useState } from 'react';
import {
  FileText, Plus, Wrench, Globe2, Lightbulb, ShieldAlert,
  CheckCircle2, Clock, MapPin, Award, ArrowRight, Sparkles,
  Users, Building2, TrendingUp, AlertTriangle, ChevronRight,
  QrCode, Camera, Navigation, Copy, Check, RefreshCw, Zap,
  ExternalLink, Layers
} from 'lucide-react';
import QRScannerModal from './QRScannerModal';
import { DEMO_QR_PRESETS } from '../services/qrService';
import { t } from '../services/translations';

export default function CitizenDashboard({
  currentUser,
  onNavigate,
  onOpenCreateComplaint,
  language = 'English'
}) {
  const citizenName = currentUser?.name || 'Anita Deshmukh';
  const wardName = currentUser?.district ? `Ward 12, ${currentUser.district}` : 'Ward 12, Kalaburagi';

  // ───────────────────────────────────────────────────────────────────────────
  // 1. LIVE GPS LOCATION & TELEMETRY STATE
  // ───────────────────────────────────────────────────────────────────────────
  const [gpsData, setGpsData] = useState({
    lat: '17.3325',
    lng: '76.8380',
    coordString: '17.3325° N, 76.8380° E',
    accuracy: 8,
    altitude: '454m MSL',
    address: currentUser?.district ? `Ward 12, Station Road, ${currentUser.district}` : 'Ward 12, Station Road, Kalaburagi',
    timestamp: 'Synced just now',
    isRealDeviceGps: false
  });
  const [isLocatingGps, setIsLocatingGps] = useState(false);
  const [gpsToast, setGpsToast] = useState('');
  const [copiedGps, setCopiedGps] = useState(false);

  // Trigger live GPS detection via browser navigator.geolocation
  const handleFetchLiveGPS = () => {
    setIsLocatingGps(true);
    setGpsToast('');

    if (!navigator.geolocation) {
      setGpsToast('Geolocation not supported by browser. Showing municipal ward centroid.');
      setIsLocatingGps(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude.toFixed(4);
        const lng = position.coords.longitude.toFixed(4);
        const accuracy = Math.round(position.coords.accuracy || 6);
        const altitude = position.coords.altitude ? `${Math.round(position.coords.altitude)}m MSL` : '454m MSL';
        const coordString = `${lat}° N, ${lng}° E`;

        let detectedAddr = `${wardName} (${coordString})`;
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
          if (res.ok) {
            const data = await res.json();
            if (data.display_name) {
              detectedAddr = data.display_name.split(',').slice(0, 3).join(', ') || detectedAddr;
            }
          }
        } catch (e) {
          // keep fallback
        }

        setGpsData({
          lat,
          lng,
          coordString,
          accuracy,
          altitude,
          address: detectedAddr,
          timestamp: new Date().toLocaleTimeString(),
          isRealDeviceGps: true
        });

        setIsLocatingGps(false);
        setGpsToast('Live satellite fix acquired! Accuracy ±' + accuracy + 'm');
        setTimeout(() => setGpsToast(''), 4000);
      },
      (error) => {
        console.warn('Live GPS fallback:', error);
        setGpsData(prev => ({
          ...prev,
          timestamp: new Date().toLocaleTimeString(),
          isRealDeviceGps: false
        }));
        setIsLocatingGps(false);
        setGpsToast('GPS satellite lock approximated from municipal ward centroid.');
        setTimeout(() => setGpsToast(''), 4000);
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
    );
  };

  const handleCopyGpsCoords = () => {
    navigator.clipboard.writeText(`${gpsData.coordString} | ${gpsData.address}`);
    setCopiedGps(true);
    setTimeout(() => setCopiedGps(false), 2000);
  };

  const handleReportAtGpsLocation = () => {
    if (onOpenCreateComplaint) {
      onOpenCreateComplaint({
        address: gpsData.address,
        ward: wardName,
        landmark: `Live GPS Fix: ${gpsData.coordString}`,
        description: `Reporting civic issue observed at live GPS coordinates (${gpsData.coordString}).`
      });
    }
  };

  // ───────────────────────────────────────────────────────────────────────────
  // 2. AI CIVIC QR SCANNER STATE & ASSET DISCOVERY
  // ───────────────────────────────────────────────────────────────────────────
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);
  const [scannedAsset, setScannedAsset] = useState(null);
  const [qrToast, setQrToast] = useState('');

  const handleQRScanSuccess = (parsedData) => {
    setScannedAsset(parsedData);
    setQrToast(`Asset detected: ${parsedData.assetId || parsedData.complaintId || 'Civic Target'}`);
    setTimeout(() => setQrToast(''), 4000);
  };

  const handleApplyPresetQR = (preset) => {
    setScannedAsset({
      type: 'ASSET',
      domain: preset.domain,
      category: preset.category,
      categoryName: preset.categoryName,
      assetId: preset.assetId,
      address: preset.address,
      ward: preset.ward,
      details: preset.label
    });
    setQrToast(`Simulated scan: ${preset.label}`);
    setTimeout(() => setQrToast(''), 4000);
  };

  const handleLodgeGrievanceForAsset = () => {
    if (!scannedAsset) return;
    if (onOpenCreateComplaint) {
      onOpenCreateComplaint({
        category: scannedAsset.domain || 'roads',
        problem: scannedAsset.categoryName || 'Infrastructure Defect',
        address: scannedAsset.address || gpsData.address,
        ward: scannedAsset.ward || wardName,
        landmark: `Asset ID: ${scannedAsset.assetId || 'Municipal QR Tag'}`,
        description: `Defect grievance filed on scanned municipal asset ${scannedAsset.assetId || ''} (${scannedAsset.details || ''}).`
      });
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 font-outfit">
      
      {/* Hero Welcome Card */}
      <div className="bg-gradient-to-r from-amber-900 via-orange-800 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-amber-500/30">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-200 border border-amber-300/30 text-xs font-bold">
              <span>{t('dash_hero_tag', language)}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-cinzel tracking-tight text-white">
              {t('dash_welcome_back', language)}, {citizenName}!
            </h1>
            <p className="text-sm text-amber-100/85 font-normal leading-relaxed">
              {t('dash_hero_sub', language)}
            </p>
            <div className="flex items-center space-x-3 pt-2 text-xs font-bold text-amber-200">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{wardName}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>{t('dash_civic_guardian', language)}</span>
              </span>
            </div>
          </div>

          {/* Quick Primary CTA */}
          <button
            onClick={() => onOpenCreateComplaint()}
            className="self-start md:self-auto px-6 py-3.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white font-black text-sm rounded-2xl shadow-lg shadow-orange-950/40 flex items-center space-x-2.5 transition-all transform hover:-translate-y-0.5 border border-amber-300 font-outfit cursor-pointer"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
            <span>{t('dash_btn_lodge', language)}</span>
          </button>
        </div>

        {/* Live Ward Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-amber-500/30 text-xs">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
            <p className="text-amber-200/80 font-medium">{t('dash_resolution_rate', language)}</p>
            <p className="text-xl font-black text-white font-cinzel mt-0.5">94.2%</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
            <p className="text-amber-200/80 font-medium">{t('dash_avg_fix_time', language)}</p>
            <p className="text-xl font-black text-white font-cinzel mt-0.5">18.4 {t('dash_hours', language)}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
            <p className="text-amber-200/80 font-medium">{t('dash_active_tickets', language)}</p>
            <p className="text-xl font-black text-amber-300 font-cinzel mt-0.5">12 {t('dash_tickets_label', language)}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
            <p className="text-amber-200/80 font-medium">{t('dash_oversight', language)}</p>
            <p className="text-xl font-black text-emerald-300 font-cinzel mt-0.5">{t('dash_active_100', language)}</p>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* FEATURE SPOTLIGHT: LIVE GPS LOCATION & AI CIVIC QR CODE SCANNER        */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 1. LIVE GPS LOCATION & TELEMETRY CARD */}
        <div className="bg-gradient-to-br from-amber-50 via-white to-amber-100/50 rounded-3xl p-6 border-2 border-amber-300/80 shadow-md space-y-4 relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-md shadow-amber-900/20">
                <Navigation className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-base font-black font-cinzel text-amber-950">
                    {t('dash_gps_title', language)}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>{t('dash_gps_live_lock', language)}</span>
                  </span>
                </div>
                <p className="text-xs text-amber-900/80 font-medium">
                  {t('dash_gps_sub', language)}
                </p>
              </div>
            </div>

            <button
              onClick={handleFetchLiveGPS}
              disabled={isLocatingGps}
              className="p-2 rounded-xl bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 shadow-xs transition-all cursor-pointer flex items-center space-x-1 text-xs font-bold"
              title="Refresh Live GPS Coordinates"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLocatingGps ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{isLocatingGps ? t('dash_locating', language) : t('dash_refresh_gps', language)}</span>
            </button>
          </div>

          {/* Toast Notice */}
          {gpsToast && (
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center gap-1.5 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{gpsToast}</span>
            </div>
          )}

          {/* Telemetry Display Box */}
          <div className="bg-white/90 rounded-2xl p-4 border border-amber-200 space-y-3 shadow-xs">
            <div className="flex items-center justify-between border-b border-amber-100 pb-2">
              <div className="flex items-center space-x-2 text-xs">
                <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
                <span className="font-bold text-slate-800">{gpsData.address}</span>
              </div>
              <button
                onClick={handleCopyGpsCoords}
                className="text-[11px] text-amber-800 hover:text-amber-950 font-bold flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200"
                title="Copy Coordinates to Clipboard"
              >
                {copiedGps ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedGps ? t('dash_copied', language) : t('dash_copy', language)}</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-xl bg-amber-50/60 border border-amber-200/60">
                <span className="text-[10px] text-amber-800 font-semibold block uppercase">{t('dash_coordinates', language)}</span>
                <span className="text-xs font-mono font-bold text-amber-950 truncate block mt-0.5">
                  {gpsData.coordString}
                </span>
              </div>
              <div className="p-2 rounded-xl bg-amber-50/60 border border-amber-200/60">
                <span className="text-[10px] text-amber-800 font-semibold block uppercase">{t('dash_accuracy', language)}</span>
                <span className="text-xs font-mono font-bold text-emerald-700 block mt-0.5">
                  ±{gpsData.accuracy} {t('dash_meters', language)}
                </span>
              </div>
              <div className="p-2 rounded-xl bg-amber-50/60 border border-amber-200/60">
                <span className="text-[10px] text-amber-800 font-semibold block uppercase">{t('dash_altitude', language)}</span>
                <span className="text-xs font-mono font-bold text-amber-950 block mt-0.5">
                  {gpsData.altitude}
                </span>
              </div>
            </div>
          </div>

          {/* Action Button: Lodge Grievance at Current GPS Spot */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleReportAtGpsLocation}
              className="flex-1 py-2.5 px-4 bg-gradient-to-r from-amber-700 to-orange-700 hover:from-amber-800 hover:to-orange-800 text-white rounded-xl text-xs font-bold shadow-md shadow-amber-950/20 flex items-center justify-center space-x-2 transition-all cursor-pointer border border-amber-500"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{t('dash_report_at_gps', language)}</span>
            </button>
            <button
              onClick={handleFetchLiveGPS}
              className="py-2.5 px-3 bg-white hover:bg-amber-100 text-amber-950 rounded-xl text-xs font-bold border border-amber-300 shadow-xs transition-colors cursor-pointer"
              title="Calibrate Satellite Lock"
            >
              {t('dash_calibrate', language)}
            </button>
          </div>
        </div>

        {/* 2. AI CIVIC QR CODE SCANNER CARD */}
        <div className="bg-gradient-to-br from-indigo-50 via-white to-indigo-100/40 rounded-3xl p-6 border-2 border-indigo-200 shadow-md space-y-4 relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-2xl bg-indigo-800 text-white flex items-center justify-center shadow-md shadow-indigo-900/20">
                <QrCode className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-base font-black font-cinzel text-slate-900">
                    {t('dash_qr_title', language)}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[10px] font-bold border border-indigo-300 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-indigo-600" />
                    <span>{t('dash_qr_instant', language)}</span>
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium">
                  {t('dash_qr_sub', language)}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsQRScannerOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-700 to-indigo-900 hover:from-indigo-800 hover:to-indigo-950 text-white shadow-md text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer border border-indigo-400"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>{t('dash_qr_open', language)}</span>
            </button>
          </div>

          {/* Toast Notice */}
          {qrToast && (
            <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-300 text-indigo-800 text-xs font-semibold flex items-center gap-1.5 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-indigo-600" />
              <span>{qrToast}</span>
            </div>
          )}

          {/* If an asset is scanned, show asset details */}
          {scannedAsset ? (
            <div className="bg-white rounded-2xl p-4 border-2 border-indigo-300 space-y-3 shadow-xs animate-fadeIn">
              <div className="flex items-center justify-between border-b border-indigo-100 pb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-base">🏷️</span>
                  <div>
                    <span className="text-[10px] text-slate-500 font-semibold uppercase">Verified Civic Asset</span>
                    <h4 className="text-xs font-bold text-slate-900 font-mono">
                      {scannedAsset.assetId || scannedAsset.complaintId || 'Civic Infrastructure'}
                    </h4>
                  </div>
                </div>
                <button
                  onClick={() => setScannedAsset(null)}
                  className="text-[11px] text-slate-400 hover:text-slate-700 font-bold"
                >
                  ✕ Clear
                </button>
              </div>

              <div className="text-xs text-slate-600 space-y-1">
                <p className="font-medium">
                  <strong>Domain:</strong> <span className="uppercase font-mono text-indigo-800">{scannedAsset.domain || 'Municipal'}</span>
                </p>
                <p className="truncate">
                  <strong>Location:</strong> {scannedAsset.address || 'Ward 12'}
                </p>
                {scannedAsset.details && (
                  <p className="text-[11px] text-slate-500 italic">
                    {scannedAsset.details}
                  </p>
                )}
              </div>

              <button
                onClick={handleLodgeGrievanceForAsset}
                className="w-full py-2 bg-gradient-to-r from-indigo-700 to-purple-800 hover:from-indigo-800 hover:to-purple-900 text-white rounded-xl text-xs font-bold shadow-md flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{t('dash_qr_lodge_asset', language)}</span>
              </button>
            </div>
          ) : (
            <div className="bg-white/80 rounded-2xl p-3.5 border border-indigo-100 space-y-2.5">
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                <span>{t('dash_qr_test_presets', language)}</span>
                <span className="text-[10px] text-indigo-700 font-mono">{t('dash_qr_simulate', language)}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {DEMO_QR_PRESETS.slice(0, 4).map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleApplyPresetQR(preset)}
                    className="p-2 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-left transition-all text-xs flex items-center space-x-2 group cursor-pointer"
                  >
                    <span className="text-sm group-hover:scale-110 transition-transform">{preset.icon}</span>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-slate-800 group-hover:text-indigo-900 truncate text-[11px]">
                        {preset.label}
                      </p>
                      <p className="text-[9px] text-slate-500 font-mono truncate">{preset.assetId}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Embedded QR Scanner Modal */}
      <QRScannerModal
        isOpen={isQRScannerOpen}
        onClose={() => setIsQRScannerOpen(false)}
        onScanSuccess={handleQRScanSuccess}
      />

      {/* Quick Launchpad Action Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black font-cinzel text-slate-900">
            {t('dash_launchpad_title', language)}
          </h2>
          <span className="text-xs text-slate-500 font-medium">{t('dash_launchpad_sub', language)}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Action 1: Complaints Page */}
          <div
            onClick={() => onNavigate('complaints')}
            className="group cursor-pointer bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:shadow-xl hover:border-amber-400 transition-all flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                📝
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                {t('dash_card_complaints_title', language)}
              </h3>
              <p className="text-xs text-slate-500">
                {t('dash_card_complaints_desc', language)}
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-amber-800 pt-2 border-t border-slate-100 group-hover:translate-x-1 transition-transform">
              <span>{t('dash_card_complaints_btn', language)}</span>
            </div>
          </div>

          {/* Action 2: Civic Services */}
          <div
            onClick={() => onNavigate('services')}
            className="group cursor-pointer bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:shadow-xl hover:border-amber-400 transition-all flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                🏛️
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-800 transition-colors">
                {t('dash_card_services_title', language)}
              </h3>
              <p className="text-xs text-slate-500">
                {t('dash_card_services_desc', language)}
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-blue-800 pt-2 border-t border-slate-100 group-hover:translate-x-1 transition-transform">
              <span>{t('dash_card_services_btn', language)}</span>
            </div>
          </div>

          {/* Action 3: Transparency */}
          <div
            onClick={() => onNavigate('transparency')}
            className="group cursor-pointer bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:shadow-xl hover:border-emerald-400 transition-all flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                🌐
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                {t('dash_card_transparency_title', language)}
              </h3>
              <p className="text-xs text-slate-500">
                {t('dash_card_transparency_desc', language)}
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-emerald-800 pt-2 border-t border-slate-100 group-hover:translate-x-1 transition-transform">
              <span>{t('dash_card_transparency_btn', language)}</span>
            </div>
          </div>

          {/* Action 4: Feedback & Suggestions */}
          <div
            onClick={() => onNavigate('feedback')}
            className="group cursor-pointer bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:shadow-xl hover:border-purple-400 transition-all flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="w-11 h-11 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                💡
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-purple-800 transition-colors">
                {t('dash_card_feedback_title', language)}
              </h3>
              <p className="text-xs text-slate-500">
                {t('dash_card_feedback_desc', language)}
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-purple-800 pt-2 border-t border-slate-100 group-hover:translate-x-1 transition-transform">
              <span>{t('dash_card_feedback_btn', language)}</span>
            </div>
          </div>

          {/* Action 5: RTI & Legal Rights Guide */}
          <div
            onClick={() => onNavigate('rti-legal')}
            className="group cursor-pointer bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:shadow-xl hover:border-amber-400 transition-all flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                ⚖️
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                {t('dash_card_legal_title', language)}
              </h3>
              <p className="text-xs text-slate-500">
                {t('dash_card_legal_desc', language)}
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-amber-800 pt-2 border-t border-slate-100 group-hover:translate-x-1 transition-transform">
              <span>{t('dash_card_legal_btn', language)}</span>
            </div>
          </div>

        </div>
      </div>

      {/* Ward Bulletins & Recent Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Ward Live Notices */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <span className="text-base">📢</span>
              <h3 className="text-sm font-bold text-slate-900 font-cinzel">{t('dash_bulletins_title', language)}</h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-bold">{t('dash_live_badge', language)}</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-1">
              <span className="font-bold text-amber-950 block">{t('dash_bulletin_1_title', language)}</span>
              <p className="text-slate-600 leading-relaxed">
                {t('dash_bulletin_1_desc', language)}
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
              <span className="font-bold text-slate-900 block">{t('dash_bulletin_2_title', language)}</span>
              <p className="text-slate-600 leading-relaxed">
                {t('dash_bulletin_2_desc', language)}
              </p>
            </div>
          </div>
        </div>

        {/* Citizen Rights & Sakala SLA Guarantee */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
              <span className="text-base">⚖️</span>
              <h3 className="text-sm font-bold text-slate-900 font-cinzel">{t('dash_rights_title', language)}</h3>
            </div>
            <div className="space-y-2.5 mt-3 text-xs text-slate-600">
              <p className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{t('dash_right_1', language)}</span>
              </p>
              <p className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{t('dash_right_2', language)}</span>
              </p>
              <p className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{t('dash_right_3', language)}</span>
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs gap-2">
            <button
              onClick={() => onNavigate('rti-legal')}
              className="text-amber-800 font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{t('dash_open_legal_guide', language)}</span>
            </button>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onNavigate('terms')}
                className="text-slate-600 hover:text-amber-900 font-medium hover:underline cursor-pointer"
              >
                {t('dash_charter', language)}
              </button>
              <span>•</span>
              <button
                onClick={() => onNavigate('privacy')}
                className="text-slate-500 hover:text-slate-800 font-medium hover:underline cursor-pointer"
              >
                {t('dash_privacy', language)}
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
