import 'dotenv/config';
import MasterDataSource from '@/backend_manager/manager_core/manager_core_database/manager-core-master-data-source';
import { runManagerSeeds } from '@/backend_manager/manager_core/manager_core_seeders/manager-core-master-seed';

async function runSeed() {
  console.log('Starting Manager seed...');
  try {
    if (!MasterDataSource.isInitialized) {
      await MasterDataSource.initialize();
    }
    await runManagerSeeds(MasterDataSource);
    console.log('✅ Manager data seeded successfully.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Manager seed failed:', error);
    process.exit(1);
  }
}

runSeed();
