import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  MessageSquare, X, Send, Mic, MicOff, Volume2, VolumeX, Sparkles,
  Bot, User, ArrowRight, ShieldCheck, MapPin, AlertTriangle, CheckCircle2,
  FileText, ExternalLink, RefreshCw, ThumbsUp, HeartPulse, Briefcase, Zap,
  HelpCircle, QrCode, Globe, ShieldAlert, Award
} from 'lucide-react';
import { api } from '../services/api';
import { speakText as assistantSpeak, getVoiceLangCode, VOICE_LANGUAGES } from '../services/voiceAssistant';

// Comprehensive 7-Language Localized Knowledge Base & Interface Dictionary
const LOCALIZED_CHATBOT_DATA = {
  English: {
    welcome: `Hello! 👋 I am **Sahayak AI**, your 24/7 Smart Civic Assistant for **Society 360**.\n\nHow may I help you today? You can:\n• Ask any question or doubt about using this application\n• Speak or type a civic problem to auto-file a grievance\n• Inquire about **QR codes**, **disputing false resolutions**, or **tracking tickets**\n• Discover **PMKVY job training**, **emergency blood**, or **Lokayukta whistleblower protection**.\n\nType **"Hi"** or click any quick suggestion pill below!`,
    placeholder: 'Type "Hi" or ask any question in English...',
    listening: 'Listening to speech in English...',
    onlineBadge: 'ONLINE',
    subHeader: 'Society 360 24/7 Civic Assistant',
    readyToFile: 'Ready to File:',
    instantFileBtn: '🚀 Instant 1-Click Lodge Ticket',
    statusFound: '🔍 Grievance Status Found for Ticket',
    communityUpvotes: 'Citizens Verified',
    slaTarget: 'SLA Target',
    assignedOfficer: 'Assigned Officer',
    statusLabel: 'Status',
    domainLabel: 'Domain',
    locationLabel: 'Location',
    thinking: 'Sahayak AI is thinking...',
    prompts: [
      { id: 'hi', label: '👋 Say Hi', text: 'Hi! How can you help me with Society 360?' },
      { id: 'how_to_report', label: '📝 How to Report Issue?', text: 'How do I lodge a civic complaint in this application?' },
      { id: 'confirm_btn', label: '👍 What is Confirm Button?', text: 'What is the Confirm / Upvote button and how does 1 -> 2 -> 3 work?' },
      { id: 'dispute_res', label: '🚨 Officer False Resolution?', text: 'What if an officer falsely marks my complaint as Resolved when it is not fixed?' },
      { id: 'qr_guide', label: '📷 How QR Codes Work?', text: 'How does the Smart City QR Code feature work in Society 360?' },
      { id: 'track_help', label: '🔍 Track Ticket Status', text: 'Track my complaint status for ticket #CMP-10492' }
    ]
  },
  Kannada: {
    welcome: `ನಮಸ್ಕಾರ! 🙏 ನಾನು **ಸಹಾಯಕ AI**, ನಿಮ್ಮ 24/7 **ಸೊಸೈಟಿ 360** ನಾಗರಿಕ ಆಡಳಿತ AI ಸಹಾಯಕ.\n\nನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?\n• ಅಪ್ಲಿಕೇಶನ್ ಬಳಕೆಯ ಬಗ್ಗೆ ಯಾವುದೇ ಸಂದೇಹಗಳನ್ನು ಕೇಳಿ\n• ಧ್ವನಿ ಅಥವಾ ಪಠ್ಯದ ಮೂಲಕ ರಸ್ತೆ, ನೀರು, ಕಸ, ವಿದ್ಯುತ್ ದೂರುಗಳನ್ನು ದಾಖಲಿಸಿ\n• **QR ಕೋಡ್ ಸ್ಕ್ಯಾನರ್**, **ಅಧಿಕಾರಿಗಳ ಸುಳ್ಳು ಪರಿಹಾರವನ್ನು ರಿಜೆಕ್ಟ್ ಮಾಡುವುದು (Dispute)**, ಅಥವಾ **ದೂರುಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡುವುದು**\n• **PMKVY ಉದ್ಯೋಗ ತರಬೇತಿ** ಮತ್ತು **ತುರ್ತು ರಕ್ತ ಸೇವೆಗಳು**.\n\nಕೆಳಗಿನ ಬಟನ್ ಕ್ಲಿಕ್ ಮಾಡಿ ಅಥವಾ ಪ್ರಶ್ನೆ ಕೇಳಿ!`,
    placeholder: 'ಕನ್ನಡದಲ್ಲಿ ನಿಮ್ಮ ಪ್ರಶ್ನೆ ಅಥವಾ ದೂರನ್ನು ಟೈಪ್ ಮಾಡಿ...',
    listening: 'ಕನ್ನಡದಲ್ಲಿ ಧ್ವನಿಯನ್ನು ಆಲಿಸಲಾಗುತ್ತಿದೆ...',
    onlineBadge: 'ಲೈವ್ ಸಕ್ರಿಯ',
    subHeader: 'ಸೊಸೈಟಿ 360 ನಾಗರಿಕ AI ಸಹಾಯಕ',
    readyToFile: 'ದೂರು ಸಲ್ಲಿಕೆಗೆ ಸಿದ್ಧ:',
    instantFileBtn: '🚀 1-ಕ್ಲಿಕ್‌ನಲ್ಲಿ ದೂರು ದಾಖಲಿಸಿ',
    statusFound: '🔍 ದೂರು ಟಿಕೆಟ್ ವಿವರಗಳು',
    communityUpvotes: 'ನಾಗರಿಕರು ದೃಢೀಕರಿಸಿದ್ದಾರೆ',
    slaTarget: 'SLA ಗುರಿ',
    assignedOfficer: 'ನಿಯೋಜಿತ ಅಧಿಕಾರಿ',
    statusLabel: 'ಪ್ರಸ್ತುತ ಸ್ಥಿತಿ',
    domainLabel: 'ಇಲಾಖೆ / ವಿಭಾಗ',
    locationLabel: 'ಸ್ಥಳ',
    thinking: 'ಸಹಾಯಕ AI ಯೋಚಿಸುತ್ತಿದೆ...',
    prompts: [
      { id: 'hi', label: '👋 ನಮಸ್ಕಾರ', text: 'ನಮಸ್ಕಾರ! ಸೊಸೈಟಿ 360 ಅಪ್ಲಿಕೇಶನ್‌ನಲ್ಲಿ ನೀವು ನನಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡುತ್ತೀರಿ?' },
      { id: 'how_to_report', label: '📝 ದೂರು ದಾಖಲಿಸುವುದು ಹೇಗೆ?', text: 'ಈ ಅಪ್ಲಿಕೇಶನ್‌ನಲ್ಲಿ ನಾಗರಿಕ ದೂರನ್ನು ದಾಖಲಿಸುವುದು ಹೇಗೆ?' },
      { id: 'confirm_btn', label: '👍 ಕನ್ಫರ್ಮ್ ಬಟನ್ ಎಂದರೇನು?', text: 'ದೃಢೀಕರಣ (Confirm) ಬಟನ್ ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ ಮತ್ತು 1 -> 2 -> 3 ಕೌಂಟರ್ ಎಂದರೇನು?' },
      { id: 'dispute_res', label: '🚨 ಸುಳ್ಳು ಪರಿಹಾರ ರಿಜೆಕ್ಟ್ ಮಾಡುವುದು?', text: 'ಅಧಿಕಾರಿಯು ಕೆಲಸ ಮಾಡದೆ Resolved ಎಂದು ಗುರುತಿಸಿದರೆ ನಾನು ಏನು ಮಾಡಬೇಕು?' },
      { id: 'qr_guide', label: '📷 QR ಕೋಡ್ ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ?', text: 'ಸ್ಮಾರ್ಟ್ ಸಿಟಿ QR ಕೋಡ್ ವೈಶಿಷ್ಟ್ಯವು ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ?' },
      { id: 'track_help', label: '🔍 ದೂರು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ', text: 'ನನ್ನ ದೂರು #CMP-10492 ನ ಪ್ರಸ್ತುತ ಸ್ಥಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ' }
    ]
  },
  Hindi: {
    welcome: `नमस्ते! 🙏 मैं **सहायक AI** हूँ, **सोसायटी 360** का 24/7 स्मार्ट नागरिक AI सहायक।\n\nमैं आज आपकी क्या सहायता कर सकता हूँ?\n• इस एप्लिकेशन के उपयोग से जुड़े किसी भी सवाल या संदेह का समाधान\n• बोलकर या लिखकर गड्ढे, बिजली, पानी, या कचरे की समस्या दर्ज करें\n• **QR कोड स्कैनर**, **अधिकारी द्वारा फर्जी समाधान को री-ओपन करना**, या **टिकट ट्रैक करना**\n• **PMKVY नौकरी प्रशिक्षण** और **आपातकालीन रक्त सेवा**।\n\nनीचे दिए गए सुझाव पर क्लिक करें या अपना सवाल पूछें!`,
    placeholder: 'हिन्दी में अपना सवाल या शिकायत लिखें...',
    listening: 'हिन्दी में आवाज रिकॉर्ड की जा रही है...',
    onlineBadge: 'ऑनलाइन',
    subHeader: 'सोसायटी 360 नागरिक AI सहायक',
    readyToFile: 'शिकायत दर्ज करने हेतु तैयार:',
    instantFileBtn: '🚀 1-क्लिक में शिकायत दर्ज करें',
    statusFound: '🔍 शिकायत की वर्तमान स्थिति',
    communityUpvotes: 'नागरिकों द्वारा सत्यापित',
    slaTarget: 'SLA समय सीमा',
    assignedOfficer: 'प्रभारी अधिकारी',
    statusLabel: 'स्थिति',
    domainLabel: 'विभाग',
    locationLabel: 'स्थान',
    thinking: 'सहायक AI सोच रहा है...',
    prompts: [
      { id: 'hi', label: '👋 नमस्ते', text: 'नमस्ते! सोसायटी 360 एप्लिकेशन में आप मेरी क्या सहायता कर सकते हैं?' },
      { id: 'how_to_report', label: '📝 शिकायत कैसे दर्ज करें?', text: 'इस एप्लिकेशन में नागरिक शिकायत कैसे दर्ज करें?' },
      { id: 'confirm_btn', label: '👍 कन्फर्म बटन क्या है?', text: 'कन्फर्म (Confirm) बटन कैसे काम करता है और 1 -> 2 -> 3 काउंटर क्या है?' },
      { id: 'dispute_res', label: '🚨 फर्जी समाधान को री-ओपन करना?', text: 'अगर अधिकारी बिना काम किए Resolved मार्क कर दे तो क्या करें?' },
      { id: 'qr_guide', label: '📷 QR कोड कैसे काम करता है?', text: 'स्मार्ट सिटी QR कोड सुविधा कैसे काम करती है?' },
      { id: 'track_help', label: '🔍 शिकायत ट्रैक करें', text: 'मेरी शिकायत संख्या #CMP-10492 की स्थिति बताएं' }
    ]
  },
  Telugu: {
    welcome: `నమస్కారం! 🙏 నేను **సహాయక్ AI**, **సొసైటీ 360** 24/7 పౌర AI సహాయకుడిని.\n\nనేను మీకు ఎలా సహాయపడగలను?\n• అప్లికేషన్ ఉపయోగం గురించి ఏవైనా సందేహాలు అడగండి\n• రోడ్లు, విద్యుత్, తాగునీరు, పారిశుద్ధ్యం సమస్యలను వాయిస్ లేదా టెక్స్ట్ ద్వారా నివేదించండి\n• **QR కోడ్ స్కానర్**, **తప్పుడు పరిష్కారాన్ని రీ-ఓపెన్ చేయడం**, లేదా **ఫిర్యాదులను ట్రాక్ చేయడం**\n• **PMKVY ఉపాధి శిక్షణ** మరియు **అత్యవసర రక్త సహాయం**.\n\nక్రింది బటన్ క్లిక్ చేయండి లేదా ప్రశ్న అడగండి!`,
    placeholder: 'తెలుగులో మీ ప్రశ్న లేదా సమస్యను టైప్ చేయండి...',
    listening: 'తెలుగులో మాట్లాడుతున్నారు...',
    onlineBadge: 'ఆన్‌లైన్',
    subHeader: 'సొసైటీ 360 పౌర AI సహాయకుడు',
    readyToFile: 'ఫిర్యాదు దాఖలుకు సిద్ధంగా ఉంది:',
    instantFileBtn: '🚀 1-క్లిక్‌తో ఫిర్యాదు చేయండి',
    statusFound: '🔍 ఫిర్యాదు వివరాలు',
    communityUpvotes: 'పౌరులు ధృవీకరించారు',
    slaTarget: 'SLA గడువు',
    assignedOfficer: 'అధికారి',
    statusLabel: 'స్థితి',
    domainLabel: 'విభాగం',
    locationLabel: 'స్థలం',
    thinking: 'సహాయక్ AI ఆలోచిస్తోంది...',
    prompts: [
      { id: 'hi', label: '👋 నమస్కారం', text: 'నమస్కారం! సొసైటీ 360 లో మీరు నాకు ఎలా సహాయపడగలరు?' },
      { id: 'how_to_report', label: '📝 ఫిర్యాదు ఎలా చేయాలి?', text: 'ఈ అప్లికేషన్‌లో పౌర సమస్యను ఎలా నమోదు చేయాలి?' },
      { id: 'confirm_btn', label: '👍 కన్ఫర్మ్ బటన్ అంటే ఏమిటి?', text: 'ధృవీకరణ (Confirm) బటన్ ఎలా పనిచేస్తుంది మరియు 1 -> 2 -> 3 కౌంటర్ ఏమిటి?' },
      { id: 'dispute_res', label: '🚨 తప్పుడు పరిష్కారంపై ఫిర్యాదు?', text: 'అధికారి పని చేయకుండానే Resolved అని పెడితే నేను ఏమి చేయాలి?' },
      { id: 'qr_guide', label: '📷 QR కోడ్ ఎలా పనిచేస్తుంది?', text: 'స్మార్ట్ సిటీ QR కోడ్ ఫీచర్ ఎలా పనిచేస్తుంది?' },
      { id: 'track_help', label: '🔍 ఫిర్యాదు ట్రాక్ చేయండి', text: 'నా ఫిర్యాదు #CMP-10492 స్థితిని తనిఖీ చేయండి' }
    ]
  },
  Tamil: {
    welcome: `வணக்கம்! 🙏 நான் **சகாயக் AI**, **சொசைட்டி 360** 24/7 குடிமக்கள் AI உதவியாளர்.\n\nநான் உங்களுக்கு எவ்வாறு உதவ முடியும்?\n• பயன்பாட்டைப் பயன்படுத்துவதில் ஏதேனும் சந்தேகங்களை கேளுங்கள்\n• குரல் அல்லது உரை மூலம் சாலை, மின்சாரம், குடிநீர் புகார்களை பதிவு செய்யுங்கள்\n• **QR குறியீடு ஸ்கேனர்**, **அதிகாரியின் தவறான தீர்வை நிராகரிப்பது**, அல்லது **புகார்களை கண்காணிப்பது**\n• **PMKVY வேலைவாய்ப்பு பயிற்சி** மற்றும் **அவசர இரத்த உதவி**.\n\nகீழே உள்ள பட்டனை கிளிக் செய்யவும் அல்லது கேள்வி கேட்கவும்!`,
    placeholder: 'தமிழில் உங்கள் கேள்வியை தட்டச்சு செய்யவும்...',
    listening: 'தமிழில் குரல் பதிவு செய்யப்படுகிறது...',
    onlineBadge: 'நேரலை',
    subHeader: 'சொசைட்டி 360 குடிமக்கள் AI உதவியாளர்',
    readyToFile: 'புகார் அளிக்க தயார்:',
    instantFileBtn: '🚀 1-கிளிக்கில் புகார் பதிவு செய்',
    statusFound: '🔍 புகார் நிலை விவரங்கள்',
    communityUpvotes: 'குடிமக்கள் சரிபார்த்தனர்',
    slaTarget: 'SLA காலக்கெடு',
    assignedOfficer: 'பொறுப்பு அதிகாரி',
    statusLabel: 'நிலை',
    domainLabel: 'துறை',
    locationLabel: 'இடம்',
    thinking: 'சகாயக் AI சிந்திக்கிறது...',
    prompts: [
      { id: 'hi', label: '👋 வணக்கம்', text: 'வணக்கம்! சொசைட்டி 360 இல் நீங்கள் எனக்கு எவ்வாறு உதவ முடியும்?' },
      { id: 'how_to_report', label: '📝 புகார் அளிப்பது எப்படி?', text: 'இந்த செயலியில் குடிமக்கள் புகாரை எவ்வாறு பதிவு செய்வது?' },
      { id: 'confirm_btn', label: '👍 உறுதிப்படுத்து பட்டன் என்றால் என்ன?', text: 'உறுதிப்படுத்தல் (Confirm) பொத்தான் எவ்வாறு செயல்படுகிறது?' },
      { id: 'dispute_res', label: '🚨 தவறான தீர்வை நிராகரிப்பது?', text: 'அதிகாரி வேலை செய்யாமல் Resolved என்று குறித்தால் என்ன செய்வது?' },
      { id: 'qr_guide', label: '📷 QR குறியீடு எப்படி வேலை செய்கிறது?', text: 'ஸ்மார்ட் சிட்டி QR குறியீடு அம்சம் எவ்வாறு செயல்படுகிறது?' },
      { id: 'track_help', label: '🔍 புகாரைக் கண்காணிக்கவும்', text: 'எனது புகார் #CMP-10492 நிலையை சரிபார்க்கவும்' }
    ]
  },
  Marathi: {
    welcome: `नमस्कार! 🙏 मी **सहाय्यक AI** आहे, **सोसायटी 360** चा 24/7 नागरिक AI सहाय्यक.\n\nमी आज तुम्हाला कशी मदत करू शकतो?\n• ॲप्लिकेशन वापरण्याबाबत कोणत्याही शंका विचारा\n• बोलून किंवा टाईप करून खड्डे, वीज, पाणी किंवा कचऱ्याची तक्रार नोंदवा\n• **QR कोड स्कॅनर**, **अधिकाऱ्याचे खोटे समाधान री-ओपन करणे**, किंवा **तक्रार ट्रॅक करणे**\n• **PMKVY कौशल्य प्रशिक्षण** आणि **तातडीची रक्त सेवा**.\n\nखालील पर्यायांवर क्लिक करा किंवा आपला प्रश्न विचारा!`,
    placeholder: 'मराठीत तुमचा प्रश्न किंवा तक्रार लिहा...',
    listening: 'मराठीत आवाज ऐकत आहे...',
    onlineBadge: 'ऑनलाइन',
    subHeader: 'सोसायटी 360 नागरिक AI सहाय्यक',
    readyToFile: 'तक्रार दाखल करण्यासाठी तयार:',
    instantFileBtn: '🚀 1-क्लिकमध्ये तक्रार नोंदवा',
    statusFound: '🔍 तक्रारीची सद्यस्थिती',
    communityUpvotes: 'नागरिकांद्वारे सत्यापित',
    slaTarget: 'SLA अंतिम मुदत',
    assignedOfficer: 'प्रभारी अधिकारी',
    statusLabel: 'स्थिती',
    domainLabel: 'विभाग',
    locationLabel: 'स्थान',
    thinking: 'सहाय्यक AI विचार करत आहे...',
    prompts: [
      { id: 'hi', label: '👋 नमस्कार', text: 'नमस्कार! सोसायटी 360 मध्ये तुम्ही मला कशी मदत करू शकता?' },
      { id: 'how_to_report', label: '📝 तक्रार कशी नोंदवायची?', text: 'या ॲप्लिकेशनमध्ये नागरिकांची तक्रार कशी नोंदवायची?' },
      { id: 'confirm_btn', label: '👍 कन्फर्म बटण काय आहे?', text: 'पुष्टीकरण (Confirm) बटण कसे कार्य करते आणि 1 -> 2 -> 3 काउंटर काय आहे?' },
      { id: 'dispute_res', label: '🚨 खोटे समाधान री-ओपन करणे?', text: 'अधिकाऱ्याने काम न करता Resolved मार्क केले तर काय करावे?' },
      { id: 'qr_guide', label: '📷 QR कोड कसा कार्य करतो?', text: 'स्मार्ट सिटी QR कोड सुविधा कशी कार्य करते?' },
      { id: 'track_help', label: '🔍 तक्रार ट्रॅक करा', text: 'माझ्या तक्रार क्र. #CMP-10492 ची सद्यस्थिती तपासा' }
    ]
  },
  Gujarati: {
    welcome: `નમસ્તે! 🙏 હું **સહાયક AI** છું, **સોસાયટી 360** નો 24/7 નાગરિક AI સહાયક.\n\nહું તમને કેવી રીતે મદદ કરી શકું?\n• એપ્લિકેશનના ઉપયોગ અંગે કોઈપણ શંકા પૂછો\n• અવાજ અથવા લખાણ દ્વારા રસ્તાના ખાડા, વીજળી, પાણી અથવા કચરાની ફરિયાદ નોંધાવો\n• **QR કોડ સ્કેનર**, **ખોટા સમાધાનને ફરીથી ખોલવું (Re-Open)**, અથવા **ફરિયાદ ટ્રેક કરવી**\n• **PMKVY નોકરી તાલીમ** અને **ઇમરજન્સી રક્ત સેવાઓ**.\n\nનીચેના વિકલ્પ પર ક્લિક કરો અથવા પ્રશ્ન પૂછો!`,
    placeholder: 'ગુજરાતીમાં તમારો પ્રશ્ન અથવા ફરિયાદ લખો...',
    listening: 'ગુજરાતીમાં અવાજ સાંભળી રહ્યો છું...',
    onlineBadge: 'ઓનલાઈન',
    subHeader: 'સોસાયટી 360 નાગરિક AI સહાયક',
    readyToFile: 'ફરિયાદ નોંધવા માટે તૈયાર:',
    instantFileBtn: '🚀 1-ક્લિકમાં ફરિયાદ નોંધાવો',
    statusFound: '🔍 ફરિયાદ સ્થિતિ વિગતો',
    communityUpvotes: 'નાગરિકો દ્વારા ચકાસાયેલ',
    slaTarget: 'SLA સમયમર્યાદા',
    assignedOfficer: 'અધિકારી',
    statusLabel: 'સ્થિતિ',
    domainLabel: 'વિભાગ',
    locationLabel: 'સ્થળ',
    thinking: 'સહાયક AI વિચારી રહ્યો છે...',
    prompts: [
      { id: 'hi', label: '👋 નમસ્તે', text: 'નમસ્તે! સોસાયટી 360 માં તમે મને કેવી રીતે મદદ કરી શકો?' },
      { id: 'how_to_report', label: '📝 ફરિયાદ કેવી રીતે નોંધાવવી?', text: 'આ એપ્લિકેશનમાં નાગરિક ફરિયાદ કેવી રીતે નોંધાવવી?' },
      { id: 'confirm_btn', label: '👍 કન્ફર્મ બટન શું છે?', text: 'ખાતરી (Confirm) બટન કેવી રીતે કામ કરે છે અને 1 -> 2 -> 3 કાઉન્ટર શું છે?' },
      { id: 'dispute_res', label: '🚨 ખોટું સમાધાન રદ કરવું?', text: 'જો અધિકારી કામ કર્યા વિના Resolved માર્ક કરે તો શું કરવું?' },
      { id: 'qr_guide', label: '📷 QR કોડ કેવી રીતે કામ કરે છે?', text: 'સ્માર્ટ સિટી QR કોડ સુવિધા કેવી રીતે કાર્ય કરે છે?' },
      { id: 'track_help', label: '🔍 ફરિયાદ ટ્રેક કરો', text: 'મારી ફરિયાદ નંબર #CMP-10492 ની સ્થિતિ તપાસો' }
    ]
  }
};

export default function CivicChatbot({ currentUser, language = 'English', setLanguage }) {
  const [isOpen, setIsOpen] = useState(false);
  const localized = LOCALIZED_CHATBOT_DATA[language] || LOCALIZED_CHATBOT_DATA.English;

  const [messages, setMessages] = useState([
    {
      id: 'msg-welcome',
      sender: 'bot',
      text: localized.welcome,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actionCard: null
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [autoSpeechEnabled, setAutoSpeechEnabled] = useState(false);
  const [complaintsData, setComplaintsData] = useState([]);
  
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  // langRef always holds the current language — prevents stale closure in speak callbacks
  const langRef = useRef(language);
  useEffect(() => { langRef.current = language; }, [language]);

  // Dynamic voice synthesis — uses langRef to always get the current language (only when user enables it)
  const speakInNativeLanguage = (text, overrideLang) => {
    if (!autoSpeechEnabled) return;
    const cleanSpeech = text.replace(/\*\*/g, '').replace(/•/g, '').replace(/[#\[\]]/g, '');
    const voiceLangCode = getVoiceLangCode(overrideLang || langRef.current);
    assistantSpeak(cleanSpeech.slice(0, 240), { lang: voiceLangCode });
  };

  // When language changes — wipe ALL messages and start fresh in the new language (silent, no auto speech)
  useEffect(() => {
    const currentLoc = LOCALIZED_CHATBOT_DATA[language] || LOCALIZED_CHATBOT_DATA.English;
    const freshWelcome = {
      id: `msg-welcome-${language}-${Date.now()}`,
      sender: 'bot',
      text: currentLoc.welcome,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actionCard: null
    };
    // Fully reset chat — clear ALL previous messages in any language
    setMessages([freshWelcome]);
  }, [language]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const fetchComplaints = async () => {
    try {
      const res = await api.getComplaints();
      if (res.success && Array.isArray(res.data)) {
        setComplaintsData(res.data);
      }
    } catch (err) {
      console.error('Error fetching complaints in chatbot:', err);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Speech-to-Text Recognition in the active native language
  const toggleSpeechRecognition = () => {
    if (isVoiceActive) {
      recognitionRef.current?.stop();
      setIsVoiceActive(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported by your current browser. Please use Chrome or Edge.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = getVoiceLangCode(language);

      recognition.onstart = () => {
        setIsVoiceActive(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsVoiceActive(false);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsVoiceActive(false);
      };

      recognition.onend = () => {
        setIsVoiceActive(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Failed to start speech recognition:', err);
      setIsVoiceActive(false);
    }
  };

  const handleSendMessage = async (textToSend = null) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(async () => {
      const response = await generateBotResponse(query);
      setIsTyping(false);
      setMessages(prev => [...prev, response]);

      speakInNativeLanguage(response.text);
    }, 600);
  };

  // =========================================================================
  // MULTILINGUAL RESPONSE GENERATOR FOR ALL 7 INDIAN LANGUAGES
  // =========================================================================
  const generateBotResponse = async (query) => {
    const q = query.toLowerCase().trim();
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. BASIC GREETINGS (Hi / Hello / Namaste / Namaskara / Vanakkam / Kem Cho)
    if (/^(hi|hlo|hello|hey|heyy|namaste|namaskara|vanakkam|kem cho|pranam|good\s*(morning|afternoon|evening|day))(\s|!|\.|$)/i.test(q)) {
      const greetingReplies = {
        Kannada: `ನಮಸ್ಕಾರ ${currentUser?.name || 'ನಾಗರಿಕರೇ'}! 🙏 ನಾನು ಸಹಾಯಕ AI. ನಿಮಗೆ ರಸ್ತೆ ಗುಂಡಿಗಳು, ಬೀದಿ ದೀಪಗಳು, ನೀರಿನ ಸರಬರಾಜು ಅಥವಾ ಕಸದ ಸಮಸ್ಯೆಗಳನ್ನು ವರದಿ ಮಾಡಲು, ದೂರುಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಲು ಅಥವಾ PMKVY ಉದ್ಯೋಗ ತರಬೇತಿ ಬಗ್ಗೆ ಮಾಹಿತಿ ಪಡೆಯಲು ನಾನು ಸಹಾಯ ಮಾಡಬಲ್ಲೆ. ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?`,
        Hindi: `नमस्ते ${currentUser?.name || 'नागरिक'}! 🙏 मैं सहायक AI हूँ। मैं आपको सड़क, बिजली, पानी, कचरा शिकायत दर्ज करने, टिकट ट्रैक करने या सरकारी योजनाओं की जानकारी देने में मदद कर सकता हूँ। मैं आपकी क्या सहायता करूँ?`,
        Telugu: `నమస్కారం ${currentUser?.name || 'పౌరులారా'}! 🙏 నేను సహాయక్ AI. రోడ్లు, విద్యుత్, తాగునీరు, పారిశుద్ధ్యం సమస్యలను నివేదించడానికి లేదా ఫిర్యాదులను ట్రాక్ చేయడానికి నేను సహాయం చేయగలను. నేను మీకు ఎలా సహాయపడగలను?`,
        Tamil: `வணக்கம் ${currentUser?.name || 'குடிமக்களே'}! 🙏 நான் சகாயக் AI. சாலை, மின்சாரம், குடிநீர், குப்பை புகார்களை பதிவு செய்ய அல்லது அரசு திட்டங்களை அறிய நான் உதவ முடியும். நான் உங்களுக்கு எவ்வாறு உதவ வேண்டும்?`,
        Marathi: `नमस्कार ${currentUser?.name || 'नागरिक'}! 🙏 मी सहाय्यक AI आहे. खड्डे, वीज, पाणी किंवा कचऱ्याची तक्रार नोंदवण्यासाठी किंवा सरकारी योजनांची माहिती घेण्यासाठी मी तुम्हाला मदत करू शकतो. मी कशी मदत करू?`,
        Gujarati: `નમસ્તે ${currentUser?.name || 'નાગરિક'}! 🙏 હું સહાયક AI છું. ખાડા, વીજળી, પાણી અથવા કચરાની ફરિયાદ નોંધાવવા અથવા સરકારી યોજનાઓની માહિતી માટે હું મદદ કરી શકું છું. હું કેવી રીતે મદદ કરી શકું?`,
        English: `Hello ${currentUser?.name || 'there'}! 👋 I am **Sahayak AI**. I can help you auto-file grievances, track SLA progress, scan municipal QR codes, or answer questions about Society 360 in ${language}. How may I help you?`
      };

      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: greetingReplies[language] || greetingReplies.English,
        timestamp,
        actionCard: null
      };
    }

    // 2. "WHO ARE YOU / HOW ARE YOU"
    if (q.includes('who are you') || q.includes('what is your name') || q.includes('ಯಾರು') || q.includes('कौन') || q.includes('ఎవరు') || q.includes('யார்')) {
      const whoReplies = {
        Kannada: `🤖 ನಾನು **ಸಹಾಯಕ AI**, ಸೊಸೈಟಿ 360 ನಾಗರಿಕ ಆಡಳಿತ ವೇದಿಕೆಯ ಅಧಿಕೃತ ವರ್ಚುವಲ್ ಅಸಿಸ್ಟೆಂಟ್. ನಾನು ನಾಗರಿಕರು ಮತ್ತು 16 ಸರ್ಕಾರಿ ಇಲಾಖೆಗಳ ನಡುವೆ ಪಾರದರ್ಶಕ ಸಂಪರ್ಕ ಕಲ್ಪಿಸುತ್ತೇನೆ.`,
        Hindi: `🤖 मैं **सहायक AI** हूँ, सोसायटी 360 नागरिक शासन प्लेटफॉर्म का आधिकारिक वर्चुअल सहायक। मैं 16 सरकारी विभागों और नागरिकों के बीच पारदर्शिता सुनिश्चित करता हूँ।`,
        Telugu: `🤖 నేను **సహాయక్ AI**, సొసైటీ 360 పౌర పాలన వేదిక అధికారిక సహాయకుడిని.`,
        Tamil: `🤖 நான் **சகாயக் AI**, சொசைட்டி 360 குடிமக்கள் நிர்வாக தளத்தின் அதிகாரப்பூர்வ உதவியாளர்.`,
        Marathi: `🤖 मी **सहाय्यक AI** आहे, सोसायटी 360 नागरिक प्रशासन मंचाचा अधिकृत सहाय्यक.`,
        Gujarati: `🤖 હું **સહાયક AI** છું, સોસાયટી 360 નાગરિક વહીવટ મંચનો સત્તાવાર સહાયક.`,
        English: `🤖 I am **Sahayak AI**, the official intelligent assistant of the **Society 360** Civic Governance Platform (Central University of Karnataka / IEEE Std 830-1998).`
      };
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: whoReplies[language] || whoReplies.English,
        timestamp,
        actionCard: null
      };
    }

    // 3. APPLICATION GUIDE: HOW TO REPORT A COMPLAINT
    if (q.includes('how to report') || q.includes('how do i complain') || q.includes('file complaint') || q.includes('ದಾಖಲಿಸುವುದು ಹೇಗೆ') || q.includes('शिकायत कैसे') || q.includes('ఎలా చేయాలి') || q.includes('புகார் அளிப்பது')) {
      const reportReplies = {
        Kannada: `📋 **ಸೊಸೈಟಿ 360 ನಲ್ಲಿ ದೂರು ದಾಖಲಿಸುವ 3 ಸುಲಭ ವಿಧಾನಗಳು:**\n\n1. **ಧ್ವನಿ ಸಹಾಯಕ (Voice AI)**: ಮೈಕ್ರೊಫೋನ್ ಬಟನ್ ಒತ್ತಿ ಕನ್ನಡದಲ್ಲೇ ಮಾತನಾಡಿ — ನಮ್ಮ AI ಸ್ವಯಂಚಾಲಿತವಾಗಿ ವರ್ಗೀಕರಿಸುತ್ತದೆ!\n2. **ಕ್ಯಾಮೆರಾ ಜಿಯೋಟ್ಯಾಗ್**: ಲೈವ್ ಫೋಟೋ ತೆಗೆಯಿರಿ — ಜಿಪಿಎಸ್ ಲೊಕೇಶನ್ ತಾನಾಗಿಯೇ ಅಟ್ಯಾಚ್ ಆಗುತ್ತದೆ.\n3. **QR ಕೋಡ್ ಸ್ಕ್ಯಾನ್**: ಬೀದಿ ದೀಪ ಅಥವಾ ಶೌಚಾಲಯದ QR ಸ್ಟಿಕ್ಕರ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ ಒಂದೇ ಕ್ಲಿಕ್‌ನಲ್ಲಿ ದೂರು ಸಲ್ಲಿಸಿ!\n4. **ಚಾಟ್ ಮೂಲಕ**: ಸಮಸ್ಯೆಯನ್ನು ನನಗೆ ಇಲ್ಲಿಯೇ ತಿಳಿಸಿ, ನಾನು 1-ಕ್ಲಿಕ್ ಫೈಲಿಂಗ್ ಕಾರ್ಡ್ ರಚಿಸುತ್ತೇನೆ.`,
        Hindi: `📋 **सोसायटी 360 में शिकायत दर्ज करने के 3 आसान तरीके:**\n\n1. **वॉइस AI**: माइक बटन दबाएं और हिन्दी में बोलें — AI अपने आप समस्या को वर्गीकृत कर देगा!\n2. **कैमरा जियोटैग**: लाइव फोटो लें — सही GPS लोकेशन अपने आप जुड़ जाएगी।\n3. **QR कोड स्कैन**: स्ट्रीटलाइट या टॉयलेट का QR कोड स्कैन करें और 1-क्लिक में दर्ज करें!\n4. **सीधे चैट में**: मुझे अपनी समस्या बताएं, मैं यहीं 1-क्लिक फाइलिंग कार्ड बना दूंगा।`,
        Telugu: `📋 **ఫిర్యాదు ఎలా నమోదు చేయాలి:**\n\n1. **వాయిస్ AI**: మైక్ బటన్ నొక్కి తెలుగులో మాట్లాడండి.\n2. **కెమెరా జియోట్యాగ్**: లైవ్ ఫోటో తీయండి — ఖచ్చితమైన GPS అటాచ్ అవుతుంది.\n3. **QR కోడ్ స్కాన్**: వీధి దీపాలు లేదా టాయిలెట్ QR స్కాన్ చేయండి.\n4. **చాట్ ద్వారా**: ఇక్కడే మీ సమస్యను టైప్ చేయండి!`,
        Tamil: `📋 **புகார் பதிவு செய்வது எப்படி:**\n\n1. **குரல் AI**: மைக் பொத்தானை அழுத்தி தமிழில் பேசுங்கள்.\n2. **கேமரா ஜியோடேக்**: நேரடி புகைப்படம் எடுக்கவும் — GPS தானாக இணையும்.\n3. **QR குறியீடு ஸ்கேன்**: விளக்கு கம்பம் அல்லது கழிப்பறை QR ஸ்கேன் செய்யவும்.\n4. **சாட் மூலம்**: இங்கேயே உங்கள் பிரச்சனையை தெரிவிக்கவும்!`,
        Marathi: `📋 **तक्रार कशी नोंदवायची:**\n\n1. **व्हॉइस AI**: माइक बटण दाबून मराठीत बोला.\n2. **कॅमेरा जिओटॅग**: थेट फोटो काढा — अचूक GPS आपोआप जोडले जाईल.\n3. **QR कोड स्कॅन**: पथदिवे किंवा शौचालयाचा QR स्कॅन करा.\n4. **चॅट द्वारे**: येथेच तुमची समस्या टाईप करा!`,
        Gujarati: `📋 **ફરિયાદ કેવી રીતે નોંધાવવી:**\n\n1. **વોઇસ AI**: માઇક બટન દબાવી ગુજરાતીમાં બોલો.\n2. **કેમેરા જીઓટેગ**: લાઇવ ફોટો લો — સાચી GPS આપમેળે ઉમેરાશે.\n3. **QR કોડ સ્કેન**: સ્ટ્રીટલાઇટ અથવા શૌચાલયનો QR સ્કેન કરો.\n4. **ચેટ દ્વારા**: અહીં જ તમારી સમસ્યા લખો!`,
        English: `📋 **How to Report an Issue in Society 360:**\n\n1. **Voice AI**: Tap the 🎙️ mic button and speak in ${language} — AI auto-transcribes & categorizes!\n2. **Camera Geotag**: Take a live photo with anti-tamper GPS coordinates.\n3. **Scan Municipal QR**: Scan streetlight poles or public bins to auto-fill in 1 tap!\n4. **Via Chat**: Describe the issue right here and I'll generate a 1-click filing card!`
      };
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: reportReplies[language] || reportReplies.English,
        timestamp,
        actionCard: null
      };
    }

    // 4. APPLICATION GUIDE: CONFIRMATION / UPVOTE COUNTER (1 -> 2 -> 3)
    if (q.includes('confirm') || q.includes('upvote') || q.includes('1 to 2') || q.includes('1 -> 2') || q.includes('ಕನ್ಫರ್ಮ್') || q.includes('कन्फर्म') || q.includes('కన్ఫర్మ్')) {
      const confirmReplies = {
        Kannada: `👍 **ದೃಢೀಕರಣ (Confirm) ಕೌಂಟರ್ ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ:**\n\n• ನಿಮ್ಮ ವಾರ್ಡ್‌ನಲ್ಲಿ ಯಾರಾದರೂ ದೂರು ದಾಖಲಿಸಿದಾಗ, ಹತ್ತಿರದ ನಾಗರಿಕರು ಅದನ್ನು ತ�  const chatbotContent = (
    <>
      {/* ===================================================================== */}
      {/* FLOATING CHATBOT LAUNCHER BUTTON */}
      {/* ===================================================================== */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-[9999] flex items-center space-x-3 pointer-events-auto">
          <div className="hidden sm:flex items-center space-x-2 bg-slate-900/90 backdrop-blur-md text-amber-300 text-xs font-bold px-3.5 py-2 rounded-2xl border border-amber-500/40 shadow-2xl animate-bounce">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>✨ {language === 'Kannada' ? 'ಸಹಾಯಕ AI ಕೇಳಿ' : language === 'Hindi' ? 'सहायक AI से पूछें' : language === 'Telugu' ? 'సహాయక్ AI అడగండి' : language === 'Tamil' ? 'சகாயக் AI கேளுங்கள்' : language === 'Marathi' ? 'सहाय्यक AI विचारा' : language === 'Gujarati' ? 'સહાયક AI પૂછો' : 'Ask Sahayak AI'}</span>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open Society 360 AI Chatbot"
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-400 p-0.5 shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center text-slate-950 gold-glow relative cursor-pointer"
          >
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-amber-400">
              <Bot className="w-7 h-7" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-slate-950"></span>
            </span>
          </button>
        </div>
      )}

      {/* ===================================================================== */}
      {/* EXPANDABLE CHATBOT PANEL */}
      {/* ===================================================================== */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] w-[94vw] sm:w-[420px] h-[540px] max-h-[calc(100vh-5rem)] bg-slate-950/95 backdrop-blur-xl rounded-3xl border-2 border-amber-500/50 shadow-2xl flex flex-col overflow-hidden text-slate-100 font-sans pointer-events-auto">nfirm) கவுண்டர் எவ்வாறு செயல்படுகிறது:**\n\n• உங்கள் வார்டில் புகார் பதிவானால், அருகிலுள்ள மக்கள் **Confirm Issue** கிளிக் செய்யலாம்.\n• எண்ணிக்கை உடனடியாக உயரும் (**1 ➡️ 2 ➡️ 3**).\n• இது அதிகாரிகளின் தீர்வை விரைவுபடுத்துகிறது மற்றும் **+10 புள்ளிகள்** வழங்குகிறது.`,
        Marathi: `👍 **पुष्टीकरण (Confirm) काउंटर कसे कार्य करते:**\n\n• तुमच्या प्रभागात तक्रार दाखल झाल्यावर जवळचे नागरिक **Confirm Issue** दाबू शकतात.\n• काउंटर रिअल-टाइममध्ये वाढतो (**1 ➡️ 2 ➡️ 3**).\n• यामुळे कामाला गती मिळते आणि तुम्हाला **+10 गुण** मिळतात.`,
        Gujarati: `👍 **કન્ફર્મ (Confirm) કાઉન્ટર કેવી રીતે કાર્ય કરે છે:**\n\n• તમારા વોર્ડમાં ફરિયાદ નોંધાય ત્યારે નજીકના નાગરિકો **Confirm Issue** દબાવી શકે છે.\n• કાઉન્ટર વધે છે (**1 ➡️ 2 ➡️ 3**).\n• આનાથી અધિકારીઓ પ્રાથમિકતા આપે છે અને તમને **+10 પોઇન્ટ** મળે છે.`,
        English: `👍 **How the Community Confirmation Counter Works:**\n\n• When a complaint is reported in your ward, nearby citizens see the live alert.\n• Instead of duplicate filings, neighboring citizens click **Confirm Issue**.\n• The counter increments in real time (**1 ➡️ 2 ➡️ 3**).\n• High upvote counts boost municipal SLA escalation and earn you **+10 Citizen Karma Points**!`
      };
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: confirmReplies[language] || confirmReplies.English,
        timestamp,
        actionCard: null
      };
    }

    // 5. APPLICATION GUIDE: CITIZEN RESOLUTION VERIFICATION & DISPUTE FALSE CLOSURE
    if (q.includes('dispute') || q.includes('not resolved') || q.includes('fake') || q.includes('false') || q.includes('ಸುಳ್ಳು') || q.includes('ಪರಿಹರಿಸಲಾಗಿಲ್ಲ') || q.includes('फर्जी') || q.includes('हल नहीं')) {
      const disputeReplies = {
        Kannada: `🛡️ **ಸುಳ್ಳು ಪರಿಹಾರ ರಿಜೆಕ್ಟ್ ಮಾಡುವುದು (Anti-Fake-Resolution Governance):**\n\n• ಅಧಿಕಾರಿಯು ಸಮಸ್ಯೆಯನ್ನು 'Resolved' ಎಂದು ಗುರುತಿಸಿದಾಗ, ನಾಗರಿಕರು ದೃಢೀಕರಿಸುವವರೆಗೆ ಟಿಕೆಟ್ ಶಾಶ್ವತವಾಗಿ ಕ್ಲೋಸ್ ಆಗುವುದಿಲ್ಲ.\n• ನಿಮ್ಮ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ನಲ್ಲಿ ಪರಿಶೀಲನಾ ಬಾಕ್ಸ್ ಕಾಣಿಸುತ್ತದೆ:\n• **ನಿಜವಾಗಿ ಬಗೆಹರಿದಿದ್ದರೆ**: **[✓ Yes, Issue Fixed]** ಕ್ಲಿಕ್ ಮಾಡಿ (+25 ಪಾಯಿಂಟ್ಸ್).\n• **ಬಗೆಹರಿದಿಲ್ಲದಿದ್ದರೆ**: **[❌ NOT Fixed! Dispute & Re-Open]** ಕ್ಲಿಕ್ ಮಾಡಿ.\n• ಇದು ತಕ್ಷಣ ಟಿಕೆಟ್‌ ಅನ್ನು **12-ಗಂಟೆಗಳ ತುರ್ತು SLA** ನೊಂದಿಗೆ ಪುನಃ ತೆರೆಯುತ್ತದೆ ಮತ್ತು **ಲೋಕಾಯುಕ್ತ ಹಾಗೂ ಸೂಪರ್ ಅಡ್ಮಿನ್‌ಗೆ ಎಸ್ಕಲೇಟ್ ಮಾಡುತ್ತದೆ**!`,
        Hindi: `🛡️ **फर्जी समाधान निवारण व विवाद (Anti-Fake-Resolution Feature):**\n\n• जब सरकारी अधिकारी शिकायत को 'Resolved' मार्क करता है, तो वह नागरिक सत्यापन के बिना बंद नहीं होता।\n• आपके डैशबोर्ड पर सत्यापन विकल्प दिखेगा:\n• **यदि सचमुच ठीक हो गया है**: **[✓ Yes, Issue Fixed]** दबाएं (+25 कर्मा पॉइंट्स)।\n• **यदि काम नहीं हुआ है**: **[❌ NOT Fixed! Dispute & Re-Open]** दबाएं।\n• यह तुरंत टिकट को **री-ओपन** करता है, 12 घंटे का इमरजेंसी SLA सेट करता है और **लोकायुक्त व सुपर एडमिन विजिलेंस को एस्केलेट करता है**!`,
        Telugu: `🛡️ **తప్పుడు పరిష్కారాన్ని రీ-ఓపెన్ చేయడం:**\n\n• అధికారి 'Resolved' అని పెట్టినప్పుడు, పౌరుల ధృవీకరణ అవసరం.\n• **పని జరగకపోతే**: **[❌ NOT Fixed! Dispute & Re-Open]** క్లిక్ చేయండి.\n• ఇది తక్షణమే టికెట్‌ను రీ-ఓపెన్ చేసి **లోకాయుక్త మరియు సూపర్ అడ్మిన్‌కు ఎస్కలేట్ చేస్తుంది**!`,
        Tamil: `🛡️ **தவறான தீர்வை நிராகரிப்பது:**\n\n• அதிகாரி 'Resolved' எனக் குறித்தால், பொதுமக்கள் அதை சரிபார்க்க வேண்டும்.\n• **வேலை முடியவில்லை என்றால்**: **[❌ NOT Fixed! Dispute & Re-Open]** கிளிக் செய்யவும்.\n• இது உடனடியாக லோக்ஆயுக்தா மற்றும் உயர் அதிகாரிகளுக்கு புகாரை அனுப்பும்!`,
        Marathi: `🛡️ **खोटे समाधान री-ओपन करणे:**\n\n• अधिकाऱ्याने 'Resolved' मार्क केल्यावर नागरिकांची पडताळणी आवश्यक असते.\n• **काम झाले नसल्यास**: **[❌ NOT Fixed! Dispute & Re-Open]** दाबा.\n• हे तात्काळ लोकायुक्त आणि वरिष्ठ अधिकाऱ्यांकडे तक्रार वर्ग करते!`,
        Gujarati: `🛡️ **ખોટા સમાધાન સામે વાંધો (Dispute):**\n\n• જો અધિકારી 'Resolved' કરે પણ કામ ન થયું હોય, તો **[❌ NOT Fixed! Dispute & Re-Open]** દબાવો.\n• આ તરત જ લોકાયુક્ત અને સુપર એડમિનને ફરિયાદ રી-ઓપન કરી મોકલે છે!`,
        English: `🛡️ **Anti-Fake-Resolution Dispute Governance:**\n\n• When an officer marks a ticket as **"Resolved"**, it requires on-ground citizen verification.\n• **If Truly Fixed**: Click **[✓ Yes, Issue Fixed]** (+25 Citizen Points).\n• **If NOT Fixed (False Claim)**: Click **[❌ NOT Fixed! Dispute & Re-Open]**.\n• It instantly **Re-Opens the ticket**, resets to a strict **12-Hour SLA**, and flags the officer for **Super Admin & Lokayukta Vigilance Audit**!`
      };
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: disputeReplies[language] || disputeReplies.English,
        timestamp,
        actionCard: null
      };
    }

    // 6. APPLICATION GUIDE: HOW QR CODES WORK
    if (q.includes('qr') || q.includes('ಸ್ಕ್ಯಾನರ್') || q.includes('स्कैनर') || q.includes('స్కాన్')) {
      const qrReplies = {
        Kannada: `🖨️ **ಸ್ಮಾರ್ಟ್ ಸಿಟಿ QR ಕೋಡ್ ವ್ಯವಸ್ಥೆ:**\n\n1. **ಸರ್ಕಾರಿ ಆಸ್ತಿ QR ಸ್ಟಿಕ್ಕರ್**: ಬೀದಿ ದೀಪಗಳು, ಸಾರ್ವಜನಿಕ ಶೌಚಾಲಯಗಳು ಮತ್ತು ಕಸದ ಡಬ್ಬಿಗಳ ಮೇಲಿನ ಅಧಿಕೃತ ಸ್ಟಿಕ್ಕರ್‌ಗಳು.\n2. **ವ್ಯೂಫೈಂಡರ್ QR ಸ್ಕ್ಯಾನರ್**: ಮೊಬೈಲ್ ಕ್ಯಾಮೆರಾದಿಂದ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ — 0 ಟೈಪಿಂಗ್‌ನೊಂದಿಗೆ ದೂರು ಆಟೋ-ಫಿಲ್ ಆಗುತ್ತದೆ.\n3. **ಡಿಜಿಟಲ್ QR ರಸೀದಿ**: ಪ್ರತಿ ದಾಖಲಾದ ದೂರಿಗೂ ಡೌನ್‌ಲೋಡ್ ಅಥವಾ ಪ್ರಿಂಟ್ ಮಾಡಬಹುದಾದ ಡಿಜಿಟಲ್ QR ಟ್ರ್ಯಾಕಿಂಗ್ ರಸೀದಿ ಸಿಗುತ್ತದೆ.`,
        Hindi: `🖨️ **स्मार्ट सिटी QR कोड व्यवस्था:**\n\n1. **नगर निगम संपत्ति QR स्टिकर**: स्ट्रीटलाइट पोल, SBM टॉयलेट और कचरा डिब्बों पर लगे आधिकारिक स्टिकर।\n2. **QR स्कैनर**: कैमरा से कोड स्कैन करें — बिना किसी टाइपिंग के शिकायत अपने आप भर जाती है।\n3. **डिजिटल QR रसीद**: प्रत्येक दर्ज शिकायत के लिए डिजिटल QR ट्रैकिंग रसीद मिलती है जिसे डाउनलोड या प्रिंट किया जा सकता है।`,
        English: `🖨️ **Smart City QR Code Infrastructure:**\n\n1. **Municipal Asset QR Stickers**: Physical stickers on public assets generated by Department Officers.\n2. **Viewfinder QR Scanner**: Point camera to scan assets with zero typing.\n3. **Digital Grievance QR Receipts**: Downloadable & printable tracking receipts for filed tickets.`
      };
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: qrReplies[language] || qrReplies.English,
        timestamp,
        actionCard: null
      };
    }

    // 7. TICKET / COMPLAINT TRACKING INTENT
    const cmpMatch = q.match(/cmp-\d+/i) || q.includes('track') || q.includes('status') || q.includes('ticket') || q.includes('ಟ್ರ್ಯಾಕ್') || q.includes('स्थिति');
    if (cmpMatch) {
      const targetId = cmpMatch && typeof cmpMatch === 'object' && cmpMatch[0] ? cmpMatch[0].toUpperCase() : null;
      let target = targetId ? complaintsData.find(c => c.id.toUpperCase() === targetId) : complaintsData[0];

      if (target) {
        const confCount = target.confirmations?.length || target.confirmCount || 1;
        const trackReplies = {
          Kannada: `🔍 **ದೂರು ಟಿಕೆಟ್ #${target.id} ನ ವಿವರಗಳು:**\n\n• **ವಿಭಾಗ**: ${target.category || 'ರಸ್ತೆಗಳು ಮತ್ತು ಮೂಲಸೌಕರ್ಯ'}\n• **ಸ್ಥಳ**: ${target.location?.address || 'ಕಲಬುರಗಿ ವಾರ್ಡ್ 12'}\n• **ಪ್ರಸ್ತುತ ಸ್ಥಿತಿ**: **${target.status || 'In Progress'}**\n• **ನಿಯೋಜಿತ ಅಧಿಕಾರಿ**: ${target.assignedOfficer || 'ಕಾರ್ಯನಿರ್ವಾಹಕ ಇಂಜಿನಿಯರ್ (PWD)'}\n• **ಸಮುದಾಯ ದೃಢೀಕರಣಗಳು**: 👍 ${confCount} ನಾಗರಿಕರು ದೃಢೀಕರಿಸಿದ್ದಾರೆ\n• **SLA ಗುರಿ**: 24-48 ಗಂಟೆಗಳ ಒಳಗೆ`,
          Hindi: `🔍 **शिकायत टिकट संख्या #${target.id} की स्थिति:**\n\n• **विभाग**: ${target.category || 'सड़क व नागरिक अवसंरचना'}\n• **स्थान**: ${target.location?.address || 'कलबुर्गी वार्ड 12'}\n• **स्थिति**: **${target.status || 'In Progress'}**\n• **प्रभारी अधिकारी**: ${target.assignedOfficer || 'कार्यपालक अभियंता (PWD)'}\n• **नागरिक सत्यापन**: 👍 ${confCount} नागरिकों द्वारा सत्यापित\n• **SLA लक्ष्य**: 24-48 घंटों के भीतर`,
          English: `🔍 **Grievance Status for Ticket #${target.id}**\n\n• **Domain**: ${target.category || 'Roads & Infrastructure'}\n• **Location**: ${target.location?.address || 'Kalaburagi Ward 12'}\n• **Status**: **${target.status || 'In Progress'}**\n• **Assigned Officer**: ${target.assignedOfficer || 'Executive Engineer (PWD)'}\n• **Community Upvotes**: 👍 ${confCount} Citizens Verified\n• **SLA Target**: Within 24–48 Hours`
        };

        return {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: trackReplies[language] || trackReplies.English,
          timestamp,
          actionCard: {
            type: 'track_card',
            id: target.id,
            status: target.status || 'In Progress',
            category: target.category,
            officer: target.assignedOfficer || 'Executive Engineer'
          }
        };
      }
    }

    // 8. CIVIC ISSUE: POTHOLE / ROADS
    if (q.includes('pothole') || q.includes('road') || q.includes('footpath') || q.includes('ಗುಂಡಿ') || q.includes('ರಸ್ತೆ') || q.includes('गड्ढा') || q.includes('सड़क') || q.includes('రోడ్డు')) {
      const potholeTexts = {
        Kannada: `🛣️ **ರಸ್ತೆ ಮತ್ತು ಗುಂಡಿ ಸಮಸ್ಯೆ ಪತ್ತೆಯಾಗಿದೆ (PWD).**\n\n• ವಿಭಾಗ: ರಸ್ತೆಗಳು ಮತ್ತು ಸೇತುವೆಗಳು\n• ಪೂರ್ವನಿಯೋಜಿತ SLA: 24 ಗಂಟೆಗಳು\n• ನಿಯೋಜಿತ ಅಧಿಕಾರಿ: Er. ರಾಜೇಶ್ ಶರ್ಮಾ (ಕಾರ್ಯನಿರ್ವಾಹಕ ಇಂಜಿನಿಯರ್, PWD)\n\nನಿಮ್ಮ ಲೈವ್ ಜಿಪಿಎಸ್ ಲೊಕೇಶನ್‌ನೊಂದಿಗೆ ದೂರನ್ನು ದಾಖಲಿಸಲು ಕೆಳಗೆ ಕ್ಲಿಕ್ ಮಾಡಿ:`,
        Hindi: `🛣️ **सड़क व गड्ढे की समस्या पहचानी गई (PWD)।**\n\n• विभाग: सड़क व पुल निर्माण\n• मानक SLA: 24 घंटे\n• प्रभारी अधिकारी: ई. राजेश शर्मा (कार्यपालक अभियंता, PWD)\n\nअपने लाइव GPS लोकेशन के साथ शिकायत दर्ज करने के लिए नीचे क्लिक करें:`,
        English: `🛣️ **Roads & Infrastructure Hazard Detected (PWD).**\n\n• Domain: Roads & Bridges\n• Default SLA: 24 Hours\n• Assigned Authority: Er. Rajesh Sharma (Executive Engineer, PWD)\n\nClick below to pre-fill and lodge this ticket:`
      };

      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: potholeTexts[language] || potholeTexts.English,
        timestamp,
        actionCard: {
          type: 'filing_card',
          domain: 'roads',
          category: 'Pothole & Crater Damage',
          description: query,
          location: 'Station Road Junction, Ward 12, Kalaburagi',
          sla: '24 Hours'
        }
      };
    }

    // 9. CIVIC ISSUE: STREETLIGHT / ELECTRICITY
    if (q.includes('streetlight') || q.includes('light') || q.includes('electric') || q.includes('ಬೆಳಕು') || q.includes('ದೀಪ') || q.includes('बिजली') || q.includes('लाइट')) {
      const lightTexts = {
        Kannada: `💡 **ಬೀದಿ ದೀಪ ಮತ್ತು ವಿದ್ಯುತ್ ಸಮಸ್ಯೆ (HESCOM).**\n\n• ವಿಭಾಗ: ನಗರ ಬೆಳಕು ಮತ್ತು ವಿದ್ಯುತ್ ಮಂಡಳಿ\n• SLA: 12-24 ಗಂಟೆಗಳು\n• ಅಧಿಕಾರಿ: Er. ಪಿ. ದೇಶಮುಖ್ (HESCOM ಅಧೀಕ್ಷಕ ಇಂಜಿನಿಯರ್)`,
        Hindi: `💡 **स्ट्रीटलाइट व विद्युत समस्या (HESCOM)।**\n\n• विभाग: शहरी प्रकाश व विद्युत बोर्ड\n• SLA: 12-24 घंटे\n• अधिकारी: ई. पी. देशमुख (अधीक्षण अभियंता, HESCOM)`,
        English: `💡 **Street Lighting & Electricity Issue (HESCOM).**\n\n• Domain: Electrical & Street Lighting\n• SLA: 12–24 Hours\n• Authority: Er. P. Deshmukh (Superintending Engineer)`
      };

      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: lightTexts[language] || lightTexts.English,
        timestamp,
        actionCard: {
          type: 'filing_card',
          domain: 'electricity',
          category: 'Dark Streetlight Pole',
          description: query,
          location: 'Station Road Junction, Ward 12, Kalaburagi',
          sla: '12 Hours'
        }
      };
    }

    // 10. DEFAULT NATIVE FALLBACK
    const defaultFallbacks = {
      Kannada: `ನಾನು ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಸ್ವೀಕರಿಸಿದ್ದೇನೆ: "${query}".\n\nಸೊಸೈಟಿ 360 ಸಹಾಯಕ AI ಆಗಿ, ನಾನು 16 ಸರ್ಕಾರಿ ಇಲಾಖೆಗಳಿಗೆ ದೂರು ಸಲ್ಲಿಸಲು, ಲೈವ್ SLA ಟ್ರ್ಯಾಕ್ ಮಾಡಲು, ತುರ್ತು ರಕ್ತ ಸಹಾಯ ಪಡೆಯಲು ಮತ್ತು ಅಪ್ಲಿಕೇಶನ್ ಬಳಕೆಯ ಬಗ್ಗೆ ಮಾರ್ಗದರ್ಶನ ನೀಡಬಲ್ಲೆ.\n\nನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಕನ್ನಡದಲ್ಲಿ ಮುಕ್ತವಾಗಿ ಕೇಳಿ ಅಥವಾ ಮೈಕ್ರೊಫೋನ್ ಬಳಸಿ ಮಾತನಾಡಿ!`,
      Hindi: `मैंने आपका संदेश प्राप्त किया: "${query}"।\n\nसोसायटी 360 सहायक AI के रूप में, मैं 16 सरकारी विभागों में शिकायत दर्ज करने, लाइव SLA स्थिति जांचने और आपातकालीन स्वास्थ्य सहायता देने में सक्षम हूँ।\n\nकृपया अपना सवाल पूछें या बोलकर बताएं!`,
      Telugu: `నేను మీ సందేశాన్ని స్వీకరించాను: "${query}".\n\nసొసైటీ 360 సహాయక్ AI ద్వారా 16 ప్రభుత్వ విభాగాలకు ఫిర్యాదులు చేయవచ్చు, SLA ట్రాక్ చేయవచ్చు. దయచేసి మీ సందేహాన్ని అడగండి!`,
      Tamil: `உங்கள் செய்தியைப் பெற்றேன்: "${query}".\n\nசொசைட்டி 360 சகாயக் AI மூலம் 16 அரசு துறைகளுக்கு புகார் அளிக்கலாம். தயவுசெய்து உங்கள் கேள்வியை கேட்கவும்!`,
      Marathi: `मला तुमचा संदेश मिळाला: "${query}".\n\nसोसायटी 360 सहाय्यक AI द्वारे 16 सरकारी विभागांमध्ये तक्रार नोंदवू शकता. कृपया आपला प्रश्न विचारा!`,
      Gujarati: `મને તમારો સંદેશ મળ્યો: "${query}".\n\nસોસાયટી 360 સહાયક AI દ્વારા 16 સરકારી વિભાગોમાં ફરિયાદ નોંધાવી શકાય છે. કૃપા કરીને તમારો પ્રશ્ન પૂછો!`,
      English: `I received your query: "${query}".\n\nAs your **Society 360 AI Sahayak**, I can route issues to 16 civic departments, track live SLAs, explain QR codes, or guide you through resolution disputes in ${language}.\n\nFeel free to type or tap the microphone to speak!`
    };

    return {
      id: `bot-${Date.now()}`,
      sender: 'bot',
      text: defaultFallbacks[language] || defaultFallbacks.English,
      timestamp,
      actionCard: null
    };
  };

  const handleQuickSubmitFromChat = async (card) => {
    try {
      const newId = `CMP-${Math.floor(10000 + Math.random() * 90000)}`;
      await api.createComplaint({
        id: newId,
        category: card.category,
        description: card.description || 'Reported via Society 360 Sahayak AI Chatbot',
        location: { address: card.location || 'Kalaburagi Ward 12', lat: 17.3325, lng: 76.8380 },
        reporterId: currentUser?.uid || 'usr-citizen-1',
        reporterName: currentUser?.name || 'Citizen',
        reporterPhone: currentUser?.phone || '+91 9845012345',
        priority: 'High',
        assignedOfficer: 'Department In-Charge'
      });

      const submitSuccessMessages = {
        Kannada: `🎉 **ದೂರನ್ನು ಯಶಸ್ವಿಯಾಗಿ ದಾಖಲಿಸಲಾಗಿದೆ!**\n\n• **ಟಿಕೆಟ್ ಸಂಖ್ಯೆ**: #${newId}\n• **ವಿಭಾಗ**: ${card.category}\n• **SLA ಗುರಿ**: ${card.sla || '24 ಗಂಟೆಗಳು'}\n\nನಿಮಗೆ **+15 ಸಿಟಿಜನ್ ಕರ್ಮ ಪಾಯಿಂಟ್‌ಗಳು** ಲಭಿಸಿವೆ! 🌟`,
        Hindi: `🎉 **शिकायत सफलतापूर्वक दर्ज कर ली गई है!**\n\n• **टिकट संख्या**: #${newId}\n• **श्रेणी**: ${card.category}\n• **SLA लक्ष्य**: ${card.sla || '24 घंटे'}\n\nआपको **+15 कर्मा पॉइंट्स** मिले हैं! 🌟`,
        Telugu: `🎉 **ఫిర్యాదు విజయవంతంగా నమోదైంది!**\n\n• **టికెట్ నంబర్**: #${newId}\n• **SLA గడువు**: ${card.sla || '24 గంటలు'}\n\nమీకు **+15 పాయింట్లు** లభించాయి! 🌟`,
        Tamil: `🎉 **புகார் வெற்றிகரமாக பதிவு செய்யப்பட்டது!**\n\n• **டிக்கெட் எண்**: #${newId}\n• **SLA காலக்கெடு**: ${card.sla || '24 மணிநேரம்'}\n\nஉங்களுக்கு **+15 புள்ளிகள்** கிடைத்துள்ளது! 🌟`,
        Marathi: `🎉 **तक्रार यशस्वीरित्या नोंदवली गेली आहे!**\n\n• **तिकीट क्र.**: #${newId}\n• **SLA मुदत**: ${card.sla || '24 तास'}\n\nतुम्हाला **+15 गुण** मिळाले आहेत! 🌟`,
        Gujarati: `🎉 **ફરિયાદ સફળતાપૂર્વક નોંધાઈ ગઈ છે!**\n\n• **ટિકિટ નંબર**: #${newId}\n• **SLA સમય**: ${card.sla || '24 કલાક'}\n\nતમને **+15 પોઇન્ટ** મળ્યા છે! 🌟`,
        English: `🎉 **Complaint Successfully Lodged!**\n\n• **Ticket ID**: #${newId}\n• **Category**: ${card.category}\n• **Assigned SLA**: ${card.sla || '24 Hours'}\n\nYou have earned **+15 Citizen Karma Points**! 🌟`
      };

      const successText = submitSuccessMessages[language] || submitSuccessMessages.English;

      setMessages(prev => [
        ...prev,
        {
          id: `bot-confirm-${Date.now()}`,
          sender: 'bot',
          text: successText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actionCard: null
        }
      ]);

      speakInNativeLanguage(successText);
      fetchComplaints();
    } catch (err) {
      console.error('Error auto-filing from chatbot:', err);
    }
  };

  return (
    <>
      {/* ===================================================================== */}
      {/* FLOATING CHATBOT LAUNCHER BUTTON */}
      {/* ===================================================================== */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-3">
          <div className="hidden sm:flex items-center space-x-2 bg-slate-900/90 backdrop-blur-md text-amber-300 text-xs font-bold px-3.5 py-2 rounded-2xl border border-amber-500/40 shadow-xl animate-bounce">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>✨ {language === 'Kannada' ? 'ಸಹಾಯಕ AI ಕೇಳಿ' : language === 'Hindi' ? 'सहायक AI से पूछें' : language === 'Telugu' ? 'సహాయక్ AI అడగండి' : language === 'Tamil' ? 'சகாயக் AI கேளுங்கள்' : language === 'Marathi' ? 'सहाय्यक AI विचारा' : language === 'Gujarati' ? 'સહાયક AI પૂછો' : 'Ask Sahayak AI'}</span>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open Society 360 AI Chatbot"
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-400 p-0.5 shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center text-slate-950 gold-glow relative"
          >
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-amber-400">
              <Bot className="w-7 h-7" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-slate-950"></span>
            </span>
          </button>
        </div>
      )}

      {/* ===================================================================== */}
      {/* EXPANDABLE CHATBOT PANEL */}
      {/* ===================================================================== */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[94vw] sm:w-[430px] h-[610px] max-h-[88vh] bg-slate-950/95 backdrop-blur-xl rounded-3xl border-2 border-amber-500/50 shadow-2xl flex flex-col overflow-hidden text-slate-100 font-sans">
          
          {/* Header with In-Chatbot Language Switcher */}
          <div className="p-4 bg-gradient-to-r from-amber-950/90 via-slate-900 to-stone-900 border-b border-amber-500/30 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 p-0.5 flex items-center justify-center text-slate-950 shadow-md">
                <Bot className="w-6 h-6 text-slate-950" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <h3 className="font-bold text-sm text-white font-cinzel tracking-wide">Sahayak AI</h3>
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-300 font-bold px-1.5 py-0.5 rounded-full border border-emerald-500/40">
                    {localized.onlineBadge}
                  </span>
                </div>
                <p className="text-[10px] text-amber-300/80 font-medium">{localized.subHeader}</p>
              </div>
            </div>

            <div className="flex items-center space-x-1.5 text-slate-400">
              {/* In-Chatbot Language Selector */}
              {setLanguage && (
                <div className="flex items-center space-x-1 bg-slate-900/90 border border-amber-500/40 rounded-xl px-2 py-1">
                  <Globe className="w-3.5 h-3.5 text-amber-400" />
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="bg-transparent text-[11px] font-bold text-amber-300 focus:outline-none cursor-pointer"
                  >
                    {VOICE_LANGUAGES.map(l => (
                      <option key={l.native} value={l.native === 'ಕನ್ನಡ' ? 'Kannada' : l.native === 'हिन्दी' ? 'Hindi' : l.native === 'తెలుగు' ? 'Telugu' : l.native === 'தமிழ்' ? 'Tamil' : l.native === 'मराठी' ? 'Marathi' : l.native === 'ગુજરાતી' ? 'Gujarati' : 'English'} className="bg-slate-900 text-white">
                        {l.native}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Native Voiceover Toggle */}
              <button
                onClick={() => {
                  setAutoSpeechEnabled(!autoSpeechEnabled);
                  if (!autoSpeechEnabled) {
                    speakInNativeLanguage(`Voiceover enabled in ${language}`);
                  }
                }}
                title={autoSpeechEnabled ? `Voiceover Active (${language})` : 'Voiceover Muted'}
                className={`p-1.5 rounded-xl transition-all ${autoSpeechEnabled ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-[0_0_10px_rgba(245,158,11,0.3)]' : 'hover:text-white hover:bg-slate-800'}`}
              >
                {autoSpeechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Close / Minimize */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl hover:text-white hover:bg-slate-800 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Thread */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 scrollbar-thin scrollbar-thumb-amber-600/40">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'} space-y-1`}
              >
                <div className="flex items-end space-x-2 max-w-[88%]">
                  {m.sender === 'bot' && (
                    <div className="w-7 h-7 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 mb-1">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-br-none shadow-md'
                        : 'bg-slate-900/90 text-slate-200 border border-amber-500/30 rounded-bl-none shadow-lg'
                    }`}
                  >
                    <div className="whitespace-pre-line">
                      {m.text}
                    </div>

                    {/* Action Cards (Filing or Tracking) */}
                    {m.actionCard && m.actionCard.type === 'filing_card' && (
                      <div className="mt-3 p-3 bg-slate-950/80 rounded-xl border border-amber-500/40 space-y-2 text-left">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-amber-300">{localized.readyToFile}</span>
                          <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded text-[10px] font-mono font-bold">{m.actionCard.sla}</span>
                        </div>
                        <p className="text-[11px] text-white font-semibold">📍 {m.actionCard.location}</p>
                        
                        <button
                          onClick={() => handleQuickSubmitFromChat(m.actionCard)}
                          className="w-full py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-95 text-white font-bold text-xs rounded-lg shadow flex items-center justify-center space-x-1.5 transition-all"
                        >
                          <Zap className="w-3.5 h-3.5 text-amber-300" />
                          <span>{localized.instantFileBtn}</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {m.sender === 'user' && (
                    <div className="w-7 h-7 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 mb-1">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>

                <span className="text-[9px] text-slate-500 px-9">{m.timestamp}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center space-x-2 text-xs text-amber-400 bg-slate-900/80 p-3 rounded-2xl border border-amber-500/30 w-fit">
                <Bot className="w-4 h-4 animate-spin" />
                <span className="font-medium animate-pulse">{localized.thinking}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Localized Prompt Pills */}
          <div className="px-3 py-2 bg-slate-900/90 border-t border-white/10 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {localized.prompts.map((p) => (
              <button
                key={p.id}
                onClick={() => handleSendMessage(p.text)}
                className="shrink-0 px-2.5 py-1 bg-slate-800/80 hover:bg-slate-700 text-amber-300 hover:text-amber-200 text-[10px] font-bold rounded-lg border border-amber-500/30 transition-all"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-slate-900 border-t border-amber-500/30 flex items-center space-x-2">
            <button
              onClick={toggleSpeechRecognition}
              title={isVoiceActive ? localized.listening : `Speak in ${language}`}
              className={`p-2.5 rounded-xl transition-all ${
                isVoiceActive
                  ? 'bg-rose-600 text-white animate-pulse shadow-[0_0_15px_#e11d48]'
                  : 'bg-slate-800 text-amber-400 hover:bg-slate-700 border border-amber-500/30'
              }`}
            >
              {isVoiceActive ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={isVoiceActive ? localized.listening : localized.placeholder}
              className="flex-1 bg-slate-950 text-white text-xs rounded-xl px-3 py-2.5 border border-slate-700 focus:outline-none focus:border-amber-400 placeholder:text-slate-500"
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim()}
              className="p-2.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:opacity-90 disabled:opacity-40 text-white rounded-xl shadow-md transition-all shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </>
  );
}
