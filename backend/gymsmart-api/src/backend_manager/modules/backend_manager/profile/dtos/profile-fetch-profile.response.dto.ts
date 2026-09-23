// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ProfileFetchProfileResponseDto {
  @ApiPropertyOptional()
  email!: string;

  @ApiPropertyOptional()
  name!: string;

  @ApiPropertyOptional()
  phone!: string;

}
