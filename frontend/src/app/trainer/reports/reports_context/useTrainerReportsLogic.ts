// RESPONSIBILITY: Logic hook for the Trainer Reports module.
// DATA FLOW: TrainerReportsApi → useTrainerReportsLogic → TrainerReportsMain

import { useState } from 'react';
import type { ReportTabId } from '@/app/trainer/reports/reports_types/TrainerReportsTypes';

export const useTrainerReportsLogic = () => {
  const [activeTab, setActiveTab] = useState<ReportTabId>('members');

  return { activeTab, setActiveTab };
};
