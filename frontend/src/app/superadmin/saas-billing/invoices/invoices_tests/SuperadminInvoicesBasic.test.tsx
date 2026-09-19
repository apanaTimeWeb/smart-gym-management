import { resetSuperadminInvoicesMockState } from '@/app/superadmin/saas-billing/invoices/invoices_mocks/handlers/SuperadminInvoicesMockHandlers';
import {describe, expect, it, beforeEach} from 'vitest';
import { MOCK_INVOICE_TENANTS } from '@/app/superadmin/saas-billing/invoices/invoices_mocks/fixtures/SuperadminInvoicesMockFixtures';

beforeEach(() => {
  resetSuperadminInvoicesMockState();
});

describe('Superadmin Invoices module fixture contract', () => {
  it('exposes non-empty module-owned demo data for frontend flows', () => {
    expect(MOCK_INVOICE_TENANTS).toBeDefined();
    const serialized = JSON.stringify(MOCK_INVOICE_TENANTS);
    expect(serialized.length).toBeGreaterThan(20);
    expect(serialized).not.toMatch(/\b(TBD|TODO|lorem ipsum|placeholder)\b/i);
  });

});
