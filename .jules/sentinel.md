## 2024-05-22 - Hardcoded SendGrid API Key
**Vulnerability:** A hardcoded SendGrid API key was found in `controller/user/products.js`. This key allows unauthorized actors to send emails on behalf of the application, potentially leading to phishing campaigns or spam.
**Learning:** Hardcoded credentials in source code are a common but critical vulnerability. They are easily discovered by automated scanners.
**Prevention:** Always use environment variables for third-party API keys. Ensure `.env` files are in `.gitignore`.

## 2025-02-18 - Admin Authentication Bypass and Hardcoded JWT Secret
**Vulnerability:** The admin login controller (`controller/admin/auth.js`) had a critical logic flaw where it generated a valid JWT even if the password check failed. Additionally, the JWT secret was hardcoded as "ASSIGNMENT3$".
**Learning:** Promise chains in Express controllers can be dangerous if errors are not correctly propagated or if the success path doesn't explicitly check the result of previous operations. A `then` block runs even if the previous promise resolved with `false`, unless logic checks for that value.
**Prevention:** Always explicitly check the result of authentication steps (like `bcrypt.compare`) and return/throw immediately on failure. Use centralized configuration for secrets.

## 2025-02-19 - Hardcoded JWT Secret in Admin Middleware
**Vulnerability:** The admin authentication middleware (`middleware/auth-admin.js`) used a hardcoded string "ASSIGNMENT3$" to verify JWTs, while the login controller and utility used a dynamic secret or environment variable. This mismatch could allow attackers to forge tokens if they knew the hardcoded string, or cause valid tokens to be rejected if the secret was rotated.
**Learning:** Inconsistent secret management across the application (e.g. one file using env vars, another using hardcoded string) creates hidden vulnerabilities that are hard to debug and easy to exploit.
**Prevention:** Centralize all secret retrieval logic in a single utility module (e.g. `util/auth.js`) and import it everywhere. Never inline secrets in middleware or controllers.

## 2024-05-23 - Sensitive Data in Query Params
**Vulnerability:** The signup endpoint (`controller/user/auth.js`) was retrieving sensitive user data (password, PII) from `req.query`.
**Learning:** Developers might mistakenly use `req.query` in POST requests if not familiar with Express request objects, leading to credentials being logged in access logs and browser history.
**Prevention:** Always enforce use of `req.body` for POST/PUT requests handling sensitive data. Ensure body parsing middleware is configured.
