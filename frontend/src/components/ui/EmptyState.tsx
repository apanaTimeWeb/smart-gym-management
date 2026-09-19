// RESPONSIBILITY: Renders the shared accessible empty-state presentation used by Superadmin-owned list sections.
import { Inbox } from 'lucide-react';
import type { EmptyStateProps } from '@/components/ui/SharedTypes';
export default function EmptyState({ title, description }: EmptyStateProps) {
    return (<div className="flex min-h-32 flex-col items-center justify-center rounded-lg border border-dashed border-border p-6 text-center">
      <Inbox size={18} strokeWidth={2} className="text-secondary" aria-hidden="true"/>
      <p className="mt-3 text-sm font-medium text-secondary">{title}</p>
      <p className="mt-1 max-w-md text-xs text-secondary">{description}</p>
    </div>);
}
