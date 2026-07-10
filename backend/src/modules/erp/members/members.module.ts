import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Member } from '@/modules/erp/members/entities/member.entity';
import { MembersRepository } from '@/modules/erp/members/members.repository';

import { CreateMemberService } from '@/modules/erp/members/services/create-member.service';
import { FindMemberService } from '@/modules/erp/members/services/find-member.service';
import { UpdateMemberService } from '@/modules/erp/members/services/update-member.service';
import { RenewMemberService } from '@/modules/erp/members/services/renew-member.service';
import { MemberStatsService } from '@/modules/erp/members/services/member-stats.service';

import { CreateMemberController } from '@/modules/erp/members/controllers/create-member.controller';
import { FindMemberController } from '@/modules/erp/members/controllers/find-member.controller';
import { UpdateMemberController } from '@/modules/erp/members/controllers/update-member.controller';
import { RenewMemberController } from '@/modules/erp/members/controllers/renew-member.controller';
import { MemberStatsController } from '@/modules/erp/members/controllers/member-stats.controller';
import { PaymentProcessedListener } from './listeners/payment-processed.listener';

@Module({
  imports: [TypeOrmModule.forFeature([Member])],
  controllers: [
    MemberStatsController,
    CreateMemberController,
    FindMemberController,
    UpdateMemberController,
    RenewMemberController,
  ],
  providers: [
    MembersRepository,
    CreateMemberService,
    FindMemberService,
    UpdateMemberService,
    RenewMemberService,
    MemberStatsService,
    PaymentProcessedListener,
  ],
})
export class MembersModule {}
