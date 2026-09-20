/**
 * RESPONSIBILITY: Represents a user-safe Auth API failure without exposing raw backend details to the login UI.
 * DATA FLOW: AuthApi response -> AuthApiError -> login form root error.
 */
export class AuthApiError extends Error {
  public readonly errorCode?: string;

  public constructor(message: string, errorCode?: string) {
    super(message);
    this.name = 'AuthApiError';
    this.errorCode = errorCode;
  }
}
