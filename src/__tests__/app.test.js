const request = require('supertest');
const app = require('../index');

describe('API Endpoints', () => {
  
  // Test health check endpoint
  describe('GET /health', () => {
    it('should return status OK', async () => {
      const res = await request(app).get('/health');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('status', 'OK');
      expect(res.body).toHaveProperty('timestamp');
    });
  });

  // Test get all users
  describe('GET /api/users', () => {
    it('should return all users', async () => {
      const res = await request(app).get('/api/users');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  // Test get user by ID
  describe('GET /api/users/:id', () => {
    it('should return a user by ID', async () => {
      const res = await request(app).get('/api/users/1');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('id', 1);
      expect(res.body).toHaveProperty('name');
    });

    it('should return 404 for non-existent user', async () => {
      const res = await request(app).get('/api/users/999');
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('error', 'User not found');
    });
  });

  // Test create user
  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const newUser = {
        name: 'Test User',
        email: 'test@example.com'
      };
      const res = await request(app).post('/api/users').send(newUser);
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('name', 'Test User');
      expect(res.body).toHaveProperty('email', 'test@example.com');
    });

    it('should return 400 if name is missing', async () => {
      const res = await request(app).post('/api/users').send({ email: 'test@example.com' });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });

});