## 2024-05-22 - Hardcoded SendGrid API Key
**Vulnerability:** A hardcoded SendGrid API key was found in `controller/user/products.js`. This key allows unauthorized actors to send emails on behalf of the application, potentially leading to phishing campaigns or spam.
**Learning:** Hardcoded credentials in source code are a common but critical vulnerability. They are easily discovered by automated scanners.
**Prevention:** Always use environment variables for third-party API keys. Ensure `.env` files are in `.gitignore`.

## 2025-01-27 - Password Exposure in Query Parameters
**Vulnerability:** The signup endpoint `controller/user/auth.js` was retrieving sensitive user data (email, password, phone) from `req.query` instead of `req.body`.
**Learning:** This exposes passwords in server access logs, proxy logs, and browser history. It suggests a misunderstanding of how POST requests should be handled in this codebase.
**Prevention:** Always use `req.body` for sensitive data in POST/PUT requests. Enforce a linting rule or code review checklist to catch usage of `req.query` for sensitive fields.
