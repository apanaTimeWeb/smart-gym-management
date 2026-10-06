/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSettingsMockData owned by the superadmin_settings feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_settings/superadmin_settings_types/SuperadminSettingsTypes
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Module-owned mock fixture data for Superadmin.
import type { PlatformSetting } from '@/app/frontend_superadmin/superadmin_settings/superadmin_settings_types/SuperadminSettingsTypes';
export const MOCK_PLATFORM_SETTINGS: PlatformSetting[] = [
    { id: 'set_001', key: 'PLATFORM_MAINTENANCE_MODE', value: 'false', description: 'Enable global maintenance mode for all tenants', dataType: 'boolean', category: 'System' },
    { id: 'set_002', key: 'MAX_GLOBAL_TENANTS', value: '1000', description: 'Hard limit on total active tenants', dataType: 'number', category: 'Limits' },
    { id: 'set_003', key: 'STRIPE_WEBHOOK_SECRET', value: 'whsec_***', description: 'Global Stripe webhook secret for billing events', dataType: 'string', category: 'Integrations' },
    { id: 'set_004', key: 'DEFAULT_TRIAL_DAYS', value: '14', description: 'Default trial period for new franchise signups', dataType: 'number', category: 'Business' },
    { id: 'set_005', key: 'ALLOW_PUBLIC_REGISTRATION', value: 'true', description: 'Allow new gyms to self-register via landing page', dataType: 'boolean', category: 'System' },
];
