import SuperadminLayout from '@/app/saas/superadmin_components/SuperadminLayout/SuperadminLayout';

export default function SaaSLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen">
      <SuperadminLayout>{children}</SuperadminLayout>
    </div>
  );
}

