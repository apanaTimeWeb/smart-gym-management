// RESPONSIBILITY: Defines HTTP request shapes shared by core observability interceptors without embedding business data.
// FLOW: Express request -> route-aware interceptor -> canonical metrics/logging labels.

import type { Request } from 'express';

export type CoreRouteRequest = Request & { route?: { path?: unknown } };
