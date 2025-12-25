## 2024-05-22 - Hardcoded JWT Secret & Admin Auth Bypass
**Vulnerability:** Found a hardcoded JWT secret `"ASSIGNMENT3$"` in `controller/admin/auth.js` and `middleware/auth-admin.js`. Also found a logic error in `controller/admin/auth.js` where an incorrect password check created an Error but didn't throw it, effectively allowing any password for existing admin users.
**Learning:** Checking for `Error` object creation is not enough; one must ensure it affects control flow (e.g., via `throw`). Hardcoded secrets often appear in copied code or "temporary" admin implementations.
**Prevention:** Use a centralized configuration or utility for secrets. Always use `throw` or `return` immediately after detecting an auth failure. Verify logic paths for error conditions.
