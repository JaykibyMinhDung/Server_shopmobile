## 2024-03-24 - Hardcoded Secret in Admin Middleware
**Vulnerability:** Found a hardcoded secret `"ASSIGNMENT3$"` in `middleware/auth-admin.js` used to verify JWTs, while the signing process used a dynamic secret.
**Learning:** Inconsistent usage of secrets (one file hardcoded, another dynamic) can lead to broken authentication or false security if the dynamic secret defaults to a random value.
**Prevention:** Always use a centralized configuration or utility (like `getJwtSecret()`) for secrets to ensure consistency and security across signing and verification.

## 2024-03-24 - Fragile Cookie Parsing
**Vulnerability:** Authentication middleware parsed cookies by index (`req.headers.cookie.split(";")[0]`), which is extremely fragile and breaks if multiple cookies exist or order changes.
**Learning:** Manual parsing of headers is error-prone.
**Prevention:** Always use `cookie-parser` and access `req.cookies` by key.
