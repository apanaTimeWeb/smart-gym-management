// RESPONSIBILITY: Root client orchestrator for the Communications module — renders KPIs, tab switcher, and conditionally Composer, History, Automations, or Churn Recovery.
'use client';

import { MessageCircle, History, Zap, UserX } from 'lucide-react';
import ManagerCommunicationsKPIs from '@/app/manager/communications/communications_components/ManagerCommunicationsKPIs/ManagerCommunicationsKPIs';
import ManagerCommunicationsComposer from '@/app/manager/communications/communications_components/ManagerCommunicationsComposer/ManagerCommunicationsComposer';
import ManagerCommunicationsHistory from '@/app/manager/communications/communications_components/ManagerCommunicationsHistory/ManagerCommunicationsHistory';
import ManagerCommunicationsAutomations from '@/app/manager/communications/communications_components/ManagerCommunicationsAutomations/ManagerCommunicationsAutomations';
import ManagerChurnRecoveryTab from '@/app/manager/communications/communications_components/ManagerChurnRecovery/ManagerChurnRecoveryTab';
import { useManagerCommunicationsLogic } from '@/app/manager/communications/communications_context/useManagerCommunicationsLogic';
import type { CommActiveTab } from '@/app/manager/communications/communications_store/useManagerCommunicationsStore';

const TABS: { value: CommActiveTab; label: string; Icon: React.ElementType }[] = [
  { value: 'compose',        label: 'Compose',       Icon: MessageCircle },
  { value: 'history',        label: 'Send History',  Icon: History },
  { value: 'automations',    label: 'Automations',   Icon: Zap },
  { value: 'churn_recovery', label: 'Win-Back',      Icon: UserX },
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
        <div className="flex items-center gap-1 bg-input border border-border rounded-xl p-1 w-fit flex-wrap">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.value;
            const { Icon } = tab;
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveTab(tab.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isActive
                    ? 'bg-card text-foreground shadow-sm border border-border'
                    : 'text-secondary hover:text-foreground'
                } ${tab.value === 'churn_recovery' && isActive ? 'text-danger' : ''}`}
              >
                <Icon
                  size={15}
                  className={tab.value === 'churn_recovery' && isActive ? 'text-danger' : ''}
                />
                {tab.label}
                {tab.value === 'churn_recovery' && (
                  <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-danger-bg text-danger">
                    NEW
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {activeTab === 'compose'        && <ManagerCommunicationsComposer />}
        {activeTab === 'history'        && <ManagerCommunicationsHistory />}
        {activeTab === 'automations'    && <ManagerCommunicationsAutomations />}
        {activeTab === 'churn_recovery' && <ManagerChurnRecoveryTab />}
      </div>
    </div>
  );
}
