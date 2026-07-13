import { renderHook, act } from '@testing-library/react-hooks';
import { useLoginForm } from './useLoginForm';

// RESPONSIBILITY: Tests the custom hook managing the form state and logic for login.
describe('useLoginForm', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useLoginForm());
    expect(result.current.status).toBe('idle');
    expect(result.current.showPassword).toBe(false);
  });
});
