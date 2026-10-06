// RESPONSIBILITY: Renders the manager_hr route boundary (async) and delegates feature behavior to module-owned components/hooks; it does not own transport logic.
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { MANAGER_DEFAULT_HOME, MANAGER_NAV_GROUPS } from '@/app/frontend_manager/manager_navigation/ManagerNavigationConfig';


/** @description Renders the manager_hr route boundary. @dependencies Uses only the route's owning module and approved application infrastructure. @edge-case Provides documented loading, error, not-found, or route-entry behavior without introducing business logic outside the feature boundary. */
export default async function NotFound() {
  const t = await getTranslations('MANAGER_HR');
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-8 text-center">
      <h2 className="text-4xl font-bold text-primary mb-4">404</h2>
      <h3 className="text-2xl font-semibold mb-2">{t("TEXT_404_TITLE")}</h3>
      <p className="text-secondary mb-8 max-w-md">{t("TEXT_404_DESCRIPTION")}</p>
      <Link data-testid="manager_hr-not-found-home" href={MANAGER_NAV_GROUPS[0]?.items[0]?.href ?? MANAGER_DEFAULT_HOME} className="px-6 py-2 bg-primary text-on-primary rounded-lg hover:bg-primary-hover motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">
        {t("TEXT_404_RETURN")}
      </Link>
    </div>
  );
}
