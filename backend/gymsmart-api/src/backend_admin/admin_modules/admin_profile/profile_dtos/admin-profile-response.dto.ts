// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin profile.
// FLOW: Repository domain â†’ Profile response mapper â†’ ApiResponse<T>.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * @description Defines the AdminProfileDto boundary for the admin_profile backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminProfileDto {
  @ApiProperty()
  id!: string;
  @ApiProperty()
  name!: string;
  @ApiProperty()
  email!: string;
  @ApiProperty()
  phone!: string;
  @ApiProperty()
  role!: string;
  @ApiProperty()
  branchName!: string;
  @ApiProperty()
  joinedAt!: string;
  @ApiProperty()
  avatarInitial!: string;
}
