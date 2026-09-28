// RESPONSIBILITY: Defines the exact frontend-consumed response contract for the owning Manager feature.
// FLOW: Repository/domain projection -> canonical response DTO -> HTTP envelope.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FinancePaymentMemberResponseDto } from '@/backend_manager/manager_modules/finance/finance_responses/manager-finance-payment-member.response.dto';
export class ManagerFinanceCreatePaymentResponseDto {
 @ApiProperty() id!: string; @ApiProperty() memberId!: string; @ApiProperty({type:Number}) amount!: number; @ApiProperty({enum:['UPI','Cash','Card','NetBanking','Cheque','Other']}) method!: string; @ApiProperty({enum:['PAID','PENDING','REFUNDED','PARTIAL']}) status!: string;
 @ApiPropertyOptional() notes?: string; @ApiProperty() invoiceNumber!: string; @ApiPropertyOptional() receiptNumber?: string; @ApiPropertyOptional() taxId?: string; @ApiProperty() paidAt!: string; @ApiProperty({type:Number}) gstAmount!: number; @ApiProperty({type:Number}) discountAmount!: number; @ApiPropertyOptional() couponCode?: string; @ApiProperty({type:Number}) taxableAmount!: number;
 @ApiPropertyOptional({type:FinancePaymentMemberResponseDto}) member?: FinancePaymentMemberResponseDto;
}
export { ManagerFinanceCreatePaymentResponseDto as FinanceCreatePaymentResponseDto };
