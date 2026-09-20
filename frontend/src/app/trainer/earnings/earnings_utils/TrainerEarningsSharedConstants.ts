// RESPONSIBILITY: Owns Trainer Earnings static UI configuration for statuses and server-backed table sorting.
// DATA FLOW: Earnings controls -> URL parameters -> TrainerEarnings API/query -> rendered ledger.

export const EARNINGS_ITEMS_PER_PAGE = 10;

export const PAYOUT_STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  pending: { bg: 'bg-warning-bg', text: 'text-warning', label: 'Pending' },
  processing: { bg: 'bg-info-bg', text: 'text-info', label: 'Processing' },
  settled: { bg: 'bg-success-bg', text: 'text-success', label: 'Settled' },
};

export const EARNINGS_SORT_OPTIONS = [
  { label: 'Date', value: 'date' },
  { label: 'Description', value: 'description' },
  { label: 'Amount', value: 'amount' },
  { label: 'Status', value: 'status' },
] as const;
export type EarningsSortField = (typeof EARNINGS_SORT_OPTIONS)[number]['value'];
export const EARNINGS_SORT_DIRECTIONS = ['asc', 'desc'] as const;
export type EarningsSortDirection = (typeof EARNINGS_SORT_DIRECTIONS)[number];
