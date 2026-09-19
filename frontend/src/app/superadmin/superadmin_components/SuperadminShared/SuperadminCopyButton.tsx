// RESPONSIBILITY: SuperadminCopyButton.tsx renders an icon-only button that copies a value to the clipboard.
'use client';
import type { MouseEvent } from 'react';
// Uses the Clipboard API exclusively — no prompt() calls allowed (Design Rule 31).
// Shows a temporary success checkmark for 1.5s after copying.
import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import type { SuperadminCopyButtonProps } from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminCopyButtonTypes';

export default function SuperadminCopyButton({ value, label, className = '', }: SuperadminCopyButtonProps) {
    const [copied, setCopied] = useState(false);
    const handleCopy = (e: MouseEvent) => {
        // Prevent row-click propagation (Rule 19)
        e.stopPropagation();
        navigator.clipboard.writeText(value).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        });
    };
    return (<button type="button" onClick={handleCopy} aria-label={label ?? `Copy ${value}`} title={copied ? 'Copied!' : (label ?? 'Copy to clipboard')} className={`inline-flex items-center justify-center p-1 rounded text-disabled hover:text-secondary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${className}`}>
      {copied ? (<Check className="w-3.5 h-3.5 text-success"/>) : (<Copy className="w-3.5 h-3.5"/>)}
    </button>);
}
