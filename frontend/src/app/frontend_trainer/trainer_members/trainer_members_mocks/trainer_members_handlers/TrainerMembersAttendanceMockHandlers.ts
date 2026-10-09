import { env } from '@/config/env';

import { delay, http, HttpResponse } from 'msw';

import { TRAINER_MEMBERS_PROFILE_ATTENDANCE_STATUS } from '@/app/frontend_trainer/trainer_members/trainer_members_constants/TrainerMembersConstants';

import { TRAINER_MEMBERS_URLS } from '@/app/frontend_trainer/trainer_members/trainer_members_url_config';

const BASE = env.NEXT_PUBLIC_API_URL;
const MOCK_FAST_DELAY_MS = 300;

export const TrainerMembersAttendanceMockHandlers = [
  http.get(`${BASE}${TRAINER_MEMBERS_URLS.API.ATTENDANCE(':id')}`, async ({ params }) => {
    await delay(MOCK_FAST_DELAY_MS);
    const memberId = String(params.id ?? '');
    const memberSeed = Array.from(memberId).reduce((total, character) => total + character.charCodeAt(0), 0);
    const now = new Date();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const mockData = Array.from({ length: daysInMonth }, (_, index) => {
      const day = index + 1;
      const shiftedDay = day + memberSeed;
      const status = shiftedDay % 11 === 0
        ? TRAINER_MEMBERS_PROFILE_ATTENDANCE_STATUS.ABSENT
        : shiftedDay % 7 === 0
          ? TRAINER_MEMBERS_PROFILE_ATTENDANCE_STATUS.LEAVE
          : TRAINER_MEMBERS_PROFILE_ATTENDANCE_STATUS.PRESENT;
      return { day, status, memberId };
    });

    return HttpResponse.json({ success: true, message: 'Attendance fetched', data: mockData });
  }),
];
