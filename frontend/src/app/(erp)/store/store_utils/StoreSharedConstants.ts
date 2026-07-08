export const formatCurrency = (n: number) => '₹' + (n || 0).toLocaleString('en-IN');

export const CATEGORIES = ['Supplements', 'Accessories', 'Equipment', 'Merchandise', 'Others'];
export const PAYMENT_METHODS = ['UPI', 'Cash', 'Card'];

export const EMPTY_PRODUCT_FORM = { 
 name: '', 
 category: 'Supplements', 
 price: '', 
 stock: '', 
 description: '' 
};
