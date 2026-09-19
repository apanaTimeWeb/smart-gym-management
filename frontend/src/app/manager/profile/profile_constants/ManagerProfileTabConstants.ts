import { User, Lock } from 'lucide-react';

export const MANAGER_PROFILE_TABS = [
  { id: 'personal', label: 'Personal Info', icon: User },
  { id: 'security', label: 'Security', icon: Lock },
] as const;
