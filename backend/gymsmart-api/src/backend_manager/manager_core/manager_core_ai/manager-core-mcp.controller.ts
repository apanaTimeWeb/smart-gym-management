// RESPONSIBILITY: Publishes a typed, read-only MCP discovery manifest for the Manager REST surface.
// FLOW: AI client -> discovery route -> declared capabilities -> canonical API endpoints.
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ManagerCorePublicDecorator } from '@/backend_manager/manager_core/manager_core_auth/manager-core-public.decorator';

@ApiTags('AI / MCP')
@Controller('mcp')
export class ManagerCoreMcpController {
  /** @description Returns the stable Manager capability namespace that an MCP bridge can introspect without executing business mutations. @returns Typed capability manifest. */
  // SLA: FAST
  @Get('manager')
  @ManagerCorePublicDecorator()
  @ApiOperation({ summary: 'Manager MCP capability manifest' })
  @ApiResponse({ status: 200 })
  manifest(): { name: string; version: string; readOnly: boolean; endpoints: string[] } {
    return { name: 'manager-backend', version: 'v1', readOnly: true, endpoints: ['/api/v1/manager/dashboard/kpis', '/api/v1/manager/dashboard/charts', '/api/v1/manager/members', '/api/v1/manager/finance/summary'] };
  }
}
