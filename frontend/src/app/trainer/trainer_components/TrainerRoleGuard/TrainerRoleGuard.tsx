// RESPONSIBILITY: Hides the entire Trainer business module from users without the Trainer capability.
'use client';
// DATA FLOW: global session → usePermissions() → role gate → Trainer children.
import type { TrainerRoleGuardProps } from '@/app/trainer/trainer_types/TrainerRoleGuardTypes';
import { usePermissions } from '@/lib/usePermissions';


export default function TrainerRoleGuard({ children }: TrainerRoleGuardProps) {
  const { can } = usePermissions();
  if (!can('trainer.view')) {
    return <main className="min-h-screen flex items-center justify-center p-6"><div role="alert" className="max-w-md w-full bg-card border border-danger rounded-2xl p-6 text-center"><h1 className="text-lg font-bold text-primary">Access denied</h1><p className="mt-2 text-sm text-secondary">Your account does not have permission to access the Trainer workspace.</p></div></main>;
  }
  return <>{children}</>;
}
