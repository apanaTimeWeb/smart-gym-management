'use client';
import { Variable } from 'lucide-react';

interface Props {
  body: string;
  onChange: (val: string) => void;
}

export default function AdminCampaignsComposer({ body, onChange }: Props) {
  const insertVariable = () => {
    onChange(`${body} {name}`);
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-primary">3. Edit Message</h2>
        <button 
          onClick={insertVariable}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-input text-xs font-medium text-primary hover:bg-input/80 transition-colors"
        >
          <Variable size={14} />
          Insert {'{name}'}
        </button>
      </div>
      <textarea
        value={body}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-40 p-4 rounded-lg border border-border bg-input text-sm text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none"
        placeholder="Type your message here..."
      />
      <p className="mt-3 text-xs text-secondary leading-relaxed">
        The {'{name}'} variable will automatically be replaced with each member's actual name when generating the WhatsApp link.
      </p>
    </div>
  );
}
