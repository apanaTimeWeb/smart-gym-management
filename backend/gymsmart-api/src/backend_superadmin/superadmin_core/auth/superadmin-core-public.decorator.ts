// RESPONSIBILITY: Marks authentication routes that intentionally bypass the JWT guard.
// FLOW: @Public -> SuperadminJwtAuthGuard metadata lookup -> anonymous access allowed.
import { SetMetadata } from '@nestjs/common';
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);