// RESPONSIBILITY: Documents the complete Trainer Profile response contract consumed by the profile UI.
// FLOW: Profile read/update service → response mapper → response DTO contract → canonical API envelope.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


/**
 * Intent: Defines the TrainerProfileEmergencyContactResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerProfileEmergencyContactResponseDto { @ApiProperty() name!: string; @ApiProperty() phone!: string; @ApiProperty() relation!: string; }

/**
 * Intent: Defines the TrainerProfileResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerProfileResponseDto {
  @ApiProperty() id!: string; @ApiProperty() name!: string; @ApiProperty() email!: string; @ApiProperty() phone!: string; @ApiProperty() role!: string; @ApiProperty({ type: [String] }) specialization!: string[]; @ApiProperty() joinedAt!: string; @ApiProperty() avatarInitial!: string;
  @ApiPropertyOptional({ type: [String] }) certifications?: string[]; @ApiPropertyOptional({ type: [String] }) specialties?: string[]; @ApiPropertyOptional({ type: TrainerProfileEmergencyContactResponseDto }) emergencyContact?: TrainerProfileEmergencyContactResponseDto; @ApiPropertyOptional() bio?: string; @ApiPropertyOptional() experienceYears?: number; @ApiPropertyOptional() profilePhotoUrl?: string; @ApiPropertyOptional({ type: [String] }) languagesSpoken?: string[];
}
