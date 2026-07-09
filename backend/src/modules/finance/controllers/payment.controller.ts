import {
  Controller,
  Get,
  Post,
  Body,
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
import { PaymentService } from '@/modules/finance/services/payment.service';
import { CreatePaymentDto } from '@/modules/finance/dto/create-payment.dto';
import { FindPaymentDto } from '@/modules/finance/dto/find-payment.dto';

@ApiTags('Finance - Payments')
@Controller('finance/payments')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new payment' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Payment created successfully',
  })
  createPayment(@Body() dto: CreatePaymentDto) {
    return this.paymentService.createPayment(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all payments' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Payments fetched successfully',
  })
  findAllPayments(@Query() query: FindPaymentDto) {
    return this.paymentService.findAllPayments(query);
  }

  @Get('member/:memberId')
  @ApiOperation({ summary: 'Get all payments for a specific member' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Member payments fetched successfully',
  })
  getPaymentsByMember(@Param('memberId') memberId: string) {
    return this.paymentService.getPaymentsByMember(memberId);
  }
}
