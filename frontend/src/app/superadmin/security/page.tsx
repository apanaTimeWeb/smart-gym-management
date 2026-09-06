import { Metadata } from 'next';
import SuperadminSecurityClient from './security_components/SuperadminSecurityClient';

export const metadata: Metadata = {
  title: 'Security & WAF | Superadmin',
  description: 'Manage web application firewall and monitor security threats across all tenants.',
};

export default function SuperadminSecurityPage() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <SuperadminSecurityClient />
    </div>
  );
}
