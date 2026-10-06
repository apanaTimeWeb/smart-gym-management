import { MANAGER_SCHEDULE_STATUS_VALUES } from '@/app/frontend_manager/manager_schedule/manager_schedule_constants/ManagerScheduleConstants';
import type { managerScheduleShiftFormSchema } from '@/app/frontend_manager/manager_schedule/manager_schedule_schemas/ManagerScheduleShiftFormSchema';
import type { z } from 'zod';

export type ShiftFormValues = z.infer<typeof managerScheduleShiftFormSchema>;
/**
 * @description Provides the ManagerScheduleShiftFormTypes implementation for the schedule module.
 * @dependencies @/app/frontend_manager/manager_schedule/manager_schedule_schemas/ManagerScheduleShiftFormSchema
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const EMPTY_SHIFT_FORM: ShiftFormValues = { trainerId: '', day: 'Monday', startTime: '06:00', endTime: '12:00', status: MANAGER_SCHEDULE_STATUS_VALUES.ACTIVE, notes: '' };
