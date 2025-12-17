const crypto = require("crypto");

// Generate a random secret if one is not provided.
// This ensures that if the env var is missing, the app is still secure (sessions invalidate on restart),
// rather than falling back to a known hardcoded secret.
const randomSecret = crypto.randomBytes(64).toString("hex");

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    // Only log this warning once or if in a dev-like environment if needed,
    // but here we just warn.
    if (!process.env.SUPPRESS_JWT_WARNING) {
        console.warn("WARN: JWT_SECRET environment variable is not set. Using a temporary random secret. Sessions will not persist across restarts.");
        // Set env var to suppress future warnings in this process if called multiple times,
        // though usually we just call this function.
        process.env.SUPPRESS_JWT_WARNING = "true";
    }
    return randomSecret;
  }
  return secret;
}

module.exports = {
  getJwtSecret
};
