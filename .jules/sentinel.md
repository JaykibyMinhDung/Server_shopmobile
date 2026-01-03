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

## 2025-05-23 - Fragile Cookie Parsing and Hardcoded Secret in Middleware
**Vulnerability:** Authentication middleware (`auth.js` and `auth-admin.js`) manually parsed cookie strings by index (e.g., `.split(";")[1]`), causing instability if cookie order changed. Additionally, `auth-admin.js` verified tokens with a hardcoded secret `"ASSIGNMENT3$"`, separate from the login logic's secret.
**Learning:** Manual parsing of standardized headers like `Cookie` is error-prone and brittle. Hardcoded secrets in middleware create a "double truth" problem where login and verification can drift apart.
**Prevention:** Use established middleware (like `cookie-parser`) to handle header parsing. Centralize secret management in a single utility or config file.
