## 2024-05-22 - [CRITICAL] Sensitive Data Exposure in Signup
**Vulnerability:** The signup controller was retrieving sensitive user data (password, email, phone, fullname) from `req.query`.
**Learning:** This exposed user passwords in server logs, browser history, and proxy logs. It's a common mistake when copying code from GET handlers or misunderstanding how data is sent.
**Prevention:** Always use `req.body` for POST requests involving sensitive data. Ensure body parsers (`express.json`, `express.urlencoded`) are configured. Use static analysis tools or code reviews to catch `req.query.password` patterns.
