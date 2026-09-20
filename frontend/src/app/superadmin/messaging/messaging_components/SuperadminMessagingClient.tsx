// RESPONSIBILITY: Renders the Superadmin tenant messaging workspace using the module's URL-backed query state.
'use client';

import { useState } from 'react';
import { Bell, CheckCheck, Mail, Plus } from 'lucide-react';
import { useSuperadminMessaging } from '@/app/superadmin/messaging/messaging_utils/useSuperadminMessaging';
import { SuperadminMessagingComposeModal } from '@/app/superadmin/messaging/messaging_components/SuperadminMessagingComposeModal';
import { SuperadminMessagingMessagesTab } from '@/app/superadmin/messaging/messaging_components/SuperadminMessagingMessagesTab';
import { SuperadminMessagingNotificationsTab } from '@/app/superadmin/messaging/messaging_components/SuperadminMessagingNotificationsTab';
import type { SuperadminMessagingComposeValues } from '@/app/superadmin/messaging/messaging_schemas/SuperadminMessagingComposeSchema';
import toast from 'react-hot-toast';

export default function SuperadminMessagingClient() {
  const messaging = useSuperadminMessaging();
  const [composeOpen, setComposeOpen] = useState(false);

  async function handleSend(values: SuperadminMessagingComposeValues) {
    const tenant = messaging.tenants.find((candidate) => candidate.id === values.tenantId);
    if (!tenant) {
      return;
    }
    try {
      const response = await messaging.sendMessage({ ...values, tenantName: tenant.name });
      if (!response.success || !response.data) {
        toast.error(response.message || '', { id: 'superadmin-message-send-error' });
        return;
      }
      toast.success(response.message || '', { id: 'superadmin-message-send-success' });
      setComposeOpen(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '', { id: 'superadmin-message-send-error' });
    }
  }

  async function handleMarkRead(id: string) {
    try {
      const response = await messaging.markRead(id);
      toast.success(response.message, { id: `superadmin-notification-read-${id}` });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '', { id: 'superadmin-notification-read-error' });
    }
  }

  async function handleMarkAllRead() {
    try {
      const response = await messaging.markAllRead();
      toast.success(response.message, { id: 'superadmin-notifications-read-all' });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '', { id: 'superadmin-notifications-read-all-error' });
    }
  }

  if (messaging.isPending) {
    return <div className="p-8 text-center text-secondary motion-safe:animate-pulse">Loading messages...</div>;
  }

  if (messaging.isError) {
    return (
      <div className="rounded-xl border border-border bg-danger-bg p-6 text-center">
        <p className="font-semibold text-danger">{messaging.error}</p>
        <button type="button" onClick={() => { void messaging.refetchAll(); }} className="mt-4 rounded-lg border border-border bg-input px-4 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-primary">Tenant Messaging</h1>
          <p className="mt-1 text-sm text-secondary">Direct tenant-owner/admin/manager email or SMS and in-app notifications.</p>
        </div>
        {messaging.tab === 'messages' ? (
          <button type="button" onClick={() => setComposeOpen(true)} className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary shadow-card shadow-card motion-safe:transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <Plus size={18} strokeWidth={2}/> Compose Message
          </button>
        ) : messaging.unreadCount > 0 ? (
          <button type="button" onClick={() => { void handleMarkAllRead(); }} disabled={messaging.isMarkingAllRead} className="flex items-center gap-2 rounded-lg border border-border bg-input px-4 py-2 text-sm text-secondary motion-safe:transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-60">
            <CheckCheck size={18} strokeWidth={2}/> {messaging.isMarkingAllRead ? 'Marking...' : 'Mark All Read'}
          </button>
        ) : null}
      </div>

      <div className="flex w-fit gap-1 rounded-xl border border-border bg-input p-1">
        {([
          { key: 'messages' as const, label: 'Messages', icon: Mail },
          { key: 'notifications' as const, label: `Notifications${messaging.unreadCount > 0 ? ` (${messaging.unreadCount})` : ''}`, icon: Bell },
        ]).map(({ key, label, icon: Icon }) => (
          <button key={key} type="button" onClick={() => messaging.setTab(key)} className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${messaging.tab === key ? 'bg-card text-primary shadow-card' : 'text-secondary hover:text-primary'}`}>
            <Icon size={18} strokeWidth={2} /> {label}
          </button>
        ))}
      </div>

      {messaging.tab === 'messages' ? (
        <SuperadminMessagingMessagesTab
          search={messaging.search}
          setSearch={messaging.setSearch}
          channelFilter={messaging.channelFilter}
          setChannelFilter={messaging.setChannelFilter}
          setRange={messaging.setRange}
          messages={messaging.messages}
          currentPage={messaging.currentPage}
          totalPages={messaging.totalPages}
          totalItems={messaging.totalItems}
          onPageChange={messaging.setPage}
          isFetching={messaging.isFetchingMessages}
        />
      ) : (
        <SuperadminMessagingNotificationsTab notifications={messaging.notifications} handleMarkRead={handleMarkRead} isMarkingRead={messaging.isMarkingRead} />
      )}

      {composeOpen && (
        <SuperadminMessagingComposeModal
          tenants={messaging.tenants}
          isSubmitting={messaging.isSending}
          onClose={() => setComposeOpen(false)}
          onSend={handleSend}
        />
      )}
    </div>
  );
}
