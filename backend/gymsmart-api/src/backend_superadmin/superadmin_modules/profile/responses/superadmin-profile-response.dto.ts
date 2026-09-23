// RESPONSIBILITY: Defines the stable response data contract for profile endpoints.
// FLOW: Domain model -> SuperadminProfileResponseDto -> canonical ApiResponse envelope.
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SuperadminProfileResponseDto {
  @ApiPropertyOptional() id!: string;
  @ApiPropertyOptional()
  name!: string;
  @ApiPropertyOptional()
  email!: string;
  @ApiPropertyOptional()
  role!: string;
  @ApiPropertyOptional()
  avatarUrl!: string | null;
  @ApiPropertyOptional()
  lastLoginAt!: string | null;
  @ApiPropertyOptional()
  twoFactorEnabled!: boolean;
}