import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseGuards } from '@nestjs/common';
import { GymsService } from '../services/gyms.service';
import { CreateGymDto } from '../dto/create-gyms.dto';
import { UpdateGymDto } from '../dto/update-gyms.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@ApiTags('Superadmin: Gyms')
@Controller('gyms')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class GymsController {
  constructor(private readonly gymsService: GymsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Gym' })
  @ApiResponse({ status: HttpStatus.CREATED })
  create(@Body() createDto: CreateGymDto) {
    return this.gymsService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Gyms' })
  @ApiResponse({ status: HttpStatus.OK })
  findAll() {
    return this.gymsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific Gym' })
  @ApiResponse({ status: HttpStatus.OK })
  findOne(@Param('id') id: string) {
    return this.gymsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific Gym' })
  @ApiResponse({ status: HttpStatus.OK })
  update(@Param('id') id: string, @Body() updateDto: UpdateGymDto) {
    return this.gymsService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific Gym' })
  @ApiResponse({ status: HttpStatus.OK })
  remove(@Param('id') id: string) {
    return this.gymsService.remove(id);
  }
}
