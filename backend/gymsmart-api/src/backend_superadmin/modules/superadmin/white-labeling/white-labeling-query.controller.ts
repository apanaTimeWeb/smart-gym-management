// RESPONSIBILITY: Owns GET endpoints for the white-labeling feature and contains no mutation logic.
// FLOW: HTTP GET -> DTO validation -> query service -> repository -> canonical response interceptor.
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { WhiteLabelingQueryDto } from '@/backend_superadmin/modules/superadmin/white-labeling/dtos/white-labeling-query.dto';
import { WhiteLabelingListService } from '@/backend_superadmin/modules/superadmin/white-labeling/services/white-labeling-list.service';
import { WhiteLabelingFindService } from '@/backend_superadmin/modules/superadmin/white-labeling/services/white-labeling-find.service';

@ApiTags('white-labeling')
@Controller('/superadmin/white-labeling')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class WhiteLabelingQueryController {
  constructor(private readonly listService: WhiteLabelingListService, private readonly findService: WhiteLabelingFindService) {}
  /** Returns a paginated white-labeling list. */
  // SLA: STANDARD
  @Get()
  async findAll(@Query() query: WhiteLabelingQueryDto): Promise<unknown> { return await this.listService.findWhiteLabelingPage(query); }
  /** Returns one white-labeling record. */
  // SLA: FAST
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<unknown> { return await this.findService.findWhiteLabelingById(id); }
}
