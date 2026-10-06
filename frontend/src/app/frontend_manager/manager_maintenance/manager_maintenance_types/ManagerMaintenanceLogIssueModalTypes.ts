/**
 * @description Defines the prop contract for the maintenance issue modal presentation component.
 * @dependencies Reuses the module-owned maintenance ticket payload type.
 * @edge-case Submission remains asynchronous so loading and unsaved-change guard behavior can be preserved by the component.
 */
import type { CreateMaintenanceTicketPayload } from '@/app/frontend_manager/manager_maintenance/manager_maintenance_types/ManagerMaintenanceTypes';

export interface ManagerMaintenanceLogIssueModalProps {
  onClose: () => void;
  onSubmit: (data: CreateMaintenanceTicketPayload) => Promise<boolean>;
}
