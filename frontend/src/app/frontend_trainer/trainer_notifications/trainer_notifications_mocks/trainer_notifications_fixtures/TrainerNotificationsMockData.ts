import { TRAINER_NOTIFICATIONS_TYPE_IDS } from '@/app/frontend_trainer/trainer_notifications/trainer_notifications_constants/TrainerNotificationsConstants';
// RESPONSIBILITY: Feature-owned notification fixtures used by the module MSW handlers.
export const TRAINER_NOTIFICATIONS_MOCK_TRAINER_NOTIFICATIONS = [
  { id: 'n1', text: 'You have a PT session at 2:00 PM.', time: '2h ago', unread: true, type: TRAINER_NOTIFICATIONS_TYPE_IDS[2] },
  { id: 'n2', text: 'A member completed the assigned workout plan.', time: 'Yesterday', unread: false, type: TRAINER_NOTIFICATIONS_TYPE_IDS[1] },
  { id: 'n3', text: 'Your weekly availability was updated.', time: '2d ago', unread: true, type: TRAINER_NOTIFICATIONS_TYPE_IDS[3] },
] ;
