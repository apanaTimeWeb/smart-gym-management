// RESPONSIBILITY: Renders ManagerCommunicationsMain's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { MessageCircle, History, Zap, UserX } from 'lucide-react';
import { useTranslations } from 'next-intl';
import ManagerCommunicationsAutomations from '@/app/frontend_manager/manager_communications/manager_communications_components/manager_communications_automations/ManagerCommunicationsAutomations';
import ManagerCommunicationsChurnRecoveryTab from '@/app/frontend_manager/manager_communications/manager_communications_components/manager_communications_churn_recovery/ManagerCommunicationsChurnRecoveryTab';
import ManagerCommunicationsComposer from '@/app/frontend_manager/manager_communications/manager_communications_components/manager_communications_composer/ManagerCommunicationsComposer';
import ManagerCommunicationsHistory from '@/app/frontend_manager/manager_communications/manager_communications_components/manager_communications_history/ManagerCommunicationsHistory';
import ManagerCommunicationsKPIs from '@/app/frontend_manager/manager_communications/manager_communications_components/manager_communications_kpis/ManagerCommunicationsKPIs';
import { useManagerCommunicationsLogic } from '@/app/frontend_manager/manager_communications/manager_communications_hooks/useManagerCommunicationsLogic';
import type { CommActiveTab } from '@/app/frontend_manager/manager_communications/manager_communications_types/ManagerCommunicationsTypes';
import type { ElementType } from 'react';


/**
 * @description Renders/orchestrates the ManagerCommunicationsMain user interface for the communications module without owning sibling business logic.
 * @dependencies @/app/frontend_manager/manager_communications/manager_communications_components/manager_communications_churn_recovery/ManagerCommunicationsChurnRecoveryTab; @/app/frontend_manager/manager_communications/manager_communications_components/manager_communications_automations/ManagerCommunicationsAutomations; @/app/frontend_manager/manager_communications/manager_communications_components/manager_communications_composer/ManagerCommunicationsComposer; @/app/frontend_manager/manager_communications/manager_communications_components/manager_communications_history/ManagerCommunicationsHistory; @/app/frontend_manager/manager_communications/manager_communications_components/manager_communications_kpis/ManagerCommunicationsKPIs
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
const TABS: { value: CommActiveTab; labelKey: string; Icon: ElementType }[] = [
  { value: 'compose', labelKey: 'COPY_COMPOSE', Icon: MessageCircle },
  { value: 'history', labelKey: 'COPY_SEND_HISTORY', Icon: History },
  { value: 'automations', labelKey: 'COPY_AUTOMATIONS', Icon: Zap },
  { value: 'churn_recovery', labelKey: 'COPY_WIN_BACK_2', Icon: UserX },
];

/** @description Renders the ManagerCommunicationsMain component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (7 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerCommunicationsMain() {
  const t = useTranslations('MANAGER_COMMUNICATIONS');

  const { activeTab, setActiveTab } = useManagerCommunicationsLogic();

  return (
    <div className="min-h-full pb-10">
      {/* Header */}
      <div className="px-6 pt-6 pb-0">
        <h1 className="text-2xl font-bold text-primary">{t("COPY_COMMUNICATIONS")}</h1>
        <p className="text-sm text-secondary mt-0.5">{t("COPY_SEND_BULK_WHATSAPP_EMAIL_MESSAGES_TARGETED_MEMBER_SEGMENTS")}</p>
      </div>

      <div className="p-6 space-y-5">
        <ManagerCommunicationsKPIs />

        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-input border border-border rounded-xl p-1 w-fit flex-wrap">
          {TABS.map((tab, mapIndex) => {
            const isActive = activeTab === tab.value;
            const { Icon } = tab;
            return (
              <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", (`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isActive
                    ? 'bg-card text-primary shadow-card border border-border'
                    : 'text-secondary hover:text-primary'
                } ${tab.value === 'churn_recovery' && isActive ? 'text-danger' : ''} motion-safe:duration-base ease-in-out motion-safe:active:scale-95 hover:brightness-110`)].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_communications-communications-managercommunicationsmain-button-primary-${mapIndex}`}
                key={tab.value}
                type="button"
                onClick={() => setActiveTab(tab.value)}
                
              >
                <Icon
                  size={18}
                  className={tab.value === 'churn_recovery' && isActive ? 'text-danger' : ''}
                />
                {t(tab.labelKey)}
                {tab.value === 'churn_recovery' && (
                  <span className="ml-1 px-1.5 py-0.5 rounded-full text-xs font-semibold bg-danger text-on-danger" data-testid="manager_communications-managercommunicationsmain-status-badge-1">{t("COPY_NEW")}</span>
                )}
              </button>
            );
          })}
        </div>

        {activeTab === 'compose'        && <ManagerCommunicationsComposer />}
        {activeTab === 'history'        && <ManagerCommunicationsHistory />}
        {activeTab === 'automations'    && <ManagerCommunicationsAutomations />}
        {activeTab === 'churn_recovery' && <ManagerCommunicationsChurnRecoveryTab  data-testid="manager_communications-managercommunicationsmain-communications-churn-recovery-tab-1"/>}
      </div>
    </div>
  );
}
