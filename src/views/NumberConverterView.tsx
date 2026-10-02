import React, { useState } from 'react';
import { 
  Binary, 
  Phone, 
  Delete, 
  RotateCcw, 
  Copy, 
  Check, 
  Volume2, 
  BookOpen, 
  Layers 
} from 'lucide-react';
import { 
  toNepaliNumerals, 
  toEnglishNumerals, 
  integerToNepaliWords, 
  playKeypressTone, 
  playWhistleSound 
} from '../utils/nepaliNumbers';

interface NumberConverterViewProps {
  useNepaliDigits: boolean;
  isNepaliLang: boolean;
}

export const NumberConverterView: React.FC<NumberConverterViewProps> = ({
  useNepaliDigits,
  isNepaliLang,
}) => {
  // Input for live converter
  const [inputValue, setInputValue] = useState('1155');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Dialpad state
  const [dialedNumber, setDialedNumber] = useState('');

  const nepaliResult = toNepaliNumerals(inputValue);
  const englishResult = toEnglishNumerals(inputValue);
  const numericVal = parseInt(englishResult.replace(/[^0-9]/g, ''), 10);
  const nepaliWords = !isNaN(numericVal) ? integerToNepaliWords(numericVal) : '';

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    });
  };

  const handleKeypadPress = (char: string) => {
    playKeypressTone(char);
    setDialedNumber((prev) => prev + char);
  };

  const handleBackspace = () => {
    setDialedNumber((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setDialedNumber('');
  };

  const handleQuickPreset = (num: string) => {
    setDialedNumber(num);
    playKeypressTone('1');
  };

  const keypadDigits = [
    { ne: '१', en: '1' },
    { ne: '२', en: '2' },
    { ne: '३', en: '3' },
    { ne: '४', en: '4' },
    { ne: '५', en: '5' },
    { ne: '६', en: '6' },
    { ne: '७', en: '7' },
    { ne: '८', en: '8' },
    { ne: '९', en: '9' },
    { ne: '*', en: '*' },
    { ne: '०', en: '0' },
    { ne: '#', en: '#' },
  ];

  const quickHotlines = [
    { name: isNepaliLang ? 'प्रहरी' : 'Police', num: '100', neNum: '१००' },
    { name: isNepaliLang ? 'एम्बुलेन्स' : 'Amb.', num: '102', neNum: '१०२' },
    { name: isNepaliLang ? 'दमकल' : 'Fire', num: '101', neNum: '१०१' },
    { name: isNepaliLang ? 'विपद्' : 'NEOC', num: '1155', neNum: '११५५' },
    { name: isNepaliLang ? 'सशस्त्र' : 'APF', num: '1114', neNum: '१११४' },
    { name: isNepaliLang ? 'महिला' : 'Women', num: '1145', neNum: '११४५' },
    { name: isNepaliLang ? 'बालबालिका' : 'Child', num: '1098', neNum: '१०९८' },
  ];

  const digitsReference = [
    { en: '0', ne: '०', word: 'शून्य', phonetic: 'Shunya' },
    { en: '1', ne: '१', word: 'एक', phonetic: 'Ek' },
    { en: '2', ne: '२', word: 'दुई', phonetic: 'Dui' },
    { en: '3', ne: '३', word: 'तीन', phonetic: 'Teen' },
    { en: '4', ne: '४', word: 'चार', phonetic: 'Chaar' },
    { en: '5', ne: '५', word: 'पाँच', phonetic: 'Paanch' },
    { en: '6', ne: '६', word: 'छ', phonetic: 'Chha' },
    { en: '7', ne: '७', word: 'सात', phonetic: 'Saat' },
    { en: '8', ne: '८', word: 'आठ', phonetic: 'Aath' },
    { en: '9', ne: '९', word: 'नौ', phonetic: 'Nau' },
    { en: '10', ne: '१०', word: 'दश', phonetic: 'Dasha' },
    { en: '100', ne: '१००', word: 'एक सय', phonetic: 'Ek Say' },
    { en: '1,000', ne: '१,०००', word: 'एक हजार', phonetic: 'Ek Hajar' },
    { en: '1,00,000', ne: '१,००,०००', word: 'एक लाख', phonetic: 'Ek Lakh' },
    { en: '1,00,00,000', ne: '१,००,००,०००', word: 'एक करोड', phonetic: 'Ek Crore' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-widest text-[#8E8E8E]">
          {isNepaliLang ? 'नेपाली देवनागरी अंक उपकरण' : 'Devanagari Numerals & Touch Dialpad'}
        </div>
        <h1 className="font-display text-4xl sm:text-6xl tracking-wide text-white mt-1">
          {isNepaliLang ? 'नेपाली अंक र डायलर' : 'NEPALI NUMBERS & DIALER'}
        </h1>
        <p className="text-sm text-[#8E8E8E] max-w-2xl mt-1">
          {isNepaliLang
            ? 'अंग्रेजी र नेपाली अंकबीच तत्काल रूपान्तरण, संख्याको नेपाली अक्षर (शब्द) तथा देवनागरी टच डायलर।'
            : 'Convert between English digits and Nepali Devanagari numerals with spoken words and touch dialer.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Live Converter & Nepali Words (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="border border-[#262626] bg-[#111111] p-5 sm:p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[#262626] pb-3">
              <h2 className="font-display text-2xl tracking-wide text-white flex items-center gap-2">
                <Binary className="h-5 w-5 text-[#E8FF00]" />
                <span>{isNepaliLang ? 'संख्या रूपान्तरण' : 'LIVE CONVERTER'}</span>
              </h2>
              <span className="text-[11px] uppercase tracking-wider text-[#8E8E8E]">
                {isNepaliLang ? 'कुनै पनि अंक टाइप गर्नुहोस्' : 'Real-time conversion'}
              </span>
            </div>

            {/* Input Field */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#8E8E8E] mb-1.5">
                {isNepaliLang ? 'संख्या वा फोन नम्बर प्रविष्ट गर्नुहोस्:' : 'Enter any number or phone:'}
              </label>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="12345 or १२३४५"
                className="w-full bg-[#181818] border-2 border-[#262626] px-4 py-3 font-mono text-xl text-white placeholder-[#555] focus:border-[#E8FF00] focus:outline-none"
              />
            </div>

            {/* Converted Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {/* Nepali Devanagari Card */}
              <div className="border border-[#262626] bg-[#161616] p-4 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-[#8E8E8E]">
                    {isNepaliLang ? 'नेपाली अंक (देवनागरी)' : 'Nepali Numerals'}
                  </div>
                  <div className="font-display text-3xl sm:text-4xl text-[#E8FF00] mt-1 font-mono break-all">
                    {nepaliResult || '—'}
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(nepaliResult, 'nepali')}
                  className="mt-3 flex items-center justify-center gap-1.5 border border-[#262626] py-1.5 text-xs text-[#8E8E8E] hover:text-white hover:border-[#E8FF00] transition-colors"
                >
                  {copiedKey === 'nepali' ? <Check className="h-3.5 w-3.5 text-[#22C55E]" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedKey === 'nepali' ? (isNepaliLang ? 'कपी भयो' : 'Copied') : (isNepaliLang ? 'कपी' : 'Copy')}</span>
                </button>
              </div>

              {/* English Digits Card */}
              <div className="border border-[#262626] bg-[#161616] p-4 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-[#8E8E8E]">
                    {isNepaliLang ? 'अंग्रेजी अंक' : 'English Digits'}
                  </div>
                  <div className="font-display text-3xl sm:text-4xl text-white mt-1 font-mono break-all">
                    {englishResult || '—'}
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(englishResult, 'english')}
                  className="mt-3 flex items-center justify-center gap-1.5 border border-[#262626] py-1.5 text-xs text-[#8E8E8E] hover:text-white hover:border-[#E8FF00] transition-colors"
                >
                  {copiedKey === 'english' ? <Check className="h-3.5 w-3.5 text-[#22C55E]" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedKey === 'english' ? (isNepaliLang ? 'कपी भयो' : 'Copied') : (isNepaliLang ? 'कपी' : 'Copy')}</span>
                </button>
              </div>
            </div>

            {/* Nepali Words Representation */}
            {nepaliWords && (
              <div className="border-t border-[#262626] pt-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#8E8E8E]">
                  {isNepaliLang ? 'नेपाली अक्षरमा (उच्चारण):' : 'In Spoken Nepali Words:'}
                </div>
                <div className="text-lg sm:text-xl font-bold text-white mt-1.5 bg-[#161616] p-3 border border-[#262626] flex items-center justify-between gap-3">
                  <span className="font-nepali leading-relaxed">{nepaliWords}</span>
                  <button
                    onClick={() => handleCopy(nepaliWords, 'words')}
                    title="Copy Words"
                    className="p-1.5 text-[#8E8E8E] hover:text-[#E8FF00]"
                  >
                    {copiedKey === 'words' ? <Check className="h-4 w-4 text-[#22C55E]" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Reference Chart: 0-10 & Higher Units */}
          <div className="border border-[#262626] bg-[#111111] p-5">
            <h3 className="font-display text-2xl text-white mb-3 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-[#E8FF00]" />
              <span>{isNepaliLang ? 'नेपाली अंक तथा एकाइ तालिका' : 'NUMERAL REFERENCE & PRONUNCIATION'}</span>
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#262626] text-[#8E8E8E]">
                    <th className="py-2 px-3">English</th>
                    <th className="py-2 px-3">देवनागरी</th>
                    <th className="py-2 px-3">शब्द (Words)</th>
                    <th className="py-2 px-3">Phonetic</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e1e1e]">
                  {digitsReference.map((d, i) => (
                    <tr key={i} className="hover:bg-[#181818] transition-colors">
                      <td className="py-2 px-3 font-mono text-white">{d.en}</td>
                      <td className="py-2 px-3 font-mono font-bold text-[#E8FF00] text-base">{d.ne}</td>
                      <td className="py-2 px-3 text-white font-medium">{d.word}</td>
                      <td className="py-2 px-3 text-[#8E8E8E] italic">{d.phonetic}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Emergency Devanagari Touch Dialpad (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="border-2 border-[#262626] bg-[#0f0f0f] p-5 sm:p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#262626] pb-3 mb-4">
              <div>
                <h3 className="font-display text-2xl text-white">
                  {isNepaliLang ? 'देवनागरी टच डायलर' : 'TOUCH DIALPAD'}
                </h3>
                <div className="text-[10px] text-[#8E8E8E] uppercase tracking-wider">
                  {isNepaliLang ? 'अंक थिच्दा अडियो टोन आउनेछ' : 'With DTMF Audio Feedback'}
                </div>
              </div>
              <button
                onClick={() => playWhistleSound(600)}
                title="Test Audio Whistle"
                className="flex items-center gap-1 text-[11px] text-[#E8FF00] border border-[#E8FF00]/40 px-2 py-1 hover:bg-[#E8FF00] hover:text-black transition-colors"
              >
                <Volume2 className="h-3.5 w-3.5" />
                <span>{isNepaliLang ? 'ध्वनि परीक्षण' : 'Test Sound'}</span>
              </button>
            </div>

            {/* Display screen */}
            <div className="border-2 border-[#262626] bg-[#050505] p-3 text-right min-h-[72px] flex flex-col justify-center mb-4">
              <div className="font-display text-4xl text-[#E8FF00] font-mono tracking-widest break-all">
                {toNepaliNumerals(dialedNumber) || <span className="text-[#333]">०</span>}
              </div>
              <div className="font-mono text-xs text-[#8E8E8E] mt-0.5">
                {toEnglishNumerals(dialedNumber) || 'Enter digits'}
              </div>
            </div>

            {/* Quick 1-tap Speed Dials */}
            <div className="flex overflow-x-auto gap-1 pb-3 mb-3 border-b border-[#262626] no-scrollbar">
              {quickHotlines.map((h) => (
                <button
                  key={h.num}
                  onClick={() => handleQuickPreset(h.num)}
                  className="px-2 py-1 text-[11px] font-semibold border border-[#262626] bg-[#181818] text-[#8E8E8E] hover:border-[#E8FF00] hover:text-white shrink-0"
                >
                  <span>{h.name}: </span>
                  <span className="text-[#E8FF00] font-mono">{useNepaliDigits ? h.neNum : h.num}</span>
                </button>
              ))}
            </div>

            {/* Keypad Grid (12 keys) */}
            <div className="grid grid-cols-3 gap-2.5">
              {keypadDigits.map((k) => (
                <button
                  key={k.en}
                  onClick={() => handleKeypadPress(k.en)}
                  className="flex flex-col items-center justify-center min-h-[58px] border border-[#262626] bg-[#161616] hover:bg-[#E8FF00] hover:text-black hover:border-[#E8FF00] active:scale-95 transition-all text-white group"
                >
                  <span className="font-display text-3xl leading-none group-hover:text-black">
                    {k.ne}
                  </span>
                  <span className="text-[10px] text-[#8E8E8E] group-hover:text-black font-mono">
                    {k.en}
                  </span>
                </button>
              ))}
            </div>

            {/* Actions: Clear, Call, Backspace */}
            <div className="grid grid-cols-3 gap-2.5 mt-3 pt-3 border-t border-[#262626]">
              <button
                onClick={handleClear}
                className="flex items-center justify-center gap-1 border border-[#262626] bg-[#161616] text-[#8E8E8E] hover:text-white py-3 text-xs font-semibold uppercase tracking-wider"
              >
                <RotateCcw className="h-4 w-4" />
                <span>{isNepaliLang ? 'खाली' : 'Clear'}</span>
              </button>

              <a
                href={dialedNumber ? `tel:${toEnglishNumerals(dialedNumber)}` : '#'}
                onClick={(e) => {
                  if (!dialedNumber) e.preventDefault();
                }}
                className={`flex items-center justify-center gap-1.5 py-3 text-sm font-display tracking-wider font-bold ${
                  dialedNumber
                    ? 'bg-[#22C55E] text-black hover:bg-[#34d399]'
                    : 'bg-[#22C55E]/30 text-[#888] cursor-not-allowed'
                }`}
              >
                <Phone className="h-4 w-4" />
                <span>{isNepaliLang ? 'कल' : 'DIAL'}</span>
              </a>

              <button
                onClick={handleBackspace}
                className="flex items-center justify-center gap-1 border border-[#262626] bg-[#161616] text-[#8E8E8E] hover:text-[#FF2A00] py-3 text-xs font-semibold uppercase tracking-wider"
              >
                <Delete className="h-4 w-4" />
                <span>{isNepaliLang ? 'मेटाउने' : 'Delete'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
