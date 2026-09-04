"use client";
import { Pencil, Trash2 } from "lucide-react";
import { useAdminLibraryContext } from "@/app/admin/library/library_context/AdminLibraryContext";
export default function AdminExerciseGrid() {
  const { exercises, loading, openEditExercise, deleteExercise } = useAdminLibraryContext();
  const diffColor: Record<string, string> = { Easy: "bg-success-bg text-success", Medium: "bg-warning-bg text-warning", Hard: "bg-danger-bg text-danger" };
  if (loading) return <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">{Array.from({length:8}).map((_,i) => <div key={i} className="h-32 bg-card border border-border rounded-xl motion-safe:animate-pulse" />)}</div>;
  if (!exercises.length) return <div className="bg-card border border-border rounded-xl p-16 text-center text-text-secondary text-sm">No exercises in library.</div>;
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {exercises.map(e => (
        <div key={e.id} className="bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-xl mb-3">??</div>
          <h3 className="font-semibold text-text-primary text-sm mb-1">{e.name}</h3>
          <p className="text-xs text-text-secondary mb-2">{e.muscle} � {e.equipment}</p>
          <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${diffColor[e.difficulty] ?? "bg-border text-text-secondary"}`}>{e.difficulty}</span>
          <div className="flex gap-2 mt-3 pt-3 border-t border-border">
            <button onClick={() => openEditExercise(e)} className="flex-1 text-xs py-1.5 rounded-lg bg-info-bg text-info hover:bg-info/20 transition-colors flex items-center justify-center gap-1"><Pencil className="w-3 h-3" /> Edit</button>
            <button onClick={() => void deleteExercise(e.id)} className="flex-1 text-xs py-1.5 rounded-lg bg-danger-bg text-danger hover:bg-danger/20 transition-colors flex items-center justify-center gap-1"><Trash2 className="w-3 h-3" /> Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
