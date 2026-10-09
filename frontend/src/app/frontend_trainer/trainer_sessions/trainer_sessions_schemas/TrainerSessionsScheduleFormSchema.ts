// RESPONSIBILITY: Owns Trainer Sessions schedule form validation contract.
import { z } from 'zod';

import { TRAINER_SESSIONS_SESSION_TYPE, TRAINER_SESSIONS_SESSION_TYPES } from '@/app/frontend_trainer/trainer_sessions/trainer_sessions_constants/TrainerSessionsConstants';




export const TrainerSessionsScheduleFormSchema = z.object({
  type: z.enum(TRAINER_SESSIONS_SESSION_TYPES),
  memberId: z.string().optional().or(z.literal('')),
  date: z.string().min(1, 'TEXT_DATE_REQUIRED'),
  time: z.string().min(1, 'TEXT_TIME_REQUIRED'),
  duration: z.string().min(1, 'TEXT_DURATION_REQUIRED'),
}).refine(
  (data) => data.type === TRAINER_SESSIONS_SESSION_TYPE.GROUP || (data.type === TRAINER_SESSIONS_SESSION_TYPE.PT && data.memberId && data.memberId.length > 0),
  { message: 'TEXT_MEMBER_REQUIRED_PT', path: ['memberId'] },
);
