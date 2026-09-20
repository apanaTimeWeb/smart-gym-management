// RESPONSIBILITY: Entry component for the Workout Library module. Wraps the UI in the hook-based state facade and handles page layout.
'use client';
import { ManagerWorkoutContent } from '@/app/manager/workout/workout_components/ManagerWorkoutMain/ManagerWorkoutContent/ManagerWorkoutContent';

export default function ManagerWorkoutMain() {
  return <ManagerWorkoutContent />;
}
