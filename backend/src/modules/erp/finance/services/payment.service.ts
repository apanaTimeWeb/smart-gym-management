import { Injectable, Logger } from '@nestjs/common';
import { FinanceRepository } from '@/modules/erp/finance/finance.repository';
import { CreatePaymentDto } from '@/modules/erp/finance/dto/create-payment.dto';
import { FindPaymentDto } from '@/modules/erp/finance/dto/find-payment.dto';
import {
  MemberNotFoundForPaymentException,
  PaymentProcessingException,
} from '@/modules/erp/finance/finance.exceptions';
import { FINANCE_MESSAGES } from '@/modules/erp/finance/finance.constants';
import type { FinanceResponse } from '@/modules/erp/finance/finance.interfaces';

import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);

  constructor(
    private readonly financeRepository: FinanceRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async createPayment(dto: CreatePaymentDto): Promise<FinanceResponse> {
    this.logger.log(
      `Processing payment of ${dto.amount} for member: ${dto.memberId}`,
    );

    const member = await this.financeRepository.findMemberById(dto.memberId);
    if (!member) {
      throw new MemberNotFoundForPaymentException();
    }

    try {
      const payment = await this.financeRepository.processPayment(dto);

      this.eventEmitter.emit('payment.processed', payment);

      return {
        message: FINANCE_MESSAGES.PAYMENT_CREATED_SUCCESS,
        data: payment,
      };
    } catch (error: any) {
      this.logger.error(
        `Failed to process payment for member ${dto.memberId}`,
        error.stack,
      );
      throw new PaymentProcessingException(error.message);
    }
  }

  async findAllPayments(query: FindPaymentDto): Promise<FinanceResponse> {
    this.logger.log(`Fetching payments with limit: ${query.limit}, offset: ${query.offset}`);
    const limit = query.limit || 10;
    const page = query.page || 1;
    const [payments, total] = await this.financeRepository.findPayments(query);

    return {
      message: FINANCE_MESSAGES.PAYMENTS_FETCHED_SUCCESS,
      data: { payments, total, page, limit },
    };
  }

  async getPaymentsByMember(memberId: string): Promise<FinanceResponse> {
    this.logger.log(`Fetching payments for member: ${memberId}`);

    const member = await this.financeRepository.findMemberById(memberId);
    if (!member) {
      throw new MemberNotFoundForPaymentException();
    }

    const payments =
      await this.financeRepository.findPaymentsByMember(memberId);

    return {
      message: FINANCE_MESSAGES.PAYMENTS_FETCHED_SUCCESS,
      data: payments,
    };
  }
}
