import { http, HttpResponse } from 'msw';
import { MOCK_MEMBERS, MOCK_MEMBER_STATS } from '@/app/manager/members/members_fixtures/ManagerMembersMockData';
import type { Member } from '@/app/manager/members/members_types/ManagerMembersTypes';

let mockMembers = [...MOCK_MEMBERS];

export const managerMembersHandlers = [
  http.get('http://localhost:5000/api/v1/manager/members', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: { members: mockMembers, total: mockMembers.length, page: 1, limit: 10 } });
  }),

  http.get('http://localhost:5000/api/v1/manager/members/stats', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: MOCK_MEMBER_STATS });
  }),

  http.get('http://localhost:5000/api/v1/manager/members/trainers', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: { staff: [] } });
  }),

  http.get('http://localhost:5000/api/v1/manager/members/plans', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [
      { id: 'p1', name: 'Annual Pro', durationMonths: 12, price: 15000 },
      { id: 'p2', name: 'Quarterly Starter', durationMonths: 3, price: 5000 },
      { id: 'p3', name: 'Monthly Basic', durationMonths: 1, price: 2000 }
    ] });
  }),

  http.get('http://localhost:5000/api/v1/manager/members/:id/payments', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [
      { id: 'pay1', amount: 15000, method: 'UPI', paidAt: new Date().toISOString(), status: 'PAID', invoiceNumber: 'INV-001' }
    ] });
  }),

  http.post('http://localhost:5000/api/v1/manager/members/:id/payments', async () => {
    return HttpResponse.json({ success: true, message: 'Success', data: { id: `pay-${Date.now()}` } });
  }),

  http.get('http://localhost:5000/api/v1/manager/members/:id/attendance', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [
      { id: 'att1', date: new Date().toISOString(), checkIn: '08:00 AM', type: 'MEMBER' }
    ] });
  }),

  http.get('http://localhost:5000/api/v1/manager/members/diet-plans', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [
      { id: 'dp1', name: 'Weight Loss Plan', type: 'WEIGHT_LOSS', calories: 1500, protein: 120, carbs: 100, fats: 50, meals: [] }
    ] });
  }),

  http.post('http://localhost:5000/api/v1/manager/members/:id/diet-plans', async () => {
    return HttpResponse.json({ success: true, message: 'Success', data: { id: `dp-${Date.now()}` } });
  }),

  http.get('http://localhost:5000/api/v1/manager/members/workouts', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [
      { id: 'wp1', name: 'Beginner Routine', level: 'BEGINNER', daysPerWeek: 3, goal: 'General Fitness', days: 3 }
    ] });
  }),

  http.post('http://localhost:5000/api/v1/manager/members/:id/workouts', async () => {
    return HttpResponse.json({ success: true, message: 'Success', data: { id: `wp-${Date.now()}` } });
  }),

  http.get('http://localhost:5000/api/v1/manager/members/:id', ({ params }) => {
    const member = mockMembers.find(m => m.id === params.id) || mockMembers[0];
    return HttpResponse.json({ success: true, message: 'Success', data: member });
  }),

  http.post('http://localhost:5000/api/v1/manager/members', async ({ request }) => {
    const body = await request.json() as Partial<Member>;
    const newMember = { ...mockMembers[0], ...body, id: `mem-${Date.now()}` } as Member;
    mockMembers = [newMember, ...mockMembers];
    return HttpResponse.json({ success: true, message: 'Created', data: newMember });
  }),

  http.patch('http://localhost:5000/api/v1/manager/members/:id', async ({ request, params }) => {
    const body = await request.json() as Partial<Member>;
    const idx = mockMembers.findIndex(m => m.id === params.id);
    if (idx === -1) return HttpResponse.json({ success: false, message: 'Not found' }, { status: 404 });
    mockMembers[idx] = { ...mockMembers[idx], ...body } as Member;
    return HttpResponse.json({ success: true, message: 'Updated', data: mockMembers[idx] });
  }),

  http.delete('http://localhost:5000/api/v1/manager/members/:id', ({ params }) => {
    mockMembers = mockMembers.filter(m => m.id !== params.id);
    return HttpResponse.json({ success: true, message: 'Removed', data: { id: params.id } });
  }),

  http.post('http://localhost:5000/api/v1/manager/members/:id/renew', async ({ request, params }) => {
    const body = await request.json();
    return HttpResponse.json({ success: true, message: 'Renewed', data: mockMembers[0] });
  }),
];
