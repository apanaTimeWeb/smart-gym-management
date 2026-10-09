import { describe, expect, it } from 'vitest';

import { z } from 'zod';

import { TrainerInfrastructureApiResponseSchema } from '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_schemas/TrainerInfrastructureApiResponseSchema';

describe('TrainerInfrastructureApiResponseSchema', () => {
  const schema = TrainerInfrastructureApiResponseSchema(z.object({ id: z.string() }).nullable());

  it('accepts a successful, schema-valid response envelope', () => {
    expect(schema.parse({ success: true, message: 'OK', data: { id: 'item-1' } }).success).toBe(true);
  });

  it('rejects success:false so mutation callers cannot treat a failed envelope as a resolved success', () => {
    expect(() => schema.parse({ success: false, message: 'Permission denied', data: null })).toThrow();
  });
});
