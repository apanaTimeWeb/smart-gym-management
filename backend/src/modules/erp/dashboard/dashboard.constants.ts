export const DASHBOARD_CONSTANTS = {
  MONTHS_LOOKBACK: 5,
  MONTH_NAMES: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  CACHE_TTL: {
    KPI: 60000, // 1 min
    CHARTS: 300000, // 5 mins
    RECENT: 30000, // 30 secs
  },
  CACHE_KEYS: {
    KPI: 'dashboard:kpi',
    CHARTS: 'dashboard:charts',
    RECENT: 'dashboard:recent',
  },
  MESSAGES: {
    KPI_FETCHED: 'KPI stats retrieved successfully',
    CHARTS_FETCHED: 'Chart stats retrieved successfully',
    RECENT_FETCHED: 'Recent stats retrieved successfully',
  },
};
