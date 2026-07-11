import { Controller, Patch, Get, Post, Patch, Delete, Param, Body, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { UpdateSystemService } from '../services/update-system.service';
import { UpdateReleaseNoteDto } from '../dto/update-system.dto';

@ApiTags('System')
@Controller('system')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class UpdateSystemController {
  constructor(private readonly service: UpdateSystemService) {}
  
  @Patch(':id')
  @ApiOperation({ summary: 'Update ReleaseNote' })
  @ApiResponse({ status: HttpStatus.OK })
  async execute(@Param('id') id: string, @Body() dto: UpdateReleaseNoteDto) {
    return this.service.execute(id, dto);
  }
}
