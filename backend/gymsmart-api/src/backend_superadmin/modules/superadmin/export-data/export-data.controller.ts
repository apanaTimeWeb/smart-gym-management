// RESPONSIBILITY: Owns the shared Superadmin export HTTP endpoint consumed by multiple frontend feature slices.
// FLOW: HTTP POST -> DTO validation -> ExportDataService -> durable job -> HTTP 202 + canonical response envelope.
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Res, UseGuards } from '@nestjs/common';
import { createReadStream } from 'node:fs';
import type { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { ExportDataRequestDto } from '@/backend_superadmin/modules/backend_superadmin/export-data/dtos/export-data-request.dto';
import { ExportDataAcceptedResponseDto } from '@/backend_superadmin/modules/backend_superadmin/export-data/responses/export-data-accepted-response.dto';
import { ExportDataStatusResponseDto } from '@/backend_superadmin/modules/backend_superadmin/export-data/responses/export-data-status-response.dto';
import { ExportDataService } from '@/backend_superadmin/modules/backend_superadmin/export-data/services/export-data.service';

@ApiTags('export-data')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class ExportDataController {
  constructor(private readonly service: ExportDataService) {}

  /** Starts an asynchronous export job for the shared Superadmin export flow. */
  // SLA: STANDARD
  // SLA: HEAVY
  @Post('api/superadmin/export-data')
  @RequireIdempotencyKey()
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Start asynchronous Superadmin export' })
  @ApiResponse({ status: HttpStatus.ACCEPTED, type: ExportDataAcceptedResponseDto })
  async start(@Body() body: ExportDataRequestDto): Promise<ExportDataAcceptedResponseDto> { return this.service.startExport(body); }

  /** Returns the durable state of one export request. */
  // SLA: FAST
  @Get('api/superadmin/export-data/:jobId')
  @ApiOperation({ summary: 'Get Superadmin export job status' })
  @ApiResponse({ status: HttpStatus.OK, type: ExportDataStatusResponseDto })
  async status(@Param('jobId') jobId: string): Promise<ExportDataStatusResponseDto> { return this.service.getExportStatus(jobId); }

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