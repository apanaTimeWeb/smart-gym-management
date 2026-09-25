// RESPONSIBILITY: Defines finite Admin domain values used by DTO, domain and persistence contracts.
// FLOW: DTO validation → domain logic → repository → database constraint.

export enum AdminFinanceStatus {
  COMPLETED = 'COMPLETED',
  PAID = 'PAID',
}



export enum AdminFinancePnlPeriod {
  THIS_MONTH = 'THIS_MONTH',
  LAST_MONTH = 'LAST_MONTH',
  Q1 = 'Q1',
  Q2 = 'Q2',
  Q3 = 'Q3',
  Q4 = 'Q4',
  THIS_YEAR = 'THIS_YEAR',
}
