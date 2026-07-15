import { Injectable, Logger } from '@nestjs/common';
import { MembersRepository } from '@/modules/erp/members/members.repository';
import { RenewMemberDto } from '@/modules/erp/members/dto/renew-member.dto';
import { MemberNotFoundException } from '@/modules/erp/members/members.exceptions';
import { MEMBER_MESSAGES } from '@/modules/erp/members/members.constants';
import type { MemberResponse } from '@/modules/erp/members/members.interfaces';
import { MemberStatus } from '@/modules/erp/members/utils/members.enums';

import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class RenewMemberService {
  private readonly logger = new Logger(RenewMemberService.name);

  constructor(
    private readonly membersRepository: MembersRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async renew(id: string, dto: RenewMemberDto): Promise<MemberResponse> {
    this.logger.log(`Renewing member with ID: ${id}`);
    const existing = await this.membersRepository.findMemberById(id);

    if (!existing) {
      throw new MemberNotFoundException();
    }

    const updates: any = { status: MemberStatus.ACTIVE };
    
    if (dto.planId) updates.planId = dto.planId;
    if (dto.billingCycle) updates.billingCycle = dto.billingCycle;
    
    // Recalculate expiry date
    if (dto.durationMonths) {
       const expiryDate = new Date();
       expiryDate.setMonth(expiryDate.getMonth() + dto.durationMonths);
       updates.expiryDate = expiryDate;
    } else {
       // default 1 month
       const expiryDate = new Date();
       expiryDate.setMonth(expiryDate.getMonth() + 1);
       updates.expiryDate = expiryDate;
    }

    const updatedMember = await this.membersRepository.updateMember(id, updates);

    // Emit event for finance module to create an invoice/payment record
    this.eventEmitter.emit('member.renewed', { 
      memberId: id,
      planId: updatedMember.planId || dto.planId,
      billingCycle: updatedMember.billingCycle || dto.billingCycle,
      tenantId: (existing as any).tenantId || (existing as any).gymId // Ensure finance module knows which DB context to use
    });

    return {
      success: true,
      message: MEMBER_MESSAGES.RENEWED_SUCCESS,
      data: updatedMember,
    };
  }
}
