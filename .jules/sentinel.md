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

## 2025-02-18 - Fragile Cookie Parsing and Inconsistent Secret Usage
**Vulnerability:** The admin middleware manually parsed cookies by position (`split(";")[0]`), causing authentication to fail if the admin token wasn't the first cookie. It also used a hardcoded secret while the login controller used a dynamic one, breaking authentication unless configured specifically.
**Learning:** Inconsistent usage of secrets (hardcoded vs config) across different files can silently break functionality or leave backdoors. Manual cookie parsing is brittle and should never be used when `cookie-parser` is available.
**Prevention:** Use a centralized configuration module for all secrets. Use standard middleware (like `cookie-parser`) for parsing headers. Search the entire codebase for secret usage to ensure consistency.
