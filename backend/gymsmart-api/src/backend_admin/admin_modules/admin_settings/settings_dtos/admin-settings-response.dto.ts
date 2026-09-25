// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin settings.
// FLOW: Repository domain â†’ Settings response mapper â†’ ApiResponse<T>.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * @description Defines the AdminGymProfileDto boundary for the admin_settings backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminGymProfileDto {
@ApiProperty() gymName!: string;
@ApiProperty() ownerName!: string;
@ApiProperty() phone!: string;
@ApiProperty() email!: string;
@ApiProperty() city!: string;
@ApiPropertyOptional() gstNumber?: string;
}
/**
 * @description Defines the AdminNotificationsSettingsDto boundary for the admin_settings backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminNotificationsSettingsDto {
@ApiProperty() smssms!: boolean;
@ApiProperty() emailsms!: boolean;
@ApiProperty() whatsappsms!: boolean;
@ApiProperty() smsonJoin!: boolean;
@ApiProperty() emailonJoin!: boolean;
@ApiProperty() whatsapponJoin!: boolean;
@ApiProperty() smsonExpiry!: boolean;
@ApiProperty() emailonExpiry!: boolean;
@ApiProperty() whatsapponExpiry!: boolean;
@ApiProperty() smsonPayment!: boolean;
@ApiProperty() emailonPayment!: boolean;
@ApiProperty() whatsapponPayment!: boolean;
@ApiProperty() smsonAbsence!: boolean;
@ApiProperty() emailonAbsence!: boolean;
@ApiProperty() whatsapponAbsence!: boolean;
@ApiProperty() expiryReminderDays!: number;
@ApiProperty() absenceThresholdDays!: number;
}
/**
 * @description Defines the AdminAppIntegrationSettingsDto boundary for the admin_settings backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminAppIntegrationSettingsDto {
@ApiProperty() memberAppEnabled!: boolean;
@ApiProperty() qrCheckInEnabled!: boolean;
@ApiProperty() onlinePaymentsEnabled!: boolean;
@ApiProperty() dietPlanEnabled!: boolean;
@ApiProperty() workoutPlanEnabled!: boolean;
@ApiProperty() progressTrackingEnabled!: boolean;
@ApiProperty() pushNotificationsEnabled!: boolean;
@ApiPropertyOptional() appStoreLink?: string;
@ApiPropertyOptional() playStoreLink?: string;
@ApiPropertyOptional() apiKey?: string;
@ApiPropertyOptional() webhookUrl?: string;
}
/**
 * @description Defines the AdminGstTaxSettingsDto boundary for the admin_settings backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminGstTaxSettingsDto {
@ApiPropertyOptional() gstNumber?: string;
@ApiPropertyOptional() businessLegalName?: string;
@ApiProperty() taxRate!: string;
@ApiProperty() stateCode!: string;
@ApiPropertyOptional() hsnCode?: string;
@ApiProperty() showGstOnInvoice!: boolean;
@ApiProperty() taxInclusivePricing!: boolean;
}
/**
 * @description Defines the AdminPaymentGatewaySettingsDto boundary for the admin_settings backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminPaymentGatewaySettingsDto {
@ApiProperty() razorpayEnabled!: boolean;
@ApiPropertyOptional() razorpayKeyId?: string;
@ApiPropertyOptional() razorpayWebhookSecret?: string;
@ApiProperty() upiEnabled!: boolean;
@ApiPropertyOptional() upiId?: string;
@ApiProperty() cashEnabled!: boolean;
@ApiProperty() autoReceiptEnabled!: boolean;
@ApiPropertyOptional() receiptPrefix?: string;
}
/**
 * @description Defines the AdminGeneralSettingsDto boundary for the admin_settings backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminGeneralSettingsDto {
@ApiProperty() timezone!: string;
@ApiProperty() language!: string;
@ApiProperty() dateFormat!: string;
@ApiProperty() sessionTimeoutMinutes!: number;
@ApiProperty() dataRetentionMonths!: number;
@ApiProperty() autoBackup!: boolean;
@ApiProperty() backupFrequency!: string;
@ApiProperty() maintenanceMode!: boolean;
@ApiProperty() twoFactorAuth!: boolean;
}
/**
 * @description Defines the AdminSettingsDto boundary for the admin_settings backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminSettingsDto {
@ApiPropertyOptional({ type: AdminGymProfileDto }) profile?: AdminGymProfileDto;
@ApiPropertyOptional({ type: AdminNotificationsSettingsDto }) notifications?: AdminNotificationsSettingsDto;
@ApiPropertyOptional({ type: AdminAppIntegrationSettingsDto }) integration?: AdminAppIntegrationSettingsDto;
@ApiPropertyOptional({ type: AdminGstTaxSettingsDto }) gst?: AdminGstTaxSettingsDto;
@ApiPropertyOptional({ type: AdminPaymentGatewaySettingsDto }) payment?: AdminPaymentGatewaySettingsDto;
@ApiPropertyOptional({ type: AdminGeneralSettingsDto }) general?: AdminGeneralSettingsDto;
}
/**
 * @description Defines the AdminSettingsResponseDto boundary for the admin_settings backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminSettingsResponseDto {
@ApiProperty() success!: boolean;
@ApiProperty() message!: string;
@ApiProperty({ type: AdminSettingsDto }) data!: AdminSettingsDto;
}

// RESPONSIBILITY: Defines the typed Admin two-factor authentication status response.
// FLOW: Settings query service → AdminTwoFactorStatusDto → canonical response envelope.
/**
 * @description Defines the AdminTwoFactorStatusDto boundary for the admin_settings backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminTwoFactorStatusDto {
@ApiProperty()
  twoFactorEnabled!: boolean;
}
