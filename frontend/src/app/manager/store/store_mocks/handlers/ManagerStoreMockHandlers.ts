import { http, HttpResponse } from 'msw';
import { MANAGER_HTTP_STATUS } from '@/app/manager/manager_utils/ManagerHttpStatus';
import { MOCK_PRODUCTS, MOCK_ORDERS, MOCK_STORE_SUMMARY } from '@/app/manager/store/store_fixtures/ManagerStoreMockData';

let productsDb = [...MOCK_PRODUCTS];
let ordersDb = [...MOCK_ORDERS];

export const managerStoreHandlers = [
  http.get('http://localhost:5000/api/v1/manager/store/products', ({ request }) => {
    return HttpResponse.json({
      success: true,
      message: 'Products fetched',
      data: { products: productsDb, total: productsDb.length }
    });
  }),

  http.post('http://localhost:5000/api/v1/manager/store/products', async ({ request }) => {
    const body = await request.json() as Record<string, unknown>;
    const newProduct = {
      ...body,
      id: `prod-${Date.now()}`
    } as any;
    productsDb = [newProduct, ...productsDb];
    return HttpResponse.json({
      success: true,
      message: 'Product created',
      data: newProduct
    });
  }),

  http.patch('http://localhost:5000/api/v1/manager/store/products/:id', async ({ request, params }) => {
    const body = await request.json() as Record<string, unknown>;
    const { id } = params;
    const index = productsDb.findIndex(p => p.id === id);
    if (index > -1) {
      productsDb[index] = { ...productsDb[index], ...body } as any;
      return HttpResponse.json({ success: true, message: 'Product updated', data: productsDb[index] });
    }
    return HttpResponse.json({ success: false, message: 'Not found' }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
  }),

  http.delete('http://localhost:5000/api/v1/manager/store/products/:id', ({ params }) => {
    const { id } = params;
    productsDb = productsDb.filter(p => p.id !== id);
    return HttpResponse.json({ success: true, message: 'Product deleted', data: { id } });
  }),

  http.get('http://localhost:5000/api/v1/manager/store/orders', ({ request }) => {
    return HttpResponse.json({
      success: true,
      message: 'Orders fetched',
      data: { orders: ordersDb, total: ordersDb.length }
    });
  }),

  http.post('http://localhost:5000/api/v1/manager/store/orders', async ({ request }) => {
    const body = await request.json() as Record<string, unknown>;
    const newOrder = {
      ...body,
      id: `ord-${Date.now()}`,
      date: new Date().toISOString()
    } as any;
    ordersDb = [newOrder, ...ordersDb];
    return HttpResponse.json({ success: true, message: 'Order created', data: newOrder });
  }),

  http.get('http://localhost:5000/api/v1/manager/store/summary', () => {
    return HttpResponse.json({
      success: true,
      message: 'Store summary fetched',
      data: MOCK_STORE_SUMMARY
    });
  })
];
