import React, { useState, useEffect } from 'react';
import {
  Sparkles, ThumbsUp, MessageSquare, Star, CheckCircle2,
  Building2, Send, Filter, AlertCircle, Heart, Award,
  Lightbulb, Check, ChevronRight, User, Mail
} from 'lucide-react';
import { t } from '../services/translations';

const INITIAL_SUGGESTIONS = [
  {
    id: 'SUG-101',
    author: 'Sunil Patil',
    role: 'Ward 12 Resident',
    title: 'Install Solar LED High-Mast Lighting at University Crossroad',
    type: 'Civic Suggestion',
    department: 'Street Lighting & Electricity (HESCOM)',
    rating: 4,
    description: 'The three-way intersection outside the university campus experiences dense evening traffic with poor visibility. Installing a solar-powered 16m high-mast fixture will curb nighttime accidents and reduce municipal grid power draw.',
    upvotes: 42,
    status: 'Planned for Next Budget',
    officialReply: 'Proposal approved in Zonal Infrastructure Committee meeting. Tender scheduled for next quarterly ward grant.',
    date: '2026-03-02'
  },
  {
    id: 'SUG-102',
    author: 'Kavita Rao',
    role: 'Local Teacher',
    title: 'Bi-Weekly Segregated E-Waste & Plastic Drop-Off Drive',
    type: 'Ward Improvement Idea',
    department: 'Sanitation & Solid Waste Cell',
    rating: 5,
    description: 'Residents often discard broken electronics and lithium batteries in regular trash bins. We propose establishing a mobile e-waste collection van visiting wards on alternating weekends with small reward credits for youth.',
    upvotes: 68,
    status: 'In Implementation',
    officialReply: 'Pilot van launched in Wards 10, 11, and 12 in collaboration with Pollution Control Board.',
    date: '2026-02-28'
  },
  {
    id: 'SUG-103',
    author: 'Dr. Anand Joshi',
    role: 'Resident Physician',
    title: 'Pedestrian Zebra Crossing & Speed Table at General Hospital Gate',
    type: 'Civic Suggestion',
    department: 'Roads & Civil Works (PWD)',
    rating: 3,
    description: 'Elderly patients and ambulances face severe delays crossing the 4-lane avenue outside the hospital. A raised speed table and high-visibility thermo-plastic zebra striping will ensure pedestrian safety.',
    upvotes: 95,
    status: 'Implemented',
    officialReply: 'Civil works completed on Feb 25, 2026. Raised tabletop ramp installed with reflective cat-eyes.',
    date: '2026-02-20'
  }
];

export default function FeedbackSuggestionsPage({ currentUser, language = 'English' }) {
  const [suggestions, setSuggestions] = useState(() => {
    const saved = localStorage.getItem('civic_suggestions_cache');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_SUGGESTIONS;
  });

  const [filterType, setFilterType] = useState('ALL');
  
  // Submission Form State
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Civic Suggestion');
  const [department, setDepartment] = useState('Roads & Civil Works (PWD)');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(5);
  const [authorName, setAuthorName] = useState(currentUser?.name || 'Anita Deshmukh');
  const [authorEmail, setAuthorEmail] = useState(currentUser?.email || 'anita.d@gmail.com');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);
  const [userUpvoted, setUserUpvoted] = useState(new Set());

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('civic_suggestions_cache', JSON.stringify(suggestions));
  }, [suggestions]);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleUpvote = (id) => {
    const nextSet = new Set(userUpvoted);
    const hasUpvoted = nextSet.has(id);

    setSuggestions(prev => prev.map(s => {
      if (s.id === id) {
        return { ...s, upvotes: s.upvotes + (hasUpvoted ? -1 : 1) };
      }
      return s;
    }));

    if (hasUpvoted) {
      nextSet.delete(id);
      showToast('Upvote removed.');
    } else {
      nextSet.add(id);
      showToast('Thank you! Your endorsement helps civic engineers prioritize this idea.');
    }
    setUserUpvoted(nextSet);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Please fill out both the title and detailed description.');
      return;
    }

    setIsSubmitting(true);
    const newSug = {
      id: `SUG-${Math.floor(100 + Math.random() * 900)}`,
      author: authorName.trim() || 'Civic Citizen',
      role: `Resident (${currentUser?.district || 'Kalaburagi'})`,
      title: title.trim(),
      type,
      department,
      rating,
      description: description.trim(),
      upvotes: 1,
      status: 'Under Review',
      officialReply: 'Your idea has been logged into the Municipal Idea Registry. Review scheduled in next Citizen Advisory Council.',
      date: new Date().toISOString().split('T')[0]
    };

    setTimeout(() => {
      setSuggestions([newSug, ...suggestions]);
      setTitle('');
      setDescription('');
      setIsSubmitting(false);
      showToast('Your suggestion was submitted successfully to municipal authorities!');
    }, 400);
  };

  const filteredList = suggestions.filter(s => {
    if (filterType === 'ALL') return true;
    return s.type === filterType;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 font-outfit">
      
      {/* Toast */}
      {toastMsg && (
        <div className="fixed top-20 right-4 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-amber-400 flex items-center space-x-3 text-xs font-semibold animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-orange-800 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-amber-500/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-200 border border-amber-300/30 text-xs font-bold mb-3">
              <Lightbulb className="w-3.5 h-3.5 text-amber-300" />
              <span>{t('feed_tag_governance', language)}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-cinzel tracking-tight text-white">
              {t('feed_header_title', language)}
            </h1>
            <p className="text-sm text-amber-100/80 mt-1 max-w-2xl font-normal">
              {t('feed_header_sub', language)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Submit New Suggestion / Feedback Form */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center space-x-2 pb-4 border-b border-slate-100">
            <div className="w-9 h-9 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              💡
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-cinzel">{t('feed_form_title', language)}</h2>
              <p className="text-xs text-slate-500">{t('feed_form_sub', language)}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            {/* Type */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">{t('feed_category_label', language)}</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-amber-500"
              >
                <option value="Civic Suggestion">Civic Suggestion / Innovation</option>
                <option value="Ward Improvement Idea">Ward Improvement Proposal</option>
                <option value="Amenity Feedback">Civic Amenity Feedback</option>
                <option value="App Usability">App & Portal Usability</option>
                <option value="Commendation">Commendation / Officer Praise</option>
              </select>
            </div>

            {/* Department */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">{t('feed_dept_label', language)}</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-amber-500"
              >
                <option value="Roads & Civil Works (PWD)">Roads & Civil Works (PWD)</option>
                <option value="Water Supply & Sewerage (KUWSDB)">Water Supply & Sewerage (KUWSDB)</option>
                <option value="Street Lighting & Electricity (HESCOM)">Street Lighting & Electricity (HESCOM)</option>
                <option value="Sanitation & Solid Waste Cell">Sanitation & Solid Waste Cell</option>
                <option value="Health & Medical Services">Health & Medical Services</option>
                <option value="Parks, Gardens & Environment">Parks, Gardens & Environment</option>
                <option value="Urban Transport & Traffic">Urban Transport & Traffic</option>
                <option value="General Municipal Administration">General Municipal Administration</option>
              </select>
            </div>

            {/* Title */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {t('feed_proposal_title', language)} <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Install rainwater recharge pits near Market Ground..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            {/* Service Rating */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">{t('feed_rating_label', language)}</label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        star <= rating
                          ? 'text-amber-500 fill-amber-500'
                          : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs text-slate-500 font-bold ml-2">
                  {rating === 5 ? 'Excellent' : rating === 4 ? 'Good' : rating === 3 ? 'Average' : 'Needs Improvement'}
                </span>
              </div>
            </div>

            {/* Detailed Description */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {t('feed_details_label', language)} <span className="text-rose-600">*</span>
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detail the issue, your proposed civic solution, the beneficiaries, and estimated location..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            {/* Prefilled Citizen Info */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">{t('feed_your_name', language)}</label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">{t('feed_your_email', language)}</label>
                <input
                  type="email"
                  value={authorEmail}
                  onChange={(e) => setAuthorEmail(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center space-x-2 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{t('feed_submit_btn', language)}</span>
            </button>
          </form>
        </div>

        {/* Right Column: Community Suggestions & Status Board */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
            <div>
              <h2 className="text-sm font-bold text-slate-900 font-cinzel">{t('feed_community_title', language)}</h2>
              <p className="text-xs text-slate-500">{t('feed_community_sub', language)}</p>
            </div>

            {/* Category Filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-700"
            >
              <option value="ALL">{t('feed_all_categories', language)}</option>
              <option value="Civic Suggestion">Civic Suggestions</option>
              <option value="Ward Improvement Idea">Ward Improvement</option>
              <option value="Amenity Feedback">Amenity Feedback</option>
            </select>
          </div>

          {/* Cards */}
          <div className="space-y-4">
            {filteredList.map((sug) => {
              const hasUpvoted = userUpvoted.has(sug.id);

              return (
                <div
                  key={sug.id}
                  className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3.5 transition-all hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                          {sug.id}
                        </span>
                        <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                          {sug.type}
                        </span>
                        <div className="flex items-center text-amber-500">
                          {Array.from({ length: sug.rating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-500" />
                          ))}
                        </div>
                      </div>

                      <h3 className="text-sm font-bold text-slate-900 mt-1.5">
                        {sug.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 font-medium">
                        Target Dept: {sug.department} • Proposed by {sug.author} ({sug.role})
                      </p>
                    </div>

                    {/* Status Badge */}
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold shrink-0 ${
                      sug.status === 'Implemented'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : sug.status === 'In Implementation'
                        ? 'bg-blue-100 text-blue-800 border border-blue-200'
                        : sug.status === 'Planned for Next Budget'
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : 'bg-purple-100 text-purple-800 border border-purple-200'
                    }`}>
                      {sug.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    {sug.description}
                  </p>

                  {/* Official Response Box */}
                  {sug.officialReply && (
                    <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-2xl text-xs space-y-1">
                      <p className="font-bold text-amber-950 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-amber-700" />
                        <span>Municipal Board Review Note:</span>
                      </p>
                      <p className="text-slate-700 font-normal pl-5">
                        {sug.officialReply}
                      </p>
                    </div>
                  )}

                  {/* Footer: Date & Upvote Action */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 text-[11px]">
                      Submitted on {sug.date}
                    </span>

                    <button
                      onClick={() => handleUpvote(sug.id)}
                      className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                        hasUpvoted
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                      title="Endorse this proposal to push it to the Commissioner's desk"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{sug.upvotes} Citizens Supported</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>

    </div>
  );
}
