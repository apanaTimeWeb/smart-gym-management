// RESPONSIBILITY: Shared role-level dumb route error presentation; it receives module/route metadata and never exposes raw error internals.
'use client';
import { useEffect } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';
import { reportTrainerError } from '@/app/trainer/trainer_utils/TrainerErrorReporter';
import type { TrainerRouteErrorFallbackProps } from '@/app/trainer/trainer_components/trainer_components_types/TrainerRouteErrorFallbackProps';

export default function TrainerRouteErrorFallback({ errorDigest, moduleName, route, reset }: TrainerRouteErrorFallbackProps) {
  useEffect(() => { reportTrainerError({ module: moduleName, route, timestamp: new Date().toISOString(), errorDigest }); }, [errorDigest, moduleName, route]);
  return <div className="min-h-screen flex items-center justify-center p-6"><div className="w-full max-w-md bg-card border border-danger rounded-xl shadow-dialog p-6 text-center space-y-4"><div className="mx-auto w-12 h-12 rounded-full bg-danger-bg text-danger flex items-center justify-center"><AlertTriangle size={18} /></div><h2 className="text-lg font-bold text-primary">Something went wrong</h2><p className="text-sm text-secondary">This section could not be loaded. You can retry without leaving the page.</p><button type="button" onClick={reset} className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-on-primary font-semibold rounded-lg hover:bg-primary-hover motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><RefreshCw size={18} />Retry</button></div></div>;
}
