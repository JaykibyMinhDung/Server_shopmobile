# Sentinel's Journal

## 2024-05-22 - Fragile Cookie Parsing Logic
**Vulnerability:** The authentication middleware parsed cookies by splitting the header string by `;` and taking a hardcoded index (`[1]` for users, `[0]` for admins).
**Learning:** This implementation assumed a specific order of cookies in the header, which is not guaranteed by browsers or HTTP specifications. If the cookie order changed, authentication would fail or potentially read the wrong token.
**Prevention:** Always use a proper cookie parser library (like `cookie-parser`) or robust regex to extract specific cookies by name, rather than relying on their position in the string.
