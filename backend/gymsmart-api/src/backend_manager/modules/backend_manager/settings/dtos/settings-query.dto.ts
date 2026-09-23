// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { PaginationQueryDto } from '@/backend_manager/core/dtos/pagination-query.dto';

export class SettingsQueryDto extends PaginationQueryDto {
}
