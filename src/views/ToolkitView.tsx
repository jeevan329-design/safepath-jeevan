import React, { useState, useEffect, useRef } from 'react';
import { 
  Wrench, 
  Sun, 
  Volume2, 
  Compass, 
  Share2, 
  Copy, 
  Check, 
  MapPin, 
  Radio, 
  ShieldAlert, 
  Square 
} from 'lucide-react';
import { playWhistleSound, toNepaliNumerals } from '../utils/nepaliNumbers';

interface ToolkitViewProps {
  useNepaliDigits: boolean;
  isNepaliLang: boolean;
}

export const ToolkitView: React.FC<ToolkitViewProps> = ({
  useNepaliDigits,
  isNepaliLang,
}) => {
  // Strobe State
  const [isStrobeActive, setIsStrobeActive] = useState(false);

  // Siren State
  const [isSirenActive, setIsSirenActive] = useState(false);
  const sirenAudioRef = useRef<{ ctx: AudioContext; osc: OscillatorNode; gain: GainNode } | null>(null);

  // Morse SOS State
  const [isMorseActive, setIsMorseActive] = useState(false);
  const [morseFlash, setMorseFlash] = useState(false);
  const morseTimerRef = useRef<number | null>(null);

  // Coordinates
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [copiedLoc, setCopiedLoc] = useState(false);

  const fmt = (val: string | number) => (useNepaliDigits ? toNepaliNumerals(val) : String(val));

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({
            lat: Number(pos.coords.latitude.toFixed(5)),
            lng: Number(pos.coords.longitude.toFixed(5)),
          });
        },
        () => {
          // Fallback
          setCoords({ lat: 27.7172, lng: 85.3240 });
        }
      );
    }
  }, []);

  // Web Audio Continuous Siren Generator
  const toggleSiren = () => {
    if (isSirenActive) {
      if (sirenAudioRef.current) {
        try {
          sirenAudioRef.current.osc.stop();
          sirenAudioRef.current.ctx.close();
        } catch {}
        sirenAudioRef.current = null;
      }
      setIsSirenActive(false);
    } else {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(450, ctx.currentTime);

      // Oscillate frequency like an emergency siren
      const now = ctx.currentTime;
      for (let i = 0; i < 40; i++) {
        osc.frequency.linearRampToValueAtTime(850, now + i * 1.2 + 0.6);
        osc.frequency.linearRampToValueAtTime(450, now + (i + 1) * 1.2);
      }

      gain.gain.setValueAtTime(0.2, ctx.currentTime);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      sirenAudioRef.current = { ctx, osc, gain };
      setIsSirenActive(true);
    }
  };

  // Morse Code SOS (... --- ...)
  useEffect(() => {
    if (isMorseActive) {
      // S: 3 short, O: 3 long, S: 3 short
      const timings = [
        200, 200, 200, 200, 200, 500, // S
        600, 200, 600, 200, 600, 500, // O
        200, 200, 200, 200, 200, 1000 // S
      ];
      let step = 0;

      const runMorse = () => {
        setMorseFlash(step % 2 === 0);
        const delay = timings[step % timings.length];
        step++;
        morseTimerRef.current = window.setTimeout(runMorse, delay);
      };

      runMorse();
    } else {
      setMorseFlash(false);
      if (morseTimerRef.current) clearTimeout(morseTimerRef.current);
    }

    return () => {
      if (morseTimerRef.current) clearTimeout(morseTimerRef.current);
    };
  }, [isMorseActive]);

  // Clean up siren on unmount
  useEffect(() => {
    return () => {
      if (sirenAudioRef.current) {
        try {
          sirenAudioRef.current.osc.stop();
          sirenAudioRef.current.ctx.close();
        } catch {}
      }
    };
  }, []);

  const handleCopyLocation = () => {
    if (!coords) return;
    const text = `URGENT RESCUE COORDINATES: ${coords.lat}°N, ${coords.lng}°E (https://maps.google.com/?q=${coords.lat},${coords.lng})`;
    navigator.clipboard.writeText(text).then(() => {
      setCopiedLoc(true);
      setTimeout(() => setCopiedLoc(false), 2500);
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title */}
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-widest text-[#8E8E8E]">
          {isNepaliLang ? 'अफलाइन आपतकालीन उपकरण' : 'Tactical Survival Utilities'}
        </div>
        <h1 className="font-display text-4xl sm:text-6xl tracking-wide text-white mt-1">
          {isNepaliLang ? 'आपतकालीन टुलकिट' : 'EMERGENCY TOOLKIT'}
        </h1>
        <p className="text-sm text-[#8E8E8E] max-w-2xl mt-1">
          {isNepaliLang
            ? 'उद्धारकर्तालाई संकेत गर्न स्ट्रब लाइट, चर्को साइरन, बाँसुरी, मोर्स कोड एसओएस तथा जीपीएस स्थान साझेदारी।'
            : 'Audio rescue whistles, screen strobe beacons, Morse code SOS, and offline coordinates.'}
        </p>
      </div>

      {/* Fullscreen Strobe Modal */}
      {isStrobeActive && (
        <div 
          onClick={() => setIsStrobeActive(false)}
          className="fixed inset-0 z-50 animate-strobe flex flex-col items-center justify-center p-6 cursor-pointer"
        >
          <div className="bg-black text-white p-4 font-display text-4xl tracking-widest uppercase">
            {isNepaliLang ? 'रोक्न स्क्रिनमा ट्याप गर्नुहोस्' : 'TAP SCREEN TO STOP STROBE'}
          </div>
        </div>
      )}

      {/* Grid of Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Tool 1: Screen Strobe Beacon */}
        <div className="border border-[#262626] bg-[#111111] p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <Sun className="h-6 w-6 text-[#E8FF00]" />
              <span className="text-[10px] uppercase font-bold text-[#E8FF00] border border-[#E8FF00]/30 px-2 py-0.5">
                Visual Beacon
              </span>
            </div>
            <h2 className="font-display text-3xl text-white mt-2">
              {isNepaliLang ? 'उद्धार स्ट्रब लाइट' : 'RESCUE STROBE LIGHT'}
            </h2>
            <p className="text-xs text-[#8E8E8E] mt-1 leading-relaxed">
              {isNepaliLang
                ? 'रातको समयमा वा बाक्लो धुवाँमा उद्धार टोली र हेलिकप्टरलाई संकेत गर्न स्क्रिनलाई तीव्र गतिमा चम्काउँछ।'
                : 'Rapidly flashes screen in high-contrast red/white for nighttime search & rescue signals.'}
            </p>
          </div>

          <button
            onClick={() => setIsStrobeActive(true)}
            className="w-full bg-[#E8FF00] text-black py-3 font-display text-xl tracking-wider hover:bg-white transition-colors"
          >
            {isNepaliLang ? 'स्ट्रब सुरु गर्नुहोस्' : 'LAUNCH FULLSCREEN STROBE'}
          </button>
        </div>

        {/* Tool 2: Loud 3kHz Rescue Whistle */}
        <div className="border border-[#262626] bg-[#111111] p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <Volume2 className="h-6 w-6 text-[#00E8FF]" />
              <span className="text-[10px] uppercase font-bold text-[#00E8FF] border border-[#00E8FF]/30 px-2 py-0.5">
                3000 Hz Audio
              </span>
            </div>
            <h2 className="font-display text-3xl text-white mt-2">
              {isNepaliLang ? 'उद्धार सिठ्ठी (ह्विसल)' : 'RESCUE WHISTLE'}
            </h2>
            <p className="text-xs text-[#8E8E8E] mt-1 leading-relaxed">
              {isNepaliLang
                ? 'भग्नावशेषभित्र फसेको बेला कराउनुभन्दा सिठ्ठी बजाउँदा शक्ति जोगिन्छ र आवाज धेरै टाढासम्म पुग्छ।'
                : 'Generates piercing 3,000Hz frequency tone. Carries further through collapsed rubble.'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => playWhistleSound(800)}
              className="bg-[#00E8FF] text-black py-3 font-display text-xl tracking-wider hover:bg-white transition-colors"
            >
              {isNepaliLang ? '१ पटक फुक्नुहोस्' : 'BLOW ONCE'}
            </button>
            <button
              onClick={() => {
                playWhistleSound(600);
                setTimeout(() => playWhistleSound(600), 800);
                setTimeout(() => playWhistleSound(600), 1600);
              }}
              className="border border-[#00E8FF] text-[#00E8FF] py-3 font-display text-xl tracking-wider hover:bg-[#00E8FF] hover:text-black transition-colors"
            >
              {isNepaliLang ? '३ पटक (संकट)' : '3 BLASTS (SOS)'}
            </button>
          </div>
        </div>

        {/* Tool 3: Continuous Audio Siren */}
        <div className="border border-[#262626] bg-[#111111] p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <Radio className="h-6 w-6 text-[#FF5A00]" />
              <span className="text-[10px] uppercase font-bold text-[#FF5A00] border border-[#FF5A00]/30 px-2 py-0.5">
                Oscillating Siren
              </span>
            </div>
            <h2 className="font-display text-3xl text-white mt-2">
              {isNepaliLang ? 'निरन्तर विपद् साइरन' : 'EMERGENCY SIREN'}
            </h2>
            <p className="text-xs text-[#8E8E8E] mt-1 leading-relaxed">
              {isNepaliLang
                ? 'गाउँ-टोलमा बाढी वा पहिरो आउँदा छिमेकीलाई सचेत गराउन चर्को साइरन ध्वनि बजाउनुहोस्।'
                : 'Plays continuous wailing siren tone using Web Audio to alert surrounding neighbors.'}
            </p>
          </div>

          <button
            onClick={toggleSiren}
            className={`w-full py-3 font-display text-xl tracking-wider transition-colors ${
              isSirenActive
                ? 'bg-[#FF2A00] text-white hover:bg-[#ff4924]'
                : 'bg-[#FF5A00] text-black hover:bg-white'
            }`}
          >
            {isSirenActive 
              ? (isNepaliLang ? 'साइरन बन्द गर्नुहोस्' : 'STOP SIREN')
              : (isNepaliLang ? 'साइरन बजाउनुहोस्' : 'START CONTINUOUS SIREN')}
          </button>
        </div>

        {/* Tool 4: Morse Code SOS Visual Flasher */}
        <div className="border border-[#262626] bg-[#111111] p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <ShieldAlert className="h-6 w-6 text-[#FF2A00]" />
              <span className="text-[10px] uppercase font-bold text-[#FF2A00] border border-[#FF2A00]/30 px-2 py-0.5">
                ... --- ...
              </span>
            </div>
            <h2 className="font-display text-3xl text-white mt-2">
              {isNepaliLang ? 'मोर्स कोड एसओएस' : 'MORSE CODE SOS'}
            </h2>
            <p className="text-xs text-[#8E8E8E] mt-1 leading-relaxed">
              {isNepaliLang
                ? 'अन्तर्राष्ट्रिय आपतकालीन संकेत (... --- ...) अनुसार स्क्रिनमा स्वचालित प्रकाश संकेत देखाउँछ।'
                : 'International standard SOS light pattern. 3 short, 3 long, 3 short pulses.'}
            </p>
          </div>

          {/* Mini preview box */}
          <div className={`h-10 border border-[#262626] flex items-center justify-center font-mono font-bold text-xs tracking-widest transition-colors ${
            morseFlash ? 'bg-white text-black' : 'bg-[#181818] text-[#8E8E8E]'
          }`}>
            {isMorseActive ? (morseFlash ? 'FLASH ON' : 'PAUSE') : 'INACTIVE'}
          </div>

          <button
            onClick={() => setIsMorseActive(!isMorseActive)}
            className={`w-full py-3 font-display text-xl tracking-wider transition-colors ${
              isMorseActive
                ? 'bg-[#FF2A00] text-white hover:bg-[#ff4924]'
                : 'border border-[#FF2A00] text-[#FF2A00] hover:bg-[#FF2A00] hover:text-black'
            }`}
          >
            {isMorseActive 
              ? (isNepaliLang ? 'मोर्स बन्द गर्नुहोस्' : 'STOP MORSE SOS')
              : (isNepaliLang ? 'मोर्स सुरु गर्नुहोस्' : 'START MORSE SOS')}
          </button>
        </div>
      </div>

      {/* GPS Location & Coordinate Dispatcher */}
      <div className="border border-[#262626] bg-[#111111] p-5 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#262626] pb-3">
          <div className="flex items-center gap-2">
            <Compass className="h-5 w-5 text-[#E8FF00]" />
            <h3 className="font-display text-2xl text-white">
              {isNepaliLang ? 'जीपीएस स्थान तथा उद्धार समन्वय' : 'OFFLINE GPS RESCUE CARD'}
            </h3>
          </div>
          <span className="text-xs text-[#22C55E]">
            {isNepaliLang ? 'इन्टरनेट नहुँदा पनि जीपीएस चल्छ' : 'Works without active cellular data'}
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 bg-[#161616] p-4 border border-[#262626]">
          <div>
            <div className="text-xs uppercase text-[#8E8E8E]">
              {isNepaliLang ? 'तपाईंको हालको अक्षांश र देशान्तर:' : 'Current Coordinates:'}
            </div>
            <div className="font-display text-3xl sm:text-4xl text-white font-mono mt-1">
              {coords ? (
                <span>
                  {fmt(coords.lat)}° N, {fmt(coords.lng)}° E
                </span>
              ) : (
                '27.7172° N, 85.3240° E'
              )}
            </div>
            <div className="text-xs text-[#8E8E8E] mt-0.5">
              Kathmandu Valley Reference / Sensor GPS
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleCopyLocation}
              className="flex items-center gap-2 bg-[#E8FF00] text-black px-4 py-2.5 font-display text-lg tracking-wider hover:bg-white transition-colors"
            >
              {copiedLoc ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span>{copiedLoc ? (isNepaliLang ? 'कपी भयो' : 'COPIED') : (isNepaliLang ? 'जीपीएस कपी' : 'COPY GPS SMS')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
