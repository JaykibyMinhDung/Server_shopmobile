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
## 2025-05-23 - Hardcoded User ID in Authentication Token
**Vulnerability:** The user login controller (`controller/user/auth.js`) was hardcoding the user ID in the JWT payload to `7` for all users (`{ id: 7, role: "client" }`).
**Learning:** This effectively bypassed all user-level isolation, making every logged-in user access the data and permissions of user ID 7. This likely happened during debugging or development and was never reverted.
**Prevention:** Avoid hardcoding IDs or roles in token generation logic, even for testing. Use integration tests to verify that the token payload matches the authenticated user.

## 2025-05-23 - Inconsistent and Hardcoded Admin Secrets
**Vulnerability:** The Admin authentication middleware (`middleware/auth-admin.js`) verified tokens using a hardcoded string `"ASSIGNMENT3$"`, while the controller signed them using `getJwtSecret()`. If the environment variable was missing, they might mismatch (random vs hardcoded), or if set, the middleware ignored it.
**Learning:** Security middleware and controllers must share the same configuration source for secrets. Hardcoding secrets in middleware creates a single point of failure and rotation difficulty.
**Prevention:** Centralize secret management (e.g., in `util/auth.js`) and ensure all parts of the application import from there.
