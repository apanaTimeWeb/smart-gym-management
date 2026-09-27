// RESPONSIBILITY: Redacts sensitive fields from persisted audit projections without altering domain data.
// FLOW: Domain audit projection -> recursive sensitive-key detection -> safe audit projection.
import type { ManagerCoreJsonValue, ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

const SENSITIVE_KEYS = new Set([
  'password', 'pin', 'otp', 'token', 'refreshToken', 'accessToken', 'apiKey', 'aadhaar',
  'bankAccountNumber', 'cardNumber', 'medicalNotes', 'medicalHistory', 'biometricData',
  'sessionToken', 'authorization', 'authorizationHeader', 'phone', 'email',
]);

export function redactAuditValue(value: ManagerCoreJsonValue | null): ManagerCoreJsonValue | null {
  return value === null ? null : redactValue(value);
}

function redactValue(value: ManagerCoreJsonValue): ManagerCoreJsonValue {
  if (Array.isArray(value)) return value.map((item) => redactValue(item));
  if (typeof value !== 'object' || value === null) return value;
  const output: ManagerCoreJsonObject = {};
  for (const [key, nested] of Object.entries(value)) output[key] = SENSITIVE_KEYS.has(key) ? '[REDACTED]' : redactValue(nested);
  return output;
}
