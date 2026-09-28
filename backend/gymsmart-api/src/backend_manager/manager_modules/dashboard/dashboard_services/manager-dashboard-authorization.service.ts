import { Injectable } from '@nestjs/common';
import type { ManagerCoreResourceAuthorizationPort } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-resource-authorization.types';

@Injectable()
export class ManagerDashboardAuthorizationService implements ManagerCoreResourceAuthorizationPort {
  async assertCanAccess(resourceId: string): Promise<void> {
    // Stub access logic
  }
}
