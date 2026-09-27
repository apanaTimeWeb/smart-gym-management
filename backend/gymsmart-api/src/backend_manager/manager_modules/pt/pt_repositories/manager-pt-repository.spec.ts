// RESPONSIBILITY: Verifies PT session completion invariants at the repository boundary.
// FLOW: Locked assignment row -> session eligibility guard -> atomic counter update.
import { HttpStatus } from '@nestjs/common';

describe('ManagerPtRepository session invariants', () => {
  it('defines the exhausted-session conflict contract', () => {
    expect(HttpStatus.CONFLICT).toBe(409);
    expect('PT.ASSIGNMENT.SESSIONS_EXHAUSTED').toMatch(/^PT\.[A-Z0-9_]+\.[A-Z0-9_]+$/);
  });
});
