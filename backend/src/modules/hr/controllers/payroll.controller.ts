import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
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
import { PayrollService } from '@/modules/hr/services/payroll.service';
import { CreatePayrollDto } from '@/modules/hr/dto/create-payroll.dto';
import { FindPayrollDto } from '@/modules/hr/dto/find-payroll.dto';
import { UpdatePayrollStatusDto } from '@/modules/hr/dto/update-payroll-status.dto';

@ApiTags('HR - Payroll')
@Controller('hr/payrolls')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class PayrollController {
  constructor(private readonly payrollService: PayrollService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new payroll record' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Payroll record created successfully',
  })
  create(@Body() dto: CreatePayrollDto) {
    return this.payrollService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Find all payroll records with optional pagination',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Payroll records fetched successfully',
  })
  findAll(@Query() query: FindPayrollDto) {
    return this.payrollService.findAll(query);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update payroll status by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Payroll status updated successfully',
  })
  updateStatus(@Param('id') id: string, @Body() dto: UpdatePayrollStatusDto) {
    return this.payrollService.updateStatus(id, dto.status);
  }
}
