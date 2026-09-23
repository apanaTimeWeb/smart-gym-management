// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class GrievanceManagerGrievanceApiCreateGrievanceTicketRequestDto {
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  name!: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description!: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  status!: string;

}
