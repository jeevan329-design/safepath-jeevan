import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { BottomNav } from './components/BottomNav';
import { SOSModal } from './components/SOSModal';

import { HomeView } from './views/HomeView';
import { ProtocolsView } from './views/ProtocolsView';
import { DirectoryView } from './views/DirectoryView';
import { NumberConverterView } from './views/NumberConverterView';
import { SafeZonesView } from './views/SafeZonesView';
import { ReadinessView } from './views/ReadinessView';
import { FirstAidView } from './views/FirstAidView';
import { AlertsView } from './views/AlertsView';
import { ToolkitView } from './views/ToolkitView';

import { DisasterType, ChecklistItem } from './types';
import { DEFAULT_CHECKLIST } from './data/readinessData';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedEmergency, setSelectedEmergency] = useState<DisasterType>('earthquake');
  const [selectedZoneId, setSelectedZoneId] = useState<string | undefined>(undefined);
  const [isSOSOpen, setIsSOSOpen] = useState<boolean>(false);

  // User preference: Nepali Devanagari numerals vs English digits
  const [useNepaliDigits, setUseNepaliDigits] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('safepath-nepali-digits');
      return stored !== null ? JSON.parse(stored) : true;
    } catch {
      return true;
    }
  });

  // User preference: Language English vs Nepali
  const [isNepaliLang, setIsNepaliLang] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('safepath-nepali-lang');
      return stored !== null ? JSON.parse(stored) : false;
    } catch {
      return false;
    }
  });

  // Checklist state stored in localStorage
  const [checklist, setChecklist] = useState<ChecklistItem[]>(() => {
    try {
      const stored = localStorage.getItem('safepath-readiness-checklist');
      return stored ? JSON.parse(stored) : DEFAULT_CHECKLIST;
    } catch {
      return DEFAULT_CHECKLIST;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('safepath-nepali-digits', JSON.stringify(useNepaliDigits));
    } catch {}
  }, [useNepaliDigits]);

  useEffect(() => {
    try {
      localStorage.setItem('safepath-nepali-lang', JSON.stringify(isNepaliLang));
    } catch {}
  }, [isNepaliLang]);

  useEffect(() => {
    try {
      localStorage.setItem('safepath-readiness-checklist', JSON.stringify(checklist));
    } catch {}
  }, [checklist]);

  const handleToggleChecklistItem = (id: string) => {
    setChecklist(prev =>
      prev.map(item => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const handleAddChecklistItem = (itemData: Omit<ChecklistItem, 'id' | 'done'>) => {
    const newItem: ChecklistItem = {
      ...itemData,
      id: 'custom-' + Date.now(),
      done: false,
    };
    setChecklist(prev => [newItem, ...prev]);
  };

  const handleResetChecklist = () => {
    setChecklist(DEFAULT_CHECKLIST.map(i => ({ ...i, done: false })));
  };

  const handleOpenEmergency = (type: DisasterType) => {
    setSelectedEmergency(type);
    setCurrentView('protocols');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectView = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const completedPrepCount = checklist.filter(c => c.done).length;
  const totalPrepCount = checklist.length;

  return (
    <div className="min-h-screen bg-[#070707] text-[#F6F3EC] flex flex-col font-sans selection:bg-[#E8FF00] selection:text-[#070707]">
      {/* Top Application Header */}
      <Header
        currentView={currentView}
        onSelectView={handleSelectView}
        useNepaliDigits={useNepaliDigits}
        onToggleNepaliDigits={() => setUseNepaliDigits(!useNepaliDigits)}
        isNepaliLang={isNepaliLang}
        onToggleLanguage={() => setIsNepaliLang(!isNepaliLang)}
        onOpenSOS={() => setIsSOSOpen(true)}
      />

      <div className="flex-1 flex">
        {/* Desktop Sidebar */}
        <Sidebar
          currentView={currentView}
          onSelectView={handleSelectView}
          useNepaliDigits={useNepaliDigits}
          isNepaliLang={isNepaliLang}
          onOpenSOS={() => setIsSOSOpen(true)}
        />

        {/* Main View Area */}
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 pb-24 lg:pb-12 lg:pl-80 bg-grid-pattern">
          {currentView === 'home' && (
            <HomeView
              onSelectView={handleSelectView}
              onOpenEmergency={handleOpenEmergency}
              useNepaliDigits={useNepaliDigits}
              isNepaliLang={isNepaliLang}
              completedPrepCount={completedPrepCount}
              totalPrepCount={totalPrepCount}
            />
          )}

          {currentView === 'protocols' && (
            <ProtocolsView
              initialType={selectedEmergency}
              onSelectView={handleSelectView}
              onSelectZone={(id) => setSelectedZoneId(id)}
              useNepaliDigits={useNepaliDigits}
              isNepaliLang={isNepaliLang}
            />
          )}

          {currentView === 'directory' && (
            <DirectoryView
              useNepaliDigits={useNepaliDigits}
              isNepaliLang={isNepaliLang}
            />
          )}

          {currentView === 'numbers' && (
            <NumberConverterView
              useNepaliDigits={useNepaliDigits}
              isNepaliLang={isNepaliLang}
            />
          )}

          {currentView === 'safezones' && (
            <SafeZonesView
              selectedZoneId={selectedZoneId}
              onSelectZone={(id) => setSelectedZoneId(id)}
              useNepaliDigits={useNepaliDigits}
              isNepaliLang={isNepaliLang}
            />
          )}

          {currentView === 'readiness' && (
            <ReadinessView
              checklist={checklist}
              onToggleItem={handleToggleChecklistItem}
              onAddItem={handleAddChecklistItem}
              onResetChecklist={handleResetChecklist}
              useNepaliDigits={useNepaliDigits}
              isNepaliLang={isNepaliLang}
            />
          )}

          {currentView === 'firstaid' && (
            <FirstAidView
              useNepaliDigits={useNepaliDigits}
              isNepaliLang={isNepaliLang}
            />
          )}

          {currentView === 'alerts' && (
            <AlertsView
              useNepaliDigits={useNepaliDigits}
              isNepaliLang={isNepaliLang}
            />
          )}

          {currentView === 'toolkit' && (
            <ToolkitView
              useNepaliDigits={useNepaliDigits}
              isNepaliLang={isNepaliLang}
            />
          )}
        </main>
      </div>

      {/* Mobile Sticky Bottom Tab Bar */}
      <BottomNav
        currentView={currentView}
        onSelectView={handleSelectView}
        isNepaliLang={isNepaliLang}
      />

      {/* Urgent Emergency SOS Modal */}
      <SOSModal
        isOpen={isSOSOpen}
        onClose={() => setIsSOSOpen(false)}
        useNepaliDigits={useNepaliDigits}
        isNepaliLang={isNepaliLang}
      />
    </div>
  );
}
