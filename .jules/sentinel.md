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

## 2025-05-24 - Mismatched JWT Secrets in Admin Auth
**Vulnerability:** `middleware/auth-admin.js` used a hardcoded secret ("ASSIGNMENT3$") to verify tokens, while `controller/admin/auth.js` used a dynamic secret generator (env var or random). This mismatch meant admin authentication was broken by default in secure environments (where random secret is generated), or insecure if the environment was forced to match the hardcode.
**Learning:** Hardcoded secrets not only pose a security risk but can create subtle bugs where different parts of the system disagree on the secret key, leading to "it works on my machine" issues where the dev environment matches the hardcode but production doesn't.
**Prevention:** Single Source of Truth for secrets. Always use a centralized utility (like `util/auth.js`) to retrieve secrets across the entire application.
