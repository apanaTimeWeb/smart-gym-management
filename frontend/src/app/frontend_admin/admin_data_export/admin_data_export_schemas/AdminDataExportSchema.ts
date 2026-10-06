import { z } from 'zod';

/**
 * @description Canonical schema discovery entry point for Admin Data Export. The feature is intentionally scope-blocked because no trustworthy export request/response contract was supplied.
 * @dependencies No API/domain fields are inferred here; the consuming backend contract must replace this sentinel before export payload validation is implemented.
 * @edge-case Every payload currently fails validation so the frontend cannot silently fabricate an export contract.
 */
export const AdminDataExportSchema = z.never();
