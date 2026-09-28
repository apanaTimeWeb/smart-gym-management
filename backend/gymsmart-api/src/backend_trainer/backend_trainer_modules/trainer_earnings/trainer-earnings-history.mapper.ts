// RESPONSIBILITY: Maps earnings persistence into the explicit frontend earnings history contract.
// FLOW: TrainerEarningsHistoryEntity → explicit monetary mapping → EarningsHistoryDomain.
import type { TrainerEarningsHistoryEntity } from '@/backend_trainer/backend_trainer_modules/trainer_earnings/trainer-earnings-history.entity';
import { TrainerEarningsEnumMapper } from '@/backend_trainer/backend_trainer_modules/trainer_earnings/trainer-earnings-enum.mapper';
import type { EarningsHistoryDomain } from '@/backend_trainer/backend_trainer_modules/trainer_earnings/trainer-earnings-history.domain';
/**
 * @description Executes EarningsHistoryMapper as an isolated backend utility/adapter operation.
 * @param entity - Input for EarningsHistoryMapper.
 * @returns {EarningsHistoryDomain} The deterministic result required by its caller.
 * @throws Infrastructure or canonical application exceptions when the operation cannot complete.
 * @remarks Preserve pure mapping/adapter behavior and avoid introducing business persistence shortcuts.
 * AI Note: Keep the utility isolated and update its direct callers when its contract changes.
 */
export function EarningsHistoryMapper(entity: TrainerEarningsHistoryEntity): EarningsHistoryDomain { return { id:entity.id,date:entity.eventDate,type:TrainerEarningsEnumMapper.toApiHistoryType(entity.type) as EarningsHistoryDomain['type'],description:entity.description,amount:Number(entity.amountMinor),status:TrainerEarningsEnumMapper.toApiStatus(entity.status) as EarningsHistoryDomain['status'],sessionId:entity.sessionId,tdsDeducted:entity.tdsDeductedMinor===null?null:Number(entity.tdsDeductedMinor),netPayout:entity.netPayoutMinor===null?null:Number(entity.netPayoutMinor),invoiceNumber:entity.invoiceNumber }; }
