// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';

@Controller('manager')
@ApiTags('Manager dashboard')
@Roles(CoreRole.MANAGER)
export class DashboardCommandController {
  constructor() {}

}
