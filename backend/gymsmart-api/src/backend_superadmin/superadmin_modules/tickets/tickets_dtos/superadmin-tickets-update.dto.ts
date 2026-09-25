import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Validates partial updates at the tickets HTTP boundary.
// FLOW: HTTP JSON -> SuperadminTicketsUpdateDto -> Tickets service.
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import { SupportTicketStatus as SupportTicketStatus, SupportTicketPriority as TicketsPriority } from '@/backend_superadmin/superadmin_modules/tickets/superadmin-tickets.constants';
/**
 * Primary Intent: Defines SuperadminTicketsUpdateDto as the class-level contract for superadmin-tickets-update.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminTicketsUpdateDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `tenantId` data contract for this superadmin-tickets-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  tenantId!: string;
  @IsOptional()
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `tenantName` data contract for this superadmin-tickets-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  tenantName!: string;
  @IsOptional()
  @IsString()
  @IsEmail()
  @ApiProperty()
  /** Primary Intent: Defines the `reporterEmail` data contract for this superadmin-tickets-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  reporterEmail!: string;
  @IsOptional()
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `subject` data contract for this superadmin-tickets-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  subject!: string;
  @IsOptional()
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `description` data contract for this superadmin-tickets-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  description!: string;
  @IsOptional()
  @IsEnum(SupportTicketStatus)
  @ApiProperty()
  /** Primary Intent: Defines the `status` data contract for this superadmin-tickets-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  status!: SupportTicketStatus;
  @IsOptional()
  @IsEnum(TicketsPriority)
  @ApiProperty()
  /** Primary Intent: Defines the `priority` data contract for this superadmin-tickets-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  priority!: TicketsPriority;
  @IsOptional()
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `assignedTo` data contract for this superadmin-tickets-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  assignedTo!: string;
  @IsOptional()
  @ApiProperty()
  /** Primary Intent: Defines the `attachments` data contract for this superadmin-tickets-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  attachments!: Record<string, unknown> | unknown[] | null;
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  /** Primary Intent: Defines the `slaDeadline` data contract for this superadmin-tickets-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  slaDeadline!: Date;
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  /** Primary Intent: Defines the `firstResponseAt` data contract for this superadmin-tickets-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  firstResponseAt!: Date;
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty()
  /** Primary Intent: Defines the `resolutionTime` data contract for this superadmin-tickets-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  resolutionTime!: number;
  @IsOptional()
  @ApiProperty()
  /** Primary Intent: Defines the `messages` data contract for this superadmin-tickets-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  messages!: Record<string, unknown> | unknown[] | null;
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  /** Primary Intent: Defines the `lastUpdated` data contract for this superadmin-tickets-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  lastUpdated!: Date;
}
