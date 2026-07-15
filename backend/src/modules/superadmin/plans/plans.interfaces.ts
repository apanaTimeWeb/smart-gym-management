
export interface ISubscriptionPlan {
  id: string;
  name: string;
  priceMonthly: number;
  priceAnnual: number;
  maxMembers: number;
  maxStaff: number;
  features: string[];
  activeTenants: number;
}

export interface PlanResponse {
  success: boolean;
  message: string;
  data: ISubscriptionPlan | ISubscriptionPlan[] | any | null;
}
