// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

export class StoreFetchOrdersResponseDto {
  @ApiProperty({ type: [Object] })
  orders?: Array<{ createdAt: string; id: string; items?: Array<string>; method: string; status: string; total: number; }>;

}
