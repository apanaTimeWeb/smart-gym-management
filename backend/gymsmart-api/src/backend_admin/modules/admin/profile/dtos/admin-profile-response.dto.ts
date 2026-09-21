// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin profile.
import { ApiProperty } from '@nestjs/swagger';

// FLOW: Repository domain â†’ Profile response mapper â†’ ApiResponse<T>.

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
