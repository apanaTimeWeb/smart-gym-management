"use client";
import { Pencil, Trash2, Flame } from "lucide-react";
import { useAdminLibraryContext } from "@/app/admin/library/library_context/AdminLibraryContext";
export default function AdminDietGrid() {
  const { dietPlans, loading, openEditDiet, deleteDiet } = useAdminLibraryContext();
  const goalColor: Record<string, string> = { "Weight Loss": "bg-danger-bg text-danger", "Muscle Gain": "bg-success-bg text-success", "Maintenance": "bg-info-bg text-info" };
  if (loading) return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{Array.from({length:6}).map((_,i) => <div key={i} className="h-36 bg-card border border-border rounded-xl motion-safe:animate-pulse" />)}</div>;
  if (!dietPlans.length) return <div className="bg-card border border-border rounded-xl p-16 text-center text-text-secondary text-sm">No diet plans yet.</div>;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {dietPlans.map(d => (
        <div key={d.id} className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-bold text-text-primary">{d.name}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${goalColor[d.goal] ?? "bg-border text-text-secondary"}`}>{d.goal}</span>
          </div>
          <div className="flex items-center gap-2 mb-3 text-warning"><Flame className="w-4 h-4" /><span className="font-bold text-lg">{d.calories}</span><span className="text-xs text-text-secondary">kcal / day</span></div>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[{label:"Protein",value:d.protein,color:"text-success"},{label:"Carbs",value:d.carbs,color:"text-warning"},{label:"Fat",value:d.fat,color:"text-danger"}].map(m => (
              <div key={m.label} className="bg-bg-page rounded-lg p-2 text-center"><p className={`text-sm font-bold ${m.color}`}>{m.value}g</p><p className="text-xs text-text-secondary">{m.label}</p></div>
            ))}
          </div>
          <div className="flex gap-2 pt-3 border-t border-border">
            <button onClick={() => openEditDiet(d)} className="flex-1 text-xs py-1.5 rounded-lg bg-info-bg text-info hover:bg-info/20 transition-colors flex items-center justify-center gap-1"><Pencil className="w-3 h-3" /> Edit</button>
            <button onClick={() => void deleteDiet(d.id)} className="flex-1 text-xs py-1.5 rounded-lg bg-danger-bg text-danger hover:bg-danger/20 transition-colors flex items-center justify-center gap-1"><Trash2 className="w-3 h-3" /> Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
