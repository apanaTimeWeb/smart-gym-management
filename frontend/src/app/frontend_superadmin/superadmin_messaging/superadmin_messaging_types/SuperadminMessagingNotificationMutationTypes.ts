import type { ApiResponse } from '@/lib/api';
import type { SuperadminNotification } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_types/SuperadminMessagingTypes';

export type NotificationsQueryData = ApiResponse<SuperadminNotification[]>;
