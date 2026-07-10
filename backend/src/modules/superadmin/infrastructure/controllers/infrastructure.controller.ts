import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseGuards } from '@nestjs/common';
import { InfrastructureService } from '../services/infrastructure.service';
import { CreateInfrastructureDto } from '../dto/create-infrastructure.dto';
import { UpdateInfrastructureDto } from '../dto/update-infrastructure.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@ApiTags('Superadmin: Infrastructure')
@Controller('infrastructure')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class InfrastructureController {
  constructor(private readonly infrastructureService: InfrastructureService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Infrastructure' })
  @ApiResponse({ status: HttpStatus.CREATED })
  create(@Body() createDto: CreateInfrastructureDto) {
    return this.infrastructureService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Infrastructure' })
  @ApiResponse({ status: HttpStatus.OK })
  findAll() {
    return this.infrastructureService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific Infrastructure' })
  @ApiResponse({ status: HttpStatus.OK })
  findOne(@Param('id') id: string) {
    return this.infrastructureService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific Infrastructure' })
  @ApiResponse({ status: HttpStatus.OK })
  update(@Param('id') id: string, @Body() updateDto: UpdateInfrastructureDto) {
    return this.infrastructureService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific Infrastructure' })
  @ApiResponse({ status: HttpStatus.OK })
  remove(@Param('id') id: string) {
    return this.infrastructureService.remove(id);
  }
}
