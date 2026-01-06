
import request from 'supertest';
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import jwt from 'jsonwebtoken';
// We need to import the app. Since it's CJS, we can import it.
import app from '../app';

// Helper to decode token
const decodeToken = (token) => jwt.decode(token);

import User from '../model/user';
import bcrypt from 'bcryptjs';

describe('Authentication Security Tests', () => {
  let mongoServer;

  beforeAll(async () => {
    // Set a deterministic secret for testing
    process.env.JWT_SECRET = 'test_secret_for_sentinel';

    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.disconnect(); // Ensure clean state
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    delete process.env.JWT_SECRET;
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('should not hardcode user ID to 7 in JWT token and allow access to protected user route', async () => {
    const email = 'test@example.com';
    const password = 'password123';

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      email,
      password: hashedPassword,
      fullName: 'Test User',
      phone: '1234567890',
      role: 0
    });
    await user.save();

    const savedUser = await User.findOne({ email });

    // Login
    const res = await request(app)
      .post('/login')
      .send({ email, password });

    expect(res.status).toBe(200);

    const body = res.body;
    const token = body.meta && body.meta[0] ? body.meta[0].cookie : null;
    expect(token).toBeDefined();

    const decoded = decodeToken(token);

    // VULNERABILITY CHECK:
    expect(decoded.id, "Token ID should match User ID").toBe(savedUser._id.toString());
    expect(decoded.id).not.toBe(7);

    // VERIFY MIDDLEWARE:
    // Access protected route /carts
    const protectedRes = await request(app)
        .get('/carts')
        .set('Cookie', [`client_token=${token}`]);

    expect(protectedRes.status).not.toBe(403);
    expect(protectedRes.status).not.toBe(401);
    expect(protectedRes.status).toBe(200);
  });

  it('should allow admin login and verify token with correct secret and access protected admin route', async () => {
     const email = 'admin@example.com';
     const password = 'adminpassword';
     const hashedPassword = await bcrypt.hash(password, 12);

     const admin = new User({
         email,
         password: hashedPassword,
         fullName: 'Admin User',
         phone: '0987654321',
         role: 1 // Admin
     });
     await admin.save();

     const res = await request(app)
       .post('/users') // Admin Login Route
       .send({ email, password });

     expect(res.status).toBe(200);
     const token = res.body.data.cookie;
     expect(token).toBeDefined();

     // Verify we can access a protected admin route
     // We use a route that actually uses middleware/auth-admin.js: POST /products/new-product
     // (routes/admin/auth.js incorrectly uses middleware/auth.js)

     const protectedRes = await request(app)
        .post('/products/new-product')
        .set('Cookie', [`admin_token=${token}`])
        .send({ title: "Test Product", price: 100 }); // Minimal body

     // If auth works, we might get 200, 201, or error from controller.
     // If auth fails, we get 403.

     expect(protectedRes.status).not.toBe(403);

     // Double check it equals our set secret
     const { getJwtSecret } = await import('../util/auth');
     expect(getJwtSecret()).toBe('test_secret_for_sentinel');
  });
});
