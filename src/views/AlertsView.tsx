import React, { useState, useEffect } from 'react';
import { 
  BellRing, 
  AlertTriangle, 
  Send, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Copy, 
  Check, 
  Share2 
} from 'lucide-react';
import { AdvisoryAlert, IncidentReport, DisasterType } from '../types';
import { OFFICIAL_ADVISORIES, INITIAL_INCIDENT_REPORTS } from '../data/alertsData';
import { toNepaliNumerals } from '../utils/nepaliNumbers';

interface AlertsViewProps {
  useNepaliDigits: boolean;
  isNepaliLang: boolean;
}

export const AlertsView: React.FC<AlertsViewProps> = ({
  useNepaliDigits,
  isNepaliLang,
}) => {
  const [reports, setReports] = useState<IncidentReport[]>(() => {
    try {
      const stored = localStorage.getItem('safepath-incident-reports');
      return stored ? JSON.parse(stored) : INITIAL_INCIDENT_REPORTS;
    } catch {
      return INITIAL_INCIDENT_REPORTS;
    }
  });

  const [hazardType, setHazardType] = useState<DisasterType>('landslide');
  const [location, setLocation] = useState('');
  const [severity, setSeverity] = useState<'low' | 'moderate' | 'high' | 'critical'>('high');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('safepath-incident-reports', JSON.stringify(reports));
    } catch {
      // storage disabled
    }
  }, [reports]);

  const fmt = (val: string | number) => (useNepaliDigits ? toNepaliNumerals(val) : String(val));

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location.trim() || !description.trim()) return;

    const newReport: IncidentReport = {
      id: 'rep-' + Date.now(),
      hazardType,
      location: location.trim(),
      severity,
      time: isNepaliLang ? 'भर्खरै दर्ता' : 'Just now',
      description: description.trim(),
      contactNumber: phone.trim() || undefined,
    };

    setReports([newReport, ...reports]);

    // Format SMS template for Nepal Police (100) or NEOC (1155)
    const smsText = `[SAFEPATH INCIDENT REPORT] Type: ${hazardType.toUpperCase()} | Loc: ${location} | Severity: ${severity.toUpperCase()} | Details: ${description} | Contact: ${phone || 'N/A'}`;
    setSubmittedMessage(smsText);

    setLocation('');
    setDescription('');
    setPhone('');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title */}
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-widest text-[#8E8E8E]">
          {isNepaliLang ? 'राष्ट्रिय विपद् पूर्वसूचना तथा सूचना बुलेटिन' : 'Real-Time Hazard Telemetry'}
        </div>
        <h1 className="font-display text-4xl sm:text-6xl tracking-wide text-white mt-1">
          {isNepaliLang ? 'ताजा सतर्कता तथा प्रतिवेदन' : 'ALERTS & INCIDENT LOG'}
        </h1>
        <p className="text-sm text-[#8E8E8E] max-w-2xl mt-1">
          {isNepaliLang
            ? 'जल तथा मौसम विज्ञान विभाग, भूकम्प मापन केन्द्र तथा सडक विभागको ताजा सूचना र नागरिक विपद् प्रतिवेदन।'
            : 'Official river basin advisories, seismic notices, and community incident reports.'}
        </p>
      </div>

      {/* Official Advisory Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-[#262626] pb-2">
          <h2 className="font-display text-2xl text-white flex items-center gap-2">
            <BellRing className="h-5 w-5 text-[#E8FF00]" />
            <span>{isNepaliLang ? 'सरकारी विपद् बुलेटिन' : 'OFFICIAL ADVISORY BULLETINS'}</span>
          </h2>
          <span className="text-xs text-[#22C55E] flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-[#22C55E] animate-ping" />
            <span>Live Feed</span>
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {OFFICIAL_ADVISORIES.map((advisory) => {
            const isCrit = advisory.severity === 'critical';
            const isWarn = advisory.severity === 'warning';
            const borderClr = isCrit ? 'border-[#FF2A00]' : isWarn ? 'border-[#FF5A00]' : 'border-[#E8FF00]';
            const badgeBg = isCrit ? 'bg-[#FF2A00] text-black' : isWarn ? 'bg-[#FF5A00] text-black' : 'bg-[#E8FF00] text-black';

            return (
              <div
                key={advisory.id}
                className={`border-l-4 ${borderClr} border border-[#262626] bg-[#111111] p-4 sm:p-5 space-y-3`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 ${badgeBg}`}>
                      {advisory.severity.toUpperCase()}
                    </span>
                    <span className="text-xs text-[#8E8E8E] font-medium">
                      {advisory.agency}
                    </span>
                  </div>
                  <span className="text-xs text-[#8E8E8E] font-mono">
                    {advisory.timeAgo}
                  </span>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {isNepaliLang ? advisory.nepaliTitle : advisory.title}
                  </h3>
                  <div className="text-xs text-[#E8FF00] mt-0.5 font-medium">
                    {isNepaliLang ? 'प्रभावित क्षेत्र: ' : 'Region: '}{advisory.region}
                  </div>
                  <p className="text-xs sm:text-sm text-[#8E8E8E] mt-1.5 leading-relaxed">
                    {isNepaliLang ? advisory.nepaliSummary : advisory.summary}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#1e1e1e] flex items-center justify-between text-xs text-[#F6F3EC]">
                  <span>
                    <strong className="text-white">{isNepaliLang ? 'आवश्यक कार्य:' : 'Action Required:'}</strong>{' '}
                    {advisory.actionRequired}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Community Hazard Reporter Form */}
      <div className="border border-[#262626] bg-[#111111] p-5 sm:p-6 space-y-4">
        <div className="border-b border-[#262626] pb-3">
          <h2 className="font-display text-2xl text-white">
            {isNepaliLang ? 'विपद् वा सडक अवरोध प्रतिवेदन पेश गर्नुहोस्' : 'REPORT LOCAL HAZARD / INCIDENT'}
          </h2>
          <p className="text-xs text-[#8E8E8E] mt-0.5">
            {isNepaliLang
              ? 'आफ्नो टोल, सडक वा खोलाको जोखिम विवरण दर्ता गर्नुहोस्। यसले प्रहरी तथा उद्धार टोलीका लागि एसएमएस सन्देश पनि तयार गर्दछ।'
              : 'Log road blockages, mudslides, or high river surges. Generates ready-to-dispatch SMS template.'}
          </p>
        </div>

        <form onSubmit={handleReportSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#8E8E8E] uppercase mb-1">
                {isNepaliLang ? 'विपद्को प्रकार:' : 'Hazard Type:'}
              </label>
              <select
                value={hazardType}
                onChange={(e) => setHazardType(e.target.value as any)}
                className="w-full bg-[#181818] border border-[#262626] px-3 py-2 text-sm text-white focus:border-[#E8FF00] focus:outline-none"
              >
                <option value="landslide">Landslide (पहिरो)</option>
                <option value="flood">Flood (बाढी / डुबान)</option>
                <option value="fire">Fire (आगलागी)</option>
                <option value="earthquake">Earthquake Damage (भूकम्प क्षति)</option>
                <option value="lightning">Lightning / Live Wire (चट्याङ / करेन्ट)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#8E8E8E] uppercase mb-1">
                {isNepaliLang ? 'जोखिमको गम्भीरता:' : 'Severity Level:'}
              </label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value as any)}
                className="w-full bg-[#181818] border border-[#262626] px-3 py-2 text-sm text-white focus:border-[#E8FF00] focus:outline-none"
              >
                <option value="low">Low (सामान्य)</option>
                <option value="moderate">Moderate (मध्यम)</option>
                <option value="high">High (उच्च)</option>
                <option value="critical">Critical (अति संवेदनशील)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#8E8E8E] uppercase mb-1">
                {isNepaliLang ? 'सम्पर्क फोन (वैकल्पिक):' : 'Contact Phone (Optional):'}
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="98XXXXXXXX"
                className="w-full bg-[#181818] border border-[#262626] px-3 py-2 text-sm text-white focus:border-[#E8FF00] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#8E8E8E] uppercase mb-1">
              {isNepaliLang ? 'स्थान तथा मुख्य चिनिने ठाउँ:' : 'Exact Location & Landmarks:'}
            </label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder={isNepaliLang ? 'उदा: पृथ्वी राजमार्ग, जोगीमारा नजिक (धादिङ)' : 'e.g. Prithvi Highway, near Jogimara (Dhading)'}
              className="w-full bg-[#181818] border border-[#262626] px-3 py-2 text-sm text-white focus:border-[#E8FF00] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#8E8E8E] uppercase mb-1">
              {isNepaliLang ? 'घटनाको विस्तृत विवरण:' : 'Description of Incident:'}
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={isNepaliLang ? 'सडक दुईतर्फी बन्द छ, ढुङ्गा खसिरहेको छ, कुनै सवारी फसेको छ कि छैन...' : 'Road blocked, continuous boulder falls, any trapped vehicles...'}
              className="w-full bg-[#181818] border border-[#262626] px-3 py-2 text-sm text-white focus:border-[#E8FF00] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-[#E8FF00] text-black px-6 py-2.5 font-display text-xl tracking-wider hover:bg-white transition-colors"
          >
            <Send className="h-4 w-4" />
            <span>{isNepaliLang ? 'प्रतिवेदन दर्ता गर्नुहोस्' : 'SUBMIT HAZARD REPORT'}</span>
          </button>
        </form>

        {submittedMessage && (
          <div className="border border-[#22C55E] bg-[#0c1f13] p-4 space-y-2">
            <div className="text-xs font-bold text-[#22C55E] flex items-center gap-1">
              <Check className="h-4 w-4" />
              <span>{isNepaliLang ? 'प्रतिवेदन सुरक्षित भयो! तलको एसएमएस सन्देश प्रहरी १०० वा विपद् ११५५ मा पठाउन सक्नुहुन्छ:' : 'Report logged! You can dispatch this SMS to Police 100 or NEOC 1155:'}</span>
            </div>
            <div className="bg-[#050e09] p-3 text-xs font-mono text-[#F6F3EC] break-all border border-[#22C55E]/30">
              {submittedMessage}
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(submittedMessage);
                alert(isNepaliLang ? 'एसएमएस सन्देश कपी भयो!' : 'SMS Copied to clipboard!');
              }}
              className="border border-[#22C55E] text-[#22C55E] px-3 py-1.5 text-xs font-semibold hover:bg-[#22C55E] hover:text-black transition-colors"
            >
              {isNepaliLang ? 'एसएमएस कपी गर्नुहोस्' : 'Copy SMS Text'}
            </button>
          </div>
        )}
      </div>

      {/* Community Reports List */}
      <div className="border border-[#262626] bg-[#111111] p-5">
        <h3 className="font-display text-2xl text-white mb-3">
          {isNepaliLang ? 'नागरिक प्रतिवेदन लग' : 'COMMUNITY HAZARD LOG'}
        </h3>
        <div className="space-y-2">
          {reports.map((rep) => (
            <div
              key={rep.id}
              className="border border-[#262626] bg-[#161616] p-3.5 flex flex-wrap items-start justify-between gap-3"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#E8FF00] uppercase font-mono">
                    {rep.hazardType}
                  </span>
                  <span className="text-[#8E8E8E]">·</span>
                  <span className="text-xs font-semibold text-white">
                    {rep.location}
                  </span>
                </div>
                <p className="text-xs text-[#8E8E8E] mt-1 leading-relaxed">
                  {rep.description}
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[10px] text-[#8E8E8E] block">{rep.time}</span>
                <span className="text-[10px] uppercase font-bold text-[#FF5A00]">
                  {rep.severity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
