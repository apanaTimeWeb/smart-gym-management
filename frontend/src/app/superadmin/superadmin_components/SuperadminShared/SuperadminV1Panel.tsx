// RESPONSIBILITY: Renders a generic elevated Superadmin panel shell with an optional action slot.
import type { SuperadminV1PanelProps } from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminV1SharedTypes';
export default function SuperadminV1Panel({ title, description, children, action, className = "" }: SuperadminV1PanelProps) {
    return (<section className={`rounded-xl border border-border bg-card p-5 shadow-sm ${className}`}>
  <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
    <div>
      <h2 className="text-base font-semibold text-foreground">
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
