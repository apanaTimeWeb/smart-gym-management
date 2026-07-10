import SuperadminLayout from '@/app/superadmin/superadmin_components/SuperadminLayout/SuperadminLayout';

export const metadata = {
  title: 'Master Control Panel | GymSmart SaaS',
  description: 'Global SaaS management and tenant administration platform',
};

export default function SaaSLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[var(--bg-page)] text-[var(--text-primary)] min-h-screen">
      <SuperadminLayout>{children}</SuperadminLayout>
    </div>
  );
}




