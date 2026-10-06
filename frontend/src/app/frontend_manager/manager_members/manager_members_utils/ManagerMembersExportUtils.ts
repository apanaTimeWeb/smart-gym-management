'use client';
import type { Member } from '@/app/frontend_manager/manager_members/manager_members_types/ManagerMembersTypes';

/**
 * @description Provides the ManagerMembersExportUtils implementation for the members module.
 * @dependencies @/app/frontend_manager/manager_members/manager_members_types/ManagerMembersTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
const escapeCsv = (value: string | number) => {
  const text = String(value ?? '');
  return /[,"\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
};

/** Builds and downloads a member CSV from the server-backed rows already rendered by the feature. */
/**
 * @description Transforms or formats members data without owning server state or cross-feature business behavior.
 * @dependencies Uses feature-local utilities/constants and approved platform APIs only.
 * @edge-case Preserves documented nullish, invalid, masked, and timezone-safe fallback behavior.
 */
export function downloadManagerMembersCsv(members: Member[]) {
  const rows = [
    ['Member ID', 'Name', 'Phone', 'Email', 'Plan', 'Status', 'Join Date', 'Expiry Date', 'Paid', 'Pending'],
    ...members.map((member) => [
      member.id, member.name, member.phone, member.email, member.plan?.name || member.planId, member.status, member.joinDate, member.expiryDate, member.paidAmount, member.pendingAmount,
    ]),
  ];
  const csv = rows.map((row) => row.map((cell) => escapeCsv(cell)).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `manager_members_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

/** Opens the current server-backed member rows in a print dialog so the browser can produce a PDF. */
/**
 * @description Transforms or formats members data without owning server state or cross-feature business behavior.
 * @dependencies Uses feature-local utilities/constants and approved platform APIs only.
 * @edge-case Preserves documented nullish, invalid, masked, and timezone-safe fallback behavior.
 */
export function printManagerMembersPdf(members: Member[]) {
  const rows = members.map((member) => `<tr><td>${escapeCsv(member.id)}</td><td>${escapeCsv(member.name)}</td><td>${escapeCsv(member.phone)}</td><td>${escapeCsv(member.plan?.name || member.planId)}</td><td>${escapeCsv(member.status)}</td><td>${escapeCsv(member.expiryDate)}</td><td>${escapeCsv(member.pendingAmount)}</td></tr>`).join('');
  const printWindow = window.open('', '_blank', 'noopener,noreferrer,width=1200,height=800');
  if (!printWindow) return;
  printWindow.document.write(`<html><head><title>Manager Member Export</title><style>body{font-family:sans-serif;padding:24px}table{border-collapse:collapse;width:100%}th,td{border:1px solid currentColor;padding:6px;text-align:left;font-size:12px}</style></head><body><h1>Member Export</h1><table><thead><tr><th>ID</th><th>Name</th><th>Phone</th><th>Plan</th><th>Status</th><th>Expiry</th><th>Pending</th></tr></thead><tbody>${rows}</tbody></table></body></html>`);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}
