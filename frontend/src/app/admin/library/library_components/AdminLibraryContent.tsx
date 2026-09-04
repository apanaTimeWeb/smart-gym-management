"use client";
import { useAdminLibraryContext } from "@/app/admin/library/library_context/AdminLibraryContext";
import AdminExerciseGrid from "@/app/admin/library/library_components/AdminExerciseGrid/AdminExerciseGrid";
import AdminDietGrid from "@/app/admin/library/library_components/AdminDietGrid/AdminDietGrid";
export default function AdminLibraryContent() {
  const { activeTab } = useAdminLibraryContext();
  return activeTab === "exercises" ? <AdminExerciseGrid /> : <AdminDietGrid />;
}
