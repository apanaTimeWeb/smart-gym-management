// RESPONSIBILITY: Maps earnings persistence into the explicit frontend earnings history contract.
// FLOW: EarningsHistoryEntity → explicit monetary mapping → EarningsHistoryDomain.
import type { EarningsHistoryEntity } from '@/backend_trainer/modules/backend_trainer/earnings/earnings-history.entity';
import type { EarningsHistoryDomain } from '@/backend_trainer/modules/backend_trainer/earnings/earnings-history.domain';
export function EarningsHistoryMapper(entity: EarningsHistoryEntity): EarningsHistoryDomain { return { id:entity.id,date:entity.eventDate,type:entity.type,description:entity.description,amount:Number(entity.amountMinor),status:entity.status,sessionId:entity.sessionId,tdsDeducted:entity.tdsDeductedMinor===null?null:Number(entity.tdsDeductedMinor),netPayout:entity.netPayoutMinor===null?null:Number(entity.netPayoutMinor),invoiceNumber:entity.invoiceNumber }; }
