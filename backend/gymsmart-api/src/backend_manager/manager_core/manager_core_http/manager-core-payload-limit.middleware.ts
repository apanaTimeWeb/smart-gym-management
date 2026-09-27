// RESPONSIBILITY: Enforces the global JSON/urlencoded payload ceiling required by Manager backend security rules.
// FLOW: HTTP request -> content-length guard -> downstream parser/controller.
import { Injectable, PayloadTooLargeException, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

@Injectable()
export class ManagerCorePayloadLimitMiddleware implements NestMiddleware {
  /** @description Rejects JSON and urlencoded payloads larger than one megabyte. Multipart endpoints are governed by explicit upload handlers. @param request - HTTP request. @param response - HTTP response. @param next - Next middleware function. @returns Nothing. */
  use(request: Request, _response: Response, next: NextFunction): void {
    const contentType = request.header('content-type') ?? '';
    if ((contentType.includes('application/json') || contentType.includes('application/x-www-form-urlencoded')) && Number(request.header('content-length') ?? 0) > 1_048_576) {
      throw new PayloadTooLargeException('Request payload exceeds the 1MB Manager API limit.');
    }
    next();
  }
}
