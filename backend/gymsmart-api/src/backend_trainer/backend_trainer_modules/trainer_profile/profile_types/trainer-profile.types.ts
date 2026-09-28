// RESPONSIBILITY: Defines Trainer profile persistence input types independent of TypeORM entities.
// FLOW: Update DTO → TrainerProfileProfileInput → repository persistence.

export interface TrainerProfileProfileInput {
  name: string;
  phone: string;
  specialization: string[];
}
