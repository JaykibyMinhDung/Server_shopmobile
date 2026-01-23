## 2024-05-23 - Hardcoded Secrets & Fragile Cookie Parsing
**Vulnerability:** Found `ASSIGNMENT3$` hardcoded as JWT secret in `middleware/auth-admin.js`, bypassing the dynamic secret system. Also found extremely fragile cookie parsing relying on cookie order (`split(";")[0]`).
**Learning:** Developers might hardcode secrets during "Assignment" or early dev phases and forget to switch to dynamic/env-based secrets. Cookie parsing without `cookie-parser` or proper parsing libraries is prone to breakage if browser cookie ordering changes.
**Prevention:** Always use centralized secret management (`util/auth.js`) and established middleware (`cookie-parser`) for token retrieval.
