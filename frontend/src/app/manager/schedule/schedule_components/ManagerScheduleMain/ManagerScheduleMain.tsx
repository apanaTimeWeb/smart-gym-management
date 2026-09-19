'use client';
// RESPONSIBILITY: Root client orchestrator for the Schedule module. Owns layout, toolbar, view toggle, and renders sub-components.
import { ManagerScheduleContent } from '@/app/manager/schedule/schedule_components/ManagerScheduleMain/ManagerScheduleContent/ManagerScheduleContent';

export default function ManagerScheduleMain() {
  return <ManagerScheduleContent />;
}
