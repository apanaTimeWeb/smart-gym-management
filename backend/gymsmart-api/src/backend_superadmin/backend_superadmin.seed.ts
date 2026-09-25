import 'dotenv/config';
import { seedMasterDatabase } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-seed';

async function runSuperadminSeed() {
  console.log('Starting Superadmin master seed...');
  try {
    await seedMasterDatabase();
    console.log('✅ Superadmin data seeded successfully.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Superadmin seed failed:', error);
    process.exit(1);
  }
}

void runSuperadminSeed();
