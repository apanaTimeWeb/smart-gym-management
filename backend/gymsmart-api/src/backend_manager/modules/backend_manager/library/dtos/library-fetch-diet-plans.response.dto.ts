// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

export class LibraryFetchDietPlansResponseDto {
  @ApiProperty({ type: [Object] })
  dietPlans?: Array<{ calories: string; carbs: string; fats: string; goal: string; isActive: number; meals?: Array<string>; name: string; protein: string; }>;

}
