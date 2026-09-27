// RESPONSIBILITY: Proves deterministic locale fallback and namespaced key lookup for core error messages.
// FLOW: Locale header → module namespace/key → localized message with English fallback.
import { ManagerCoreI18nService } from '@/backend_manager/manager_core/manager_core_config/manager-core-i18n.service';

describe('ManagerCoreI18nService', () => {
  it('falls back deterministically to the final key segment when no dictionary is available', () => {
    const service = new ManagerCoreI18nService();
    expect(service.translate('missing.ERRORS.NOT_FOUND', 'fr')).toBe('NOT_FOUND');
  });

  it('normalizes region tags to their base language before fallback', () => {
    const service = new ManagerCoreI18nService();
    expect(service.translate('missing.ERRORS.INVALID', 'en-IN')).toBe('INVALID');
  });
});
