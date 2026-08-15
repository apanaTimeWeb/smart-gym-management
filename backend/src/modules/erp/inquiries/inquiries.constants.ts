export const INQUIRIES_CONSTANTS = {
  STATUS: {
    NEW: 'NEW',
    FOLLOW_UP: 'FOLLOW_UP',
    CONVERTED: 'CONVERTED',
    LOST: 'LOST',
  },
  ERROR_MESSAGES: {
    INQUIRY_NOT_FOUND: 'Inquiry not found',
  },
  SORT: {
    DESC: 'DESC' as const,
  },
  MESSAGES: {
    INQUIRY_CREATED: 'Inquiry created successfully',
    INQUIRY_FETCHED: 'Inquiry fetched successfully',
    INQUIRIES_FETCHED: 'Inquiries fetched successfully',
    INQUIRY_UPDATED: 'Inquiry updated successfully',
    INQUIRY_DELETED: 'Inquiry deleted successfully',
    STATS_FETCHED: 'Inquiry stats fetched successfully',
  },
};
