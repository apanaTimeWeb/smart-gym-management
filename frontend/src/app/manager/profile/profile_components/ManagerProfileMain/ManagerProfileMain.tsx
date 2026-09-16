'use client';
// RESPONSIBILITY: Renders the Manager profile and password forms using RHF + Zod while consuming server profile state through TanStack Query.
import { useEffect, useState } from 'react';
import { showManagerErrorToast, showManagerSuccessToast } from '@/app/manager/manager_utils/ManagerToastService';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Lock, Save, Loader2, Eye, EyeOff } from 'lucide-react';
import { useManagerProfileLogic } from '@/app/manager/profile/profile_context/ManagerUseManagerProfileLogic';
import { managerProfileFormSchema, managerPasswordFormSchema, type ManagerProfileFormValues, type ManagerPasswordFormValues } from '@/app/manager/profile/profile_utils/ManagerProfileFormSchemas';
import { useManagerUnsavedChangesGuard } from '@/app/manager/manager_utils/ManagerUnsavedChangesGuard';

const TABS = [
  { id: 'personal' as const, label: 'Personal Info', icon: User },
  { id: 'security' as const, label: 'Security', icon: Lock },
];

export default function ManagerProfileMain() {
  const { activeTab, setActiveTab, user, displayInitial, profileQuery, profileMutation, passwordMutation } = useManagerProfileLogic();
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const profileForm = useForm<ManagerProfileFormValues>({ resolver: zodResolver(managerProfileFormSchema), defaultValues: { name: '', phone: '' } });
  const passwordForm = useForm<ManagerPasswordFormValues>({ resolver: zodResolver(managerPasswordFormSchema), defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' } });

  useEffect(() => {
    if (user) profileForm.reset({ name: user.name, phone: user.phone });
  }, [user, profileForm]);

  useManagerUnsavedChangesGuard(profileForm.formState.isDirty || passwordForm.formState.isDirty);

  const submitProfile = profileForm.handleSubmit(async (values) => {
    try { const response = await profileMutation.mutateAsync(values); profileForm.reset(values); showManagerSuccessToast(response.message, 'manager-profile-success'); } catch {}
  });
  const submitPassword = passwordForm.handleSubmit(async (values) => {
    try { const response = await passwordMutation.mutateAsync(values); passwordForm.reset(); showManagerSuccessToast(response.message, 'manager-profile-success'); } catch {}
  });

  return <div className="max-w-3xl mx-auto space-y-6 p-6">
    <div><h1 className="text-2xl font-bold text-foreground">My Profile</h1><p className="text-secondary mt-1 text-sm">Manage your account details and password.</p></div>
    {profileQuery.isLoading ? <div className="h-28 bg-card rounded-xl animate-pulse border border-border" aria-label="Loading profile" /> : profileQuery.isError ? <div role="alert" className="bg-danger-bg text-danger border border-border rounded-xl p-4">{profileQuery.error instanceof Error ? profileQuery.error.message : 'Unable to load profile.'}</div> : <>
      <div className="bg-card border border-border rounded-xl p-6 flex items-center gap-5 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-2xl font-bold text-primary-foreground shrink-0">{displayInitial}</div>
        <div><p className="text-lg font-bold text-foreground">{user?.name}</p><p className="text-sm text-secondary">{user?.email}</p><span className="mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-success-bg text-success text-xs font-semibold">Active</span></div>
      </div>
      <div className="flex gap-1 bg-input border border-border rounded-xl p-1 w-fit">{TABS.map(({ id, label, icon: Icon }) => <button key={id} type="button" onClick={() => setActiveTab(id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${activeTab === id ? 'bg-card text-foreground shadow-sm' : 'text-secondary hover:text-foreground'}`}><Icon size={16} />{label}</button>)}</div>
      {activeTab === 'personal' && <form onSubmit={submitProfile} className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-5">
        <div><label htmlFor="manager-profile-name" className="block text-sm font-medium text-secondary mb-1.5">Full Name *</label><input id="manager-profile-name" {...profileForm.register('name')} className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-foreground text-sm" />{profileForm.formState.errors.name && <p className="text-xs text-danger mt-1">{profileForm.formState.errors.name.message}</p>}</div>
        <div><label htmlFor="manager-profile-email" className="block text-sm font-medium text-secondary mb-1.5">Email Address</label><input id="manager-profile-email" type="email" value={user?.email ?? ''} readOnly className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-secondary text-sm" /></div>
        <div><label htmlFor="manager-profile-phone" className="block text-sm font-medium text-secondary mb-1.5">Phone Number</label><input id="manager-profile-phone" {...profileForm.register('phone')} className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-foreground text-sm" />{profileForm.formState.errors.phone && <p className="text-xs text-danger mt-1">{profileForm.formState.errors.phone.message}</p>}</div>
        <div><label htmlFor="manager-profile-role" className="block text-sm font-medium text-secondary mb-1.5">Role</label><input id="manager-profile-role" value={user?.role ?? ''} readOnly className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-secondary text-sm" /></div>
        <div className="flex justify-end"><button type="submit" disabled={profileMutation.isPending} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg text-sm disabled:opacity-60">{profileMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}Save Changes</button></div>
      </form>}
      {activeTab === 'security' && <form onSubmit={submitPassword} className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-5">
        <h2 className="text-base font-semibold text-foreground">Change Password</h2>
        {[['currentPassword','Current Password',showCurrent,setShowCurrent],['newPassword','New Password',showNew,setShowNew],['confirmPassword','Confirm New Password',showConfirm,setShowConfirm]].map(([field,label,show,setShow]) => { const fieldName = field as keyof ManagerPasswordFormValues; const error = passwordForm.formState.errors[fieldName]; return <div key={field as string} className="space-y-1"><label htmlFor={`manager-profile-${field as string}`} className="block text-sm font-medium text-secondary">{label as string} *</label><div className="relative"><input id={`manager-profile-${field as string}`} type={show ? 'text' : 'password'} {...passwordForm.register(fieldName)} className="w-full px-4 py-2.5 pr-10 bg-input border border-border rounded-lg text-foreground text-sm" /><button type="button" onClick={() => (setShow as (value: boolean) => void)(!(show as boolean))} aria-label={(show as boolean) ? 'Hide password' : 'Show password'} className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary">{show ? <EyeOff size={16} /> : <Eye size={16} />}</button></div>{error && <p className="text-xs text-danger">{String(error.message ?? '')}</p>}</div>; })}
        <div className="flex justify-end"><button type="submit" disabled={passwordMutation.isPending} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg text-sm disabled:opacity-60">{passwordMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <Lock size={16} />}Update Password</button></div>
      </form>}
    </>}
  </div>;
}
