import type { Metadata } from "next";
import { AdminWorkoutProvider } from "@/app/admin/workout/workout_context/AdminWorkoutContext";
import AdminWorkoutBanner from "@/app/admin/workout/workout_components/AdminWorkoutBanner/AdminWorkoutBanner";
import AdminWorkoutToolbar from "@/app/admin/workout/workout_components/AdminWorkoutToolbar/AdminWorkoutToolbar";
import AdminWorkoutContent from "@/app/admin/workout/workout_components/AdminWorkoutContent";
export const metadata: Metadata = { title: "Workout | Admin � GymSmart", description: "Manage workout plans and exercise library." };
export default function AdminWorkoutPage() {
  return <AdminWorkoutProvider><div className="min-h-full pb-10"><AdminWorkoutBanner /><div className="p-6 max-w-7xl mx-auto space-y-6"><AdminWorkoutToolbar /><AdminWorkoutContent /></div></div></AdminWorkoutProvider>;
}
