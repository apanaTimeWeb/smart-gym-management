# Auth Module - Backend Feature Documentation

## Overview
The Auth module handles user authentication, JWT generation, and profile retrieval for the Smart Gym Management application. It is fully isolated and interacts with the database via a dedicated repository.

## Folder Structure & File Responsibilities

### `controllers/`
- **`auth-login.controller.ts`**: Handles the `POST /api/auth/login` endpoint. Receives incoming credentials via `LoginDto`.
- **`auth-me.controller.ts`**: Handles the `GET /api/auth/me` endpoint. Protected by JWT, returns the current user's profile.

### `services/`
- **`auth-login.service.ts`**: Contains the business logic for verifying user credentials, comparing password hashes using bcrypt, and signing JWT tokens.
- **`auth-me.service.ts`**: Contains the logic to fetch the currently authenticated user's details.
- **`auth.repository.ts`**: The dedicated data-access layer. Wraps TypeORM `Repository<User>` to completely abstract database queries from the business services.

### `dto/`
- **`login.dto.ts`**: Validates the email and password payload using `class-validator`.

### `tests/`
- **`auth-login.service.spec.ts`**: Co-located unit tests for the login service, mocking the repository.
- **`auth-me.service.spec.ts`**: Co-located unit tests for the profile retrieval.
- **`auth.e2e-spec.ts`**: Co-located End-to-End tests simulating HTTP requests to the auth endpoints.

### Module Root
- **`auth.constants.ts`**: Centralized source of truth for success and error messages used in the module.
- **`auth.exceptions.ts`**: Custom, strongly-typed HTTP exceptions (e.g., `InvalidCredentialsException`, `AccountDeactivatedException`).
- **`auth.interfaces.ts`**: TypeScript definitions for standardizing the shape of internal data and API responses (`JwtPayload`, `AuthLoginResponse`).
- **`auth.strategy.ts`**: Configures the Passport JWT strategy to validate incoming tokens on protected routes.
- **`auth.module.ts`**: The NestJS module definition, tying all controllers, services, and repositories together.
- **`auth_collection.json`**: A Postman collection for manual verification of the Auth API.
- **`entities/user.entity.ts`**: The TypeORM entity defining the User database schema. Uses `uuid` as the primary key.

## Core Logic & Workflows
1. **Login Flow**: When a user logs in, the controller passes the DTO to `AuthLoginService`. The service calls `AuthRepository` to fetch the user by email, checks if the account is active, verifies the password with bcrypt, and finally generates a signed JWT.
2. **Protection**: Routes are protected using `JwtAuthGuard` which utilizes `JwtStrategy`. The strategy uses `AuthRepository` to ensure the user ID encoded in the token still corresponds to an active account.
