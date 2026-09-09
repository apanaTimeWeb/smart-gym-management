// RESPONSIBILITY: Centralized constants for the Trainer Earnings module.
// DATA FLOW: Imported by TrainerEarningsMain and its sub-components.

export const EARNINGS_ITEMS_PER_PAGE = 10;

export const PAYOUT_STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  pending: { bg: 'bg-warning/10', text: 'text-warning', label: 'Pending' },
  processing: { bg: 'bg-info/10', text: 'text-info', label: 'Processing' },
  settled: { bg: 'bg-success/10', text: 'text-success', label: 'Settled' },
};

