// RESPONSIBILITY: Renders ManagerCommunicationsSegmentPicker's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { Users, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { COMM_SEGMENT_OPTIONS } from '@/app/frontend_manager/manager_communications/manager_communications_constants/ManagerCommunicationsSharedConstants';
import { useManagerCommunicationsLogic } from '@/app/frontend_manager/manager_communications/manager_communications_hooks/useManagerCommunicationsLogic';


/** @description Renders the ManagerCommunicationsSegmentPicker component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (2 documented module/import dependencies).. @edge-case Preserves loading state. */
export default function ManagerCommunicationsSegmentPicker() {
  const t = useTranslations('MANAGER_COMMUNICATIONS');

  const { selectedSegment, handleSegmentChange, segmentRecipients, loadingRecipients } = useManagerCommunicationsLogic();

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-secondary uppercase tracking-wider">{t("COPY_1_CHOOSE_AUDIENCE_SEGMENT")}</label>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {COMM_SEGMENT_OPTIONS.map((opt, mapIndex) => {
          const isActive = selectedSegment === opt.value;
          return (
            <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", (`min-w-32 text-left p-4 rounded-xl border motion-safe:transition-all ${
                isActive
                  ? 'bg-primary-subtle border-primary text-primary'
                  : 'bg-card border-border text-secondary hover:border-focus hover:text-primary'
              } motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110`)].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_communications-communications-managercommunicationssegmentpicker-button-primary-${mapIndex}`}
              key={opt.value}
              type="button"
              onClick={() => handleSegmentChange(opt.value)}
              
            >
              <p className={`text-sm font-semibold ${isActive ? 'text-primary' : ''}`}>{opt.label}</p>
              <p className="text-xs mt-0.5 opacity-80">{opt.description}</p>
              {isActive && opt.value !== 'custom' && (
                <div className="flex items-center gap-1.5 mt-2">
                  {loadingRecipients ? (
                    <Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin text-primary"/>
                  ) : (
                    <Users size={18} strokeWidth={2} className="text-primary"/>
                  )}
                  <span className="text-xs font-semibold text-primary">
                    {loadingRecipients ? t('COPY_LOADING') : `${segmentRecipients.length} recipients`}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
