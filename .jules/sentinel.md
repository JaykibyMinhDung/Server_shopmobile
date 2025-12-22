## 2024-05-23 - Critical Password Exposure in URL
**Vulnerability:** User passwords were being sent via URL query parameters in the signup endpoint (`req.query` instead of `req.body`).
**Learning:** Even with `POST` methods, using `req.query` causes sensitive data to be logged in server access logs and proxy logs, bypassing the security of the request body.
**Prevention:** Always use `req.body` for sensitive data in POST/PUT requests. Ensure strict linting or code review checks for `req.query` usage with sensitive field names like "password".
