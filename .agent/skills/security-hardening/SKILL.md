# Security Hardening Skill

Advanced patterns for auditing and hardening TypeScript/Next.js applications.

## Audit Workflow

1. **Inventory**: Map the project using `repo_scan`.
2. **Surface Scan**: Run `secret_scan` to find immediate "leaks".
3. **Supply Chain**: Run `dependency_risk_scan` (focus on lockfiles).
4. **Configuration**: Use `auth_session_audit` and `security_headers_audit`.
5. **Report**: Aggregate using `hardening_report`.

## Hardening Standards

### 1. Secrets Management
- DO NOT commit `.env` files.
- USE placeholders in code (e.g., `process.env.STRIPE_KEY`).
- ROTATE any keys found by the auditor immediately.

### 2. Cookies & Sessions
- `httpOnly: true` is mandatory for session cookies.
- `secure: true` must be enabled in production.
- `sameSite: 'lax'` or `'strict'` is preferred.

### 3. Security Headers
- **CSP**: Content Security Policy to prevent XSS.
- **HSTS**: Force HTTPS.
- **X-Frame-Options**: Prevent Clickjacking.

## Tool Usage
- `secret_scan`: Run on every branch merge.
- `dependency_risk_scan`: Run weekly or after `npm install`.
- `hardening_report`: Run before every production release.
