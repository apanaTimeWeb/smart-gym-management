// RESPONSIBILITY: Defines isolated shared type contracts for a single backend concern.
// FLOW: Typed producer/consumer boundary → compile-time contract only; no runtime business behavior.

import type { CorePaginationMeta } from '@/backend_trainer/backend_core/core_utils/core-pagination.utils';

export interface CorePaginatedResult { pagination: CorePaginationMeta; }
