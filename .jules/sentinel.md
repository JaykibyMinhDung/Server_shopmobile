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

## 2025-02-19 - JWT Secret Mismatch and Fragile Cookie Parsing
**Vulnerability:** The admin middleware verified tokens using a hardcoded secret "ASSIGNMENT3$", while the login controller signed them using `getJwtSecret()`. This caused a denial of service for valid admins unless the environment happened to match the hardcoded string. Additionally, cookie parsing relied on fragile string splitting (`req.headers.cookie.split(";")[0]`), allowing authentication bypass or failure depending on cookie order.
**Learning:** Hardcoded secrets not only pose a security risk but can cause system instability when they drift from the configuration used elsewhere. Fragile parsing logic is a common source of bugs and potential security bypasses.
**Prevention:** Use a single source of truth for secrets (config/utility). Use established libraries (`cookie-parser`) instead of manual parsing.
