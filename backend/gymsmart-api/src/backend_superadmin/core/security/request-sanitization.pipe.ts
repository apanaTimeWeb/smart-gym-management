// RESPONSIBILITY: Removes executable HTML/script payloads and normalizes email/phone strings before DTO validation.
// FLOW: HTTP payload -> RequestSanitizationPipe -> ValidationPipe -> Controller -> DTO/service.
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

const HTML_TAG_PATTERN = /<\/?[a-z][^>]*>/gi;
const SCRIPT_PROTOCOL_PATTERN = /(javascript:|data:text\/html|vbscript:)/gi;
const EMAIL_KEYS = new Set(['email', 'adminEmail', 'ownerEmail']);
const PHONE_KEY_PATTERN = /(?:phone|mobile|contactNumber|whatsapp)/i;

@Injectable()
export class RequestSanitizationPipe implements PipeTransform {
  /** Sanitizes request strings recursively while preserving object/array shape. */
  transform(value: unknown, _metadata: ArgumentMetadata): unknown { return this.sanitizeValue(value, ''); }

  /** Recursively sanitizes records and arrays and applies key-aware canonicalization. */
  private sanitizeValue(value: unknown, key: string): unknown {
    if (typeof value === 'string') return this.normalizeString(value, key);
    if (Array.isArray(value)) return value.map((item) => this.sanitizeValue(item, key));
    if (!value || typeof value !== 'object') return value;
    return Object.fromEntries(Object.entries(value).map(([childKey, item]) => [childKey, this.sanitizeValue(item, childKey)]));
  }

  /** Applies script stripping, whitespace normalization, email normalization, and phone canonicalization. */
  private normalizeString(value: string, key: string): string {
    const sanitized = value.replace(SCRIPT_PROTOCOL_PATTERN, '').replace(HTML_TAG_PATTERN, '').trim();
    if (EMAIL_KEYS.has(key) || /email/i.test(key)) return sanitized.toLowerCase();
    if (PHONE_KEY_PATTERN.test(key)) return sanitized.replace(/[^0-9+]/g, '');
    return sanitized;
  }
}
