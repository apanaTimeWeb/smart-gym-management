import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse } from 'msw';
import { MANAGER_HTTP_STATUS } from '@/app/manager/manager_infrastructure/ManagerHttpStatus';
import { managerMockApiUrl } from '@/app/manager/manager_infrastructure/ManagerMockApiUrl';
import { MOCK_PRODUCTS, MOCK_ORDERS, MOCK_STORE_SUMMARY } from '@/app/manager/store/store_fixtures/ManagerStoreMockData';
import { productSchema, orderSchema } from '@/app/manager/store/store_schemas/ManagerStoreSchema';
import { ManagerStoreUrlConfig } from '@/app/manager/store/store_url_config';


let productsDb = [...MOCK_PRODUCTS];
let ordersDb = [...MOCK_ORDERS];

export let mockProductIdCounter = 1000;
let mockOrderIdCounter = 1000;
export function resetManagerStoreMockState(): void {
  productsDb = [...MOCK_PRODUCTS];
  ordersDb = [...MOCK_ORDERS];
  mockProductIdCounter = 1000;
  mockOrderIdCounter = 1000;
}

export const managerStoreHandlers = [
  http.get(managerMockApiUrl(ManagerStoreUrlConfig.BACKEND_API.PRODUCTS_BASE), ({ request }) => {
    const url = new URL(request.url);
    const search = (url.searchParams.get('search') || '').trim().toLowerCase();
    const category = (url.searchParams.get('category') || '').trim().toLowerCase();
    const stock = (url.searchParams.get('stock') || '').trim().toUpperCase();
    const page = Math.max(Number(url.searchParams.get('page') || '1'), 1);
    const limit = Math.max(Number(url.searchParams.get('limit') || '12'), 1);
    const sortOrder = (url.searchParams.get('sortOrder') || 'DESC').toUpperCase();
    const filtered = productsDb.filter((product) => {
      const matchesSearch = !search || `${product.name} ${product.category ?? ''}`.toLowerCase().includes(search);
      const matchesCategory = !category || category === 'all' || String(product.category ?? '').toLowerCase() === category;
      const matchesStock = !stock || stock === 'ALL' || (stock === 'LOW' ? product.stock <= 5 : stock === 'OUT' ? product.stock === 0 : product.stock > 5);
      return matchesSearch && matchesCategory && matchesStock;
    }).sort((a, b) => sortOrder === 'ASC' ? a.price - b.price : b.price - a.price);
    const start = (page - 1) * limit;
    return HttpResponse.json({ success: true, message: 'Products fetched', data: { products: filtered.slice(start, start + limit), total: filtered.length, page, limit } });
  }),

  http.post(managerMockApiUrl(ManagerStoreUrlConfig.BACKEND_API.PRODUCTS_BASE), async ({ request }) => {
    const body = await request.json() as Record<string, unknown>;
    const parsedBody = productSchema.partial().safeParse(body);
    if (!parsedBody.success) return HttpResponse.json({ success: false, message: 'Invalid product payload', data: null }, { status: StatusCodes.BAD_REQUEST });
    const newProduct = productSchema.parse({
      ...parsedBody.data,
      id: `prod-${mockProductIdCounter++}`,
      isActive: parsedBody.data.isActive ?? true,
      stock: parsedBody.data.stock ?? 0,
      price: parsedBody.data.price ?? 0 });
    productsDb = [newProduct, ...productsDb];
    return HttpResponse.json({
      success: true,
      message: 'Product created',
      data: newProduct
    });
  }),

  http.patch(managerMockApiUrl(ManagerStoreUrlConfig.BACKEND_API.PRODUCT_UPDATE(':id')), async ({ request, params }) => {
    const body = await request.json() as Record<string, unknown>;
    const parsedBody = productSchema.partial().safeParse(body);
    if (!parsedBody.success) return HttpResponse.json({ success: false, message: 'Invalid product payload', data: null }, { status: StatusCodes.BAD_REQUEST });
    const { id } = params;
    const index = productsDb.findIndex(p => p.id === id);
    if (index > -1) {
      const existingProduct = productsDb[index];
      if (!existingProduct) return HttpResponse.json({ success: false, message: 'Not found', data: null }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
      productsDb[index] = productSchema.parse({ ...existingProduct, ...parsedBody.data });
      return HttpResponse.json({ success: true, message: 'Product updated', data: productsDb[index] });
    }
    return HttpResponse.json({ success: false, message: 'Not found' }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
  }),

  http.delete(managerMockApiUrl(ManagerStoreUrlConfig.BACKEND_API.PRODUCT_UPDATE(':id')), ({ params }) => {
    const { id } = params;
    productsDb = productsDb.filter(p => p.id !== id);
    return HttpResponse.json({ success: true, message: 'Product deleted', data: { id } });
  }),

  http.get(managerMockApiUrl(ManagerStoreUrlConfig.BACKEND_API.ORDERS_BASE), ({ request }) => {
    const url = new URL(request.url);
    const search = (url.searchParams.get('search') || '').trim().toLowerCase();
    const page = Math.max(Number(url.searchParams.get('page') || '1'), 1);
    const limit = Math.max(Number(url.searchParams.get('limit') || '10'), 1);
    const sortOrder = (url.searchParams.get('sortOrder') || 'DESC').toUpperCase();
    const filtered = ordersDb.filter((order) => !search || `${order.id} ${order.status} ${order.method}`.toLowerCase().includes(search)).sort((a, b) => {
      const first = new Date(a.createdAt).getTime(); const second = new Date(b.createdAt).getTime(); return sortOrder === 'ASC' ? first - second : second - first;
    });
    const start = (page - 1) * limit;
    return HttpResponse.json({ success: true, message: 'Orders fetched', data: { orders: filtered.slice(start, start + limit), total: filtered.length, page, limit } });
  }),

  http.post(managerMockApiUrl(ManagerStoreUrlConfig.BACKEND_API.ORDERS_BASE), async ({ request }) => {
    const body = await request.json() as Record<string, unknown>;
    const parsedBody = orderSchema.partial().safeParse(body);
    if (!parsedBody.success) return HttpResponse.json({ success: false, message: 'Invalid order payload', data: null }, { status: StatusCodes.BAD_REQUEST });
    const newOrder = orderSchema.parse({
      ...parsedBody.data,
      id: `ord-${mockOrderIdCounter++}`,
      createdAt: new Date().toISOString(),
      returnStatus: parsedBody.data.returnStatus ?? 'NONE',
      total: parsedBody.data.total ?? 0,
      method: parsedBody.data.method ?? 'Cash',
      status: parsedBody.data.status ?? 'COMPLETED' });
    ordersDb = [newOrder, ...ordersDb];
    return HttpResponse.json({ success: true, message: 'Order created', data: newOrder });
  }),

  http.get(managerMockApiUrl(ManagerStoreUrlConfig.BACKEND_API.SUMMARY), () => {
    return HttpResponse.json({
      success: true,
      message: 'Store summary fetched',
      data: MOCK_STORE_SUMMARY
    });
  })
];
