/**
 * Nepali Devanagari numerals utilities and Web Audio tools for SafePath Nepal
 */

export const NEPALI_DIGITS: { [key: string]: string } = {
  '0': '०',
  '1': '१',
  '2': '२',
  '3': '३',
  '4': '४',
  '5': '५',
  '6': '६',
  '7': '७',
  '8': '८',
  '9': '९',
};

export const ENGLISH_DIGITS: { [key: string]: string } = {
  '०': '0',
  '१': '1',
  '२': '2',
  '३': '3',
  '४': '4',
  '५': '5',
  '६': '6',
  '७': '7',
  '८': '8',
  '९': '9',
};

export function toNepaliNumerals(val: string | number): string {
  if (val === undefined || val === null) return '';
  const str = String(val);
  return str.replace(/[0-9]/g, (char) => NEPALI_DIGITS[char] || char);
}

export function toEnglishNumerals(val: string): string {
  if (!val) return '';
  return val.replace(/[०-९]/g, (char) => ENGLISH_DIGITS[char] || char);
}

export function formatWithNepaliSetting(val: string | number, useNepaliDigits: boolean): string {
  if (useNepaliDigits) {
    return toNepaliNumerals(val);
  }
  return String(val);
}

const NEPALI_WORDS_1_TO_20 = [
  'शून्य', 'एक', 'दुई', 'तीन', 'चार', 'पाँच', 'छ', 'सात', 'आठ', 'नौ', 'दश',
  'एघार', 'बाह्र', 'तेह्र', 'चौध', 'पन्ध्र', 'सोह्र', 'सत्र', 'अठार', 'उन्नाइस', 'बीस'
];

const NEPALI_TENS: { [key: number]: string } = {
  30: 'तीस', 40: 'चालीस', 50: 'पचास', 60: 'साठी', 70: 'सत्तरी', 80: 'असी', 90: 'नब्बे'
};

/**
 * Converts a positive integer into Nepali words (Devanagari)
 */
export function integerToNepaliWords(num: number): string {
  if (isNaN(num)) return '';
  if (num === 0) return 'शून्य';
  if (num < 0) return 'ऋण ' + integerToNepaliWords(-num);

  if (num <= 20) return NEPALI_WORDS_1_TO_20[num];

  if (num < 100) {
    const tens = Math.floor(num / 10) * 10;
    const remainder = num % 10;
    if (remainder === 0 && NEPALI_TENS[tens]) return NEPALI_TENS[tens];
    // Approximate compound representation
    return `${NEPALI_WORDS_1_TO_20[Math.floor(num / 10)]} दश ${remainder > 0 ? NEPALI_WORDS_1_TO_20[remainder] : ''}`.trim();
  }

  if (num < 1000) {
    const hundreds = Math.floor(num / 100);
    const remainder = num % 100;
    return `${NEPALI_WORDS_1_TO_20[hundreds]} सय ${remainder > 0 ? integerToNepaliWords(remainder) : ''}`.trim();
  }

  if (num < 100000) {
    const thousands = Math.floor(num / 1000);
    const remainder = num % 1000;
    return `${integerToNepaliWords(thousands)} हजार ${remainder > 0 ? integerToNepaliWords(remainder) : ''}`.trim();
  }

  if (num < 10000000) {
    const lakhs = Math.floor(num / 100000);
    const remainder = num % 100000;
    return `${integerToNepaliWords(lakhs)} लाख ${remainder > 0 ? integerToNepaliWords(remainder) : ''}`.trim();
  }

  const crores = Math.floor(num / 10000000);
  const remainder = num % 10000000;
  return `${integerToNepaliWords(crores)} करोड ${remainder > 0 ? integerToNepaliWords(remainder) : ''}`.trim();
}

/**
 * Web Audio Context singleton for pure offline sound synthesis
 */
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Play Dual-Tone (DTMF-like) dialpad beep for numbers
 */
export function playKeypressTone(digit: string) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const dtmfFreqs: { [key: string]: [number, number] } = {
    '1': [697, 1209], '2': [697, 1336], '3': [697, 1477],
    '4': [770, 1209], '5': [770, 1336], '6': [770, 1477],
    '7': [852, 1209], '8': [852, 1336], '9': [852, 1477],
    '*': [941, 1209], '0': [941, 1336], '#': [941, 1477],
  };

  const freqs = dtmfFreqs[toEnglishNumerals(digit)] || [800, 1200];
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();

  osc1.type = 'sine';
  osc2.type = 'sine';
  osc1.frequency.value = freqs[0];
  osc2.frequency.value = freqs[1];

  gain.gain.setValueAtTime(0.12, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(ctx.destination);

  osc1.start();
  osc2.start();
  osc1.stop(ctx.currentTime + 0.15);
  osc2.stop(ctx.currentTime + 0.15);
}

/**
 * Loud high-pitch rescue whistle (3000Hz modulated)
 */
export function playWhistleSound(durationMs = 800) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const mod = ctx.createOscillator();
  const modGain = ctx.createGain();
  const mainGain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.value = 2800; // piercing rescue frequency

  mod.type = 'sine';
  mod.frequency.value = 25; // flutter
  modGain.gain.value = 200;

  mod.connect(modGain);
  modGain.connect(osc.frequency);

  mainGain.gain.setValueAtTime(0, ctx.currentTime);
  mainGain.gain.linearRampToValueAtTime(0.28, ctx.currentTime + 0.05);
  mainGain.gain.setValueAtTime(0.28, ctx.currentTime + durationMs / 1000 - 0.08);
  mainGain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + durationMs / 1000);

  osc.connect(mainGain);
  mainGain.connect(ctx.destination);

  mod.start();
  osc.start();
  mod.stop(ctx.currentTime + durationMs / 1000);
  osc.stop(ctx.currentTime + durationMs / 1000);
}

/**
 * Metronome Click for CPR (100–120 BPM cadence)
 */
export function playMetronomeBeep(highPitch = false) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.value = highPitch ? 1200 : 880;

  gain.gain.setValueAtTime(0.2, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.08);
}
