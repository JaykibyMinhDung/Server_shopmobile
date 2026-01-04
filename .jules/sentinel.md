## 2024-05-22 - Hardcoded SendGrid API Key
**Vulnerability:** A hardcoded SendGrid API key was found in `controller/user/products.js`. This key allows unauthorized actors to send emails on behalf of the application, potentially leading to phishing campaigns or spam.
**Learning:** Hardcoded credentials in source code are a common but critical vulnerability. They are easily discovered by automated scanners.
**Prevention:** Always use environment variables for third-party API keys. Ensure `.env` files are in `.gitignore`.

## 2025-02-18 - Admin Authentication Bypass and Hardcoded JWT Secret
**Vulnerability:** The admin login controller (`controller/admin/auth.js`) had a critical logic flaw where it generated a valid JWT even if the password check failed. Additionally, the JWT secret was hardcoded as "ASSIGNMENT3$".
**Learning:** Promise chains in Express controllers can be dangerous if errors are not correctly propagated or if the success path doesn't explicitly check the result of previous operations. A `then` block runs even if the previous promise resolved with `false`, unless logic checks for that value.
**Prevention:** Always explicitly check the result of authentication steps (like `bcrypt.compare`) and return/throw immediately on failure. Use centralized configuration for secrets.
## 2024-05-23 - Sensitive Data in Query Params
**Vulnerability:** The signup endpoint (`controller/user/auth.js`) was retrieving sensitive user data (password, PII) from `req.query`.
**Learning:** Developers might mistakenly use `req.query` in POST requests if not familiar with Express request objects, leading to credentials being logged in access logs and browser history.
**Prevention:** Always enforce use of `req.body` for POST/PUT requests handling sensitive data. Ensure body parsing middleware is configured.

## 2024-05-23 - Critical Hardcoded JWT User ID
**Vulnerability:** The login controller was hardcoding the user ID to `7` in the JWT token for all successful logins (`jwt.sign({ id: 7, ... })`).
**Learning:** This allowed any user to impersonate a hypothetical user with ID 7, or potentially gain admin access if user 7 was an admin. This likely happened during development/testing and was forgotten.
**Prevention:** Always use dynamic user data from the database record when generating tokens. Code reviews should specifically check JWT payload construction. Use automated tests to verify token claims match the authenticated user.
