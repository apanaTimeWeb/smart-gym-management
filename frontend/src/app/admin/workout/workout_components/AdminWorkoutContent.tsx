"use client";
import { useAdminWorkoutContext } from "@/app/admin/workout/workout_context/AdminWorkoutContext";
import AdminWorkoutPlansGrid from "@/app/admin/workout/workout_components/AdminWorkoutPlansGrid/AdminWorkoutPlansGrid";
import AdminExerciseTable from "@/app/admin/workout/workout_components/AdminExerciseTable/AdminExerciseTable";
export default function AdminWorkoutContent() {
  const { activeTab } = useAdminWorkoutContext();
  return activeTab === "plans" ? <AdminWorkoutPlansGrid /> : <AdminExerciseTable />;
}
