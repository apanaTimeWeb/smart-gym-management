// RESPONSIBILITY: Renders AdminCampaignsMain for the admin frontend module; feature logic stays in dedicated hooks, stores, APIs, and schemas.
'use client';
import { Rocket, Send } from 'lucide-react';
import AdminCampaignsAudiencePicker from '@/app/admin/campaigns/campaigns_components/AdminCampaignsAudiencePicker/AdminCampaignsAudiencePicker';
import AdminCampaignsTemplatePicker from '@/app/admin/campaigns/campaigns_components/AdminCampaignsTemplatePicker/AdminCampaignsTemplatePicker';
import AdminCampaignsComposer from '@/app/admin/campaigns/campaigns_components/AdminCampaignsComposer/AdminCampaignsComposer';
import AdminCampaignsQueuePanel from '@/app/admin/campaigns/campaigns_components/AdminCampaignsQueuePanel/AdminCampaignsQueuePanel';
import AdminCampaignsSectionState from '@/app/admin/campaigns/campaigns_components/AdminCampaignsSectionState';
import { useAdminCampaignsLogic } from '@/app/admin/campaigns/campaigns_context/useAdminCampaignsLogic';

export default function AdminCampaignsMain() {
  const logic = useAdminCampaignsLogic();
  const recipientsReady = Boolean(logic.audienceId) && logic.recipientCount > 0;

  return (
    <div className="space-y-6 bg-page">
      <header className="flex flex-col gap-2">
        <h1 className="flex items-center gap-2 text-xl font-bold text-primary"><Rocket size={18} aria-hidden="true" />Global Marketing & CRM</h1>
        <p className="text-sm text-secondary">Run bulk WhatsApp campaigns across all your branches efficiently.</p>
      </header>

      {logic.audiencesStatus === 'pending' ? <AdminCampaignsSectionState message="Loading audiences..." loading /> : logic.audiencesStatus === 'error' ? <AdminCampaignsSectionState message="Unable to load campaign audiences." retry={() => void logic.refetchAudiences()} /> : (
        <AdminCampaignsAudiencePicker audiences={logic.audiences} selectedAudienceId={logic.audienceId} onSelect={logic.selectAudience} />
      )}

      {logic.templatesStatus === 'pending' ? <AdminCampaignsSectionState message="Loading message templates..." loading /> : logic.templatesStatus === 'error' ? <AdminCampaignsSectionState message="Unable to load message templates." retry={() => void logic.refetchTemplates()} /> : (
        <AdminCampaignsTemplatePicker templates={logic.templates} selectedTemplateId={logic.templateId} onSelect={logic.selectTemplate} />
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <AdminCampaignsComposer body={logic.body} onChange={logic.setBody} />
        <div className="flex flex-col justify-end">
          <p className="mb-3 text-sm text-secondary">{logic.audienceId ? `${logic.recipientCount} recipient${logic.recipientCount === 1 ? '' : 's'} selected.` : 'Select an audience to load recipients.'}</p>
          {logic.recipientsStatus === 'error' && (
            <div className="mb-3 rounded-lg border border-danger bg-danger-bg px-3 py-2 text-xs text-danger">
              <p>Unable to load recipients for this audience.</p>
              <button type="button" onClick={() => void logic.refetchRecipients()} className="motion-safe:transition-all motion-safe:duration-base ease-in-out mt-2 font-semibold underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Try Again</button>
            </div>
          )}
          <button
            type="button"
            onClick={() => { logic.createQueue(); }}
            disabled={!logic.audienceId || !logic.body.trim() || !recipientsReady || logic.recipientsStatus === 'pending'}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 text-lg font-bold text-on-primary shadow-card motion-safe:transition-colors motion-safe:duration-base hover:bg-primary-hover disabled:cursor-not-allowed disabled:bg-primary-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Send size={18} aria-hidden="true" />
            {logic.recipientsStatus === 'pending' ? 'Loading Recipients...' : 'Preview & Send'}
          </button>
        </div>
      </div>

      <AdminCampaignsQueuePanel queue={logic.queue} onOpen={logic.openQueueItem} onMarkSent={(index) => logic.setQueueStatus(index, 'SENT')} onSkip={(index) => logic.setQueueStatus(index, 'SKIPPED')} />
    </div>
  );
}
