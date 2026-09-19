// RESPONSIBILITY: Root layout for all /superadmin/* routes. Wraps pages in the SuperadminLayout shell (Sidebar + Header). Pure Server Component — no client hooks.
import type { ReactNode } from 'react';
import '@/app/superadmin/superadmin.css';
import SuperadminLayout from '@/app/superadmin/superadmin_layout/SuperadminLayout/SuperadminLayout';
import { SuperadminQueryProvider } from '@/app/superadmin/superadmin_layout/SuperadminQueryProvider';
import { SuperadminConfirmProvider } from '@/app/superadmin/superadmin_layout/SuperadminFeedback/SuperadminConfirmProvider';
import SuperadminMockBootstrap from '@/app/superadmin/superadmin_layout/SuperadminMockBootstrap';
export const metadata = {
    title: 'Master Control Panel | GymSmart SaaS',
    description: 'Global SaaS management and tenant administration platform',
};
export default function SaaSLayout({ children }: {
    children: ReactNode;
}) {
    return (<div className="superadmin-module bg-page text-primary min-h-screen">
      <SuperadminQueryProvider>
        <SuperadminMockBootstrap />
        <SuperadminConfirmProvider>
          <SuperadminLayout>{children}</SuperadminLayout>
        </SuperadminConfirmProvider>
      </SuperadminQueryProvider>
    </div>);
}
