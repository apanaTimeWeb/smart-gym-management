// RESPONSIBILITY: Maps trainer notification preferences.
// FLOW: Notification preference service → entity → notification_preferences.

import { Column, Entity } from 'typeorm'; import { CoreBaseEntity } from '@/backend_trainer/backend_core/core_database/core-base.entity';

/**
 * Intent: Defines the TrainerNotificationsNotificationPreferenceEntity boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Entity('trainer_notification_preferences') export class TrainerNotificationsNotificationPreferenceEntity extends CoreBaseEntity { @Column({ name: 'trainer_id', type: 'uuid' }) trainerId!: string; @Column({ default: true }) email!: boolean; @Column({ default: true }) push!: boolean; @Column({ default: false }) sms!: boolean; @Column({ name: 'session_reminders', default: true }) sessionReminders!: boolean; @Column({ name: 'member_updates', default: true }) memberUpdates!: boolean; }
