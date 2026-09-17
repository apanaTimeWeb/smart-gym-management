'use client';
// RESPONSIBILITY: Orchestrates the tenant Messaging page view, URL-synced filters, tabs, and modal visibility.
// DATA FLOW: useSuperadminMessagingData → SuperadminMessagingClient → messages/notifications views.
import { useMemo, useState } from 'react';
import { Mail, Bell, Plus, CheckCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import type { TenantMessage, MessageChannel, MessagingTab } from '@/app/superadmin/messaging/messaging_types/superadmin_messaging_types';
import { SuperadminMessagingComposeModal } from '@/app/superadmin/messaging/messaging_components/SuperadminMessagingComposeModal';
import { SuperadminMessagingNotificationsTab } from '@/app/superadmin/messaging/messaging_components/SuperadminMessagingNotificationsTab';
import { SuperadminMessagingMessagesTab } from '@/app/superadmin/messaging/messaging_components/SuperadminMessagingMessagesTab';
import { useSuperadminMessagingData } from '@/app/superadmin/messaging/messaging_utils/useSuperadminMessagingData';
import { useSuperadminUrlState } from '@/app/superadmin/superadmin_utils/useSuperadminUrlState';
import { useSuperadminDebouncedValue } from '@/app/superadmin/superadmin_utils/useSuperadminDebouncedValue';

export default function SuperadminMessagingClient() {
  const { getParam, setParam } = useSuperadminUrlState();
  const tab = getParam('tab', 'messages') as MessagingTab;
  const search = getParam('search', '');
  const debouncedSearch = useSuperadminDebouncedValue(search);
  const channelFilter = getParam('channel', 'ALL') as MessageChannel | 'ALL';
  const startDate = getParam('startDate', '');
  const endDate = getParam('endDate', '');
  const [composeOpen, setComposeOpen] = useState(false);
  const [composeTenantId, setComposeTenantId] = useState('');
  const [composeChannel, setComposeChannel] = useState<MessageChannel>('EMAIL');
  const [composeSubject, setComposeSubject] = useState('');
  const [composeBody, setComposeBody] = useState('');
  const { messages, notifications, tenants, isLoading, error, sendMessage, markRead, markAllRead } = useSuperadminMessagingData();
  const filteredMessages = useMemo(() => messages.filter((message) => {
    const matchSearch = !debouncedSearch || `${message.tenantName} ${message.subject}`.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchChannel = channelFilter === 'ALL' || message.channel === channelFilter;
    let matchDate = true;
    if (startDate && endDate && message.sentAt) {
      const timestamp = new Date(message.sentAt).getTime();
      matchDate = timestamp >= new Date(startDate).getTime() && timestamp <= new Date(`${endDate}T23:59:59`).getTime();
    }
    return matchSearch && matchChannel && matchDate;
  }), [messages, debouncedSearch, channelFilter, startDate, endDate]);
  const unreadCount = notifications.filter((notification) => !notification.read).length;
  const handleSend = async () => {
    if (!composeTenantId || !composeSubject.trim() || !composeBody.trim()) return;
    const tenant = tenants.find((item) => item.id === composeTenantId);
    try {
      const response = await sendMessage.mutateAsync({ tenantId: composeTenantId, tenantName: tenant?.name ?? '', channel: composeChannel, subject: composeSubject.trim(), body: composeBody.trim() });
      toast.success(response.message, { id: `message-${composeTenantId}` });
      setComposeOpen(false); setComposeTenantId(''); setComposeSubject(''); setComposeBody(''); setComposeChannel('EMAIL');
    } catch (errorValue: unknown) {
      toast.error(errorValue instanceof Error ? errorValue.message : 'Message send failed.', { id: `message-${composeTenantId}` });
    }
  };
  const handleMarkAllRead = async () => { try { const response = await markAllRead.mutateAsync(); toast.success(response.message, { id: 'messages-mark-all-read' }); } catch (errorValue: unknown) { toast.error(errorValue instanceof Error ? errorValue.message : 'Notification update failed.', { id: 'messages-mark-all-read' }); } };
  const handleMarkRead = async (id: string) => { try { const response = await markRead.mutateAsync(id); toast.success(response.message, { id: `message-read-${id}` }); } catch (errorValue: unknown) { toast.error(errorValue instanceof Error ? errorValue.message : 'Notification update failed.', { id: `message-read-${id}` }); } };
  const handleSetTab = (nextTab: MessagingTab) => setParam('tab', nextTab);
  if (isLoading) return <div className="space-y-4 motion-safe:animate-pulse"><div className="h-8 w-56 bg-skeleton-base rounded" /><div className="h-72 bg-skeleton-base rounded-xl border border-border" /></div>;
  if (error) return <div role="alert" className="p-8 text-center text-danger">{error instanceof Error ? error.message : 'Messaging data could not be loaded.'}</div>;
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div><h1 className="text-2xl font-bold text-foreground">Gym Messaging</h1><p className="text-secondary mt-1 text-sm">Direct tenant messages and in-app notification management.</p></div>
        {tab === 'messages' && <button onClick={() => setComposeOpen(true)} className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-black font-semibold px-4 py-2 rounded-lg text-sm motion-safe:transition-all motion-safe:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><Plus size={18} strokeWidth={2} /> Compose Message</button>}
        {tab === 'notifications' && unreadCount > 0 && <button onClick={handleMarkAllRead} disabled={markAllRead.isPending} className="min-w-32 flex items-center justify-center gap-2 bg-input border border-border text-secondary hover:text-foreground px-4 py-2 rounded-lg text-sm motion-safe:transition-all motion-safe:duration-200 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><CheckCheck size={18} strokeWidth={2} /> {markAllRead.isPending ? 'Marking...' : 'Mark All Read'}</button>}
      </div>
      <div className="flex gap-1 bg-input border border-border rounded-xl p-1 w-fit">
        {([{ key: 'messages', label: 'Messages', icon: Mail }, { key: 'notifications', label: `Notifications${unreadCount ? ` (${unreadCount})` : ''}`, icon: Bell }]).map(({ key, label, icon: Icon }) => <button key={key} onClick={() => handleSetTab(key as MessagingTab)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium motion-safe:transition-all motion-safe:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${tab === key ? 'bg-card text-foreground shadow-sm' : 'text-secondary hover:text-foreground'}`}><Icon size={18} strokeWidth={2} /> {label}</button>)}
      </div>
      {tab === 'messages' && <SuperadminMessagingMessagesTab search={search} setSearch={(value) => setParam('search', value)} channelFilter={channelFilter} setChannelFilter={(value) => setParam('channel', String(value))} setStartDate={(value) => setParam('startDate', value)} setEndDate={(value) => setParam('endDate', value)} filteredMessages={filteredMessages as TenantMessage[]} />}
      {tab === 'notifications' && <SuperadminMessagingNotificationsTab notifications={notifications} handleMarkRead={handleMarkRead} />}
      {composeOpen && <SuperadminMessagingComposeModal composeTenantId={composeTenantId} setComposeTenantId={setComposeTenantId} tenants={tenants} composeChannel={composeChannel} setComposeChannel={setComposeChannel} composeSubject={composeSubject} setComposeSubject={setComposeSubject} composeBody={composeBody} setComposeBody={setComposeBody} onClose={() => setComposeOpen(false)} onSend={handleSend} />}
    </div>
  );
}
