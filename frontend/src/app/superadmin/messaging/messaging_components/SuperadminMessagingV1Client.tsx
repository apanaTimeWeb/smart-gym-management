// RESPONSIBILITY: Orchestrates the Superadmin messaging V1 data view and its focused child sections.
'use client';
import SuperadminMessagingV1CampaignEngagementPanel from '@/app/superadmin/messaging/messaging_components/SuperadminMessagingV1CampaignEngagementPanel';
import SuperadminMessagingV1WhatsAppBulkCenter from '@/app/superadmin/messaging/messaging_whatsapp_components/SuperadminMessagingV1WhatsAppBulkCenter';
import { useSuperadminMessagingV1WhatsApp } from '@/app/superadmin/messaging/messaging_whatsapp_utils/useSuperadminMessagingV1WhatsApp';
import SuperadminMessagingV1TemplateLibraryPanel from '@/app/superadmin/messaging/messaging_components/SuperadminMessagingV1TemplateLibraryPanel';
import { useSuperadminMessagingV1 } from '@/app/superadmin/messaging/messaging_utils/useSuperadminMessagingV1';
export default function SuperadminMessagingV1Client() {
    // DATA FLOW: API → TanStack Query → focused V1 messaging and WhatsApp child views.
    const query = useSuperadminMessagingV1();
    const whatsAppQuery = useSuperadminMessagingV1WhatsApp();
    if (query.isPending || whatsAppQuery.isPending) {
        return (<div className="space-y-4">
  <div className="h-28 rounded-xl bg-skeleton-base motion-safe:animate-pulse"/>
  <div className="h-80 rounded-xl bg-skeleton-base motion-safe:animate-pulse"/>
  <div className="h-64 rounded-xl bg-skeleton-base motion-safe:animate-pulse"/>
        </div>);
    }
    if (query.isError || !query.data?.data || whatsAppQuery.isError || !whatsAppQuery.data?.data) {
        return (<div className="rounded-xl border border-danger/30 bg-danger-bg p-5">
  <p className="font-semibold text-danger">
    Messaging workspace could not be loaded.
  </p>
  <button type="button" onClick={() => { void query.refetch(); void whatsAppQuery.refetch(); }} className="mt-3 rounded-md border border-border px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
    Retry
  </button>
        </div>);
    }
    const data = query.data.data;
    const whatsAppData = whatsAppQuery.data.data;
    return (<section className="mt-8 space-y-6">
  <SuperadminMessagingV1WhatsAppBulkCenter data={whatsAppData}/>
  <SuperadminMessagingV1TemplateLibraryPanel data={data}/>
  <SuperadminMessagingV1CampaignEngagementPanel data={data}/>
    </section>);
}
