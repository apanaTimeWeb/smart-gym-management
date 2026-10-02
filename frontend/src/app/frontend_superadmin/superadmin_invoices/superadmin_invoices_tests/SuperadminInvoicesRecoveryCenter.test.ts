import {describe, expect, it, beforeEach} from 'vitest';

import { SUPERADMIN_INVOICES_RECOVERY_CENTER_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_mocks/superadmin_invoices_mocks_fixtures/SuperadminInvoicesV1MockFixtures';
import { resetSuperadminInvoicesMockState } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_mocks/superadmin_invoices_mocks_handlers/SuperadminInvoicesMockHandlers';
import { SuperadminInvoicesV1DataSchema } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_schemas/SuperadminInvoicesV1ContractSchemas';


beforeEach(() => {
  resetSuperadminInvoicesMockState();
});

describe('Payment Recovery & Billing Adjustments contract', () => {
    it('accepts the complete module fixture', () => {
        const result = SuperadminInvoicesV1DataSchema.safeParse(SUPERADMIN_INVOICES_RECOVERY_CENTER_MOCK_FIXTURE);
        expect(result.success).toBe(true);
    });
});
