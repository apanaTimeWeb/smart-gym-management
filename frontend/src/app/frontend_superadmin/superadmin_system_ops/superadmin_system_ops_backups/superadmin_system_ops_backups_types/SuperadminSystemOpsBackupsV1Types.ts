import { SuperadminSystemOpsBackupsV1ResponseSchema } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_schemas/SuperadminSystemOpsBackupsV1ResponseSchema';
import { SuperadminBackupsV1DataSchema } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_schemas/SuperadminSystemOpsBackupsV1Schema';

import type { infer as ZodInfer } from 'zod';


// RESPONSIBILITY: Defines the runtime-validated data contract for Backup Safety & Restore Readiness.

export type SuperadminBackupsV1Data = ZodInfer<typeof SuperadminBackupsV1DataSchema>;
export type SuperadminBackupsV1Response = ZodInfer<typeof SuperadminSystemOpsBackupsV1ResponseSchema>;
export interface SuperadminBackupsV1SectionProps {
    data: SuperadminBackupsV1Data;
}
