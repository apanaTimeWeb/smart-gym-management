// RESPONSIBILITY: Owns the Manager dashboard command/write HTTP boundary; contains no business logic or direct ORM access.
// FLOW: HTTP request -> DTO/query validation -> feature use-case service -> repository/domain -> canonical response.
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '@/core/auth/core-roles.decorator';
import { CoreRole } from '@/core/auth/core-role.constants';
import { DashboardQueryDto } from '@/modules/manager/dashboard/dtos/dashboard-query.dto';
import { DashboardResponse1Dto } from '@/modules/manager/dashboard/dtos/dashboard-response.dto';

@Controller('manager')
@ApiTags('Manager dashboard')
@Roles(CoreRole.MANAGER)
export class DashboardCommandController {
  constructor() {}

}
