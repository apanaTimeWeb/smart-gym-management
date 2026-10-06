import { describe, expect, it } from 'vitest';
import { MEMBER_GENDER_OPTIONS, MEMBER_STATUS_OPTIONS, MEMBERS_CYCLE_LABELS, MEMBERS_STATUS_COLORS } from '@/app/frontend_manager/manager_members/manager_members_constants/ManagerMembersUiConstants';

describe('ManagerMembersUiConstants', () => {
  it('keeps status options aligned with semantic status colors', () => {
    const values = MEMBER_STATUS_OPTIONS.map((option) => option.value).filter((value) => value !== 'All');
    expect(values.every((value) => Boolean(MEMBERS_STATUS_COLORS[value]))).toBe(true);
  });

  it('exposes supported membership cycle labels', () => {
    expect(Object.keys(MEMBERS_CYCLE_LABELS)).toEqual(expect.arrayContaining([
      'ONE_MONTH', 'THREE_MONTHS', 'SIX_MONTHS', 'TWELVE_MONTHS', 'CUSTOM',
    ]));
  });

  it('keeps gender filter values explicit and stable', () => {
    expect(MEMBER_GENDER_OPTIONS).toEqual(expect.arrayContaining([
      { label: 'All Genders', value: 'All' },
      { label: 'Male', value: 'MALE' },
      { label: 'Female', value: 'FEMALE' },
      { label: 'Other', value: 'OTHER' },
    ]));
  });
});
