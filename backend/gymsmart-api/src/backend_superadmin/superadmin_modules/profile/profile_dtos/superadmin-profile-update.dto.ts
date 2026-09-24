import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Validates partial updates at the profile HTTP boundary.
// FLOW: HTTP JSON -> SuperadminProfileUpdateDto -> Profile service.
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import { SuperadminProfileRole as ProfileRole } from '@/backend_superadmin/superadmin_modules/profile/superadmin-profile.constants';
/**
 * Primary Intent: Defines SuperadminProfileUpdateDto as the class-level contract for superadmin-profile-update.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminProfileUpdateDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `name` data contract for this superadmin-profile-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  name!: string;
  @IsOptional()
  @IsString()
  @IsEmail()
  @ApiProperty()
  /** Primary Intent: Defines the `email` data contract for this superadmin-profile-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  email!: string;
  @IsOptional()
  @IsEnum(ProfileRole)
  @ApiProperty()
  /** Primary Intent: Defines the `role` data contract for this superadmin-profile-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  role!: ProfileRole;
  @IsOptional()
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `phone` data contract for this superadmin-profile-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  phone!: string;
  @IsOptional()
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `timezone` data contract for this superadmin-profile-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  timezone!: string;
  @IsOptional()
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `language` data contract for this superadmin-profile-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  language!: string;
  @IsOptional()
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `avatarUrl` data contract for this superadmin-profile-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  avatarUrl!: string;
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  /** Primary Intent: Defines the `lastLoginAt` data contract for this superadmin-profile-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  lastLoginAt!: Date;
  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  /** Primary Intent: Defines the `twoFactorEnabled` data contract for this superadmin-profile-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  twoFactorEnabled!: boolean;
  @IsOptional()
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `passwordHash` data contract for this superadmin-profile-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  passwordHash!: string;
}
