// RESPONSIBILITY: Liveness, readiness and protected deep-health endpoints for deployment probes.
// FLOW: Health HTTP request -> health probe -> infrastructure check -> response.
import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CorePublicDecorator } from '@/core/auth/core-public.decorator';
import { CoreRedisService } from '@/core/database/core-redis.service';

@ApiTags('Health')
@Controller('health')
export class CoreHealthController {
  constructor(private readonly redis:CoreRedisService) {}
  /** @description Returns liveness. @returns Liveness payload. */
  @Get('live') @CorePublicDecorator() @ApiOperation({summary:'Liveness probe'}) @ApiResponse({status:HttpStatus.OK}) live():{status:'ok'}{return {status:'ok'};}
  /** @description Returns readiness including Redis. @returns Readiness payload. */
  @Get('ready') @CorePublicDecorator() @ApiOperation({summary:'Readiness probe'}) @ApiResponse({status:HttpStatus.OK}) async ready():Promise<{status:'ok'|'degraded';redis:boolean}>{const redis=await this.redis.isReady();return {status:redis?'ok':'degraded',redis};}
  /** @description Returns protected deep dependency checks. @returns Deep health payload. */
  @Get('deep') @ApiOperation({summary:'Deep health probe'}) @ApiResponse({status:HttpStatus.OK}) async deep():Promise<{status:'ok'|'degraded';redis:boolean}>{const redis=await this.redis.isReady();return {status:redis?'ok':'degraded',redis};}
}
