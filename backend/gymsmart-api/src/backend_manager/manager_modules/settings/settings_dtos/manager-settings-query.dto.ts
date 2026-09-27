// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { PaginationQueryDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-pagination-query.dto';

export class ManagerSettingsQueryDto extends PaginationQueryDto {
}

export { ManagerSettingsQueryDto as SettingsQueryDto };
