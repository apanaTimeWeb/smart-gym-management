import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseGuards } from '@nestjs/common';
import { DashboardService } from '../services/dashboard.service';
import { CreateDashboardDto } from '../dto/create-dashboard.dto';
import { UpdateDashboardDto } from '../dto/update-dashboard.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@ApiTags('Superadmin: Dashboard')
@Controller('dashboard')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Dashboard' })
  @ApiResponse({ status: HttpStatus.CREATED })
  create(@Body() createDto: CreateDashboardDto) {
    return this.dashboardService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Dashboard' })
  @ApiResponse({ status: HttpStatus.OK })
  findAll() {
    return this.dashboardService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific Dashboard' })
  @ApiResponse({ status: HttpStatus.OK })
  findOne(@Param('id') id: string) {
    return this.dashboardService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific Dashboard' })
  @ApiResponse({ status: HttpStatus.OK })
  update(@Param('id') id: string, @Body() updateDto: UpdateDashboardDto) {
    return this.dashboardService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific Dashboard' })
  @ApiResponse({ status: HttpStatus.OK })
  remove(@Param('id') id: string) {
    return this.dashboardService.remove(id);
  }
}
