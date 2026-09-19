// RESPONSIBILITY: Converts user-entered major currency units and API minor currency units at application boundaries.

/** Converts a validated user-entered major-unit amount into integer minor currency units for API requests. */
export function toManagerMinorUnits(value: number | string): number {
  const numericValue = typeof value === 'string' ? Number(value) : value;
  if (!Number.isFinite(numericValue) || numericValue < 0) {
    throw new RangeError('Currency amount must be a finite non-negative number.');
  }
  return Math.round((numericValue + Number.EPSILON) * 100);
}

/** Converts an API minor-unit amount into a display/form major-unit number. */
export function fromManagerMinorUnits(value: number): number {
  if (!Number.isFinite(value)) {
    throw new RangeError('Currency amount must be a finite number.');
  }
  return Number((value / 100).toFixed(2));
}
