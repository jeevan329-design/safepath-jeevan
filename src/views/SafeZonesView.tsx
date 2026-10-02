import React, { useState, useEffect } from 'react';
import { 
  APIProvider, 
  Map, 
  AdvancedMarker, 
  Pin, 
  InfoWindow 
} from '@vis.gl/react-google-maps';
import { 
  MapPin, 
  Navigation, 
  Phone, 
  ShieldCheck, 
  ExternalLink, 
  Building, 
  Activity, 
  Check, 
  Copy,
  Layers,
  Compass
} from 'lucide-react';
import { SafeZone } from '../types';
import { NEPAL_SAFE_ZONES, BUTWAL_CENTER } from '../data/nepaliSafeZones';
import { toNepaliNumerals } from '../utils/nepaliNumbers';

interface SafeZonesViewProps {
  selectedZoneId?: string;
  onSelectZone: (id: string) => void;
  useNepaliDigits: boolean;
  isNepaliLang: boolean;
}

export const SafeZonesView: React.FC<SafeZonesViewProps> = ({
  selectedZoneId,
  onSelectZone,
  useNepaliDigits,
  isNepaliLang,
}) => {
  const [cityFilter, setCityFilter] = useState<'butwal' | 'all'>('butwal');
  const [filterType, setFilterType] = useState<string>('all');
  const [activeZoneId, setActiveZoneId] = useState<string>(selectedZoneId || 'butwal-mandap-ramnagar');
  const [copiedCoords, setCopiedCoords] = useState(false);
  const [showInfoWindow, setShowInfoWindow] = useState(true);
  const [mapType, setMapType] = useState<'roadmap' | 'satellite' | 'hybrid'>('roadmap');

  // Load Google Maps API key from environment variable
  const apiKey = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string) || '';

  const fmt = (val: string | number) => (useNepaliDigits ? toNepaliNumerals(val) : String(val));

  const filters = [
    { id: 'all', labelEn: 'All Zones', labelNe: 'सबै खुला क्षेत्र' },
    { id: 'open_space', labelEn: 'Open Grounds', labelNe: 'खुला चौर' },
    { id: 'hospital', labelEn: 'Trauma Hospital', labelNe: 'ट्रमा अस्पताल' },
    { id: 'high_ground', labelEn: 'High Ground', labelNe: 'उच्च भेग (बाढी सुरक्षित)' },
    { id: 'stadium', labelEn: 'Stadium / Sports', labelNe: 'रङ्गशाला' },
    { id: 'helipad', labelEn: 'APF Rescue Base', labelNe: 'उद्धार केन्द्र' },
  ];

  const cityZones = NEPAL_SAFE_ZONES.filter((z) => {
    if (cityFilter === 'butwal') {
      return z.province === 'lumbini' || z.district.includes('Butwal') || z.district.includes('Rupandehi');
    }
    return true;
  });

  const filteredZones = cityZones.filter((z) => {
    if (filterType === 'all') return true;
    return z.type === filterType;
  });

  const selectedZone = NEPAL_SAFE_ZONES.find((z) => z.id === activeZoneId) || filteredZones[0] || NEPAL_SAFE_ZONES[0];

  const handleSelect = (zone: SafeZone) => {
    setActiveZoneId(zone.id);
    onSelectZone(zone.id);
    setShowInfoWindow(true);
  };

  const copyCoordinates = (lat: number, lng: number) => {
    navigator.clipboard.writeText(`${lat}, ${lng}`).then(() => {
      setCopiedCoords(true);
      setTimeout(() => setCopiedCoords(false), 2000);
    });
  };

  const getPinColor = (type: SafeZone['type']) => {
    switch (type) {
      case 'hospital':
        return { background: '#FF2A00', glyphColor: '#FFFFFF', borderColor: '#070707' };
      case 'high_ground':
        return { background: '#00E8FF', glyphColor: '#070707', borderColor: '#070707' };
      case 'stadium':
        return { background: '#FF5A00', glyphColor: '#FFFFFF', borderColor: '#070707' };
      case 'helipad':
        return { background: '#22C55E', glyphColor: '#070707', borderColor: '#070707' };
      default:
        return { background: '#E8FF00', glyphColor: '#070707', borderColor: '#070707' };
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#262626] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E8FF00]">
            <span className="h-2 w-2 rounded-full bg-[#22C55E] animate-ping" />
            <span>{isNepaliLang ? 'वास्तविक गुगल नक्सा · बुटवल उपमहानगर' : 'Live Google Maps · Butwal Sub-Metropolitan'}</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl tracking-wide text-white mt-1">
            {isNepaliLang ? 'बुटवल सुरक्षित स्थान तथा नक्सा' : 'BUTWAL SAFE ZONES MAP'}
          </h1>
          <p className="text-sm text-[#8E8E8E] max-w-2xl mt-1">
            {isNepaliLang
              ? 'बुटवल मण्डप, दीपनगर, लुम्बिनी प्रादेशिक अस्पताल, देवीनगर र तिनाउ नदी उच्च भेगका प्रमाणित आपतकालीन खुला चौरहरू।'
              : 'Interactive real-world Google Maps for Butwal, Tinau river high grounds, Lumbini Provincial Hospital, and BICC Mandap.'}
          </p>
        </div>

        {/* City Filter Toggle: Butwal vs All Nepal */}
        <div className="flex items-center gap-1 border border-[#262626] bg-[#111111] p-1">
          <button
            onClick={() => setCityFilter('butwal')}
            className={`px-3 py-1.5 text-xs font-bold transition-colors ${
              cityFilter === 'butwal'
                ? 'bg-[#E8FF00] text-black shadow-sm'
                : 'text-[#8E8E8E] hover:text-white'
            }`}
          >
            {isNepaliLang ? 'बुटवल मात्र (Butwal)' : 'Butwal (Default)'}
          </button>
          <button
            onClick={() => setCityFilter('all')}
            className={`px-3 py-1.5 text-xs font-bold transition-colors ${
              cityFilter === 'all'
                ? 'bg-[#E8FF00] text-black shadow-sm'
                : 'text-[#8E8E8E] hover:text-white'
            }`}
          >
            {isNepaliLang ? 'सम्पूर्ण नेपाल' : 'All Nepal Hubs'}
          </button>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex overflow-x-auto gap-1.5 pb-1 border-b border-[#262626] no-scrollbar">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilterType(f.id)}
            className={`px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors border min-h-[44px] ${
              filterType === f.id
                ? 'bg-[#E8FF00] text-black border-[#E8FF00]'
                : 'bg-[#111111] text-[#8E8E8E] border-[#262626] hover:text-white'
            }`}
          >
            {isNepaliLang ? f.labelNe : f.labelEn}
          </button>
        ))}
      </div>

      {/* Main Grid: Real Google Map + Safe Zones List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Real Google Map Container (7 cols) */}
        <div className="lg:col-span-7 border border-[#262626] bg-[#0d0d0d] p-3 sm:p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#8E8E8E] px-1 mb-2">
            <span className="flex items-center gap-1.5">
              <Compass className="h-4 w-4 text-[#E8FF00]" />
              <strong className="text-white">
                {cityFilter === 'butwal' ? (isNepaliLang ? 'बुटवल उपमहानगर (रुपन्देही)' : 'Butwal, Lumbini') : (isNepaliLang ? 'नेपाल' : 'Nepal')}
              </strong>
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMapType(mapType === 'roadmap' ? 'hybrid' : 'roadmap')}
                className="text-[11px] font-mono uppercase text-[#E8FF00] border border-[#E8FF00]/40 px-2 py-0.5 hover:bg-[#E8FF00] hover:text-black transition-colors"
              >
                {mapType === 'roadmap' ? 'Satellite View' : 'Roadmap View'}
              </button>
              <span className="text-[#8E8E8E] font-mono">
                {fmt(filteredZones.length)} {isNepaliLang ? 'स्थान' : 'Sites'}
              </span>
            </div>
          </div>

          {/* Real Google Maps Component Wrapper */}
          <div className="relative w-full h-[450px] sm:h-[520px] overflow-hidden border border-[#262626] bg-[#141414]">
            <APIProvider apiKey={apiKey} libraries={['marker']}>
              <Map
                mapId={'DEMO_MAP_ID'}
                defaultCenter={{ lat: selectedZone.lat, lng: selectedZone.lng }}
                center={{ lat: selectedZone.lat, lng: selectedZone.lng }}
                defaultZoom={14}
                mapTypeId={mapType}
                gestureHandling={'greedy'}
                disableDefaultUI={false}
                internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                className="w-full h-full"
              >
                {/* Advanced Markers for each safe zone in Butwal / Nepal */}
                {filteredZones.map((zone) => {
                  const colors = getPinColor(zone.type);
                  const isSelected = selectedZone.id === zone.id;

                  return (
                    <AdvancedMarker
                      key={zone.id}
                      position={{ lat: zone.lat, lng: zone.lng }}
                      onClick={() => handleSelect(zone)}
                      title={isNepaliLang ? zone.nepaliName : zone.name}
                    >
                      <Pin
                        background={colors.background}
                        glyphColor={colors.glyphColor}
                        borderColor={isSelected ? '#FFFFFF' : colors.borderColor}
                        scale={isSelected ? 1.25 : 1.0}
                      />
                    </AdvancedMarker>
                  );
                })}

                {/* InfoWindow for selected safe zone */}
                {showInfoWindow && selectedZone && (
                  <InfoWindow
                    position={{ lat: selectedZone.lat, lng: selectedZone.lng }}
                    onCloseClick={() => setShowInfoWindow(false)}
                    pixelOffset={[0, -38]}
                  >
                    <div className="p-1 text-black max-w-[260px]">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#FF5A00]">
                        {selectedZone.type.replace('_', ' ')}
                      </div>
                      <h4 className="font-bold text-sm text-black leading-tight mt-0.5">
                        {isNepaliLang ? selectedZone.nepaliName : selectedZone.name}
                      </h4>
                      <p className="text-xs text-gray-600 mt-1">
                        {selectedZone.address}
                      </p>
                      <div className="mt-2 pt-1.5 border-t border-gray-200 flex items-center justify-between text-xs">
                        <span className="font-semibold text-black">
                          {isNepaliLang ? selectedZone.nepaliCapacity : selectedZone.capacity}
                        </span>
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${selectedZone.lat},${selectedZone.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#FF2A00] font-bold hover:underline flex items-center gap-1"
                        >
                          <span>{isNepaliLang ? 'दिशा' : 'Route'}</span>
                          <Navigation className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </InfoWindow>
                )}
              </Map>
            </APIProvider>
          </div>

          {/* Map Pin Category Legend */}
          <div className="mt-3 flex flex-wrap items-center justify-between text-[11px] uppercase tracking-wider text-[#8E8E8E] px-1 pt-2 border-t border-[#1e1e1e]">
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="h-2.5 w-2.5 bg-[#E8FF00] inline-block" /> {isNepaliLang ? 'खुला चौर' : 'Open Ground'}
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2.5 w-2.5 bg-[#00E8FF] inline-block" /> {isNepaliLang ? 'उच्च भेग (बाढी सुरक्षित)' : 'High Ground'}
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2.5 w-2.5 bg-[#FF2A00] inline-block" /> {isNepaliLang ? 'ट्रमा अस्पताल' : 'Hospital'}
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2.5 w-2.5 bg-[#FF5A00] inline-block" /> {isNepaliLang ? 'रङ्गशाला' : 'Stadium'}
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2.5 w-2.5 bg-[#22C55E] inline-block" /> {isNepaliLang ? 'उद्धार केन्द्र' : 'APF Rescue Base'}
              </span>
            </div>
            <span className="text-[#666]">{isNepaliLang ? 'पिनमा थिच्नुहोस्' : 'Tap pin for details'}</span>
          </div>
        </div>

        {/* Zones List & Selection Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-2 max-h-[560px] overflow-y-auto pr-1">
          {filteredZones.map((z) => {
            const isSelected = selectedZone.id === z.id;
            return (
              <button
                key={z.id}
                onClick={() => handleSelect(z)}
                className={`w-full text-left p-4 border transition-all ${
                  isSelected
                    ? 'border-[#E8FF00] bg-[#181818]'
                    : 'border-[#262626] bg-[#111111] hover:border-[#383838]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-display text-xl text-white leading-tight">
                      {isNepaliLang ? z.nepaliName : z.name}
                    </h3>
                    <div className="text-xs text-[#8E8E8E] mt-0.5">
                      {z.address}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-mono text-xs font-bold text-[#E8FF00]">
                      {fmt(z.distance.split(' ')[0])} {z.distance.includes('km') ? 'km' : ''}
                    </span>
                    <div className="text-[10px] uppercase font-semibold text-[#8E8E8E]">
                      {z.type.replace('_', ' ')}
                    </div>
                  </div>
                </div>

                <div className="mt-2.5 flex items-center justify-between text-xs text-[#8E8E8E] pt-2 border-t border-[#1e1e1e]">
                  <span>
                    {isNepaliLang ? 'क्षमता:' : 'Capacity:'}{' '}
                    <strong className="text-white font-mono">
                      {isNepaliLang ? z.nepaliCapacity : z.capacity}
                    </strong>
                  </span>
                  <span className="text-[#22C55E] text-[11px] font-semibold">
                    {fmt(z.facilities.length)} {isNepaliLang ? 'सुविधा' : 'Amenities'}
                  </span>
                </div>
              </button>
            );
          })}

          {filteredZones.length === 0 && (
            <div className="border border-dashed border-[#262626] p-6 text-center text-sm text-[#8E8E8E]">
              {isNepaliLang ? 'कुनै स्थान फेला परेन।' : 'No safe zones matched this filter.'}
            </div>
          )}
        </div>
      </div>

      {/* Selected Safe Zone Detailed Information Card */}
      {selectedZone && (
        <div className="border-2 border-[#E8FF00] bg-[#111111] p-5 sm:p-7 space-y-5">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#262626] pb-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#E8FF00]">
                {isNepaliLang ? 'चयन गरिएको सुरक्षित आश्रयस्थल' : 'Selected Safe Zone Details'}
              </div>
              <h2 className="font-display text-4xl sm:text-5xl text-white mt-1">
                {isNepaliLang ? selectedZone.nepaliName : selectedZone.name}
              </h2>
              <div className="text-sm text-[#8E8E8E] mt-1">
                {selectedZone.address}, {selectedZone.district}
              </div>
            </div>

            <div className="flex flex-col sm:items-end">
              <div className="font-display text-3xl sm:text-4xl text-[#E8FF00] font-mono">
                {isNepaliLang ? selectedZone.nepaliCapacity : selectedZone.capacity}
              </div>
              <div className="text-xs uppercase tracking-wider text-[#8E8E8E]">
                {isNepaliLang ? 'प्रमाणित शिविर क्षमता' : 'Designated Capacity'}
              </div>
            </div>
          </div>

          <p className="text-sm text-[#F6F3EC] leading-relaxed">
            {selectedZone.description}
          </p>

          {/* On-Site Facilities Badges */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#8E8E8E] mb-2">
              {isNepaliLang ? 'स्थलमा उपलब्ध आपतकालीन सुविधाहरू:' : 'Emergency On-Site Facilities & Infrastructure:'}
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedZone.facilities.map((fac, idx) => (
                <span
                  key={idx}
                  className="flex items-center gap-1.5 border border-[#262626] bg-[#161616] px-3 py-1.5 text-xs text-white"
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-[#22C55E]" />
                  <span>{fac}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs: Real Google Maps Directions, Copy GPS, Emergency Call */}
          <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-[#262626]">
            {/* Real Google Maps Turn-By-Turn Route Link */}
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${selectedZone.lat},${selectedZone.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#E8FF00] text-black px-5 py-2.5 font-display text-xl tracking-wider hover:bg-white transition-colors"
            >
              <Navigation className="h-4 w-4" />
              <span>{isNepaliLang ? 'गुगल नक्सामा बाटो हेर्नुहोस्' : 'NAVIGATE IN GOOGLE MAPS'}</span>
              <ExternalLink className="h-3.5 w-3.5 ml-1" />
            </a>

            <button
              onClick={() => copyCoordinates(selectedZone.lat, selectedZone.lng)}
              className="flex items-center gap-2 border border-[#262626] bg-[#161616] px-4 py-2.5 text-xs font-semibold text-white hover:border-[#E8FF00] transition-colors"
            >
              {copiedCoords ? <Check className="h-4 w-4 text-[#22C55E]" /> : <Copy className="h-4 w-4" />}
              <span>
                {copiedCoords 
                  ? (isNepaliLang ? 'जीपीएस कपी भयो!' : 'Coordinates Copied!')
                  : `${selectedZone.lat}° N, ${selectedZone.lng}° E`}
              </span>
            </button>

            {selectedZone.type === 'hospital' ? (
              <a
                href="tel:071540200"
                className="flex items-center gap-1.5 border border-[#FF2A00] bg-[#FF2A00]/10 text-[#FF2A00] px-4 py-2.5 font-display text-xl tracking-wider hover:bg-[#FF2A00] hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>{isNepaliLang ? 'अस्पताल कल ०७१-५४०२००' : 'CALL ER 071-540200'}</span>
              </a>
            ) : (
              <a
                href="tel:100"
                className="flex items-center gap-1.5 border border-[#FF2A00] text-[#FF2A00] px-4 py-2.5 font-display text-xl tracking-wider hover:bg-[#FF2A00] hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>{isNepaliLang ? 'प्रहरी मद्दत १००' : 'POLICE 100'}</span>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
