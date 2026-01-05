const authAdmin = require('../middleware/auth-admin');
const jwt = require('jsonwebtoken');
const { getJwtSecret } = require('../util/auth');

// Mock req, res, next
const req = {
    cookies: {},
    headers: {}
};
const res = {
    status: function(code) {
        this.statusCode = code;
        return this;
    },
    json: function(data) {
        this.data = data;
        return this;
    }
};
const next = () => {
    console.log("NEXT CALLED");
    process.exit(0); // Success
};

// Test setup:
// We want to verify that the middleware correctly validates a token
// signed with getJwtSecret() and placed in req.cookies.admin_token.

const secret = getJwtSecret();
// We simulate a valid token as it SHOULD be handled after fix.
const token = jwt.sign({ id: 'admin123', role: 'admin' }, secret);

// Scenario 1: Correct cookie placement
req.cookies.admin_token = token;

// Scenario 2: Legacy fragile header (what current code expects, partially)
// Current code: req.headers?.cookie.split(";")[0].split("=")[1]
// If we run this test against CURRENT code, it will fail because:
// 1. req.headers.cookie is undefined/empty
// 2. Even if we set it, current code expects "ASSIGNMENT3$" secret.
// 3. Current code expects cookie at specific index.

console.log("Running auth-admin middleware test...");
try {
    authAdmin(req, res, next);
} catch (e) {
    console.error("Middleware threw error:", e);
}

setTimeout(() => {
    if (res.statusCode) {
        console.log(`Response sent: ${res.statusCode} ${JSON.stringify(res.data)}`);
        if (res.statusCode === 403) {
            console.log("FAIL: Middleware rejected the token (Expected behavior before fix due to missing headers/wrong secret)");
        }
    } else {
        console.log("FAIL: Timeout - neither next called nor response sent");
    }
}, 500);
