## 2024-05-24 - Admin Auth Hardcoded Secret
**Vulnerability:** The admin authentication middleware (`auth-admin.js`) used a hardcoded secret string `"ASSIGNMENT3$"` for JWT verification. This allowed anyone with source code access to forge valid admin tokens.
**Learning:** Hardcoded secrets in middleware are easy to miss if the token generation (login) uses a different method or helper function. Here, user auth used a helper but admin auth was hardcoded.
**Prevention:** Always use a centralized configuration or helper function for secrets (like `getJwtSecret()`). Scan for string literals that look like secrets or keys.

## 2024-05-24 - Fragile Cookie Parsing
**Vulnerability:** The auth middleware manually parsed cookies using `req.headers.cookie.split(";")[0]`, assuming the auth cookie was always the first one.
**Learning:** Manual parsing of headers is brittle. Middleware order matters, but relying on browser cookie order is unsafe.
**Prevention:** Always use `cookie-parser` and `req.cookies` for reliable access to named cookies.
