import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class PaymentProcessedListener {
  private readonly logger = new Logger(PaymentProcessedListener.name);

  constructor() {}

  @OnEvent('payment.processed')
  async handlePaymentProcessedEvent(payment: any) {
    this.logger.log(
      `Handling payment.processed event for payment: ${payment.id}`,
    );

    // Note: The database balance update (paidAmount/pendingAmount) is already
    // handled securely inside a transaction within FinanceRepository.processPayment.
    // This listener should be used for secondary side-effects like sending
    // email receipts or SMS notifications to the member.
  }
}
