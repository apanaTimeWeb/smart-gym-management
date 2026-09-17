// RESPONSIBILITY: Renders or orchestrates the Superadmin MessagingV1WhatsAppBulkCenter responsibility defined by this module feature.
'use client';
import { useEffect, useMemo, useState } from 'react';
import { Building2, Rocket, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import SuperadminV1Panel from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminV1Panel';
import SuperadminMessagingV1WhatsAppAudiencePanel from '@/app/superadmin/messaging/messaging_whatsapp_components/SuperadminMessagingV1WhatsAppAudiencePanel';
import SuperadminMessagingV1WhatsAppCampaignHistoryPanel from '@/app/superadmin/messaging/messaging_whatsapp_components/SuperadminMessagingV1WhatsAppCampaignHistoryPanel';
import SuperadminMessagingV1WhatsAppCampaignSummaryCards from '@/app/superadmin/messaging/messaging_whatsapp_components/SuperadminMessagingV1WhatsAppCampaignSummaryCards';
import SuperadminMessagingV1WhatsAppComposerPanel from '@/app/superadmin/messaging/messaging_whatsapp_components/SuperadminMessagingV1WhatsAppComposerPanel';
import SuperadminMessagingV1WhatsAppPreviewPanel from '@/app/superadmin/messaging/messaging_whatsapp_components/SuperadminMessagingV1WhatsAppPreviewPanel';
import SuperadminMessagingV1WhatsAppQueuePanel from '@/app/superadmin/messaging/messaging_whatsapp_components/SuperadminMessagingV1WhatsAppQueuePanel';
import SuperadminMessagingV1WhatsAppTemplatePicker from '@/app/superadmin/messaging/messaging_whatsapp_components/SuperadminMessagingV1WhatsAppTemplatePicker';
import type { SuperadminMessagingV1WhatsAppBulkCenterProps, SuperadminWhatsAppQueueRecipient, SuperadminWhatsAppTemplate } from '@/app/superadmin/messaging/messaging_whatsapp_types/SuperadminMessagingV1WhatsAppTypes';
import { createSuperadminWhatsAppCampaign } from '@/app/superadmin/messaging/messaging_whatsapp_api/superadmin_messaging_whatsapp_api';
import { buildWhatsAppLink, getEligibleWhatsAppRecipients, getWhatsAppPreviewRecipient, replaceWhatsAppVariables } from '@/app/superadmin/messaging/messaging_whatsapp_utils/SuperadminMessagingV1WhatsAppUtils';
export default function SuperadminMessagingV1WhatsAppBulkCenter({ data }: SuperadminMessagingV1WhatsAppBulkCenterProps) {
    const [audienceId, setAudienceId] = useState('ALL_TENANT_CONTACTS');
    const [tenantId, setTenantId] = useState('ALL_TENANTS');
    const [templateId, setTemplateId] = useState(data.templates[0]?.id ?? '');
    const [campaignTitle, setCampaignTitle] = useState(data.templates[0]?.title ?? '');
    const [body, setBody] = useState(data.templates[0]?.body ?? '');
    const [queue, setQueue] = useState<SuperadminWhatsAppQueueRecipient[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isStarting, setIsStarting] = useState(false);
    const [campaigns, setCampaigns] = useState(data.campaigns);
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
        if (!campaignTitle.trim() || !body.trim()) {
            toast.error('Add a campaign title and message first.', { id: 'whatsapp-campaign-content-required' });
            return;
        }
        if (!templateId || !audienceId || eligibleRecipients.length === 0) {
            toast.error('Choose a tenant audience with at least one WhatsApp-ready contact.', { id: 'whatsapp-audience-required' });
            return;
        }
        setIsStarting(true);
        try {
            const response = await createSuperadminWhatsAppCampaign({ name: campaignTitle.trim(), audienceId, templateId, recipientIds: eligibleRecipients.map((recipient) => recipient.id) });
            if (!response.success || !response.data) {
                toast.error(response.message || 'Could not create the queue.', { id: 'whatsapp-queue-create-failed' });
                return;
            }
            const nextQueue = eligibleRecipients.map((recipient) => ({ recipient, status: 'QUEUED' as const, message: replaceWhatsAppVariables(body, recipient) }));
            setQueue(nextQueue);
            setActiveIndex(0);
            setCampaigns((current) => [response.data!, ...current]);
            toast.success(`${nextQueue.length} tenant WhatsApp chats are ready.`, { id: 'whatsapp-queue-created' });
        }
        catch (error) {
            toast.error(error instanceof Error ? error.message : 'Could not create the queue.', { id: 'whatsapp-queue-create-error' });
        }
        finally {
            setIsStarting(false);
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
    function handleComplete(index: number, status: 'SENT' | 'SKIPPED') {
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
      <SuperadminV1Panel title="Smart Bulk WhatsApp" description="Free guided tenant communication for Superadmin. Use personalized click-to-chat links for owners, admins, and managers without a paid messaging API.">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
            <div className="flex items-start gap-3"><span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-black"><Rocket size={19} aria-hidden="true"/></span><div><p className="text-sm font-semibold text-foreground">Tenant-first bulk communication</p><p className="mt-1 text-sm leading-6 text-secondary">Target gyms by subscription, onboarding, risk, maintenance impact, or contact role. Gym member messaging stays in Admin / Manager.</p></div></div>
          </div>
          <div className="rounded-2xl border border-border bg-input/30 p-5">
            <div className="flex items-start gap-3"><ShieldCheck size={19} className="mt-0.5 shrink-0 text-primary" aria-hidden="true"/><div><p className="text-sm font-semibold text-foreground">Free mode stays transparent</p><p className="mt-1 text-xs leading-5 text-secondary">Superadmin prepares the message and opens the WhatsApp chat. The operator presses WhatsApp's Send action, then marks the queue item sent or skipped.</p></div></div>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl border border-border bg-input/30 px-4 py-3 text-xs text-secondary"><Building2 size={14} aria-hidden="true"/><span className="font-semibold text-foreground">Scope locked to tenants:</span> owners · admins · managers only</div>
      </SuperadminV1Panel>

      <SuperadminMessagingV1WhatsAppTemplatePicker templates={data.templates} selectedId={templateId} onSelect={handleTemplateSelect}/>
      <SuperadminMessagingV1WhatsAppAudiencePanel audiences={data.audiences} recipients={data.recipients} audienceId={audienceId} tenantId={tenantId} onAudienceChange={setAudienceId} onTenantChange={setTenantId}/>

      <div className="grid gap-6 xl:grid-cols-2">
        <SuperadminMessagingV1WhatsAppComposerPanel template={selectedTemplate} title={campaignTitle} body={body} variables={data.variables} onTitleChange={setCampaignTitle} onBodyChange={setBody} onInsertVariable={insertVariable}/>
        <SuperadminMessagingV1WhatsAppPreviewPanel recipient={previewRecipient} title={campaignTitle} body={body}/>
      </div>

      <SuperadminMessagingV1WhatsAppCampaignSummaryCards total={eligibleRecipients.length} pending={queue.length > 0 ? pending : eligibleRecipients.length} sent={sent} skipped={skipped}/>

      <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
        <div><p className="text-sm font-semibold text-foreground">Ready to start tenant queue</p><p className="mt-1 text-xs text-secondary">{eligibleRecipients.length} tenant contacts match the current audience and gym scope.</p></div>
        <button type="button" onClick={() => void handleStartQueue()} disabled={isStarting || eligibleRecipients.length === 0} className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-black hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{isStarting ? 'Preparing Queue…' : 'Start Tenant WhatsApp Queue'}</button>
      </div>

      <SuperadminMessagingV1WhatsAppQueuePanel queue={queue} activeIndex={activeIndex} onOpen={handleOpen} onMarkSent={(index) => handleComplete(index, 'SENT')} onSkip={(index) => handleComplete(index, 'SKIPPED')} onClear={handleClearQueue}/>
      <SuperadminMessagingV1WhatsAppCampaignHistoryPanel campaigns={campaigns}/>
    </section>);
}
