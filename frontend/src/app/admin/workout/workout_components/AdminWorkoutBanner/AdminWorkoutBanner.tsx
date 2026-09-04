"use client";
import { Dumbbell } from "lucide-react";
import { useAdminWorkoutContext } from "@/app/admin/workout/workout_context/AdminWorkoutContext";
export default function AdminWorkoutBanner() {
  const { plans, exercises } = useAdminWorkoutContext();
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 border-b border-border p-8">
      <div className="absolute inset-0 opacity-5" style={{backgroundImage:"radial-gradient(circle at 20% 50%, #FACC15 0%, transparent 50%), radial-gradient(circle at 80% 20%, #FACC15 0%, transparent 40%)"}} />
      <div className="relative flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center">
          <Dumbbell className="w-7 h-7 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Workout Library</h1>
          <p className="text-zinc-400 mt-1 text-sm">{plans.length} workout programs � {exercises.length} exercises cataloged</p>
        </div>
      </div>
    </div>
  );
}
