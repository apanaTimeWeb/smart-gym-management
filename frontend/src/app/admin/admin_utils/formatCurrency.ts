// RESPONSIBILITY: Provides consistent currency formatting for the UI.
export function formatCurrency(amount: number | null | undefined, fallback: string = '-'): string {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return fallback;
  }
  return amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
}
