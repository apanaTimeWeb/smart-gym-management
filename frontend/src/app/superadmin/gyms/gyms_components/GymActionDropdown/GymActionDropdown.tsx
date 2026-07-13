'use client';
// RESPONSIBILITY: GymActionDropdown.tsx renders the context menu for a gym row.

import { MoreVertical, Edit2, Ban, Trash2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface GymActionDropdownProps {
  gymId: string;
}

export default function GymActionDropdown({ gymId }: GymActionDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }} className="p-2 text-secondary hover:text-foreground hover:bg-input rounded-lg transition-colors">
        <MoreVertical className="w-4 h-4" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-1 w-48 bg-card border border-border rounded-xl shadow-2xl z-30 overflow-hidden py-1">
          <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-input transition-colors">
            <Edit2 className="w-4 h-4 text-primary" /> Edit Gym
          </button>
          <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-input transition-colors">
            <Ban className="w-4 h-4 text-warning" /> Suspend
          </button>
          <div className="h-px bg-border my-1"></div>
          <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-danger hover:bg-danger/10 transition-colors">
            <Trash2 className="w-4 h-4" /> Delete
          </button>
        </div>
      )}
    </div>
  );
}
