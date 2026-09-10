// RESPONSIBILITY: Reusable Tooltip component for truncating data in tables and cards, complying with Design Rule 13 & 19.
'use client';
import type { ReactNode } from 'react';

interface ManagerTooltipProps {
  content: string;
  children: ReactNode;
}

export default function ManagerTooltip({ content, children }: ManagerTooltipProps) {
  if (!content) return <>{children}</>;

  return (
    <div className="relative group inline-flex cursor-help">
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 invisible opacity-0 group-hover:visible group-hover:opacity-100 motion-safe:transition-all motion-safe:duration-200 delay-300 z-30 pointer-events-none">
        <div className="relative bg-card border border-border text-[12px] text-foreground rounded-md py-1.5 px-3 max-w-[240px] w-max whitespace-normal break-words text-center shadow-lg shadow-black/20">
          {content}
          {/* Arrow pointing down */}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-card border-b border-r border-border rotate-45" />
        </div>
      </div>
    </div>
  );
}
