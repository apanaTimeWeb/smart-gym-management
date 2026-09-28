// RESPONSIBILITY: Owns the HTTP boundary for the library query side.
// FLOW: HTTP request → TrainerLibraryQueryController → feature service → canonical response interceptor.

import { TrainerLibraryAssignedMembersResponseDto, TrainerLibraryDietPlansResponseDto } from '@/backend_trainer/backend_trainer_modules/trainer_library/library_dtos/trainer-library-response.dto';
import { Controller, Get, Query, HttpStatus } from '@nestjs/common'; import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger'; import { CoreRoles } from '@/backend_trainer/backend_core/core_security/core-roles.decorator';
import { CoreRole } from '@/backend_trainer/backend_core/core_types/core-auth.types'; import { TrainerLibraryQueryService } from '@/backend_trainer/backend_trainer_modules/trainer_library/library_services/trainer-library-query.service'; import { TrainerLibraryQueryDto } from '@/backend_trainer/backend_trainer_modules/trainer_library/library_dtos/trainer-library-query.dto';

/**
 * Intent: Defines the TrainerLibraryQueryController boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Controller('/trainer/library')
@ApiTags('trainer/library')
export class TrainerLibraryQueryController {
  constructor(private readonly service:TrainerLibraryQueryService){}
// SLA: STANDARD
  // SLA: STANDARD
@ApiOperation({ summary: 'Get Trainer trainer-library-query.controller' })
@Get('diet-plans') @CoreRoles(CoreRole.TRAINER)@ApiQuery({ type: TrainerLibraryQueryDto })
 @ApiResponse({ status: HttpStatus.OK, type: TrainerLibraryDietPlansResponseDto }) /** Returns paginated diet plans. */ async dietPlans(@Query() query:TrainerLibraryQueryDto){return this.service.findDietPlans(query);}
  // SLA: STANDARD
@ApiOperation({ summary: 'Get Trainer trainer-library-query.controller' })
@Get('assigned-members') @CoreRoles(CoreRole.TRAINER) @ApiResponse({ status: HttpStatus.OK, type: TrainerLibraryAssignedMembersResponseDto }) /** Returns member diet assignment state. */ async assignedMembers(){return this.service.findAssignedMembers();}
}