// RESPONSIBILITY: Centralized constants and formatters for the Trainer Earnings module.
// DATA FLOW: Imported by TrainerEarningsMain and its sub-components.

export const EARNINGS_ITEMS_PER_PAGE = 10;

export const PAYOUT_STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  pending: { bg: 'bg-warning/10', text: 'text-warning', label: 'Pending' },
  processing: { bg: 'bg-info/10', text: 'text-info', label: 'Processing' },
  settled: { bg: 'bg-success/10', text: 'text-success', label: 'Settled' },
};

/**
 * Formats a numeric amount as Indian Rupee currency string.
 * Use this instead of raw `.toLocaleString()` or `.toFixed()` in JSX (Rule 80).
 * @example formatCurrency(12500) → '₹12,500'
 */
export function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}
