"use client";
import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { adminWorkoutApi } from "@/app/admin/workout/workout_api/admin_workout_api";
import type { AdminWorkout, AdminExercise } from "@/app/admin/workout/workout_types/admin_workout_types";
import { logger } from "@/lib/logger";
import toast from "react-hot-toast";

interface AdminWorkoutContextType {
  plans: AdminWorkout[]; exercises: AdminExercise[]; loading: boolean;
  activeTab: "plans" | "exercises"; setActiveTab: (t: "plans" | "exercises") => void;
  search: string; setSearch: (s: string) => void;
  showWorkoutModal: boolean; editWorkout: AdminWorkout | null;
  showExerciseModal: boolean; editExercise: AdminExercise | null;
  openAddWorkout: () => void; openEditWorkout: (w: AdminWorkout) => void; closeWorkoutModal: () => void;
  openAddExercise: () => void; openEditExercise: (e: AdminExercise) => void; closeExerciseModal: () => void;
  saveWorkout: (data: Partial<AdminWorkout>) => Promise<void>; deleteWorkout: (id: string) => Promise<void>;
  saveExercise: (data: Partial<AdminExercise>) => Promise<void>; deleteExercise: (id: string) => Promise<void>;
}
const Ctx = createContext<AdminWorkoutContextType | null>(null);

export function AdminWorkoutProvider({ children }: { children: ReactNode }) {
  const [plans, setPlans] = useState<AdminWorkout[]>([]);
  const [exercises, setExercises] = useState<AdminExercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"plans" | "exercises">("plans");
  const [search, setSearch] = useState("");
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [editWorkout, setEditWorkout] = useState<AdminWorkout | null>(null);
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [editExercise, setEditExercise] = useState<AdminExercise | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [p, e] = await Promise.all([adminWorkoutApi.getPlans(), adminWorkoutApi.getExercises()]);
      if (p.success) setPlans(p.data);
      if (e.success) setExercises(e.data);
    } catch (err) { logger.error("[AdminWorkout] load:", err); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { void load(); }, [load]);

  const openAddWorkout = () => { setEditWorkout(null); setShowWorkoutModal(true); };
  const openEditWorkout = (w: AdminWorkout) => { setEditWorkout(w); setShowWorkoutModal(true); };
  const closeWorkoutModal = () => { setShowWorkoutModal(false); setEditWorkout(null); };
  const openAddExercise = () => { setEditExercise(null); setShowExerciseModal(true); };
  const openEditExercise = (e: AdminExercise) => { setEditExercise(e); setShowExerciseModal(true); };
  const closeExerciseModal = () => { setShowExerciseModal(false); setEditExercise(null); };

  const saveWorkout = async (data: Partial<AdminWorkout>) => {
    try {
      if (editWorkout) await adminWorkoutApi.updatePlan(editWorkout.id, data); else await adminWorkoutApi.createPlan(data);
      toast.success(editWorkout ? "Workout updated" : "Workout added");
      closeWorkoutModal(); void load();
    } catch (e) { logger.error("[AdminWorkout] saveWorkout:", e); }
  };
  const deleteWorkout = async (id: string) => {
    try { await adminWorkoutApi.deletePlan(id); toast.success("Workout deleted"); void load(); }
    catch (e) { logger.error("[AdminWorkout] deleteWorkout:", e); }
  };
  const saveExercise = async (data: Partial<AdminExercise>) => {
    try {
      if (editExercise) await adminWorkoutApi.updateExercise(editExercise.id, data); else await adminWorkoutApi.createExercise(data);
      toast.success(editExercise ? "Exercise updated" : "Exercise added");
      closeExerciseModal(); void load();
    } catch (e) { logger.error("[AdminWorkout] saveExercise:", e); }
  };
  const deleteExercise = async (id: string) => {
    try { await adminWorkoutApi.deleteExercise(id); toast.success("Exercise deleted"); void load(); }
    catch (e) { logger.error("[AdminWorkout] deleteExercise:", e); }
  };

  return <Ctx.Provider value={{ plans, exercises, loading, activeTab, setActiveTab, search, setSearch, showWorkoutModal, editWorkout, showExerciseModal, editExercise, openAddWorkout, openEditWorkout, closeWorkoutModal, openAddExercise, openEditExercise, closeExerciseModal, saveWorkout, deleteWorkout, saveExercise, deleteExercise }}>{children}</Ctx.Provider>;
}
export function useAdminWorkoutContext() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAdminWorkoutContext must be within AdminWorkoutProvider");
  return ctx;
}
