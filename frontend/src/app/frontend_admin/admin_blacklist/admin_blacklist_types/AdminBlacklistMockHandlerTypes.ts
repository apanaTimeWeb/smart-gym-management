// RESPONSIBILITY: Owns mock-handler input/output types for the Admin blacklist feature.
import type { BlacklistedMember } from '@/app/frontend_admin/admin_blacklist/admin_blacklist_types/AdminBlacklistTypes';

export type AdminBlacklistJsonObject = Record<string, unknown>;
export type BlacklistRecord = BlacklistedMember;
