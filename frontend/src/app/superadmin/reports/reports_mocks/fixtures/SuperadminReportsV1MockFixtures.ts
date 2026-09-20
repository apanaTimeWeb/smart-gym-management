// RESPONSIBILITY: Owns complete comparison fixture data for every supported period/segment combination.
const base = {
  metrics: [
    { name: 'Monthly income', current: 1395000, previous: 1308000, change: 6.7 },
    { name: 'Active gyms', current: 842, previous: 811, change: 3.8 },
    { name: 'Gym retention', current: 94.8, previous: 93.9, change: 1.0 },
    { name: 'Customer churn', current: 5.2, previous: 6.1, change: -14.8 },
  ],
  planComparison: [
    { name: 'Starter', income: 22000000, gyms: 92 }, { name: 'Professional', income: 61000000, gyms: 318 }, { name: 'Business', income: 41000000, gyms: 154 }, { name: 'Enterprise', income: 15500000, gyms: 41 },
  ],
  regionComparison: [
    { name: 'Delhi NCR', current: 410000, previous: 370000 }, { name: 'Mumbai', current: 300000, previous: 281000 }, { name: 'Bengaluru', current: 268000, previous: 251000 }, { name: 'Pune', current: 154000, previous: 147000 },
  ],
} as const;

const scaleMetrics = (factor: number, changeFactor: number) => base.metrics.map((metric) => ({
  ...metric,
  current: Math.round(metric.current * factor),
  previous: Math.round(metric.previous * factor),
  change: Number((metric.change * changeFactor).toFixed(1)),
}));

export const SUPERADMIN_REPORTS_COMPARISON_MOCK_FIXTURE = {
  periods: [
    { key: 'month', label: 'This month vs last month' },
    { key: 'quarter', label: 'This quarter vs last quarter' },
    { key: 'year', label: 'This year vs last year' },
  ],
  segments: [
    { key: 'all', label: 'All gyms' },
    { key: 'plan', label: 'By plan' },
    { key: 'region', label: 'By region' },
    { key: 'franchise', label: 'By franchise' },
    { key: 'trial-paid', label: 'Trial vs paid' },
  ],
  metrics: base.metrics,
  planComparison: base.planComparison,
  regionComparison: base.regionComparison,
  comparisonSets: [
    { periodKey: 'month', segmentKey: 'all', metrics: base.metrics },
    { periodKey: 'quarter', segmentKey: 'all', metrics: scaleMetrics(1.08, 1.05) },
    { periodKey: 'year', segmentKey: 'all', metrics: scaleMetrics(1.18, 1.12) },
    { periodKey: 'month', segmentKey: 'plan', metrics: [
      { name: 'Starter income', current: 220000, previous: 205000, change: 7.3 }, { name: 'Professional income', current: 610000, previous: 571000, change: 6.8 }, { name: 'Business income', current: 410000, previous: 392000, change: 4.6 }, { name: 'Enterprise income', current: 155000, previous: 140000, change: 10.7 },
    ]},
    { periodKey: 'quarter', segmentKey: 'plan', metrics: [
      { name: 'Starter income', current: 658000, previous: 611000, change: 7.7 }, { name: 'Professional income', current: 1840000, previous: 1705000, change: 7.9 }, { name: 'Business income', current: 1220000, previous: 1150000, change: 6.1 }, { name: 'Enterprise income', current: 475000, previous: 430000, change: 10.5 },
    ]},
    { periodKey: 'year', segmentKey: 'plan', metrics: [
      { name: 'Starter income', current: 2640000, previous: 2300000, change: 14.8 }, { name: 'Professional income', current: 7320000, previous: 6700000, change: 9.3 }, { name: 'Business income', current: 4920000, previous: 4430000, change: 11.1 }, { name: 'Enterprise income', current: 1860000, previous: 1640000, change: 13.4 },
    ]},
    { periodKey: 'month', segmentKey: 'region', metrics: base.regionComparison.map((row) => ({ name: row.name, current: row.current, previous: row.previous, change: Number((((row.current - row.previous) / row.previous) * 100).toFixed(1)) })) },
    { periodKey: 'quarter', segmentKey: 'region', metrics: base.regionComparison.map((row) => ({ name: row.name, current: Math.round(row.current * 3.1), previous: Math.round(row.previous * 3), change: Number((((row.current * 3.1 - row.previous * 3) / (row.previous * 3)) * 100).toFixed(1)) })) },
    { periodKey: 'year', segmentKey: 'region', metrics: base.regionComparison.map((row) => ({ name: row.name, current: Math.round(row.current * 12.8), previous: Math.round(row.previous * 12), change: Number((((row.current * 12.8 - row.previous * 12) / (row.previous * 12)) * 100).toFixed(1)) })) },
    { periodKey: 'month', segmentKey: 'franchise', metrics: [{ name: 'FitNation Group', current: 310000, previous: 286000, change: 8.4 }, { name: 'Prime Fitness Network', current: 274000, previous: 255000, change: 7.5 }, { name: 'Urban Fit Collective', current: 186000, previous: 175000, change: 6.3 }] },
    { periodKey: 'quarter', segmentKey: 'franchise', metrics: [{ name: 'FitNation Group', current: 945000, previous: 842000, change: 12.2 }, { name: 'Prime Fitness Network', current: 828000, previous: 754000, change: 9.8 }, { name: 'Urban Fit Collective', current: 565000, previous: 520000, change: 8.7 }] },
    { periodKey: 'year', segmentKey: 'franchise', metrics: [{ name: 'FitNation Group', current: 3810000, previous: 3400000, change: 12.1 }, { name: 'Prime Fitness Network', current: 3320000, previous: 2980000, change: 11.4 }, { name: 'Urban Fit Collective', current: 2240000, previous: 2010000, change: 11.4 }] },
    { periodKey: 'month', segmentKey: 'trial-paid', metrics: [{ name: 'Paid gyms', current: 790, previous: 756, change: 4.5 }, { name: 'Trial gyms', current: 52, previous: 55, change: -5.5 }] },
    { periodKey: 'quarter', segmentKey: 'trial-paid', metrics: [{ name: 'Paid gyms', current: 824, previous: 764, change: 7.9 }, { name: 'Trial gyms', current: 68, previous: 71, change: -4.2 }] },
    { periodKey: 'year', segmentKey: 'trial-paid', metrics: [{ name: 'Paid gyms', current: 842, previous: 711, change: 18.4 }, { name: 'Trial gyms', current: 91, previous: 104, change: -12.5 }] },
  ],
} as const;
