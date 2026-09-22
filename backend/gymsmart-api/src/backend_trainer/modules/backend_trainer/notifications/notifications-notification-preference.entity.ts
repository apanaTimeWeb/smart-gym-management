// RESPONSIBILITY: Maps trainer notification preferences.
// FLOW: Notification preference service → entity → notification_preferences.

import { Column, Entity } from 'typeorm'; import { CoreBaseEntity } from '@/backend_trainer/core/database/core-base.entity';
@Entity('trainer_notification_preferences') export class NotificationsNotificationPreferenceEntity extends CoreBaseEntity { @Column({ name: 'trainer_id', type: 'uuid' }) trainerId!: string; @Column({ default: true }) email!: boolean; @Column({ default: true }) push!: boolean; @Column({ default: false }) sms!: boolean; @Column({ name: 'session_reminders', default: true }) sessionReminders!: boolean; @Column({ name: 'member_updates', default: true }) memberUpdates!: boolean; }
