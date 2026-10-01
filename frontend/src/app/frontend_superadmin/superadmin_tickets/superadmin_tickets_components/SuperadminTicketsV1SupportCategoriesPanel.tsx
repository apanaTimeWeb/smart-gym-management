'use client';
// RESPONSIBILITY: Renders the Superadmin tickets V1 Support categories view.
import { useTranslations } from 'next-intl';

import Panel from '@/components/ui/Panel';

import type { SuperadminTicketsV1SectionProps } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_types/SuperadminTicketsV1Types';

/**
 * @description Renders the Superadmin tickets V1 Support categories view.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminTicketsV1SupportCategoriesPanel({ data }: SuperadminTicketsV1SectionProps) {
  const t = useTranslations('superadmin_tickets');
    return <Panel title={t('ui.support_categories_c99acfa')} description={t('ui.where_tenant_support_load_is_coming_from_3f0861e')}>
  <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
    {data.categories.map((c) => <div key={c.name} className="rounded-lg border border-border p-3">
      <p className="text-xs text-secondary">
        {c.name}
      </p>
      <p className="mt-1 text-2xl font-bold text-primary">
        {c.count}
      </p>
    </div>)}
  </div>
    </Panel>;
}
