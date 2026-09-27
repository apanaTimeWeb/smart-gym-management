// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Module } from '@nestjs/common';
import { ManagerMembersMutationService } from '@/backend_manager/manager_modules/members/members_services/manager-members-mutation.service';
import { ManagerCoreResourceAuthorizationRegistry } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-resource-authorization.registry';
import { ManagerMembersAuthorizationService } from '@/backend_manager/manager_modules/members/members_services/manager-members-authorization.service';

import { ManagerMembersCommandController } from '@/backend_manager/manager_modules/members/manager-members-command.controller';
import { ManagerMembersQueryController } from '@/backend_manager/manager_modules/members/manager-members-query.controller';
import { ManagerMembersRepository } from '@/backend_manager/manager_modules/members/manager-members.repository';
import { ManagerMembersAddMemberPaymentService } from '@/backend_manager/manager_modules/members/members_services/manager-members-add-member-payment.service';
import { ManagerMembersAssignDietPlanService } from '@/backend_manager/manager_modules/members/members_services/manager-members-assign-diet-plan.service';
import { ManagerMembersAssignWorkoutService } from '@/backend_manager/manager_modules/members/members_services/manager-members-assign-workout.service';
import { ManagerMembersCreateMemberService } from '@/backend_manager/manager_modules/members/members_services/manager-members-create-member.service';
import { ManagerMembersDeleteMemberService } from '@/backend_manager/manager_modules/members/members_services/manager-members-delete-member.service';
import { ManagerMembersExportMembersReportService } from '@/backend_manager/manager_modules/members/members_services/manager-members-export-members-report.service';
import { ManagerMembersFindMemberAttendanceService } from '@/backend_manager/manager_modules/members/members_services/manager-members-find-member-attendance.service';
import { ManagerMembersFindMemberByIdService } from '@/backend_manager/manager_modules/members/members_services/manager-members-find-member-by-id.service';
import { ManagerMembersFindMemberDietPlansService } from '@/backend_manager/manager_modules/members/members_services/manager-members-find-member-diet-plans.service';
import { ManagerMembersFindMemberPaymentsService } from '@/backend_manager/manager_modules/members/members_services/manager-members-find-member-payments.service';
import { ManagerMembersFindMemberPlansService } from '@/backend_manager/manager_modules/members/members_services/manager-members-find-member-plans.service';
import { ManagerMembersFindMemberStatsService } from '@/backend_manager/manager_modules/members/members_services/manager-members-find-member-stats.service';
import { ManagerMembersFindMemberTrainersService } from '@/backend_manager/manager_modules/members/members_services/manager-members-find-member-trainers.service';
import { ManagerMembersFindMemberWorkoutsService } from '@/backend_manager/manager_modules/members/members_services/manager-members-find-member-workouts.service';
import { ManagerMembersFindMembersService } from '@/backend_manager/manager_modules/members/members_services/manager-members-find-members.service';
import { ManagerMembersOrchestratorService } from '@/backend_manager/manager_modules/members/members_services/manager-members-orchestrator.service';
import { ManagerMembersRenewMemberService } from '@/backend_manager/manager_modules/members/members_services/manager-members-renew-member.service';
import { ManagerMembersUpdateMemberService } from '@/backend_manager/manager_modules/members/members_services/manager-members-update-member.service';
import { ManagerCoreMemberCreationRegistry } from '@/backend_manager/manager_core/manager-core-member-creation.registry';

@Module({
  controllers: [ManagerMembersQueryController, ManagerMembersCommandController],
  providers: [ManagerMembersMutationService, ManagerMembersCreateMemberService, ManagerMembersUpdateMemberService, ManagerMembersDeleteMemberService, ManagerMembersRenewMemberService, ManagerMembersAddMemberPaymentService, ManagerMembersAssignDietPlanService, ManagerMembersAssignWorkoutService, ManagerMembersFindMembersService, ManagerMembersFindMemberByIdService, ManagerMembersFindMemberStatsService, ManagerMembersExportMembersReportService, ManagerMembersFindMemberTrainersService, ManagerMembersFindMemberPlansService, ManagerMembersFindMemberPaymentsService, ManagerMembersFindMemberAttendanceService, ManagerMembersFindMemberDietPlansService, ManagerMembersFindMemberWorkoutsService, ManagerMembersRepository, ManagerMembersOrchestratorService,
  ManagerMembersAuthorizationService,
  { provide: 'CORE_MEMBER_CREATION_REGISTRATION', useFactory: (registry: ManagerCoreMemberCreationRegistry, repository: ManagerMembersRepository) => { registry.register((data, context) => repository.createMember(data, context)); return registry; }, inject: [ManagerCoreMemberCreationRegistry, ManagerMembersRepository] },
  { provide: `CORE_RESOURCE_AUTHORIZER:members`, useFactory: (authorization: ManagerMembersAuthorizationService, registry: ManagerCoreResourceAuthorizationRegistry) => { registry.register('members', authorization); return authorization; }, inject: [ManagerMembersAuthorizationService, ManagerCoreResourceAuthorizationRegistry] },
  ],
  exports: [ManagerMembersRepository],
})
export class ManagerMembersModule {}

export { ManagerMembersModule as MembersModule };
