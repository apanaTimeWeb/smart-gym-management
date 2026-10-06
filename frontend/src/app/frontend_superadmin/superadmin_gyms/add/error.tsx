// RESPONSIBILITY: Renders/orchestrates error within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Framework route artifact for superadmin_gyms/add.
import { useTranslations } from 'next-intl';

/**
 * @description Renders AddGymError within the owning Superadmin feature module.
 * @dependencies Uses only dependencies declared in this module file and documented feature infrastructure.
 * @edge-case Preserves documented loading, empty, error, disabled, retry, and repeated-action behavior.
 */
export default function SuperadminAddGymError({ error, reset }: { error: Error; reset: () => void }) {
  const t = useTranslations('superadmin_gyms');
    return (
        <main className="flex min-h-72 items-center justify-center p-6" data-testid="superadmin_gyms-error-add-gym-error-error">
            <div className="max-w-md rounded-xl border border-border bg-danger-bg p-6 text-center">
                <h1 className="text-lg font-semibold text-danger">{t('ui.add_gym_page_could_not_be_loaded_db92ec80')}</h1>
                <p className="mt-2 text-sm text-secondary">{t('ui.please_retry_the_gym_setup_form_17fbb0bb')}</p>
                <button type="button" onClick={() => reset()} className="mt-4 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="superadmin_gyms-error-gyms-error-retry">
                    {t('ui.retry_6327b4e5')}</button>
            </div>
        </main>
    );
}
