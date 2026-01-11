## 2024-03-24 - [CRITICAL] Hardcoded User ID in Auth Token
**Vulnerability:** The `login` controller for users (`controller/user/auth.js`) was hardcoding the user ID to `7` when generating JWT tokens.
**Learning:** This likely happened during development/testing where a specific user ID was used and never replaced with dynamic data. It bypassed authentication for all other users, making everyone log in as user #7.
**Prevention:** Always use dynamic data from the database record when generating security tokens. Review auth logic carefully before deployment. Avoid "magic numbers" in security-critical code.
