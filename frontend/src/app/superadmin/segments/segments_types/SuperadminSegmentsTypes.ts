// RESPONSIBILITY: Defines the runtime-validated contract, mutation payloads, and view props for Superadmin tenant segments.
import { z } from 'zod';
export const SuperadminSegmentSchema = z.object({ id: z.string(), name: z.string(), description: z.string().nullable(), rules: z.number(), tenantCount: z.number(), updatedAt: z.string().nullable(), usedIn: z.string() });
export const SuperadminSegmentsResponseSchema = z.object({
    segments: z.array(SuperadminSegmentSchema),
    presets: z.array(z.object({ name: z.string(), rule: z.string() })),
});
export const SuperadminSegmentMutationResponseSchema = z.object({ segment: SuperadminSegmentSchema });
export type SuperadminSegmentsResponse = z.infer<typeof SuperadminSegmentsResponseSchema>;
export type SuperadminSegment = SuperadminSegmentsResponse['segments'][number];
export interface SuperadminSegmentsSectionProps { data: SuperadminSegmentsResponse; onCreate?: () => void; onEdit?: (segment: SuperadminSegment) => void; onApply?: (segment: SuperadminSegment) => void; }
export interface SuperadminSegmentCreatePayload { name: string; description: string; rules: number; usedIn: string; }
export interface SuperadminSegmentUpdatePayload { name: string; description: string; rules: number; usedIn: string; }
export interface SuperadminSegmentCreateResponse { segment: SuperadminSegment; }
export interface SuperadminSegmentEditorModalProps { segment: SuperadminSegment | null; onClose: () => void; onSaved: () => void; }
