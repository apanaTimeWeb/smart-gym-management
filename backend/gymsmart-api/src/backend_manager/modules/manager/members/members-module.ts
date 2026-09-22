// RESPONSIBILITY: Registers the isolated Manager members feature boundary.
// FLOW: ManagerDomainModule -> MembersModule -> controllers -> use cases -> repository.
import { Module } from '@nestjs/common';

import { MembersAddMemberPaymentService } from '@/modules/manager/members/services/members-add-member-payment.service';
import { MembersAssignDietPlanService } from '@/modules/manager/members/services/members-assign-diet-plan.service';
import { MembersAssignWorkoutService } from '@/modules/manager/members/services/members-assign-workout.service';
import { MembersCommandController } from '@/modules/manager/members/members-command.controller';
import { MembersCreateMemberService } from '@/modules/manager/members/services/members-create-member.service';
import { MembersDeleteMemberService } from '@/modules/manager/members/services/members-delete-member.service';
import { MembersExportMembersReportService } from '@/modules/manager/members/services/members-export-members-report.service';
import { MembersFetchMemberAttendanceService } from '@/modules/manager/members/services/members-fetch-member-attendance.service';
import { MembersFetchMemberByIdService } from '@/modules/manager/members/services/members-fetch-member-by-id.service';
import { MembersFetchMemberDietPlansService } from '@/modules/manager/members/services/members-fetch-member-diet-plans.service';
import { MembersFetchMemberPaymentsService } from '@/modules/manager/members/services/members-fetch-member-payments.service';
import { MembersFetchMemberPlansService } from '@/modules/manager/members/services/members-fetch-member-plans.service';
import { MembersFetchMemberStatsService } from '@/modules/manager/members/services/members-fetch-member-stats.service';
import { MembersFetchMemberTrainersService } from '@/modules/manager/members/services/members-fetch-member-trainers.service';
import { MembersFetchMemberWorkoutsService } from '@/modules/manager/members/services/members-fetch-member-workouts.service';
import { MembersFetchMembersService } from '@/modules/manager/members/services/members-fetch-members.service';
import { MembersOrchestratorService } from '@/modules/manager/members/services/members-orchestrator.service';
import { MembersQueryController } from '@/modules/manager/members/members-query.controller';
import { MembersRenewMemberService } from '@/modules/manager/members/services/members-renew-member.service';
import { MembersRepository } from '@/modules/manager/members/repositories/members-repository';
import { MembersUpdateMemberService } from '@/modules/manager/members/services/members-update-member.service';

@Module({
  controllers: [MembersQueryController, MembersCommandController],
  providers: [MembersCreateMemberService, MembersUpdateMemberService, MembersDeleteMemberService, MembersRenewMemberService, MembersAddMemberPaymentService, MembersAssignDietPlanService, MembersAssignWorkoutService, MembersFetchMembersService, MembersFetchMemberByIdService, MembersFetchMemberStatsService, MembersExportMembersReportService, MembersFetchMemberTrainersService, MembersFetchMemberPlansService, MembersFetchMemberPaymentsService, MembersFetchMemberAttendanceService, MembersFetchMemberDietPlansService, MembersFetchMemberWorkoutsService, MembersRepository, MembersOrchestratorService],
  exports: [MembersRepository],
})
export class MembersModule {}
