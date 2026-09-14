import { http, HttpResponse } from 'msw';
import { MOCK_INQUIRIES, MOCK_INQUIRY_STATS } from '@/app/manager/inquiries/inquiries_api/ManagerInquiriesMockData';
import type { Inquiry } from '@/app/manager/inquiries/inquiries_types/ManagerInquiriesTypes';
import type { InquiryFormValues } from '@/app/manager/inquiries/inquiries_utils/ManagerInquiriesSharedConstants';

let mockInquiries = [...MOCK_INQUIRIES];

export const managerInquiriesHandlers = [
  http.get('http://localhost:5000/api/v1/manager/inquiries', ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.toLowerCase();
    const status = url.searchParams.get('status');
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);

    let results = [...mockInquiries];
    if (search) {
      results = results.filter(i => i.name.toLowerCase().includes(search) || i.phone.includes(search) || (i.email && i.email.toLowerCase().includes(search)));
    }
    if (status && status !== 'ALL') {
      results = results.filter(i => i.status === status);
    }
    
    const total = results.length;
    const start = (page - 1) * limit;
    const paginated = results.slice(start, start + limit);

    return HttpResponse.json({ success: true, message: 'Inquiries fetched', data: { inquiries: paginated, total } });
  }),

  http.get('http://localhost:5000/api/v1/manager/inquiries/plans', () => {
    return HttpResponse.json({ success: true, message: 'Plans fetched', data: [{ name: 'Personal Training' }, { name: 'Yoga Class' }, { name: 'CrossFit' }] });
  }),

  http.get('http://localhost:5000/api/v1/manager/inquiries/plans-snapshot', () => {
    return HttpResponse.json({ success: true, message: 'Plans fetched', data: [
      { id: '1', name: 'Standard Plan', price1Month: 1000, price3Month: 2500, price6Month: 4500, price12Month: 8000, priceCustom: 50 },
      { id: '2', name: 'Premium Plan', price1Month: 2000, price3Month: 5000, price6Month: 9000, price12Month: 15000, priceCustom: 100 }
    ]});
  }),

  http.get('http://localhost:5000/api/v1/manager/inquiries/stats', () => {
    return HttpResponse.json({ success: true, message: 'Stats fetched', data: MOCK_INQUIRY_STATS });
  }),

  http.get('http://localhost:5000/api/v1/manager/inquiries/:id', ({ params }) => {
    const item = mockInquiries.find(i => i.id === params.id);
    if (!item) return HttpResponse.json({ success: false, message: 'Not found' }, { status: 404 });
    return HttpResponse.json({ success: true, message: 'Inquiry fetched', data: item });
  }),

  http.post('http://localhost:5000/api/v1/manager/inquiries/:id/convert', async ({ params }) => {
    const idx = mockInquiries.findIndex(i => i.id === params.id);
    const item = mockInquiries[idx];
    if (idx !== -1 && item) {
      item.status = 'CONVERTED';
    }
    return HttpResponse.json({ success: true, message: 'Converted to member successfully', data: { memberId: `mem-${Date.now()}` } });
  }),

  http.post('http://localhost:5000/api/v1/manager/inquiries', async ({ request }) => {
    const body = await request.json() as Partial<InquiryFormValues>;
    const newInquiry: Inquiry = {
      id: `inq-${Date.now()}`,
      name: body.name || 'New Lead',
      phone: body.phone || '',
      email: body.email,
      interest: body.interest || '',
      status: body.status || 'NEW',
      source: body.source,
      notes: body.notes,
      createdAt: new Date().toISOString(),
      followUpLogs: []
    };
    mockInquiries = [newInquiry, ...mockInquiries];
    return HttpResponse.json({ success: true, message: 'Inquiry created successfully', data: newInquiry });
  }),

  http.patch('http://localhost:5000/api/v1/manager/inquiries/:id', async ({ request, params }) => {
    const body = await request.json() as Partial<InquiryFormValues>;
    const idx = mockInquiries.findIndex(i => i.id === params.id);
    if (idx === -1) return HttpResponse.json({ success: false, message: 'Not found' }, { status: 404 });
    mockInquiries[idx] = { ...mockInquiries[idx], ...body } as Inquiry;
    return HttpResponse.json({ success: true, message: 'Inquiry updated successfully', data: mockInquiries[idx] });
  }),

  http.delete('http://localhost:5000/api/v1/manager/inquiries/:id', ({ params }) => {
    mockInquiries = mockInquiries.filter(i => i.id !== params.id);
    return HttpResponse.json({ success: true, message: 'Inquiry deleted successfully', data: { id: params.id } });
  })
];
