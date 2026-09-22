// RESPONSIBILITY: ORM-free domain contract for Manager notifications.
// FLOW: TypeORM entity -> NotificationsMapper -> NotificationsDomainData -> use case/controller.
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
export interface NotificationsDomainData { id: string; payload: CoreJsonObject; }
