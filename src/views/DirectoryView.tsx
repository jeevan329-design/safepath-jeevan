import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Search, 
  Copy, 
  Check, 
  UserPlus, 
  Trash2, 
  ShieldAlert, 
  Heart, 
  Building2, 
  HelpCircle,
  Share2,
  ExternalLink
} from 'lucide-react';
import { ContactCategory, NepalProvince, PersonalContact } from '../types';
import { OFFICIAL_NEPAL_CONTACTS } from '../data/nepaliContacts';
import { toNepaliNumerals, toEnglishNumerals } from '../utils/nepaliNumbers';

interface DirectoryViewProps {
  useNepaliDigits: boolean;
  isNepaliLang: boolean;
}

export const DirectoryView: React.FC<DirectoryViewProps> = ({
  useNepaliDigits,
  isNepaliLang,
}) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<ContactCategory>('all');
  const [province, setProvince] = useState<NepalProvince>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Personal contacts loaded from localStorage
  const [personalList, setPersonalList] = useState<PersonalContact[]>(() => {
    try {
      const stored = localStorage.getItem('safepath-personal-contacts');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newRel, setNewRel] = useState('');
  const [newPhone, setNewPhone] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('safepath-personal-contacts', JSON.stringify(personalList));
    } catch {
      // storage disabled
    }
  }, [personalList]);

  const fmt = (val: string | number) => (useNepaliDigits ? toNepaliNumerals(val) : String(val));

  const handleCopy = (id: string, num: string) => {
    navigator.clipboard.writeText(num).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    });
  };

  const handleAddPersonal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPhone.trim()) return;
    const newContact: PersonalContact = {
      id: 'personal-' + Date.now(),
      name: newName.trim(),
      relationship: newRel.trim() || (isNepaliLang ? 'आफन्त' : 'Family'),
      phone: newPhone.trim(),
    };
    setPersonalList([...personalList, newContact]);
    setNewName('');
    setNewRel('');
    setNewPhone('');
    setShowAddForm(false);
  };

  const handleRemovePersonal = (id: string) => {
    setPersonalList(personalList.filter(c => c.id !== id));
  };

  const categories: { id: ContactCategory; labelEn: string; labelNe: string }[] = [
    { id: 'all', labelEn: 'All Hotlines', labelNe: 'सबै हटलाइन' },
    { id: 'security', labelEn: 'Security & Police', labelNe: 'प्रहरी तथा सुरक्षा' },
    { id: 'ambulance', labelEn: 'Ambulance', labelNe: 'एम्बुलेन्स सेवा' },
    { id: 'disaster', labelEn: 'Disaster & Fire', labelNe: 'विपद् तथा दमकल' },
    { id: 'hospital', labelEn: 'Major Hospitals', labelNe: 'प्रमुख अस्पतालहरू' },
    { id: 'helpline', labelEn: 'Helplines', labelNe: 'हेल्पलाइन' },
    { id: 'bloodbank', labelEn: 'Blood Bank', labelNe: 'रक्तसञ्चार' },
  ];

  const provinces: { id: NepalProvince; labelEn: string; labelNe: string }[] = [
    { id: 'all', labelEn: 'All Provinces (देशभर)', labelNe: 'सम्पूर्ण प्रदेश' },
    { id: 'bagmati', labelEn: 'Bagmati (बागमती)', labelNe: 'बागमती' },
    { id: 'gandaki', labelEn: 'Gandaki (गण्डकी)', labelNe: 'गण्डकी' },
    { id: 'koshi', labelEn: 'Koshi (कोशी)', labelNe: 'कोशी' },
    { id: 'madhesh', labelEn: 'Madhesh (मधेश)', labelNe: 'मधेश' },
    { id: 'lumbini', labelEn: 'Lumbini (लुम्बिनी)', labelNe: 'लुम्बिनी' },
    { id: 'karnali', labelEn: 'Karnali (कर्णाली)', labelNe: 'कर्णाली' },
    { id: 'sudurpashchim', labelEn: 'Sudurpashchim (सुदूरपश्चिम)', labelNe: 'सुदूरपश्चिम' },
  ];

  const filteredContacts = OFFICIAL_NEPAL_CONTACTS.filter((c) => {
    const matchesCat = category === 'all' || c.category === category;
    const matchesProv = province === 'all' || c.province === 'all' || c.province === province;
    const query = search.toLowerCase().trim();
    const queryEng = toEnglishNumerals(query);
    const matchesSearch = !query || 
      c.name.toLowerCase().includes(query) ||
      c.nepaliName.includes(query) ||
      c.number.includes(queryEng) ||
      c.nepaliNumber.includes(query) ||
      (c.location && c.location.toLowerCase().includes(query));

    return matchesCat && matchesProv && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-widest text-[#8E8E8E]">
          {isNepaliLang ? 'आधिकारिक नेपाल आपतकालीन डाइरेक्टरी' : 'Verified Official Directory'}
        </div>
        <h1 className="font-display text-4xl sm:text-6xl tracking-wide text-white mt-1">
          {isNepaliLang ? 'नेपाली आपतकालीन नम्बरहरू' : 'NEPALI EMERGENCY NUMBERS'}
        </h1>
        <p className="text-sm text-[#8E8E8E] max-w-2xl mt-1">
          {isNepaliLang
            ? 'नेपाल प्रहरी, दमकल, एम्बुलेन्स १०२, राष्ट्रिय विपद् केन्द्र ११५५ र सातै प्रदेशका प्रमुख सरकारी ट्रमा अस्पतालहरूको आधिकारिक फोन नम्बर।'
            : 'Verified Nepal Police, Fire, Ambulance 102, Disaster NEOC 1155, and apex referral hospitals across all 7 provinces.'}
        </p>
      </div>

      {/* Top 4 Emergency Express Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <a
          href="tel:100"
          className="border-2 border-[#FF2A00] bg-[#FF2A00]/10 p-3 hover:bg-[#FF2A00] hover:text-black transition-colors group flex flex-col justify-between"
        >
          <span className="text-[10px] uppercase font-bold text-[#8E8E8E] group-hover:text-black">
            {isNepaliLang ? 'प्रहरी' : 'Police'}
          </span>
          <span className="font-display text-3xl sm:text-4xl text-[#FF2A00] group-hover:text-black mt-1">
            {fmt(100)}
          </span>
          <span className="text-[10px] text-[#8E8E8E] group-hover:text-black mt-1 flex items-center gap-1">
            <Phone className="h-3 w-3" /> {isNepaliLang ? 'कल गर्नुहोस्' : 'Call 100'}
          </span>
        </a>

        <a
          href="tel:102"
          className="border-2 border-[#00E8FF] bg-[#00E8FF]/10 p-3 hover:bg-[#00E8FF] hover:text-black transition-colors group flex flex-col justify-between"
        >
          <span className="text-[10px] uppercase font-bold text-[#8E8E8E] group-hover:text-black">
            {isNepaliLang ? 'एम्बुलेन्स' : 'Ambulance'}
          </span>
          <span className="font-display text-3xl sm:text-4xl text-[#00E8FF] group-hover:text-black mt-1">
            {fmt(102)}
          </span>
          <span className="text-[10px] text-[#8E8E8E] group-hover:text-black mt-1 flex items-center gap-1">
            <Phone className="h-3 w-3" /> {isNepaliLang ? 'कल गर्नुहोस्' : 'Call 102'}
          </span>
        </a>

        <a
          href="tel:101"
          className="border-2 border-[#FF5A00] bg-[#FF5A00]/10 p-3 hover:bg-[#FF5A00] hover:text-black transition-colors group flex flex-col justify-between"
        >
          <span className="text-[10px] uppercase font-bold text-[#8E8E8E] group-hover:text-black">
            {isNepaliLang ? 'दमकल' : 'Fire'}
          </span>
          <span className="font-display text-3xl sm:text-4xl text-[#FF5A00] group-hover:text-black mt-1">
            {fmt(101)}
          </span>
          <span className="text-[10px] text-[#8E8E8E] group-hover:text-black mt-1 flex items-center gap-1">
            <Phone className="h-3 w-3" /> {isNepaliLang ? 'कल गर्नुहोस्' : 'Call 101'}
          </span>
        </a>

        <a
          href="tel:1155"
          className="border-2 border-[#E8FF00] bg-[#E8FF00]/10 p-3 hover:bg-[#E8FF00] hover:text-black transition-colors group flex flex-col justify-between"
        >
          <span className="text-[10px] uppercase font-bold text-[#8E8E8E] group-hover:text-black">
            {isNepaliLang ? 'बाढी/विपद्' : 'Disaster'}
          </span>
          <span className="font-display text-3xl sm:text-4xl text-[#E8FF00] group-hover:text-black mt-1">
            {fmt(1155)}
          </span>
          <span className="text-[10px] text-[#8E8E8E] group-hover:text-black mt-1 flex items-center gap-1">
            <Phone className="h-3 w-3" /> {isNepaliLang ? 'कल गर्नुहोस्' : 'Call 1155'}
          </span>
        </a>
      </div>

      {/* Search and Filters */}
      <div className="space-y-3 border border-[#262626] bg-[#111111] p-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8E8E8E]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={
              isNepaliLang 
                ? "नम्बर, नाम, अस्पताल वा स्थान खोज्नुहोस् (उदा: 102, बिर, पाटन, धरान)..." 
                : "Search by number, agency, hospital or city (e.g. 102, Bir, Patan, Dharan)..."
            }
            className="w-full bg-[#181818] border border-[#262626] pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#666] focus:border-[#E8FF00] focus:outline-none"
          />
        </div>

        {/* Category Filters */}
        <div className="flex overflow-x-auto gap-1.5 pb-1 no-scrollbar">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={`px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors border ${
                category === c.id
                  ? 'bg-[#E8FF00] text-black border-[#E8FF00]'
                  : 'bg-[#181818] text-[#8E8E8E] border-[#262626] hover:text-white'
              }`}
            >
              {isNepaliLang ? c.labelNe : c.labelEn}
            </button>
          ))}
        </div>

        {/* Province Filter */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#8E8E8E] pt-1 border-t border-[#1e1e1e]">
          <span className="font-semibold">{isNepaliLang ? 'प्रदेश:' : 'Province:'}</span>
          {provinces.map((p) => (
            <button
              key={p.id}
              onClick={() => setProvince(p.id)}
              className={`px-2 py-1 text-[11px] transition-colors ${
                province === p.id
                  ? 'text-[#E8FF00] font-bold underline'
                  : 'text-[#8E8E8E] hover:text-white'
              }`}
            >
              {isNepaliLang ? p.labelNe : p.labelEn.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Contacts List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredContacts.map((contact) => {
          const displayNum = useNepaliDigits ? contact.nepaliNumber : contact.number;
          return (
            <div
              key={contact.id}
              className="border border-[#262626] bg-[#111111] p-4 flex flex-col justify-between hover:border-[#383838] transition-colors"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-2xl text-white leading-tight">
                      {isNepaliLang ? contact.nepaliName : contact.name}
                    </h3>
                    <div className="text-xs text-[#8E8E8E] mt-0.5">
                      {contact.location || (isNepaliLang ? 'देशभर' : 'Nationwide')}
                    </div>
                  </div>
                  {contact.isTollFree && (
                    <span className="text-[10px] uppercase font-bold text-[#22C55E] border border-[#22C55E]/30 bg-[#22C55E]/10 px-2 py-0.5 shrink-0">
                      Toll Free
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#8E8E8E] mt-2 line-clamp-2">
                  {isNepaliLang ? contact.nepaliDescription : contact.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#1e1e1e] flex items-center justify-between gap-2">
                <div>
                  <div className="text-[10px] uppercase text-[#8E8E8E]">
                    {isNepaliLang ? 'हटलाइन नम्बर' : 'Hotline Number'}
                  </div>
                  <div className="font-display text-2xl text-[#E8FF00] font-mono tracking-wider">
                    {displayNum}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(contact.id, contact.number)}
                    title="Copy Number"
                    className="p-2 border border-[#262626] bg-[#181818] text-[#8E8E8E] hover:text-white hover:border-[#E8FF00] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                  >
                    {copiedId === contact.id ? <Check className="h-4 w-4 text-[#22C55E]" /> : <Copy className="h-4 w-4" />}
                  </button>

                  <a
                    href={`tel:${contact.number.replace(/[^0-9]/g, '')}`}
                    className="flex items-center gap-1.5 bg-[#E8FF00] text-black px-4 py-2 text-xs font-bold font-display tracking-wider hover:bg-white transition-colors min-h-[44px]"
                  >
                    <Phone className="h-4 w-4" />
                    <span>{isNepaliLang ? 'कल गर्नुहोस्' : 'DIAL'}</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredContacts.length === 0 && (
        <div className="border border-dashed border-[#262626] p-8 text-center text-[#8E8E8E] text-sm">
          {isNepaliLang 
            ? 'कुनै नम्बर फेला परेन। कृपया खोजी शब्द परिवर्तन गर्नुहोस्।' 
            : 'No hotlines matched your filter criteria.'}
        </div>
      )}

      {/* Personal Circle Section */}
      <div className="border border-[#262626] bg-[#111111] p-5 mt-8">
        <div className="flex items-center justify-between border-b border-[#262626] pb-3">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl tracking-wide text-white">
              {isNepaliLang ? 'तपाईंको पारिवारिक सर्कल' : 'YOUR PERSONAL CIRCLE'}
            </h2>
            <div className="text-xs text-[#8E8E8E]">
              {isNepaliLang 
                ? 'आफ्ना परिवार तथा छिमेकीका नम्बरहरू यसै डिभाइसमा सुरक्षित गर्नुहोस्।' 
                : 'Personal emergency contacts saved securely in this browser.'}
            </div>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1 border border-[#E8FF00] text-[#E8FF00] px-3 py-1.5 text-xs font-semibold hover:bg-[#E8FF00] hover:text-black transition-colors"
          >
            <UserPlus className="h-4 w-4" />
            <span>{showAddForm ? (isNepaliLang ? 'रद्द' : 'Cancel') : (isNepaliLang ? '+ नयाँ सम्पर्क' : '+ Add')}</span>
          </button>
        </div>

        {/* Add Contact Form */}
        {showAddForm && (
          <form onSubmit={handleAddPersonal} className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-2 border border-[#262626] bg-[#161616] p-3">
            <input
              type="text"
              required
              placeholder={isNepaliLang ? 'नाम (उदा: राम शर्मा)' : 'Name (e.g. Ram Sharma)'}
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="bg-[#0e0e0e] border border-[#262626] px-3 py-2 text-sm text-white placeholder-[#666] focus:border-[#E8FF00] focus:outline-none"
            />
            <input
              type="text"
              placeholder={isNepaliLang ? 'नाता (उदा: दाइ / छिमेकी)' : 'Relationship (e.g. Brother)'}
              value={newRel}
              onChange={(e) => setNewRel(e.target.value)}
              className="bg-[#0e0e0e] border border-[#262626] px-3 py-2 text-sm text-white placeholder-[#666] focus:border-[#E8FF00] focus:outline-none"
            />
            <input
              type="tel"
              required
              placeholder={isNepaliLang ? 'फोन नम्बर (उदा: ९८४१...)' : 'Phone (e.g. 9841...)'}
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              className="bg-[#0e0e0e] border border-[#262626] px-3 py-2 text-sm text-white placeholder-[#666] focus:border-[#E8FF00] focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#E8FF00] text-black font-semibold text-sm py-2 hover:bg-white transition-colors"
            >
              {isNepaliLang ? 'सुरक्षित गर्नुहोस्' : 'Save Contact'}
            </button>
          </form>
        )}

        {/* Personal Contacts List */}
        <div className="mt-4 space-y-2">
          {personalList.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between border border-[#262626] bg-[#161616] p-3 hover:border-[#383838]"
            >
              <div>
                <div className="font-display text-xl text-white">{c.name}</div>
                <div className="text-xs text-[#8E8E8E]">{c.relationship}</div>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={`tel:${c.phone}`}
                  className="font-mono text-sm font-semibold text-[#E8FF00] hover:underline"
                >
                  {fmt(c.phone)}
                </a>
                <button
                  onClick={() => handleRemovePersonal(c.id)}
                  className="text-[#8E8E8E] hover:text-[#FF2A00] p-1.5"
                  title="Remove"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}

          {personalList.length === 0 && (
            <div className="text-xs text-[#8E8E8E] py-3 text-center">
              {isNepaliLang
                ? 'हाल कुनै व्यक्तिगत सम्पर्क थपिएको छैन। आपतकालमा सम्पर्क गर्न माथिको "+ नयाँ सम्पर्क" थिच्नुहोस्।'
                : 'No personal contacts added yet. Add family or out-of-district contacts above.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
