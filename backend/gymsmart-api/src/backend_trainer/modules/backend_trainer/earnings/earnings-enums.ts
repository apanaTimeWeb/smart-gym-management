// RESPONSIBILITY: Defines finite earnings ledger and payout state values for DTOs and persistence.
// FLOW: earnings DTO/entity → typed enum → API/DB contract.

export enum EarningsHistoryType { SESSION='Session', BONUS='Bonus', COMMISSION='Commission' }
export enum EarningsStatus { PENDING='pending', PROCESSING='processing', SETTLED='settled' }

export enum EarningsRelatedSessionStatus { COMPLETED = 'Completed' }
