export const STORE_CONSTANTS = {
  ORDER_STATUS: {
    COMPLETED: 'Completed',
    PENDING: 'Pending',
    CANCELLED: 'Cancelled',
  },
  LOW_STOCK_THRESHOLD: 10,
  SORT: {
    ASC: 'ASC' as const,
    DESC: 'DESC' as const,
  },
  ERROR_MESSAGES: {
    PRODUCT_NOT_FOUND: 'Product not found',
    INSUFFICIENT_STOCK: 'Insufficient stock for product',
    ORDER_FAILED: 'Failed to create order',
  },
  SUCCESS_MESSAGES: {
    ORDER_CREATED: 'Order created successfully',
  },
};
