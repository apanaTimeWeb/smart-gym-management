// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';

export class PtMarkSessionCompleteRequestDto extends CoreRequestDto {}
