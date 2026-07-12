import { Controller, Post, Param, Body, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { CreateSystemService } from '../services/create-system.service';
import { CreateReleaseNoteDto } from '../dto/create-system.dto';

@ApiTags('System')
@Controller('system')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class CreateSystemController {
  constructor(private readonly service: CreateSystemService) {}
  
  @Post()
  @ApiOperation({ summary: 'Create ReleaseNote' })
  @ApiResponse({ status: HttpStatus.OK })
  async execute(@Body() dto: CreateReleaseNoteDto) {
    return this.service.execute(dto);
  }
}
