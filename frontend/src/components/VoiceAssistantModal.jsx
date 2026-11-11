import React, { useState, useEffect, useRef } from 'react';
import {
  Mic, MicOff, Volume2, VolumeX, Pause, Play, Square,
  Sparkles, CheckCircle2, ArrowRight, X, Globe, Radio, RefreshCw
} from 'lucide-react';
import {
  VOICE_LANGUAGES,
  startSpeechToText,
  stopSpeechToText,
  speakText,
  stopSpeaking,
  pauseSpeaking,
  resumeSpeaking,
  isSpeaking,
  parseVoiceComplaint,
  isSpeechRecognitionSupported
} from '../services/voiceAssistant';

/**
 * Full-featured Speech-to-Text (STT) and Text-to-Speech (TTS) Voice Assistant Modal
 */
export function VoiceAssistantModal({
  isOpen,
  onClose,
  onApplyTranscription,
  initialLanguage = 'en-IN'
}) {
  const [selectedLang, setSelectedLang] = useState(initialLanguage);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimText, setInterimText] = useState('');
  const [isSpeakingBack, setIsSpeakingBack] = useState(false);
  const [aiClassification, setAiClassification] = useState(null);
  const [speechSpeed, setSpeechSpeed] = useState(1.0);
  const [supportWarning, setSupportWarning] = useState(null);

  const recognitionRef = useRef(null);

  useEffect(() => {
    if (initialLanguage) {
      setSelectedLang(initialLanguage);
    }
  }, [initialLanguage]);

  useEffect(() => {
    if (!isOpen) {
      handleStopAll();
    } else {
      if (!isSpeechRecognitionSupported()) {
        setSupportWarning('Your browser does not have native Web Speech Recognition enabled. You can use sample voice prompts or text input.');
      }
    }
  }, [isOpen]);

  const handleStartListening = () => {
    stopSpeaking();
    setIsSpeakingBack(false);
    setSupportWarning(null);

    const instance = startSpeechToText({
      lang: selectedLang,
      continuous: false,
      interimResults: true,
      onStart: () => {
        setIsListening(true);
      },
      onResult: (finalResult) => {
        setTranscript(finalResult);
        setInterimText('');
        setIsListening(false);
        const parsed = parseVoiceComplaint(finalResult);
        setAiClassification(parsed);
      },
      onInterim: (interim) => {
        setInterimText(interim);
      },
      onError: (err) => {
        console.warn('STT Error:', err);
        setIsListening(false);
        setSupportWarning('Microphone access was blocked or timed out. Please check browser permissions.');
      },
      onEnd: () => {
        setIsListening(false);
      }
    });

    recognitionRef.current = instance;
  };

  const handleStopListening = () => {
    stopSpeechToText();
    setIsListening(false);
  };

  const handleStopAll = () => {
    stopSpeechToText();
    stopSpeaking();
    setIsListening(false);
    setIsSpeakingBack(false);
  };

  const handleSpeakTranscript = () => {
    const textToSpeak = transcript || interimText;
    if (!textToSpeak) return;

    setIsSpeakingBack(true);
    speakText(textToSpeak, {
      lang: selectedLang,
      rate: speechSpeed,
      onStart: () => setIsSpeakingBack(true),
      onEnd: () => setIsSpeakingBack(false),
      onError: () => setIsSpeakingBack(false)
    });
  };

  const handleApply = () => {
    if (onApplyTranscription && (transcript || interimText)) {
      onApplyTranscription({
        text: transcript || interimText,
        aiData: aiClassification,
        lang: selectedLang
      });
    }
    handleClose();
  };

  const handleClose = () => {
    handleStopAll();
    onClose();
  };

  const loadSamplePrompt = (sampleText) => {
    setTranscript(sampleText);
    setInterimText('');
    const parsed = parseVoiceComplaint(sampleText);
    setAiClassification(parsed);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg bg-[#FAF8F5] rounded-3xl shadow-2xl border-2 border-amber-400 overflow-hidden font-outfit text-amber-950 space-y-4 p-5">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-200 pb-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-amber-700 to-orange-600 text-white shadow-md border border-amber-300">
              <Mic className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-black font-cinzel text-amber-950 flex items-center gap-1.5">
                <span>AI Voice Assistant & Speech Hub</span>
                <span className="text-[9px] uppercase px-1.5 py-0.2 rounded-md bg-amber-200 text-amber-900 font-bold border border-amber-300">
                  STT • TTS
                </span>
              </h3>
              <p className="text-[11px] text-amber-800/80 font-medium">
                Speak your complaint in any Indian language or listen to real-time audio playback
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-full hover:bg-amber-100 text-amber-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Language Switcher Pills */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-amber-900 flex items-center gap-1">
            <Globe className="w-3.5 h-3.5" />
            <span>Select Spoken Language:</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-1.5 max-h-36 sm:max-h-40 overflow-y-auto pr-1">
            {VOICE_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  setSelectedLang(lang.code);
                  if (isListening) handleStopListening();
                }}
                className={`py-1.5 px-2 rounded-xl text-[11px] font-bold transition-all border text-center ${
                  selectedLang === lang.code
                    ? 'bg-amber-700 text-white border-amber-800 shadow-sm'
                    : 'bg-white text-amber-950 border-amber-200 hover:bg-amber-100/60'
                }`}
                title={`${lang.native} (${lang.english})`}
              >
                <div>{lang.icon}</div>
                <div className="truncate text-[10px]" title={`${lang.native} (${lang.english})`}>
                  {lang.native} ({lang.english})
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Central Audio / Microphone Interaction Visualizer */}
        <div className="p-6 rounded-2xl bg-gradient-to-b from-amber-950 via-slate-900 to-amber-950 text-white text-center space-y-4 border-2 border-amber-400/80 shadow-inner relative overflow-hidden">
          
          {/* Animated Background Audio Waves when active */}
          {isListening && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
              <div className="w-40 h-40 rounded-full border-4 border-amber-400 animate-ping"></div>
              <div className="w-56 h-56 rounded-full border-2 border-orange-400 animate-pulse"></div>
            </div>
          )}

          <div className="relative z-10 flex flex-col items-center justify-center space-y-3">
            {/* Giant Mic Button */}
            <button
              type="button"
              onClick={isListening ? handleStopListening : handleStartListening}
              className={`w-20 h-20 rounded-full flex items-center justify-center text-white shadow-2xl transition-all border-4 ${
                isListening
                  ? 'bg-red-600 border-red-300 animate-bounce scale-105 shadow-red-500/50'
                  : 'bg-gradient-to-tr from-amber-600 to-orange-600 border-amber-300 hover:scale-105 shadow-amber-900/50'
              }`}
            >
              {isListening ? (
                <MicOff className="w-8 h-8" />
              ) : (
                <Mic className="w-8 h-8" />
              )}
            </button>

            <p className="text-xs font-bold text-amber-200">
              {isListening
                ? '🎙️ Listening... Speak clearly into your microphone'
                : 'Tap microphone to start speaking'}
            </p>
          </div>

          {/* Real-time Transcription Stream Display */}
          <div className="min-h-[60px] max-h-[100px] overflow-y-auto p-3 rounded-xl bg-black/40 border border-amber-400/30 text-left">
            <p className="text-xs font-medium leading-relaxed text-amber-100">
              {transcript || interimText || (
                <span className="text-white/40 italic">
                  Transcription will appear here in real-time as you speak...
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Warning Notification if speech recognition error */}
        {supportWarning && (
          <div className="p-2.5 rounded-xl bg-amber-100 border border-amber-300 text-[11px] text-amber-950 font-medium">
            ⚠️ {supportWarning}
          </div>
        )}

        {/* AI Intelligent Triage Pill (When Speech is Transcribed) */}
        {aiClassification && (
          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-300 text-emerald-950 text-xs font-bold space-y-1.5 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-emerald-900">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>AI Auto-Triage Detected:</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 text-[10px]">
                Priority: {aiClassification.urgency}
              </span>
            </div>
            <p className="text-[11px] text-emerald-800 font-medium">
              Domain: <span className="font-bold uppercase text-emerald-950">{aiClassification.domain}</span> • Category: <span className="font-bold text-emerald-950">{aiClassification.category}</span>
            </p>
          </div>
        )}

        {/* Text-to-Speech Controls Bar */}
        {(transcript || interimText) && (
          <div className="p-3 rounded-2xl bg-white border border-amber-200 flex items-center justify-between gap-2">
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={isSpeakingBack ? handleStopAll : handleSpeakTranscript}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
                  isSpeakingBack
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300'
                }`}
              >
                {isSpeakingBack ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{isSpeakingBack ? 'Stop Audio' : 'Listen (TTS)'}</span>
              </button>

              <select
                value={speechSpeed}
                onChange={(e) => setSpeechSpeed(parseFloat(e.target.value))}
                className="bg-amber-50 border border-amber-300 rounded-xl px-2 py-1 text-[11px] font-bold text-amber-950"
              >
                <option value={0.75}>0.75x Speed</option>
                <option value={1.0}>1.0x Normal</option>
                <option value={1.25}>1.25x Fast</option>
                <option value={1.5}>1.5x Rapid</option>
              </select>
            </div>

            <button
              type="button"
              onClick={handleApply}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-700 to-orange-700 hover:opacity-95 text-white font-bold text-xs shadow flex items-center space-x-1"
            >
              <span>Apply to Form</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Quick Sample Voice Prompts (Useful for rapid testing & demos) */}
        <div className="space-y-1.5 pt-1">
          <p className="text-[10px] text-amber-800 font-bold uppercase tracking-wider">
            Quick Voice Simulation Prompts:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {[
              'Broken streetlight and dark area at Ward 12 Main Road',
              'Large water leakage from underground pipe near hospital',
              'Severe building fire with smoke observed on 2nd floor',
              'Bribery demanded for land mutation document certificate'
            ].map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => loadSamplePrompt(sample)}
                className="text-[10px] font-semibold bg-white hover:bg-amber-100/70 border border-amber-200 px-2.5 py-1 rounded-xl text-amber-900 truncate max-w-full text-left"
              >
                💬 "{sample}"
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

/**
 * Floating Global Audio Bar Component
 * Displays whenever text is being read out loud.
 */
export function GlobalAudioPlayerBar({ onStop }) {
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpeaking(isSpeaking());
    }, 400);
    return () => clearInterval(interval);
  }, []);

  if (!speaking) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-slate-950/90 text-white px-4 py-2.5 rounded-2xl border-2 border-amber-400 shadow-2xl backdrop-blur-md flex items-center space-x-3 font-outfit text-xs animate-bounce">
      <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
      <span className="font-bold text-amber-300">Speaking Audio...</span>
      <button
        onClick={() => {
          stopSpeaking();
          if (onStop) onStop();
        }}
        className="p-1 rounded-lg bg-red-600 hover:bg-red-700 text-white"
        title="Stop Speech"
      >
        <Square className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
