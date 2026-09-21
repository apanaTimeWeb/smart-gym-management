// RESPONSIBILITY: Isolates bcrypt credential hashing and comparison from Auth business logic.
// FLOW: AuthLoginService/AuthSeeder -> AuthPasswordUtils -> bcrypt.

export class AuthPasswordUtils {
  /** @description Hashes a password with bcrypt before persistence. @param password - Plaintext password. @returns Bcrypt password hash. */
  static async hash(password: string): Promise<string> {
    const bcrypt = await import('bcrypt');
    return bcrypt.hash(password, 12);
  }

  /** @description Compares a candidate password with a bcrypt hash. @param password - Candidate plaintext password. @param passwordHash - Stored bcrypt hash. @returns True when the password matches. */
  static async compare(password: string, passwordHash: string): Promise<boolean> {
    const bcrypt = await import('bcrypt');
    return bcrypt.compare(password, passwordHash);
  }
}
