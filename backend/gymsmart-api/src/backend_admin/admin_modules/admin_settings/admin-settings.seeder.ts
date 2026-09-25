// RESPONSIBILITY: Seeds deterministic development data for Admin settings; never used in production runtime.
// FLOW: AdminCoreTenantSeeder -> AdminSettingsSeeder -> TypeORM -> usage_snapshots.
import { DataSource } from 'typeorm';

import { AdminSettingsEntity } from '@/backend_admin/admin_modules/admin_settings/settings_entities/admin-settings-entity'

/**
 * @description Defines the AdminSettingsSeeder boundary for the admin_settings backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminSettingsSeeder {
  /** @description Inserts deterministic, idempotent seed records when the feature table is empty. @param dataSource Tenant database source. @returns Completion promise. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(AdminSettingsEntity);
    const count = await repository.count();
    if (count > 0) return;
    await repository.save([
      repository.create({ payload: {
  "profile": {
    "gymName": "Buildronix Demo Gym",
    "ownerName": "Buildronix Admin",
    "phone": "9999999999",
    "email": "admin@example.com",
    "city": "Darbhanga",
    "gstNumber": "10ABCDE1234F1Z5"
  },
  "notifications": {
    "expiryReminder": true,
    "absenceAlert": true,
    "expiryReminderDays": 7,
    "absenceThresholdDays": 3
  },
  "integration": {
    "whatsappEnabled": false,
    "smsEnabled": false,
    "emailEnabled": true
  },
  "gst": {
    "gstNumber": "10ABCDE1234F1Z5",
    "businessLegalName": "Buildronix Pvt. Demo",
    "taxRate": 18,
    "stateCode": "10",
    "hsnCode": "999799",
    "showGstOnInvoice": true,
    "taxInclusivePricing": false
  },
  "payment": {
    "razorpayEnabled": false,
    "upiEnabled": true,
    "upiId": "buildronix@upi",
    "cashEnabled": true,
    "autoReceiptEnabled": true,
    "receiptPrefix": "BRX"
  },
  "general": {
    "timezone": "Asia/Kolkata",
    "language": "en",
    "dateFormat": "DD/MM/YYYY",
    "sessionTimeoutMinutes": 60,
    "dataRetentionMonths": 36,
    "autoBackup": true,
    "backupFrequency": "daily",
    "maintenanceMode": false,
    "twoFactorAuth": false
  },
  "twoFactorEnabled": false
}, name: null, status: null, branchId: null })
    ]);
  }
}
