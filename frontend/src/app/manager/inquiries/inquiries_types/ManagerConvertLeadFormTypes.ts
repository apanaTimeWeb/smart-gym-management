// RESPONSIBILITY: Type definitions for the owning Manager UI component.
import type { ConvertLeadFormValues } from '@/app/manager/inquiries/inquiries_types/ManagerInquiriesFormTypes';
import type { PlanSnapshot } from '@/app/manager/inquiries/inquiries_types/ManagerInquiriesPlanSnapshotTypes';
import type { UseFormReturn } from 'react-hook-form';


export interface ManagerConvertLeadFormProps {
  useFormReturn: UseFormReturn<ConvertLeadFormValues>;
  plans: PlanSnapshot[];
  watchPlanId?: string;
  watchBillingCycle?: string;
  watchCustomDays?: number;
}
