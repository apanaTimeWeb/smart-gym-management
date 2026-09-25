// RESPONSIBILITY: Declares finite SaaS subscription states stored in the master database.
// FLOW: Database enum -> subscription entity -> billing services.
export enum AdminCoreMasterSubscriptionStatus { ACTIVE='ACTIVE', CANCELLED='CANCELLED', PAST_DUE='PAST_DUE', FAILED='FAILED', PAUSED='PAUSED', EXPIRED='EXPIRED' }
