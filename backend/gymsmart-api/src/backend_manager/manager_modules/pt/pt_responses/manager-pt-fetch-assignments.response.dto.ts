// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

import { PtAssignmentItemResponseDto } from '@/backend_manager/manager_modules/pt/pt_responses/manager-pt-assignment-item.response.dto';

export class ManagerPtFetchAssignmentsResponseDto {
  @ApiProperty({ type: [PtAssignmentItemResponseDto] })
  assignments?: Array<PtAssignmentItemResponseDto>;

}

export { ManagerPtFetchAssignmentsResponseDto as PtFetchAssignmentsResponseDto };
