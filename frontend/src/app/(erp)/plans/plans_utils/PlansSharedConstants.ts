export const TIERS = ['BASIC', 'GOLD', 'PREMIUM'];

export const EMPTY_PLAN_FORM = { 
  name: '', 
  tier: 'BASIC', 
  price1Month: '', 
  price3Month: '', 
  price6Month: '', 
  price12Month: '', 
  features: '' 
};

export const formatCurrency = (n: number) => '₹' + (n || 0).toLocaleString('en-IN');
