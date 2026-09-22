// RESPONSIBILITY: Applies bounded free-text sanitization before persistence.
// FLOW: DTO/service input → CoreSanitizationService → normalized safe text.

import { Injectable } from '@nestjs/common';

@Injectable()
export class CoreSanitizationService {
  text(value: string | null | undefined): string | null {
    if (value == null) return null;
    return value.replace(/[<>]/g, '').replace(/javascript\s*:/gi, '').replace(/on[a-z]+\s*=/gi, '').trim();
  }
}
