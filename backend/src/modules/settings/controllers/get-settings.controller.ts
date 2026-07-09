import { Controller, Get, UseGuards, HttpStatus } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { GetSettingsService } from '../services/get-settings.service';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@ApiTags('Settings')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('settings')
export class GetSettingsController {
  constructor(private readonly getSettingsService: GetSettingsService) {}

  @Get()
  @ApiOperation({ summary: 'Get global gym settings' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return settings' })
  execute() {
    return this.getSettingsService.execute();
  }
}
