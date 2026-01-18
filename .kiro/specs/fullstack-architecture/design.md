# Design Document

## Overview

This document defines the production-ready architecture for a full-stack application using Node.js/Express.js/TypeScript on the backend and React/TypeScript on the frontend. The architecture follows Clean Architecture principles with clear separation of concerns, strong type contracts, and enterprise-grade security. The design prioritizes scalability, maintainability, and team collaboration.

## Architecture

### Architectural Principles

**Clean Architecture Layers:**
- **Presentation Layer**: Routes and controllers handle HTTP concerns
- **Business Logic Layer**: Services contain domain logic and orchestration
- **Data Access Layer**: Repositories abstract database operations
- **Domain Layer**: Entities and interfaces define core business concepts

**Dependency Rule:**
- Outer layers depend on inner layers, never the reverse
- Business logic has no knowledge of HTTP or database specifics
- Interfaces define contracts between layers

**Separation of Concerns:**
- Each layer has a single, well-defined responsibility
- Cross-cutting concerns (logging, auth) implemented as middleware
- Configuration separated from business logic

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend (React)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │  Components  │  │    Hooks     │  │   Services   │        │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘        │
│         │                  │                  │              │
│         └──────────────────┴──────────────────┘              │
│                            │                                 │
│                     ┌──────▼───────┐                         │
│                     │  API Client  │                         │
│                     └──────┬───────┘                         │
└────────────────────────────┼─────────────────────────────────┘
                             │ HTTP/JSON
                             │
┌────────────────────────────▼─────────────────────────────────┐
│                      Backend (Express)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │   Routes     │─▶│ Controllers  │─▶│   Services   │       │
│  └──────────────┘  └──────────────┘  └──────┬───────┘        │
│                                              │               │
│                                       ┌──────▼───────┐       │
│                                       │ Repositories │       │
│                                       └──────┬───────┘       │
└──────────────────────────────────────────────┼───────────────┘
                                               │
                                        ┌──────▼───────┐
                                        │   Database   │
                                        └──────────────┘
```

## Components and Interfaces

### Backend Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.ts          # Database connection configuration
│   │   ├── env.ts                # Environment variable validation
│   │   ├── logger.ts             # Logger configuration
│   │   └── security.ts           # Security settings (CORS, helmet)
│   ├── controllers/
│   │   ├── auth.controller.ts    # Authentication endpoints
│   │   ├── user.controller.ts    # User management endpoints
│   │   └── base.controller.ts    # Base controller with common methods
│   ├── services/
│   │   ├── auth.service.ts       # Authentication business logic
│   │   ├── user.service.ts       # User business logic
│   │   ├── token.service.ts      # JWT token operations
│   │   └── email.service.ts      # Email sending operations
│   ├── repositories/
│   │   ├── user.repository.ts    # User data access
│   │   ├── token.repository.ts   # Token data access
│   │   └── base.repository.ts    # Base repository with common CRUD
│   ├── models/
│   │   ├── user.model.ts         # User entity definition
│   │   ├── token.model.ts        # Token entity definition
│   │   └── index.ts              # Model exports
│   ├── routes/
│   │   ├── auth.routes.ts        # Authentication routes
│   │   ├── user.routes.ts        # User routes
│   │   └── index.ts              # Route aggregation
│   ├── middleware/
│   │   ├── auth.middleware.ts    # JWT validation
│   │   ├── authorize.middleware.ts # Role-based access control
│   │   ├── validate.middleware.ts  # Request validation
│   │   ├── error.middleware.ts   # Global error handler
│   │   ├── rateLimit.middleware.ts # Rate limiting
│   │   └── logger.middleware.ts  # Request logging
│   ├── types/
│   │   ├── express.d.ts          # Express type extensions
│   │   ├── api.types.ts          # API contract types
│   │   ├── auth.types.ts         # Authentication types
│   │   └── common.types.ts       # Shared types
│   ├── utils/
│   │   ├── errors.ts             # Custom error classes
│   │   ├── validation.ts         # Validation helpers
│   │   ├── crypto.ts             # Cryptographic utilities
│   │   └── response.ts           # Response formatting
│   ├── database/
│   │   ├── migrations/           # Database migrations
│   │   ├── seeds/                # Seed data
│   │   └── connection.ts         # Database connection pool
│   ├── tests/
│   │   ├── unit/                 # Unit tests
│   │   ├── integration/          # Integration tests
│   │   └── helpers/              # Test utilities
│   ├── app.ts                    # Express app setup
│   └── server.ts                 # Server entry point
├── .env.example
├── .env.development
├── .env.production
├── tsconfig.json
├── package.json
├── Dockerfile
└── docker-compose.yml
```

**Layer Responsibilities:**

- **config/**: Environment-specific configuration, no business logic
- **routes/**: HTTP route definitions, maps URLs to controllers
- **controllers/**: Request/response handling, input validation, delegates to services
- **services/**: Business logic, orchestrates repositories and external services
- **repositories/**: Data access abstraction, database queries
- **models/**: Entity definitions, database schema representation
- **middleware/**: Cross-cutting concerns (auth, logging, error handling)
- **types/**: TypeScript interfaces and type definitions
- **utils/**: Pure functions, helpers, no dependencies on other layers

### Frontend Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.test.tsx
│   │   │   │   └── Button.module.css
│   │   │   ├── Input/
│   │   │   ├── Modal/
│   │   │   └── Layout/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── RegisterForm.tsx
│   │   │   │   └── PasswordReset.tsx
│   │   │   └── user/
│   │   │       ├── UserProfile.tsx
│   │   │       ├── UserList.tsx
│   │   │       └── UserEdit.tsx
│   │   └── layout/
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       └── Sidebar.tsx
│   ├── hooks/
│   │   ├── useAuth.ts            # Authentication hook
│   │   ├── useApi.ts             # API call hook
│   │   ├── useForm.ts            # Form handling hook
│   │   └── usePagination.ts      # Pagination hook
│   ├── services/
│   │   ├── api/
│   │   │   ├── client.ts         # Axios instance configuration
│   │   │   ├── auth.api.ts       # Auth API calls
│   │   │   ├── user.api.ts       # User API calls
│   │   │   └── interceptors.ts   # Request/response interceptors
│   │   ├── storage.service.ts    # LocalStorage abstraction
│   │   └── validation.service.ts # Client-side validation
│   ├── contexts/
│   │   ├── AuthContext.tsx       # Authentication state
│   │   ├── ThemeContext.tsx      # Theme state
│   │   └── NotificationContext.tsx # Notification state
│   ├── types/
│   │   ├── api.types.ts          # API contract types (shared with backend)
│   │   ├── auth.types.ts         # Auth types (shared with backend)
│   │   ├── user.types.ts         # User types (shared with backend)
│   │   └── common.types.ts       # Common types
│   ├── utils/
│   │   ├── format.ts             # Formatting utilities
│   │   ├── validation.ts         # Validation helpers
│   │   └── constants.ts          # Application constants
│   ├── routes/
│   │   ├── AppRoutes.tsx         # Route definitions
│   │   ├── PrivateRoute.tsx      # Protected route wrapper
│   │   └── PublicRoute.tsx       # Public route wrapper
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   └── NotFound.tsx
│   ├── styles/
│   │   ├── global.css
│   │   ├── variables.css
│   │   └── themes.css
│   ├── tests/
│   │   ├── unit/
│   │   ├── integration/
│   │   └── helpers/
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── public/
├── .env.example
├── .env.development
├── .env.production
├── tsconfig.json
├── vite.config.ts
├── package.json
├── Dockerfile
└── docker-compose.yml
```

**Layer Responsibilities:**

- **components/common/**: Reusable UI components, no business logic
- **components/features/**: Feature-specific components, uses hooks and services
- **hooks/**: Custom React hooks, encapsulate stateful logic
- **services/**: API communication, external service integration
- **contexts/**: Global state management using React Context
- **types/**: TypeScript interfaces matching backend contracts
- **utils/**: Pure utility functions, formatting, constants
- **routes/**: Route configuration and protection logic
- **pages/**: Top-level page components, compose features

## Data Models

### Core TypeScript Interfaces

**Shared Types (backend/src/types/common.types.ts and frontend/src/types/common.types.ts):**

```typescript
// API Response Wrapper
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  metadata?: ResponseMetadata;
}

export interface ResponseMetadata {
  timestamp: string;
  requestId: string;
  version: string;
}

// Error Response
export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, any>;
    stack?: string; // Only in development
  };
  metadata?: ResponseMetadata;
}

// Pagination
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  success: true;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  metadata?: ResponseMetadata;
}

// Base Entity
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}
```

**User Types (backend/src/types/auth.types.ts and frontend/src/types/auth.types.ts):**

```typescript
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator'
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING = 'pending'
}

export interface User extends BaseEntity {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  status: UserStatus;
  emailVerified: boolean;
  lastLoginAt?: Date;
}

// Backend only - never sent to frontend
export interface UserWithPassword extends User {
  passwordHash: string;
}

export interface CreateUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: UserRole;
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: UserRole;
  status?: UserStatus;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}
```

**Authentication Types:**

```typescript
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number; // seconds
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
}

export interface RefreshTokenPayload {
  userId: string;
  tokenId: string;
  iat: number;
  exp: number;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  newPassword: string;
}
```

**Request Context (backend only):**

```typescript
export interface RequestContext {
  user: User;
  requestId: string;
  ip: string;
  userAgent: string;
  timestamp: Date;
}

// Express Request extension
declare global {
  namespace Express {
    interface Request {
      context?: RequestContext;
      user?: User;
    }
  }
}
```

**Repository Interfaces (backend only):**

```typescript
export interface IRepository<T extends BaseEntity> {
  findById(id: string): Promise<T | null>;
  findAll(params?: PaginationParams): Promise<PaginatedResponse<T>>;
  create(data: Partial<T>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
  softDelete(id: string): Promise<void>;
}

export interface IUserRepository extends IRepository<User> {
  findByEmail(email: string): Promise<UserWithPassword | null>;
  findByRole(role: UserRole): Promise<User[]>;
  updateLastLogin(userId: string): Promise<void>;
  verifyEmail(userId: string): Promise<void>;
}

export interface ITokenRepository {
  create(userId: string, token: string, expiresAt: Date): Promise<void>;
  findByToken(token: string): Promise<RefreshToken | null>;
  revoke(token: string): Promise<void>;
  revokeAllForUser(userId: string): Promise<void>;
  deleteExpired(): Promise<void>;
}
```

**Service Interfaces (backend only):**

```typescript
export interface IAuthService {
  register(credentials: RegisterCredentials): Promise<AuthResponse>;
  login(credentials: LoginCredentials): Promise<AuthResponse>;
  logout(refreshToken: string): Promise<void>;
  refreshTokens(refreshToken: string): Promise<AuthTokens>;
  requestPasswordReset(email: string): Promise<void>;
  resetPassword(token: string, newPassword: string): Promise<void>;
  verifyEmail(token: string): Promise<void>;
}

export interface IUserService {
  getUserById(id: string): Promise<User>;
  getUsers(params: PaginationParams): Promise<PaginatedResponse<User>>;
  createUser(data: CreateUserDto): Promise<User>;
  updateUser(id: string, data: UpdateUserDto): Promise<User>;
  deleteUser(id: string): Promise<void>;
  changePassword(userId: string, data: ChangePasswordDto): Promise<void>;
}

export interface ITokenService {
  generateAccessToken(user: User): string;
  generateRefreshToken(userId: string, tokenId: string): string;
  verifyAccessToken(token: string): JwtPayload;
  verifyRefreshToken(token: string): RefreshTokenPayload;
  generatePasswordResetToken(userId: string): string;
  verifyPasswordResetToken(token: string): { userId: string };
}
```

### Database Schema

**Users Table:**

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'user',
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  email_verified BOOLEAN DEFAULT FALSE,
  last_login_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMP,
  
  CONSTRAINT users_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT users_role_check CHECK (role IN ('admin', 'user', 'moderator')),
  CONSTRAINT users_status_check CHECK (status IN ('active', 'inactive', 'suspended', 'pending'))
);

CREATE INDEX idx_users_email ON users(email) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_role ON users(role) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_status ON users(status) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_created_at ON users(created_at);
```

**Refresh Tokens Table:**

```sql
CREATE TABLE refresh_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  revoked BOOLEAN DEFAULT FALSE,
  revoked_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  ip_address VARCHAR(45),
  user_agent TEXT,
  
  CONSTRAINT refresh_tokens_user_id_fk FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_refresh_tokens_user_id ON refresh_tokens(user_id);
CREATE INDEX idx_refresh_tokens_token_hash ON refresh_tokens(token_hash) WHERE revoked = FALSE;
CREATE INDEX idx_refresh_tokens_expires_at ON refresh_tokens(expires_at);
```

**Password Reset Tokens Table:**

```sql
CREATE TABLE password_reset_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  used_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  
  CONSTRAINT password_reset_tokens_user_id_fk FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_password_reset_tokens_user_id ON password_reset_tokens(user_id);
CREATE INDEX idx_password_reset_tokens_token_hash ON password_reset_tokens(token_hash) WHERE used = FALSE;
CREATE INDEX idx_password_reset_tokens_expires_at ON password_reset_tokens(expires_at);
```

**Audit Log Table (Optional but Recommended):**

```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(100) NOT NULL,
  entity_id UUID,
  changes JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  
  CONSTRAINT audit_logs_user_id_fk FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
```

**Database Relationships:**

- Users (1) → (N) Refresh Tokens: One user can have multiple active refresh tokens
- Users (1) → (N) Password Reset Tokens: One user can request multiple password resets
- Users (1) → (N) Audit Logs: One user can have multiple audit log entries

**Indexing Strategy:**

- Primary keys automatically indexed
- Foreign keys indexed for join performance
- Email indexed for login lookups (partial index excluding soft-deleted)
- Role and status indexed for filtering
- Token hashes indexed for validation
- Timestamps indexed for expiration queries and sorting
- Composite indexes avoided unless query patterns demand them

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property Reflection

After analyzing all acceptance criteria, I've identified the following testable properties. Many criteria are structural (code organization, configuration) or compile-time concerns (TypeScript types) rather than runtime behaviors. The testable properties focus on:

1. **API Contract Consistency** - Response format, status codes, error handling
2. **Authentication/Authorization** - Token generation, validation, role enforcement
3. **Security** - Password hashing, input sanitization, rate limiting
4. **Data Integrity** - Database constraints, soft deletes
5. **Observability** - Logging behavior, health checks

**Redundancy Analysis:**
- Properties 3.3 and 3.4 (response format) can be combined into one comprehensive property about API response structure
- Properties 4.3, 4.4, 4.5 (JWT content and expiration) can be tested together as JWT generation correctness
- Properties 10.2, 10.3, 10.6 (logging fields) can be combined into comprehensive logging property
- Properties 3.6 and 3.7 (validation) are closely related but test different aspects (rejection vs error format)

### Correctness Properties

**Property 1: API Response Structure Consistency**
*For any* successful API endpoint response, the response must conform to the ApiResponse interface with success: true, data field, optional message, and metadata including timestamp and requestId.
**Validates: Requirements 3.3**

**Property 2: API Error Response Structure Consistency**
*For any* error response from any API endpoint, the response must conform to the ApiError interface with success: false, error object containing code and message, and appropriate HTTP status code (4xx or 5xx).
**Validates: Requirements 3.4, 3.5**

**Property 3: Input Validation Enforcement**
*For any* API endpoint with validation rules, when invalid data is submitted, the endpoint must reject the request before reaching business logic and return 400 status with detailed validation errors.
**Validates: Requirements 3.6, 3.7**

**Property 4: Error Context Preservation**
*For any* error that occurs in any layer (repository, service, controller), the error must propagate to the error handler with its original context, message, and stack trace intact.
**Validates: Requirements 3.8**

**Property 5: JWT Token Structure**
*For any* generated JWT access token, the token must contain userId, email, and role in its payload, and must have an expiration time of 15 minutes from issuance.
**Validates: Requirements 4.3, 4.4**

**Property 6: Protected Route Authentication**
*For any* protected API endpoint, requests without a valid JWT token or with an expired token must be rejected with 401 status before reaching the controller logic.
**Validates: Requirements 4.6, 4.7**

**Property 7: Role-Based Authorization**
*For any* API endpoint with role restrictions, requests from users lacking the required role must be rejected with 403 status before reaching the business logic.
**Validates: Requirements 4.8, 4.9**

**Property 8: Password Hashing Security**
*For any* password storage operation, the password must be hashed using bcrypt with cost factor >= 10, and the plain-text password must never be stored in the database or appear in logs.
**Validates: Requirements 5.1, 5.2**

**Property 9: Input Sanitization**
*For any* user input containing potentially malicious content (SQL injection, XSS), the input must be sanitized or rejected before being processed or stored.
**Validates: Requirements 5.3**

**Property 10: Security Headers**
*For any* HTTP response, the response must include security headers (X-Content-Type-Options, X-Frame-Options, etc.) as configured by helmet middleware.
**Validates: Requirements 5.7**

**Property 11: Database Referential Integrity**
*For any* attempt to create a record with an invalid foreign key reference, the database must reject the operation and return an appropriate error.
**Validates: Requirements 6.3**

**Property 12: Soft Delete Behavior**
*For any* entity with soft delete support, when a soft delete operation is performed, the record must remain in the database with deleted_at timestamp set, and subsequent queries must exclude soft-deleted records by default.
**Validates: Requirements 6.5**

**Property 13: Unique Constraint Enforcement**
*For any* attempt to create a user with an email that already exists in the database, the operation must be rejected with a unique constraint violation error.
**Validates: Requirements 6.7**

**Property 14: Request Logging Completeness**
*For any* incoming HTTP request, a log entry must be created containing method, path, status code, duration, and correlation ID.
**Validates: Requirements 10.2, 10.6**

**Property 15: Error Logging Completeness**
*For any* error that occurs during request processing, a log entry must be created containing the error message, stack trace, correlation ID, and request context.
**Validates: Requirements 10.3, 10.6**

**Property 16: Security Event Logging**
*For any* failed authentication attempt, a log entry must be created containing the attempted email, IP address, timestamp, and failure reason.
**Validates: Requirements 10.9**


## Error Handling

### Error Classification

**Client Errors (4xx):**
- 400 Bad Request: Validation failures, malformed requests
- 401 Unauthorized: Missing or invalid authentication token
- 403 Forbidden: Valid authentication but insufficient permissions
- 404 Not Found: Resource does not exist
- 409 Conflict: Resource conflict (e.g., duplicate email)
- 422 Unprocessable Entity: Semantic validation failures
- 429 Too Many Requests: Rate limit exceeded

**Server Errors (5xx):**
- 500 Internal Server Error: Unexpected server errors
- 502 Bad Gateway: Upstream service failures
- 503 Service Unavailable: Service temporarily unavailable
- 504 Gateway Timeout: Upstream service timeout

### Error Handling Strategy

**Custom Error Classes (backend/src/utils/errors.ts):**

```typescript
export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code: string,
    public details?: Record<string, any>,
    public isOperational: boolean = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: Record<string, any>) {
    super(400, message, 'VALIDATION_ERROR', details);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication failed') {
    super(401, message, 'AUTHENTICATION_ERROR');
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Insufficient permissions') {
    super(403, message, 'AUTHORIZATION_ERROR');
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, id?: string) {
    const message = id ? `${resource} with id ${id} not found` : `${resource} not found`;
    super(404, message, 'NOT_FOUND');
  }
}

export class ConflictError extends AppError {
  constructor(message: string, details?: Record<string, any>) {
    super(409, message, 'CONFLICT', details);
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = 'Too many requests') {
    super(429, message, 'RATE_LIMIT_EXCEEDED');
  }
}
```

**Global Error Handler (backend/src/middleware/error.middleware.ts):**

```typescript
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const logger = req.app.get('logger');
  
  // Default to 500 server error
  let statusCode = 500;
  let errorResponse: ApiError = {
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occurred'
    },
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: req.context?.requestId || 'unknown',
      version: process.env.API_VERSION || '1.0.0'
    }
  };

  // Handle operational errors
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    errorResponse.error = {
      code: err.code,
      message: err.message,
      details: err.details
    };
    
    // Log operational errors at appropriate level
    if (statusCode >= 500) {
      logger.error('Operational error', { error: err, context: req.context });
    } else {
      logger.warn('Client error', { error: err, context: req.context });
    }
  } else {
    // Log unexpected errors
    logger.error('Unexpected error', { 
      error: err, 
      stack: err.stack, 
      context: req.context 
    });
  }

  // Include stack trace in development
  if (process.env.NODE_ENV === 'development') {
    errorResponse.error.stack = err.stack;
  }

  res.status(statusCode).json(errorResponse);
};
```

**Error Propagation Pattern:**

```typescript
// Repository layer - throw specific errors
async findByEmail(email: string): Promise<User | null> {
  try {
    const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return user || null;
  } catch (error) {
    throw new AppError(500, 'Database query failed', 'DATABASE_ERROR', { email });
  }
}

// Service layer - add business context
async login(credentials: LoginCredentials): Promise<AuthResponse> {
  const user = await this.userRepository.findByEmail(credentials.email);
  
  if (!user) {
    throw new AuthenticationError('Invalid email or password');
  }
  
  const isValidPassword = await bcrypt.compare(credentials.password, user.passwordHash);
  
  if (!isValidPassword) {
    throw new AuthenticationError('Invalid email or password');
  }
  
  // Continue with token generation...
}

// Controller layer - catch and let error middleware handle
async login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const authResponse = await this.authService.login(req.body);
    res.json({
      success: true,
      data: authResponse,
      metadata: {
        timestamp: new Date().toISOString(),
        requestId: req.context?.requestId || 'unknown',
        version: process.env.API_VERSION || '1.0.0'
      }
    });
  } catch (error) {
    next(error); // Pass to error middleware
  }
}
```

### Validation Strategy

**Request Validation (using Zod):**

```typescript
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

export const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  firstName: z.string().min(1, 'First name is required').max(100),
  lastName: z.string().min(1, 'Last name is required').max(100)
});

export const updateUserSchema = z.object({
  firstName: z.string().min(1).max(100).optional(),
  lastName: z.string().min(1).max(100).optional(),
  email: z.string().email().optional(),
  role: z.enum(['admin', 'user', 'moderator']).optional(),
  status: z.enum(['active', 'inactive', 'suspended', 'pending']).optional()
});
```

**Validation Middleware:**

```typescript
export const validate = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const details = error.errors.reduce((acc, err) => {
          const path = err.path.join('.');
          acc[path] = err.message;
          return acc;
        }, {} as Record<string, string>);
        
        next(new ValidationError('Validation failed', details));
      } else {
        next(error);
      }
    }
  };
};
```


## Testing Strategy

### Testing Approach

The application uses a dual testing strategy combining unit tests and property-based tests for comprehensive coverage. Unit tests verify specific examples and edge cases, while property-based tests verify universal properties across many generated inputs.

### Backend Testing

**Unit Testing Framework:**
- Jest for test runner and assertions
- Supertest for HTTP endpoint testing
- Mock implementations for external dependencies

**Test Organization:**
```
backend/src/tests/
├── unit/
│   ├── services/
│   │   ├── auth.service.test.ts
│   │   ├── user.service.test.ts
│   │   └── token.service.test.ts
│   ├── repositories/
│   │   └── user.repository.test.ts
│   └── utils/
│       ├── validation.test.ts
│       └── crypto.test.ts
├── integration/
│   ├── auth.routes.test.ts
│   ├── user.routes.test.ts
│   └── middleware.test.ts
└── helpers/
    ├── testDb.ts
    ├── fixtures.ts
    └── mocks.ts
```

**Property-Based Testing:**
- Use fast-check library for property-based testing
- Minimum 100 iterations per property test
- Each property test references its design document property

**Unit Test Examples:**

```typescript
// Specific example test
describe('AuthService.login', () => {
  it('should return auth tokens for valid credentials', async () => {
    const credentials = { email: 'test@example.com', password: 'Password123' };
    const result = await authService.login(credentials);
    
    expect(result).toHaveProperty('user');
    expect(result).toHaveProperty('tokens');
    expect(result.tokens).toHaveProperty('accessToken');
    expect(result.tokens).toHaveProperty('refreshToken');
  });
  
  it('should throw AuthenticationError for invalid password', async () => {
    const credentials = { email: 'test@example.com', password: 'wrong' };
    
    await expect(authService.login(credentials))
      .rejects
      .toThrow(AuthenticationError);
  });
});

// Edge case test
describe('UserService.createUser', () => {
  it('should handle email with special characters', async () => {
    const userData = {
      email: 'test+tag@example.com',
      password: 'Password123',
      firstName: 'Test',
      lastName: 'User'
    };
    
    const user = await userService.createUser(userData);
    expect(user.email).toBe('test+tag@example.com');
  });
});
```

**Property-Based Test Examples:**

```typescript
import fc from 'fast-check';

// Feature: fullstack-architecture, Property 1: API Response Structure Consistency
describe('Property: API Response Structure', () => {
  it('all successful responses conform to ApiResponse interface', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          email: fc.emailAddress(),
          password: fc.string({ minLength: 8 })
        }),
        async (credentials) => {
          // Assume user exists and credentials are valid
          const response = await request(app)
            .post('/api/auth/login')
            .send(credentials);
          
          if (response.status === 200) {
            expect(response.body).toHaveProperty('success', true);
            expect(response.body).toHaveProperty('data');
            expect(response.body).toHaveProperty('metadata');
            expect(response.body.metadata).toHaveProperty('timestamp');
            expect(response.body.metadata).toHaveProperty('requestId');
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});

// Feature: fullstack-architecture, Property 8: Password Hashing Security
describe('Property: Password Hashing', () => {
  it('all stored passwords are bcrypt hashes with cost >= 10', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 8, maxLength: 100 }),
        async (password) => {
          const userData = {
            email: `test${Date.now()}@example.com`,
            password,
            firstName: 'Test',
            lastName: 'User'
          };
          
          const user = await userService.createUser(userData);
          const dbUser = await userRepository.findById(user.id);
          
          // Verify it's a bcrypt hash
          expect(dbUser.passwordHash).toMatch(/^\$2[aby]\$\d{2}\$/);
          
          // Verify cost factor >= 10
          const costFactor = parseInt(dbUser.passwordHash.split('$')[2]);
          expect(costFactor).toBeGreaterThanOrEqual(10);
          
          // Verify plain password not stored
          expect(dbUser.passwordHash).not.toBe(password);
        }
      ),
      { numRuns: 100 }
    );
  });
});

// Feature: fullstack-architecture, Property 12: Soft Delete Behavior
describe('Property: Soft Delete', () => {
  it('soft deleted records remain in database with deleted_at set', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.uuid(),
        async (userId) => {
          // Assume user exists
          await userService.deleteUser(userId);
          
          // Query with soft-deleted records
          const dbUser = await db.query(
            'SELECT * FROM users WHERE id = $1',
            [userId]
          );
          
          expect(dbUser).toBeDefined();
          expect(dbUser.deleted_at).not.toBeNull();
          
          // Query without soft-deleted records
          const activeUser = await userRepository.findById(userId);
          expect(activeUser).toBeNull();
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

**Integration Test Configuration:**

```typescript
// Test database setup
beforeAll(async () => {
  await testDb.connect();
  await testDb.migrate();
});

afterAll(async () => {
  await testDb.disconnect();
});

beforeEach(async () => {
  await testDb.seed();
});

afterEach(async () => {
  await testDb.clean();
});
```

### Frontend Testing

**Testing Framework:**
- Vitest for test runner
- React Testing Library for component testing
- MSW (Mock Service Worker) for API mocking

**Test Organization:**
```
frontend/src/tests/
├── unit/
│   ├── components/
│   │   ├── LoginForm.test.tsx
│   │   └── UserProfile.test.tsx
│   ├── hooks/
│   │   ├── useAuth.test.ts
│   │   └── useApi.test.ts
│   └── utils/
│       └── validation.test.ts
├── integration/
│   ├── auth-flow.test.tsx
│   └── user-management.test.tsx
└── helpers/
    ├── renderWithProviders.tsx
    ├── mockApi.ts
    └── fixtures.ts
```

**Component Test Example:**

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from '@/components/features/auth/LoginForm';

describe('LoginForm', () => {
  it('should display validation errors for invalid input', async () => {
    render(<LoginForm />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /login/i });
    
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
    });
  });
  
  it('should call onSuccess callback after successful login', async () => {
    const onSuccess = jest.fn();
    render(<LoginForm onSuccess={onSuccess} />);
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'Password123' }
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    
    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled();
    });
  });
});
```

**Hook Test Example:**

```typescript
import { renderHook, act } from '@testing-library/react';
import { useAuth } from '@/hooks/useAuth';

describe('useAuth', () => {
  it('should update user state after login', async () => {
    const { result } = renderHook(() => useAuth());
    
    await act(async () => {
      await result.current.login({
        email: 'test@example.com',
        password: 'Password123'
      });
    });
    
    expect(result.current.user).toBeDefined();
    expect(result.current.isAuthenticated).toBe(true);
  });
});
```

### Test Coverage Goals

- Backend services: 80% minimum coverage
- Backend repositories: 80% minimum coverage
- Frontend components: 70% minimum coverage
- Frontend hooks: 70% minimum coverage
- Critical paths (authentication, authorization): 90% minimum coverage


## Security Implementation

### Authentication Flow

**JWT Token Strategy:**

```typescript
// Token configuration
const TOKEN_CONFIG = {
  accessToken: {
    secret: process.env.JWT_ACCESS_SECRET,
    expiresIn: '15m'
  },
  refreshToken: {
    secret: process.env.JWT_REFRESH_SECRET,
    expiresIn: '7d'
  },
  passwordReset: {
    secret: process.env.JWT_RESET_SECRET,
    expiresIn: '1h'
  }
};

// Token generation
export class TokenService implements ITokenService {
  generateAccessToken(user: User): string {
    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (15 * 60) // 15 minutes
    };
    
    return jwt.sign(payload, TOKEN_CONFIG.accessToken.secret, {
      expiresIn: TOKEN_CONFIG.accessToken.expiresIn
    });
  }
  
  generateRefreshToken(userId: string, tokenId: string): string {
    const payload: RefreshTokenPayload = {
      userId,
      tokenId,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60) // 7 days
    };
    
    return jwt.sign(payload, TOKEN_CONFIG.refreshToken.secret, {
      expiresIn: TOKEN_CONFIG.refreshToken.expiresIn
    });
  }
  
  verifyAccessToken(token: string): JwtPayload {
    try {
      return jwt.verify(token, TOKEN_CONFIG.accessToken.secret) as JwtPayload;
    } catch (error) {
      throw new AuthenticationError('Invalid or expired token');
    }
  }
}
```

**Authentication Middleware:**

```typescript
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AuthenticationError('No token provided');
    }
    
    const token = authHeader.substring(7);
    const tokenService = req.app.get('tokenService');
    const payload = tokenService.verifyAccessToken(token);
    
    const userService = req.app.get('userService');
    const user = await userService.getUserById(payload.userId);
    
    if (!user || user.status !== UserStatus.ACTIVE) {
      throw new AuthenticationError('User not found or inactive');
    }
    
    // Attach user to request
    req.user = user;
    req.context = {
      user,
      requestId: req.headers['x-request-id'] as string || uuidv4(),
      ip: req.ip,
      userAgent: req.headers['user-agent'] || 'unknown',
      timestamp: new Date()
    };
    
    next();
  } catch (error) {
    next(error);
  }
};
```

**Authorization Middleware:**

```typescript
export const authorize = (...allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new AuthenticationError('Authentication required'));
    }
    
    if (!allowedRoles.includes(req.user.role)) {
      return next(new AuthorizationError(
        `Access denied. Required roles: ${allowedRoles.join(', ')}`
      ));
    }
    
    next();
  };
};

// Usage in routes
router.get('/admin/users', 
  authenticate, 
  authorize(UserRole.ADMIN), 
  userController.getAllUsers
);
```

### Password Security

**Password Hashing:**

```typescript
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12; // Cost factor

export class CryptoUtils {
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
  }
  
  static async comparePassword(
    password: string, 
    hash: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
  
  static generateSecureToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }
}
```

**Password Validation:**

```typescript
export const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password must not exceed 128 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');
```

### Input Validation and Sanitization

**Sanitization Utilities:**

```typescript
import validator from 'validator';
import xss from 'xss';

export class SanitizationUtils {
  static sanitizeString(input: string): string {
    // Remove XSS attempts
    let sanitized = xss(input);
    
    // Trim whitespace
    sanitized = validator.trim(sanitized);
    
    // Escape HTML entities
    sanitized = validator.escape(sanitized);
    
    return sanitized;
  }
  
  static sanitizeEmail(email: string): string {
    return validator.normalizeEmail(email) || email;
  }
  
  static isValidUUID(id: string): boolean {
    return validator.isUUID(id);
  }
}
```

### Rate Limiting

**Rate Limit Configuration:**

```typescript
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';

// General API rate limit
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: 'Too many requests from this IP, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
  store: new RedisStore({
    client: redisClient,
    prefix: 'rl:api:'
  })
});

// Authentication rate limit (stricter)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: 'Too many login attempts, please try again later',
  skipSuccessfulRequests: true,
  store: new RedisStore({
    client: redisClient,
    prefix: 'rl:auth:'
  })
});

// Usage
app.use('/api/', apiLimiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);
```

### Security Middleware Stack

**Security Configuration:**

```typescript
import helmet from 'helmet';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';

export const configureSecurityMiddleware = (app: Express): void => {
  // Helmet for security headers
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
      }
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true
    }
  }));
  
  // CORS configuration
  const corsOptions = {
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true,
    optionsSuccessStatus: 200
  };
  app.use(cors(corsOptions));
  
  // Prevent NoSQL injection
  app.use(mongoSanitize());
  
  // Request size limits
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  
  // Remove X-Powered-By header
  app.disable('x-powered-by');
};
```

### Environment Variables and Secrets

**Environment Configuration:**

```typescript
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.string().transform(Number),
  
  // Database
  DATABASE_URL: z.string().url(),
  DATABASE_POOL_MIN: z.string().transform(Number).default('2'),
  DATABASE_POOL_MAX: z.string().transform(Number).default('10'),
  
  // JWT Secrets
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  JWT_RESET_SECRET: z.string().min(32),
  
  // Security
  ALLOWED_ORIGINS: z.string(),
  BCRYPT_ROUNDS: z.string().transform(Number).default('12'),
  
  // External Services
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().transform(Number).optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  
  // Monitoring
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
  
  // Redis
  REDIS_URL: z.string().url().optional()
});

export const validateEnv = (): void => {
  try {
    envSchema.parse(process.env);
  } catch (error) {
    console.error('Environment validation failed:', error);
    process.exit(1);
  }
};
```

**.env.example:**

```bash
NODE_ENV=development
PORT=5000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
DATABASE_POOL_MIN=2
DATABASE_POOL_MAX=10

# JWT Secrets (generate with: openssl rand -base64 32)
JWT_ACCESS_SECRET=your-access-secret-here
JWT_REFRESH_SECRET=your-refresh-secret-here
JWT_RESET_SECRET=your-reset-secret-here

# Security
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
BCRYPT_ROUNDS=12

# Email
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-email-password

# Monitoring
LOG_LEVEL=info

# Redis (optional)
REDIS_URL=redis://localhost:6379
```


## API Design Standards

### REST Conventions

**Endpoint Naming:**
- Use plural nouns for resources: `/api/users`, `/api/posts`
- Use kebab-case for multi-word resources: `/api/user-profiles`
- Nest resources for relationships: `/api/users/:userId/posts`
- Use query parameters for filtering, sorting, pagination

**HTTP Methods:**
- GET: Retrieve resource(s), idempotent, no body
- POST: Create new resource, non-idempotent, requires body
- PUT: Full update of resource, idempotent, requires complete body
- PATCH: Partial update of resource, idempotent, requires partial body
- DELETE: Remove resource, idempotent, no body

**Example API Routes:**

```typescript
// Authentication
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
POST   /api/auth/verify-email

// Users
GET    /api/users              // List users (paginated)
GET    /api/users/:id          // Get user by ID
POST   /api/users              // Create user (admin only)
PUT    /api/users/:id          // Full update user
PATCH  /api/users/:id          // Partial update user
DELETE /api/users/:id          // Soft delete user
GET    /api/users/me           // Get current user
PATCH  /api/users/me/password  // Change password

// Health & Monitoring
GET    /health                 // Health check
GET    /metrics                // Metrics endpoint
```

### Request/Response Format

**Successful Response:**

```typescript
{
  "success": true,
  "data": {
    // Response payload
  },
  "message": "Operation completed successfully", // Optional
  "metadata": {
    "timestamp": "2024-01-15T10:30:00.000Z",
    "requestId": "550e8400-e29b-41d4-a716-446655440000",
    "version": "1.0.0"
  }
}
```

**Error Response:**

```typescript
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": {
      "email": "Invalid email format",
      "password": "Password must be at least 8 characters"
    }
  },
  "metadata": {
    "timestamp": "2024-01-15T10:30:00.000Z",
    "requestId": "550e8400-e29b-41d4-a716-446655440000",
    "version": "1.0.0"
  }
}
```

**Paginated Response:**

```typescript
{
  "success": true,
  "data": [
    // Array of items
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8,
    "hasNext": true,
    "hasPrev": false
  },
  "metadata": {
    "timestamp": "2024-01-15T10:30:00.000Z",
    "requestId": "550e8400-e29b-41d4-a716-446655440000",
    "version": "1.0.0"
  }
}
```

### Frontend API Client

**Axios Configuration:**

```typescript
import axios, { AxiosInstance, AxiosError } from 'axios';
import { ApiResponse, ApiError } from '@/types/api.types';

class ApiClient {
  private client: AxiosInstance;
  
  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    this.setupInterceptors();
  }
  
  private setupInterceptors(): void {
    // Request interceptor - add auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    
    // Response interceptor - handle errors and token refresh
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError<ApiError>) => {
        const originalRequest = error.config;
        
        // Handle 401 - attempt token refresh
        if (error.response?.status === 401 && originalRequest) {
          try {
            const refreshToken = localStorage.getItem('refreshToken');
            const response = await axios.post('/api/auth/refresh', {
              refreshToken
            });
            
            const { accessToken } = response.data.data;
            localStorage.setItem('accessToken', accessToken);
            
            // Retry original request
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return this.client(originalRequest);
          } catch (refreshError) {
            // Refresh failed - logout user
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        }
        
        return Promise.reject(error);
      }
    );
  }
  
  async get<T>(url: string, params?: any): Promise<ApiResponse<T>> {
    const response = await this.client.get<ApiResponse<T>>(url, { params });
    return response.data;
  }
  
  async post<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    const response = await this.client.post<ApiResponse<T>>(url, data);
    return response.data;
  }
  
  async put<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    const response = await this.client.put<ApiResponse<T>>(url, data);
    return response.data;
  }
  
  async patch<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    const response = await this.client.patch<ApiResponse<T>>(url, data);
    return response.data;
  }
  
  async delete<T>(url: string): Promise<ApiResponse<T>> {
    const response = await this.client.delete<ApiResponse<T>>(url);
    return response.data;
  }
}

export const apiClient = new ApiClient();
```

**API Service Example:**

```typescript
import { apiClient } from './client';
import { User, AuthResponse, LoginCredentials } from '@/types/auth.types';

export const authApi = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    return response.data!;
  },
  
  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', credentials);
    return response.data!;
  },
  
  async logout(): Promise<void> {
    const refreshToken = localStorage.getItem('refreshToken');
    await apiClient.post('/auth/logout', { refreshToken });
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },
  
  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<User>('/users/me');
    return response.data!;
  }
};
```


## Docker and Deployment

### Backend Dockerfile

**Multi-stage Production Build:**

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm ci --only=production && \
    npm cache clean --force

# Copy source code
COPY src ./src

# Build TypeScript
RUN npm run build

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy package files and install production dependencies only
COPY package*.json ./
RUN npm ci --only=production && \
    npm cache clean --force

# Copy built application from builder
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start application
CMD ["node", "dist/server.js"]
```

**Development Dockerfile:**

```dockerfile
FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Expose port
EXPOSE 5000

# Start with hot reload
CMD ["npm", "run", "dev"]
```

### Frontend Dockerfile

**Multi-stage Production Build:**

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci && \
    npm cache clean --force

# Copy source code
COPY . .

# Build application
RUN npm run build

# Stage 2: Production with Nginx
FROM nginx:alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built application
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:3000 || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

**Nginx Configuration:**

```nginx
server {
    listen 3000;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # API proxy (optional, if serving from same domain)
    location /api {
        proxy_pass http://backend:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Docker Compose

**Development Configuration:**

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: fullstack-db
    environment:
      POSTGRES_USER: devuser
      POSTGRES_PASSWORD: devpassword
      POSTGRES_DB: fullstack_dev
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./backend/database/init.sql:/docker-entrypoint-initdb.d/init.sql
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U devuser -d fullstack_dev"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: fullstack-redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 3s
      retries: 5

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.dev
    container_name: fullstack-backend
    environment:
      NODE_ENV: development
      PORT: 5000
      DATABASE_URL: postgresql://devuser:devpassword@postgres:5432/fullstack_dev
      REDIS_URL: redis://redis:6379
      JWT_ACCESS_SECRET: dev-access-secret-change-in-production
      JWT_REFRESH_SECRET: dev-refresh-secret-change-in-production
      JWT_RESET_SECRET: dev-reset-secret-change-in-production
      ALLOWED_ORIGINS: http://localhost:3000,http://localhost:5173
      LOG_LEVEL: debug
    ports:
      - "5000:5000"
    volumes:
      - ./backend/src:/app/src
      - ./backend/package.json:/app/package.json
      - backend_node_modules:/app/node_modules
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    command: npm run dev

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.dev
    container_name: fullstack-frontend
    environment:
      VITE_API_URL: http://localhost:5000/api
    ports:
      - "3000:3000"
    volumes:
      - ./frontend/src:/app/src
      - ./frontend/public:/app/public
      - ./frontend/package.json:/app/package.json
      - frontend_node_modules:/app/node_modules
    depends_on:
      - backend
    command: npm run dev

volumes:
  postgres_data:
  redis_data:
  backend_node_modules:
  frontend_node_modules:
```

**Production Configuration:**

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: fullstack-db-prod
    environment:
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_NAME}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - backend
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER} -d ${DB_NAME}"]
      interval: 30s
      timeout: 10s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: fullstack-redis-prod
    volumes:
      - redis_data:/data
    networks:
      - backend
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 30s
      timeout: 3s
      retries: 5

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: fullstack-backend-prod
    environment:
      NODE_ENV: production
      PORT: 5000
      DATABASE_URL: postgresql://${DB_USER}:${DB_PASSWORD}@postgres:5432/${DB_NAME}
      REDIS_URL: redis://redis:6379
      JWT_ACCESS_SECRET: ${JWT_ACCESS_SECRET}
      JWT_REFRESH_SECRET: ${JWT_REFRESH_SECRET}
      JWT_RESET_SECRET: ${JWT_RESET_SECRET}
      ALLOWED_ORIGINS: ${ALLOWED_ORIGINS}
      LOG_LEVEL: info
    networks:
      - backend
      - frontend
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "node", "-e", "require('http').get('http://localhost:5000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: fullstack-frontend-prod
    ports:
      - "80:3000"
    networks:
      - frontend
    depends_on:
      - backend
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:3000"]
      interval: 30s
      timeout: 10s
      retries: 3

networks:
  backend:
    driver: bridge
  frontend:
    driver: bridge

volumes:
  postgres_data:
  redis_data:
```

### Deployment Commands

**Development:**

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild and restart
docker-compose up -d --build

# Run database migrations
docker-compose exec backend npm run migrate

# Access database
docker-compose exec postgres psql -U devuser -d fullstack_dev
```

**Production:**

```bash
# Build images
docker-compose -f docker-compose.prod.yml build

# Start services
docker-compose -f docker-compose.prod.yml up -d

# View logs
docker-compose -f docker-compose.prod.yml logs -f backend

# Run migrations
docker-compose -f docker-compose.prod.yml exec backend npm run migrate:prod

# Scale backend (if using load balancer)
docker-compose -f docker-compose.prod.yml up -d --scale backend=3

# Stop services
docker-compose -f docker-compose.prod.yml down
```

### Environment Variables

**Production .env Template:**

```bash
# Database
DB_USER=produser
DB_PASSWORD=<generate-secure-password>
DB_NAME=fullstack_prod

# JWT Secrets (generate with: openssl rand -base64 32)
JWT_ACCESS_SECRET=<generate-secure-secret>
JWT_REFRESH_SECRET=<generate-secure-secret>
JWT_RESET_SECRET=<generate-secure-secret>

# Security
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Email
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=<your-sendgrid-api-key>
```

### Deployment Checklist

**Pre-deployment:**
- [ ] All environment variables configured
- [ ] Database migrations tested
- [ ] SSL certificates configured
- [ ] Secrets rotated from development values
- [ ] CORS origins updated for production domain
- [ ] Rate limits configured appropriately
- [ ] Logging level set to 'info' or 'warn'
- [ ] Health check endpoints tested
- [ ] Backup strategy implemented

**Post-deployment:**
- [ ] Health checks passing
- [ ] Database connections working
- [ ] Authentication flow tested
- [ ] API endpoints responding correctly
- [ ] Frontend loading and routing working
- [ ] Logs being generated correctly
- [ ] Monitoring alerts configured
- [ ] Performance metrics baseline established


## Logging and Monitoring

### Logging Strategy

**Winston Configuration (Backend):**

```typescript
import winston from 'winston';

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3
};

const logColors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  debug: 'blue'
};

winston.addColors(logColors);

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    return `${timestamp} [${level}]: ${message} ${
      Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
    }`;
  })
);

export const logger = winston.createLogger({
  levels: logLevels,
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  transports: [
    // Console output
    new winston.transports.Console({
      format: process.env.NODE_ENV === 'development' ? consoleFormat : logFormat
    }),
    
    // Error log file
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),
    
    // Combined log file
    new winston.transports.File({
      filename: 'logs/combined.log',
      maxsize: 5242880, // 5MB
      maxFiles: 5
    })
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: 'logs/exceptions.log' })
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: 'logs/rejections.log' })
  ]
});
```

**Request Logging Middleware:**

```typescript
export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const startTime = Date.now();
  const requestId = req.headers['x-request-id'] as string || uuidv4();
  
  // Attach request ID to request
  req.headers['x-request-id'] = requestId;
  
  // Log request
  logger.info('Incoming request', {
    requestId,
    method: req.method,
    path: req.path,
    query: req.query,
    ip: req.ip,
    userAgent: req.headers['user-agent']
  });
  
  // Log response
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    
    const logData = {
      requestId,
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      userId: req.user?.id
    };
    
    if (res.statusCode >= 500) {
      logger.error('Request failed', logData);
    } else if (res.statusCode >= 400) {
      logger.warn('Client error', logData);
    } else {
      logger.info('Request completed', logData);
    }
  });
  
  next();
};
```

**Structured Logging Examples:**

```typescript
// Service layer logging
class UserService {
  async createUser(data: CreateUserDto): Promise<User> {
    logger.info('Creating user', { email: data.email });
    
    try {
      const user = await this.userRepository.create(data);
      logger.info('User created successfully', { userId: user.id, email: user.email });
      return user;
    } catch (error) {
      logger.error('Failed to create user', {
        email: data.email,
        error: error.message,
        stack: error.stack
      });
      throw error;
    }
  }
}

// Security event logging
logger.warn('Failed login attempt', {
  email: credentials.email,
  ip: req.ip,
  userAgent: req.headers['user-agent'],
  timestamp: new Date().toISOString()
});

// Performance logging
logger.debug('Database query executed', {
  query: 'SELECT * FROM users WHERE email = $1',
  duration: '45ms',
  rowCount: 1
});
```

### Health Check Endpoints

**Health Check Implementation:**

```typescript
interface HealthStatus {
  status: 'healthy' | 'unhealthy' | 'degraded';
  timestamp: string;
  uptime: number;
  services: {
    database: ServiceHealth;
    redis: ServiceHealth;
  };
}

interface ServiceHealth {
  status: 'up' | 'down';
  responseTime?: number;
  error?: string;
}

export class HealthController {
  async checkHealth(req: Request, res: Response): Promise<void> {
    const startTime = Date.now();
    
    // Check database
    const dbHealth = await this.checkDatabase();
    
    // Check Redis
    const redisHealth = await this.checkRedis();
    
    // Determine overall status
    const allHealthy = dbHealth.status === 'up' && redisHealth.status === 'up';
    const anyDown = dbHealth.status === 'down' || redisHealth.status === 'down';
    
    const health: HealthStatus = {
      status: anyDown ? 'unhealthy' : allHealthy ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      services: {
        database: dbHealth,
        redis: redisHealth
      }
    };
    
    const statusCode = health.status === 'healthy' ? 200 : 503;
    res.status(statusCode).json(health);
  }
  
  private async checkDatabase(): Promise<ServiceHealth> {
    try {
      const start = Date.now();
      await db.query('SELECT 1');
      return {
        status: 'up',
        responseTime: Date.now() - start
      };
    } catch (error) {
      return {
        status: 'down',
        error: error.message
      };
    }
  }
  
  private async checkRedis(): Promise<ServiceHealth> {
    try {
      const start = Date.now();
      await redisClient.ping();
      return {
        status: 'up',
        responseTime: Date.now() - start
      };
    } catch (error) {
      return {
        status: 'down',
        error: error.message
      };
    }
  }
}
```

### Metrics Endpoint

**Basic Metrics Implementation:**

```typescript
interface Metrics {
  process: {
    uptime: number;
    memory: NodeJS.MemoryUsage;
    cpu: NodeJS.CpuUsage;
  };
  http: {
    requestsTotal: number;
    requestsByStatus: Record<number, number>;
    averageResponseTime: number;
  };
}

class MetricsCollector {
  private requestsTotal = 0;
  private requestsByStatus: Record<number, number> = {};
  private responseTimes: number[] = [];
  
  recordRequest(statusCode: number, duration: number): void {
    this.requestsTotal++;
    this.requestsByStatus[statusCode] = (this.requestsByStatus[statusCode] || 0) + 1;
    this.responseTimes.push(duration);
    
    // Keep only last 1000 response times
    if (this.responseTimes.length > 1000) {
      this.responseTimes.shift();
    }
  }
  
  getMetrics(): Metrics {
    const avgResponseTime = this.responseTimes.length > 0
      ? this.responseTimes.reduce((a, b) => a + b, 0) / this.responseTimes.length
      : 0;
    
    return {
      process: {
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        cpu: process.cpuUsage()
      },
      http: {
        requestsTotal: this.requestsTotal,
        requestsByStatus: this.requestsByStatus,
        averageResponseTime: Math.round(avgResponseTime)
      }
    };
  }
}

export const metricsCollector = new MetricsCollector();
```

### Graceful Shutdown

**Shutdown Handler:**

```typescript
export class GracefulShutdown {
  private server: Server;
  private isShuttingDown = false;
  
  constructor(server: Server) {
    this.server = server;
    this.setupHandlers();
  }
  
  private setupHandlers(): void {
    process.on('SIGTERM', () => this.shutdown('SIGTERM'));
    process.on('SIGINT', () => this.shutdown('SIGINT'));
    
    process.on('uncaughtException', (error) => {
      logger.error('Uncaught exception', { error: error.message, stack: error.stack });
      this.shutdown('uncaughtException');
    });
    
    process.on('unhandledRejection', (reason, promise) => {
      logger.error('Unhandled rejection', { reason, promise });
      this.shutdown('unhandledRejection');
    });
  }
  
  private async shutdown(signal: string): Promise<void> {
    if (this.isShuttingDown) {
      return;
    }
    
    this.isShuttingDown = true;
    logger.info(`Received ${signal}, starting graceful shutdown`);
    
    // Stop accepting new connections
    this.server.close(() => {
      logger.info('HTTP server closed');
    });
    
    // Set timeout for forceful shutdown
    const forceShutdownTimeout = setTimeout(() => {
      logger.error('Forceful shutdown after timeout');
      process.exit(1);
    }, 30000); // 30 seconds
    
    try {
      // Close database connections
      await db.end();
      logger.info('Database connections closed');
      
      // Close Redis connections
      await redisClient.quit();
      logger.info('Redis connections closed');
      
      clearTimeout(forceShutdownTimeout);
      logger.info('Graceful shutdown completed');
      process.exit(0);
    } catch (error) {
      logger.error('Error during shutdown', { error: error.message });
      clearTimeout(forceShutdownTimeout);
      process.exit(1);
    }
  }
}
```

## Implementation Notes

### Technology Stack Summary

**Backend:**
- Runtime: Node.js 20 LTS
- Framework: Express.js 4.x
- Language: TypeScript 5.x
- Database: PostgreSQL 16
- Cache: Redis 7
- ORM: pg (native PostgreSQL driver) or Prisma
- Authentication: jsonwebtoken, bcrypt
- Validation: Zod
- Testing: Jest, Supertest, fast-check
- Logging: Winston
- Security: Helmet, CORS, express-rate-limit

**Frontend:**
- Runtime: Node.js 20 LTS (build)
- Framework: React 18
- Language: TypeScript 5.x
- Build Tool: Vite
- HTTP Client: Axios
- Testing: Vitest, React Testing Library
- State Management: React Context (or Redux Toolkit for complex state)
- Routing: React Router 6

**DevOps:**
- Containerization: Docker, Docker Compose
- Web Server: Nginx (frontend production)
- CI/CD: GitHub Actions, GitLab CI, or Jenkins
- Monitoring: Prometheus + Grafana (optional)

### Development Workflow

1. **Local Development:**
   - Run `docker-compose up -d` to start all services
   - Backend runs on `http://localhost:5000` with hot reload
   - Frontend runs on `http://localhost:3000` with hot reload
   - Database accessible on `localhost:5432`

2. **Code Quality:**
   - Run `npm run lint` before committing
   - Run `npm run format` to auto-format code
   - Run `npm test` to execute test suite
   - Pre-commit hooks enforce linting and formatting

3. **Database Migrations:**
   - Create migration: `npm run migrate:create <name>`
   - Run migrations: `npm run migrate`
   - Rollback: `npm run migrate:rollback`

4. **Testing:**
   - Unit tests: `npm run test:unit`
   - Integration tests: `npm run test:integration`
   - Coverage: `npm run test:coverage`
   - Property tests: `npm run test:property`

### Scalability Considerations

**Horizontal Scaling:**
- Backend is stateless and can be scaled horizontally
- Use Redis for session storage if needed
- Load balancer distributes traffic across backend instances
- Database connection pooling prevents connection exhaustion

**Caching Strategy:**
- Redis for session data and rate limiting
- Application-level caching for frequently accessed data
- HTTP caching headers for static assets
- CDN for frontend static files

**Database Optimization:**
- Indexes on frequently queried columns
- Connection pooling (min: 2, max: 10 per instance)
- Read replicas for read-heavy workloads
- Partitioning for large tables

**Performance Targets:**
- API response time: < 200ms (p95)
- Database query time: < 50ms (p95)
- Frontend initial load: < 2s
- Frontend time to interactive: < 3s

