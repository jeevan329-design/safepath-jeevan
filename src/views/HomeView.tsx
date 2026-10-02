import React from 'react';
import { 
  ShieldAlert, 
  MapPin, 
  PhoneCall, 
  CheckSquare, 
  Binary, 
  Flame, 
  Droplets, 
  Mountain, 
  Zap, 
  Snowflake, 
  Waves,
  HeartPulse,
  Radio,
  ArrowRight
} from 'lucide-react';
import { DisasterType } from '../types';
import { PROTOCOLS } from '../data/nepaliProtocols';
import { OFFICIAL_ADVISORIES } from '../data/alertsData';
import { toNepaliNumerals } from '../utils/nepaliNumbers';

interface HomeViewProps {
  onSelectView: (view: string) => void;
  onOpenEmergency: (type: DisasterType) => void;
  useNepaliDigits: boolean;
  isNepaliLang: boolean;
  completedPrepCount: number;
  totalPrepCount: number;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectView,
  onOpenEmergency,
  useNepaliDigits,
  isNepaliLang,
  completedPrepCount,
  totalPrepCount,
}) => {
  const fmt = (val: string | number) => (useNepaliDigits ? toNepaliNumerals(val) : String(val));

  const disasterList: { type: DisasterType; icon: React.ElementType; color: string; border: string; bg: string }[] = [
    { type: 'earthquake', icon: ShieldAlert, color: 'text-[#FF2A00]', border: 'border-[#FF2A00]', bg: 'hover:bg-[#FF2A00] hover:text-black' },
    { type: 'flood', icon: Droplets, color: 'text-[#00E8FF]', border: 'border-[#00E8FF]', bg: 'hover:bg-[#00E8FF] hover:text-black' },
    { type: 'landslide', icon: Mountain, color: 'text-[#E8FF00]', border: 'border-[#E8FF00]', bg: 'hover:bg-[#E8FF00] hover:text-black' },
    { type: 'fire', icon: Flame, color: 'text-[#FF5A00]', border: 'border-[#FF5A00]', bg: 'hover:bg-[#FF5A00] hover:text-black' },
    { type: 'lightning', icon: Zap, color: 'text-purple-400', border: 'border-purple-500', bg: 'hover:bg-purple-500 hover:text-black' },
    { type: 'coldwave', icon: Snowflake, color: 'text-sky-400', border: 'border-sky-500', bg: 'hover:bg-sky-500 hover:text-black' },
    { type: 'glof', icon: Waves, color: 'text-teal-400', border: 'border-teal-500', bg: 'hover:bg-teal-500 hover:text-black' },
  ];

  const criticalAlert = OFFICIAL_ADVISORIES.find(a => a.severity === 'critical') || OFFICIAL_ADVISORIES[0];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Live System Ready Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border border-[#262626] bg-[#0e0e0e] p-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#22C55E] animate-ping" />
          <span className="font-semibold uppercase tracking-wider text-[#22C55E]">
            {isNepaliLang ? 'सक्रिय प्रणाली' : 'SYSTEM LIVE'}
          </span>
          <span className="text-[#8E8E8E]">·</span>
          <span className="text-[#8E8E8E]">
            {isNepaliLang ? 'नेपाल आपतकालीन तयारी तथा उद्धार केन्द्र' : 'Nepal Disaster Ready · Offline First'}
          </span>
        </div>
        <button
          onClick={() => onSelectView('alerts')}
          className="flex items-center gap-1.5 text-[#E8FF00] hover:underline uppercase tracking-wider text-[11px] font-semibold"
        >
          <Radio className="h-3.5 w-3.5 animate-pulse" />
          <span>{isNepaliLang ? 'ताजा सतर्कता हेर्नुहोस्' : 'Active Bulletin'}</span>
        </button>
      </div>

      {/* Hero Headline */}
      <div className="space-y-3">
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl leading-[0.88] tracking-wide text-white">
          {isNepaliLang ? (
            <>
              के गर्ने, <span className="text-[#E8FF00]">कहाँ जाने?</span><br />
              सुरक्षित मार्ग पत्ता लगाउनुहोस्।
            </>
          ) : (
            <>
              KNOW WHAT TO DO.<br />
              <span className="text-[#E8FF00]">KNOW WHERE TO GO.</span>
            </>
          )}
        </h1>
        <p className="max-w-2xl text-base sm:text-lg text-[#8E8E8E] leading-relaxed">
          {isNepaliLang
            ? 'भूकम्प, बाढी, पहिरो, आगलागी र चट्याङमा जीवन रक्षाका तत्काल चालिनुपर्ने कदमहरू, नेपालका आधिकारिक आपतकालीन नम्बरहरू, सुरक्षित खुला चौर र प्राथमिक उपचार।'
            : 'Immediate survival guidance for earthquakes, floods, landslides, and fires in Nepal. Official emergency hotlines, designated open space safe zones, and offline first aid.'}
        </p>
      </div>

      {/* Critical Advisory Notice Strip */}
      {criticalAlert && (
        <div className="border-l-4 border-[#FF2A00] bg-[#FF2A00]/10 p-4 border border-[#262626]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#FF2A00]">
                {criticalAlert.agency} · {criticalAlert.timeAgo}
              </div>
              <div className="text-base font-bold text-white mt-0.5">
                {isNepaliLang ? criticalAlert.nepaliTitle : criticalAlert.title}
              </div>
              <p className="text-xs text-[#8E8E8E] mt-1 leading-relaxed">
                {isNepaliLang ? criticalAlert.nepaliSummary : criticalAlert.summary}
              </p>
            </div>
            <button
              onClick={() => onSelectView('alerts')}
              className="shrink-0 border border-[#FF2A00] bg-[#FF2A00] text-black px-3 py-1.5 text-xs font-bold hover:bg-[#ff4d29] transition-colors"
            >
              {isNepaliLang ? 'विस्तृत' : 'Details'}
            </button>
          </div>
        </div>
      )}

      {/* Select Emergency Section */}
      <div>
        <div className="flex items-end justify-between border-b border-[#262626] pb-2 mb-4">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl tracking-wide text-white">
              {isNepaliLang ? 'विपद् छनोट गर्नुहोस्' : 'SELECT EMERGENCY'}
            </h2>
            <div className="text-xs text-[#8E8E8E] mt-0.5">
              {isNepaliLang ? 'तत्काल अपनाउनुपर्ने नियम हेर्न ट्याप गर्नुहोस्' : 'Tap to open rapid action protocol'}
            </div>
          </div>
          <span className="text-[11px] font-mono uppercase text-[#E8FF00]">
            {fmt(disasterList.length)} {isNepaliLang ? 'निर्देशिका' : 'Guides'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {disasterList.map((item) => {
            const proto = PROTOCOLS[item.type];
            const Icon = item.icon;
            return (
              <button
                key={item.type}
                onClick={() => onOpenEmergency(item.type)}
                className={`group relative overflow-hidden border-2 ${item.border} bg-[#111111] p-5 text-left transition-all ${item.bg}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-display text-3xl sm:text-4xl leading-none">
                      {isNepaliLang ? proto.nepaliTitle : proto.title}
                    </div>
                    <div className="text-xs uppercase tracking-wider opacity-80 mt-1 font-medium">
                      {isNepaliLang ? proto.nepaliTag : proto.tag}
                    </div>
                    <div className="text-[11px] opacity-70 mt-2 line-clamp-2">
                      {isNepaliLang ? proto.nepaliSummary : proto.summary}
                    </div>
                  </div>
                  <Icon className={`h-8 w-8 shrink-0 ${item.color} group-hover:text-black transition-colors`} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Access Hotlines Row */}
      <div className="border border-[#262626] bg-[#111111] p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display text-2xl tracking-wide text-white">
              {isNepaliLang ? 'मुख्य आपतकालीन हटलाइन' : 'PRIORITY HOTLINES'}
            </h3>
            <div className="text-xs text-[#8E8E8E]">
              {isNepaliLang ? 'नेपालभर निःशुल्क डायल गर्नुहोस्' : 'Toll-free 24/7 emergency dispatch'}
            </div>
          </div>
          <button
            onClick={() => onSelectView('directory')}
            className="flex items-center gap-1 text-xs text-[#E8FF00] hover:underline"
          >
            <span>{isNepaliLang ? 'सबै नम्बरहरू' : 'All Numbers'}</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <a
            href="tel:100"
            className="border border-[#262626] bg-[#161616] p-3 text-left hover:border-[#FF2A00] transition-colors"
          >
            <div className="text-[11px] text-[#8E8E8E] uppercase tracking-wider">
              {isNepaliLang ? 'प्रहरी' : 'Police'}
            </div>
            <div className="font-display text-3xl text-[#FF2A00] mt-1">{fmt(100)}</div>
            <div className="text-[10px] text-[#8E8E8E] mt-0.5">{isNepaliLang ? 'सुरक्षा तथा घटना' : 'Incident'}</div>
          </a>

          <a
            href="tel:102"
            className="border border-[#262626] bg-[#161616] p-3 text-left hover:border-[#00E8FF] transition-colors"
          >
            <div className="text-[11px] text-[#8E8E8E] uppercase tracking-wider">
              {isNepaliLang ? 'एम्बुलेन्स' : 'Ambulance'}
            </div>
            <div className="font-display text-3xl text-[#00E8FF] mt-1">{fmt(102)}</div>
            <div className="text-[10px] text-[#8E8E8E] mt-0.5">{isNepaliLang ? 'केन्द्रीय स्वास्थ्य' : 'Medical'}</div>
          </a>

          <a
            href="tel:101"
            className="border border-[#262626] bg-[#161616] p-3 text-left hover:border-[#FF5A00] transition-colors"
          >
            <div className="text-[11px] text-[#8E8E8E] uppercase tracking-wider">
              {isNepaliLang ? 'दमकल' : 'Fire'}
            </div>
            <div className="font-display text-3xl text-[#FF5A00] mt-1">{fmt(101)}</div>
            <div className="text-[10px] text-[#8E8E8E] mt-0.5">{isNepaliLang ? 'अग्नि नियन्त्रण' : 'Fire service'}</div>
          </a>

          <a
            href="tel:1155"
            className="border border-[#262626] bg-[#161616] p-3 text-left hover:border-[#E8FF00] transition-colors"
          >
            <div className="text-[11px] text-[#8E8E8E] uppercase tracking-wider">
              {isNepaliLang ? 'विपद् पूर्वसूचना' : 'Disaster NEOC'}
            </div>
            <div className="font-display text-3xl text-[#E8FF00] mt-1">{fmt(1155)}</div>
            <div className="text-[10px] text-[#8E8E8E] mt-0.5">{isNepaliLang ? 'बाढी तथा नदी' : 'Flood/Basin'}</div>
          </a>
        </div>
      </div>

      {/* Feature Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <button
          onClick={() => onSelectView('safezones')}
          className="border border-[#262626] bg-[#111111] p-5 text-left hover:border-[#E8FF00] transition-colors group"
        >
          <div className="flex items-center justify-between text-[#8E8E8E] group-hover:text-[#E8FF00]">
            <span className="text-[11px] uppercase tracking-wider">
              {isNepaliLang ? 'सुरक्षित स्थान' : 'Evacuation'}
            </span>
            <MapPin className="h-4 w-4" />
          </div>
          <div className="font-display text-3xl text-white mt-2">
            {isNepaliLang ? 'खुला चौर नक्सा' : 'OPEN SPACES'}
          </div>
          <p className="text-xs text-[#8E8E8E] mt-1">
            {isNepaliLang ? 'टुँडिखेल, रङ्गशाला लगायत तोकिएका सुरक्षित क्षेत्र' : 'Tundikhel, Stadiums & High ground'}
          </p>
        </button>

        <button
          onClick={() => onSelectView('numbers')}
          className="border border-[#262626] bg-[#111111] p-5 text-left hover:border-[#E8FF00] transition-colors group"
        >
          <div className="flex items-center justify-between text-[#8E8E8E] group-hover:text-[#E8FF00]">
            <span className="text-[11px] uppercase tracking-wider">
              {isNepaliLang ? 'संख्या औजार' : 'Number Tool'}
            </span>
            <Binary className="h-4 w-4" />
          </div>
          <div className="font-display text-3xl text-white mt-2">
            {isNepaliLang ? 'नेपाली अंक र डायलर' : 'NEPALI NUMBERS'}
          </div>
          <p className="text-xs text-[#8E8E8E] mt-1">
            {isNepaliLang ? 'अंक रूपान्तरण, बोली तथा आपतकालीन टच डायलर' : 'Devanagari converter, audio & dialpad'}
          </p>
        </button>

        <button
          onClick={() => onSelectView('readiness')}
          className="border border-[#262626] bg-[#111111] p-5 text-left hover:border-[#E8FF00] transition-colors group"
        >
          <div className="flex items-center justify-between text-[#8E8E8E] group-hover:text-[#E8FF00]">
            <span className="text-[11px] uppercase tracking-wider">
              {isNepaliLang ? 'तयारी स्थिति' : 'Checklist'}
            </span>
            <CheckSquare className="h-4 w-4" />
          </div>
          <div className="font-display text-3xl text-white mt-2">
            {isNepaliLang ? '७२ घण्टे झोला' : 'GO-BAG READINESS'}
          </div>
          <p className="text-xs text-[#8E8E8E] mt-1">
            {fmt(completedPrepCount)} / {fmt(totalPrepCount)} {isNepaliLang ? 'सामग्री पूरा भयो' : 'items prepared'}
          </p>
        </button>

        <button
          onClick={() => onSelectView('firstaid')}
          className="border border-[#262626] bg-[#111111] p-5 text-left hover:border-[#E8FF00] transition-colors group"
        >
          <div className="flex items-center justify-between text-[#8E8E8E] group-hover:text-[#E8FF00]">
            <span className="text-[11px] uppercase tracking-wider">
              {isNepaliLang ? 'जीवन रक्षा' : 'Life Saving'}
            </span>
            <HeartPulse className="h-4 w-4" />
          </div>
          <div className="font-display text-3xl text-white mt-2">
            {isNepaliLang ? 'प्राथमिक उपचार र CPR' : 'FIRST AID & CPR'}
          </div>
          <p className="text-xs text-[#8E8E8E] mt-1">
            {isNepaliLang ? 'सर्पदंश, रक्तस्राव र मेट्रोनिम तालसहित CPR' : 'Snakebite, bleeding & CPR metronome'}
          </p>
        </button>
      </div>
    </div>
  );
};
