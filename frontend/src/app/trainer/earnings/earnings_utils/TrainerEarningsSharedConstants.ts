// RESPONSIBILITY: Centralized constants and formatters for the Trainer Earnings module.
// DATA FLOW: Imported by TrainerEarningsMain and its sub-components.

export const EARNINGS_ITEMS_PER_PAGE = 10;

export const PAYOUT_STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  pending: { bg: 'bg-warning-bg', text: 'text-warning', label: 'Pending' },
  processing: { bg: 'bg-info-bg', text: 'text-info', label: 'Processing' },
  settled: { bg: 'bg-success-bg', text: 'text-success', label: 'Settled' },
};
