import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MembersRepository } from '../members.repository';

@Injectable()
export class PaymentProcessedListener {
  private readonly logger = new Logger(PaymentProcessedListener.name);

  constructor(private readonly membersRepository: MembersRepository) {}

  @OnEvent('payment.processed')
  async handlePaymentProcessedEvent(payment: any) {
    this.logger.log(`Handling payment.processed event for payment: ${payment.id}`);
    
    // Member payment fields (paidAmount, pendingAmount) are typically updated here.
    // Assuming simple logic for this listener:
    try {
      const member = await this.membersRepository.findMemberById(payment.memberId);
      if (member) {
        member.paidAmount = Number(member.paidAmount) + Number(payment.amount);
        await this.membersRepository.updateMember(member.id, { paidAmount: member.paidAmount });
        this.logger.log(`Updated paid amount for member: ${member.id}`);
      }
    } catch (error: any) {
      this.logger.error(`Failed to update member after payment processing: ${payment.memberId}`, error.stack);
    }
  }
}
