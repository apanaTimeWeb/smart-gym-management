import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Member } from '@/modules/members/entities/member.entity';
import { MembersRepository } from '@/modules/members/members.repository';

import { CreateMemberService } from '@/modules/members/services/create-member.service';
import { FindMemberService } from '@/modules/members/services/find-member.service';
import { UpdateMemberService } from '@/modules/members/services/update-member.service';
import { RenewMemberService } from '@/modules/members/services/renew-member.service';
import { MemberStatsService } from '@/modules/members/services/member-stats.service';

import { CreateMemberController } from '@/modules/members/controllers/create-member.controller';
import { FindMemberController } from '@/modules/members/controllers/find-member.controller';
import { UpdateMemberController } from '@/modules/members/controllers/update-member.controller';
import { RenewMemberController } from '@/modules/members/controllers/renew-member.controller';
import { MemberStatsController } from '@/modules/members/controllers/member-stats.controller';
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
