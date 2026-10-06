// RESPONSIBILITY: Renders ManagerEmptyState's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
import type { ManagerEmptyStateProps } from '@/components/ui/manager_empty_state/ManagerEmptyStateTypes';



/** @description Reusable empty state component for tables and lists across the manager module. @dependencies Local dependencies are owned by this feature module (1 documented module/import dependencies).. @edge-case Preserves empty state. */
export default function ManagerEmptyState({ icon, title, subtitle, dataTestId }: ManagerEmptyStateProps) {
  return (
    <div data-testid={dataTestId} className="flex flex-col items-center justify-center py-16 px-4 text-center motion-safe:animate-in motion-safe:fade-in motion-safe:duration-slow">
      <div className="w-20 h-20 bg-primary-subtle rounded-full flex items-center justify-center mb-5 text-secondary shadow-card border border-border">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-primary tracking-tight mb-2">{title}</h3>
      <p className="text-sm text-secondary max-w-sm leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
}
