// RESPONSIBILITY: Provides strongly-typed network calls for the inquiries module.
import type { ApiResponse } from '@/lib/api';
import type { Inquiry, InquiryStats } from '@/app/manager/inquiries/inquiries_types/ManagerInquiriesTypes';
import type { InquiryFormValues } from '@/app/manager/inquiries/inquiries_utils/ManagerInquiriesSharedConstants';
import { MOCK_INQUIRIES, MOCK_INQUIRY_STATS } from '@/app/manager/inquiries/inquiries_api/ManagerInquiriesMockData';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

let MOCK_DB = [...MOCK_INQUIRIES];

export const inquiriesApi = {
  getAll: async (params?: Record<string, string>): Promise<ApiResponse<{ inquiries: Inquiry[]; total: number }>> => {
    await delay(600);
    let results = [...MOCK_DB];
    
    if (params?.search) {
      const q = params.search.toLowerCase();
      results = results.filter(i => i.name.toLowerCase().includes(q) || i.phone.includes(q) || (i.email && i.email.toLowerCase().includes(q)));
    }
    
    if (params?.status && params.status !== 'ALL') {
      results = results.filter(i => i.status === params.status);
    }
    
    const page = parseInt(params?.page || '1', 10);
    const limit = parseInt(params?.limit || '10', 10);
    const total = results.length;
    
    const start = (page - 1) * limit;
    const paginated = results.slice(start, start + limit);
    
    return { success: true, data: { inquiries: paginated, total }, message: 'Inquiries fetched' };
  },
  
  getPlans: async (): Promise<ApiResponse<{name: string}[]>> => {
    await delay(300);
    return { success: true, data: [{ name: 'Personal Training' }, { name: 'Yoga Class' }, { name: 'CrossFit' }], message: 'Plans fetched' };
  },
  
  getOne: async (id: string): Promise<ApiResponse<Inquiry>> => {
    await delay(300);
    const item = MOCK_DB.find(i => i.id === id);
    if (!item) throw new Error('Not found');
    return { success: true, data: item, message: 'Inquiry fetched' };
  },
  
  getStats: async (): Promise<ApiResponse<InquiryStats>> => {
    await delay(400);
    return { success: true, data: MOCK_INQUIRY_STATS, message: 'Stats fetched' };
  },
  
  create: async (body: Partial<InquiryFormValues>): Promise<ApiResponse<Inquiry>> => {
    await delay(600);
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
    MOCK_DB = [newInquiry, ...MOCK_DB];
    return { success: true, data: newInquiry, message: 'Inquiry created successfully' };
  },
  
  update: async (id: string, body: Partial<InquiryFormValues>): Promise<ApiResponse<Inquiry>> => {
    await delay(600);
    const index = MOCK_DB.findIndex(i => i.id === id);
    if (index === -1) throw new Error('Not found');
    MOCK_DB[index] = { ...MOCK_DB[index], ...body } as Inquiry;
    return { success: true, data: MOCK_DB[index], message: 'Inquiry updated successfully' };
  },
  
  remove: async (id: string): Promise<ApiResponse<{ id: string }>> => {
    await delay(600);
    MOCK_DB = MOCK_DB.filter(i => i.id !== id);
    return { success: true, data: { id }, message: 'Inquiry deleted successfully' };
  },
};
