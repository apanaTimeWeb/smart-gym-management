// RESPONSIBILITY: Declares finite master invoice states.
// FLOW: Database enum -> invoice entity -> subscription query service.
export enum AdminCoreMasterInvoiceStatus { PAID='PAID', PENDING='PENDING', VOID='VOID', REFUNDED='REFUNDED', FAILED='FAILED' }
