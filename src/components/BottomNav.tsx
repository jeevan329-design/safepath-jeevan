import React from 'react';
import { Home, BookOpen, PhoneCall, MapPin, Wrench, CheckSquare, HeartPulse } from 'lucide-react';

interface BottomNavProps {
  currentView: string;
  onSelectView: (view: string) => void;
  isNepaliLang: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentView,
  onSelectView,
  isNepaliLang,
}) => {
  const items = [
    { id: 'home', labelEn: 'Home', labelNe: 'गृहपृष्ठ', icon: Home },
    { id: 'protocols', labelEn: 'Guides', labelNe: 'निर्देशिका', icon: BookOpen },
    { id: 'directory', labelEn: 'Hotlines', labelNe: 'नम्बरहरू', icon: PhoneCall },
    { id: 'safezones', labelEn: 'Zones', labelNe: 'चौर/स्थान', icon: MapPin },
    { id: 'toolkit', labelEn: 'Tools', labelNe: 'टुलकिट', icon: Wrench },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 lg:hidden border-t border-[#262626] bg-[#070707]/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-5 h-16">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectView(item.id)}
              className={`flex flex-col items-center justify-center min-h-[44px] gap-1 transition-colors ${
                isActive
                  ? 'text-[#E8FF00]'
                  : 'text-[#8E8E8E] hover:text-[#F6F3EC]'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-medium tracking-tight">
                {isNepaliLang ? item.labelNe : item.labelEn}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
