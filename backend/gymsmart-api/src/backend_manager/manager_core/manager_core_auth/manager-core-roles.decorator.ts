// RESPONSIBILITY: Owns backend core NestJS metadata/decorator contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { SetMetadata } from '@nestjs/common';

import { ManagerCoreRole } from '@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants';

export const Roles = (...roles: ManagerCoreRole[]) => SetMetadata('core_roles', roles);
