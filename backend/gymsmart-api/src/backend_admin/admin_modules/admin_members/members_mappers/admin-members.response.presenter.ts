// RESPONSIBILITY: Presents ORM-independent AdminMembers domain data as the frontend response contract.
// FLOW: Domain object -> AdminMembersResponsePresenter -> typed response DTO -> canonical response envelope.
import { AdminMembersDomainModel } from '@/backend_admin/admin_modules/admin_members/members_domain/admin-members.domain.js';

import { AdminMemberDto, AdminMembersSummaryDto } from '@/backend_admin/admin_modules/admin_members/members_dtos/admin-members-response.dto.js';


/**
 * @description Owns frontend response presentation for the AdminMembers feature.
 * @remarks This class must receive domain objects only and must never import or expose ORM entities.
 */
export class AdminMembersResponsePresenter {
/** @description Converts a domain model to a frontend response object. @param domain Domain model. @returns Response-safe object. */
  toResponse(domain: AdminMembersDomainModel): AdminMemberDto {
    return {
      id: domain.id,
      name: String(domain.data.name ?? ''),
      email: String(domain.data.email ?? ''),
      phone: String(domain.data.phone ?? ''),
      branchId: String(domain.data.branchId ?? ''),
      branchName: String(domain.data.branchName ?? ''),
      planName: String(domain.data.planName ?? ''),
      status: String(domain.data.status ?? '').toLowerCase() as AdminMemberDto['status'],
      joinDate: String(domain.data.joinDate ?? ''),
      expiryDate: String(domain.data.expiryDate ?? ''),
      pendingAmount: Number(domain.data.pendingAmount ?? 0),
      currency: String(domain.data.currency ?? 'INR'),
      gender: String(domain.data.gender ?? 'Other'),
      referralSource: domain.data.referralSource ? String(domain.data.referralSource) : undefined,
      photo: domain.data.photo ? String(domain.data.photo) : undefined,
      lastCheckIn: domain.data.lastCheckIn ? String(domain.data.lastCheckIn) : undefined,
      totalVisits: domain.data.totalVisits ? Number(domain.data.totalVisits) : undefined,
      dateOfBirth: domain.data.dateOfBirth ? String(domain.data.dateOfBirth) : undefined,
      address: domain.data.address ? String(domain.data.address) : undefined,
    };
  }

/** @description Serializes the member read model into a deterministic frontend-compatible CSV export. @param domain Member read model. @returns RFC4180-compatible CSV text. */
  toCsv(domain: AdminMembersDomainModel): string {
    const rows = Array.isArray(domain.data.members)
      ? domain.data.members.filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === 'object')
      : [];
    if (!rows.length) return 'id,name,email,phone,branchName,planName,status,joinDate,expiryDate,pendingAmount,currency\n';
    const columns = ['id','name','email','phone','branchName','planName','status','joinDate','expiryDate','pendingAmount','currency'];
    const escape = (value: unknown): string => {
      const text = value === null || value === undefined ? '' : String(value);
      return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
    };
    return [columns.join(','), ...rows.map((row) => columns.map((key) => escape(row[key])).join(','))].join('\n') + '\n';
  }

/** @description Serializes multiple filtered member domain records using one stable CSV header. @param domains Filtered member domain records. @returns RFC4180-compatible CSV text. */
  toCsvRows(domains: AdminMembersDomainModel[]): string {
    const columns = ['id','name','email','phone','branchName','planName','status','joinDate','expiryDate','pendingAmount','currency'];
    const escape = (value: unknown): string => {
      const text = value === null || value === undefined ? '' : String(value);
      return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
    };
    const rows = domains.map((domain) => {
      const response = this.toResponse(domain);
      return columns.map((key) => escape((response as any)[key])).join(',');
    });
    return [columns.join(','), ...rows].join('\n') + '\n';
  }

/** @description Converts a domain model to a summary frontend response object. @param domain Domain model. @returns Response-safe object. */
  toSummaryResponse(domain: AdminMembersDomainModel): AdminMembersSummaryDto {
    return {
      totalMembers: Number(domain.data.totalMembers ?? 0),
      activeMembers: Number(domain.data.activeMembers ?? 0),
      expiredMembers: Number(domain.data.expiredMembers ?? 0),
      pendingMembers: Number(domain.data.pendingMembers ?? 0),
      expiringThisWeek: Number(domain.data.expiringThisWeek ?? 0),
      expiringThisMonth: Number(domain.data.expiringThisMonth ?? 0),
      totalOutstanding: Number(domain.data.totalOutstanding ?? 0),
      newThisMonth: Number(domain.data.newThisMonth ?? 0),
      currency: String(domain.data.currency ?? 'INR'),
    };
  }
}
