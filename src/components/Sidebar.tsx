import React from 'react';
import { 
  Home, 
  BookOpen, 
  PhoneCall, 
  Binary, 
  MapPin, 
  CheckSquare, 
  HeartPulse, 
  BellRing, 
  Wrench,
  ShieldAlert,
  Radio
} from 'lucide-react';
import { toNepaliNumerals } from '../utils/nepaliNumbers';

interface SidebarProps {
  currentView: string;
  onSelectView: (view: string) => void;
  useNepaliDigits: boolean;
  isNepaliLang: boolean;
  onOpenSOS: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  useNepaliDigits,
  isNepaliLang,
  onOpenSOS,
}) => {
  const fmt = (val: string | number) => (useNepaliDigits ? toNepaliNumerals(val) : String(val));

  const navItems = [
    { id: 'home', labelEn: 'Overview & Quick Hub', labelNe: 'गृहपृष्ठ तथा सारांश', icon: Home },
    { id: 'protocols', labelEn: 'Disaster Protocols (7)', labelNe: 'विपद् निर्देशिका (७)', icon: BookOpen },
    { id: 'directory', labelEn: 'Nepali Emergency Directory', labelNe: 'नेपाली आपतकालीन नम्बर', icon: PhoneCall },
    { id: 'numbers', labelEn: 'Nepali Number Converter', labelNe: 'नेपाली अंक र डायलर', icon: Binary },
    { id: 'safezones', labelEn: 'Open Spaces & Safe Zones', labelNe: 'सुरक्षित खुला चौरहरू', icon: MapPin },
    { id: 'readiness', labelEn: '72h Go-Bag Checklist', labelNe: 'विपद् झोला जाँचसूची', icon: CheckSquare },
    { id: 'firstaid', labelEn: 'Emergency First Aid & CPR', labelNe: 'प्राथमिक उपचार तथा CPR', icon: HeartPulse },
    { id: 'alerts', labelEn: 'Live Bulletins & Incident Log', labelNe: 'ताजा सतर्कता तथा प्रतिवेदन', icon: BellRing },
    { id: 'toolkit', labelEn: 'Emergency SOS Toolkit', labelNe: 'आपतकालीन टुलकिट र साइरन', icon: Wrench },
  ];

  return (
    <aside className="hidden lg:flex fixed inset-y-0 left-0 z-30 w-72 flex-col border-r border-[#262626] bg-[#090909]">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#262626]">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center bg-[#E8FF00] font-display text-2xl text-black">
            SP
          </div>
          <div>
            <div className="font-display text-2xl tracking-wider text-white">
              SAFEPATH
            </div>
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#8E8E8E]">
              <span className="inline-block h-2 w-2 rounded-full bg-[#22C55E] animate-ping" />
              <span>{isNepaliLang ? 'नेपाल आपतकालीन प्रणाली' : 'Nepal Emergency OS'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectView(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-left text-sm transition-all min-h-[44px] ${
                isActive
                  ? 'bg-[#E8FF00] text-black font-semibold'
                  : 'text-[#8E8E8E] hover:bg-[#141414] hover:text-white'
              }`}
            >
              <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-black' : 'text-[#8E8E8E]'}`} />
              <span className="truncate">
                {isNepaliLang ? item.labelNe : item.labelEn}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Quick Toll-Free Hotlines Ticker */}
      <div className="border-t border-[#262626] p-4 bg-[#0d0d0d]">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#8E8E8E] mb-2">
          <span>{isNepaliLang ? 'द्रुत नम्बरहरू' : 'Instant Hotlines'}</span>
          <span className="text-[#22C55E]">24/7 Free</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <a
            href="tel:100"
            className="flex items-center justify-between border border-[#262626] bg-[#141414] p-2 hover:border-[#FF2A00] transition-colors"
          >
            <span className="text-[#8E8E8E]">{isNepaliLang ? 'प्रहरी' : 'Police'}</span>
            <span className="font-bold text-[#FF2A00] font-mono">{fmt(100)}</span>
          </a>
          <a
            href="tel:102"
            className="flex items-center justify-between border border-[#262626] bg-[#141414] p-2 hover:border-[#00E8FF] transition-colors"
          >
            <span className="text-[#8E8E8E]">{isNepaliLang ? 'एम्बुलेन्स' : 'Amb.'}</span>
            <span className="font-bold text-[#00E8FF] font-mono">{fmt(102)}</span>
          </a>
          <a
            href="tel:101"
            className="flex items-center justify-between border border-[#262626] bg-[#141414] p-2 hover:border-[#FF5A00] transition-colors"
          >
            <span className="text-[#8E8E8E]">{isNepaliLang ? 'दमकल' : 'Fire'}</span>
            <span className="font-bold text-[#FF5A00] font-mono">{fmt(101)}</span>
          </a>
          <a
            href="tel:1155"
            className="flex items-center justify-between border border-[#262626] bg-[#141414] p-2 hover:border-[#E8FF00] transition-colors"
          >
            <span className="text-[#8E8E8E]">{isNepaliLang ? 'विपद्' : 'NEOC'}</span>
            <span className="font-bold text-[#E8FF00] font-mono">{fmt(1155)}</span>
          </a>
        </div>

        {/* SOS Action Button */}
        <button
          onClick={onOpenSOS}
          className="mt-3 w-full bg-[#FF2A00] py-3 text-center font-display text-2xl tracking-wider text-white hover:bg-[#ff4924] sos-beacon transition-colors"
        >
          SOS · {fmt(100)} / {fmt(102)}
        </button>
      </div>
    </aside>
  );
};
