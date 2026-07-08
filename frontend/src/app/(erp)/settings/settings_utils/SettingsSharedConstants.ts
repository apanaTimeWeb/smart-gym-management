import { Building, Bell, Shield, Smartphone, Settings as SettingsIcon } from 'lucide-react';

export const SETTINGS_TABS = [
 { icon: Building, title: 'Gym Profile', desc: 'Update gym name, logo, address, and contact details', color: 'text-[var(--info)]', bg: 'bg-[var(--info-bg)] dark:bg-[var(--info-bg)]' },
 { icon: Bell, title: 'Notifications', desc: 'Configure SMS, email and WhatsApp alerts', color: 'text-[var(--warning)]', bg: 'bg-[var(--warning-bg)] dark:bg-[var(--warning-bg)]' },
 { icon: Shield, title: 'Roles & Permissions', desc: 'Manage admin roles and access control', color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
 { icon: Smartphone, title: 'App Integration', desc: 'Member app settings and configurations', color: 'text-teal-600', bg: 'bg-teal-50 dark:bg-teal-900/20' },
 { icon: SettingsIcon, title: 'General Settings', desc: 'System preferences, timezone, language', color: 'text-gray-600', bg: 'bg-gray-100 dark:bg-gray-800' },
];

export const EMPTY_SETTINGS_FORM = {
 gymName: '',
 ownerName: '',
 phone: '',
 email: '',
 city: '',
 gstNumber: ''
};
