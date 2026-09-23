// RESPONSIBILITY: Owns backend core NestJS metadata/decorator contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { SetMetadata } from '@nestjs/common';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';

export const Roles = (...roles: CoreRole[]) => SetMetadata('core_roles', roles);
