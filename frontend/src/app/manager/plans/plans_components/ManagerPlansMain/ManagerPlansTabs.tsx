'use client';
import { MANAGER_PLANS_TABS } from '@/app/manager/plans/plans_constants/ManagerPlansTabConstants';
// RESPONSIBILITY: Renders Manager plan tabs, lifecycle forms, and API-backed expiry/renewal views.
// DATA FLOW: TanStack Query → ManagerPlansMembershipApi → React Hook Form → mutation → Query invalidation
import { MANAGER_GENERIC_ERROR_MESSAGE } from '@/app/manager/manager_infrastructure/ManagerErrorMessage';
import ManagerPlansToolbar from '@/app/manager/plans/plans_components/ManagerPlansMain/ManagerPlansToolbar';
import ManagerPlansGrid from '@/app/manager/plans/plans_components/ManagerPlansMain/ManagerPlansGrid';
import ManagerSearchableDropdown from '@/app/manager/manager_components/ManagerShared/ManagerSearchableDropdown';
import { useManagerPlansMembershipForms } from '@/app/manager/plans/plans_hooks/ManagerUseManagerPlansMembershipForms';



export default function ManagerPlansTabs() {
  const { plans, activeTab, handleTabChange, overview, isLoading, isError, error, activateForm, renewForm, freezeForm, memberOptions, planOptions, freezeMemberOptions, formatExpiry, submitActivate, submitRenew, submitFreeze, activateMutation, renewMutation, freezeMutation } = useManagerPlansMembershipForms();

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-4 bg-card border border-border p-1 rounded-xl w-fit">
        {MANAGER_PLANS_TABS.map((tab) => (
          <button key={tab} type="button" onClick={() => handleTabChange(tab)} className={`px-4 py-2 text-sm font-semibold rounded-lg motion-safe:transition-colors ${activeTab === tab ? 'bg-primary text-on-primary shadow' : 'text-secondary hover:text-primary hover:bg-primary-subtle'}`}>{tab}</button>
        ))}
      </div>

      {activeTab === 'Membership Activate' && (
        <form onSubmit={submitActivate} className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-bold text-primary mb-4">Activate New Membership</h3>
          <div className="space-y-4 max-w-md">
            <div><label className="block text-sm font-medium mb-1">Select Member</label><ManagerSearchableDropdown options={memberOptions} value={activateForm.watch('memberId')} onChange={(value) => activateForm.setValue('memberId', String(value), { shouldDirty: true, shouldValidate: true })} placeholder="Select a member..." /></div>
            <div><label className="block text-sm font-medium mb-1">Select Plan</label><ManagerSearchableDropdown options={planOptions} value={activateForm.watch('planId')} onChange={(value) => activateForm.setValue('planId', String(value), { shouldDirty: true, shouldValidate: true })} placeholder="Select a plan..." /></div>
            <div><label htmlFor="manager-plan-start-date" className="block text-sm font-medium mb-1">Start Date</label><input id="manager-plan-start-date" type="date" {...activateForm.register('startDate')} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-primary" /></div>
            <button type="submit" disabled={activateMutation.isPending} className="min-w-32 w-full py-2 bg-primary text-on-primary font-semibold rounded-lg disabled:opacity-60 motion-safe:transition-colors">{activateMutation.isPending ? 'Activating…' : 'Activate Membership'}</button>
          </div>
        </form>
      )}

      {activeTab === 'Membership Renew' && (
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-bold text-primary mb-4">Renew Memberships</h3>
          {isLoading ? <div className="h-24 motion-safe:animate-pulse bg-input rounded-xl" aria-label="Loading renewals" /> : isError ? <p className="text-sm text-danger">{error instanceof Error ? error.message : MANAGER_GENERIC_ERROR_MESSAGE}</p> : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse"><thead><tr className="border-b border-border"><th className="py-3 px-4 text-sm font-medium text-secondary">Member Name</th><th className="py-3 px-4 text-sm font-medium text-secondary">Current Plan</th><th className="py-3 px-4 text-sm font-medium text-secondary">Expiry Date</th><th className="py-3 px-4 text-sm font-medium text-secondary text-right">Action</th></tr></thead>
                <tbody className="divide-y divide-border">{(overview?.renewalCandidates ?? []).map((member) => <tr key={member.id}><td className="py-3 px-4 text-sm text-primary">{member.name}</td><td className="py-3 px-4 text-sm text-secondary">{member.planName}</td><td className="py-3 px-4 text-sm text-danger font-medium">{formatExpiry(member.expiryDate)}</td><td className="py-3 px-4 text-right"><button type="button" onClick={() => renewForm.setValue('memberId', member.id)} className="px-3 py-1.5 text-xs font-semibold bg-primary text-on-primary rounded-lg">Renew Now</button></td></tr>)}</tbody></table>
              <form onSubmit={submitRenew} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 max-w-xl"><ManagerSearchableDropdown options={memberOptions} value={renewForm.watch('memberId')} onChange={(value) => renewForm.setValue('memberId', String(value), { shouldDirty: true, shouldValidate: true })} placeholder="Member" /><ManagerSearchableDropdown options={planOptions} value={renewForm.watch('planId')} onChange={(value) => renewForm.setValue('planId', String(value), { shouldDirty: true, shouldValidate: true })} placeholder="Plan" /><input type="date" aria-label="New expiry date" {...renewForm.register('newExpiryDate')} className="bg-input border border-border rounded-lg px-3 py-2 text-sm text-primary" /><button type="submit" disabled={renewMutation.isPending} className="min-w-32 bg-primary text-on-primary rounded-lg px-3 py-2 text-sm font-semibold disabled:opacity-60 motion-safe:transition-colors">{renewMutation.isPending ? 'Renewing…' : 'Submit Renewal'}</button></form>
            </div>
          )}
        </div>
      )}

      {activeTab === 'Membership Freeze' && (
        <form onSubmit={submitFreeze} className="bg-card border border-border rounded-xl p-6"><h3 className="text-lg font-bold text-primary mb-4">Freeze Membership</h3><div className="space-y-4 max-w-md"><ManagerSearchableDropdown options={freezeMemberOptions} value={freezeForm.watch('memberId')} onChange={(value) => freezeForm.setValue('memberId', String(value), { shouldDirty: true, shouldValidate: true })} placeholder="Select active member..." /><div className="flex gap-4"><input aria-label="Freeze from" type="date" {...freezeForm.register('freezeFrom')} className="flex-1 bg-input border border-border rounded-lg px-3 py-2 text-sm text-primary" /><input aria-label="Freeze until" type="date" {...freezeForm.register('freezeUntil')} className="flex-1 bg-input border border-border rounded-lg px-3 py-2 text-sm text-primary" /></div><button type="submit" disabled={freezeMutation.isPending} className="min-w-32 w-full py-2 bg-info text-on-info font-semibold rounded-lg disabled:opacity-60 motion-safe:transition-colors">{freezeMutation.isPending ? 'Applying…' : 'Apply Freeze'}</button></div></form>
      )}

      {activeTab === 'Expiry Check' && (
        <div className="bg-card border border-border rounded-xl p-6"><h3 className="text-lg font-bold text-primary mb-4">Expiring Memberships</h3>{isLoading ? <div className="h-24 motion-safe:animate-pulse bg-input rounded-xl" aria-label="Loading expiry data" /> : isError ? <p className="text-sm text-danger">{error instanceof Error ? error.message : MANAGER_GENERIC_ERROR_MESSAGE}</p> : <div className="overflow-x-auto"><table className="w-full text-left border-collapse"><thead><tr className="border-b border-border"><th className="py-3 px-4 text-sm font-medium text-secondary">Member Name</th><th className="py-3 px-4 text-sm font-medium text-secondary">Phone</th><th className="py-3 px-4 text-sm font-medium text-secondary">Plan</th><th className="py-3 px-4 text-sm font-medium text-secondary">Expires On</th></tr></thead><tbody className="divide-y divide-border">{(overview?.memberOptions ?? []).map(member => <tr key={member.id}><td className="py-3 px-4 text-sm text-primary">{member.name}</td><td className="py-3 px-4 text-sm text-secondary">{member.phone}</td><td className="py-3 px-4 text-sm text-secondary">{member.planName}</td><td className="py-3 px-4 text-sm text-danger font-medium">{formatExpiry(member.expiryDate)}</td></tr>)}</tbody></table></div>}</div>
      )}

      {activeTab === 'View Plans' && (<><div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">{[{ label: 'Total Plans', value: plans.length, colorClass: 'text-primary' }, { label: 'Active Plans', value: plans.filter((p) => p.isActive).length, colorClass: 'text-success' }, { label: 'Inactive Plans', value: plans.filter((p) => !p.isActive).length, colorClass: 'text-danger' }].map((stat) => <div key={stat.label} className="bg-card border border-border rounded-xl p-4 flex items-center gap-4"><p className="text-sm text-secondary">{stat.label}</p><p className={`text-kpi font-bold ml-auto ${stat.colorClass}`}>{stat.value}</p></div>)}</div><ManagerPlansToolbar /><ManagerPlansGrid /></>)}
    </>
  );
}
