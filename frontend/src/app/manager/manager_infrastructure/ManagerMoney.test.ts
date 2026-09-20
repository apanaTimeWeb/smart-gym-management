import { describe, expect, it } from 'vitest';
import { fromManagerMinorUnits, toManagerMinorUnits } from '@/app/manager/manager_infrastructure/ManagerMoney';


describe('ManagerMoney', () => {
  it('converts major units to integer minor units', () => {
    expect(toManagerMinorUnits(1500.25)).toBe(150025);
    expect(toManagerMinorUnits('99.99')).toBe(9999);
  });

  it('converts minor units back to major units', () => {
    expect(fromManagerMinorUnits(150025)).toBe(1500.25);
    expect(fromManagerMinorUnits(0)).toBe(0);
  });

  it('rejects invalid currency values', () => {
    expect(() => toManagerMinorUnits(Number.NaN)).toThrow(RangeError);
    expect(() => fromManagerMinorUnits(Number.POSITIVE_INFINITY)).toThrow(RangeError);
  });
});
