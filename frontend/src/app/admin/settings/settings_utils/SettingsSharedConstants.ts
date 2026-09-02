// RESPONSIBILITY: Centralized constants, schema, and shared utilities for the Settings module.
import { Building, Bell, Shield, Smartphone, Settings as SettingsIcon } from 'lucide-react';

export const SETTINGS_TABS = [
 { icon: Building, title: 'Gym Profile', desc: 'Update gym name, logo, address, and contact details', color: 'text-info', bg: 'bg-info-bg' },
 { icon: Bell, title: 'Notifications', desc: 'Configure SMS, email and WhatsApp alerts', color: 'text-warning', bg: 'bg-warning-bg' },
 { icon: Shield, title: 'Roles & Permissions', desc: 'Manage admin roles and access control', color: 'text-purple', bg: 'bg-purple-bg' },
 { icon: Smartphone, title: 'App Integration', desc: 'Member app settings and configurations', color: 'text-success', bg: 'bg-success-bg' },
 { icon: SettingsIcon, title: 'General Settings', desc: 'System preferences, timezone, language', color: 'text-secondary', bg: 'bg-card' },
];

export const EMPTY_SETTINGS_FORM = {
 gymName: '',
 ownerName: '',
 phone: '',
 email: '',
 city: '',
 gstNumber: ''
};
