import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Payment } from '../entities/payment.entity';
import { PaymentStatus } from '../utils/finance.enums';
import { TenantConnectionService } from '@/core/database/tenant-connection.service';

@Injectable()
export class MemberRegisteredListener {
  private readonly logger = new Logger(MemberRegisteredListener.name);

  constructor(
    private readonly tenantConnectionService: TenantConnectionService,
  ) {}

  @OnEvent('member.registered')
  async handleMemberRegisteredEvent(payload: any) {
    this.logger.log(`Handling member.registered event`);
    
    const member = payload.member || payload;
    const tenantId = payload.tenantId || member.tenantId || member.gymId;
    
    if (!tenantId) {
      this.logger.error(`Cannot process member.registered: Missing tenantId`);
      return;
    }

    try {
      const dataSource = await this.tenantConnectionService.getTenantConnection(tenantId);
      const paymentRepository = dataSource.getRepository(Payment);
      
      await paymentRepository.save(
        paymentRepository.create({
          memberId: member.id,
          amount: 0, 
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
