import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseGuards } from '@nestjs/common';
import { SystemService } from '../services/system.service';
import { CreateSystemDto } from '../dto/create-system.dto';
import { UpdateSystemDto } from '../dto/update-system.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@ApiTags('Superadmin: System')
@Controller('system')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new System' })
  @ApiResponse({ status: HttpStatus.CREATED })
  create(@Body() createDto: CreateSystemDto) {
    return this.systemService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all System' })
  @ApiResponse({ status: HttpStatus.OK })
  findAll() {
    return this.systemService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific System' })
  @ApiResponse({ status: HttpStatus.OK })
  findOne(@Param('id') id: string) {
    return this.systemService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific System' })
  @ApiResponse({ status: HttpStatus.OK })
  update(@Param('id') id: string, @Body() updateDto: UpdateSystemDto) {
    return this.systemService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific System' })
  @ApiResponse({ status: HttpStatus.OK })
  remove(@Param('id') id: string) {
    return this.systemService.remove(id);
  }
}
