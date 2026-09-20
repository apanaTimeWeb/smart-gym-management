// RESPONSIBILITY: Renders the feature-owned empty terminal state inside the branch detail drawer.
export default function AdminBranchesDetailEmpty({ label }: { label: string }) {
  return <div className="rounded-xl border border-border bg-input px-4 py-10 text-center text-sm text-secondary">{label}</div>;
}


