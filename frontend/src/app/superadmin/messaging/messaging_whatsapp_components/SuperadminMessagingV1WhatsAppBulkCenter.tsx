// RESPONSIBILITY: Renders or orchestrates the Superadmin MessagingV1WhatsAppBulkCenter responsibility defined by this module feature.
import type { SuperadminMessagingWhatsAppQueueActionStatus } from '@/app/superadmin/messaging/messaging_whatsapp_types/SuperadminMessagingWhatsAppTypes';
'use client';
import { useEffect, useMemo, useState } from 'react';
import { Building2, Rocket, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import Panel from '@/components/ui/Panel';
import SuperadminMessagingV1WhatsAppAudiencePanel from '@/app/superadmin/messaging/messaging_whatsapp_components/SuperadminMessagingV1WhatsAppAudiencePanel';
import SuperadminMessagingV1WhatsAppCampaignHistoryPanel from '@/app/superadmin/messaging/messaging_whatsapp_components/SuperadminMessagingV1WhatsAppCampaignHistoryPanel';
import SuperadminMessagingV1WhatsAppCampaignSummaryCards from '@/app/superadmin/messaging/messaging_whatsapp_components/SuperadminMessagingV1WhatsAppCampaignSummaryCards';
import SuperadminMessagingV1WhatsAppComposerPanel from '@/app/superadmin/messaging/messaging_whatsapp_components/SuperadminMessagingV1WhatsAppComposerPanel';
import SuperadminMessagingV1WhatsAppPreviewPanel from '@/app/superadmin/messaging/messaging_whatsapp_components/SuperadminMessagingV1WhatsAppPreviewPanel';
import SuperadminMessagingV1WhatsAppQueuePanel from '@/app/superadmin/messaging/messaging_whatsapp_components/SuperadminMessagingV1WhatsAppQueuePanel';
import SuperadminMessagingV1WhatsAppTemplatePicker from '@/app/superadmin/messaging/messaging_whatsapp_components/SuperadminMessagingV1WhatsAppTemplatePicker';
import type { SuperadminMessagingV1WhatsAppBulkCenterProps, SuperadminWhatsAppQueueRecipient, SuperadminWhatsAppTemplate } from '@/app/superadmin/messaging/messaging_whatsapp_types/SuperadminMessagingV1WhatsAppTypes';
import { useSuperadminMessagingV1WhatsAppCampaign } from '@/app/superadmin/messaging/messaging_whatsapp_utils/useSuperadminMessagingV1WhatsAppCampaign';
import { buildWhatsAppLink, getEligibleWhatsAppRecipients, getWhatsAppPreviewRecipient, replaceWhatsAppVariables } from '@/app/superadmin/messaging/messaging_whatsapp_utils/SuperadminMessagingV1WhatsAppUtils';
export default function SuperadminMessagingV1WhatsAppBulkCenter({ data }: SuperadminMessagingV1WhatsAppBulkCenterProps) {
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
                toast.error(response.message || '', { id: 'whatsapp-queue-create-failed' });
                return;
            }
            const nextQueue = eligibleRecipients.map((recipient) => ({ recipient, status: 'QUEUED' as const, message: replaceWhatsAppVariables(body, recipient) }));
            setQueue(nextQueue);
            setActiveIndex(0);
            
        }
        catch (error) {
            toast.error(error instanceof Error ? error.message : '', { id: 'whatsapp-queue-create-error' });
        }
    }
    function findNextPending(items: SuperadminWhatsAppQueueRecipient[], fromIndex: number): number {
        const next = items.findIndex((item, index) => index > fromIndex && (item.status === 'QUEUED' || item.status === 'OPENED'));
        return next >= 0 ? next : items.findIndex((item) => item.status === 'QUEUED' || item.status === 'OPENED');
    }
    function handleOpen(index: number) {
        const item = queue[index];
        if (!item)
            return;
        window.open(buildWhatsAppLink(item.recipient.phone, item.message), '_blank', 'noopener,noreferrer');
        setQueue((current) => current.map((entry, entryIndex) => entryIndex === index && entry.status === 'QUEUED' ? { ...entry, status: 'OPENED' } : entry));
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
    const sent = queue.filter((item) => item.status === 'SENT').length;
    const skipped = queue.filter((item) => item.status === 'SKIPPED').length;
    const pending = queue.length - sent - skipped;
    return (<section className="mt-8 space-y-6">
      <Panel title="Smart Bulk WhatsApp" description="Free guided tenant communication for Superadmin. Use personalized click-to-chat links for owners, admins, and managers without a paid messaging API.">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-primary-subtle p-5">
            <div className="flex items-start gap-3"><span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-on-primary"><Rocket size={18} aria-hidden="true"/></span><div><p className="text-sm font-semibold text-primary">Tenant-first bulk communication</p><p className="mt-1 text-sm leading-6 text-secondary">Target gyms by subscription, onboarding, risk, maintenance impact, or contact role. Gym member messaging stays in Admin / Manager.</p></div></div>
          </div>
          <div className="rounded-2xl border border-border bg-input p-5">
            <div className="flex items-start gap-3"><ShieldCheck size={18} className="mt-0.5 shrink-0 text-primary" aria-hidden="true"/><div><p className="text-sm font-semibold text-primary">Free mode stays transparent</p><p className="mt-1 text-xs leading-5 text-secondary">Superadmin prepares the message and opens the WhatsApp chat. The operator presses WhatsApp's Send action, then marks the queue item sent or skipped.</p></div></div>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl border border-border bg-input px-4 py-3 text-xs text-secondary"><Building2 size={18} aria-hidden="true"/><span className="font-semibold text-primary">Scope locked to tenants:</span> owners · admins · managers only</div>
      </Panel>

      <SuperadminMessagingV1WhatsAppTemplatePicker templates={data.templates} selectedId={templateId} onSelect={handleTemplateSelect}/>
      <SuperadminMessagingV1WhatsAppAudiencePanel audiences={data.audiences} recipients={data.recipients} audienceId={audienceId} tenantId={tenantId} onAudienceChange={setAudienceId} onTenantChange={setTenantId}/>

      <div className="grid gap-6 xl:grid-cols-2">
        <SuperadminMessagingV1WhatsAppComposerPanel template={selectedTemplate} title={campaignTitle} body={body} variables={data.variables} onTitleChange={setCampaignTitle} onBodyChange={setBody} onInsertVariable={insertVariable}/>
        <SuperadminMessagingV1WhatsAppPreviewPanel recipient={previewRecipient} title={campaignTitle} body={body}/>
      </div>

      <SuperadminMessagingV1WhatsAppCampaignSummaryCards total={eligibleRecipients.length} pending={queue.length > 0 ? pending : eligibleRecipients.length} sent={sent} skipped={skipped}/>

      <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
        <div><p className="text-sm font-semibold text-primary">Ready to start tenant queue</p><p className="mt-1 text-xs text-secondary">{eligibleRecipients.length} tenant contacts match the current audience and gym scope.</p></div>
        <button type="button" onClick={() => void handleStartQueue()} disabled={isCreating || eligibleRecipients.length === 0 || !campaignTitle.trim() || !body.trim()} className="inline-flex min-w-56 items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-on-primary hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{isCreating ? 'Preparing Queue…' : 'Start Tenant WhatsApp Queue'}</button>
      </div>

      <SuperadminMessagingV1WhatsAppQueuePanel queue={queue} activeIndex={activeIndex} onOpen={handleOpen} onMarkSent={(index) => handleComplete(index, 'SENT')} onSkip={(index) => handleComplete(index, 'SKIPPED')} onClear={handleClearQueue}/>
      <SuperadminMessagingV1WhatsAppCampaignHistoryPanel campaigns={data.campaigns}/>
    </section>);
}
