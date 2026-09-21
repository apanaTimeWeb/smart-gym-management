// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin finance.
import { ApiProperty } from '@nestjs/swagger';

// FLOW: Repository domain → Finance response mapper → ApiResponse<T>.

export class AdminFinanceResponseDto {
  id!: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: createdAt' })
  createdAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: updatedAt' })
  updatedAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: payments' })
  payments?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: total' })
  total?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: paymentId' })
  paymentId?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: memberId' })
  memberId?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: amount' })
  amount?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: method' })
  method?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: paymentMode' })
  paymentMode?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: gstAmount' })
  gstAmount?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: taxRate' })
  taxRate?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: invoiceNumber' })
  invoiceNumber?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: hsn_code' })
  hsn_code?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: planId' })
  planId?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: type' })
  type?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: status' })
  status?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: notes' })
  notes?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: invoiceNo' })
  invoiceNo?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: paidAt' })
  paidAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: refundReason' })
  refundReason?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: receiptNumber' })
  receiptNumber?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: discountApplied' })
  discountApplied?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: couponCode' })
  couponCode?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: expenses' })
  expenses?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: totalAmount' })
  totalAmount?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: category' })
  category?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: branchId' })
  branchId?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: date' })
  date?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: recordedBy' })
  recordedBy?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: vendor' })
  vendor?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: billNumber' })
  billNumber?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: approvedBy' })
  approvedBy?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: receiptUrl' })
  receiptUrl?: string;
}
