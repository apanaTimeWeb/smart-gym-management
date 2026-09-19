// RESPONSIBILITY: Renders the Superadmin compliance readiness panel section.
'use client';
import { FileCheck2, Landmark, ShieldCheck } from 'lucide-react';
import type { SuperadminComplianceSectionProps } from '@/app/superadmin/compliance/compliance_types/SuperadminComplianceTypes';
export default function SuperadminComplianceReadinessPanel({ data }: SuperadminComplianceSectionProps) {
    return (<div className="rounded-xl border border-border bg-info-bg/20 p-4">
  <div className="flex gap-3">
    <FileCheck2 size={18} className="mt-0.5 text-info"/>
    <div>
      <p className="font-medium text-primary">
        Keep compliance records auditable.
      </p>
      <p className="mt-1 text-xs text-secondary">
        Tax configuration and registration data should stay aligned with your accounting and legal process.
      </p>
    </div>
    <ShieldCheck size={18} className="ml-auto  text-success"/>
  </div>
    </div>);
}
