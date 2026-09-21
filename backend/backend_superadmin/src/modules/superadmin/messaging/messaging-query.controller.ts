// RESPONSIBILITY: Owns GET endpoints for the messaging feature and contains no mutation logic.
// FLOW: HTTP GET -> DTO validation -> query service -> repository -> canonical response interceptor.
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { MessagingQueryDto } from '@/modules/superadmin/messaging/dtos/messaging-query.dto';
import { MessagingListService } from '@/modules/superadmin/messaging/services/messaging-list.service';
import { MessagingFindService } from '@/modules/superadmin/messaging/services/messaging-find.service';
import { MessagingResponseDto } from '@/modules/superadmin/messaging/responses/messaging-response.dto';
import { ApiResponse } from '@nestjs/swagger';

@ApiTags('messaging')
@Controller('/superadmin/messaging')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class MessagingQueryController {
  constructor(private readonly listService: MessagingListService, private readonly findService: MessagingFindService) {}
  /** Returns a paginated messaging list. */
  // SLA: STANDARD
  @Get()
  async findAll(@Query() query: MessagingQueryDto): Promise<{ data: MessagingResponseDto[]; meta: any }> { return (await this.listService.findMessagingPage(query)) as any; }
  /** Returns one messaging record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ type: MessagingResponseDto })
  async findOne(@Param('id') id: string): Promise<MessagingResponseDto> { return (await this.findService.findMessagingById(id)) as unknown as MessagingResponseDto; }
}
