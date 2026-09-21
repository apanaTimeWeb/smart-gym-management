// RESPONSIBILITY: Executes the deterministic master seed entrypoint without CommonJS module loading.
// FLOW: npm seed -> run-seed.ts -> seedMasterDatabase().
import { seedMasterDatabase } from '@/backend_superadmin/core/database/seed';
void seedMasterDatabase();
