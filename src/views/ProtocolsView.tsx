import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Droplets, 
  Mountain, 
  Flame, 
  Zap, 
  Snowflake, 
  Waves,
  ArrowRight,
  Phone,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  MapPin
} from 'lucide-react';
import { DisasterType } from '../types';
import { PROTOCOLS } from '../data/nepaliProtocols';
import { NEPAL_SAFE_ZONES } from '../data/nepaliSafeZones';
import { toNepaliNumerals } from '../utils/nepaliNumbers';

interface ProtocolsViewProps {
  initialType?: DisasterType;
  onSelectView: (view: string) => void;
  onSelectZone: (zoneId: string) => void;
  useNepaliDigits: boolean;
  isNepaliLang: boolean;
}

export const ProtocolsView: React.FC<ProtocolsViewProps> = ({
  initialType = 'earthquake',
  onSelectView,
  onSelectZone,
  useNepaliDigits,
  isNepaliLang,
}) => {
  const [selectedType, setSelectedType] = useState<DisasterType>(initialType);

  const fmt = (val: string | number) => (useNepaliDigits ? toNepaliNumerals(val) : String(val));

  const disasterTabs: { type: DisasterType; labelEn: string; labelNe: string; icon: React.ElementType }[] = [
    { type: 'earthquake', labelEn: 'Earthquake', labelNe: 'भूकम्प', icon: ShieldAlert },
    { type: 'flood', labelEn: 'Flood', labelNe: 'बाढी / डुबान', icon: Droplets },
    { type: 'landslide', labelEn: 'Landslide', labelNe: 'पहिरो', icon: Mountain },
    { type: 'fire', labelEn: 'Fire', labelNe: 'आगलागी', icon: Flame },
    { type: 'lightning', labelEn: 'Lightning', labelNe: 'चट्याङ', icon: Zap },
    { type: 'coldwave', labelEn: 'Cold Wave', labelNe: 'शीतलहर', icon: Snowflake },
    { type: 'glof', labelEn: 'GLOF', labelNe: 'हिमताल विस्फोट', icon: Waves },
  ];

  const currentProtocol = PROTOCOLS[selectedType];
  const matchingSafeZones = NEPAL_SAFE_ZONES.filter(z => z.applicableDisasters.includes(selectedType));

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Title */}
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-widest text-[#8E8E8E]">
          {isNepaliLang ? 'आपतकालीन जीवनरक्षा निर्देशिका' : 'Emergency Survival Protocols'}
        </div>
        <h1 className="font-display text-4xl sm:text-6xl tracking-wide text-white mt-1">
          {isNepaliLang ? 'विपद् कार्यविधि' : 'DISASTER PROTOCOLS'}
        </h1>
        <p className="text-sm text-[#8E8E8E] max-w-xl mt-1">
          {isNepaliLang
            ? 'विपद्को प्रकार अनुसार तुरुन्त अपनाउनुपर्ने प्रमाणित नियमहरू। इन्टरनेट नहुँदा पनि यो अफलाइन चल्दछ।'
            : 'Immediate, high-contrast actions for Himalayan terrain, river corridors, and urban areas in Nepal.'}
        </p>
      </div>

      {/* Disaster Selector Tabs */}
      <div className="flex overflow-x-auto gap-2 border-b border-[#262626] pb-3 no-scrollbar">
        {disasterTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = selectedType === tab.type;
          return (
            <button
              key={tab.type}
              onClick={() => setSelectedType(tab.type)}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border min-h-[44px] ${
                isActive
                  ? 'border-[#E8FF00] bg-[#E8FF00] text-black font-bold'
                  : 'border-[#262626] bg-[#111111] text-[#8E8E8E] hover:text-white hover:border-[#383838]'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{isNepaliLang ? tab.labelNe : tab.labelEn}</span>
            </button>
          );
        })}
      </div>

      {/* Protocol Header Card */}
      <div className="border border-[#262626] bg-[#111111] p-5 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#E8FF00]">
              {currentProtocol.code} · {isNepaliLang ? 'आधिकारिक कार्यविधि' : 'Standard Protocol'}
            </div>
            <h2 className="font-display text-5xl sm:text-7xl tracking-wide text-white mt-1">
              {isNepaliLang ? currentProtocol.nepaliTitle : currentProtocol.title}
            </h2>
            <div className="text-sm sm:text-base font-semibold text-[#8E8E8E] uppercase tracking-wider mt-1">
              {isNepaliLang ? currentProtocol.nepaliTag : currentProtocol.tag}
            </div>
          </div>

          <div className="flex gap-2">
            <a
              href="tel:100"
              className="flex items-center gap-1.5 bg-[#FF2A00] px-4 py-2 text-xs sm:text-sm font-display tracking-wider text-white hover:bg-[#ff4d29] transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>{isNepaliLang ? 'प्रहरी १००' : 'POLICE 100'}</span>
            </a>
            <a
              href="tel:102"
              className="flex items-center gap-1.5 border border-[#00E8FF] bg-[#00E8FF]/10 text-[#00E8FF] px-4 py-2 text-xs sm:text-sm font-display tracking-wider hover:bg-[#00E8FF] hover:text-black transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>{isNepaliLang ? 'एम्बुलेन्स १०२' : 'AMBULANCE 102'}</span>
            </a>
          </div>
        </div>

        <p className="mt-4 text-sm text-[#8E8E8E] max-w-3xl leading-relaxed">
          {isNepaliLang ? currentProtocol.nepaliSummary : currentProtocol.summary}
        </p>
      </div>

      {/* DO THIS NOW Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-[#262626] pb-2">
          <div className="font-display text-3xl sm:text-4xl tracking-wide text-[#E8FF00]">
            {isNepaliLang ? 'अहिले तत्काल गर्नुहोस्' : 'DO THIS NOW'}
          </div>
          <span className="text-xs text-[#8E8E8E]">
            {isNepaliLang ? 'प्राथमिकता क्रम' : 'Sequential actions'}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {currentProtocol.now.map((step, idx) => (
            <div
              key={idx}
              className="border border-[#262626] bg-[#121212] p-4 sm:p-5 flex items-start gap-4 transition-transform hover:-translate-y-0.5"
            >
              <div 
                className="font-display text-4xl sm:text-5xl leading-none w-14 shrink-0 font-mono"
                style={{ color: currentProtocol.accent }}
              >
                {useNepaliDigits ? step.nepaliN : step.n}
              </div>
              <div className="flex-1">
                <h3 className="font-display text-2xl sm:text-3xl text-white leading-tight">
                  {isNepaliLang ? step.nepaliTitle : step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#8E8E8E] leading-relaxed mt-1.5">
                  {isNepaliLang ? step.nepaliDesc : step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* THEN vs DO NOT 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* THEN */}
        <div className="border border-[#262626] bg-[#111111] p-5">
          <div className="flex items-center gap-2 font-display text-2xl text-[#22C55E]">
            <CheckCircle2 className="h-5 w-5" />
            <span>{isNepaliLang ? 'त्यसपछि गर्नुपर्ने कामहरू' : 'IMMEDIATELY AFTER'}</span>
          </div>
          <ul className="mt-3 space-y-2.5 text-xs sm:text-sm text-[#F6F3EC]/90">
            {currentProtocol.then.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#22C55E] font-bold">▸</span>
                <span>{isNepaliLang ? item.ne : item.en}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* DO NOT */}
        <div className="border border-[#262626] bg-[#111111] p-5">
          <div className="flex items-center gap-2 font-display text-2xl text-[#FF2A00]">
            <XCircle className="h-5 w-5" />
            <span>{isNepaliLang ? 'के नगर्ने (कडा निषेध)' : 'STRICTLY AVOID'}</span>
          </div>
          <ul className="mt-3 space-y-2.5 text-xs sm:text-sm text-[#F6F3EC]/90">
            {currentProtocol.donts.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#FF2A00] font-bold">✕</span>
                <span>{isNepaliLang ? item.ne : item.en}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Nepal Context Specific Advisory */}
      <div className="border-l-4 border-[#E8FF00] bg-[#141414] p-5 border border-[#262626]">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E8FF00]">
          <AlertTriangle className="h-4 w-4" />
          <span>{isNepaliLang ? 'नेपालको भूगोल तथा परिवेश अनुसार विशेष सल्लाह' : 'Nepal Topography & Rural Context'}</span>
        </div>
        <p className="text-sm text-white mt-2 leading-relaxed">
          {isNepaliLang ? currentProtocol.nepalContextTip.ne : currentProtocol.nepalContextTip.en}
        </p>
      </div>

      {/* Matching Safe Zones Quick Cards */}
      <div>
        <div className="flex items-center justify-between border-b border-[#262626] pb-2 mb-3">
          <h3 className="font-display text-2xl sm:text-3xl tracking-wide text-white">
            {isNepaliLang ? 'यस विपद्का लागि सुरक्षित खुला स्थानहरू' : 'SUITABLE OPEN SAFE ZONES'}
          </h3>
          <button
            onClick={() => onSelectView('safezones')}
            className="flex items-center gap-1 text-xs text-[#E8FF00] hover:underline"
          >
            <span>{isNepaliLang ? 'सम्पूर्ण नक्सा' : 'Full Map'}</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {matchingSafeZones.slice(0, 3).map((zone) => (
            <button
              key={zone.id}
              onClick={() => {
                onSelectZone(zone.id);
                onSelectView('safezones');
              }}
              className="border border-[#262626] bg-[#111111] p-4 text-left hover:border-[#E8FF00] transition-colors group"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="font-display text-xl text-white group-hover:text-[#E8FF00]">
                    {isNepaliLang ? zone.nepaliName : zone.name}
                  </div>
                  <div className="text-xs text-[#8E8E8E] mt-0.5">
                    {zone.address} · {zone.district}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-[#E8FF00] font-mono">
                    {fmt(zone.distance)}
                  </span>
                </div>
              </div>
              <div className="mt-2 text-[11px] text-[#8E8E8E]">
                {isNepaliLang ? 'क्षमता:' : 'Capacity:'} {isNepaliLang ? zone.nepaliCapacity : zone.capacity}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
