// RESPONSIBILITY: Renders the Superadmin tickets V1 Support categories view.
'use client';
import Panel from '@/components/ui/Panel';
import type { SuperadminTicketsV1SectionProps } from '@/app/superadmin/tickets/tickets_types/SuperadminTicketsV1Types.ts';
export default function SuperadminTicketsV1SupportCategoriesPanel({ data }: SuperadminTicketsV1SectionProps) {
    return <Panel title="Support categories" description="Where tenant support load is coming from.">
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
