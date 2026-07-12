import { Injectable, Logger, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import type { Request } from 'express';
import { MembersRepository } from '@/modules/erp/members/members.repository';
import { CreateMemberDto } from '@/modules/erp/members/dto/create-member.dto';
import { DuplicateEmailException } from '@/modules/erp/members/members.exceptions';
import { MEMBER_MESSAGES } from '@/modules/erp/members/members.constants';
import type { MemberResponse } from '@/modules/erp/members/members.interfaces';
import {
  MemberStatus,
  BillingCycle,
} from '@/modules/erp/members/utils/members.enums';

import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class CreateMemberService {
  private readonly logger = new Logger(CreateMemberService.name);

  constructor(
    private readonly membersRepository: MembersRepository,
    private readonly eventEmitter: EventEmitter2,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async create(dto: CreateMemberDto): Promise<MemberResponse> {
    this.logger.log(`Attempting to create member with email: ${dto.email}`);

    const existing = await this.membersRepository.findMemberByEmail(dto.email);
    if (existing) {
      this.logger.warn(
        `Member creation failed. Email ${dto.email} already exists.`,
      );
      throw new DuplicateEmailException();
    }

    const cycleMonths: Record<string, number> = {
      [BillingCycle.ONE_MONTH]: 1,
      [BillingCycle.THREE_MONTHS]: 3,
      [BillingCycle.SIX_MONTHS]: 6,
      [BillingCycle.TWELVE_MONTHS]: 12,
    };

    const joinDate = dto.joinDate ? new Date(dto.joinDate) : new Date();
    const expiryDate = new Date(joinDate);
    
    if (dto.billingCycle === BillingCycle.CUSTOM && dto.customDays) {
      expiryDate.setDate(expiryDate.getDate() + dto.customDays);
    } else {
      expiryDate.setMonth(
        expiryDate.getMonth() + (cycleMonths[dto.billingCycle] || 1),
      );
    }

    const payload = {
      ...dto,
      joinDate,
      expiryDate,
      status: MemberStatus.ACTIVE,
      paidAmount: 0,
      pendingAmount: 0,
    };

    const member = await this.membersRepository.createMember(payload);

    const tenantId = this.request.headers['x-tenant-id'] as string;
    this.eventEmitter.emit('member.registered', { member, tenantId });

    return {
      message: MEMBER_MESSAGES.CREATED_SUCCESS,
      data: member,
    };
  }
}
