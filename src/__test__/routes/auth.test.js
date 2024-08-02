import supertest from 'supertest';
import { createServer } from '../../utils/server.js';
import mongoose from 'mongoose';
import * as UserService from '../../services/user.js';
import { createUser, deleteUser } from '../../services/user.js';
import {jest, beforeAll, afterAll} from '@jest/globals'


const userId = new mongoose.Types.ObjectId().toString();

var userPayload = {
    _id: userId,
    email: 'test@test.com',
    password: 'test123'
}

const app = null;

// I'd love to clean this up but Jest doesn't like ESM, Should look into other testing frameworks that better work with ESM
beforeAll(() => {
    app = createServer();

    jest.unstable_mockModule("../../services/user.js", () => ({
        createUser: jest.fn(() => { return userPayload }),
        findUserByEmail: jest.fn(() => { return userPayload }), 
    })); 
});

afterAll(() => {
    jest.clearAllMocks();
});


describe('Auth Routes', () => {
    // User Registration
    describe('Auth Register Route', () => {
        describe('given email is invalid', () => {
            it('should return 400', async () => {
                const user = {
                    email: 'test',
                    password: 'test123'
                }
                await supertest(app).post('/api/auth/signup').send(user).expect(400);
            })
        })
        describe('given password is invalid', () => {
            it('should return 400', async () => {
                const user = {
                    email: 'test@test.com',
                    password: 'test'
                }
                await supertest(app).post('/api/auth/signup').send(user).expect(400);
            })
        })
        describe.skip('given valid email and password', () => {
            it('should return 200 and user payload', async () => {
                const user = {
                    email: 'test@test.com',
                    password: 'test123'
                }
                await supertest(app).post('/api/auth/signup').send(user).expect(200);
            })
        })
    })
    describe('Auth Login Route', () => {
        describe.skip('given valid user', () => {
            it('should return 200 and bearer token', async () => {
                const user = userPayload;
                await supertest(app).post('/api/auth/login').send(user).expect(200);
            })
        })
        describe('given invalid given wrong password', () => {
            it('should return 400', async () => {
                const user = {
                    email: 'test@test.com',
                    password: 'test12345'
                }
                await supertest(app).post('/api/auth/login').send(user).expect(400);
            })
        })
    })
})