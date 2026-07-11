'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, Edit, Trash2, Mail } from 'lucide-react';

interface GymActionDropdownProps {
  gymName: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onEmail?: () => void;
}

export default function GymActionDropdown({ gymName, onEdit, onDelete, onEmail }: GymActionDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(prev => !prev);
  };

  const handleAction = (e: React.MouseEvent, action?: () => void) => {
    e.stopPropagation();
    setIsOpen(false);
    if (action) action();
  };

  return (
    <div className="relative gyms-dropdown-overlay" ref={dropdownRef}>
      <button 
        onClick={toggleDropdown}
        className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-page)] rounded-lg transition-colors"
        title="More Actions"
        aria-label="More Actions"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <MoreVertical className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[var(--bg-card)] border border-[var(--border)] rounded-lg shadow-xl z-50 py-1 flex flex-col">
          <button 
            onClick={(e) => handleAction(e, onEdit)}
            className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--primary-subtle)] hover:text-[var(--primary)] transition-colors w-full text-left"
          >
            <Edit className="w-4 h-4" /> Edit Details
          </button>
          <button 
            onClick={(e) => handleAction(e, onEmail)}
            className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--primary-subtle)] hover:text-[var(--primary)] transition-colors w-full text-left"
          >
            <Mail className="w-4 h-4" /> Email Owner
          </button>
          <div className="h-px bg-[var(--border)] my-1"></div>
          <button 
            onClick={(e) => handleAction(e, onDelete)}
            className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--danger)] hover:bg-[var(--danger)] hover:text-white transition-colors w-full text-left"
          >
            <Trash2 className="w-4 h-4" /> Delete Gym
          </button>
        </div>
      )}
    </div>
  );
}
