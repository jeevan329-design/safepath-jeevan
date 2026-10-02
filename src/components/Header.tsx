import React from 'react';
import { ShieldAlert, Languages } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onSelectView: (view: string) => void;
  useNepaliDigits: boolean;
  onToggleNepaliDigits: () => void;
  isNepaliLang: boolean;
  onToggleLanguage: () => void;
  onOpenSOS: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onSelectView,
  useNepaliDigits,
  onToggleNepaliDigits,
  isNepaliLang,
  onToggleLanguage,
  onOpenSOS,
}) => {
  const navLinks = [
    { id: 'home', labelEn: 'Overview', labelNe: 'गृहपृष्ठ' },
    { id: 'protocols', labelEn: 'Protocols', labelNe: 'विपद् निर्देशिका' },
    { id: 'directory', labelEn: 'Directory', labelNe: 'आपतकालीन नम्बर' },
    { id: 'numbers', labelEn: 'Nepali Num', labelNe: 'नेपाली अंक' },
    { id: 'safezones', labelEn: 'Safe Zones', labelNe: 'सुरक्षित चौर' },
    { id: 'readiness', labelEn: 'Readiness', labelNe: 'झोला तयारी' },
    { id: 'firstaid', labelEn: 'First Aid', labelNe: 'प्राथमिक उपचार' },
    { id: 'toolkit', labelEn: 'Toolkit', labelNe: 'टुलकिट' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#262626] bg-[#070707]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onSelectView('home')}
            className="flex items-center gap-2.5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E8FF00]"
          >
            <div className="flex h-9 w-9 items-center justify-center bg-[#E8FF00] text-black font-display text-xl font-bold">
              SP
            </div>
            <span className="font-display text-2xl tracking-wider text-white">
              SAFEPATH NEPAL
            </span>
          </button>
        </div>

        {/* Zone 2: 4-6 clean text navigation links (hidden on small screens, shown md+) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#8E8E8E]">
          {navLinks.slice(0, 6).map((link) => {
            const isActive = currentView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onSelectView(link.id)}
                className={`transition-colors whitespace-nowrap py-1 ${
                  isActive 
                    ? 'text-[#E8FF00] font-semibold border-b-2 border-[#E8FF00]' 
                    : 'hover:text-[#F6F3EC]'
                }`}
              >
                {isNepaliLang ? link.labelNe : link.labelEn}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Nepali Numerals Toggle */}
          <button
            onClick={onToggleNepaliDigits}
            title={useNepaliDigits ? 'Switch to English Digits (123)' : 'Switch to Nepali Numerals (१२३)'}
            className="flex items-center gap-1 border border-[#262626] bg-[#141414] px-2.5 py-1.5 text-xs font-semibold text-[#F6F3EC] hover:border-[#E8FF00] transition-colors"
          >
            <span className="text-[#8E8E8E] text-[10px]">अंक:</span>
            <span className={useNepaliDigits ? 'text-[#E8FF00]' : 'text-white'}>
              {useNepaliDigits ? '१२३' : '123'}
            </span>
          </button>

          {/* Language Toggle (EN / NE) */}
          <button
            onClick={onToggleLanguage}
            title="Toggle Language"
            className="flex items-center gap-1 border border-[#262626] bg-[#141414] px-2.5 py-1.5 text-xs font-medium text-[#F6F3EC] hover:border-[#E8FF00] transition-colors"
          >
            <Languages className="h-3.5 w-3.5 text-[#E8FF00]" />
            <span>{isNepaliLang ? 'नेपाली' : 'EN'}</span>
          </button>

          {/* SOS Hot Trigger */}
          <button
            onClick={onOpenSOS}
            className="flex items-center gap-1.5 bg-[#FF2A00] px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-display tracking-wider text-white hover:bg-[#ff4924] sos-beacon transition-colors"
          >
            <ShieldAlert className="h-4 w-4" />
            <span>SOS · 100</span>
          </button>
        </div>
      </div>
    </header>
  );
};
