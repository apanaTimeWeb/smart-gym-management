export const MOCK_ADMIN_SETTINGS = {
  profile: { gymName: 'Smart Gym Corp', ownerName: 'Admin', phone: '9876543210', email: 'admin@smartgym.com', city: 'Mumbai', gstNumber: '' },
  notifications: {
    smssms: true, emailsms: true, whatsappsms: true,
    smsonJoin: true, emailonJoin: true, whatsapponJoin: true,
    smsonExpiry: true, emailonExpiry: true, whatsapponExpiry: true,
    smsonPayment: true, emailonPayment: true, whatsapponPayment: true,
    smsonAbsence: true, emailonAbsence: false, whatsapponAbsence: true,
    expiryReminderDays: 7, absenceThresholdDays: 3
  },
  integration: {
    memberAppEnabled: true, qrCheckInEnabled: true, onlinePaymentsEnabled: true,
    dietPlanEnabled: false, workoutPlanEnabled: false, progressTrackingEnabled: true,
    pushNotificationsEnabled: true, appStoreLink: '', playStoreLink: '', apiKey: 'sk_test_123', webhookUrl: ''
  },
  gst: {
    gstNumber: '27AABCU9603R1ZX', businessLegalName: 'Smart Gym Pvt Ltd', taxRate: '18', stateCode: '27', hsnCode: '999719', showGstOnInvoice: true, taxInclusivePricing: false
  },
  payment: {
    razorpayEnabled: true, razorpayKeyId: 'rzp_test_123', razorpayWebhookSecret: '', upiEnabled: true, upiId: 'smartgym@upi', cashEnabled: true, autoReceiptEnabled: true, receiptPrefix: 'RCP'
  },
  general: {
    timezone: 'Asia/Kolkata', language: 'en', dateFormat: 'DD/MM/YYYY', sessionTimeoutMinutes: 60, dataRetentionMonths: 24, autoBackup: true, backupFrequency: 'daily', maintenanceMode: false, twoFactorAuth: false
  },
};
