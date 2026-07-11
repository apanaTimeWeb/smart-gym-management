import { Controller, Patch, Param, Body, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { UpdateAffiliatesService } from '../services/update-affiliates.service';
import { UpdateAffiliateDto } from '../dto/update-affiliates.dto';

@ApiTags('Affiliates')
@Controller('affiliates')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class UpdateAffiliatesController {
  constructor(private readonly service: UpdateAffiliatesService) {}
  
  @Patch(':id')
  @ApiOperation({ summary: 'Update Affiliate' })
  @ApiResponse({ status: HttpStatus.OK })
  async execute(@Param('id') id: string, @Body() dto: UpdateAffiliateDto) {
    return this.service.execute(id, dto);
  }
}
