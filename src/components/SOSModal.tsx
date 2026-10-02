import React, { useState, useEffect } from 'react';
import { Phone, ShieldAlert, Copy, Check, MapPin, X } from 'lucide-react';
import { toNepaliNumerals } from '../utils/nepaliNumbers';

interface SOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  useNepaliDigits: boolean;
  isNepaliLang: boolean;
}

export const SOSModal: React.FC<SOSModalProps> = ({
  isOpen,
  onClose,
  useNepaliDigits,
  isNepaliLang,
}) => {
  const [copied, setCopied] = useState<string | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number; accuracy?: number } | null>(null);
  const [locLoading, setLocLoading] = useState(false);

  useEffect(() => {
    if (isOpen && navigator.geolocation) {
      setLocLoading(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({
            lat: Number(pos.coords.latitude.toFixed(5)),
            lng: Number(pos.coords.longitude.toFixed(5)),
            accuracy: Math.round(pos.coords.accuracy),
          });
          setLocLoading(false);
        },
        () => {
          // Fallback to Kathmandu Valley coordinates if GPS not granted
          setCoords({ lat: 27.7172, lng: 85.3240, accuracy: 25 });
          setLocLoading(false);
        },
        { timeout: 6000, enableHighAccuracy: true }
      );
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const fmt = (val: string | number) => (useNepaliDigits ? toNepaliNumerals(val) : String(val));

  const handleCopyMessage = (type: 'safe' | 'rescue') => {
    const locText = coords 
      ? ` (GPS: ${coords.lat}, ${coords.lng} - https://maps.google.com/?q=${coords.lat},${coords.lng})`
      : ' (Location: Nepal)';

    const text = type === 'safe'
      ? (isNepaliLang 
          ? `म सुरक्षित छु। म अहिले सुरक्षित स्थानमा छु र थप सहयोग चाहिँदैन।${locText}` 
          : `I am SAFE. I am in a secure location and do not need immediate assistance.${locText}`)
      : (isNepaliLang
          ? `आपतकालीन उद्धार चाहियो! म जोखिममा छु, तत्काल मद्दत पठाउनुहोस्!${locText}`
          : `EMERGENCY RESCUE NEEDED! I am in immediate danger, please dispatch help!${locText}`);

    navigator.clipboard.writeText(text).then(() => {
      setCopied(type);
      setTimeout(() => setCopied(null), 3000);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-lg border-2 border-[#FF2A00] bg-[#0c0c0c] p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#262626] pb-4">
          <div className="flex items-center gap-2 text-[#FF2A00]">
            <ShieldAlert className="h-6 w-6 animate-pulse" />
            <h2 className="font-display text-3xl tracking-wide text-white">
              {isNepaliLang ? 'तत्काल आपतकालीन सेवा' : 'EMERGENCY ACTION'}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center text-[#8E8E8E] hover:text-white"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="mt-3 text-sm text-[#8E8E8E] leading-relaxed">
          {isNepaliLang
            ? 'जीवन जोखिममा परेको अवस्थामा मात्र डायल गर्नुहोस्। तलका नम्बरहरू चौबीसै घण्टा निःशुल्क उपलब्ध छन्।'
            : 'For life-threatening emergencies only. Tapping will open your phone dialer. All hotlines are 24/7 toll-free.'}
        </p>

        {/* 4 Primary Nepal Emergency Hotlines */}
        <div className="mt-5 grid grid-cols-2 gap-2.5">
          <a
            href="tel:100"
            className="group flex flex-col justify-between border-2 border-[#FF2A00] bg-[#FF2A00]/10 p-3 hover:bg-[#FF2A00] hover:text-black transition-colors"
          >
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#8E8E8E] group-hover:text-black">
              {isNepaliLang ? 'प्रहरी सहायता' : 'Nepal Police'}
            </div>
            <div className="font-display text-4xl leading-none text-[#FF2A00] group-hover:text-black mt-2">
              {fmt(100)}
            </div>
            <div className="text-[10px] uppercase tracking-wider mt-1 text-[#8E8E8E] group-hover:text-black flex items-center gap-1">
              <Phone className="h-3 w-3" /> {isNepaliLang ? 'डायल गर्नुहोस्' : 'Call 100'}
            </div>
          </a>

          <a
            href="tel:102"
            className="group flex flex-col justify-between border-2 border-[#00E8FF] bg-[#00E8FF]/10 p-3 hover:bg-[#00E8FF] hover:text-black transition-colors"
          >
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#8E8E8E] group-hover:text-black">
              {isNepaliLang ? 'एम्बुलेन्स' : 'Ambulance'}
            </div>
            <div className="font-display text-4xl leading-none text-[#00E8FF] group-hover:text-black mt-2">
              {fmt(102)}
            </div>
            <div className="text-[10px] uppercase tracking-wider mt-1 text-[#8E8E8E] group-hover:text-black flex items-center gap-1">
              <Phone className="h-3 w-3" /> {isNepaliLang ? 'डायल गर्नुहोस्' : 'Call 102'}
            </div>
          </a>

          <a
            href="tel:101"
            className="group flex flex-col justify-between border-2 border-[#FF5A00] bg-[#FF5A00]/10 p-3 hover:bg-[#FF5A00] hover:text-black transition-colors"
          >
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#8E8E8E] group-hover:text-black">
              {isNepaliLang ? 'दमकल / आगलागी' : 'Fire Brigade'}
            </div>
            <div className="font-display text-4xl leading-none text-[#FF5A00] group-hover:text-black mt-2">
              {fmt(101)}
            </div>
            <div className="text-[10px] uppercase tracking-wider mt-1 text-[#8E8E8E] group-hover:text-black flex items-center gap-1">
              <Phone className="h-3 w-3" /> {isNepaliLang ? 'डायल गर्नुहोस्' : 'Call 101'}
            </div>
          </a>

          <a
            href="tel:1155"
            className="group flex flex-col justify-between border-2 border-[#E8FF00] bg-[#E8FF00]/10 p-3 hover:bg-[#E8FF00] hover:text-black transition-colors"
          >
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#8E8E8E] group-hover:text-black">
              {isNepaliLang ? 'विपद् हटलाइन' : 'Disaster NEOC'}
            </div>
            <div className="font-display text-4xl leading-none text-[#E8FF00] group-hover:text-black mt-2">
              {fmt(1155)}
            </div>
            <div className="text-[10px] uppercase tracking-wider mt-1 text-[#8E8E8E] group-hover:text-black flex items-center gap-1">
              <Phone className="h-3 w-3" /> {isNepaliLang ? 'डायल गर्नुहोस्' : 'Call 1155'}
            </div>
          </a>
        </div>

        {/* GPS location preview */}
        <div className="mt-4 flex items-center justify-between border border-[#262626] bg-[#141414] px-3 py-2 text-xs text-[#8E8E8E]">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[#E8FF00]" />
            <span>
              {locLoading ? (
                isNepaliLang ? 'स्थान खोजिँदै...' : 'Acquiring GPS fix...'
              ) : coords ? (
                <span>
                  {isNepaliLang ? 'हालको जीपीएस:' : 'Current GPS:'}{' '}
                  <strong className="text-white font-mono tabular-nums">
                    {fmt(coords.lat)}°N, {fmt(coords.lng)}°E
                  </strong>
                </span>
              ) : (
                isNepaliLang ? 'स्थान उपलब्ध छैन' : 'Location unavailable'
              )}
            </span>
          </div>
          {coords && (
            <span className="text-[10px] uppercase text-[#22C55E]">
              {isNepaliLang ? 'सक्रिय' : 'Ready'}
            </span>
          )}
        </div>

        {/* Quick Family SMS Dispatch Buttons */}
        <div className="mt-4 space-y-2">
          <button
            onClick={() => handleCopyMessage('safe')}
            className="w-full flex items-center justify-center gap-2 border border-[#22C55E] bg-[#22C55E]/10 py-2.5 text-sm font-semibold text-[#22C55E] hover:bg-[#22C55E] hover:text-black transition-colors"
          >
            {copied === 'safe' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span>
              {copied === 'safe'
                ? (isNepaliLang ? 'सन्देश कपी भयो!' : 'Message Copied!')
                : (isNepaliLang ? 'म सुरक्षित छु (SMS कपी गर्नुहोस्)' : 'I AM SAFE — Copy Family Check-in SMS')}
            </span>
          </button>

          <button
            onClick={() => handleCopyMessage('rescue')}
            className="w-full flex items-center justify-center gap-2 border border-[#FF2A00] bg-[#FF2A00] py-2.5 text-sm font-semibold text-black hover:bg-[#ff4d29] transition-colors"
          >
            {copied === 'rescue' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span>
              {copied === 'rescue'
                ? (isNepaliLang ? 'उद्धार सन्देश कपी भयो!' : 'Rescue Alert Copied!')
                : (isNepaliLang ? 'तत्काल उद्धार चाहियो (SMS कपी गर्नुहोस्)' : 'NEED RESCUE — Copy GPS Alert SMS')}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
