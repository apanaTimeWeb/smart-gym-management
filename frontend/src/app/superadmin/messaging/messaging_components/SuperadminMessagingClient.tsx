'use client';
// RESPONSIBILITY: Per-tenant direct messaging, email/SMS composer, and in-app notification center.
// All data is static/hardcoded. Fully functional UI with compose, send, and notification read state.
// DATA FLOW: INITIAL_MESSAGES / INITIAL_NOTIFICATIONS / MESSAGING_TENANTS → SuperadminMessagingClient → tabs + compose modal

import { useState, useEffect } from 'react';
import { Mail, Bell, Plus, CheckCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';
import type {
  TenantMessage,
  SuperadminNotification,
  MessageChannel,
  MessagingTab,
  MessagingTenant,
} from '@/app/superadmin/messaging/messaging_types/messaging_types';
import { superadminMessagingApi } from '@/app/superadmin/messaging/messaging_api/superadmin_messaging_api';
import { SuperadminMessagingComposeModal } from '@/app/superadmin/messaging/messaging_components/SuperadminMessagingComposeModal';
import { SuperadminMessagingNotificationsTab } from '@/app/superadmin/messaging/messaging_components/SuperadminMessagingNotificationsTab';
import { SuperadminMessagingMessagesTab } from '@/app/superadmin/messaging/messaging_components/SuperadminMessagingMessagesTab';

export default function SuperadminMessagingClient() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as MessagingTab) || 'messages';

  const [tab, setTab] = useState<MessagingTab>(initialTab);
  const [messages, setMessages] = useState<TenantMessage[]>([]);
  const [notifications, setNotifications] = useState<SuperadminNotification[]>([]);
  const [tenants, setTenants] = useState<MessagingTenant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [channelFilter, setChannelFilter] = useState<MessageChannel | 'ALL'>('ALL');
  const [composeOpen, setComposeOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [composeTenantId, setComposeTenantId] = useState('');
  const [composeChannel, setComposeChannel] = useState<MessageChannel>('EMAIL');
  const [composeSubject, setComposeSubject] = useState('');
  const [composeBody, setComposeBody] = useState('');

  // RESPONSIBILITY: Handle side-effects for SuperadminMessagingClient
  useEffect(() => {
    let mounted = true;
    async function loadData() {
      setIsLoading(true);
      try {
        const [msgsRes, notifsRes, tenantsRes] = await Promise.all([
          superadminMessagingApi.fetchMessages(),
          superadminMessagingApi.fetchNotifications(),
          superadminMessagingApi.fetchTenants()
        ]);
        if (mounted) {
          if (msgsRes.success && msgsRes.data) setMessages(msgsRes.data as unknown as TenantMessage[]);
          if (notifsRes.success && notifsRes.data) setNotifications(notifsRes.data as unknown as SuperadminNotification[]);
          if (tenantsRes.success && tenantsRes.data) setTenants(tenantsRes.data as unknown as MessagingTenant[]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }
    loadData();
    return () => { mounted = false; };
  }, []);

  const filteredMessages = messages.filter((m) => {
    const matchSearch =
      m.tenantName.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase());
    const matchChannel = channelFilter === 'ALL' || m.channel === channelFilter;
    let matchDate = true;
    if (startDate && endDate && m.sentAt && startDate !== 'this_month' && startDate !== 'this_week' && startDate !== 'this_year' && startDate !== 'today') {
      const iDate = new Date(m.sentAt);
      const sDate = new Date(startDate);
      const eDate = new Date(endDate);
      if (!isNaN(iDate.getTime()) && !isNaN(sDate.getTime()) && !isNaN(eDate.getTime())) {
        eDate.setHours(23, 59, 59, 999);
        matchDate = iDate >= sDate && iDate <= eDate;
      }
    }
    return matchSearch && matchChannel && matchDate;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  function handleSend() {
    if (!composeTenantId || !composeSubject.trim() || !composeBody.trim()) {
      toast.error('Please fill all fields.');
      return;
    }
    const tenant = tenants.find((g) => g.id === composeTenantId);
    const newMsg: Partial<TenantMessage> = {
      tenantId: composeTenantId,
      tenantName: tenant?.name ?? 'Unknown',
      channel: composeChannel,
      subject: composeSubject,
      body: composeBody,
    };

    superadminMessagingApi.sendMessage(newMsg).then(res => {
      if (res.success && res.data) {
        setMessages((prev) => [res.data as unknown as TenantMessage, ...prev]);
        toast.success('Message sent successfully.');
        setComposeOpen(false);
        setComposeTenantId('');
        setComposeSubject('');
        setComposeBody('');
        setComposeChannel('EMAIL');
      } else {
        toast.error(res.message || 'Failed to send message');
      }
    }).catch(() => {
      toast.error('Failed to send message');
    });
  }

  function handleMarkAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success('All notifications marked as read.');
  }

  function handleMarkRead(id: string) {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gym Messaging</h1>
          <p className="text-secondary mt-1 text-sm">
            Direct email/SMS to tenants and in-app notification center.
          </p>
        </div>
        {tab === 'messages' && (
          <button
            onClick={() => setComposeOpen(true)}
            className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-black font-semibold px-4 py-2 rounded-lg text-sm shadow-lg shadow-primary/20 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Plus size={18} strokeWidth={2} /> Compose Message
          </button>
        )}
        {tab === 'notifications' && unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="flex items-center gap-2 bg-input border border-border text-secondary hover:text-foreground px-4 py-2 rounded-lg text-sm motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <CheckCheck size={18} strokeWidth={2} /> Mark All Read
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-input border border-border rounded-xl p-1 w-fit">
        {([
          { key: 'messages' as const, label: 'Messages', icon: Mail },
          { key: 'notifications' as const, label: `Notifications${unreadCount > 0 ? ` (${unreadCount})` : ''}`, icon: Bell },
        ]).map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              tab === key ? 'bg-card text-foreground shadow-sm' : 'text-secondary hover:text-foreground'
            }`}
          >
            <Icon size={18} strokeWidth={2} /> {label}
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === 'messages' && (
        <SuperadminMessagingMessagesTab
          search={search}
          setSearch={setSearch}
          channelFilter={channelFilter}
          setChannelFilter={setChannelFilter}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          filteredMessages={filteredMessages}
        />
      )}

      {tab === 'notifications' && (
        <SuperadminMessagingNotificationsTab
          notifications={notifications}
          handleMarkRead={handleMarkRead}
        />
      )}

      {/* Compose Modal */}
      {composeOpen && (
        <SuperadminMessagingComposeModal
          composeTenantId={composeTenantId}
          setComposeTenantId={setComposeTenantId}
          tenants={tenants}
          composeChannel={composeChannel}
          setComposeChannel={setComposeChannel}
          composeSubject={composeSubject}
          setComposeSubject={setComposeSubject}
          composeBody={composeBody}
          setComposeBody={setComposeBody}
          onClose={() => setComposeOpen(false)}
          onSend={handleSend}
        />
      )}
    </div>
  );
}
