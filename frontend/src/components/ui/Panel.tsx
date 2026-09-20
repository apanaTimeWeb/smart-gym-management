// RESPONSIBILITY: Renders a generic elevated Superadmin panel shell with an optional action slot.
import type { PanelProps } from '@/components/ui/SharedTypes';
export default function Panel({ title, description, children, action, className = "" }: PanelProps) {
    return (<section className={`rounded-xl border border-border bg-card p-5 shadow-card ${className}`}>
  <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
    <div>
      <h2 className="text-base font-semibold text-primary">
        {title}
      </h2>
      {description ? <p className="mt-1 text-xs text-secondary">
        {description}
      </p> : null}
    </div>
    {action}
  </div>
  {children}
    </section>);
}
