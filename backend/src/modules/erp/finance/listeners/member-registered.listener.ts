import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../entities/payment.entity';
import { PaymentStatus } from '../utils/finance.enums';

@Injectable()
export class MemberRegisteredListener {
  private readonly logger = new Logger(MemberRegisteredListener.name);

  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  @OnEvent('member.registered')
  async handleMemberRegisteredEvent(member: any) {
    this.logger.log(
      `Handling member.registered event for member: ${member.id}`,
    );

    // Create an initial invoice/payment record for the new member
    try {
      await this.paymentRepository.save(
        this.paymentRepository.create({
          memberId: member.id,
          amount: 0, // Should be calculated based on plan, using 0 as placeholder
          method: 'SYSTEM',
          status: PaymentStatus.DUE,
          invoiceNo: `INV-${Date.now()}`,
        }),
      );
      this.logger.log(`Created initial due payment for member: ${member.id}`);
    } catch (error: any) {
      this.logger.error(
        `Failed to create initial payment for member: ${member.id}`,
        error.stack,
      );
    }
  }
}
