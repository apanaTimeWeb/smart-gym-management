"use client";
import { Search, PlusCircle } from "lucide-react";
import { useAdminWorkoutContext } from "@/app/admin/workout/workout_context/AdminWorkoutContext";
import { ADMIN_WORKOUT_TABS } from "@/app/admin/workout/workout_utils/AdminWorkoutSharedConstants";
export default function AdminWorkoutToolbar() {
  const { activeTab, setActiveTab, search, setSearch, openAddWorkout, openAddExercise } = useAdminWorkoutContext();
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-card border border-border rounded-xl p-4">
      <div className="flex gap-1 bg-bg-page p-1 rounded-lg">
        {ADMIN_WORKOUT_TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as "plans" | "exercises")}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === tab.id ? "bg-primary text-black shadow-sm" : "text-text-secondary hover:text-text-primary"}`}>{tab.label}</button>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input id="admin-workout-search" type="search" placeholder="Search�" value={search} onChange={e => setSearch(e.target.value)} className="pl-9 pr-4 py-2 text-sm bg-bg-input border border-border rounded-lg text-text-primary focus:outline-none focus:border-border-focus" />
        </div>
        <button id="admin-workout-add-btn" onClick={activeTab === "plans" ? openAddWorkout : openAddExercise}
          className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-black font-semibold px-4 py-2 rounded-lg text-sm transition-colors"><PlusCircle className="w-4 h-4" /> Add {activeTab === "plans" ? "Plan" : "Exercise"}
        </button>
      </div>
    </div>
  );
}
