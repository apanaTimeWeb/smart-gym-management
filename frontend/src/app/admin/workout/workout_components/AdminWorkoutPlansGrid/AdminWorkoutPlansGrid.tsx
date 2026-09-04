"use client";
import { Pencil, Trash2, Clock, Dumbbell } from "lucide-react";
import { useAdminWorkoutContext } from "@/app/admin/workout/workout_context/AdminWorkoutContext";
export default function AdminWorkoutPlansGrid() {
  const { plans, loading, search, openEditWorkout, deleteWorkout } = useAdminWorkoutContext();
  const filtered = plans.filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()));
  const levelColor: Record<string, string> = { Beginner: "bg-success-bg text-success", Intermediate: "bg-warning-bg text-warning", Advanced: "bg-danger-bg text-danger" };
  if (loading) return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{Array.from({length:6}).map((_,i) => <div key={i} className="h-36 bg-card border border-border rounded-xl motion-safe:animate-pulse" />)}</div>;
  if (!filtered.length) return <div className="bg-card border border-border rounded-xl p-16 text-center text-text-secondary text-sm">No workout plans found.</div>;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filtered.map(p => (
        <div key={p.id} className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-bold text-text-primary leading-tight">{p.name}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${levelColor[p.level] ?? "bg-border text-text-secondary"}`}>{p.level}</span>
          </div>
          {p.description && <p className="text-xs text-text-secondary mb-3 line-clamp-2">{p.description}</p>}
          <div className="flex items-center gap-4 text-xs text-text-secondary mb-3">
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{p.duration} min</span>
            <span className="flex items-center gap-1"><Dumbbell className="w-3.5 h-3.5" />{p.exercises.length} exercises</span>
          </div>
          <div className="flex gap-2 flex-wrap mb-3">{p.tags.slice(0,3).map(tag => <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{tag}</span>)}</div>
          <div className="flex gap-2 pt-3 border-t border-border">
            <button onClick={() => openEditWorkout(p)} className="flex-1 text-xs py-1.5 rounded-lg bg-info-bg text-info hover:bg-info/20 transition-colors flex items-center justify-center gap-1"><Pencil className="w-3 h-3" /> Edit</button>
            <button onClick={() => void deleteWorkout(p.id)} className="flex-1 text-xs py-1.5 rounded-lg bg-danger-bg text-danger hover:bg-danger/20 transition-colors flex items-center justify-center gap-1"><Trash2 className="w-3 h-3" /> Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
