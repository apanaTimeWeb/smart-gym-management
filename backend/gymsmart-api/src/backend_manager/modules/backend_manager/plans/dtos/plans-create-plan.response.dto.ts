// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

export class PlansCreatePlanResponseDto {
  @ApiProperty({ type: [Object] })
  plans?: Array<{ duration: number; isActive: number; name: string; price: number; }>;
}
