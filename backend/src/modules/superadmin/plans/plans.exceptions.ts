export class SubscriptionPlanNotFoundException extends Error {
  constructor(message = 'SubscriptionPlan not found') {
    super(message);
    this.name = 'SubscriptionPlanNotFoundException';
  }
}
