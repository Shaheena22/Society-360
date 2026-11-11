/**
 * Society 360 - Official Languages of India & Regional Linguistic Engine
 * Contains all 22 officially recognized languages under the 8th Schedule of the
 * Constitution of India, plus national working languages and major regional languages.
 * Each entry displays its native script name along with its English name in parentheses.
 */

// 1. The 22 Officially Recognized Scheduled Languages (8th Schedule of the Indian Constitution)
export const OFFICIAL_LANGUAGES_22 = [
  { code: 'Assamese', label: 'অসমীয়া (Assamese)', native: 'অসমীয়া', english: 'Assamese', voiceCode: 'as-IN', icon: '🟤' },
  { code: 'Bengali', label: 'বাংলা (Bengali)', native: 'বাংলা', english: 'Bengali', voiceCode: 'bn-IN', icon: '🔵' },
  { code: 'Bodo', label: 'बड़ो (Bodo)', native: 'बड़ो', english: 'Bodo', voiceCode: 'brx-IN', icon: '🟢' },
  { code: 'Dogri', label: 'डोगरी (Dogri)', native: 'डोगरी', english: 'Dogri', voiceCode: 'doi-IN', icon: '🟠' },
  { code: 'Gujarati', label: 'ગુજરાતી (Gujarati)', native: 'ગુજરાતી', english: 'Gujarati', voiceCode: 'gu-IN', icon: '🟢' },
  { code: 'Hindi', label: 'हिंदी (Hindi)', native: 'हिंदी', english: 'Hindi', voiceCode: 'hi-IN', icon: '🟠' },
  { code: 'Kannada', label: 'ಕನ್ನಡ (Kannada)', native: 'ಕನ್ನಡ', english: 'Kannada', voiceCode: 'kn-IN', icon: '🟡' },
  { code: 'Kashmiri', label: 'कॉशुर (Kashmiri)', native: 'कॉशुर', english: 'Kashmiri', voiceCode: 'ks-IN', icon: '🟣' },
  { code: 'Konkani', label: 'कोंकणी (Konkani)', native: 'कोंकणी', english: 'Konkani', voiceCode: 'kok-IN', icon: '🔵' },
  { code: 'Maithili', label: 'मैथिली (Maithili)', native: 'मैथिली', english: 'Maithili', voiceCode: 'mai-IN', icon: '🟤' },
  { code: 'Malayalam', label: 'മലയാളം (Malayalam)', native: 'മലയാളം', english: 'Malayalam', voiceCode: 'ml-IN', icon: '🟢' },
  { code: 'Manipuri', label: 'মৈতৈলোন্ (Manipuri)', native: 'মৈতৈলোন্', english: 'Manipuri', voiceCode: 'mni-IN', icon: '🟣' },
  { code: 'Marathi', label: 'मराठी (Marathi)', native: 'मराठी', english: 'Marathi', voiceCode: 'mr-IN', icon: '🟤' },
  { code: 'Nepali', label: 'नेपाली (Nepali)', native: 'नेपाली', english: 'Nepali', voiceCode: 'ne-NP', icon: '🔴' },
  { code: 'Odia', label: 'ଓଡ଼ିଆ (Odia)', native: 'ଓଡ଼ିଆ', english: 'Odia', voiceCode: 'or-IN', icon: '🟠' },
  { code: 'Punjabi', label: 'ਪੰਜਾਬੀ (Punjabi)', native: 'ਪੰਜਾਬੀ', english: 'Punjabi', voiceCode: 'pa-IN', icon: '🟡' },
  { code: 'Sanskrit', label: 'संस्कृतम् (Sanskrit)', native: 'संस्कृतम्', english: 'Sanskrit', voiceCode: 'sa-IN', icon: '🕉️' },
  { code: 'Santali', label: 'ᱥᱟᱱᱛᱟᱲᱤ (Santali)', native: 'ᱥᱟᱱᱛᱟᱲᱤ', english: 'Santali', voiceCode: 'sat-IN', icon: '🟤' },
  { code: 'Sindhi', label: 'सिन्धी (Sindhi)', native: 'सिन्धी', english: 'Sindhi', voiceCode: 'sd-IN', icon: '🔵' },
  { code: 'Tamil', label: 'தமிழ் (Tamil)', native: 'தமிழ்', english: 'Tamil', voiceCode: 'ta-IN', icon: '🟣' },
  { code: 'Telugu', label: 'తెలుగు (Telugu)', native: 'తెలుగు', english: 'Telugu', voiceCode: 'te-IN', icon: '🔵' },
  { code: 'Urdu', label: 'اردو (Urdu)', native: 'اردو', english: 'Urdu', voiceCode: 'ur-IN', icon: '🟢' }
];

// 2. Link & National Working Language
export const LINK_LANGUAGES = [
  { code: 'English', label: 'English (English)', native: 'English', english: 'English', voiceCode: 'en-IN', icon: '🇮🇳' }
];

// 3. Other Widely Spoken Regional & Tribal Languages of India
export const OTHER_REGIONAL_LANGUAGES = [
  { code: 'Bhojpuri', label: 'भोजपुरी (Bhojpuri)', native: 'भोजपुरी', english: 'Bhojpuri', voiceCode: 'bho-IN', icon: '🟠' },
  { code: 'Rajasthani', label: 'राजस्थानी (Rajasthani)', native: 'राजस्थानी', english: 'Rajasthani', voiceCode: 'raj-IN', icon: '🟡' },
  { code: 'Chhattisgarhi', label: 'छत्तीसगढ़ी (Chhattisgarhi)', native: 'छत्तीसगढ़ी', english: 'Chhattisgarhi', voiceCode: 'hne-IN', icon: '🟢' },
  { code: 'Haryanvi', label: 'हरियाणवी (Haryanvi)', native: 'हरियाणवी', english: 'Haryanvi', voiceCode: 'bgc-IN', icon: '🟤' },
  { code: 'Tulu', label: 'ತುಳು (Tulu)', native: 'ತುಳು', english: 'Tulu', voiceCode: 'tcy-IN', icon: '🟡' },
  { code: 'Kokborok', label: 'ককবরক (Kokborok)', native: 'ককবরক', english: 'Kokborok', voiceCode: 'trp-IN', icon: '🟣' },
  { code: 'Mizo', label: 'Mizo ṭawng (Mizo)', native: 'Mizo ṭawng', english: 'Mizo', voiceCode: 'lus-IN', icon: '🔵' },
  { code: 'Khasi', label: 'Ka Ktien Khasi (Khasi)', native: 'Ka Ktien Khasi', english: 'Khasi', voiceCode: 'kha-IN', icon: '🟢' },
  { code: 'Garo', label: 'A·chik (Garo)', native: 'A·chik', english: 'Garo', voiceCode: 'grt-IN', icon: '🟠' },
  { code: 'Ladakhi', label: 'ལ་དྭགས་སྐད་ (Ladakhi)', native: 'ལ་དྭགས་སྐད་', english: 'Ladakhi', voiceCode: 'lbj-IN', icon: '🔵' }
];

// All Combined Languages List
export const ALL_LANGUAGES = [
  ...LINK_LANGUAGES,
  ...OFFICIAL_LANGUAGES_22,
  ...OTHER_REGIONAL_LANGUAGES
];

// Fast lookup maps
export const LANGUAGE_BY_CODE = ALL_LANGUAGES.reduce((acc, item) => {
  acc[item.code] = item;
  return acc;
}, {});

export const LANGUAGE_TO_VOICE_CODE = ALL_LANGUAGES.reduce((acc, item) => {
  acc[item.code] = item.voiceCode;
  return acc;
}, {});

export function getLanguageInfo(code) {
  return LANGUAGE_BY_CODE[code] || LANGUAGE_BY_CODE['English'];
}

export function getLanguageVoiceCode(code) {
  return LANGUAGE_TO_VOICE_CODE[code] || 'en-IN';
}
