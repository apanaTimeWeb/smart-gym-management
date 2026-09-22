// RESPONSIBILITY: Renders the form UI for onboarding a new gym tenant. Receives logic from useSuperadminAddGymForm hook.
'use client';

import { formatCurrency } from '@/app/superadmin/gyms/gyms_utils/formatCurrency';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { Controller } from 'react-hook-form';
import { SearchableDropdown } from '@/components/ui/SearchableDropdown';
import { ArrowLeft, Database, Save, Loader2, Eye, EyeOff } from 'lucide-react';
import { GymsUrlConfig } from '@/app/superadmin/gyms/superadmin_gyms_url_config';
import { useSuperadminAddGymForm } from '@/app/superadmin/gyms/gyms_components/SuperadminAddGymForm/useSuperadminAddGymForm';
import { useUnsavedChangesGuard } from '@/hooks/useUnsavedChangesGuard';

export default function SuperadminAddGymForm() {
    const locale = useLocale();

    const { register, handleSubmit, onSubmit, control, errors, isDirty, isProvisioning, provisioningLogs, showPassword, setShowPassword, plans, loadingPlans, } = useSuperadminAddGymForm();
    useUnsavedChangesGuard(isDirty && !isProvisioning, 'You have unsaved gym details. Discard?');
    return (<div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href={GymsUrlConfig.PAGES.MAIN} className="p-2 bg-card border border-border rounded-lg text-secondary hover:text-on-primary motion-safe:transition-colors">
          <ArrowLeft size={18}/>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-primary">Provision New Gym</h1>
          <p className="text-secondary mt-1">This will spin up a completely isolated database for the new gym.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-page border border-border rounded-xl p-6 shadow-card space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="superadmin-add-gym-gymName" className="text-sm font-bold text-secondary">Gym Name</label>
                <input {...register('gymName')} id="superadmin-add-gym-gymName" className="w-full bg-card border border-border text-primary rounded-lg px-4 py-2 focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-primary motion-safe:transition-colors" placeholder="e.g. Titan Fitness"/>
                {errors.gymName && <p className="text-danger text-xs">{errors.gymName.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="superadmin-add-gym-ownerName" className="text-sm font-bold text-secondary">Owner Name</label>
                <input {...register('ownerName')} id="superadmin-add-gym-ownerName" className="w-full bg-card border border-border text-primary rounded-lg px-4 py-2 focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-primary motion-safe:transition-colors" placeholder="e.g. John Doe"/>
                {errors.ownerName && <p className="text-danger text-xs">{errors.ownerName.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="superadmin-add-gym-adminEmail" className="text-sm font-bold text-secondary">Admin Email</label>
                <input type="email" {...register('adminEmail')} id="superadmin-add-gym-adminEmail" className="w-full bg-card border border-border text-primary rounded-lg px-4 py-2 focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-primary motion-safe:transition-colors" placeholder="admin@titanfitness.com"/>
                {errors.adminEmail && <p className="text-danger text-xs">{errors.adminEmail.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="superadmin-add-gym-phone" className="text-sm font-bold text-secondary">Phone Number</label>
                <input {...register('phone')} id="superadmin-add-gym-phone" className="w-full bg-card border border-border text-primary rounded-lg px-4 py-2 focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-primary motion-safe:transition-colors" placeholder="+1 555-0000"/>
                {errors.phone && <p className="text-danger text-xs">{errors.phone.message}</p>}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="superadmin-add-gym-aadharNumber" className="text-sm font-bold text-secondary">Aadhar Number</label>
                <input {...register('aadharNumber')} id="superadmin-add-gym-aadharNumber" className="w-full bg-card border border-border text-primary rounded-lg px-4 py-2 focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-primary motion-safe:transition-colors" placeholder="12-digit Aadhar number" maxLength={12} inputMode="numeric" onKeyDown={(e) => { if (!/[0-9]|Backspace|Delete|Tab|ArrowLeft|ArrowRight/.test(e.key))
        e.preventDefault(); }}/>
                {errors.aadharNumber && <p className="text-danger text-xs">{errors.aadharNumber.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="superadmin-add-gym-temporaryPassword" className="text-sm font-bold text-secondary">Temporary Password</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} {...register('temporaryPassword')} id="superadmin-add-gym-temporaryPassword" className="w-full bg-card border border-border text-primary rounded-lg px-4 py-2 pr-10 focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-primary motion-safe:transition-colors" placeholder="Min 8 characters"/>
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary motion-safe:transition-colors">
                    {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                  </button>
                </div>
                {errors.temporaryPassword && <p className="text-danger text-xs">{errors.temporaryPassword.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="superadmin-add-gym-plan" className="text-sm font-bold text-secondary">SaaS Plan</label>
                <div aria-labelledby="superadmin-add-gym-plan"><Controller name="plan" control={control} render={({ field }) => (<SearchableDropdown value={field.value || ''} onChange={field.onChange} options={plans ? plans.map((p) => ({ label: `${p.name} (${formatCurrency(Number(p.priceMonthly), 'INR', locale)}/mo)`, value: p.name })) : []} disabled={loadingPlans} placeholder={loadingPlans ? "Loading plans..." : "Select a plan"}/>)}/></div>
                {errors.plan && <p className="text-danger text-xs">{errors.plan.message}</p>}
              </div>
            </div>

            <div className="pt-4 border-t border-border flex justify-end">
              <button type="submit" disabled={isProvisioning} className="flex items-center gap-2 bg-primary hover:bg-primary-hover disabled:bg-primary-subtle text-on-primary px-6 py-2.5 rounded-lg font-medium motion-safe:transition-colors">
                {isProvisioning ? (<><Loader2 size={18} className="motion-safe:animate-spin"/> Provisioning DB...</>) : (<><Save size={18}/> Provision Gym</>)}
              </button>
            </div>
          </form>
        </div>

        {/* Provisioning Console / Status */}
        <div className="bg-page border border-border rounded-xl p-6 shadow-card">
          <div className="flex items-center gap-2 mb-4 text-primary font-bold border-b border-border pb-4">
            <Database size={18} className="w-5 text-primary"/>
            Provisioning Console
          </div>
          <div className="bg-card rounded-lg p-4 font-mono text-xs text-secondary h-64 overflow-y-auto space-y-2 border border-border">
            {provisioningLogs.length === 0 ? (<p className="text-secondary italic">Awaiting submit...</p>) : (provisioningLogs.map((log, i) => (<p key={`log-${i}-${log.slice(0, 12)}`} className="motion-safe:animate-in motion-safe:fade-in slide-in-from-bottom-1 text-success">
                  <span className="text-secondary mr-2">{'>'}</span>{log}
                </p>)))}
          </div>
        </div>
      </div>
    </div>);
}
