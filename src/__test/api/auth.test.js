import request from 'supertest';
import app from '../src/index'; 

describe('Auth API Endpoints', () => {
    it('should create a new user', async () => {
        const res = await request(app)
            .post('/api/auth/signup')
            .send({
                email: 'test@example.com',
                password: 'password123'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.text).toEqual('User created');
    });

    it('should return error if user already exists', async () => {
        const res = await request(app)
            .post('/api/auth/signup')
            .send({
                email: 'test@example.com',
                password: 'password123'
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message', 'User already exists');
    });

    it('should login a user', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@example.com',
                password: 'password123'
            });
        expect(res.statusCode).toEqual(200); // Assuming successful login returns 200 status
        // Add more assertions based on your login logic
    });
});