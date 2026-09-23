// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsEnum, IsString, MaxLength, MinLength } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';

import { GrievanceCategory } from '@/backend_manager/modules/backend_manager/grievance/grievance.constants';

export class GrievanceManagerGrievanceApiCreateGrievanceTicketRequestDto extends CoreRequestDto {
  @IsString() @MinLength(1) @MaxLength(200) memberName!: string;
  @IsEnum(GrievanceCategory) category!: GrievanceCategory;
  @IsString() @MinLength(1) @MaxLength(2000) issue!: string;
}
