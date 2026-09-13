// RESPONSIBILITY: Modularized API client for the Invoices module.
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { SaaSInvoice } from '@/app/superadmin/invoices/superadmin_invoices_types/superadmin_invoices_types';

export interface CreateManualPaymentDto {
  gymId: string;
  amount: number;
  planName: string;
  currency?: string;
}

import { MOCK_SUPERADMIN_INVOICES } from '@/app/superadmin/invoices/superadmin_invoices_api/SuperadminInvoicesMockData';

let mockInvoices = [...MOCK_SUPERADMIN_INVOICES];

export const invoicesApi = {
  fetchInvoices: async (params?: Record<string, string>) => {
    await new Promise(r => setTimeout(r, 400));
    return { success: true, message: 'Success', data: mockInvoices };
  },
  createManualPayment: async (dto: CreateManualPaymentDto) => {
    await new Promise(r => setTimeout(r, 500));
    const newInvoice = {
      id: `inv${Date.now()}`,
      tenantId: dto.gymId,
      tenantName: 'Mock Gym', // Simplified
      amount: dto.amount,
      currency: dto.currency || 'INR',
      status: 'PAID',
      issuedAt: new Date().toISOString(),
      dueDate: new Date().toISOString(),
      paidAt: new Date().toISOString(),
      paymentMethod: 'Manual',
      invoiceType: 'ONE_TIME',
      planName: dto.planName
    } as SaaSInvoice;
    mockInvoices = [newInvoice, ...mockInvoices];
    return { success: true, message: 'Created', data: newInvoice };
  },
  getDownloadUrl: async (id: string) => {
    await new Promise(r => setTimeout(r, 300));
    return { success: true, message: 'Success', data: { downloadUrl: '/mock-invoice.pdf' } };
  },
  exportInvoicesCSV: async (params?: Record<string, string>) => {
    await new Promise(r => setTimeout(r, 600));
    return { success: true, message: 'Success', data: { downloadUrl: '/mock-invoices.csv' } };
  },
  resendInvoiceEmail: async (id: string) => {
    await new Promise(r => setTimeout(r, 400));
    return { success: true, message: 'Email resent', data: null };
  },
};
