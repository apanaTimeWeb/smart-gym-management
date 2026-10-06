import type { SuperadminNotification } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_types/SuperadminMessagingTypes';
import type { ApiResponse } from '@/lib/api';



export type NotificationsQueryData = ApiResponse<SuperadminNotification[]>;
