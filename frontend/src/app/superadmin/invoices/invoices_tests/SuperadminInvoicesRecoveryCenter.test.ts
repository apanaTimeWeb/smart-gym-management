import { resetSuperadminInvoicesMockState } from '@/app/superadmin/invoices/invoices_mocks/handlers/SuperadminInvoicesMockHandlers';
import {describe, expect, it, beforeEach} from 'vitest';
import { SuperadminInvoicesV1DataSchema } from '@/app/superadmin/invoices/invoices_types/SuperadminInvoicesV1Types';
import { SUPERADMIN_INVOICES_RECOVERY_CENTER_MOCK_FIXTURE } from '@/app/superadmin/invoices/invoices_mocks/fixtures/SuperadminInvoicesV1MockFixtures';
beforeEach(() => {
  resetSuperadminInvoicesMockState();
});

describe('Payment Recovery & Billing Adjustments contract', () => {
    it('accepts the complete module fixture', () => {
        const result = SuperadminInvoicesV1DataSchema.safeParse(SUPERADMIN_INVOICES_RECOVERY_CENTER_MOCK_FIXTURE);
        expect(result.success).toBe(true);
    });
});
