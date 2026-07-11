import { CreateFeatureFlagDto } from '../dto/create-feature-flag.dto';
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { NotesFeaturesService } from '../services/notes-features.service';

@ApiTags('Features')
@Controller('features/notes')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class NotesFeaturesController {
  constructor(private readonly service: NotesFeaturesService) {}
  @Post()
  async execute(@Body() dto: CreateFeatureFlagDto) { return this.service.execute(dto); }
}
