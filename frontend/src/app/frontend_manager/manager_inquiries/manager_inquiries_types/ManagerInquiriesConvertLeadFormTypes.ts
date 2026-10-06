import type { ConvertLeadFormValues } from '@/app/frontend_manager/manager_inquiries/manager_inquiries_types/ManagerInquiriesFormTypes';
import type { PlanSnapshot } from '@/app/frontend_manager/manager_inquiries/manager_inquiries_types/ManagerInquiriesPlanSnapshotTypes';
import type { UseFormReturn } from 'react-hook-form';


export interface ManagerInquiriesConvertLeadFormProps {
  useFormReturn: UseFormReturn<ConvertLeadFormValues>;
  plans: PlanSnapshot[];
  watchPlanId?: string;
  watchBillingCycle?: string;
  watchCustomDays?: number;
}
