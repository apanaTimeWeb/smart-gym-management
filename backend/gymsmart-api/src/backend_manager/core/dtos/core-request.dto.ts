// RESPONSIBILITY: Provides the common typed boundary that lets validated request DTOs cross the controller/use-case boundary without unsafe casts.
// FLOW: HTTP validation -> CoreRequestDto -> feature service -> repository/domain mapping.
import type { CoreJsonValue } from '@/core/types/json-value.types';

export abstract class CoreRequestDto {
  [key: string]: CoreJsonValue;
}
