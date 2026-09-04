"use client";
import { Pencil, Trash2 } from "lucide-react";
import { useAdminWorkoutContext } from "@/app/admin/workout/workout_context/AdminWorkoutContext";
export default function AdminExerciseTable() {
  const { exercises, loading, search, openEditExercise, deleteExercise } = useAdminWorkoutContext();
  const filtered = exercises.filter(e => !search || e.name.toLowerCase().includes(search.toLowerCase()) || e.muscle.toLowerCase().includes(search.toLowerCase()));
  const diffColor: Record<string, string> = { Easy: "bg-success-bg text-success", Medium: "bg-warning-bg text-warning", Hard: "bg-danger-bg text-danger" };
  if (loading) return <div className="space-y-2">{Array.from({length:5}).map((_,i) => <div key={i} className="h-12 bg-card border border-border rounded-xl motion-safe:animate-pulse" />)}</div>;
  if (!filtered.length) return <div className="bg-card border border-border rounded-xl p-16 text-center text-text-secondary text-sm">No exercises found.</div>;
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border bg-bg-page">{["Exercise","Muscle","Equipment","Difficulty","Sets � Reps","Actions"].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wide whitespace-nowrap">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-border">
            {filtered.map(e => (
              <tr key={e.id} className="hover:bg-bg-overlay transition-colors">
                <td className="px-4 py-3 font-semibold text-text-primary">{e.name}</td>
                <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">{e.muscle}</span></td>
                <td className="px-4 py-3 text-text-secondary text-xs">{e.equipment}</td>
                <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full font-bold ${diffColor[e.difficulty] ?? "bg-border text-text-secondary"}`}>{e.difficulty}</span></td>
                <td className="px-4 py-3 text-text-secondary text-xs font-mono">{e.sets ?? 3} � {e.reps ?? 12}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-1.5">
                    <button onClick={() => openEditExercise(e)} className="p-1.5 rounded-lg bg-info-bg text-info hover:bg-info/20 transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                    <button onClick={() => void deleteExercise(e.id)} className="p-1.5 rounded-lg bg-danger-bg text-danger hover:bg-danger/20 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
