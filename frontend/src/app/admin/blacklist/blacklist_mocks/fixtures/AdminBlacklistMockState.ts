// RESPONSIBILITY: Owns mutable in-memory mock state for the Admin blacklist feature.
// DATA FLOW: immutable seed fixture → cloned session state → MSW mutation handlers → subsequent queries.
import { MOCK_BLACKLIST_EXPANDED } from '@/app/admin/blacklist/blacklist_mocks/fixtures/AdminBlacklistMockFixtures';
import type { BlacklistedMember } from '@/app/admin/blacklist/blacklist_types/AdminBlacklistTypes';

function cloneBlacklistRecords(records: BlacklistedMember[]): BlacklistedMember[] {
  return records.map((record) => ({
    ...record,
    assignedGyms: [...record.assignedGyms],
    assignedGymNames: [...record.assignedGymNames],
  }));
}

let adminBlacklistMockState = cloneBlacklistRecords(MOCK_BLACKLIST_EXPANDED);

export function getAdminBlacklistMockState(): BlacklistedMember[] {
  return adminBlacklistMockState;
}

export function resetAdminBlacklistMockState(): void {
  adminBlacklistMockState = cloneBlacklistRecords(MOCK_BLACKLIST_EXPANDED);
}
