// RESPONSIBILITY: Defines payout business data using integer minor units.
// FLOW: EarningsPayoutEntity → mapper → EarningsPayoutDomain.

export interface EarningsPayoutDomain { id: string; period: string; amount: number; status: string; dueDate: string; }