// RESPONSIBILITY: Encapsulates logic, UI, or types for the trainer module.
// DATA FLOW: Standard component data flow.
// RESPONSIBILITY: Custom hook encapsulating UI state and orchestrating actions for the members module.
import React, { useState, useCallback, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import type { MembersContextType, MembersInitialData } from '@/app/trainer/members/members_types/members_types';
import type { Member, Workout, DietPlan, FetchState, MemberStats } from '@/app/trainer/trainer_types/trainer_types';
import type { ToastType } from '@/app/trainer/trainer_components/TrainerFeedback/TrainerToast';
import type { MessageType, TrainerMessageRecipient } from '@/app/trainer/trainer_components/TrainerFeedback/TrainerMessageModal';
import { useConfirm } from '@/app/trainer/trainer_components/TrainerFeedback/TrainerConfirmProvider';
import { EMPTY_MEMBER_FORM, MSG_TEMPLATES } from '@/app/trainer/members/members_utils/MembersSharedConstants';
import type { MemberFormValues } from '@/app/trainer/members/members_utils/MembersSharedConstants';
import { useDebounce } from '@/app/trainer/trainer_utils/useDebounce';
import { membersApi } from '@/app/trainer/members/members_api/members_api';
import { trainerSharedApi } from '@/app/trainer/trainer_api/trainer_api';

export function useMembersLogic(initialData?: MembersInitialData | null): MembersContextType {
  const { confirm } = useConfirm();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Data State
  const [members, setMembers] = useState<Member[]>(initialData?.members ?? []);
  const [stats, setStats] = useState<MemberStats>(initialData?.stats ?? { total: 0, active: 0, pending: 0, expired: 0 });
  const [totalMembers, setTotalMembers] = useState<number>(initialData?.totalMembers ?? 0);
  const [fetchState, setFetchState] = useState<FetchState>(initialData ? 'success' : 'idle');
  const [saving, setSaving] = useState(false);
  const [attMap, setAttMap] = useState<Record<string, { day: number; status: string }[]>>({});

  // URL State
  const search = searchParams.get('search') || '';
  const statusFilter = searchParams.get('status') || 'All';
  const progressStatusFilter = searchParams.get('progressStatus') || 'All';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const debouncedSearch = useDebounce(search, 300);

  const setUrlParam = useCallback((key: string, value: string | null) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (value) current.set(key, value);
    else current.delete(key);
    if (key !== 'page') current.set('page', '1');
    router.push(`${pathname}?${current.toString()}`);
  }, [searchParams, pathname, router]);

  const setSearch = useCallback((val: string) => setUrlParam('search', val || null), [setUrlParam]);
  const setStatusFilter = useCallback((val: string) => setUrlParam('status', val === 'All' ? null : val), [setUrlParam]);
  const setProgressStatusFilter = useCallback((val: string) => setUrlParam('progressStatus', val === 'All' ? null : val), [setUrlParam]);
  const setCurrentPage = useCallback((val: number) => setUrlParam('page', val.toString()), [setUrlParam]);

  // UI State
  const [showAddModal, setShowAddModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<MemberFormValues | null>(null);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [profileTab, setProfileTab] = useState<'overview' | 'attendance' | 'progress' | 'workout' | 'diet' | 'fitness' | 'assessment' | 'notes'>('overview');
  const [msgModal, setMsgModal] = useState<{ open: boolean; recipient: TrainerMessageRecipient; type: MessageType; message: string; subject?: string } | null>(null);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const showToast = useCallback((msg: string, t: ToastType) => setToast({ message: msg, type: t }), []);
  const hideToast = useCallback(() => setToast(null), []);
  const closeMsg = useCallback(() => setMsgModal(null), []);

  const loadAll = useCallback(async () => {
    setFetchState('loading');
    try {
      const apiParams: Record<string, string> = {
        limit: '50',
        page: currentPage.toString()
      };
      if (debouncedSearch) apiParams.search = debouncedSearch;
      if (statusFilter && statusFilter !== 'All') apiParams.status = statusFilter;
      if (progressStatusFilter && progressStatusFilter !== 'All') apiParams.progressStatus = progressStatusFilter;

      const [membersRes, statsRes] = await Promise.all([
        membersApi.fetchMembers(apiParams),
        membersApi.fetchMemberStats(),
      ]);

      const fetchedMembers: Member[] = membersRes.data?.members ?? [];
      const totalCount = membersRes.data?.total ?? fetchedMembers.length;

      setMembers(fetchedMembers);
      setTotalMembers(totalCount);
      setStats(statsRes.data ?? {
        total: fetchedMembers.length,
        active: fetchedMembers.filter(m => m.status === 'ACTIVE').length,
        pending: fetchedMembers.filter(m => m.status === 'PENDING').length,
        expired: fetchedMembers.filter(m => m.status === 'EXPIRED').length,
      });
      setFetchState('success');
    } catch (e: unknown) {
      setFetchState('error');
      throw e;
    }
  }, [currentPage, debouncedSearch, statusFilter, progressStatusFilter]);

  const loadMemberProfile = useCallback(async (memberId: string) => {
    try {
      const aRes = await trainerSharedApi.fetchMemberAttendance({ memberId: memberId.toString(), type: 'MEMBER' }) as {
        success?: boolean;
        data?: { date: string }[] | { attendance?: { date: string }[] };
      };
      if (!aRes?.success) return;
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth();
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

      const rawData = aRes.data;
      const records: { date: string }[] = Array.isArray(rawData)
        ? rawData
        : (rawData as { attendance?: { date: string }[] })?.attendance ?? [];

      const realAtt = Array.from({ length: daysInMonth }, (_, i) => {
        const d = i + 1;
        const rec = records.find((a) => {
          const rDate = new Date(a.date);
          return rDate.getDate() === d && rDate.getMonth() === currentMonth && rDate.getFullYear() === currentYear;
        });
        return { day: d, status: rec ? 'P' : 'A' };
      });
      setAttMap(prev => ({ ...prev, [memberId]: realAtt }));
    } catch {
      setAttMap(prev => ({ ...prev, [memberId]: [] }));
    }
  }, []);

  const isFirstRender = React.useRef(true);
  useEffect(() => {
    if (isFirstRender.current && initialData) {
      isFirstRender.current = false;
      return;
    }
    loadAll().catch(() => showToast('Failed to load members', 'error'));
  }, [loadAll, showToast, initialData]);

  const openAdd = useCallback(() => { 
    setEditId(null); 
    setEditData(EMPTY_MEMBER_FORM); 
    setShowAddModal(true); 
  }, []);
  
  const openEdit = useCallback((m: Member) => {
    setEditId(m.id);
    setEditData({ 
      name: m.name, 
      email: m.email || '', 
      phone: m.phone, 
      address: m.address || '', 
      gender: (m.gender || 'MALE') as "MALE"|"FEMALE"|"OTHER", 
    } as MemberFormValues);
    setShowAddModal(true);
  }, []);

  const saveMember = useCallback(async (data: MemberFormValues) => {
    setSaving(true);
    try {
      if (editId) {
        const res = await membersApi.updateMember(editId, data);
        const updatedMem = res.data ?? data;
        setMembers(prev => prev.map(m => String(m.id) === String(editId) ? { ...m, ...updatedMem } as Member : m));
        showToast(res.message ?? 'Operation completed', 'success');
        setShowAddModal(false);
      } else {
        throw new Error('Creating members is a Manager-only action. Please contact your manager.');
      }
    } catch (err: unknown) { 
      showToast(err instanceof Error ? err.message : 'Save failed', 'error'); 
    } finally {
      setSaving(false);
    }
  }, [editId, showToast]);

  const deleteMember = useCallback(async (id: string) => {
    const isConfirmed = await confirm({ title: 'Delete Member', message: 'Are you sure you want to delete this member? This action cannot be undone.', confirmText: 'Delete', type: 'danger' });
    if (!isConfirmed) return;
    try {
      throw new Error('Deleting members is a Manager-only action. Please contact your manager.');
    } catch (err: unknown) { 
      showToast(err instanceof Error ? err.message : 'Delete failed', 'error'); 
    }
  }, [confirm, showToast]);

  const assignWorkout = useCallback(async (memberId: string, workout: Workout | null) => {
    try {
      const payload = {
        assignedWorkoutId: workout?.id ?? '',
        assignedWorkout: workout ?? undefined,
      };
      await membersApi.updateMember(memberId, payload);
      setMembers(prev => prev.map(m => m.id === memberId ? { ...m, ...payload } : m));
      showToast('Operation completed', 'success');
      if (selectedMember?.id === memberId) {
        setSelectedMember(prev => prev ? { ...prev, ...payload } as Member : null);
      }
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Failed to assign workout plan', 'error');
    }
  }, [showToast, selectedMember]);

  const assignDiet = useCallback(async (memberId: string, diet: DietPlan | null) => {
    try {
      const payload = {
        assignedDietId: diet?.id ?? '',
        assignedDiet: diet ?? undefined,
      };
      await membersApi.updateMember(memberId, payload);
      setMembers(prev => prev.map(m => m.id === memberId ? { ...m, ...payload } : m));
      showToast('Operation completed', 'success');
      if (selectedMember?.id === memberId) {
        setSelectedMember(prev => prev ? { ...prev, ...payload } as Member : null);
      }
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Failed to assign diet plan', 'error');
    }
  }, [showToast, selectedMember]);

  const openMsg = useCallback((m: Member, type: MessageType) => {
    const tpl = m.status === 'EXPIRED'
      ? MSG_TEMPLATES.EXPIRED(m.name)
      : MSG_TEMPLATES.DEFAULT(m.name);
    setMsgModal({ open: true, type, recipient: { name: m.name, phone: m.phone, email: m.email }, message: tpl });
  }, []);

  return {
    members, stats, totalMembers, fetchState, saving, attMap, loadAll, loadMemberProfile,
    search, debouncedSearch, setSearch,
    statusFilter, setStatusFilter,
    progressStatusFilter, setProgressStatusFilter,
    currentPage, setCurrentPage,
    toast, showToast, hideToast,
    selectedMember, setSelectedMember, profileTab, setProfileTab,
    showAddModal, setShowAddModal, editId, editData,
    openAdd, openEdit, saveMember, deleteMember,
    assignWorkout, assignDiet,
    msgModal, openMsg, closeMsg
  };
}
