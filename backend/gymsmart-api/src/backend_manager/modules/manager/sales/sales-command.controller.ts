// RESPONSIBILITY: Owns the Manager sales command/write HTTP boundary; contains no business logic or direct ORM access.
// FLOW: HTTP request -> DTO/query validation -> feature use-case service -> repository/domain -> canonical response.
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '@/core/auth/core-roles.decorator';
import { CoreRole } from '@/core/auth/core-role.constants';
import { SalesQueryDto } from '@/modules/manager/sales/dtos/sales-query.dto';
import { SalesResponse1Dto } from '@/modules/manager/sales/dtos/sales-response.dto';

@Controller('manager')
@ApiTags('Manager sales')
@Roles(CoreRole.MANAGER)
export class SalesCommandController {
  constructor() {}

}
