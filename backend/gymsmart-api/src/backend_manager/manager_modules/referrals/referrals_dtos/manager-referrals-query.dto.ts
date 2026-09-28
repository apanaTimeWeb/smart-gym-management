// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { PaginationQueryDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-pagination-query.dto';

import { ReferralStatus } from '@/backend_manager/manager_modules/referrals/manager-referrals.constants';

export class ManagerReferralsQueryDto extends PaginationQueryDto {
  @IsOptional() @IsString() search?: string;
  @IsOptional() @IsEnum(ReferralStatus) status?: ReferralStatus;
}

export { ManagerReferralsQueryDto as ReferralsQueryDto };
