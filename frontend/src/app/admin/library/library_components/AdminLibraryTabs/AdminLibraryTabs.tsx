"use client";
import { PlusCircle, RefreshCw } from "lucide-react";
import { useAdminLibraryContext } from "@/app/admin/library/library_context/AdminLibraryContext";
import { ADMIN_LIB_TABS } from "@/app/admin/library/library_utils/AdminLibrarySharedConstants";
export default function AdminLibraryTabs() {
  const { activeTab, setActiveTab, openAddDiet, openAddExercise } = useAdminLibraryContext();
  return (
    <div className="flex items-center justify-between bg-card border border-border rounded-xl p-4">
      <div className="flex gap-1 bg-bg-page p-1 rounded-lg">
        {ADMIN_LIB_TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as "exercises" | "diet")}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === tab.id ? "bg-primary text-black shadow-sm" : "text-text-secondary hover:text-text-primary"}`}>{tab.label}</button>
        ))}
      </div>
      <button id="admin-library-add-btn" onClick={activeTab === "diet" ? openAddDiet : openAddExercise}
        className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-black font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
        <PlusCircle className="w-4 h-4" /> Add {activeTab === "diet" ? "Diet Plan" : "Exercise"}
      </button>
    </div>
  );
}
