'use client';
// RESPONSIBILITY: Renders or orchestrates the Superadmin MessagingV1WhatsAppBulkCenter responsibility defined by this module feature.
import { SUPERADMIN_WHATSAPP_QUEUE_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_constants/SuperadminMessagingConstants';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import { Building2, Rocket, ShieldCheck } from 'lucide-react';

import Panel from '@/components/ui/Panel';

import SuperadminMessagingV1WhatsAppAudiencePanel from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_components/SuperadminMessagingV1WhatsAppAudiencePanel';
import SuperadminMessagingV1WhatsAppCampaignHistoryPanel from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_components/SuperadminMessagingV1WhatsAppCampaignHistoryPanel';
import SuperadminMessagingV1WhatsAppCampaignSummaryCards from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_components/SuperadminMessagingV1WhatsAppCampaignSummaryCards';
import SuperadminMessagingV1WhatsAppComposerPanel from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_components/SuperadminMessagingV1WhatsAppComposerPanel';
import SuperadminMessagingV1WhatsAppPreviewPanel from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_components/SuperadminMessagingV1WhatsAppPreviewPanel';
import SuperadminMessagingV1WhatsAppQueuePanel from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_components/SuperadminMessagingV1WhatsAppQueuePanel';
import SuperadminMessagingV1WhatsAppTemplatePicker from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_components/SuperadminMessagingV1WhatsAppTemplatePicker';
import { buildWhatsAppLink, getEligibleWhatsAppRecipients, getWhatsAppPreviewRecipient, replaceWhatsAppVariables } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_utils/SuperadminMessagingV1WhatsAppUtils';
import { useSuperadminMessagingV1WhatsAppCampaign } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_hooks/useSuperadminMessagingV1WhatsAppCampaign';

import type { SuperadminMessagingV1WhatsAppBulkCenterProps, SuperadminWhatsAppQueueRecipient, SuperadminWhatsAppTemplate } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_types/SuperadminMessagingV1WhatsAppTypes';
import type { SuperadminMessagingWhatsAppQueueActionStatus } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_types/SuperadminMessagingWhatsAppTypes';

/**
 * @description Renders or orchestrates the Superadmin MessagingV1WhatsAppBulkCenter responsibility defined by this module feature.
 * @dependencies Uses the existing feature-local API, query, state, and approved UI/infrastructure contracts imported by this component.
 * @edge-case Interactive, loading, empty, error, disabled, and repeated-action paths must remain recoverable through the owning feature contract.
 */
export default function SuperadminMessagingV1WhatsAppBulkCenter({ data }: SuperadminMessagingV1WhatsAppBulkCenterProps) {
  const t = useTranslations('superadmin_messaging');
    const [audienceId, setAudienceId] = useState('ALL_TENANT_CONTACTS');
    const [tenantId, setTenantId] = useState('ALL_TENANTS');
    const [templateId, setTemplateId] = useState(data.templates[0]?.id ?? '');
    const [campaignTitle, setCampaignTitle] = useState(data.templates[0]?.title ?? '');
    const [body, setBody] = useState(data.templates[0]?.body ?? '');
    const [queue, setQueue] = useState<SuperadminWhatsAppQueueRecipient[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const { createCampaign, isCreating } = useSuperadminMessagingV1WhatsAppCampaign();
// EFFECT INTENT: synchronizes this client-side side effect with the dependency list; changes to captured values intentionally re-run it.
    useEffect(() => {
        if (!templateId && data.templates[0]) {
            setTemplateId(data.templates[0].id);
            setCampaignTitle(data.templates[0].title);
            setBody(data.templates[0].body);
        }
    }, [data.templates, templateId]);
    const selectedTemplate = data.templates.find((template) => template.id === templateId);
    const previewRecipient = getWhatsAppPreviewRecipient(data.recipients, audienceId, tenantId);
    const eligibleRecipients = useMemo(() => getEligibleWhatsAppRecipients(data.recipients, audienceId, tenantId), [data.recipients, audienceId, tenantId]);
    function handleTemplateSelect(template: SuperadminWhatsAppTemplate) {
        setTemplateId(template.id);
        setCampaignTitle(template.title);
        setBody(template.body);
        setAudienceId(template.recommendedAudienceId);
        setQueue([]);
        setActiveIndex(0);
    }
    function insertVariable(variable: string) {
        setBody((current) => current ? `${current} ${variable}` : variable);
    }
    async function handleStartQueue() {
        if (!campaignTitle.trim() || !body.trim()) return;
        if (!templateId || !audienceId || eligibleRecipients.length === 0) return;
        try {
            const response = await createCampaign({ name: campaignTitle.trim(), audienceId, templateId, recipientIds: eligibleRecipients.map((recipient) => recipient.id) });
            if (!response.success || !response.data) {
                toast.error(response.message, { id: 'whatsapp-queue-create-failed' });
                return;
            }
            const nextQueue = eligibleRecipients.map((recipient) => ({ recipient, status: SUPERADMIN_WHATSAPP_QUEUE_STATUS_CODES.QUEUED, message: replaceWhatsAppVariables(body, recipient) }));
            setQueue(nextQueue);
            setActiveIndex(0);
            
        }
        catch (error) {
            toast.error(t('ui.action_failed_retry'), { id: 'whatsapp-queue-create-error' });
        }
    }
    function findNextPending(items: SuperadminWhatsAppQueueRecipient[], fromIndex: number): number {
        const next = items.findIndex((item, index) => index > fromIndex && (item.status === SUPERADMIN_WHATSAPP_QUEUE_STATUS_CODES.QUEUED || item.status === SUPERADMIN_WHATSAPP_QUEUE_STATUS_CODES.OPENED));
        return next >= 0 ? next : items.findIndex((item) => item.status === SUPERADMIN_WHATSAPP_QUEUE_STATUS_CODES.QUEUED || item.status === SUPERADMIN_WHATSAPP_QUEUE_STATUS_CODES.OPENED);
    }
    function handleOpen(index: number) {
        const item = queue[index];
        if (!item)
            return;
        window.open(buildWhatsAppLink(item.recipient.phone, item.message), '_blank', 'noopener,noreferrer');
        setQueue((current) => current.map((entry, entryIndex) => entryIndex === index && entry.status === SUPERADMIN_WHATSAPP_QUEUE_STATUS_CODES.QUEUED ? { ...entry, status: SUPERADMIN_WHATSAPP_QUEUE_STATUS_CODES.OPENED } : entry));
    }
    function handleComplete(index: number, status: SuperadminMessagingWhatsAppQueueActionStatus) {
        setQueue((current) => {
            const updated = current.map((entry, entryIndex) => entryIndex === index ? { ...entry, status } : entry);
            const nextIndex = findNextPending(updated, index);
            setActiveIndex(nextIndex >= 0 ? nextIndex : updated.length);
            return updated;
        });
    }
    function handleClearQueue() {
        setQueue([]);
        setActiveIndex(0);
    }
    const sent = queue.filter((item) => item.status === SUPERADMIN_WHATSAPP_QUEUE_STATUS_CODES.SENT).length;
    const skipped = queue.filter((item) => item.status === SUPERADMIN_WHATSAPP_QUEUE_STATUS_CODES.SKIPPED).length;
    const pending = queue.length - sent - skipped;
    return (<section className="mt-8 space-y-6">
      <Panel title={t('ui.smart_bulk_whatsapp_003419c')} description={t('ui.free_guided_tenant_communication_for_superadmin__18569ff')}>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-primary-subtle p-5">
            <div className="flex items-start gap-3"><span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-on-primary"><Rocket size={18} aria-hidden="true"/></span><div><p className="text-sm font-semibold text-primary">{t('ui.tenant_first_bulk_communication_80bab35')}</p><p className="mt-1 text-sm leading-6 text-secondary">{t('ui.target_gyms_by_subscription_onboarding_risk_main_aac0933')}</p></div></div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-start gap-3"><ShieldCheck size={18} className="mt-0.5 shrink-0 text-primary" aria-hidden="true"/><div><p className="text-sm font-semibold text-primary">{t('ui.free_mode_stays_transparent_c9c32f3')}</p><p className="mt-1 text-xs leading-5 text-secondary">{t('ui.superadmin_prepares_the_message_and_opens_the_wh_c97b3b4')}</p></div></div>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-xs text-secondary"><Building2 size={18} aria-hidden="true"/><span className="font-semibold text-primary">{t('ui.scope_locked_to_tenants_cac5c08')}</span>  {t('ui.owners_admins_managers_only_78f06d4')}</div>
      </Panel>

      <SuperadminMessagingV1WhatsAppTemplatePicker templates={data.templates} selectedId={templateId} onSelect={handleTemplateSelect}/>
      <SuperadminMessagingV1WhatsAppAudiencePanel audiences={data.audiences} recipients={data.recipients} audienceId={audienceId} tenantId={tenantId} onAudienceChange={setAudienceId} onTenantChange={setTenantId}/>

      <div className="grid gap-6 xl:grid-cols-2">
        <SuperadminMessagingV1WhatsAppComposerPanel template={selectedTemplate} title={campaignTitle} body={body} variables={data.variables} onTitleChange={setCampaignTitle} onBodyChange={setBody} onInsertVariable={insertVariable}/>
        <SuperadminMessagingV1WhatsAppPreviewPanel recipient={previewRecipient} title={campaignTitle} body={body}/>
      </div>

      <SuperadminMessagingV1WhatsAppCampaignSummaryCards total={eligibleRecipients.length} pending={queue.length > 0 ? pending : eligibleRecipients.length} sent={sent} skipped={skipped}/>

      <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
        <div><p className="text-sm font-semibold text-primary">{t('ui.ready_to_start_tenant_queue_8110062')}</p><p className="mt-1 text-xs text-secondary">{eligibleRecipients.length}  {t('ui.tenant_contacts_match_the_current_audience_and_g_660cba5')}</p></div>
        <button  type="button" onClick={() => void handleStartQueue()} disabled={isCreating || eligibleRecipients.length === 0 || !campaignTitle.trim() || !body.trim()} className="min-h-11 inline-flex min-w-56 items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-on-primary hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95" data-testid="superadmin_messaging-messaging-messaging-v1-whats-app-bulk-center-action1">{isCreating ? t('ui.preparing_queue_5aaf098') : t('ui.start_tenant_whatsapp_queue_3498617')}</button>
      </div>

      <SuperadminMessagingV1WhatsAppQueuePanel queue={queue} activeIndex={activeIndex} onOpen={handleOpen} onMarkSent={(index) => handleComplete(index, 'SENT')} onSkip={(index) => handleComplete(index, 'SKIPPED')} onClear={handleClearQueue}/>
      <SuperadminMessagingV1WhatsAppCampaignHistoryPanel campaigns={data.campaigns}/>
    </section>);
}
