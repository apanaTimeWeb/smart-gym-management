import { SuperadminMessagingV1ResponseSchema } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_schemas/SuperadminMessagingV1ResponseSchema';
import { SuperadminMessagingV1DataSchema } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_schemas/SuperadminMessagingV1Schema';

import type { infer as ZodInfer } from 'zod';


// RESPONSIBILITY: Defines the runtime-validated data contract for Message Templates & Campaign Results.

export type SuperadminMessagingV1Data = ZodInfer<typeof SuperadminMessagingV1DataSchema>;
export type SuperadminMessagingV1Response = ZodInfer<typeof SuperadminMessagingV1ResponseSchema>;
export interface SuperadminMessagingV1SectionProps {
    data: SuperadminMessagingV1Data;
}
