import { SuperadminSystemOpsBackupsScheduleSchema, SuperadminBackupsScheduleInputSchema } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_schemas/SuperadminSystemOpsBackupsScheduleSchema';

import type { infer as ZodInfer } from 'zod';


export type SuperadminBackupsSchedule = ZodInfer<typeof SuperadminSystemOpsBackupsScheduleSchema>;
export type SuperadminBackupsScheduleInput = ZodInfer<typeof SuperadminBackupsScheduleInputSchema>;
