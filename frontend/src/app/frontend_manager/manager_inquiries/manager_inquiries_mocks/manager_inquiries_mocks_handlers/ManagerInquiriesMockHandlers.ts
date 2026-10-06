import { http, HttpResponse } from 'msw';
import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/ManagerHttpStatus';
import { managerMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl';
import { MANAGER_INQUIRIES_STATUS_VALUES } from '@/app/frontend_manager/manager_inquiries/manager_inquiries_constants/ManagerInquiriesConstants';
import { MOCK_INQUIRIES, MOCK_INQUIRY_STATS } from '@/app/frontend_manager/manager_inquiries/manager_inquiries_mocks/manager_inquiries_mocks_fixtures/ManagerInquiriesMockData';
import { ManagerInquiriesUrlConfig } from '@/app/frontend_manager/manager_inquiries/manager_inquiries_url_config';
import type { InquiryFormValues } from '@/app/frontend_manager/manager_inquiries/manager_inquiries_types/ManagerInquiriesFormTypes';
import type { Inquiry } from '@/app/frontend_manager/manager_inquiries/manager_inquiries_types/ManagerInquiriesTypes';


let mockInquiries = [...MOCK_INQUIRIES];

export let mockConvertedMemberIdCounter = 1000;
let mockInquiryIdCounter = 1000;
/**
 * @description Provides the ManagerInquiriesMockHandlers implementation for the inquiries module.
 * @dependencies @/app/frontend_manager/manager_inquiries/manager_inquiries_mocks/manager_inquiries_mocks_fixtures/ManagerInquiriesMockData; @/app/frontend_manager/manager_inquiries/manager_inquiries_url_config; @/app/frontend_manager/manager_infrastructure/ManagerHttpStatus; @/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl; @/app/frontend_manager/manager_inquiries/manager_inquiries_types/ManagerInquiriesFormTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export function resetManagerInquiriesMockState(): void {
  mockInquiries = [...MOCK_INQUIRIES];
  mockConvertedMemberIdCounter = 1000;
  mockInquiryIdCounter = 1000;
}

export const managerInquiriesHandlers = [
  http.get(managerMockApiUrl(ManagerInquiriesUrlConfig.BACKEND_API.BASE), ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.toLowerCase();
    const status = url.searchParams.get('status');
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = Math.max(parseInt(url.searchParams.get('limit') || '10', 10), 1);
    const date = url.searchParams.get('date') || '';

    let results = [...mockInquiries];
    if (search) {
      results = results.filter(i => i.name.toLowerCase().includes(search) || i.phone.includes(search) || (i.email && i.email.toLowerCase().includes(search)));
    }
    if (status && status !== 'ALL' && status !== 'all' && status !== MANAGER_INQUIRIES_STATUS_VALUES.ALL) {
      results = results.filter(i => i.status === status);
    }
    if (date) {
      results = results.filter(i => i.createdAt?.slice(0, 10) === date || i.followUpDate?.slice(0, 10) === date);
    }
    
    const total = results.length;
    const start = (page - 1) * limit;
    const paginated = results.slice(start, start + limit);

    return HttpResponse.json({ success: true, message: 'Inquiries fetched', data: { inquiries: paginated, total, page, limit } });
  }),

  http.get(managerMockApiUrl(ManagerInquiriesUrlConfig.BACKEND_API.PLANS), () => {
    return HttpResponse.json({ success: true, message: 'Plans fetched', data: [{ name: 'Personal Training' }, { name: 'Yoga Class' }, { name: 'CrossFit' }] });
  }),

  http.get(managerMockApiUrl(ManagerInquiriesUrlConfig.BACKEND_API.PLANS_SNAPSHOT), () => {
    return HttpResponse.json({ success: true, message: 'Plans fetched', data: [
      { id: '1', name: 'Standard Plan', price1Month: 100000, price3Month: 250000, price6Month: 450000, price12Month: 800000, priceCustom: 5000 },
      { id: '2', name: 'Premium Plan', price1Month: 200000, price3Month: 500000, price6Month: 900000, price12Month: 1500000, priceCustom: 10000 }
    ]});
  }),

  http.get(managerMockApiUrl(ManagerInquiriesUrlConfig.BACKEND_API.STATS), () => {
    return HttpResponse.json({ success: true, message: 'Stats fetched', data: MOCK_INQUIRY_STATS });
  }),

  http.get(managerMockApiUrl(ManagerInquiriesUrlConfig.BACKEND_API.GET_ONE(':id')), ({ params }) => {
    const item = mockInquiries.find(i => i.id === params.id);
    if (!item) return HttpResponse.json({ success: false, message: 'Not found' }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    return HttpResponse.json({ success: true, message: 'Inquiry fetched', data: item });
  }),

  http.post(managerMockApiUrl(ManagerInquiriesUrlConfig.BACKEND_API.CONVERT(':id')), async ({ params }) => {
    const idx = mockInquiries.findIndex(i => i.id === params.id);
    const item = mockInquiries[idx];
    if (idx !== -1 && item) {
      item.status = MANAGER_INQUIRIES_STATUS_VALUES.CONVERTED;
    }
    return HttpResponse.json({ success: true, message: 'Converted to member successfully', data: { memberId: `mem-${mockConvertedMemberIdCounter++}` } });
  }),

  http.post(managerMockApiUrl(ManagerInquiriesUrlConfig.BACKEND_API.BASE), async ({ request }) => {
    const body = await request.json() as Partial<InquiryFormValues>;
    const newInquiry: Inquiry = {
      id: `inq-${mockInquiryIdCounter++}`,
      name: body.name || 'New Lead',
      phone: body.phone || '',
      email: body.email,
      interest: body.interest || '',
      status: body.status || MANAGER_INQUIRIES_STATUS_VALUES.NEW,
      source: body.source,
      notes: body.notes,
      createdAt: new Date().toISOString(),
      followUpLogs: []
    };
    mockInquiries = [newInquiry, ...mockInquiries];
    return HttpResponse.json({ success: true, message: 'Inquiry created successfully', data: newInquiry });
  }),

  http.patch(managerMockApiUrl(ManagerInquiriesUrlConfig.BACKEND_API.GET_ONE(':id')), async ({ request, params }) => {
    const body = await request.json() as Partial<InquiryFormValues>;
    const idx = mockInquiries.findIndex(i => i.id === params.id);
    if (idx === -1) return HttpResponse.json({ success: false, message: 'Not found' }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    mockInquiries[idx] = { ...mockInquiries[idx], ...body } as Inquiry;
    return HttpResponse.json({ success: true, message: 'Inquiry updated successfully', data: mockInquiries[idx] });
  }),

  http.delete(managerMockApiUrl(ManagerInquiriesUrlConfig.BACKEND_API.GET_ONE(':id')), ({ params }) => {
    mockInquiries = mockInquiries.filter(i => i.id !== params.id);
    return HttpResponse.json({ success: true, message: 'Inquiry deleted successfully', data: { id: params.id } });
  })
];
