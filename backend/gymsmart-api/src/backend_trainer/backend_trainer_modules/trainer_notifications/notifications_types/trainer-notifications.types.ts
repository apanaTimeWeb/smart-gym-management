// RESPONSIBILITY: Defines Trainer notification preference persistence input types independent of TypeORM entities.
// FLOW: Preferences DTO → TrainerNotificationsPreferenceInput → repository persistence.

export interface TrainerNotificationsPreferenceInput {
  email?: boolean;
  push?: boolean;
  sms?: boolean;
  sessionReminders?: boolean;
  memberUpdates?: boolean;
}
