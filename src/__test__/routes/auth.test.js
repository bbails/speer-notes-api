import supertest from 'supertest';
import { createServer } from '../../utils/server.js';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import {jest, beforeAll, afterAll} from '@jest/globals'
import { createUser } from '../../services/user.js';

const app = createServer();

var userPayload = {
    email: 'test@test.com',
    password: 'test123'
}

var user2payload = {
    email:'test2@test.com',
    password: 'test123'
}

describe('Auth Routes', () => {

    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri(), { dbName: "verifyAuth" });
    });

    // User Registration
    describe('Auth Register Route', () => {
        describe('given email is invalid', () => {
            it('should return 400', async () => {
                const user = {
                    email: 'test',
                    password: 'test123'
                }
                const {body, statusCode} = await supertest(app).post('/api/auth/signup').send(user);
                expect(statusCode).toBe(400);
            })
        })
        describe('given password is invalid', () => {
            it('should return 400', async () => {
                const user = {
                    email: 'test@test.com',
                    password: 'test'
                }
                const {body, statusCode} = await supertest(app).post('/api/auth/signup').send(user);
                expect(statusCode).toBe(400);
            })
        })
        describe('given email already exists', () => {
            it('should return 400', async () => {
                const user = await createUser(user2payload.email, user2payload.password);
                const {body, statusCode} = await supertest(app).post('/api/auth/signup').send(user2payload)
                expect(statusCode).toBe(400);
                expect(body.success).toBe(false);
            })
        })
        describe('given valid email and password', () => {
            it('should return 200 and user payload', async () => {
                const user = {
                    email: 'test@test.com',
                    password: 'test123'
                }
                const {body, statusCode} = await supertest(app).post('/api/auth/signup').send(user);

                expect(statusCode).toBe(200);
                expect(body.success).toBe(true);
            })
        })
    })
    describe('Auth Login Route', () => {
        beforeAll(async () => {
            // Create User to test against
            await createUser(userPayload.email, userPayload.password);
        })
        describe('given valid user', () => {
            it('should return 200 and bearer token', async () => {
                const {body, statusCode} = await supertest(app).post('/api/auth/login').send(userPayload);

                expect(statusCode).toBe(200);
            })
        })
        describe('given invalid given wrong password', () => {
            it('should return 400', async () => {
                const user = {
                    email: userPayload.email,
                    password: 'test12345' // Wrong password
                }
                const {body, statusCode} = await supertest(app).post('/api/auth/login').send(user);

                expect(statusCode).toBe(400);
                expect(body.success).toBe(false);
                expect(body.message).toBe('Email or Password is incorrect');
            })
        })
    })
})