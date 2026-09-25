// RESPONSIBILITY: Resolves this feature's frontend date/range semantics into bounded UTC query windows.
// FLOW: Query DTO -> feature-local window resolver -> repository predicates -> PostgreSQL.

export interface PayoutsAdminQueryWindow {
  from?: Date;
  toExclusive?: Date;
}

/**
 * @description Resolves explicit date fields and supported named ranges for the feature.
 * @param input Validated frontend query values.
 * @returns Bounded UTC window used by repository predicates.
 */
export function resolvePayoutsAdminQueryWindow(input: { startDate?: string; endDate?: string; dateFrom?: string; dateTo?: string; range?: string; dateRange?: string; period?: string; month?: string }): PayoutsAdminQueryWindow {
  const now = new Date();
  const normalized = String(input.range ?? input.dateRange ?? input.period ?? '').trim().toLowerCase();
  let from: Date | undefined;
  let toExclusive: Date | undefined;
  const explicitFrom = input.startDate ?? input.dateFrom;
  const explicitTo = input.endDate ?? input.dateTo;
  if (explicitFrom) from = new Date(explicitFrom);
  if (explicitTo) { toExclusive = new Date(explicitTo); toExclusive.setUTCDate(toExclusive.getUTCDate() + 1); }
  if (!from && normalized) {
    const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    if (normalized === 'today') { from = start; toExclusive = new Date(start); toExclusive.setUTCDate(toExclusive.getUTCDate() + 1); }
    else if (normalized === 'yesterday') { toExclusive = start; from = new Date(start); from.setUTCDate(from.getUTCDate() - 1); }
    else if (normalized === 'this_week') { const day = start.getUTCDay(); from = new Date(start); from.setUTCDate(from.getUTCDate() - (day === 0 ? 6 : day - 1)); toExclusive = new Date(from); toExclusive.setUTCDate(toExclusive.getUTCDate() + 7); }
    else if (normalized === 'this_month' || normalized === 'monthly') { from = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), 1)); toExclusive = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth()+1, 1)); }
    else if (normalized === 'last_month') { from = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth()-1, 1)); toExclusive = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), 1)); }
    else if (normalized === 'last_3_months') { from = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth()-2, 1)); toExclusive = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth()+1, 1)); }
    else if (normalized === 'last_6_months') { from = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth()-5, 1)); toExclusive = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth()+1, 1)); }
    else if (normalized === 'this_year' || normalized === 'yearly') { from = new Date(Date.UTC(start.getUTCFullYear(), 0, 1)); toExclusive = new Date(Date.UTC(start.getUTCFullYear()+1, 0, 1)); }
    else if (normalized === 'this_quarter') { const q = Math.floor(start.getUTCMonth()/3); from = new Date(Date.UTC(start.getUTCFullYear(), q*3, 1)); toExclusive = new Date(Date.UTC(start.getUTCFullYear(), q*3+3, 1)); }
  }
  if (!from && input.month && /^\d{4}-\d{2}$/.test(input.month)) { const [year, month] = input.month.split('-').map(Number); from = new Date(Date.UTC(year, month-1, 1)); toExclusive = new Date(Date.UTC(year, month, 1)); }
  if (from && Number.isNaN(from.getTime())) from = undefined;
  if (toExclusive && Number.isNaN(toExclusive.getTime())) toExclusive = undefined;
  if (from && toExclusive && from >= toExclusive) throw new Error('PAYOUTS.QUERY.INVALID_DATE_RANGE');
  return { from, toExclusive };
}
