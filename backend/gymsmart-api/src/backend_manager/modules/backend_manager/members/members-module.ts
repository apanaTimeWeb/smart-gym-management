// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Module } from '@nestjs/common';

import { MembersCommandController } from '@/backend_manager/modules/backend_manager/members/members-command.controller';
import { MembersQueryController } from '@/backend_manager/modules/backend_manager/members/members-query.controller';
import { MembersRepository } from '@/backend_manager/modules/backend_manager/members/repositories/members-repository';
import { MembersAddMemberPaymentService } from '@/backend_manager/modules/backend_manager/members/services/members-add-member-payment.service';
import { MembersAssignDietPlanService } from '@/backend_manager/modules/backend_manager/members/services/members-assign-diet-plan.service';
import { MembersAssignWorkoutService } from '@/backend_manager/modules/backend_manager/members/services/members-assign-workout.service';
import { MembersCreateMemberService } from '@/backend_manager/modules/backend_manager/members/services/members-create-member.service';
import { MembersDeleteMemberService } from '@/backend_manager/modules/backend_manager/members/services/members-delete-member.service';
import { MembersExportMembersReportService } from '@/backend_manager/modules/backend_manager/members/services/members-export-members-report.service';
import { MembersFetchMemberAttendanceService } from '@/backend_manager/modules/backend_manager/members/services/members-fetch-member-attendance.service';
import { MembersFetchMemberByIdService } from '@/backend_manager/modules/backend_manager/members/services/members-fetch-member-by-id.service';
import { MembersFetchMemberDietPlansService } from '@/backend_manager/modules/backend_manager/members/services/members-fetch-member-diet-plans.service';
import { MembersFetchMemberPaymentsService } from '@/backend_manager/modules/backend_manager/members/services/members-fetch-member-payments.service';
import { MembersFetchMemberPlansService } from '@/backend_manager/modules/backend_manager/members/services/members-fetch-member-plans.service';
import { MembersFetchMemberStatsService } from '@/backend_manager/modules/backend_manager/members/services/members-fetch-member-stats.service';
import { MembersFetchMemberTrainersService } from '@/backend_manager/modules/backend_manager/members/services/members-fetch-member-trainers.service';
import { MembersFetchMemberWorkoutsService } from '@/backend_manager/modules/backend_manager/members/services/members-fetch-member-workouts.service';
import { MembersFetchMembersService } from '@/backend_manager/modules/backend_manager/members/services/members-fetch-members.service';
import { MembersOrchestratorService } from '@/backend_manager/modules/backend_manager/members/services/members-orchestrator.service';
import { MembersRenewMemberService } from '@/backend_manager/modules/backend_manager/members/services/members-renew-member.service';
import { MembersUpdateMemberService } from '@/backend_manager/modules/backend_manager/members/services/members-update-member.service';

@Module({
  controllers: [MembersQueryController, MembersCommandController],
  providers: [MembersCreateMemberService, MembersUpdateMemberService, MembersDeleteMemberService, MembersRenewMemberService, MembersAddMemberPaymentService, MembersAssignDietPlanService, MembersAssignWorkoutService, MembersFetchMembersService, MembersFetchMemberByIdService, MembersFetchMemberStatsService, MembersExportMembersReportService, MembersFetchMemberTrainersService, MembersFetchMemberPlansService, MembersFetchMemberPaymentsService, MembersFetchMemberAttendanceService, MembersFetchMemberDietPlansService, MembersFetchMemberWorkoutsService, MembersRepository, MembersOrchestratorService],
  exports: [MembersRepository],
})
export class MembersModule {}
