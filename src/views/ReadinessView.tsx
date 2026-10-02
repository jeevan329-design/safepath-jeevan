import React, { useState } from 'react';
import { 
  CheckSquare, 
  RotateCcw, 
  Plus, 
  Printer, 
  Check, 
  AlertCircle,
  Shield,
  FileText
} from 'lucide-react';
import { ChecklistItem } from '../types';
import { toNepaliNumerals } from '../utils/nepaliNumbers';

interface ReadinessViewProps {
  checklist: ChecklistItem[];
  onToggleItem: (id: string) => void;
  onAddItem: (item: Omit<ChecklistItem, 'id' | 'done'>) => void;
  onResetChecklist: () => void;
  useNepaliDigits: boolean;
  isNepaliLang: boolean;
}

export const ReadinessView: React.FC<ReadinessViewProps> = ({
  checklist,
  onToggleItem,
  onAddItem,
  onResetChecklist,
  useNepaliDigits,
  isNepaliLang,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newNepaliTitle, setNewNepaliTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'kit' | 'home' | 'plan' | 'documents'>('kit');

  const fmt = (val: string | number) => (useNepaliDigits ? toNepaliNumerals(val) : String(val));

  const total = checklist.length;
  const completed = checklist.filter(c => c.done).length;
  const pct = total ? Math.round((completed / total) * 100) : 0;

  // SVG Progress Ring calculations
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  const categories = [
    { id: 'all', labelEn: 'All Categories', labelNe: 'सम्पूर्ण सामग्री' },
    { id: 'kit', labelEn: '72h Go-Bag Kit', labelNe: '७२ घण्टे झोला' },
    { id: 'home', labelEn: 'Home Safety', labelNe: 'घर सुरक्षा' },
    { id: 'plan', labelEn: 'Family Plan', labelNe: 'पारिवारिक योजना' },
    { id: 'documents', labelEn: 'Vital Documents', labelNe: 'आवश्यक कागजात' },
  ];

  const filteredItems = checklist.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const handleCreateCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onAddItem({
      category: newCategory,
      title: newTitle.trim(),
      nepaliTitle: newNepaliTitle.trim() || newTitle.trim(),
      detail: isNepaliLang ? 'प्रयोगकर्ताद्वारा थपिएको सामग्री' : 'Custom user preparation item',
      priority: 'essential',
    });
    setNewTitle('');
    setNewNepaliTitle('');
    setShowAddForm(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title & Circular Progress Meter */}
      <div className="flex flex-wrap items-center justify-between gap-6 border-b border-[#262626] pb-6">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-widest text-[#8E8E8E]">
            {isNepaliLang ? 'विपद् पूर्वतयारी तथा झोला' : 'Pre-Disaster Preparedness'}
          </div>
          <h1 className="font-display text-4xl sm:text-6xl tracking-wide text-white mt-1">
            {isNepaliLang ? '७२ घण्टे झोला र तयारी' : 'READINESS & GO-BAG'}
          </h1>
          <p className="text-sm text-[#8E8E8E] max-w-xl mt-1">
            {isNepaliLang
              ? 'भूकम्प, बाढी वा पहिरो आउनुअगावै प्रत्येक परिवारसँग तयारी अवस्थामा हुनुपर्ने सामग्रीको पूर्ण जाँचसूची।'
              : 'Essential 72-hour survival kit, household mitigation, and family evacuation checklist.'}
          </p>
        </div>

        {/* Circular Progress Gauge */}
        <div className="flex items-center gap-4 border border-[#262626] bg-[#111111] p-3 sm:p-4">
          <div className="relative flex items-center justify-center">
            <svg width="84" height="84" className="rotate-[-90deg]">
              <circle
                cx="42"
                cy="42"
                r={radius}
                fill="none"
                stroke="#222"
                strokeWidth="7"
              />
              <circle
                cx="42"
                cy="42"
                r={radius}
                fill="none"
                stroke="#E8FF00"
                strokeWidth="7"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-500 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="font-display text-2xl text-white font-mono leading-none">
                {fmt(pct)}%
              </span>
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-[#8E8E8E]">
              {isNepaliLang ? 'तयारी स्तर' : 'Readiness'}
            </div>
            <div className="font-display text-2xl text-white font-mono mt-0.5">
              {fmt(completed)} / {fmt(total)}
            </div>
            <div className="text-[10px] text-[#22C55E]">
              {pct === 100
                ? (isNepaliLang ? 'पूर्ण तयार!' : '100% Ready!')
                : (isNepaliLang ? 'प्रगति जारी' : 'In Progress')}
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs & Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex overflow-x-auto gap-1.5 no-scrollbar">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors border min-h-[44px] ${
                activeCategory === c.id
                  ? 'bg-[#E8FF00] text-black border-[#E8FF00]'
                  : 'bg-[#111111] text-[#8E8E8E] border-[#262626] hover:text-white'
              }`}
            >
              {isNepaliLang ? c.labelNe : c.labelEn}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1 border border-[#262626] bg-[#141414] px-3 py-2 text-xs font-semibold text-white hover:border-[#E8FF00] transition-colors min-h-[44px]"
          >
            <Plus className="h-3.5 w-3.5 text-[#E8FF00]" />
            <span>{isNepaliLang ? 'सामग्री थप्नुहोस्' : 'Add Item'}</span>
          </button>

          <button
            onClick={handlePrint}
            title="Print Summary Checklist"
            className="flex items-center gap-1 border border-[#262626] bg-[#141414] px-3 py-2 text-xs font-semibold text-[#8E8E8E] hover:text-white transition-colors min-h-[44px]"
          >
            <Printer className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{isNepaliLang ? 'प्रिन्ट' : 'Print'}</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm(isNepaliLang ? 'के तपाईं सबै चेकलिस्ट रिसेट गर्न चाहनुहुन्छ?' : 'Reset all checklist progress?')) {
                onResetChecklist();
              }
            }}
            title="Reset Checklist"
            className="flex items-center gap-1 border border-[#262626] bg-[#141414] px-3 py-2 text-xs font-semibold text-[#8E8E8E] hover:text-[#FF2A00] transition-colors min-h-[44px]"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Add Custom Item Drawer/Form */}
      {showAddForm && (
        <form onSubmit={handleCreateCustom} className="border-2 border-[#E8FF00] bg-[#141414] p-4 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#E8FF00]">
            {isNepaliLang ? 'नयाँ सामग्री थप्नुहोस्' : 'Add Custom Preparation Item'}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input
              type="text"
              required
              placeholder="Item name (e.g. Baby formula / टॉर्च)"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="bg-[#0b0b0b] border border-[#262626] px-3 py-2 text-sm text-white placeholder-[#666] focus:border-[#E8FF00] focus:outline-none"
            />
            <input
              type="text"
              placeholder="नेपाली नाम (वैकल्पिक)"
              value={newNepaliTitle}
              onChange={(e) => setNewNepaliTitle(e.target.value)}
              className="bg-[#0b0b0b] border border-[#262626] px-3 py-2 text-sm text-white placeholder-[#666] focus:border-[#E8FF00] focus:outline-none"
            />
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value as any)}
              className="bg-[#0b0b0b] border border-[#262626] px-3 py-2 text-sm text-white focus:border-[#E8FF00] focus:outline-none"
            >
              <option value="kit">72h Go-Bag Kit</option>
              <option value="home">Home Safety</option>
              <option value="plan">Family Plan</option>
              <option value="documents">Vital Documents</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1.5 text-xs text-[#8E8E8E] hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#E8FF00] text-black px-4 py-1.5 text-xs font-bold hover:bg-white transition-colors"
            >
              Save Item
            </button>
          </div>
        </form>
      )}

      {/* Checklist Items List */}
      <div className="border border-[#262626] bg-[#111111] divide-y divide-[#1e1e1e]">
        {filteredItems.map((item) => (
          <label
            key={item.id}
            className={`flex items-start gap-3.5 p-4 cursor-pointer transition-colors hover:bg-[#161616] ${
              item.done ? 'bg-[#0d0d0d] opacity-75' : ''
            }`}
          >
            <input
              type="checkbox"
              checked={item.done}
              onChange={() => onToggleItem(item.id)}
              className="sr-only"
            />
            {/* Custom high-contrast checkbox */}
            <div
              className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border-2 transition-all ${
                item.done
                  ? 'border-[#E8FF00] bg-[#E8FF00] text-black'
                  : 'border-[#444] bg-[#181818]'
              }`}
            >
              {item.done && <Check className="h-4 w-4 stroke-[3]" />}
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`text-sm sm:text-base font-semibold leading-snug ${
                    item.done ? 'line-through text-[#777]' : 'text-white'
                  }`}
                >
                  {isNepaliLang ? item.nepaliTitle : item.title}
                </span>

                {item.priority === 'critical' && (
                  <span className="text-[10px] uppercase font-bold text-[#FF2A00] border border-[#FF2A00]/30 bg-[#FF2A00]/10 px-1.5 py-0.2 shrink-0">
                    {isNepaliLang ? 'अति आवश्यक' : 'Critical'}
                  </span>
                )}
              </div>

              {item.detail && (
                <p className="text-xs text-[#8E8E8E] mt-1 leading-relaxed">
                  {item.detail}
                </p>
              )}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};
