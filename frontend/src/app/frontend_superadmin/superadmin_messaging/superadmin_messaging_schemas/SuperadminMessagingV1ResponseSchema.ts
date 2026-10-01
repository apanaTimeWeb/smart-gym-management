import { SuperadminLayoutApiResponseSchema } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_schemas/SuperadminLayoutApiResponseSchema';
import { SuperadminMessagingV1DataSchema } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_schemas/SuperadminMessagingV1Schema';

export const SuperadminMessagingV1ResponseSchema = SuperadminLayoutApiResponseSchema(SuperadminMessagingV1DataSchema);
