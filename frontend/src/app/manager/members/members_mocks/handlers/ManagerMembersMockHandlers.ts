import { http, HttpResponse } from 'msw';
import { MANAGER_HTTP_STATUS } from '@/app/manager/manager_utils/ManagerHttpStatus';
import { MOCK_MEMBERS, MOCK_MEMBER_STATS } from '@/app/manager/members/members_fixtures/ManagerMembersMockData';
import type { Member } from '@/app/manager/members/members_types/ManagerMembersTypes';

let mockMembers = [...MOCK_MEMBERS];

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

export const managerMembersHandlers = [
  http.get(`/api/v1/manager/members/export`, ({ request }) => {
    const url = new URL(request.url);
    const search = (url.searchParams.get('search') || '').trim().toLowerCase();
    const status = (url.searchParams.get('status') || '').trim().toUpperCase();
    const gender = (url.searchParams.get('gender') || '').trim().toUpperCase();
    const plan = (url.searchParams.get('plan') || '').trim().toLowerCase();
    const filtered = MOCK_MEMBERS.filter((member) => {
      const matchesSearch = !search || `${member.name} ${member.phone} ${member.email}`.toLowerCase().includes(search);
      const matchesStatus = !status || status === 'ALL' || member.status.toUpperCase() === status;
      const matchesGender = !gender || gender === 'ALL' || member.gender.toUpperCase() === gender;
      const planName = member.plan?.name?.toLowerCase() || '';
      const matchesPlan = !plan || plan === 'all' || planName === plan || member.planId.toLowerCase() === plan;
      return matchesSearch && matchesStatus && matchesGender && matchesPlan;
    });
    return HttpResponse.json({ success: true, message: 'Members export prepared', data: { members: filtered, total: filtered.length } });
  }),

  http.get(`/api/v1/manager/members`, ({ request }) => {
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

    const filtered = mockMembers.filter((member) => {
      const searchText = [member.name, member.email, member.phone, member.id].join(' ').toLowerCase();
      const matchesSearch = !search || searchText.includes(search);
      const matchesStatus = !status || status === 'all' || member.status.toLowerCase() === status;
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

  http.get(`/api/v1/manager/members/stats`, () => {
    return HttpResponse.json({ success: true, message: 'Success', data: MOCK_MEMBER_STATS });
  }),

  http.get(`/api/v1/manager/members/trainers`, () => {
    return HttpResponse.json({ success: true, message: 'Success', data: { staff: [
      { id: 's1', name: 'Rahul Verma', role: 'Senior Trainer' },
      { id: 's3', name: 'Karan Mehta', role: 'Trainer' },
      { id: 's4', name: 'Anita Shah', role: 'Receptionist' },
    ] } });
  }),

  http.get(`/api/v1/manager/members/plans`, () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [
      { id: 'p1', name: 'Annual Pro', durationMonths: 12, price: 15000 },
      { id: 'p2', name: 'Quarterly Starter', durationMonths: 3, price: 5000 },
      { id: 'p3', name: 'Monthly Basic', durationMonths: 1, price: 2000 }
    ] });
  }),

  http.get(`/api/v1/manager/members/:id/payments`, () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [
      { id: 'pay1', amount: 15000, method: 'UPI', paidAt: new Date().toISOString(), status: 'PAID', invoiceNumber: 'INV-001' },
      { id: 'pay2', amount: 5000, method: 'CARD', paidAt: '2024-04-18T10:30:00Z', status: 'PAID', invoiceNumber: 'INV-002' }
    ] });
  }),

  http.post(`/api/v1/manager/members/:id/payments`, async () => {
    return HttpResponse.json({ success: true, message: 'Payment recorded', data: { id: `pay-${Date.now()}` } });
  }),

  http.get(`/api/v1/manager/members/:id/attendance`, () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [
      { id: 'att1', date: new Date().toISOString(), checkIn: '08:00 AM', type: 'MEMBER' },
      { id: 'att2', date: '2024-05-10T08:30:00Z', checkIn: '08:30 AM', checkOut: '09:45 AM', type: 'MEMBER' }
    ] });
  }),

  http.get(`/api/v1/manager/members/diet-plans`, () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [
      { id: 'dp1', name: 'Weight Loss Plan', type: 'WEIGHT_LOSS', calories: 1500, protein: 120, carbs: 100, fats: 50, meals: [] },
      { id: 'dp2', name: 'Muscle Gain Plan', type: 'MUSCLE_GAIN', calories: 2400, protein: 180, carbs: 260, fats: 70, meals: [] }
    ] });
  }),

  http.post(`/api/v1/manager/members/:id/diet-plans`, async () => {
    return HttpResponse.json({ success: true, message: 'Diet plan assigned', data: { id: `dp-${Date.now()}` } });
  }),

  http.get(`/api/v1/manager/members/workouts`, () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [
      { id: 'wp1', name: 'Beginner Routine', level: 'BEGINNER', daysPerWeek: 3, goal: 'General Fitness', days: 3 },
      { id: 'wp2', name: 'Strength Builder', level: 'INTERMEDIATE', daysPerWeek: 5, goal: 'Muscle Gain', days: 5 }
    ] });
  }),

  http.post(`/api/v1/manager/members/:id/workouts`, async () => {
    return HttpResponse.json({ success: true, message: 'Workout assigned', data: { id: `wp-${Date.now()}` } });
  }),

  http.get(`/api/v1/manager/members/:id`, ({ params }) => {
    const member = mockMembers.find(m => m.id === params.id);
    if (!member) return HttpResponse.json({ success: false, message: 'Member not found', data: null }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    return HttpResponse.json({ success: true, message: 'Success', data: member });
  }),

  http.post(`/api/v1/manager/members`, async ({ request }) => {
    const body = await request.json() as Partial<Member>;
    const template = mockMembers[0];
    const newMember = { ...template, ...body, id: `mem-${Date.now()}` } as Member;
    mockMembers = [newMember, ...mockMembers];
    return HttpResponse.json({ success: true, message: 'Created', data: newMember });
  }),

  http.patch(`/api/v1/manager/members/:id`, async ({ request, params }) => {
    const body = await request.json() as Partial<Member>;
    const idx = mockMembers.findIndex(m => m.id === params.id);
    if (idx === -1) return HttpResponse.json({ success: false, message: 'Not found', data: null }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    mockMembers[idx] = { ...mockMembers[idx], ...body } as Member;
    return HttpResponse.json({ success: true, message: 'Updated', data: mockMembers[idx] });
  }),

  http.delete(`/api/v1/manager/members/:id`, ({ params }) => {
    mockMembers = mockMembers.filter(m => m.id !== params.id);
    return HttpResponse.json({ success: true, message: 'Removed', data: { id: params.id } });
  }),

  http.post(`/api/v1/manager/members/:id/renew`, async ({ request, params }) => {
    const body = await request.json() as Record<string, unknown>;
    const memberIndex = mockMembers.findIndex(m => m.id === params.id);
    if (memberIndex === -1) return HttpResponse.json({ success: false, message: 'Member not found', data: null }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    const current = mockMembers[memberIndex];
    if (!current) return HttpResponse.json({ success: false, message: 'Member not found', data: null }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    const renewed = { ...current, expiryDate: String(body.newExpiryDate || current.expiryDate), planId: String(body.planId || current.planId), pendingAmount: 0 } as Member;
    mockMembers[memberIndex] = renewed;
    return HttpResponse.json({ success: true, message: 'Renewed', data: renewed });
  }),
];
