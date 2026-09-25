// RESPONSIBILITY: Validates owner email message input for the Gyms feature.
// FLOW: HTTP -> DTO -> email adapter/job boundary.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
/**
 * Primary Intent: Defines SuperadminGymsOwnerEmailDto as the class-level contract for superadmin-gyms-owner-email.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminGymsOwnerEmailDto {@ApiProperty()

  @IsString() @Length(1, 200) subject!: string;@ApiProperty()

  @IsString() @Length(1, 10000) message!: string;
}
