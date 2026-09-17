'use client';
import { useMemo, useState, useEffect } from 'react';

export interface PermissionCapabilitySnapshot {
  can: (capability: string) => boolean;
}

const getRoleFromCookie = () => {
  if (typeof window === 'undefined') return null;
  try {
    const cookieStr = document.cookie.split(';').find(x => x.trim().startsWith('gymsmart_user='));
    if (cookieStr) {
      const cookieVal = cookieStr.split('=')[1];
      if (cookieVal) {
        const user = JSON.parse(decodeURIComponent(cookieVal));
        return user.role;
      }
    }
  } catch (e) {
    // Ignore parse errors
  }
  return null;
}

/** Global permission capability contract; checks capabilities based on the session role. */
export function usePermissions(): PermissionCapabilitySnapshot {
  const [role, setRole] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setRole(getRoleFromCookie());
    setMounted(true);
  }, []);

  return useMemo(() => ({
    can: (capability: string) => {
      // During SSR, assume authorized to avoid flash of "Access denied" (middleware handles actual protection)
      if (!mounted) return true;
      if (!role) return false;

      const r = role.toUpperCase();
      if (r === 'SUPERADMIN') return true;
      if (r === 'ADMIN' && (capability.startsWith('admin.') || capability.startsWith('manager.'))) return true;
      if (r === 'MANAGER' && capability.startsWith('manager.')) return true;
      if (r === 'TRAINER' && capability.startsWith('trainer.')) return true;
      if (r === 'MEMBER' && capability.startsWith('member.')) return true;

      return false;
    },
  }), [role, mounted]);
}
