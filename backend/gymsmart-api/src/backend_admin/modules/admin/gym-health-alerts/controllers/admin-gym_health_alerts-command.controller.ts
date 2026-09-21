// RESPONSIBILITY: Exposes mutation endpoints for Admin gym-health-alerts; contains HTTP concerns only.
// FLOW: HTTP mutation -> AdminGymHealthAlertsCommandController -> AdminGymHealthAlertsCommandService.

import { Body, Controller, Headers, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/backend_admin/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/backend_admin/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/backend_admin/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/backend_admin/core/tenant/core-tenant.constants';
import { CoreIdempotencyService } from '@/backend_admin/core/idempotency/core-idempotency.service';
import { AdminGymHealthAlertsCommandService } from '@/backend_admin/modules/admin/gym-health-alerts/services/admin-gym_health_alerts-command.service';
import { AdminGymHealthAlertsIdDto } from '@/backend_admin/modules/admin/gym-health-alerts/dtos/admin-gym_health_alerts-id.dto';
import { AdminGymHealthAlertsMutationDto } from '@/backend_admin/modules/admin/gym-health-alerts/dtos/admin-gym_health_alerts-mutation.dto';

@ApiTags('Admin / gym-health-alerts')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
@Controller('admin/gym-health-alerts')
export class AdminGymHealthAlertsCommandController {
  constructor(private readonly service: AdminGymHealthAlertsCommandService, private readonly idempotency: CoreIdempotencyService) {}

  // SLA: STANDARD
  @Post('resolveAlert')
  @ApiOperation({ summary: 'Execute resolveAlert' })
  @ApiResponse({ status: HttpStatus.OK })
  async resolveAlertById(@Body() dto: AdminGymHealthAlertsIdDto, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<void> {
    return this.idempotency.executeOnce(idempotencyKey, async () => this.service.resolveAlertById(dto.id));
  }

  // SLA: STANDARD
  @Post('dismissAlert')
  @ApiOperation({ summary: 'Execute dismissAlert' })
  @ApiResponse({ status: HttpStatus.OK })
  async dismissAlertById(@Body() dto: AdminGymHealthAlertsIdDto, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<void> {
    return this.idempotency.executeOnce(idempotencyKey, async () => this.service.dismissAlertById(dto.id));
  }

}
