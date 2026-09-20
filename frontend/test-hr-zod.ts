import { z } from 'zod';
import { staffSchema, payrollSchema, ledgerEntrySchema } from './src/app/manager/hr/hr_schemas/ManagerHrSchema';
import { MOCK_STAFF, MOCK_PAYROLLS, MOCK_LEDGER } from './src/app/manager/hr/hr_fixtures/ManagerHrMockData';

console.log('Staff:', staffSchema.array().safeParse(MOCK_STAFF).success, staffSchema.array().safeParse(MOCK_STAFF).error?.message);
console.log('Payrolls:', payrollSchema.array().safeParse(MOCK_PAYROLLS).success, payrollSchema.array().safeParse(MOCK_PAYROLLS).error?.message);
console.log('Ledger:', ledgerEntrySchema.array().safeParse(MOCK_LEDGER).success, ledgerEntrySchema.array().safeParse(MOCK_LEDGER).error?.message);
