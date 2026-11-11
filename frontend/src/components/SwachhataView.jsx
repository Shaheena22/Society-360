import React, { useState } from 'react';
import {
  Bell, MapPin, Search, Calendar, Star, Plus, Home, FileText, User, Sparkles,
  CheckCircle2, ArrowRight, X, Clock, ShieldCheck, Heart, Trash2, Camera
} from 'lucide-react';

export default function SwachhataView({ language, speakText }) {
  const [activeModal, setActiveModal] = useState(null); // null | 'dump' | 'toilet' | 'rate' | 'event' | 'search'
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'events' | 'complaints' | 'profile'
  const [userRating, setUserRating] = useState(5);
  const [eventTitle, setEventTitle] = useState('Ward 12 Cleanliness & Tree Planting Yatra');

  return (
    <div className="max-w-md sm:max-w-xl mx-auto px-4 py-4 space-y-6 pb-28">
      
      {/* 1. TOP GREETING & GEOLOCATION HEADER (Matching Reference Screenshot) */}
      <div className="flex items-center justify-between bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
        <div className="space-y-0.5">
          <h2 className="text-xl font-black text-slate-900 flex items-center space-x-1">
            <span>Hello, Anita</span>
            <span className="text-lg">👋</span>
          </h2>
          <div className="flex items-center space-x-1 text-xs text-slate-500 font-semibold">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span>Vellore, Tamil Nadu - 632014 • (Kalaburagi ULB)</span>
          </div>
        </div>

        <button
          onClick={() => speakText('Notifications: Swachh Survekshan 2026 ward drive active.')}
          className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full border border-slate-200 relative transition-transform hover:scale-105"
        >
          <Bell className="w-4 h-4 text-slate-800" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-600 animate-ping"></span>
        </button>
      </div>

      {/* 2. HERO TEAL GRAPHIC CARD: "Spot a Garbage Dump?" (Matching Reference Screenshot) */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[rgb(13,92,117)] via-[rgb(15,108,138)] to-[rgb(11,79,101)] text-white p-6 shadow-xl overflow-hidden group">
        <div className="relative z-10 max-w-[65%] space-y-3">
          <h3 className="text-xl font-black leading-tight">
            Spot a garbage dump?
          </h3>
          <p className="text-xs text-cyan-100 font-medium">
            Make complaint now to alert Sanitary Inspector.
          </p>

          <button
            onClick={() => setActiveModal('dump')}
            className="px-4 py-2.5 bg-white text-[rgb(13,92,117)] font-black text-xs rounded-xl shadow-lg hover:bg-cyan-50 transition-all flex items-center space-x-1.5"
          >
            <span>Make complaint now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* High Quality Graphic Illustration Image */}
        <div className="absolute right-2 bottom-0 w-36 h-36 opacity-95 group-hover:scale-105 transition-transform">
          <img
            src="https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=500&auto=format&fit=crop&q=80"
            alt="Garbage dump graphic"
            className="w-full h-full object-cover rounded-2xl border-2 border-white/30 shadow-2xl"
          />
        </div>
      </div>

      {/* 3. SECTION 1: "For everytime you are out" 2-COLUMN GRID (Matching Reference Screenshot) */}
      <div className="space-y-3">
        <h3 className="text-xs font-black text-slate-600 uppercase tracking-wider">
          For everytime you are out
        </h3>

        <div className="grid grid-cols-2 gap-4">
          
          {/* Card A: Find Washroom */}
          <button
            onClick={() => setActiveModal('toilet')}
            className="rounded-3xl bg-[rgb(2,119,189)] hover:bg-[rgb(2,100,160)] text-white p-5 text-left shadow-lg space-y-4 flex flex-col justify-between transition-transform hover:-translate-y-1 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md">
              <span className="text-2xl">🚻</span>
            </div>

            <div>
              <h4 className="text-sm font-black leading-snug">Find washroom</h4>
              <p className="text-[11px] text-cyan-100 font-semibold mt-0.5">SBM Toilet Locator</p>
            </div>
          </button>

          {/* Card B: Rate Washroom */}
          <button
            onClick={() => setActiveModal('rate')}
            className="rounded-3xl bg-[rgb(2,119,189)] hover:bg-[rgb(2,100,160)] text-white p-5 text-left shadow-lg space-y-4 flex flex-col justify-between transition-transform hover:-translate-y-1 group"
          >
            <div className="flex items-center space-x-1 text-amber-300">
              <Star className="w-6 h-6 fill-amber-300" />
              <Star className="w-6 h-6 fill-amber-300" />
              <Star className="w-6 h-6 fill-amber-300" />
            </div>

            <div>
              <h4 className="text-sm font-black leading-snug">Rate washroom</h4>
              <p className="text-[11px] text-cyan-100 font-semibold mt-0.5">Hygiene Feedback</p>
            </div>
          </button>

        </div>
      </div>

      {/* 4. SECTION 2: "More ways to use Swachh" (Matching Reference Screenshot) */}
      <div className="space-y-3">
        <h3 className="text-xs font-black text-slate-600 uppercase tracking-wider">
          More ways to use Swachh
        </h3>

        <div className="grid grid-cols-2 gap-4">
          
          {/* Card A: Organise an Event */}
          <button
            onClick={() => setActiveModal('event')}
            className="rounded-3xl bg-[rgb(26,54,110)] hover:bg-[rgb(20,42,86)] text-white p-5 text-left shadow-lg space-y-4 flex flex-col justify-between transition-transform hover:-translate-y-1 group"
          >
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-cyan-300" />
              </div>
              <span className="text-[10px] font-bold bg-cyan-400 text-slate-950 px-2 py-0.5 rounded-full">
                Register
              </span>
            </div>

            <div>
              <h4 className="text-sm font-black leading-snug">Organise an event</h4>
              <p className="text-[11px] text-slate-300 font-medium mt-0.5">Cleanliness Drives</p>
            </div>
          </button>

          {/* Card B: Check Issues Around You */}
          <button
            onClick={() => setActiveModal('search')}
            className="rounded-3xl bg-[rgb(26,54,110)] hover:bg-[rgb(20,42,86)] text-white p-5 text-left shadow-lg space-y-4 flex flex-col justify-between transition-transform hover:-translate-y-1 group"
          >
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
                <Search className="w-5 h-5 text-amber-300" />
              </div>
              <span className="text-[10px] font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full">
                Search now
              </span>
            </div>

            <div>
              <h4 className="text-sm font-black leading-snug">Check issues around you</h4>
              <p className="text-[11px] text-slate-300 font-medium mt-0.5">Ward Map Search</p>
            </div>
          </button>

        </div>
      </div>

      {/* 5. BOTTOM GRAPHIC BANNER: "Your pilgrimage matters to us" (Matching Reference Screenshot) */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[rgb(16,84,110)] to-[rgb(8,45,60)] text-white p-5 shadow-lg flex items-center justify-between overflow-hidden">
        <div className="space-y-2 z-10 max-w-[65%]">
          <h4 className="text-sm font-black leading-snug">
            Your pilgrimage & yatra sanitation matters to us
          </h4>
          <button
            onClick={() => speakText('Pilgrimage & Festival Sanitation feedback registered.')}
            className="text-xs font-bold text-cyan-300 underline hover:text-white"
          >
            Give us your feedback →
          </button>
        </div>

        <div className="w-24 h-16 rounded-xl overflow-hidden border border-white/20 shadow-md">
          <img
            src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&auto=format&fit=crop&q=80"
            alt="Pilgrimage transport"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. FLOATING BOTTOM MOBILE NAVIGATION BAR (Matching Reference Screenshot) */}
      {/* ========================================================================= */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[92%] max-w-md bg-gradient-to-r from-[rgb(235,94,85)] to-[rgb(220,70,60)] text-white rounded-full p-2 shadow-2xl z-50 flex items-center justify-around border border-white/20">
        
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center text-[10px] font-bold transition-all ${
            activeTab === 'home' ? 'opacity-100 scale-110' : 'opacity-70 hover:opacity-100'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setActiveTab('events')}
          className={`flex flex-col items-center justify-center text-[10px] font-bold transition-all ${
            activeTab === 'events' ? 'opacity-100 scale-110' : 'opacity-70 hover:opacity-100'
          }`}
        >
          <Calendar className="w-5 h-5 mb-0.5" />
          <span>Events</span>
        </button>

        {/* Central Prominent Plus Button */}
        <button
          onClick={() => setActiveModal('dump')}
          className="w-12 h-12 rounded-full bg-white text-[rgb(235,94,85)] shadow-xl flex items-center justify-center transform -translate-y-2 hover:scale-110 transition-transform font-black border-2 border-[rgb(235,94,85)]"
        >
          <Plus className="w-7 h-7" />
        </button>

        <button
          onClick={() => setActiveTab('complaints')}
          className={`flex flex-col items-center justify-center text-[10px] font-bold transition-all ${
            activeTab === 'complaints' ? 'opacity-100 scale-110' : 'opacity-70 hover:opacity-100'
          }`}
        >
          <FileText className="w-5 h-5 mb-0.5" />
          <span>Complaints</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center justify-center text-[10px] font-bold transition-all ${
            activeTab === 'profile' ? 'opacity-100 scale-110' : 'opacity-70 hover:opacity-100'
          }`}
        >
          <User className="w-5 h-5 mb-0.5" />
          <span>Profile</span>
        </button>

      </div>

      {/* ========================================================================= */}
      {/* MODAL DIALOGS */}
      {/* ========================================================================= */}
      {activeModal === 'dump' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">Spot a Garbage Dump?</h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 font-bold p-1"><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-slate-600 font-medium">Attach photo evidence & GPS location to alert Ward Sanitary Inspector immediately.</p>
              
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <label className="font-bold text-slate-800 block">Take / Upload Photo</label>
                <input type="file" accept="image/*" className="block w-full text-xs text-slate-500 cursor-pointer" />
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <p className="font-bold text-slate-800">📍 Geo Location</p>
                <p className="text-slate-500 font-medium">Vellore / Kalaburagi ULB (Auto GPS Tagged)</p>
              </div>
            </div>

            <button
              onClick={() => {
                setActiveModal(null);
                speakText('Garbage dump complaint submitted! Dispatched to Ward Sanitary Inspector with 4-hour SLA.');
              }}
              className="w-full py-3 bg-[rgb(13,92,117)] hover:opacity-95 text-white font-black text-xs rounded-xl shadow-lg"
            >
              Submit Complaint Now
            </button>
          </div>
        </div>
      )}

      {activeModal === 'toilet' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl border border-slate-200 text-xs">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">Nearby SBM Washrooms</h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 font-bold"><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-2">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <p className="font-bold text-slate-900">🚻 SBM Public Toilet — Main Market (350m)</p>
                <p className="text-slate-500">24/7 Water • Divyang Accessible • Rating 4.6⭐</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <p className="font-bold text-slate-900">🚻 SBM Smart Complex — Bus Stand (800m)</p>
                <p className="text-slate-500">Sanitary Pad Dispenser • Solar Powered • Rating 4.8⭐</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'rate' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl border border-slate-200 text-center">
            <h3 className="text-base font-black text-slate-900">Rate Washroom Hygiene</h3>
            <p className="text-xs text-slate-600 font-medium">Rate cleanliness for SBM Public Washroom:</p>

            <div className="flex justify-center space-x-2 py-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => setUserRating(star)} className="p-1">
                  <Star className={`w-8 h-8 ${star <= userRating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`} />
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setActiveModal(null);
                speakText(`Thank you for rating washroom hygiene ${userRating} stars.`);
              }}
              className="w-full py-3 bg-[rgb(2,119,189)] text-white font-black text-xs rounded-xl shadow-lg"
            >
              Submit Washroom Rating
            </button>
          </div>
        </div>
      )}

      {activeModal === 'event' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl border border-slate-200 text-xs">
            <h3 className="text-base font-black text-slate-900">Organise Cleanliness Event / Yatra</h3>
            
            <input
              type="text"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-medium"
            />

            <button
              onClick={() => {
                setActiveModal(null);
                speakText('Cleanliness drive event registered successfully.');
              }}
              className="w-full py-3 bg-[rgb(26,54,110)] text-white font-black text-xs rounded-xl shadow-lg"
            >
              Register Event
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
