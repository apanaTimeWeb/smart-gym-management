// RESPONSIBILITY: Re-exports useTrainerNotificationsLogic under the legacy name for backward compatibility.
// DATA FLOW: TrainerNotificationsMain → useNotificationsPage → local state
export type { TrainerNotificationItem as NotificationItem } from '@/app/trainer/notifications/notifications_types/TrainerNotificationsTypes';
export { useTrainerNotificationsLogic as useNotificationsPage } from '@/app/trainer/notifications/notifications_context/useTrainerNotificationsLogic';
