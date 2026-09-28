// RESPONSIBILITY: Converts validated API monetary integer fields into explicit minor-unit persistence columns without floating-point arithmetic.
// FLOW: Feature repository -> helper with allowlisted fields -> integer minor values + currency metadata -> ORM entity.
import { HttpStatus } from '@nestjs/common';
import { ManagerCoreBusinessException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-business.exception';
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

/** @description Extracts integer minor-unit fields from an API payload and removes them from the JSON payload. @param data - API payload. @param fields - Allowlisted monetary field names. @param defaultCurrency - Fallback ISO 4217 code. @returns Sanitized payload, currency and minor-unit map. @throws ManagerCoreBusinessException when a monetary value is not a safe non-negative integer. */
export function extractMinorMoneyFields<T extends readonly string[]>(data: ManagerCoreJsonObject, fields: T, defaultCurrency: string): { payload: ManagerCoreJsonObject; currency: string; minors: Record<T[number], string | null> } {
  const copy: ManagerCoreJsonObject = { ...data };
  const currency = typeof copy.currency === 'string' ? copy.currency.toUpperCase() : defaultCurrency;
  delete copy.currency;
  const minors = {} as Record<T[number], string | null>;
  for (const field of fields) {
    const value = copy[field];
    if (value === undefined) { minors[field as T[number]] = null; continue; }
    const amount = Number(value);
    if (!Number.isSafeInteger(amount) || amount < 0) throw new ManagerCoreBusinessException('core.ERRORS.MONEY_INVALID', 'CORE.MONEY.INVALID', HttpStatus.BAD_REQUEST);
    minors[field as T[number]] = String(amount);
    delete copy[field];
  }
  return { payload: copy, currency, minors };
}
