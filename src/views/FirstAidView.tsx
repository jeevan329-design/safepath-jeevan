import React, { useState, useEffect, useRef } from 'react';
import { 
  HeartPulse, 
  Play, 
  Square, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Phone, 
  ShieldAlert, 
  Volume2 
} from 'lucide-react';
import { FirstAidTopic } from '../types';
import { FIRST_AID_TOPICS } from '../data/firstAidData';
import { playMetronomeBeep, toNepaliNumerals } from '../utils/nepaliNumbers';

interface FirstAidViewProps {
  useNepaliDigits: boolean;
  isNepaliLang: boolean;
}

export const FirstAidView: React.FC<FirstAidViewProps> = ({
  useNepaliDigits,
  isNepaliLang,
}) => {
  const [selectedTopicId, setSelectedTopicId] = useState(FIRST_AID_TOPICS[0].id);

  // CPR Metronome State
  const [isMetronomeActive, setIsMetronomeActive] = useState(false);
  const [bpm, setBpm] = useState(110); // Standard AHA/RedCross 100-120 bpm
  const [beatPulse, setBeatPulse] = useState(false);
  const timerRef = useRef<number | null>(null);

  const fmt = (val: string | number) => (useNepaliDigits ? toNepaliNumerals(val) : String(val));

  const currentTopic = FIRST_AID_TOPICS.find(t => t.id === selectedTopicId) || FIRST_AID_TOPICS[0];

  useEffect(() => {
    if (isMetronomeActive) {
      const intervalMs = (60 / bpm) * 1000;
      timerRef.current = window.setInterval(() => {
        playMetronomeBeep(true);
        setBeatPulse(true);
        setTimeout(() => setBeatPulse(false), 120);
      }, intervalMs);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isMetronomeActive, bpm]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title */}
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-widest text-[#8E8E8E]">
          {isNepaliLang ? 'तत्काल प्राथमिक उपचार निर्देशिका' : 'Offline Emergency First Aid'}
        </div>
        <h1 className="font-display text-4xl sm:text-6xl tracking-wide text-white mt-1">
          {isNepaliLang ? 'प्राथमिक उपचार तथा CPR' : 'FIRST AID & CPR'}
        </h1>
        <p className="text-sm text-[#8E8E8E] max-w-2xl mt-1">
          {isNepaliLang
            ? 'अस्पताल नपुगुञ्जेल घाइतेको ज्यान जोगाउन चालिनुपर्ने प्राथमिक कदमहरू। CPR मेट्रोनोम तालसहित पूर्ण अफलाइन उपलब्ध।'
            : 'Life-saving protocols for cardiac arrest, snakebites, severe bleeding, burns, and mountain sickness.'}
        </p>
      </div>

      {/* Topics Selector Tabs */}
      <div className="flex overflow-x-auto gap-2 border-b border-[#262626] pb-3 no-scrollbar">
        {FIRST_AID_TOPICS.map((topic) => (
          <button
            key={topic.id}
            onClick={() => {
              setSelectedTopicId(topic.id);
              if (topic.id !== 'cpr-resuscitation') setIsMetronomeActive(false);
            }}
            className={`px-3.5 py-2 text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border min-h-[44px] ${
              selectedTopicId === topic.id
                ? 'border-[#E8FF00] bg-[#E8FF00] text-black font-bold'
                : 'border-[#262626] bg-[#111111] text-[#8E8E8E] hover:text-white'
            }`}
          >
            {isNepaliLang ? topic.nepaliTitle.split('—')[0] : topic.title.split('(')[0]}
          </button>
        ))}
      </div>

      {/* Topic Content Card */}
      <div className="border border-[#262626] bg-[#111111] p-5 sm:p-7 space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#262626] pb-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#FF2A00]">
              {isNepaliLang ? 'तत्काल ज्यान बचाउने उपाय' : 'Immediate Life-Saving Protocol'}
            </div>
            <h2 className="font-display text-3xl sm:text-5xl text-white mt-1">
              {isNepaliLang ? currentTopic.nepaliTitle : currentTopic.title}
            </h2>
            <p className="text-sm text-[#8E8E8E] mt-2 max-w-2xl leading-relaxed">
              {currentTopic.summary}
            </p>
          </div>

          <a
            href="tel:102"
            className="flex items-center gap-1.5 bg-[#00E8FF] text-black px-4 py-2 font-display text-xl tracking-wider hover:bg-white transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span>{isNepaliLang ? 'एम्बुलेन्स १०२' : 'AMBULANCE 102'}</span>
          </a>
        </div>

        {/* CPR Audio/Visual Metronome Tool (If CPR topic selected) */}
        {currentTopic.hasMetronome && (
          <div className="border-2 border-[#E8FF00] bg-[#141414] p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-white">
                <HeartPulse className="h-6 w-6 text-[#FF2A00] animate-pulse" />
                <h3 className="font-display text-2xl tracking-wide">
                  {isNepaliLang ? 'सिपिएर मेट्रोनोम (११० गति/मिनेट)' : 'CPR CHEST COMPRESSION METRONOME'}
                </h3>
              </div>
              <div className="text-xs text-[#8E8E8E]">
                {isNepaliLang ? '१००–१२० प्रति मिनेटको गतिमा छाती थिच्नुहोस्' : 'Target: 100-120 compressions/min'}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-6 bg-[#0a0a0a] p-4 border border-[#262626]">
              {/* Pulsing Visual Chest Beacon */}
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-full border-4 transition-transform duration-100 ${
                    beatPulse
                      ? 'scale-125 border-[#FF2A00] bg-[#FF2A00] text-black shadow-lg shadow-[#FF2A00]/50'
                      : 'border-[#333] bg-[#161616] text-[#8E8E8E]'
                  }`}
                >
                  <HeartPulse className={`h-8 w-8 ${beatPulse ? 'text-black' : 'text-[#555]'}`} />
                </div>
                <div>
                  <div className="font-display text-3xl text-white font-mono">
                    {fmt(bpm)} <span className="text-xs font-sans text-[#8E8E8E]">BPM</span>
                  </div>
                  <div className="text-xs text-[#8E8E8E]">
                    {isMetronomeActive 
                      ? (isNepaliLang ? 'ताल जारी छ — यसै गतिमा थिच्नुहोस्' : 'Push hard & fast to this beat!')
                      : (isNepaliLang ? 'सुरु गर्न Start थिच्नुहोस्' : 'Click Start to listen to cadence')}
                  </div>
                </div>
              </div>

              {/* Start/Stop Button */}
              <button
                onClick={() => setIsMetronomeActive(!isMetronomeActive)}
                className={`flex items-center gap-2 px-6 py-3 font-display text-xl tracking-wider transition-colors min-h-[44px] ${
                  isMetronomeActive
                    ? 'bg-[#FF2A00] text-white hover:bg-[#ff4924]'
                    : 'bg-[#E8FF00] text-black hover:bg-white'
                }`}
              >
                {isMetronomeActive ? <Square className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                <span>
                  {isMetronomeActive 
                    ? (isNepaliLang ? 'रोक्नुहोस्' : 'STOP METRONOME') 
                    : (isNepaliLang ? 'ताल सुरु गर्नुहोस्' : 'START CPR METRONOME')}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Step-by-Step Instructions */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#E8FF00]">
            {isNepaliLang ? 'चरणबद्ध प्राथमिक उपचार विधि:' : 'Step-By-Step Emergency Action:'}
          </div>
          <div className="grid grid-cols-1 gap-2.5">
            {currentTopic.steps.map((st) => (
              <div
                key={st.stepNumber}
                className="border border-[#262626] bg-[#161616] p-4 flex items-start gap-4"
              >
                <div className="font-display text-3xl text-[#E8FF00] font-mono leading-none w-10 shrink-0">
                  {fmt(st.stepNumber)}
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-semibold text-white">
                    {isNepaliLang ? st.nepaliAction : st.action}
                  </h4>
                  {isNepaliLang && st.action && (
                    <p className="text-xs text-[#777] mt-0.5">{st.action}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What NOT to do (Critical Warnings) */}
        <div className="border border-[#FF2A00]/40 bg-[#FF2A00]/10 p-5">
          <div className="flex items-center gap-2 text-sm font-bold text-[#FF2A00] uppercase tracking-wider">
            <XCircle className="h-5 w-5" />
            <span>{isNepaliLang ? 'के कहिल्यै नगर्ने (घातक गल्तीहरू):' : 'CRITICAL WARNINGS — WHAT NOT TO DO:'}</span>
          </div>
          <ul className="mt-3 space-y-2 text-xs sm:text-sm text-[#F6F3EC]">
            {(isNepaliLang ? currentTopic.nepaliDonts : currentTopic.donts).map((d, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#FF2A00] font-bold">✕</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
