// RESPONSIBILITY: Translates earnings enum values between canonical persistence values and frontend labels.
// FLOW: ORM/query result → TrainerEarningsEnumMapper → frontend/API contract.

  /**
 * Intent: Defines the TrainerEarningsEnumMapper boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerEarningsEnumMapper {
  /** Converts canonical history type to frontend label. */ static toApiHistoryType(v:string):string{const m:Record<string,string>={SESSION:'Session',BONUS:'Bonus',COMMISSION:'Commission'};return m[v]??v;}
  /** Converts canonical payout status to frontend label. */ static toApiStatus(v:string):string{const m:Record<string,string>={PENDING:'pending',PROCESSING:'processing',SETTLED:'settled'};return m[v]??v;}
}
