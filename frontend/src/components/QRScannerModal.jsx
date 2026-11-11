import React, { useState, useEffect, useRef } from 'react';
import { QrCode, Camera, X, Sparkles, CheckCircle2, AlertCircle, RefreshCw, Zap, Building2, MapPin } from 'lucide-react';
import jsQR from 'jsqr';
import { parseCivicQRCode, playQRBeep, DEMO_QR_PRESETS } from '../services/qrService';
import { t } from '../services/translations';

export default function QRScannerModal({ isOpen, onClose, onScanSuccess, language = 'English', speakText }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const animFrameIdRef = useRef(null);
  const streamRef = useRef(null);

  const [hasCamera, setHasCamera] = useState(true);
  const [cameraError, setCameraError] = useState(null);
  const [scannedResult, setScannedResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [facingMode, setFacingMode] = useState('environment'); // 'environment' | 'user'

  useEffect(() => {
    if (isOpen) {
      setScannedResult(null);
      setIsProcessing(false);
      startCamera();
      if (speakText) speakText(language === 'Kannada' ? 'ಕ್ಯೂಆರ್ ಕೋಡ್ ಸ್ಕ್ಯಾನರ್ ಸಕ್ರಿಯವಾಗಿದೆ.' : language === 'Hindi' ? 'क्यूआर कोड स्कैनर सक्रिय है।' : 'Civic QR Scanner active. Point camera at any municipal asset sticker or complaint receipt.');
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isOpen, facingMode]);

  const startCamera = async () => {
    try {
      setCameraError(null);
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setHasCamera(false);
        setCameraError('Camera access not supported by this browser. You can use Quick Demo QR presets below.');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', 'true');
        videoRef.current.play();
        requestAnimationFrame(tickScan);
      }
    } catch (err) {
      console.warn('Camera stream error:', err);
      setHasCamera(false);
      setCameraError('Unable to access live camera (Permission denied or in use). You can test with the Smart City Demo QR presets below.');
    }
  };

  const stopCamera = () => {
    if (animFrameIdRef.current) {
      cancelAnimationFrame(animFrameIdRef.current);
      animFrameIdRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const tickScan = () => {
    if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (canvas) {
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert'
        });

        if (code && code.data && !isProcessing) {
          handleDetectedRawQR(code.data);
          return;
        }
      }
    }
    animFrameIdRef.current = requestAnimationFrame(tickScan);
  };

  const handleDetectedRawQR = (rawText) => {
    setIsProcessing(true);
    playQRBeep();
    const parsed = parseCivicQRCode(rawText);
    setScannedResult(parsed);

    if (speakText) {
      if (parsed.type === 'ASSET') {
        speakText(`Asset QR detected: ${parsed.assetId}. Routing to ${parsed.domain} grievance form.`);
      } else if (parsed.type === 'TRACK') {
        speakText(`Complaint QR detected: ${parsed.complaintId}. Opening live status.`);
      } else if (parsed.type === 'TOILET') {
        speakText(`Smart toilet QR detected: ${parsed.toiletName}. Opening cleanliness feedback.`);
      } else {
        speakText('QR code verified successfully.');
      }
    }

    setTimeout(() => {
      if (onScanSuccess) {
        onScanSuccess(parsed);
      }
      onClose();
    }, 1200);
  };

  const handleApplyPreset = (preset) => {
    handleDetectedRawQR(preset.payload);
  };

  const toggleCameraFacing = () => {
    stopCamera();
    setFacingMode(prev => (prev === 'environment' ? 'user' : 'environment'));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 font-outfit">
      <div className="bg-gradient-to-b from-[#180e04] via-[#0f172a] to-[#1c1105] text-white border-2 border-amber-400 p-6 rounded-3xl max-w-lg w-full space-y-5 shadow-2xl relative overflow-hidden">
        
        {/* Glow lights */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl pointer-events-none -ml-16 -mb-16"></div>

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-amber-400/30 pb-3 relative z-10">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/40">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black font-cinzel text-white flex items-center gap-1.5">
                <span>Civic Asset & Receipt QR Scanner</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400 font-mono">LIVE AI</span>
              </h3>
              <p className="text-[11px] text-amber-200/80 font-medium">
                Scan municipal stickers on streetlights, waste bins, or complaint cards
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Camera Viewport & Scan Reticle */}
        <div className="relative rounded-2xl overflow-hidden bg-black aspect-video border-2 border-amber-400/50 shadow-inner flex items-center justify-center">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            playsInline
            muted
          />
          <canvas ref={canvasRef} className="hidden" />

          {/* Laser Sweep Scan Effect */}
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center">
            {/* Viewfinder Target Frame */}
            <div className="w-48 h-48 sm:w-56 sm:h-56 border-2 border-dashed border-amber-300/80 rounded-2xl relative flex items-center justify-center shadow-lg">
              {/* Corner targeting accents */}
              <div className="absolute -top-1 -left-1 w-5 h-5 border-t-4 border-l-4 border-amber-400"></div>
              <div className="absolute -top-1 -right-1 w-5 h-5 border-t-4 border-r-4 border-amber-400"></div>
              <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b-4 border-l-4 border-amber-400"></div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-4 border-r-4 border-amber-400"></div>

              {/* Laser beam animated */}
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_8px_#f59e0b] animate-pulse"></div>
            </div>
          </div>

          {/* Camera Controls Overlay */}
          <div className="absolute top-2 right-2 flex items-center space-x-1.5">
            <button
              type="button"
              onClick={toggleCameraFacing}
              title="Switch Camera Front/Back"
              className="p-2 rounded-xl bg-black/60 hover:bg-black/80 text-amber-300 border border-amber-400/40 text-xs font-bold backdrop-blur-md flex items-center space-x-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="text-[10px]">Flip</span>
            </button>
          </div>

          {/* Scanned Result Flash Confirmation */}
          {scannedResult && (
            <div className="absolute inset-0 bg-emerald-950/90 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center space-y-2 animate-fadeIn z-20">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 animate-bounce" />
              <p className="text-sm font-black text-white">QR Code Verified!</p>
              <p className="text-xs text-emerald-200 font-mono font-bold bg-emerald-900/60 px-3 py-1 rounded-xl border border-emerald-400/40">
                {scannedResult.type === 'ASSET' ? `Asset ID: ${scannedResult.assetId}` : scannedResult.type === 'TRACK' ? `Tracking ID: ${scannedResult.complaintId}` : `SBM Toilet: ${scannedResult.toiletName}`}
              </p>
              <p className="text-[11px] text-emerald-300/80">Applying smart city parameters to dashboard...</p>
            </div>
          )}

          {/* Camera Error Fallback Message */}
          {cameraError && !scannedResult && (
            <div className="absolute inset-0 bg-black/85 p-4 flex flex-col items-center justify-center text-center space-y-2">
              <AlertCircle className="w-8 h-8 text-amber-400" />
              <p className="text-xs text-amber-100 font-medium max-w-xs">{cameraError}</p>
            </div>
          )}
        </div>

        {/* Quick Demo QR Presets (1-Click Instant Simulation) */}
        <div className="space-y-2 relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-300 flex items-center gap-1 font-cinzel">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Or Tap Demo Civic Asset QR Presets:</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono">1-Tap Simulation</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-44 overflow-y-auto pr-1">
            {DEMO_QR_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleApplyPreset(preset)}
                className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-amber-400/30 text-left transition-all flex items-center space-x-2.5 group"
              >
                <span className="text-xl p-1.5 rounded-xl bg-black/40 border border-amber-300/40 group-hover:scale-110 transition-transform shrink-0">
                  {preset.icon}
                </span>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-amber-100 truncate">{preset.label}</p>
                  <p className="text-[10px] text-slate-300 truncate font-mono">{preset.assetId}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-2 border-t border-amber-400/20 flex items-center justify-between text-[11px] text-slate-400">
          <span>Swachh Bharat Mission AI • Society 360</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold text-white transition-colors"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}
