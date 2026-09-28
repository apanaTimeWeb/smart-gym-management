// RESPONSIBILITY: Registers the isolated members feature slice and its controller/service/repository graph.
// FLOW: Nest bootstrap → TrainerMembersModule → feature-owned providers/controllers.

import { Module } from '@nestjs/common';
import { TrainerMembersQueryController } from '@/backend_trainer/backend_trainer_modules/trainer_members/members_controllers/trainer-members-query.controller';
import { TrainerMembersCommandController } from '@/backend_trainer/backend_trainer_modules/trainer_members/members_controllers/trainer-members-command.controller';
import { TrainerMembersQueryService } from '@/backend_trainer/backend_trainer_modules/trainer_members/members_services/trainer-members-query.service';
import { TrainerMembersUpdateService } from '@/backend_trainer/backend_trainer_modules/trainer_members/members_services/trainer-members-update.service';
import { TrainerMembersNoteService } from '@/backend_trainer/backend_trainer_modules/trainer_members/members_services/trainer-members-note.service';
import { TrainerMembersAuthorizationService } from '@/backend_trainer/backend_trainer_modules/trainer_members/members_services/trainer-members-authorization.service';
import { TrainerMembersRepository } from '@/backend_trainer/backend_trainer_modules/trainer_members/members_repositories/trainer-members-repository';
import { TrainerMembersReadRepository } from '@/backend_trainer/backend_trainer_modules/trainer_members/members_repositories/trainer-members-read.repository';
import { TrainerMembersAssessmentRepairRepository } from '@/backend_trainer/backend_trainer_modules/trainer_members/members_repositories/trainer-members-assessment-repair.repository';
import { TrainerMembersAssessmentEncryptionRepairService } from '@/backend_trainer/backend_trainer_modules/trainer_members/members_services/trainer-members-assessment-encryption-repair.service';

/**
 * Intent: Defines the TrainerMembersModule boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Module({controllers:[TrainerMembersQueryController,TrainerMembersCommandController],providers:[TrainerMembersQueryService,TrainerMembersUpdateService,TrainerMembersNoteService,TrainerMembersRepository,TrainerMembersAuthorizationService,TrainerMembersAssessmentEncryptionRepairService,TrainerMembersAssessmentRepairRepository,TrainerMembersReadRepository]}) export class TrainerMembersModule {}
