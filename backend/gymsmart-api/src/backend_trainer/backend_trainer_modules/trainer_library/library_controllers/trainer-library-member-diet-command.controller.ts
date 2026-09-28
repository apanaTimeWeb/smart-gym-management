// RESPONSIBILITY: Owns the cross-path diet assignment endpoint while the business logic remains inside Library.
// FLOW: PATCH /trainer/members/:memberId/diet → TrainerLibraryDietAssignmentService.

import { TrainerLibraryAssignmentResponseDto } from '@/backend_trainer/backend_trainer_modules/trainer_library/library_dtos/trainer-library-response.dto';
import { Body, Controller, Patch, Param, HttpStatus } from '@nestjs/common'; import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBody } from '@nestjs/swagger'; import { CoreRoles } from '@/backend_trainer/backend_core/core_security/core-roles.decorator';
import { CoreRole } from '@/backend_trainer/backend_core/core_types/core-auth.types'; import { RequireIdempotencyKey } from '@/backend_trainer/backend_core/core_security/core-idempotency.decorator'; import { TrainerLibraryAuthorizationService } from '@/backend_trainer/backend_trainer_modules/trainer_library/library_services/trainer-library-authorization.service'; import { TrainerLibraryDietAssignmentService } from '@/backend_trainer/backend_trainer_modules/trainer_library/library_services/trainer-library-diet-assignment.service'; import { TrainerLibraryAssignDietDto } from '@/backend_trainer/backend_trainer_modules/trainer_library/library_dtos/trainer-library-assign-diet.dto';
 /**
 * Intent: Defines the TrainerLibraryMemberDietCommandController boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@ApiTags('trainer/members') @Controller('trainer/members') export class TrainerLibraryMemberDietCommandController { constructor(private readonly service:TrainerLibraryDietAssignmentService,private readonly authorization:TrainerLibraryAuthorizationService){} // SLA: STANDARD
@ApiOperation({ summary: 'Patch Trainer trainer-library-member-diet-command.controller' })
@Patch(':memberId/diet') @CoreRoles(CoreRole.TRAINER) @RequireIdempotencyKey()@ApiParam({ name: 'memberId', type: String })
@ApiBody({ type: TrainerLibraryAssignDietDto })
 @ApiResponse({ status: HttpStatus.OK, type: TrainerLibraryAssignmentResponseDto }) /** Assigns a library diet plan to one trainer-visible member. */ async assign(@Param('memberId') memberId:string,@Body() dto:TrainerLibraryAssignDietDto){await this.authorization.assertMember(memberId);return this.service.assign(memberId,dto);} }
