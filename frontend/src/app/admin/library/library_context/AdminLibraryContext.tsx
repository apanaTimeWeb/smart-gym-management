"use client";
import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { adminLibraryApi } from "@/app/admin/library/library_api/admin_library_api";
import type { AdminDietPlan, AdminLibraryExercise } from "@/app/admin/library/library_types/admin_library_types";
import { logger } from "@/lib/logger"; import toast from "react-hot-toast";

interface AdminLibraryContextType {
  dietPlans: AdminDietPlan[]; exercises: AdminLibraryExercise[]; loading: boolean;
  activeTab: "exercises" | "diet"; setActiveTab: (t: "exercises" | "diet") => void;
  showDietModal: boolean; editDiet: AdminDietPlan | null;
  showExerciseModal: boolean; editExercise: AdminLibraryExercise | null;
  openAddDiet: () => void; openEditDiet: (d: AdminDietPlan) => void; closeDietModal: () => void;
  openAddExercise: () => void; openEditExercise: (e: AdminLibraryExercise) => void; closeExerciseModal: () => void;
  saveDiet: (data: Partial<AdminDietPlan>) => Promise<void>; deleteDiet: (id: string) => Promise<void>;
  saveExercise: (data: Partial<AdminLibraryExercise>) => Promise<void>; deleteExercise: (id: string) => Promise<void>;
}
const Ctx = createContext<AdminLibraryContextType | null>(null);

export function AdminLibraryProvider({ children }: { children: ReactNode }) {
  const [dietPlans, setDietPlans] = useState<AdminDietPlan[]>([]);
  const [exercises, setExercises] = useState<AdminLibraryExercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"exercises" | "diet">("exercises");
  const [showDietModal, setShowDietModal] = useState(false);
  const [editDiet, setEditDiet] = useState<AdminDietPlan | null>(null);
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [editExercise, setEditExercise] = useState<AdminLibraryExercise | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [d, e] = await Promise.all([adminLibraryApi.getDietPlans(), adminLibraryApi.getExercises()]);
      if (d.success) setDietPlans(d.data);
      if (e.success) setExercises(e.data);
    } catch (err) { logger.error("[AdminLibrary] load:", err); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { void load(); }, [load]);

  const openAddDiet = () => { setEditDiet(null); setShowDietModal(true); };
  const openEditDiet = (d: AdminDietPlan) => { setEditDiet(d); setShowDietModal(true); };
  const closeDietModal = () => { setShowDietModal(false); setEditDiet(null); };
  const openAddExercise = () => { setEditExercise(null); setShowExerciseModal(true); };
  const openEditExercise = (e: AdminLibraryExercise) => { setEditExercise(e); setShowExerciseModal(true); };
  const closeExerciseModal = () => { setShowExerciseModal(false); setEditExercise(null); };

  const saveDiet = async (data: Partial<AdminDietPlan>) => {
    try { if (editDiet) await adminLibraryApi.updateDiet(editDiet.id, data); else await adminLibraryApi.createDiet(data); toast.success("Diet plan saved"); closeDietModal(); void load(); }
    catch (e) { logger.error("[AdminLibrary] saveDiet:", e); }
  };
  const deleteDiet = async (id: string) => {
    try { await adminLibraryApi.deleteDiet(id); toast.success("Diet plan deleted"); void load(); }
    catch (e) { logger.error("[AdminLibrary] deleteDiet:", e); }
  };
  const saveExercise = async (data: Partial<AdminLibraryExercise>) => {
    try { if (editExercise) await adminLibraryApi.updateExercise(editExercise.id, data); else await adminLibraryApi.createExercise(data); toast.success("Exercise saved"); closeExerciseModal(); void load(); }
    catch (e) { logger.error("[AdminLibrary] saveExercise:", e); }
  };
  const deleteExercise = async (id: string) => {
    try { await adminLibraryApi.deleteExercise(id); toast.success("Exercise deleted"); void load(); }
    catch (e) { logger.error("[AdminLibrary] deleteExercise:", e); }
  };

  return <Ctx.Provider value={{ dietPlans, exercises, loading, activeTab, setActiveTab, showDietModal, editDiet, showExerciseModal, editExercise, openAddDiet, openEditDiet, closeDietModal, openAddExercise, openEditExercise, closeExerciseModal, saveDiet, deleteDiet, saveExercise, deleteExercise }}>{children}</Ctx.Provider>;
}
export function useAdminLibraryContext() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAdminLibraryContext must be within AdminLibraryProvider");
  return ctx;
}
