## 2024-05-22 - Stored XSS via File Upload
**Vulnerability:** The application allowed uploading files with dangerous extensions (e.g., `.html`) by spoofing the MIME type (e.g., `image/png`). This could lead to Stored XSS if the uploaded file is accessed directly.
**Learning:** `multer`'s `fileFilter` only checks the MIME type provided by the client, which can be easily spoofed. It does not validate the file extension or content.
**Prevention:** Validate both the MIME type and the file extension against an allowlist. Additionally, ensure uploaded files are served with `Content-Disposition: attachment` or strictly typed headers to prevent browser execution.
