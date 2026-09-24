// RESPONSIBILITY: Removes executable HTML/script payloads and normalizes email/phone strings before DTO validation.
// FLOW: HTTP payload -> SuperadminCoreRequestSanitizationPipe -> ValidationPipe -> Controller -> DTO/service.
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

const HTML_TAG_PATTERN = /<\/?[a-z][^>]*>/gi;
const SCRIPT_PROTOCOL_PATTERN = /(javascript:|data:text\/html|vbscript:)/gi;
const EMAIL_KEYS = new Set(['email', 'adminEmail', 'ownerEmail']);
const PHONE_KEY_PATTERN = /(?:phone|mobile|contactNumber|whatsapp)/i;

/**
 * Primary Intent: Defines SuperadminCoreRequestSanitizationPipe as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminCoreRequestSanitizationPipe implements PipeTransform {
  /**
 * Primary Intent: Executes the transform use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  transform(value: unknown, _metadata: ArgumentMetadata): unknown { return this.sanitizeValue(value, ''); }

  /**
 * Primary Intent: Executes the sanitizeValue use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private sanitizeValue(value: unknown, key: string): unknown {
    if (typeof value === 'string') return this.normalizeString(value, key);
    if (Array.isArray(value)) return value.map((item) => this.sanitizeValue(item, key));
    if (!value || typeof value !== 'object') return value;
    return Object.fromEntries(Object.entries(value).map(([childKey, item]) => [childKey, this.sanitizeValue(item, childKey)]));
  }

  /**
 * Primary Intent: Executes the normalizeString use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private normalizeString(value: string, key: string): string {
    const sanitized = value.replace(SCRIPT_PROTOCOL_PATTERN, '').replace(HTML_TAG_PATTERN, '').trim();
    if (EMAIL_KEYS.has(key) || /email/i.test(key)) return sanitized.toLowerCase();
    if (PHONE_KEY_PATTERN.test(key)) return sanitized.replace(/[^0-9+]/g, '');
    return sanitized;
  }
}
