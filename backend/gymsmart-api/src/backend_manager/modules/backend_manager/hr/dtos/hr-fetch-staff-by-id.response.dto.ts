// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

export class HrFetchStaffByIdResponseDto {
  @ApiProperty()
  branch!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty()
  gender!: string;

  @ApiProperty()
  id!: string;

  @ApiProperty({ type: Boolean })
  isActive!: boolean;

  @ApiProperty()
  joinDate!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  phone!: string;

  @ApiProperty()
  role!: string;

  @ApiProperty({ type: Number })
  salary!: number;

}
