import { http, HttpResponse } from 'msw';
import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/ManagerHttpStatus';
import { managerMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl';
import { MANAGER_MEMBERS_STATUS_VALUES } from '@/app/frontend_manager/manager_members/manager_members_constants/ManagerMembersConstants';
import { managerMembersMockState } from '@/app/frontend_manager/manager_members/manager_members_mocks/manager_members_mocks_handlers/ManagerMembersMockState';
import { ManagerMembersUrlConfig } from '@/app/frontend_manager/manager_members/manager_members_url_config';
import type { Member } from '@/app/frontend_manager/manager_members/manager_members_types/ManagerMembersTypes';

/** @description Provides mutable create/update/delete/payment/assignment handlers for the Manager Members frontend demo contract. @dependencies Uses only feature-owned mock state and URL infrastructure. @edge-case every mutation updates in-memory state so subsequent list/detail reads prove the resulting UI state. */
export const managerMembersMutationHandlers = [
  http.post(managerMockApiUrl(ManagerMembersUrlConfig.BACKEND_API.PAYMENTS(':id')), async ({ params, request }) => {
    const memberId = String(params.id);
    const body = await request.json() as Record<string, unknown>;
    const existing = managerMembersMockState.paymentByMemberId[memberId] ?? [];
    const paymentId = managerMembersMockState.paymentIdCounter++;
    const payment = { id: `pay-${paymentId}`, amount: Number(body.amount ?? 0), method: String(body.method ?? 'UPI'), paidAt: new Date().toISOString(), status: MANAGER_MEMBERS_STATUS_VALUES.PAID as const, invoiceNumber: `INV-${paymentId}` };
    managerMembersMockState.paymentByMemberId[memberId] = [payment, ...existing];
    return HttpResponse.json({ success: true, message: 'Payment recorded', data: payment });
  }),

  http.post(managerMockApiUrl(ManagerMembersUrlConfig.BACKEND_API.DIET_ASSIGN(':id')), async () => HttpResponse.json({ success: true, message: 'Diet plan assigned', data: { id: `dp-${managerMembersMockState.dietPlanIdCounter++}` } })),
  http.post(managerMockApiUrl(ManagerMembersUrlConfig.BACKEND_API.WORKOUT_ASSIGN(':id')), async () => HttpResponse.json({ success: true, message: 'Workout assigned', data: { id: `wp-${managerMembersMockState.workoutPlanIdCounter++}` } })),

  http.post(managerMockApiUrl(ManagerMembersUrlConfig.BACKEND_API.BASE), async ({ request }) => {
    const body = await request.json() as Partial<Member>;
    const template = managerMembersMockState.members[0];
    const newMember = { ...template, ...body, id: `mem-${managerMembersMockState.memberIdCounter++}` } as Member;
    managerMembersMockState.members = [newMember, ...managerMembersMockState.members];
    return HttpResponse.json({ success: true, message: 'Created', data: newMember });
  }),

  http.patch(managerMockApiUrl(ManagerMembersUrlConfig.BACKEND_API.GET_ONE(':id')), async ({ request, params }) => {
    const body = await request.json() as Partial<Member>;
    const idx = managerMembersMockState.members.findIndex((member) => member.id === params.id);
    if (idx === -1) return HttpResponse.json({ success: false, message: 'Not found', data: null }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    const current = managerMembersMockState.members[idx];
    managerMembersMockState.members[idx] = { ...current, ...body } as Member;
    return HttpResponse.json({ success: true, message: 'Updated', data: managerMembersMockState.members[idx] });
  }),

  http.delete(managerMockApiUrl(ManagerMembersUrlConfig.BACKEND_API.GET_ONE(':id')), ({ params }) => {
    managerMembersMockState.members = managerMembersMockState.members.filter((member) => member.id !== params.id);
    return HttpResponse.json({ success: true, message: 'Removed', data: { id: params.id } });
  }),

  http.post(managerMockApiUrl(ManagerMembersUrlConfig.BACKEND_API.RENEW(':id')), async ({ request, params }) => {
    const body = await request.json() as Record<string, unknown>;
    const memberIndex = managerMembersMockState.members.findIndex((member) => member.id === params.id);
    if (memberIndex === -1) return HttpResponse.json({ success: false, message: 'Member not found', data: null }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    const current = managerMembersMockState.members[memberIndex];
    if (!current) return HttpResponse.json({ success: false, message: 'Member not found', data: null }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    const renewed = { ...current, expiryDate: String(body.newExpiryDate || current.expiryDate), planId: String(body.planId || current.planId), pendingAmount: 0 } as Member;
    managerMembersMockState.members[memberIndex] = renewed;
    return HttpResponse.json({ success: true, message: 'Renewed', data: renewed });
  }),
];
