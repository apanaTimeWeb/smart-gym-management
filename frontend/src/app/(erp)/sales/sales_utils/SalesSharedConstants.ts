export const DATE_FILTERS = ['Today', 'This Week', 'This Month', 'This Year'] as const;
export type DateFilter = typeof DATE_FILTERS[number];

export const SALES_TABS = ['Overview', 'Membership Report', 'Pending Payments', 'All Memberships'] as const;
export type SalesTab = typeof SALES_TABS[number];

export const monthlyData = [
  { month: 'Jan', revenue: 280000, members: 52 },
  { month: 'Feb', revenue: 295000, members: 48 },
  { month: 'Mar', revenue: 310000, members: 61 },
  { month: 'Apr', revenue: 298000, members: 55 },
  { month: 'May', revenue: 325000, members: 67 },
  { month: 'Jun', revenue: 342500, members: 64 },
];

export const membershipReport = [
  { plan: 'Basic', receivable: 120000, received: 114000, remaining: 6000, refund: 0 },
  { plan: 'Gold', receivable: 96000, received: 88200, remaining: 7800, refund: 0 },
  { plan: 'Premium', receivable: 182500, received: 175000, remaining: 7500, refund: 5200 },
  { plan: 'Annual', receivable: 84000, received: 76400, remaining: 7600, refund: 0 },
];

export const pendingReport = [
  { name: 'Amit Kumar', plan: 'Gold', amount: '₹900', overdue: 5 },
  { name: 'Vijay Singh', plan: 'Basic', amount: '₹1,200', overdue: 30 },
  { name: 'Ravi Verma', plan: 'Premium', amount: '₹2,500', overdue: 12 },
  { name: 'Kavita Joshi', plan: 'Gold', amount: '₹1,800', overdue: 8 },
];

export const allMemberships = [
  { name: 'Rahul Sharma', plan: 'Premium', start: '01 Jan', end: '01 Jul 2026', status: 'Active', amount: '₹2,500', days: 3 },
  { name: 'Priya Patel', plan: 'Basic', start: '01 Feb', end: '01 Aug 2026', status: 'Active', amount: '₹1,200', days: 34 },
  { name: 'Vijay Singh', plan: 'Basic', start: '01 May 25', end: '01 May 26', status: 'Expired', amount: '₹1,200', days: -58 },
  { name: 'Anita Gupta', plan: 'Gold', start: '20 Jun', end: '20 Jun 2027', status: 'Active', amount: '₹1,800', days: 357 },
];
