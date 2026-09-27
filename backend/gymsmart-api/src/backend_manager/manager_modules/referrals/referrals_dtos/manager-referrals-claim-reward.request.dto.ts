// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { CoreRequestDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-request.dto';

export class ManagerReferralsClaimRewardRequestDto extends CoreRequestDto {}

export { ManagerReferralsClaimRewardRequestDto as ReferralsClaimRewardRequestDto };
