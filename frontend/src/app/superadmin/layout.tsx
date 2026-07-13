// RESPONSIBILITY: layout.tsx handles the logic and UI for its corresponding feature.
import './superadmin.css';
import SuperadminLayout from '@/app/superadmin/superadmin_components/SuperadminLayout/SuperadminLayout';

export const metadata = {
  title: 'Master Control Panel | GymSmart SaaS',
  description: 'Global SaaS management and tenant administration platform',
};

export default function SaaSLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="superadmin-module bg-background text-foreground min-h-screen">
      <SuperadminLayout>{children}</SuperadminLayout>
    </div>
  );
}




