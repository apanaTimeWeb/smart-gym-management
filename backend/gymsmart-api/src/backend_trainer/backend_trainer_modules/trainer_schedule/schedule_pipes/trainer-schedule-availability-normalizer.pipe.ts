// RESPONSIBILITY: Normalizes the frontend raw array availability payload into the DTO wrapper expected by validation.
// FLOW: Raw JSON array/object → normalized TrainerScheduleUpdateAvailabilityBodyDto.

import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common'; import { plainToInstance } from 'class-transformer'; import { validateSync } from 'class-validator'; import { TrainerScheduleUpdateAvailabilityBodyDto } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/schedule_dtos/trainer-schedule-update-availability-body.dto';
 /**
 * Intent: Defines the TrainerScheduleAvailabilityNormalizerPipe boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable() export class TrainerScheduleAvailabilityNormalizerPipe implements PipeTransform { /** Normalizes both documented object and actual frontend raw-array payload forms. */ transform(value:unknown,_metadata:ArgumentMetadata):TrainerScheduleUpdateAvailabilityBodyDto{const source=Array.isArray(value)?{days:value}:value; const dto=plainToInstance(TrainerScheduleUpdateAvailabilityBodyDto,source); const errors=validateSync(dto); if(errors.length) throw new BadRequestException(errors); return dto;} }
