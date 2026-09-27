// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

export class ManagerLibraryDeleteDietPlanResponseDto {
  @ApiProperty()
  id!: string;

}

export { ManagerLibraryDeleteDietPlanResponseDto as LibraryDeleteDietPlanResponseDto };
