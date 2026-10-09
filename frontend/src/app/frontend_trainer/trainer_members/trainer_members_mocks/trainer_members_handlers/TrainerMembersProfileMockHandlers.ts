import { env } from '@/config/env';

import { delay, http, HttpResponse } from 'msw';

import { TRAINER_MEMBERS_HTTP_STATUS_CODES } from '@/app/frontend_trainer/trainer_members/trainer_members_constants/TrainerMembersHttpStatusCodes';

import { TrainerMembersMemberSchema } from '@/app/frontend_trainer/trainer_members/trainer_members_schemas/TrainerMembersDomainSchemas';

import { TRAINER_MEMBERS_URLS } from '@/app/frontend_trainer/trainer_members/trainer_members_url_config';

import { getTrainerMembersMockMembers, replaceTrainerMembersMockMembers } from '@/app/frontend_trainer/trainer_members/trainer_members_mocks/trainer_members_handlers/TrainerMembersMockState';

const BASE = env.NEXT_PUBLIC_API_URL;
const MOCK_DELAY_MS = 500;
const MOCK_SHORT_DELAY_MS = 200;

export const TrainerMembersProfileMockHandlers = [
  http.post(`${BASE}${TRAINER_MEMBERS_URLS.API.NOTES(':id')}`, async ({ params, request }) => {
    await delay(MOCK_SHORT_DELAY_MS);
    const members = getTrainerMembersMockMembers();
    const memberIndex = members.findIndex((member) => member.id === params.id);
    if (memberIndex === -1) return HttpResponse.json({ success: false, message: 'TrainerMembersMember not found.' }, { status: TRAINER_MEMBERS_HTTP_STATUS_CODES.NOT_FOUND });
    const body = await request.json() as { text?: unknown };
    if (typeof body.text !== 'string' || body.text.trim().length === 0) {
      return HttpResponse.json({ success: false, message: 'Note is required.' }, { status: TRAINER_MEMBERS_HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY });
    }
    const note = { id: Date.now(), text: body.text.trim(), date: new Date().toISOString() };
    const member = members[memberIndex]!;
    const nextMembers = [...members];
    nextMembers[memberIndex] = { ...member, trainerNotes: [...(member.trainerNotes ?? []), note] };
    replaceTrainerMembersMockMembers(nextMembers);
    return HttpResponse.json({ success: true, message: 'Note saved.', data: nextMembers[memberIndex] });
  }),

  http.get(`${BASE}${TRAINER_MEMBERS_URLS.API.GET_ONE(':id')}`, async ({ params }) => {
    await delay(MOCK_DELAY_MS);
    const member = getTrainerMembersMockMembers().find((candidate) => candidate.id === params.id);
    if (!member) return HttpResponse.json({ success: false, message: 'TrainerMembersMember not found' }, { status: TRAINER_MEMBERS_HTTP_STATUS_CODES.NOT_FOUND });
    return HttpResponse.json({ success: true, message: 'TrainerMembersMember fetched successfully', data: member });
  }),

  http.patch(`${BASE}${TRAINER_MEMBERS_URLS.API.GET_ONE(':id')}`, async ({ params, request }) => {
    await delay(MOCK_DELAY_MS);
    const parsedBody = TrainerMembersMemberSchema.partial().safeParse(await request.json());
    if (!parsedBody.success) return HttpResponse.json({ success: false, message: 'Invalid member payload.', data: null });
    const body = parsedBody.data;
    const members = getTrainerMembersMockMembers();
    const index = members.findIndex((member) => member.id === params.id);
    if (index === -1) return HttpResponse.json({ success: false, message: 'TrainerMembersMember not found' }, { status: TRAINER_MEMBERS_HTTP_STATUS_CODES.NOT_FOUND });
    const existingMember = members[index]!;
    const nextMember = {
      ...existingMember,
      ...body,
      ...(body.assessment ? { assessment: { ...(existingMember.assessment || {}), ...body.assessment } } : {}),
    } as typeof existingMember;
    const nextMembers = [...members];
    nextMembers[index] = nextMember;
    replaceTrainerMembersMockMembers(nextMembers);
    return HttpResponse.json({ success: true, message: 'TrainerMembersMember updated successfully', data: nextMember });
  }),
];
