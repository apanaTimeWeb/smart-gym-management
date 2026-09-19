// RESPONSIBILITY: Renders the Superadmin compliance page header section.
'use client';
import type { SuperadminComplianceSectionProps } from '@/app/superadmin/compliance/compliance_types/SuperadminComplianceTypes';
export default function SuperadminCompliancePageHeader({ data }: SuperadminComplianceSectionProps) {
    return (<div>
  <h1 className="text-2xl font-bold text-primary">
    Tax & Compliance
  </h1>
  <p className="mt-1 text-sm text-secondary">
    Registration coverage, tax configuration, and compliance document readiness.
  </p>
    </div>);
}
