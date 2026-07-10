import SuperadminLayout from '@/app/superadmin/superadmin_components/SuperadminLayout/SuperadminLayout';

export default function SaaSLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dark bg-[var(--bg-card)] text-[var(--text-primary)] min-h-screen">
      <SuperadminLayout>{children}</SuperadminLayout>
    </div>
  );
}




