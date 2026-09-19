// RESPONSIBILITY: Converts the filtered Admin Members response records into the module's CSV export format.

import type { AdminMember } from '@/app/admin/members/members_types/AdminMembersTypes';

/** Creates a deterministic CSV containing the actual member fields exposed by the export contract. */
export function createAdminMembersExportCsv(members: AdminMember[]): string {
  const escapeCsvValue = (value: unknown): string => `"${String(value ?? '').replaceAll('"', '""')}"`;
  const rows: unknown[][] = [
    ['ID', 'Name', 'Email', 'Phone', 'Branch', 'Plan', 'Status', 'Gender', 'Join Date', 'Expiry Date', 'Pending Amount'],
    ...members.map((member) => [
      member.id,
      member.name,
      member.email,
      member.phone,
      member.branchName,
      member.planName,
      member.status,
      member.gender,
      member.joinDate,
      member.expiryDate,
      member.pendingAmount,
    ]),
  ];

  return rows.map((row) => row.map(escapeCsvValue).join(',')).join('\n');
}
