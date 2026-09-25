// RESPONSIBILITY: Validates the Admin HR mutation status/currency contract while inheriting the isolated field set.
// FLOW: HTTP request -> AdminHrMutationDto -> AdminHrMutationFieldsDto -> service validation -> repository mutation.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { AdminCoreIsISO4217CurrencyCode } from '@/backend_admin/admin_core/admin_core_currency/admin-core-is-iso4217-currency-code.decorator'
import { AdminHrStatus } from '@/backend_admin/admin_modules/admin_hr/admin-hr.constants'
import { AdminHrMutationFieldsDto } from '@/backend_admin/admin_modules/admin_hr/hr_dtos/admin-hr-mutation-fields.dto'

/**
 * @description Defines the transport-level status and currency contract for Admin HR mutations on top of the isolated field set.
 * @remarks Business authorization, encryption, persistence, and audit behavior remain outside this DTO.
 */
export class AdminHrMutationDto extends AdminHrMutationFieldsDto {
  /** @description Validates the optional HR workflow status. @returns Status value when supplied. */
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => typeof value === 'string' ? value.trim().toUpperCase() : value)
  @IsEnum(AdminHrStatus)
  status?: AdminHrStatus = undefined;

  /** @description Validates the ISO 4217 currency identifier attached to monetary HR values. @returns ISO currency code. */
  @ApiProperty({ description: 'ISO 4217 currency code', example: 'INR' })
  @IsString()
  @AdminCoreIsISO4217CurrencyCode()
  currency!: string;
}
