// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

export class ManagerStoreDeleteProductResponseDto {
  @ApiProperty()
  id!: string;

}

export { ManagerStoreDeleteProductResponseDto as StoreDeleteProductResponseDto };
