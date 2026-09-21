// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin settings.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// FLOW: Repository domain â†’ Settings response mapper â†’ ApiResponse<T>.

export class AdminGymProfileDto {
  @ApiProperty()
  gymName!: string;
  @ApiProperty()
  ownerName!: string;
  @ApiProperty()
  phone!: string;
  @ApiProperty()
  email!: string;
  @ApiProperty()
  city!: string;
  @ApiPropertyOptional()
  gstNumber?: string;
}

export class AdminNotificationsSettingsDto {
  @ApiProperty()
  smssms!: boolean;
  @ApiProperty()
  emailsms!: boolean;
  @ApiProperty()
  whatsappsms!: boolean;
  @ApiProperty()
  smsonJoin!: boolean;
  @ApiProperty()
  emailonJoin!: boolean;
  @ApiProperty()
  whatsapponJoin!: boolean;
  @ApiProperty()
  smsonExpiry!: boolean;
  @ApiProperty()
  emailonExpiry!: boolean;
  @ApiProperty()
  whatsapponExpiry!: boolean;
  @ApiProperty()
  smsonPayment!: boolean;
  @ApiProperty()
  emailonPayment!: boolean;
  @ApiProperty()
  whatsapponPayment!: boolean;
  @ApiProperty()
  smsonAbsence!: boolean;
  @ApiProperty()
  emailonAbsence!: boolean;
  @ApiProperty()
  whatsapponAbsence!: boolean;
  @ApiProperty()
  expiryReminderDays!: number;
  @ApiProperty()
  absenceThresholdDays!: number;
}

export class AdminAppIntegrationSettingsDto {
  @ApiProperty()
  memberAppEnabled!: boolean;
  @ApiProperty()
  qrCheckInEnabled!: boolean;
  @ApiProperty()
  onlinePaymentsEnabled!: boolean;
  @ApiProperty()
  dietPlanEnabled!: boolean;
  @ApiProperty()
  workoutPlanEnabled!: boolean;
  @ApiProperty()
  progressTrackingEnabled!: boolean;
  @ApiProperty()
  pushNotificationsEnabled!: boolean;
  @ApiPropertyOptional()
  appStoreLink?: string;
  @ApiPropertyOptional()
  playStoreLink?: string;
  @ApiPropertyOptional()
  apiKey?: string;
  @ApiPropertyOptional()
  webhookUrl?: string;
}

export class AdminGstTaxSettingsDto {
  @ApiPropertyOptional()
  gstNumber?: string;
  @ApiPropertyOptional()
  businessLegalName?: string;
  @ApiProperty()
  taxRate!: string;
  @ApiProperty()
  stateCode!: string;
  @ApiPropertyOptional()
  hsnCode?: string;
  @ApiProperty()
  showGstOnInvoice!: boolean;
  @ApiProperty()
  taxInclusivePricing!: boolean;
}

export class AdminPaymentGatewaySettingsDto {
  @ApiProperty()
  razorpayEnabled!: boolean;
  @ApiPropertyOptional()
  razorpayKeyId?: string;
  @ApiPropertyOptional()
  razorpayWebhookSecret?: string;
  @ApiProperty()
  upiEnabled!: boolean;
  @ApiPropertyOptional()
  upiId?: string;
  @ApiProperty()
  cashEnabled!: boolean;
  @ApiProperty()
  autoReceiptEnabled!: boolean;
  @ApiPropertyOptional()
  receiptPrefix?: string;
}

export class AdminGeneralSettingsDto {
  @ApiProperty()
  timezone!: string;
  @ApiProperty()
  language!: string;
  @ApiProperty()
  dateFormat!: string;
  @ApiProperty()
  sessionTimeoutMinutes!: number;
  @ApiProperty()
  dataRetentionMonths!: number;
  @ApiProperty()
  autoBackup!: boolean;
  @ApiProperty()
  backupFrequency!: string;
  @ApiProperty()
  maintenanceMode!: boolean;
  @ApiProperty()
  twoFactorAuth!: boolean;
}

export class AdminSettingsDto {
  @ApiPropertyOptional({ type: AdminGymProfileDto })
  profile?: AdminGymProfileDto;
  @ApiPropertyOptional({ type: AdminNotificationsSettingsDto })
  notifications?: AdminNotificationsSettingsDto;
  @ApiPropertyOptional({ type: AdminAppIntegrationSettingsDto })
  integration?: AdminAppIntegrationSettingsDto;
  @ApiPropertyOptional({ type: AdminGstTaxSettingsDto })
  gst?: AdminGstTaxSettingsDto;
  @ApiPropertyOptional({ type: AdminPaymentGatewaySettingsDto })
  payment?: AdminPaymentGatewaySettingsDto;
  @ApiPropertyOptional({ type: AdminGeneralSettingsDto })
  general?: AdminGeneralSettingsDto;
}

export class AdminSettingsResponseDto {
  @ApiProperty()
  success!: boolean;
  @ApiProperty()
  message!: string;
  @ApiProperty({ type: AdminSettingsDto })
  data!: AdminSettingsDto;
}
