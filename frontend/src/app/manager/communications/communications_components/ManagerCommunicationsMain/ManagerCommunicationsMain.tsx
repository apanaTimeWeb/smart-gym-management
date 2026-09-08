// RESPONSIBILITY: Root client orchestrator for the Communications module — renders KPIs, tab switcher, and conditionally Composer or History.
'use client';

import { MessageCircle, History, Zap } from 'lucide-react';
import ManagerCommunicationsKPIs from '@/app/manager/communications/communications_components/ManagerCommunicationsKPIs/ManagerCommunicationsKPIs';
import ManagerCommunicationsComposer from '@/app/manager/communications/communications_components/ManagerCommunicationsComposer/ManagerCommunicationsComposer';
import ManagerCommunicationsHistory from '@/app/manager/communications/communications_components/ManagerCommunicationsHistory/ManagerCommunicationsHistory';
import ManagerCommunicationsAutomations from '@/app/manager/communications/communications_components/ManagerCommunicationsAutomations/ManagerCommunicationsAutomations';
import { useManagerCommunicationsLogic } from '@/app/manager/communications/communications_context/useManagerCommunicationsLogic';
import type { CommActiveTab } from '@/app/manager/communications/communications_store/useManagerCommunicationsStore';

const TABS: { value: CommActiveTab; label: string; icon: any }[] = [
  { value: 'compose', label: 'Compose',       icon: MessageCircle },
  { value: 'history', label: 'Send History',  icon: History },
  { value: 'automations', label: 'Automations', icon: Zap },
];

export default function ManagerCommunicationsMain() {
  const { activeTab, setActiveTab } = useManagerCommunicationsLogic();

  return (
    <div className="min-h-full pb-10">
      {/* Header */}
      <div className="px-6 pt-6 pb-0">
        <h1 className="text-2xl font-bold text-foreground">Communications</h1>
        <p className="text-sm text-secondary mt-0.5">Send bulk WhatsApp or Email messages to targeted member segments</p>
      </div>

      <div className="p-6 space-y-5">
        <ManagerCommunicationsKPIs />

        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-input border border-border rounded-xl p-1 w-fit">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.value;
            const Icon = tab.icon;
            return (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium motion-safe:transition-all ${
                  isActive
                    ? 'bg-card text-foreground shadow-sm border border-border'
                    : 'text-secondary hover:text-foreground'
                }`}
              >
                <Icon size={15} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab === 'compose' && <ManagerCommunicationsComposer />}
        {activeTab === 'history' && <ManagerCommunicationsHistory />}
        {activeTab === 'automations' && <ManagerCommunicationsAutomations />}
      </div>
    </div>
  );
}
