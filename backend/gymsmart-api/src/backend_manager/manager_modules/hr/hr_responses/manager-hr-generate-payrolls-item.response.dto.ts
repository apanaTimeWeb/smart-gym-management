// RESPONSIBILITY: Defines the exact frontend-consumed response contract for the owning Manager feature.
// FLOW: Repository/domain projection -> canonical response DTO -> HTTP envelope.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class ManagerHrPayrollResponseBaseDto {
 @ApiProperty() id!: string; @ApiProperty() staffId!: string; @ApiProperty() month!: string; @ApiProperty({type:Number}) amount!: number; @ApiProperty({type:Number}) netPayable!: number; @ApiProperty({type:Number}) paidAmount!: number; @ApiProperty({type:Number}) pendingAmount!: number; @ApiProperty() status!: string; @ApiPropertyOptional() paidAt?: string; @ApiPropertyOptional() notes?: string; @ApiProperty({type:Object}) deductions!: {tds:number;pf:number;esi:number;other:number}; @ApiPropertyOptional({type:Object}) staff?: {name:string;role:string};
}
export class ManagerHrGeneratePayrollsItemResponseDto extends ManagerHrPayrollResponseBaseDto {}
export { ManagerHrGeneratePayrollsItemResponseDto as HrGeneratePayrollsItemResponseDto };
