import type { Product, Order, StoreSummary } from '@/app/manager/store/store_types/ManagerStoreTypes';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod1',
    name: 'Whey Protein (2kg)',
    category: 'Supplements',
    price: 4500,
    stock: 25,
    description: 'Optimum Nutrition Gold Standard 100% Whey',
    isActive: true,
    unit: 'Tub',
    sku: 'SUP-WHEY-001',
    costPrice: 3800,
    reorderThreshold: 10,
  },
  {
    id: 'prod2',
    name: 'Gym T-Shirt (L)',
    category: 'Merchandise',
    price: 600,
    stock: 50,
    description: 'Breathable cotton t-shirt with gym logo',
    isActive: true,
    unit: 'Piece',
    sku: 'MER-TSHIRT-L',
    costPrice: 400,
    reorderThreshold: 20,
  },
  {
    id: 'prod3',
    name: 'Pre-Workout Energy',
    category: 'Supplements',
    price: 2000,
    stock: 5,
    description: 'Cellucor C4 Original Pre Workout Powder',
    isActive: true,
    unit: 'Tub',
    sku: 'SUP-PRE-002',
    costPrice: 1500,
    reorderThreshold: 10,
  },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord1',
    total: 4500,
    method: 'UPI',
    status: 'COMPLETED',
    createdAt: '2024-05-01T10:00:00Z',
    returnStatus: 'NONE',
    items: [
      { id: 'item1', qty: 1, price: 4500, product: { name: 'Whey Protein (2kg)' } }
    ]
  },
  {
    id: 'ord2',
    total: 1200,
    method: 'Cash',
    status: 'COMPLETED',
    createdAt: '2024-05-10T14:30:00Z',
    returnStatus: 'NONE',
    items: [
      { id: 'item2', qty: 2, price: 600, product: { name: 'Gym T-Shirt (L)' } }
    ]
  }
];

export const MOCK_STORE_SUMMARY: StoreSummary = {
  totalProducts: 3,
  totalOrders: 15,
  totalRevenue: 25000,
  lowStockProducts: [MOCK_PRODUCTS[2]!],
};
