// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class GrievanceManagerGrievanceApiResolveGrievanceTicketRequestDto {
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  resolutionNote!: string;

}
