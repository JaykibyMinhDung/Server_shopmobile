## 2024-05-22 - Hardcoded SendGrid API Key
**Vulnerability:** A hardcoded SendGrid API key was found in `controller/user/products.js`. This key allows unauthorized actors to send emails on behalf of the application, potentially leading to phishing campaigns or spam.
**Learning:** Hardcoded credentials in source code are a common but critical vulnerability. They are easily discovered by automated scanners.
**Prevention:** Always use environment variables for third-party API keys. Ensure `.env` files are in `.gitignore`.

## 2024-05-23 - Hardcoded JWT Secret & Auth Bypass in Admin Auth
**Vulnerability:**
1. A hardcoded JWT secret ("ASSIGNMENT3$") was found in `controller/admin/auth.js`.
2. **Critical:** The login function failed to throw an error when `bcrypt.compare` returned false, allowing any password to generate a valid admin token.
3. The token payload hardcoded the user ID (7) and role ("admin").

**Learning:**
- Hardcoded secrets can lead to token forgery.
- Always check the return flow of authentication logic. A `new Error()` does nothing if not thrown or returned.
- Hardcoded payloads in tokens defeat the purpose of authentication, as they don't represent the logged-in user.

**Prevention:**
- Centralize secret management.
- Unit test authentication flows, specifically negative cases (wrong password).
- Use dynamic values from the authenticated user record for token generation.

## 2024-05-23 - Sensitive Data in Query Parameters
**Vulnerability:** The `signup` endpoint (`controller/user/auth.js`) reads sensitive user data (password, email, phone) from `req.query`.
**Learning:** Sending sensitive data in URL query parameters exposes it in server logs, proxy logs, and browser history. POST requests should carry sensitive data in the request body.
**Prevention:** Always use `req.body` for POST/PUT requests involving sensitive data. Validate input sources.
