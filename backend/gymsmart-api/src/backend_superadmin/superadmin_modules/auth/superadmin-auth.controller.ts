// RESPONSIBILITY: Owns HTTP transport for the auth.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { SuperadminAuthLoginDto } from '@/backend_superadmin/superadmin_modules/auth/auth_dtos/superadmin-auth-login.dto';
import { SuperadminAuthService } from '@/backend_superadmin/superadmin_modules/auth/superadmin-auth.service';
import { SuperadminAuthGhostCookieDto } from '@/backend_superadmin/superadmin_modules/auth/auth_dtos/superadmin-auth-ghost-cookie.dto';
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-idempotency.decorator';
import { Public } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-public.decorator';

/**
 * Primary Intent: Defines SuperadminAuthController as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@ApiTags('superadmin/auth')
@Controller('superadmin/auth')
export class SuperadminAuthController {
  constructor(private readonly service: SuperadminAuthService, private readonly config: ConfigService) {}
/**
 * Primary Intent: Executes the login use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Logs in a Superadmin and places the refresh token in an HttpOnly cookie. */
  @RequireIdempotencyKey()
  @Public()
  // SLA: STANDARD
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
  @ApiOperation({ summary: 'login' })
  /**
   * Primary Intent: Executes the login use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async login(@Body() body: SuperadminAuthLoginDto, @Req() _request: Request, @Res({ passthrough: true }) response: Response): Promise<{ accessToken: string; user: { id: string; email: string; role: string } }> {
    const result = await this.service.login(body.email, body.password);
    this.setRefreshCookie(response, result.refreshToken);
    return { accessToken: result.accessToken, user: result.user };
  }
/**
 * Primary Intent: Executes the refresh use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Rotates a refresh token read exclusively from the HttpOnly cookie. */
  @RequireIdempotencyKey()
  @Public()
  // SLA: STANDARD
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Rotate refresh token' })
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
  /**
   * Primary Intent: Executes the refresh use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async refresh(@Req() request: Request, @Res({ passthrough: true }) response: Response): Promise<{ accessToken: string }> {
    const refreshToken = request.cookies?.refresh_token;
    const result = await this.service.refresh(refreshToken ?? '');
    this.setRefreshCookie(response, result.refreshToken);
    return { accessToken: result.accessToken };
  }
/**
 * Primary Intent: Executes the logout use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Revokes the current refresh token and clears the HttpOnly cookie. */
  @RequireIdempotencyKey()
  @Public()
  // SLA: STANDARD
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiOperation({ summary: 'logout' })
  /**
   * Primary Intent: Executes the logout use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async logout(@Req() request: Request, @Res({ passthrough: true }) response: Response): Promise<void> {
    await this.service.logout(request.cookies?.refresh_token ?? '');
    response.clearCookie('refresh_token', { httpOnly: true, sameSite: 'lax', secure: this.isProduction(), path: '/auth' });
    response.clearCookie('ghost_session', { httpOnly: true, sameSite: 'lax', secure: this.isProduction(), path: '/' });
  }
/**
 * Primary Intent: Executes the setGhostLoginCookie use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Exchanges a signed Superadmin impersonation handoff for an HttpOnly browser session cookie without trusting client-supplied user metadata. */
  @RequireIdempotencyKey()
  @Public()
  // SLA: STANDARD
  @Post('set-cookie')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Establish ghost-login session cookie' })
  @ApiResponse({ status: HttpStatus.OK })
  /**
   * Primary Intent: Executes the setGhostLoginCookie use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async setGhostLoginCookie(@Body() body: SuperadminAuthGhostCookieDto, @Res({ passthrough: true }) response: Response): Promise<null> {
    const claims = await this.service.verifyGhostHandoff(body.token);
    response.cookie('ghost_session', body.token, { httpOnly: true, sameSite: 'lax', secure: this.isProduction(), path: '/', maxAge: Math.max(0, (claims.exp * 1000) - Date.now()) });
    return null;
  }
/**
 * Primary Intent: Executes the exitGhostLogin use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Clears the ghost-login browser session so an impersonated session can exit safely. */
  @RequireIdempotencyKey()
  @Public()
  // SLA: STANDARD
@Post('exit-ghost-login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Exit ghost-login session' })
  @ApiResponse({ status: HttpStatus.OK })
  /**
   * Primary Intent: Executes the exitGhostLogin use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async exitGhostLogin(@Res({ passthrough: true }) response: Response): Promise<null> {
    response.clearCookie('ghost_session', { httpOnly: true, sameSite: 'lax', secure: this.isProduction(), path: '/' });
    response.clearCookie('refresh_token', { httpOnly: true, sameSite: 'lax', secure: this.isProduction(), path: '/auth' });
    return null;
  }
/**
 * Primary Intent: Executes the setRefreshCookie use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the setRefreshCookie use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private setRefreshCookie(response: Response, token: string): void {
    response.cookie('refresh_token', token, { httpOnly: true, sameSite: 'lax', secure: this.isProduction(), path: '/auth', maxAge: 7 * 24 * 60 * 60 * 1000 });
  }
/**
 * Primary Intent: Executes the isProduction use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the isProduction use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private isProduction(): boolean { return this.config.get<string>('app.nodeEnv') === 'production'; }
}
