/**
 * Society 360 - Voice Assistant Engine
 * Unified Multilingual Speech-to-Text (STT) and Text-to-Speech (TTS) Service
 */

import { ALL_LANGUAGES, LANGUAGE_TO_VOICE_CODE as MASTER_VOICE_MAP } from '../data/languages';

// Supported Languages Map for Voice Assistant (All 22 Official + Regional Languages)
export const VOICE_LANGUAGES = ALL_LANGUAGES.map(l => ({
  code: l.voiceCode,
  langName: l.code,
  label: `${l.native} (${l.english})`,
  native: l.native,
  english: l.english,
  icon: l.icon || '🎙️'
}));

export const LANGUAGE_TO_VOICE_CODE = MASTER_VOICE_MAP;

export function getVoiceLangCode(languageName) {
  return LANGUAGE_TO_VOICE_CODE[languageName] || 'en-IN';
}

// Active Speech Synthesis State
let activeUtterance = null;
let activeRecognition = null;

/**
 * =========================================================================
 * 1. TEXT-TO-SPEECH (TTS) ENGINE
 * =========================================================================
 */
export function speakText(text, options = {}) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech Synthesis API is not supported in this browser.');
    return;
  }

  const {
    lang = 'en-IN',
    rate = 1.0,
    pitch = 1.0,
    volume = 1.0,
    onStart,
    onEnd,
    onError
  } = options;

  // Stop any ongoing speech
  window.speechSynthesis.cancel();

  if (!text || text.trim() === '') return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = rate;
  utterance.pitch = pitch;
  utterance.volume = volume;

  // Find best matching voice for language
  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find(v => v.lang === lang || v.lang.startsWith(lang.split('-')[0]));
  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  if (onStart) utterance.onstart = onStart;
  if (onEnd) utterance.onend = onEnd;
  if (onError) utterance.onerror = onError;

  activeUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    activeUtterance = null;
  }
}

export function pauseSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.pause();
  }
}

export function resumeSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.resume();
  }
}

export function isSpeaking() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.speaking;
}

/**
 * =========================================================================
 * 2. SPEECH-TO-TEXT (STT) ENGINE
 * =========================================================================
 */
export function isSpeechRecognitionSupported() {
  if (typeof window === 'undefined') return false;
  return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
}

export function startSpeechToText(options = {}) {
  const {
    lang = 'en-IN',
    continuous = false,
    interimResults = true,
    onStart,
    onResult,
    onInterim,
    onError,
    onEnd
  } = options;

  const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognitionClass) {
    if (onError) onError(new Error('Speech recognition not supported in this browser.'));
    return null;
  }

  // Stop any active session
  stopSpeechToText();

  try {
    const recognition = new SpeechRecognitionClass();
    recognition.lang = lang;
    recognition.continuous = continuous;
    recognition.interimResults = interimResults;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      if (onStart) onStart();
    };

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      if (finalTranscript && onResult) {
        onResult(finalTranscript.trim());
      }
      if (interimTranscript && onInterim) {
        onInterim(interimTranscript.trim());
      }
    };

    recognition.onerror = (event) => {
      console.warn('Speech recognition error:', event.error);
      if (onError) onError(event);
    };

    recognition.onend = () => {
      activeRecognition = null;
      if (onEnd) onEnd();
    };

    recognition.start();
    activeRecognition = recognition;
    return recognition;
  } catch (err) {
    console.error('Failed to start speech recognition:', err);
    if (onError) onError(err);
    return null;
  }
}

export function stopSpeechToText() {
  if (activeRecognition) {
    try {
      activeRecognition.stop();
    } catch (e) {
      console.warn('Error stopping recognition:', e);
    }
    activeRecognition = null;
  }
}

/**
 * =========================================================================
 * 3. AI VOICE QUERY PARSER & CLASSIFIER
 * Analyzes spoken text and extracts: domain, category, urgency, and summary
 * =========================================================================
 */
export function parseVoiceComplaint(transcript) {
  if (!transcript || typeof transcript !== 'string') {
    return {
      domain: 'civic',
      category: 'garbage_accumulation',
      urgency: 'Medium',
      summary: ''
    };
  }

  const lower = transcript.toLowerCase();

  // Keyword rules
  if (lower.includes('fire') || lower.includes('smoke') || lower.includes('burning building') || lower.includes('blaze')) {
    return { domain: 'emergency', category: 'emergency_fire', urgency: 'Critical', summary: transcript };
  }
  if (lower.includes('accident') || lower.includes('crash') || lower.includes('collision') || lower.includes('injured')) {
    return { domain: 'emergency', category: 'emergency_accident', urgency: 'Critical', summary: transcript };
  }
  if (lower.includes('bribe') || lower.includes('money demanded') || lower.includes('corruption') || lower.includes('commission')) {
    return { domain: 'corruption', category: 'cat_corruption_bribery', urgency: 'High', summary: transcript };
  }
  if (lower.includes('water leak') || lower.includes('broken pipe') || lower.includes('no water') || lower.includes('drain') || lower.includes('sewer')) {
    return { domain: 'water', category: 'water_leakage', urgency: 'High', summary: transcript };
  }
  if (lower.includes('pothole') || lower.includes('road broken') || lower.includes('damaged road') || lower.includes('bridge')) {
    return { domain: 'roads', category: 'pothole', urgency: 'Medium', summary: transcript };
  }
  if (lower.includes('streetlight') || lower.includes('dark') || lower.includes('pole broken') || lower.includes('wire exposed') || lower.includes('power cut')) {
    return { domain: 'electricity', category: 'cat_electricity_streetlight_not_working', urgency: 'Medium', summary: transcript };
  }
  if (lower.includes('garbage') || lower.includes('trash') || lower.includes('waste') || lower.includes('clean') || lower.includes('dump')) {
    return { domain: 'civic', category: 'garbage_accumulation', urgency: 'Medium', summary: transcript };
  }
  if (lower.includes('hospital') || lower.includes('ambulance') || lower.includes('blood') || lower.includes('doctor') || lower.includes('medicine')) {
    return { domain: 'health', category: 'health_ambulance_assistance', urgency: 'High', summary: transcript };
  }
  if (lower.includes('tree cutting') || lower.includes('pollution') || lower.includes('smoke') || lower.includes('mining')) {
    return { domain: 'environment', category: 'env_illegal_tree_cutting', urgency: 'Medium', summary: transcript };
  }
  if (lower.includes('traffic') || lower.includes('parking') || lower.includes('bus') || lower.includes('signal')) {
    return { domain: 'traffic', category: 'traffic_illegal_parking', urgency: 'Low', summary: transcript };
  }
  if (lower.includes('hungry') || lower.includes('food') || lower.includes('homeless') || lower.includes('poverty') || lower.includes('ration')) {
    return { domain: 'poverty', category: 'poverty_hunger', urgency: 'High', summary: transcript };
  }
  if (lower.includes('animal') || lower.includes('dog') || lower.includes('cow') || lower.includes('injured animal') || lower.includes('stray')) {
    return { domain: 'animal', category: 'animal_injured_reporting', urgency: 'High', summary: transcript };
  }
  if (lower.includes('job') || lower.includes('unemployment') || lower.includes('skill') || lower.includes('scam')) {
    return { domain: 'unemployment', category: 'job_vacancy', urgency: 'Medium', summary: transcript };
  }

  return { domain: 'civic', category: 'garbage_accumulation', urgency: 'Medium', summary: transcript };
}
