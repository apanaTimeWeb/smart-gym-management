// RESPONSIBILITY: Owns Shift form values and defaults.
import type { z } from 'zod';
import { managerScheduleShiftFormSchema } from '@/app/manager/schedule/schedule_schemas/ManagerScheduleShiftFormSchema';
export type ShiftFormValues = z.infer<typeof managerScheduleShiftFormSchema>;
export const EMPTY_SHIFT_FORM: ShiftFormValues = { trainerId: '', day: 'Monday', startTime: '06:00', endTime: '12:00', status: 'Active', notes: '' };
