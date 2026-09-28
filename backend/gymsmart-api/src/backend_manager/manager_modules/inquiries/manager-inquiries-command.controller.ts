// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Body, Controller, Delete, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ManagerCoreAuthorizeResourceParam } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-authorize-resource.decorator';

import { ManagerCoreRole } from '@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants';
import { Roles } from '@/backend_manager/manager_core/manager_core_auth/manager-core-roles.decorator';
import { RequireIdempotencyKey } from '@/backend_manager/manager_core/manager_core_idempotency/manager-core-require-idempotency-key.decorator';

import { ManagerInquiriesConvertLeadRequestDto } from '@/backend_manager/manager_modules/inquiries/inquiries_dtos/manager-inquiries-convert-lead.request.dto';
import { ManagerInquiriesConvertLeadResponseDto } from '@/backend_manager/manager_modules/inquiries/inquiries_responses/manager-inquiries-convert-lead.response.dto';
import { ManagerInquiriesCreateInquiryRequestDto } from '@/backend_manager/manager_modules/inquiries/inquiries_dtos/manager-inquiries-create-inquiry.request.dto';
import { ManagerInquiriesCreateInquiryResponseDto } from '@/backend_manager/manager_modules/inquiries/inquiries_responses/manager-inquiries-create-inquiry.response.dto';
import { ManagerInquiriesDeleteInquiryResponseDto } from '@/backend_manager/manager_modules/inquiries/inquiries_responses/manager-inquiries-delete-inquiry.response.dto';
import { ManagerInquiriesUpdateInquiryRequestDto } from '@/backend_manager/manager_modules/inquiries/inquiries_dtos/manager-inquiries-update-inquiry.request.dto';
import { ManagerInquiriesUpdateInquiryResponseDto } from '@/backend_manager/manager_modules/inquiries/inquiries_responses/manager-inquiries-update-inquiry.response.dto';
import { ManagerInquiriesConvertLeadService } from '@/backend_manager/manager_modules/inquiries/inquiries_services/manager-inquiries-convert-lead.service';
import { ManagerInquiriesCreateInquiryService } from '@/backend_manager/manager_modules/inquiries/inquiries_services/manager-inquiries-create-inquiry.service';
import { ManagerInquiriesDeleteInquiryService } from '@/backend_manager/manager_modules/inquiries/inquiries_services/manager-inquiries-delete-inquiry.service';
import { ManagerInquiriesUpdateInquiryService } from '@/backend_manager/manager_modules/inquiries/inquiries_services/manager-inquiries-update-inquiry.service';

@Controller('manager')
@ApiTags('Manager inquiries')
@Roles(ManagerCoreRole.MANAGER)
export class ManagerInquiriesCommandController {
  constructor(private readonly convertLeadService: ManagerInquiriesConvertLeadService, private readonly createInquiryService: ManagerInquiriesCreateInquiryService, private readonly updateInquiryService: ManagerInquiriesUpdateInquiryService, private readonly deleteInquiryService: ManagerInquiriesDeleteInquiryService) {}

  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post("inquiries")
  @ApiOperation({ summary: 'createInquiry for Manager inquiries' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: ManagerInquiriesCreateInquiryResponseDto })
  createInquiry(@Body() dto: ManagerInquiriesCreateInquiryRequestDto): ReturnType<ManagerInquiriesCreateInquiryService['createInquiry']> { return this.createInquiryService.createInquiry(dto); }


  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post("inquiries/:id/convert")
  @ApiOperation({ summary: 'convertLead for Manager inquiries' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: ManagerInquiriesConvertLeadResponseDto })
  @ManagerCoreAuthorizeResourceParam('id')
  updateLead(@Param('id') id: string, @Body() dto: ManagerInquiriesConvertLeadRequestDto): ReturnType<ManagerInquiriesConvertLeadService['convertLead']> { return this.convertLeadService.convertLead(dto, id); }


  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch("inquiries/:id")
  @ApiOperation({ summary: 'updateInquiry for Manager inquiries' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerInquiriesUpdateInquiryResponseDto })
  @ManagerCoreAuthorizeResourceParam('id')
  updateInquiry(@Param('id') id: string, @Body() dto: ManagerInquiriesUpdateInquiryRequestDto): ReturnType<ManagerInquiriesUpdateInquiryService['updateInquiry']> { return this.updateInquiryService.updateInquiry(dto, id); }


  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete("inquiries/:id")
  @ApiOperation({ summary: 'deleteInquiry for Manager inquiries' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerInquiriesDeleteInquiryResponseDto })
  @ManagerCoreAuthorizeResourceParam('id')
  deleteInquiry(@Param('id') id: string): ReturnType<ManagerInquiriesDeleteInquiryService['deleteInquiry']> {  return this.deleteInquiryService.deleteInquiry(id); }


}

export { ManagerInquiriesCommandController as InquiriesCommandController };
