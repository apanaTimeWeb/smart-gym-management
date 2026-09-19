// RESPONSIBILITY: Application configuration projection for the current Manager gym identity. No workflow/business logic.
import { ManagerEnvConfig } from '@/app/manager/manager_infrastructure/ManagerEnvConfig';

export const GYM_DETAILS = {
  name: ManagerEnvConfig.gymName,
  phone: ManagerEnvConfig.gymPhone,
  gstNumber: ManagerEnvConfig.gymGstNumber,
  address: ManagerEnvConfig.gymAddress };
