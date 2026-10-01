import { SuperadminMessagingComposeSchema } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_schemas/SuperadminMessagingComposeSchema';

export type SuperadminMessagingComposeValues = import('zod').infer<typeof SuperadminMessagingComposeSchema>;
