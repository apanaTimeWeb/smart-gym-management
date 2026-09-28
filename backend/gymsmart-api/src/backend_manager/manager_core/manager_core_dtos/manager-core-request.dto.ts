// RESPONSIBILITY: Owns backend core API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import type { ManagerCoreJsonValue } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

export abstract class CoreRequestDto {
  [key: string]: ManagerCoreJsonValue;
}
