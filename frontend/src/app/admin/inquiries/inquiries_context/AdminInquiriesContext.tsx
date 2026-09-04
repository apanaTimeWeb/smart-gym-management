"use client";
import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { adminInquiriesApi } from "@/app/admin/inquiries/inquiries_api/admin_inquiries_api";
import type { AdminInquiry, AdminInquiryStats } from "@/app/admin/inquiries/inquiries_types/admin_inquiries_types";
import { ADMIN_EMPTY_INQUIRY } from "@/app/admin/inquiries/inquiries_utils/AdminInquiriesSharedConstants";
import { logger } from "@/lib/logger";
import toast from "react-hot-toast";

interface Ctx {
  inquiries: AdminInquiry[]; stats: AdminInquiryStats | null; loading: boolean;
  search: string; setSearch: (s: string) => void;
  statusFilter: string; setStatusFilter: (s: string) => void;
  showModal: boolean; editId: string | null; editData: Partial<AdminInquiry> | null;
  openAdd: () => void; openEdit: (i: AdminInquiry) => void; closeModal: () => void;
  save: (data: Partial<AdminInquiry>) => Promise<void>;
  remove: (id: string) => Promise<void>;
  updateStatus: (id: string, status: AdminInquiry["status"]) => Promise<void>;
}
const Ctx = createContext<Ctx | null>(null);

export function AdminInquiriesProvider({ children }: { children: ReactNode }) {
  const [inquiries, setInquiries] = useState<AdminInquiry[]>([]);
  const [stats, setStats] = useState<AdminInquiryStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<AdminInquiry> | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [r, s] = await Promise.all([adminInquiriesApi.getAll(), adminInquiriesApi.getStats()]);
      if (r.success) setInquiries(r.data.inquiries);
      if (s.success) setStats(s.data);
    } catch (e) { logger.error("[AdminInquiries] load:", e); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { void load(); }, [load]);

  const openAdd = () => { setEditId(null); setEditData(ADMIN_EMPTY_INQUIRY); setShowModal(true); };
  const openEdit = (i: AdminInquiry) => { setEditId(i.id); setEditData(i); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setEditId(null); setEditData(null); };

  const save = async (data: Partial<AdminInquiry>) => {
    try {
      if (editId) await adminInquiriesApi.update(editId, data); else await adminInquiriesApi.create(data);
      toast.success(editId ? "Inquiry updated" : "Inquiry added");
      closeModal(); void load();
    } catch (e) { logger.error("[AdminInquiries] save:", e); }
  };
  const remove = async (id: string) => {
    try { await adminInquiriesApi.remove(id); toast.success("Inquiry removed"); void load(); }
    catch (e) { logger.error("[AdminInquiries] remove:", e); }
  };
  const updateStatus = async (id: string, status: AdminInquiry["status"]) => {
    try { await adminInquiriesApi.update(id, { status }); void load(); }
    catch (e) { logger.error("[AdminInquiries] status update:", e); }
  };

  return <Ctx.Provider value={{ inquiries, stats, loading, search, setSearch, statusFilter, setStatusFilter, showModal, editId, editData, openAdd, openEdit, closeModal, save, remove, updateStatus }}>{children}</Ctx.Provider>;
}
export function useAdminInquiriesContext() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAdminInquiriesContext must be within AdminInquiriesProvider");
  return ctx;
}
