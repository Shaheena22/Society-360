import QRCode from 'qrcode';

/**
 * Civic QR Code Payload Schemas:
 * 1. ASSET QR: "CIVIC_ASSET|domain|category|assetId|location|ward|details"
 * 2. TRACK QR: "CIVIC_TRACK|complaintId"
 * 3. TOILET QR: "CIVIC_TOILET|toiletId|name|ward"
 * 4. FIELD VERIFY QR: "CIVIC_VERIFY|complaintId|ward"
 */

export const DEMO_QR_PRESETS = [
  {
    id: 'qr-light-401',
    label: 'Smart Streetlight Pole #401',
    icon: '💡',
    domain: 'electricity',
    category: 'electricity_dark_area',
    categoryName: 'Dark / Unlit Street',
    assetId: 'ASSET-WARD12-LIGHT-401',
    address: 'Station Road Junction, Ward 12, Kalaburagi',
    ward: 'Ward 12',
    payload: 'CIVIC_ASSET|electricity|electricity_dark_area|ASSET-WARD12-LIGHT-401|Station Road Junction, Kalaburagi|Ward 12|BESCOM 60W LED Luminaire Pole'
  },
  {
    id: 'qr-bin-09',
    label: 'SBM Community Waste Bin #09',
    icon: '🗑️',
    domain: 'waste',
    category: 'waste_overflowing_bins',
    categoryName: 'Overflowing Garbage Bins',
    assetId: 'ASSET-WARD12-BIN-09',
    address: 'Vegetable Market Main Gate, Ward 12, Kalaburagi',
    ward: 'Ward 12',
    payload: 'CIVIC_ASSET|waste|waste_overflowing_bins|ASSET-WARD12-BIN-09|Vegetable Market Main Gate|Ward 12|1100L SBM Wet/Dry Twin Bin Unit'
  },
  {
    id: 'qr-toilet-12',
    label: 'SBM Public Smart Toilet Unit',
    icon: '🚻',
    domain: 'waste',
    category: 'waste_public_toilet_hygiene',
    categoryName: 'Public Toilet Cleanliness / Hygiene',
    assetId: 'ASSET-WARD12-TOILET-02',
    address: 'Central Bus Stand Complex, Ward 12, Kalaburagi',
    ward: 'Ward 12',
    payload: 'CIVIC_TOILET|sbm-t2|Ward 12 Community Smart Toilet|Ward 12'
  },
  {
    id: 'qr-water-tank-04',
    label: 'KUWSDB Drinking Water Point #04',
    icon: '💧',
    domain: 'water',
    category: 'water_leakage',
    categoryName: 'Water Pipe Leakage / Burst',
    assetId: 'ASSET-WARD12-WATER-04',
    address: 'Old Town Hospital Road, Ward 12, Kalaburagi',
    ward: 'Ward 12',
    payload: 'CIVIC_ASSET|water|water_leakage|ASSET-WARD12-WATER-04|Old Town Hospital Road|Ward 12|KUWSDB 5000L Overhead Water Distribution Point'
  },
  {
    id: 'qr-track-10492',
    label: 'Grievance Receipt #CMP-10492',
    icon: '📄',
    domain: 'roads',
    category: 'roads_pothole',
    categoryName: 'Pothole Reporting',
    assetId: 'CMP-10492',
    address: 'Ring Road Bypass, Kalaburagi',
    ward: 'Ward 12',
    payload: 'CIVIC_TRACK|CMP-10492'
  }
];

/**
 * Generate high-res Data URL string for any text / object payload
 */
export async function generateQRCodeDataURL(payload, options = {}) {
  try {
    const text = typeof payload === 'object' ? JSON.stringify(payload) : String(payload);
    return await QRCode.toDataURL(text, {
      width: options.width || 256,
      margin: options.margin || 2,
      color: {
        dark: options.darkColor || '#1c1917',
        light: options.lightColor || '#ffffff'
      },
      errorCorrectionLevel: 'H'
    });
  } catch (err) {
    console.error('Failed to generate QR code:', err);
    return null;
  }
}

/**
 * Parse scanned QR string into structured action data
 */
export function parseCivicQRCode(rawText) {
  if (!rawText) return null;
  const str = String(rawText).trim();

  // Pipe separated custom format
  if (str.startsWith('CIVIC_ASSET|')) {
    const parts = str.split('|');
    return {
      type: 'ASSET',
      domain: parts[1] || 'civic',
      category: parts[2] || '',
      assetId: parts[3] || '',
      address: parts[4] || '',
      ward: parts[5] || 'Ward 12',
      details: parts[6] || '',
      raw: str
    };
  }

  if (str.startsWith('CIVIC_TRACK|')) {
    const parts = str.split('|');
    return {
      type: 'TRACK',
      complaintId: parts[1] || '',
      raw: str
    };
  }

  if (str.startsWith('CIVIC_TOILET|')) {
    const parts = str.split('|');
    return {
      type: 'TOILET',
      toiletId: parts[1] || 'sbm-t1',
      toiletName: parts[2] || 'SBM Public Toilet',
      ward: parts[3] || 'Ward 12',
      raw: str
    };
  }

  if (str.startsWith('CIVIC_VERIFY|')) {
    const parts = str.split('|');
    return {
      type: 'VERIFY',
      complaintId: parts[1] || '',
      ward: parts[2] || 'Ward 12',
      raw: str
    };
  }

  // JSON payload fallback
  try {
    const json = JSON.parse(str);
    if (json.complaintId) {
      return { type: 'TRACK', complaintId: json.complaintId, ...json, raw: str };
    }
    if (json.assetId) {
      return { type: 'ASSET', ...json, raw: str };
    }
  } catch (e) {
    // not json
  }

  // Generic complaint ID scan (e.g. "CMP-10492" or "society360://track/CMP-10492")
  const cmpMatch = str.match(/CMP-\d+/i);
  if (cmpMatch) {
    return {
      type: 'TRACK',
      complaintId: cmpMatch[0].toUpperCase(),
      raw: str
    };
  }

  // Generic raw payload
  return {
    type: 'GENERIC',
    content: str,
    raw: str
  };
}

/**
 * Play a high-frequency confirmation beep upon QR recognition
 */
export function playQRBeep() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
    osc.frequency.setValueAtTime(1320, ctx.currentTime + 0.08); // E6

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  } catch (e) {
    // audio context may be blocked by browser policy until gesture
  }
}
