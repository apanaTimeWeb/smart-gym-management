// RESPONSIBILITY: Owns the shared Superadmin export HTTP endpoint consumed by multiple frontend feature slices.
// FLOW: HTTP POST -> DTO validation -> SuperadminExportDataService -> durable job -> HTTP 202 + canonical response envelope.
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Res, UseGuards } from '@nestjs/common';
import { createReadStream } from 'node:fs';
import type { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-idempotency.decorator';
import { SuperadminExportDataRequestDto } from '@/backend_superadmin/superadmin_modules/export-data/dtos/superadmin-export-data-request.dto';
import { SuperadminExportDataAcceptedResponseDto } from '@/backend_superadmin/superadmin_modules/export-data/responses/superadmin-export-data-accepted-response.dto';
import { SuperadminExportDataStatusResponseDto } from '@/backend_superadmin/superadmin_modules/export-data/responses/superadmin-export-data-status-response.dto';
import { SuperadminExportDataService } from '@/backend_superadmin/superadmin_modules/export-data/services/superadmin-export-data.service';

@ApiTags('export-data')
@Controller()
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminExportDataController {
  constructor(private readonly service: SuperadminExportDataService) {}

  /** Starts an asynchronous export job for the shared Superadmin export flow. */
  // SLA: STANDARD
  // SLA: HEAVY
  @Post('api/superadmin/export-data')
  @RequireIdempotencyKey()
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Start asynchronous Superadmin export' })
  @ApiResponse({ status: HttpStatus.ACCEPTED, type: SuperadminExportDataAcceptedResponseDto })
  async start(@Body() body: SuperadminExportDataRequestDto): Promise<SuperadminExportDataAcceptedResponseDto> { return this.service.startExport(body); }

  /** Returns the durable state of one export request. */
  // SLA: FAST
  @Get('api/superadmin/export-data/:jobId')
  @ApiOperation({ summary: 'Get Superadmin export job status' })
  @ApiResponse({ status: HttpStatus.OK, type: SuperadminExportDataStatusResponseDto })
  async status(@Param('jobId') jobId: string): Promise<SuperadminExportDataStatusResponseDto> { return this.service.getExportStatus(jobId); }

  /** Streams an unexpired export artifact only after token validation. */
  // SLA: FAST
  @Get('api/superadmin/export-data/download/:jobId/:token')
  @ApiOperation({ summary: 'Download completed Superadmin export' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Protected ZIP download.' })
  async download(@Param('jobId') jobId: string, @Param('token') token: string, @Res() response: Response): Promise<void> {
    const artifact = await this.service.getDownloadPath(jobId, token);
    response.status(HttpStatus.OK).type(artifact.contentType).setHeader('Content-Disposition', `attachment; filename=superadmin-export-${jobId}.zip`);
    await new Promise<void>((resolve, reject) => { const stream = createReadStream(artifact.path); stream.on('error', reject); stream.on('end', resolve); stream.pipe(response); });
  }
}