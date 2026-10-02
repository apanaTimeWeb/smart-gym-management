'use client';
// RESPONSIBILITY: error.tsx handles module-level rendering errors.
import { useEffect } from 'react';

import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { logger } from '@/lib/logger';


export default function ErrorBoundary({ error, reset }: {
    error: Error & {
        digest?: string;
    };
    reset: () => void;
}) {
  const t = useTranslations('superadmin_invoices');
// EFFECT INTENT: synchronizes this client-side side effect with the dependency list; changes to captured values intentionally re-run it.
    useEffect(() => {
        logger.error('Module Error:', error);
    }, [error]);
    return (<div className="flex flex-col items-center justify-center min-h-96 p-8 bg-card border border-border rounded-xl shadow-card" data-testid="superadmin_invoices-error-superadmin-invoices-error-error">
      <div className="w-16 h-16 bg-danger-bg rounded-full flex items-center justify-center mb-4">
        <AlertTriangle size={18} className="text-danger"/>
      </div>
      <h2 className="text-xl font-bold text-primary mb-2">{t('ui.failed_to_load_view_f0191174')}</h2>
      <p className="text-secondary text-sm max-w-md text-center mb-6">
        {t('ui.an_unexpected_error_occurred_while_rendering_1a97607b')}</p>
      <button onClick={reset} className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-on-primary px-6 py-2.5 rounded-lg font-medium motion-safe:transition-colors shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_invoices-error-invoices-error-try-again">
        <RefreshCcw size={18}/>
        {t('ui.try_again_d876a9fe')}</button>
    </div>);
}
