import { http, HttpResponse } from 'msw';
import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/ManagerHttpStatus';
import { managerMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl';
import { MANAGER_STORE_STATUS_VALUES } from '@/app/frontend_manager/manager_store/manager_store_constants/ManagerStoreConstants';
import { MOCK_ORDERS, MOCK_PRODUCTS } from '@/app/frontend_manager/manager_store/manager_store_mocks/manager_store_mocks_fixtures/ManagerStoreMockData';
import { MANAGER_STORE_URLS } from '@/app/frontend_manager/manager_store/manager_store_url_config';
import type { Order, Product } from '@/app/frontend_manager/manager_store/manager_store_types/ManagerStoreTypes';

let mockProducts = structuredClone(MOCK_PRODUCTS);
let mockOrders = structuredClone(MOCK_ORDERS);
let mockProductIdCounter = 1000;
let mockOrderIdCounter = 1000;

/**
 * @description Owns the Store module's MSW product/order/summary contracts without importing any sibling business module.
 * @dependencies ManagerStoreUrlConfig, ManagerStoreMockData, ManagerStoreTypes, and approved global mock infrastructure only.
 * @edge-case Resets all mutable fixture state between tests so list, mutation, and summary flows remain deterministic.
 */
export function resetManagerStoreMockState(): void {
  mockProducts = structuredClone(MOCK_PRODUCTS);
  mockOrders = structuredClone(MOCK_ORDERS);
  mockProductIdCounter = 1000;
  mockOrderIdCounter = 1000;
}

function buildSummary() {
  return {
    totalProducts: mockProducts.length,
    totalOrders: mockOrders.length,
    totalRevenue: mockOrders.reduce((sum, order) => sum + order.total, 0),
    lowStockProducts: mockProducts.filter((product) => product.stock <= (product.reorderThreshold ?? 0)),
  };
}

export const managerStoreHandlers = [
  http.get(managerMockApiUrl(MANAGER_STORE_URLS.BACKEND_API.PRODUCTS_BASE), ({ request }) => {
    const url = new URL(request.url);
    const search = (url.searchParams.get('search') ?? '').trim().toLowerCase();
    const category = url.searchParams.get('category') ?? 'ALL';
    const stock = url.searchParams.get('stock') ?? 'ALL';
    const sortBy = url.searchParams.get('sortBy') ?? '';
    const sortOrder = url.searchParams.get('sortOrder') === 'desc' ? 'desc' : 'asc';
    const page = Math.max(Number(url.searchParams.get('page') ?? '1'), 1);
    const limit = Math.max(Number(url.searchParams.get('limit') ?? '10'), 1);
    let items = mockProducts.filter((product) => {
      const searchable = `${product.name} ${product.category} ${product.sku ?? ''}`.toLowerCase();
      const matchesSearch = !search || searchable.includes(search);
      const matchesCategory = category === 'ALL' || product.category === category;
      const matchesStock = stock === 'ALL' || (stock === 'IN_STOCK' && product.stock > 0) || (stock === 'OUT_OF_STOCK' && product.stock <= 0);
      return matchesSearch && matchesCategory && matchesStock;
    });
    if (sortBy === 'name' || sortBy === 'price' || sortBy === 'stock') {
      items = [...items].sort((left, right) => {
        const a = sortBy === 'name' ? left.name : left[sortBy as 'price' | 'stock'];
        const b = sortBy === 'name' ? right.name : right[sortBy as 'price' | 'stock'];
        const comparison = typeof a === 'string' && typeof b === 'string' ? a.localeCompare(b) : Number(a) - Number(b);
        return sortOrder === 'desc' ? -comparison : comparison;
      });
    }
    const total = items.length;
    const start = (page - 1) * limit;
    return HttpResponse.json({ success: true, message: 'Products fetched', data: { products: items.slice(start, start + limit), total } });
  }),
  http.post(managerMockApiUrl(MANAGER_STORE_URLS.BACKEND_API.PRODUCTS_BASE), async ({ request }) => {
    const body = await request.json() as Partial<Product>;
    const product: Product = {
      id: `prod-${mockProductIdCounter++}`,
      name: String(body.name ?? 'New Product'),
      category: String(body.category ?? 'Others'),
      price: Number(body.price ?? 0),
      stock: Number(body.stock ?? 0),
      description: body.description,
      imageUrl: body.imageUrl,
      isActive: body.isActive ?? true,
      unit: body.unit,
      sku: body.sku,
      barcode: body.barcode,
      costPrice: body.costPrice,
      reorderThreshold: body.reorderThreshold,
    };
    mockProducts = [product, ...mockProducts];
    return HttpResponse.json({ success: true, message: 'Product created', data: product });
  }),
  http.patch(managerMockApiUrl(MANAGER_STORE_URLS.BACKEND_API.PRODUCT_UPDATE(':id')), async ({ request, params }) => {
    const id = String(params.id);
    const index = mockProducts.findIndex((product) => product.id === id);
    if (index < 0) return HttpResponse.json({ success: false, message: 'Product not found', data: null }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    const body = await request.json() as Partial<Product>;
    const current = mockProducts[index];
    if (!current) return HttpResponse.json({ success: false, message: 'Product not found', data: null }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    const updated = { ...current, ...body, id: current.id };
    mockProducts[index] = updated;
    return HttpResponse.json({ success: true, message: 'Product updated', data: updated });
  }),
  http.delete(managerMockApiUrl(MANAGER_STORE_URLS.BACKEND_API.PRODUCT_DELETE(':id')), ({ params }) => {
    const id = String(params.id);
    const before = mockProducts.length;
    mockProducts = mockProducts.filter((product) => product.id !== id);
    if (mockProducts.length === before) return HttpResponse.json({ success: false, message: 'Product not found', data: null }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    return HttpResponse.json({ success: true, message: 'Product deleted', data: { id } });
  }),
  http.get(managerMockApiUrl(MANAGER_STORE_URLS.BACKEND_API.ORDERS_BASE), ({ request }) => {
    const url = new URL(request.url);
    const search = (url.searchParams.get('search') ?? '').trim().toLowerCase();
    const method = (url.searchParams.get('method') ?? 'ALL').toLowerCase();
    const status = url.searchParams.get('status') ?? 'ALL';
    const startDate = url.searchParams.get('startDate') ?? '';
    const endDate = url.searchParams.get('endDate') ?? '';
    const page = Math.max(Number(url.searchParams.get('page') ?? '1'), 1);
    const limit = Math.max(Number(url.searchParams.get('limit') ?? '10'), 1);
    const filtered = mockOrders.filter((order) => {
      const matchesSearch = !search || order.id.toLowerCase().includes(search) || order.items?.some((item) => item.product.name.toLowerCase().includes(search));
      const matchesMethod = !method || method === 'all' || order.method.toLowerCase() === method;
      const matchesStatus = !status || status === 'ALL' || status === 'all' || order.status === status;
      const matchesStart = !startDate || order.createdAt.slice(0, 10) >= startDate;
      const matchesEnd = !endDate || order.createdAt.slice(0, 10) <= endDate;
      return matchesSearch && matchesMethod && matchesStatus && matchesStart && matchesEnd;
    });
    const total = filtered.length;
    const start = (page - 1) * limit;
    return HttpResponse.json({ success: true, message: 'Orders fetched', data: { orders: filtered.slice(start, start + limit), total } });
  }),
  http.post(managerMockApiUrl(MANAGER_STORE_URLS.BACKEND_API.ORDERS_BASE), async ({ request }) => {
    const body = await request.json() as { items: { productId: string; qty: number; price?: number }[]; method: string; notes?: string; customerId?: string; total?: number; status?: string };
    const items = body.items.map((item, index) => {
      const product = mockProducts.find((candidate) => candidate.id === item.productId);
      return { id: `item-${mockOrderIdCounter}-${index}`, qty: item.qty, price: item.price ?? product?.price ?? 0, product: { name: product?.name ?? item.productId, unit: product?.unit } };
    });
    for (const item of body.items) {
      const product = mockProducts.find((candidate) => candidate.id === item.productId);
      if (product) product.stock = Math.max(0, product.stock - item.qty);
    }
    const total = body.total ?? items.reduce((sum, item) => sum + item.price * item.qty, 0);
    const order: Order = {
      id: `ord-${mockOrderIdCounter++}`,
      total,
      method: body.method,
      status: body.status ?? MANAGER_STORE_STATUS_VALUES.COMPLETED,
      notes: body.notes,
      createdAt: new Date().toISOString(),
      customerId: body.customerId,
      returnStatus: 'NONE',
      items,
    };
    mockOrders = [order, ...mockOrders];
    return HttpResponse.json({ success: true, message: 'Order created', data: order });
  }),
  http.get(managerMockApiUrl(MANAGER_STORE_URLS.BACKEND_API.SUMMARY), () => HttpResponse.json({ success: true, message: 'Store summary fetched', data: buildSummary() })),
];
