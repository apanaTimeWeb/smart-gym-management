// RESPONSIBILITY: Provides an accessible Superadmin-only tooltip for truncated dynamic text.
'use client';
import type { ReactNode } from 'react';
import type { TooltipProps } from '@/components/ui/TooltipTypes';

export default function Tooltip({ content, children }: TooltipProps) {
    return (<span className="group relative inline-flex max-w-full rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" tabIndex={0} title={content} aria-label={content}>
      {children}
      <span role="tooltip" className="pointer-events-none invisible absolute bottom-full left-0 z-30 mb-2 max-w-60 rounded-md border border-border bg-popover px-2 py-1 text-xs text-primary shadow-popover group-hover:visible group-focus:visible">
        {content}
      </span>
    </span>);
}

export type { TooltipProps } from '@/components/ui/TooltipTypes';
