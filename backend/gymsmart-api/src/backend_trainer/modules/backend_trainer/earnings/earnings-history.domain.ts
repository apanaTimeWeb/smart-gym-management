// RESPONSIBILITY: Defines earnings history business data with integer minor-unit money semantics.
// FLOW: EarningsHistoryEntity → mapper → EarningsHistoryDomain.

export interface EarningsHistoryDomain { id: string; date: string; type: string; description: string; amount: number; status: string; sessionId: string | null; tdsDeducted: number | null; netPayout: number | null; invoiceNumber: string | null; }