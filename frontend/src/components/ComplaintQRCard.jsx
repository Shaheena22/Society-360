import React, { useState, useEffect } from 'react';
import { QrCode, Download, Share2, Printer, CheckCircle2, ShieldCheck } from 'lucide-react';
import { generateQRCodeDataURL } from '../services/qrService';
import { t, translateCategory } from '../services/translations';

export default function ComplaintQRCard({ complaint, language = 'English', speakText }) {
  const [qrDataUrl, setQrDataUrl] = useState('');

  useEffect(() => {
    if (complaint) {
      const payload = `CIVIC_TRACK|${complaint.id || 'CMP-10492'}`;
      generateQRCodeDataURL(payload, { width: 300 }).then((url) => {
        if (url) setQrDataUrl(url);
      });
    }
  }, [complaint]);

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `Society360_Receipt_${complaint?.id || 'Grievance'}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    if (speakText) speakText('Digital QR receipt downloaded.');
  };

  const handlePrint = () => {
    window.print();
  };

  if (!complaint) return null;

  return (
    <div className="ethnic-card p-5 rounded-3xl border-2 border-amber-400 bg-gradient-to-br from-amber-50 via-white to-orange-50 space-y-4 shadow-lg gold-glow font-outfit max-w-md mx-auto">
      
      {/* Header Badge */}
      <div className="flex items-center justify-between border-b border-amber-200 pb-2.5">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
            🏛️
          </div>
          <div>
            <h4 className="text-xs font-black font-cinzel text-amber-950">Official Grievance QR Receipt</h4>
            <p className="text-[10px] text-amber-800 font-bold">Society 360 • Kalaburagi Smart City</p>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-bold uppercase flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-emerald-600" />
          <span>Verified</span>
        </span>
      </div>

      {/* QR Code Graphic & Ticket Info */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 bg-white p-4 rounded-2xl border border-amber-200 shadow-inner">
        {qrDataUrl ? (
          <img
            src={qrDataUrl}
            alt="Complaint QR Code"
            className="w-32 h-32 rounded-xl border-2 border-amber-300 shadow-md p-1 bg-white"
          />
        ) : (
          <div className="w-32 h-32 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-300">
            <QrCode className="w-10 h-10 animate-pulse" />
          </div>
        )}

        <div className="space-y-1 text-center sm:text-left">
          <p className="text-[10px] text-slate-500 font-bold uppercase">Tracking ID</p>
          <p className="text-base font-black font-mono text-amber-950 tracking-wider">{complaint.id || 'CMP-10492'}</p>
          
          <p className="text-[10px] text-slate-500 font-bold uppercase pt-1">Grievance Category</p>
          <p className="text-xs font-bold text-slate-800 line-clamp-1">
            {translateCategory({ name: complaint.category, id: complaint.category }, language)}
          </p>

          <p className="text-[10px] text-slate-500 font-bold uppercase pt-1">Location</p>
          <p className="text-[11px] font-medium text-slate-700 line-clamp-1">
            📍 {complaint.location?.address || 'Kalaburagi Ward 12'}
          </p>
        </div>
      </div>

      {/* Action Buttons: Download & Print */}
      <div className="flex items-center space-x-2 pt-1">
        <button
          type="button"
          onClick={handleDownload}
          className="flex-1 py-2 bg-gradient-to-r from-amber-700 to-orange-600 hover:opacity-95 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 shadow-sm border border-amber-400"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download Receipt</span>
        </button>

        <button
          type="button"
          onClick={handlePrint}
          className="px-3.5 py-2 bg-white hover:bg-amber-50 text-amber-950 rounded-xl text-xs font-bold border border-amber-300 flex items-center space-x-1 shadow-xs"
        >
          <Printer className="w-3.5 h-3.5 text-amber-700" />
          <span>Print</span>
        </button>
      </div>

      <p className="text-[10px] text-center text-slate-500 font-medium">
        Scan this QR code with any mobile camera or Society 360 scanner to track live resolution progress.
      </p>

    </div>
  );
}
