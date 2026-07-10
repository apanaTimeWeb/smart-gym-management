import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { StaffService } from '@/modules/erp/hr/services/staff.service';
import { CreateStaffDto } from '@/modules/erp/hr/dto/create-staff.dto';
import { UpdateStaffDto } from '@/modules/erp/hr/dto/update-staff.dto';
import { FindStaffDto } from '@/modules/erp/hr/dto/find-staff.dto';

@ApiTags('HR - Staff')
@Controller('hr/staff')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new staff member' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Staff member created successfully',
  })
  create(@Body() dto: CreateStaffDto) {
    return this.staffService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all staff with optional pagination' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Staff members fetched successfully',
  })
  findAll(@Query() query: FindStaffDto) {
    return this.staffService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a staff member by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Staff member fetched successfully',
  })
  findOne(@Param('id') id: string) {
    return this.staffService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a staff member by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Staff member updated successfully',
  })
  update(@Param('id') id: string, @Body() dto: UpdateStaffDto) {
    return this.staffService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deactivate a staff member by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Staff member deactivated successfully',
  })
  remove(@Param('id') id: string) {
    return this.staffService.remove(id);
  }
}
