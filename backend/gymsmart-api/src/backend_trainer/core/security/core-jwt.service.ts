// RESPONSIBILITY: Provides short-lived access token issuing for test/bootstrap workflows without exposing secrets.
// FLOW: Trusted seed/user auth → JwtService → signed access token.


import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CoreRequestContext } from '@/backend_trainer/core/context/core-request-context';
import type { CoreRole } from '@/backend_trainer/core/types/core-auth.types';
@Injectable()
export class CoreJwtService {
  constructor(private readonly jwt: JwtService) {}
  /** Creates a short-lived access token for a known actor. */
  signAccessToken(userId: string, email: string, role: CoreRole): string { return this.jwt.sign({ userId, email, role }); }
  /** Returns the currently authenticated user identifier for audit helpers. */
  getCurrentUserId(): string { return CoreRequestContext.get().userId ?? ''; }
}
