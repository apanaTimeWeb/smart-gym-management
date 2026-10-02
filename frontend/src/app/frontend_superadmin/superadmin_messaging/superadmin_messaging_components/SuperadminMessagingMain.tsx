'use client';
/**
 * RESPONSIBILITY: React component SuperadminMessagingMain owned by the superadmin_messaging feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: next-intl, lucide-react, @/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_components/SuperadminMessagingComposeModal, @/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_components/SuperadminMessagingMessagesTab, @/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_components/SuperadminMessagingNotificationsTab, @/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_hooks/useSuperadminMessagingMainViewModel
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the tenant messaging workspace from feature-owned view-model state and callbacks; contains no API, mutation, toast, or business calculations.
import { Bell, CheckCheck, Mail, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { SuperadminMessagingComposeModal } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_components/SuperadminMessagingComposeModal';
import { SuperadminMessagingMessagesTab } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_components/SuperadminMessagingMessagesTab';
import { SuperadminMessagingNotificationsTab } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_components/SuperadminMessagingNotificationsTab';
import { useSuperadminMessagingMainViewModel } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_hooks/useSuperadminMessagingMainViewModel';



/**
 * @description Renders the tenant messaging workspace from feature-owned view-model state and callbacks; contains no API, mutation, toast, or business calculations.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminMessagingMain() {
  const t = useTranslations('superadmin_messaging');
  const messaging = useSuperadminMessagingMainViewModel();

  if (messaging.isPending) {
    return <div className="p-8 text-center text-secondary motion-safe:animate-pulse" data-testid="superadmin_messaging-superadmin-messaging-main-superadmin_messaging-main-loading">{t('ui.loading_messages_8a71e75')}</div>;
  }

  if (messaging.isError) {
    return (
      <div className="rounded-xl border border-border bg-danger-bg p-6 text-center" role="alert" data-testid="superadmin_messaging-superadmin-messaging-main-superadmin_messaging-main-error">
        <p className="font-semibold text-danger">{t('ui.messaging_could_not_be_loaded_6e1b20a')}</p>
        <button
          type="button"
          onClick={() => { void messaging.refetchAll(); }}
          className="min-h-11 mt-4 rounded-lg border border-border bg-card px-4 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95"
          data-testid="superadmin_messaging-superadmin-messaging-main-superadmin_messaging-main-retry"
        >
          {t('ui.retry_88c6aec')}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="superadmin-page-title text-primary">{t('ui.tenant_messaging_f8491d5')}</h1>
          <p className="mt-1 text-sm text-secondary">{t('ui.direct_tenant_owner_admin_manager_email_or_sms_a_9edccc0')}</p>
        </div>
        {messaging.tab === 'messages' ? (
          <button
            type="button"
            onClick={messaging.openCompose}
            className="min-h-11 flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary shadow-card motion-safe:transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:active:scale-95"
            data-testid="superadmin_messaging-superadmin-messaging-main-superadmin_messaging-main-compose"
          >
            <Plus size={18} strokeWidth={2} /> {t('ui.compose_message_2025ce6')}
          </button>
        ) : messaging.unreadCount > 0 ? (
          <button
            type="button"
            onClick={() => { void messaging.handleMarkAllRead(); }}
            disabled={messaging.isMarkingAllRead}
            className="min-h-11 flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm text-secondary motion-safe:transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-60 motion-safe:active:scale-95"
            data-testid="superadmin_messaging-superadmin-messaging-main-main-mark-all-read"
          >
            <CheckCheck size={18} strokeWidth={2} /> {messaging.isMarkingAllRead ? t('ui.marking') : t('ui.mark_all_read_fcd6b91')}
          </button>
        ) : null}
      </div>

      <div className="flex w-fit gap-1 rounded-xl border border-border bg-card p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" role="tablist" aria-label={t('ui.messaging_tabs')} data-testid="superadmin_messaging-main-tabs">
        {[
          { key: 'messages' as const, label: t('ui.messages'), icon: Mail },
          { key: 'notifications' as const, label: messaging.unreadCount > 0 ? t('ui.notifications_with_count', { count: messaging.unreadCount }) : t('ui.notifications'), icon: Bell },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={messaging.tab === key}
            onClick={() => messaging.setTab(key)}
            className={`min-h-11 flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${messaging.tab === key ? 'bg-card text-primary shadow-card' : 'text-secondary hover:text-primary'} motion-safe:active:scale-95`}
            data-testid={`superadmin_messaging-main-tab-${key}`}>
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
          isFetching={messaging.isFetchingMessages} data-testid="superadmin_messaging-superadmin-messaging-messages-tab-interactive-2"
        />
      ) : (
        <SuperadminMessagingNotificationsTab
          notifications={messaging.notifications}
          handleMarkRead={messaging.handleMarkRead}
          isMarkingRead={messaging.isMarkingRead}
        />
      )}

      {messaging.composeOpen ? (
        <SuperadminMessagingComposeModal
          tenants={messaging.tenants}
          isSubmitting={messaging.isSending}
          onClose={messaging.closeCompose}
          onSend={messaging.handleSend} data-testid="superadmin_messaging-superadmin-messaging-compose-modal-interactive-3"
        />
      ) : null}
    </div>
  );
}
