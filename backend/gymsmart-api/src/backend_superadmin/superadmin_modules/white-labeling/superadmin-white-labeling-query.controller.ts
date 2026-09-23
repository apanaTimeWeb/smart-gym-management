// RESPONSIBILITY: Owns HTTP transport for the white-labeling-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminWhiteLabelingQueryDto } from '@/backend_superadmin/superadmin_modules/white-labeling/dtos/superadmin-white-labeling-query.dto';
import { SuperadminWhiteLabelingListService } from '@/backend_superadmin/superadmin_modules/white-labeling/services/superadmin-white-labeling-list.service';
import { SuperadminWhiteLabelingFindService } from '@/backend_superadmin/superadmin_modules/white-labeling/services/superadmin-white-labeling-find.service';

@ApiTags('white-labeling')
@Controller('/superadmin/white-labeling')
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminWhiteLabelingQueryController {
  constructor(private readonly listService: SuperadminWhiteLabelingListService, private readonly findService: SuperadminWhiteLabelingFindService) {}
  /** Returns a paginated white-labeling list. */
  // SLA: FAST
  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async findAll(@Query() query: SuperadminWhiteLabelingQueryDto): Promise<unknown> { return await this.listService.findWhiteLabelingPage(query); }
  /** Returns one white-labeling record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async findOne(@Param('id') id: string): Promise<unknown> { return await this.findService.findWhiteLabelingById(id); }
}