// RESPONSIBILITY: Owns backend core request transformation/validation infrastructure.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class CoreInputSanitizationPipe implements PipeTransform {
  /**
   * @description Recursively trims strings and removes HTML/script tags before DTO validation.
   * @param value - Incoming body/query/param value.
   * @param _metadata - Nest argument metadata.
   * @returns Sanitized value with the original non-string structures preserved.
   */
  transform(value: unknown, _metadata: ArgumentMetadata): unknown {
    return this.sanitize(value);
  }

  /**
   * @description Recursively sanitizes object, array, and scalar values.
   * @param value - Value to sanitize.
   * @returns Sanitized value.
   */
  private sanitize(value: unknown): unknown {
    if (typeof value === 'string') return value.trim().replace(/<\/?[^>]+>/g, '');
    if (Array.isArray(value)) return value.map((item) => this.sanitize(item));
    if (typeof value === 'object' && value !== null) return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, this.sanitize(item)]));
    return value;
  }
}
