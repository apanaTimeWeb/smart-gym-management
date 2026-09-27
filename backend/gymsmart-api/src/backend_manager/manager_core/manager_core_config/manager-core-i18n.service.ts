// RESPONSIBILITY: Resolves Manager backend translation keys from module-co-located locale dictionaries.
// FLOW: Accept-Language/request locale -> module namespace -> locale file -> translated message with English fallback.
import { Injectable } from '@nestjs/common';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

@Injectable()
export class ManagerCoreI18nService {
  private readonly cache = new Map<string, Record<string, unknown>>();

  /** @description Resolves a module-scoped translation key using the request locale with English fallback. @param key - Namespaced key such as members.ERRORS.NOT_FOUND. @param locale - Requested locale from Accept-Language. @returns Localized message or the final key segment. */
  translate(key: string, locale: string): string {
    const parts = key.split('.');
    const module = parts.shift() ?? 'core';
    const path = parts;
    for (const candidate of this.locales(locale)) {
      const value = this.readModuleLocale(module, candidate, path);
      if (typeof value === 'string') return value;
    }
    return path.at(-1) ?? key;
  }

  /** @description Generates a bounded locale fallback order from the Accept-Language value. @param locale - Raw locale header. @returns Ordered locale codes. */
  private locales(locale: string): string[] {
    const normalized = String(locale || 'en').split(',')[0].trim().split('-')[0].toLowerCase();
    return normalized === 'en' ? ['en'] : [normalized, 'en'];
  }

  /** @description Loads and caches one module-language error dictionary and resolves a nested key path. @param module - Feature namespace. @param locale - Locale code. @param path - Nested JSON key path. @returns Resolved translation value or undefined. */
  private readModuleLocale(module: string, locale: string, path: string[]): unknown {
    const dictionary = this.loadDictionary(module, locale);
    if (!dictionary) return undefined;
    return this.resolvePath(dictionary, path);
  }

  /** @description Loads one module-language dictionary from module-local or core-local locale storage and caches it. @param module - Feature namespace. @param locale - Locale code. @returns Parsed dictionary or undefined. */
  private loadDictionary(module: string, locale: string): Record<string, unknown> | undefined {
    const cacheKey = `${module}:${locale}`;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;
    const candidates = [
      join(process.cwd(), 'backend_manager', 'manager_modules', module, '_locales', locale, 'errors.json'),
      join(process.cwd(), 'backend_manager', 'core', '_locales', locale, 'errors.json'),
    ];
    const file = candidates.find((candidate) => existsSync(candidate));
    if (!file) return undefined;
    const dictionary = JSON.parse(readFileSync(file, 'utf8')) as Record<string, unknown>;
    this.cache.set(cacheKey, dictionary);
    return dictionary;
  }

  /** @description Resolves a nested translation path from a parsed dictionary. @param dictionary - Locale dictionary. @param path - Nested JSON key path. @returns Value at path or undefined. */
  private resolvePath(dictionary: Record<string, unknown>, path: string[]): unknown {
    let current: unknown = dictionary;
    for (const segment of path) {
      if (typeof current !== 'object' || current === null) return undefined;
      current = (current as Record<string, unknown>)[segment];
    }
    return current;
  }

}
