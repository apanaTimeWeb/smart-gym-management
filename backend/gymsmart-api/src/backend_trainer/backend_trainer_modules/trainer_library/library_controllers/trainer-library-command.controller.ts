// RESPONSIBILITY: Owns library plan update/delete HTTP operations; member assignment has a dedicated controller path.
// FLOW: HTTP /trainer/library/diet-plans/:id → Library plan services.

import { TrainerLibraryDietPlanResponseDto } from '@/backend_trainer/backend_trainer_modules/trainer_library/library_dtos/trainer-library-response.dto';
import { Body, Delete, Param, Patch, Controller, HttpStatus } from '@nestjs/common'; import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBody } from '@nestjs/swagger'; import { CoreRoles } from '@/backend_trainer/backend_core/core_security/core-roles.decorator';
import { CoreRole } from '@/backend_trainer/backend_core/core_types/core-auth.types'; import { RequireIdempotencyKey } from '@/backend_trainer/backend_core/core_security/core-idempotency.decorator'; import { TrainerLibraryDietPlanUpdateService } from '@/backend_trainer/backend_trainer_modules/trainer_library/library_services/trainer-library-diet-plan-update.service'; import { TrainerLibraryDietPlanDeleteService } from '@/backend_trainer/backend_trainer_modules/trainer_library/library_services/trainer-library-diet-plan-delete.service'; import { TrainerLibraryUpdateDietPlanDto } from '@/backend_trainer/backend_trainer_modules/trainer_library/library_dtos/trainer-library-update-diet-plan.dto';
 /**
 * Intent: Defines the TrainerLibraryCommandController boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@ApiTags('trainer/library') @Controller('trainer/library') export class TrainerLibraryCommandController { constructor(private readonly updateService:TrainerLibraryDietPlanUpdateService,private readonly deleteService:TrainerLibraryDietPlanDeleteService){} // SLA: STANDARD
@ApiOperation({ summary: 'Patch Trainer trainer-library-command.controller' })
@Patch('diet-plans/:id') @CoreRoles(CoreRole.TRAINER) @RequireIdempotencyKey()@ApiParam({ name: 'id', type: String })
@ApiBody({ type: TrainerLibraryUpdateDietPlanDto })
 @ApiResponse({ status: HttpStatus.OK, type: TrainerLibraryDietPlanResponseDto }) /** Updates a library diet plan. */ async update(@Param('id') id:string,@Body() body:TrainerLibraryUpdateDietPlanDto){return this.updateService.update(id,body);} // SLA: STANDARD
@ApiOperation({ summary: 'Delete Trainer trainer-library-command.controller' })
@Delete('diet-plans/:id') @CoreRoles(CoreRole.TRAINER) @RequireIdempotencyKey()@ApiParam({ name: 'id', type: String })
 @ApiResponse({ status: HttpStatus.OK, schema: { type: 'object', nullable: true, description: 'Successful mutation returns null data.' } }) /** Soft-deletes a library diet plan. */ async delete(@Param('id') id:string){return this.deleteService.deleteDietPlan(id);} }
