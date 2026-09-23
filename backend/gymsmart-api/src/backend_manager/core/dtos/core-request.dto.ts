// RESPONSIBILITY: Owns backend core API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import type { CoreJsonValue } from '@/backend_manager/core/types/json-value.types';

export abstract class CoreRequestDto {
  }
