'use client';
// RESPONSIBILITY: Minimal Notifications route composition boundary. It delegates the interaction surface to the feature-owned content component.
import TrainerNotificationsContent from '@/app/trainer/notifications/notifications_components/TrainerNotificationsContent/TrainerNotificationsContent';

export default function TrainerNotificationsMain() {
  return <TrainerNotificationsContent />;
}
