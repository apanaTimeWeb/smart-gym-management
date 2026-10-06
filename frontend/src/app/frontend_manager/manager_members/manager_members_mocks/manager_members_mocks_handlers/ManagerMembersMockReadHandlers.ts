import { http, HttpResponse } from 'msw';
import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/ManagerHttpStatus';
import { managerMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl';
import { MANAGER_MEMBERS_STATUS_VALUES, MANAGER_MEMBERS_STATUS_ALL } from '@/app/frontend_manager/manager_members/manager_members_constants/ManagerMembersConstants';
import { MOCK_MEMBER_STATS } from '@/app/frontend_manager/manager_members/manager_members_mocks/manager_members_mocks_fixtures/ManagerMembersMockData';
import { managerMembersMockState } from '@/app/frontend_manager/manager_members/manager_members_mocks/manager_members_mocks_handlers/ManagerMembersMockState';
import { ManagerMembersUrlConfig } from '@/app/frontend_manager/manager_members/manager_members_url_config';
import type { Member } from '@/app/frontend_manager/manager_members/manager_members_types/ManagerMembersTypes';

/**
 * @description Provides the ManagerMembersMockReadHandlers implementation for the members module.
 * @dependencies @/app/frontend_manager/manager_infrastructure/ManagerHttpStatus; @/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl; @/app/frontend_manager/manager_members/manager_members_mocks/manager_members_mocks_fixtures/ManagerMembersMockData; @/app/frontend_manager/manager_members/manager_members_url_config; @/app/frontend_manager/manager_members/manager_members_mocks/manager_members_mocks_handlers/ManagerMembersMockState
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
const MEMBER_DEFAULT_LIMIT = 10;
const SORTABLE_MEMBER_FIELDS = ['name', 'joinDate', 'expiryDate', 'paidAmount', 'status'] as const;
type SortableMemberField = typeof SORTABLE_MEMBER_FIELDS[number];

function sortMembers(items: Member[], column: string, direction: string): Member[] {
  if (!SORTABLE_MEMBER_FIELDS.includes(column as SortableMemberField)) return items;
  const multiplier = direction === 'desc' ? -1 : 1;
  return [...items].sort((first, second) => {
    const firstValue = first[column as SortableMemberField];
    const secondValue = second[column as SortableMemberField];
    return String(firstValue ?? '').localeCompare(String(secondValue ?? ''), undefined, { numeric: true }) * multiplier;
  });
}

/** @description Provides deterministic list/detail/read-only member data and lookup scenarios through the feature-owned MSW transport. @dependencies Reads only Manager Members mock state and fixtures. @edge-case preserves distinct resource IDs so detail URLs cannot silently reuse another member. */
export const managerMembersReadHandlers = [
  http.get(managerMockApiUrl(ManagerMembersUrlConfig.BACKEND_API.EXPORT), ({ request }) => {
    const url = new URL(request.url);
    const search = (url.searchParams.get('search') || '').trim().toLowerCase();
    const status = (url.searchParams.get('status') || '').trim().toUpperCase();
    const gender = (url.searchParams.get('gender') || '').trim().toUpperCase();
    const plan = (url.searchParams.get('plan') || '').trim().toLowerCase();
    const filtered = managerMembersMockState.members.filter((member) => {
      const matchesSearch = !search || `${member.name} ${member.phone} ${member.email}`.toLowerCase().includes(search);
      const matchesStatus = !status || status === MANAGER_MEMBERS_STATUS_ALL || member.status.toUpperCase() === status;
      const matchesGender = !gender || gender === 'ALL' || member.gender.toUpperCase() === gender;
      const planName = member.plan?.name?.toLowerCase() || '';
      const matchesPlan = !plan || plan === 'all' || planName === plan || member.planId.toLowerCase() === plan;
      return matchesSearch && matchesStatus && matchesGender && matchesPlan;
    });
    return HttpResponse.json({ success: true, message: 'Members export prepared', data: { members: filtered, total: filtered.length } });
  }),

  http.get(managerMockApiUrl(ManagerMembersUrlConfig.BACKEND_API.BASE), ({ request }) => {
    const url = new URL(request.url);
    const search = (url.searchParams.get('search') || '').trim().toLowerCase();
    const status = (url.searchParams.get('status') || '').trim().toLowerCase();
    const gender = (url.searchParams.get('gender') || '').trim().toLowerCase();
    const plan = (url.searchParams.get('plan') || '').trim().toLowerCase();
    const expiryFrom = url.searchParams.get('expiryFrom') || '';
    const expiryTo = url.searchParams.get('expiryTo') || '';
    const sort = url.searchParams.get('sort') || 'name';
    const dir = url.searchParams.get('dir') || 'asc';
    const page = Math.max(Number(url.searchParams.get('page') || '1'), 1);
    const limit = Math.max(Number(url.searchParams.get('limit') || String(MEMBER_DEFAULT_LIMIT)), 1);
    const filtered = managerMembersMockState.members.filter((member) => {
      const searchText = [member.name, member.email, member.phone, member.id].join(' ').toLowerCase();
      const matchesSearch = !search || searchText.includes(search);
      const matchesStatus = !status || status === 'all' || status === MANAGER_MEMBERS_STATUS_VALUES.ALL.toLowerCase() || member.status.toLowerCase() === status;
      const matchesGender = !gender || gender === 'all' || member.gender?.toLowerCase() === gender;
      const matchesPlan = !plan || plan === 'all' || member.planId.toLowerCase() === plan || member.plan?.name.toLowerCase() === plan;
      const expiry = member.expiryDate || '';
      const matchesExpiryFrom = !expiryFrom || expiry >= expiryFrom;
      const matchesExpiryTo = !expiryTo || expiry <= `${expiryTo}T23:59:59.999Z`;
      return matchesSearch && matchesStatus && matchesGender && matchesPlan && matchesExpiryFrom && matchesExpiryTo;
    });
    const sorted = sortMembers(filtered, sort, dir);
    const start = (page - 1) * limit;
    const members = sorted.slice(start, start + limit);
    return HttpResponse.json({ success: true, message: 'Success', data: { members, total: filtered.length, page, limit } });
  }),

  http.get(managerMockApiUrl(ManagerMembersUrlConfig.BACKEND_API.STATS), () => HttpResponse.json({ success: true, message: 'Success', data: MOCK_MEMBER_STATS })),
  http.get(managerMockApiUrl(ManagerMembersUrlConfig.BACKEND_API.TRAINERS), () => HttpResponse.json({ success: true, message: 'Success', data: { staff: [
    { id: 's1', name: 'Rahul Verma', role: 'Senior Trainer' }, { id: 's3', name: 'Karan Mehta', role: 'Trainer' }, { id: 's4', name: 'Anita Shah', role: 'Receptionist' },
  ] } })),
  http.get(managerMockApiUrl(ManagerMembersUrlConfig.BACKEND_API.PLANS_SNAPSHOT), () => HttpResponse.json({ success: true, message: 'Success', data: [
    { id: 'p1', name: 'Annual Pro', price1Month: 150000, price3Month: 400000, price6Month: 750000, price12Month: 1500000 },
    { id: 'p2', name: 'Quarterly Starter', price1Month: 200000, price3Month: 500000, price6Month: 900000, price12Month: 1600000 },
    { id: 'p3', name: 'Monthly Basic', price1Month: 200000, price3Month: 550000, price6Month: 1000000, price12Month: 1800000 },
  ] })),

  http.get(managerMockApiUrl(ManagerMembersUrlConfig.BACKEND_API.PAYMENTS(':id')), ({ params }) => {
    const memberId = String(params.id);
    const seed = managerMembersMockState.paymentByMemberId[memberId] ?? [
      { id: 'pay1', amount: 1500000, method: 'UPI', paidAt: new Date().toISOString(), status: MANAGER_MEMBERS_STATUS_VALUES.PAID, invoiceNumber: 'INV-001' },
      { id: 'pay2', amount: 500000, method: 'CARD', paidAt: '2024-04-18T10:30:00Z', status: MANAGER_MEMBERS_STATUS_VALUES.PAID, invoiceNumber: 'INV-002' },
    ];
    managerMembersMockState.paymentByMemberId[memberId] = [...seed];
    return HttpResponse.json({ success: true, message: 'Success', data: managerMembersMockState.paymentByMemberId[memberId] });
  }),

  http.get(managerMockApiUrl(ManagerMembersUrlConfig.BACKEND_API.ATTENDANCE(':id')), () => HttpResponse.json({ success: true, message: 'Success', data: [
    { id: 'att1', date: new Date().toISOString(), checkIn: '08:00 AM', type: 'MEMBER' }, { id: 'att2', date: '2024-05-10T08:30:00Z', checkIn: '08:30 AM', checkOut: '09:45 AM', type: 'MEMBER' },
  ] })),

  http.get(managerMockApiUrl(ManagerMembersUrlConfig.BACKEND_API.DIET_PLANS), () => HttpResponse.json({ success: true, message: 'Success', data: [
    { id: 'dp1', name: 'Weight Loss Plan', type: 'WEIGHT_LOSS', calories: 1500, protein: 120, carbs: 100, fats: 50, meals: [] }, { id: 'dp2', name: 'Muscle Gain Plan', type: 'MUSCLE_GAIN', calories: 2400, protein: 180, carbs: 260, fats: 70, meals: [] },
  ] })),
  http.get(managerMockApiUrl(ManagerMembersUrlConfig.BACKEND_API.WORKOUTS), () => HttpResponse.json({ success: true, message: 'Success', data: [
    { id: 'wp1', name: 'Beginner Routine', level: 'BEGINNER', daysPerWeek: 3, goal: 'General Fitness', days: 3 }, { id: 'wp2', name: 'Strength Builder', level: 'INTERMEDIATE', daysPerWeek: 5, goal: 'Muscle Gain', days: 5 },
  ] })),
  http.get(managerMockApiUrl(ManagerMembersUrlConfig.BACKEND_API.GET_ONE(':id')), ({ params }) => {
    const member = managerMembersMockState.members.find((item) => item.id === params.id);
    if (!member) return HttpResponse.json({ success: false, message: 'Member not found', data: null }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    return HttpResponse.json({ success: true, message: 'Success', data: member });
  }),
];
