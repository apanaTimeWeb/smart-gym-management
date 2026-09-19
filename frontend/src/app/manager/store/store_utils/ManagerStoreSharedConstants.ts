// RESPONSIBILITY: Stores Store-specific display/filter constants only; form schema and defaults live in the Store form/schema contracts.
export const CATEGORIES = ['Supplements', 'Accessories', 'Equipment', 'Merchandise', 'Others'] as const;
export const PAYMENT_METHODS = ['UPI', 'Cash'] as const;
export const ERR_EMPTY_ORDER = 'Add items to order first';
