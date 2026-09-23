// RESPONSIBILITY: Registers the application's global nestjs-i18n runtime against merged build-time locale bundles.
// FLOW: SuperadminCoreModule -> I18nModule -> dist/i18n/{lang}.json -> localized exception messages.
import { join } from 'node:path';
import { Module } from '@nestjs/common';
import { I18nModule, I18nJsonLoader } from 'nestjs-i18n';

@Module({
  imports: [I18nModule.forRoot({ fallbackLanguage: 'en', loader: I18nJsonLoader, loaderOptions: { path: join(__dirname, '../../i18n') } })],
  exports: [I18nModule],
})
export class SuperadminBackendSuperadminI18nModule {}
