// RESPONSIBILITY: Exposes compact AI/RAG projections without changing normal Manager REST response contracts.
// FLOW: Authenticated Manager context -> compact projection request -> token-optimized text response.
import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ManagerCoreRole } from '@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants';
import { Roles } from '@/backend_manager/manager_core/manager_core_auth/manager-core-roles.decorator';

@ApiTags('AI / RAG')
@Controller('_rag/manager')
@Roles(ManagerCoreRole.MANAGER)
export class ManagerCoreRagController {
  /** @description Returns a compact, stable text projection for approved Manager AI queries. @param query - Requested projection name. @returns Token-optimized textual representation. */
  // SLA: FAST
  @Get()
  @ApiOperation({ summary: 'Token-optimized Manager RAG projection' })
  @ApiQuery({ name: 'projection', required: true, enum: ['dashboard', 'members', 'finance'] })
  @ApiResponse({ status: 200, schema: { type: 'string' } })
  project(@Query('projection') projection: 'dashboard' | 'members' | 'finance'): string {
    return `Manager projection: ${projection}. Use the canonical REST endpoint for the full typed payload.`;
  }
}
