## 2024-05-23 - [Insecure File Upload]
**Vulnerability:** Multer configuration used `file.originalname` directly for filenames, allowing path traversal (e.g., `../../evil.html`) and Stored XSS via unsafe extensions.
**Learning:** Even with `fileFilter` checking MIME types, relying on user-provided filenames is dangerous. Attackers can spoof MIME types or use valid filenames that traverse directories.
**Prevention:** Always generate a random, unique filename on the server (e.g., UUID) and enforce a whitelist of safe file extensions, ignoring the user-provided extension if possible or validating it strictly.
