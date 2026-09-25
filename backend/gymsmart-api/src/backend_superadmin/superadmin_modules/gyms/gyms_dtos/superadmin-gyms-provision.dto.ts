import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Validates the client-owned Gym provisioning request without accepting server-managed persistence fields.
// FLOW: HTTP POST /api/gyms/provision -> SuperadminGymsProvisionDto -> provisioning service.
import { IsEmail, IsEnum, IsOptional, IsString, Length, Matches } from 'class-validator';
import { TenantStatus } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms.constants';

/**
 * Primary Intent: Defines SuperadminGymsProvisionDto as the class-level contract for superadmin-gyms-provision.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminGymsProvisionDto {@ApiProperty()

  @IsString() @Length(2, 120) gymName!: string;@ApiProperty()

  @IsString() @Length(2, 120) ownerName!: string;@ApiProperty()

  @IsEmail() adminEmail!: string;@ApiProperty()

  @IsString() @Length(7, 20) phone!: string;
  @IsOptional()
  @IsString()
  @Matches(/^(?:\d{12})?$/)
  @ApiPropertyOptional({ required: false })
  /** Primary Intent: Defines the `aadharNumber` data contract for this superadmin-gyms-provision.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  aadharNumber?: string;@ApiProperty()

  @IsString() @Length(8, 128) temporaryPassword!: string;@ApiProperty()

  @IsString() plan!: string;@ApiPropertyOptional()

  @IsOptional() @IsString() @Length(1, 128) planId?: string;@ApiPropertyOptional()

  @IsOptional() @IsEnum(TenantStatus) initialStatus?: TenantStatus;
}
