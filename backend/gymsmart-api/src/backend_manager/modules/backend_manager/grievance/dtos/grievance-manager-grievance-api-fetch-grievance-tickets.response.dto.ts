// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { GrievanceCategoryType, GrievanceStatus } from '@/backend_manager/modules/backend_manager/grievance/grievance.constants';

export class GrievanceManagerGrievanceApiFetchGrievanceTicketsResponseDto {
  @ApiProperty() id!: string; @ApiProperty() memberName!: string; @ApiProperty({enum:GrievanceCategoryType}) category!: GrievanceCategoryType;
  @ApiProperty() issue!: string; @ApiProperty({enum:GrievanceStatus}) status!: GrievanceStatus; @ApiProperty() loggedAt!: string;
  @ApiPropertyOptional() resolvedAt?: string; @ApiPropertyOptional() resolutionNote?: string;
}
