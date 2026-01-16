
const jwt = require("jsonwebtoken");
const { getJwtSecret } = require("./util/auth");

// Mock dependencies
const req = {
  headers: {
    cookie: "admin_token=SOME_TOKEN"
  },
  cookies: {
      admin_token: "SOME_TOKEN"
  }
};
const res = {
  status: function(code) {
    this.statusCode = code;
    return this;
  },
  json: function(data) {
    console.log("Response Status:", this.statusCode);
    console.log("Response Data:", JSON.stringify(data));
  }
};
const next = () => console.log("Next called (Success!)");

// Create a valid token using the REAL secret logic
// Note: In real app, controller/admin/auth.js uses getJwtSecret()
const realSecret = getJwtSecret();
const token = jwt.sign({ id: "admin_123", role: "admin" }, realSecret);

console.log("Generated Token with getJwtSecret():", token);
console.log("Secret used:", realSecret);

// Update mock request with this token
// Note: The middleware splits by index, so we need to be careful with format if we test that.
// But first, let's verify if the logic of using "ASSIGNMENT3$" fails when secret is random/env.

req.headers.cookie = `admin_token=${token}`;
req.cookies.admin_token = token;

// Load the middleware
const authMiddleware = require("./middleware/auth-admin");

console.log("\n--- Testing Middleware ---");
try {
    authMiddleware(req, res, next);
} catch (e) {
    console.log("Middleware threw error:", e);
}
