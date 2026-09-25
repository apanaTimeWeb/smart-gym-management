// RESPONSIBILITY: Registers the application's global nestjs-i18n runtime against merged build-time locale bundles.
// FLOW: SuperadminCoreModule -> I18nModule -> superadmin_core_i18n/_locales/{lang}/errors.json -> localized exception messages.
import { join } from 'node:path';
import { Module } from '@nestjs/common';
import { I18nModule, I18nJsonLoader } from 'nestjs-i18n';

/**
 * Primary Intent: Defines SuperadminCoreI18nModule as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Module({
  imports: [I18nModule.forRoot({ fallbackLanguage: 'en', loader: I18nJsonLoader, loaderOptions: { path: join(__dirname, './_locales') } })],
  exports: [I18nModule],
})
/**
 * Primary Intent: Defines SuperadminCoreI18nModule, the focused backend component for its owning feature or infrastructure boundary.
 * Edge Cases: Preserve validation/tenant/transaction/authorization invariants. Side-Effects: Only documented effects are permitted.
 * AI-Note: Keep this class isolated, dependency-injected, explicitly typed, and aligned with the frozen contract.
 */
export class SuperadminCoreI18nModule {}
