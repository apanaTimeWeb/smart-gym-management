// RESPONSIBILITY: Maps progress ORM state into the explicit Trainer progress contract.
// FLOW: TrainerProgressTrackingProgressEntryEntity → explicit field mapping → domain response.
import type { TrainerProgressTrackingProgressEntryEntity } from '@/backend_trainer/backend_trainer_modules/trainer_progress-tracking/trainer-progress-tracking-progress-entry.entity';
import type { ProgressTrackingProgressEntryDomain } from '@/backend_trainer/backend_trainer_modules/trainer_progress-tracking/trainer-progress-tracking-progress-entry.domain';
/**
 * @description Executes ProgressTrackingProgressEntryMapper as an isolated backend utility/adapter operation.
 * @param entity - Input for ProgressTrackingProgressEntryMapper.
 * @returns {ProgressTrackingProgressEntryDomain} The deterministic result required by its caller.
 * @throws Infrastructure or canonical application exceptions when the operation cannot complete.
 * @remarks Preserve pure mapping/adapter behavior and avoid introducing business persistence shortcuts.
 * AI Note: Keep the utility isolated and update its direct callers when its contract changes.
 */
export function ProgressTrackingProgressEntryMapper(entity: TrainerProgressTrackingProgressEntryEntity): ProgressTrackingProgressEntryDomain { return { id:entity.id,memberId:entity.memberId,date:entity.date,weightKg:Number(entity.weightKg),heightCm:Number(entity.heightCm),bmi:Number(entity.bmi),bodyFatPercent:entity.bodyFatPercent===null?null:Number(entity.bodyFatPercent),muscleMassKg:entity.muscleMassKg===null?null:Number(entity.muscleMassKg),chestCm:entity.chestCm===null?null:Number(entity.chestCm),waistCm:entity.waistCm===null?null:Number(entity.waistCm),hipCm:entity.hipCm===null?null:Number(entity.hipCm),notes:entity.notes,recordedBy:entity.recordedBy,bloodPressure:entity.bloodPressure,restingHeartRate:entity.restingHeartRate===null?null:Number(entity.restingHeartRate),vo2Max:entity.vo2Max===null?null:Number(entity.vo2Max),progressPhotos:entity.progressPhotos }; }
