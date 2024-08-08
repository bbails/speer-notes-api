/***
 * Test Note Functions
 * - Create Note
 * - Delete Note
 * - Share Note
 * - Update Note
 * - Get Notes
 * - Get Note
 * - Search Notes
 * 
 * /////
 * I'm using mongodb memory server here to create a fake db. This is really overkill and takes more time then I'd like.
 * Jest Mocks don't work super well eith ES6 modules. I played around with it for a bit and couldn't get it to work in a way 
 * that I liked. But given more time this should be refactored to use service Mocks, this should greatly improve the performance of the tests
 */

import supertest from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { createUser, findUserByEmail } from '../../services/user.js';
import { createNote, deleteNote } from '../../services/note.js';
import { createServer } from '../../utils/server.js';

var notePayload = {};

var authToken = {};

var testUser = {};

var testUser2 = {};

var testNote = {}; // Note Belongs to testUser
var testNote2 = {}; // Note Belongs to Random User
var noteToDelete = {}; // Note that we will Delete in Tests

const userPayload = {
    email: 'test@test.com',
    password: 'test123'
}

const user2Payload = {
    email:'test2@test.com',
    password: 'test123'
}

const app = createServer();

describe('Note', () => {

    beforeAll(async () => {      

        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri(), { dbName: "verifyNotes" });

        testUser = await createUser(userPayload.email, userPayload.password);
        authToken = await testUser.GenerateJWT();

        notePayload = {
            user: testUser._id,
            content: 'This is a test note'
        }

        
        testNote2 = await createNote('This is another test note', new mongoose.Types.ObjectId().toHexString());
    });

    describe('get Note route', () => {
        
        beforeAll(async () => {
            testNote = await createNote(notePayload.content, notePayload.user);
        })
        describe('given not using authorized user', () => {
            it('should return 401', async () => {
                const {body, statusCode} = await supertest(app).get('/api/notes');
                expect(statusCode).toBe(401);
            })
        })
        describe('given Note does not exist', () => {
            it('should return 404', async () => {
                const {body, statusCode} = await supertest(app)
                    .get('/api/notes/' + new mongoose.Types.ObjectId().toHexString())
                    .auth(authToken, { type: 'bearer' });
                expect(statusCode).toBe(404);
                console.log(body);

            })
        })
        describe('given Note exists', () => {

            it('should return 200 and note', async () => {                          
                const {body,statusCode} = await supertest(app)
                    .get('/api/notes/' + testNote._id)
                    .auth(authToken, { type: 'bearer' });

                expect(statusCode).toBe(200);
                expect(body.content).toEqual(notePayload.content);
            })
        })
    })
    describe('Post Note route', () => {
        describe('given not using authorized user', () => {
            it('should return 401', async () => {
                const {body, statusCode} = await supertest(app).post('/api/notes');
                expect(statusCode).toBe(401);
            })
        })
        describe('given user exists', () => {
            it('should return 200 and note', async () => {
                const {statusCode, body} = await supertest(app)
                    .post('/api/notes')
                    .auth(authToken, { type: 'bearer' })
                    .send(notePayload);
                expect(statusCode).toBe(200);
                expect(body.note.content).toEqual(notePayload.content);
            })
        })
        describe('given no content', () => {
            it('should return 400', async () => {
                const {statusCode, body} = await supertest(app)
                    .post('/api/notes')
                    .auth(authToken, { type: 'bearer' })
                    .send({});
                expect(statusCode).toBe(400);
            })
        })
    })
    describe('Delete Note route', () => {
        beforeAll(async () => {
            noteToDelete = await createNote('This is a test note to delete', testUser._id);
        })
        describe('given not using authorized user', () => {
            it('should return 401', async () => {
                const {body, statusCode} = await supertest(app)
                    .delete('/api/notes/' + new mongoose.Types.ObjectId().toHexString());
                expect(statusCode).toBe(401);
            })
        })
        describe('given Note exists and belongs to user', () => {
            it('should return 200 and note', async () => {
                const {body, statusCode} = await supertest(app)
                    .delete('/api/notes/' + noteToDelete._id)
                    .auth(authToken, { type: 'bearer' });
                expect(statusCode).toBe(200);
                expect(body.success).toBe(true);
            })
        })
        describe('given Note does not exist', () => {
            it('should return 404', async () => {
                const {body, statusCode} = await supertest(app)
                    .delete('/api/notes/' + new mongoose.Types.ObjectId().toHexString())
                    .auth(authToken, { type: 'bearer' });
                expect(statusCode).toBe(404);
                expect(body.success).toBe(false);
            })
        })
        describe('given note does not belong to user', () => {
            it('should return 401', async () => {   
                const {body, statusCode} = await supertest(app)
                    .delete('/api/notes/' + testNote2._id)
                    .auth(authToken, { type: 'bearer' });
                expect(statusCode).toBe(401);
                expect(body.success).toBe(false);
            })
        })
    })
    describe('Update Note route', () => {
        describe('given not using authorized user', () => {
            it('should return 401', async () => {
                const {body, statusCode} = await supertest(app)
                    .put('/api/notes/' + new mongoose.Types.ObjectId().toHexString());
                expect(statusCode).toBe(401);
            })
        })
        describe('given Note exists and belongs to user', () => {
            it('should return 200 and note', async () => {
                const {body, statusCode} = await supertest(app)
                    .put('/api/notes/' + testNote._id)
                    .auth(authToken, { type: 'bearer' })
                    .send({content: 'New Test content'});
                expect(statusCode).toBe(200);
                expect(body.success).toBe(true);
            })
        })
        describe('given Note does not exist', () => {
            it('should return 404', async () => {
                const {body, statusCode} = await supertest(app)
                    .put('/api/notes/' + new mongoose.Types.ObjectId().toHexString())
                    .auth(authToken, { type: 'bearer' })
                    .send({content: 'New Test content'});
                expect(statusCode).toBe(404);
                expect(body.success).toBe(false);
            })
        })
        describe('given note does not belong to user', () => {
            it('should return 401', async () => {   
                const {body, statusCode} = await supertest(app)
                    .put('/api/notes/' + testNote2._id)
                    .auth(authToken, { type: 'bearer' })
                    .send({content: 'New content'});
                expect(statusCode).toBe(401);
                expect(body.success).toBe(false);
            })
        })
    })
    describe('Share Note route', () => {
        beforeAll(async () => {
            // Create User to share with
            testUser2 = await createUser(user2Payload.email, user2Payload.password);
        })
        describe('given not using authorized user', () => {
            it('should return 401', async () => {
                const {body, statusCode} = await supertest(app)
                    .post('/api/notes/' + new mongoose.Types.ObjectId().toString() + '/share');
                expect(statusCode).toBe(401);
            })
        })
        describe('given Note exists and belongs to user', () => {
            it('should return 200 and note', async () => {
                const {body, statusCode} = await supertest(app)
                    .post('/api/notes/' + testNote._id + '/share')
                    .auth(authToken, { type: 'bearer' })
                    .send({email: testUser2.email});
                expect(statusCode).toBe(200);
            })
        })
        describe('given Note does not exist', () => {
            it('should return 404', async () => {
                const {body, statusCode} = await supertest(app)
                    .post('/api/notes/' + new mongoose.Types.ObjectId().toString() + '/share')
                    .auth(authToken, { type: 'bearer' })
                    .send({email: testUser2.email});
                expect(statusCode).toBe(404);
                expect(body.success).toBe(false);
            })
        })
        describe('given note does not belong to user', () => {
            it('should return 401', async () => {  
                const {body, statusCode} = await supertest(app)
                    .post('/api/notes/' + testNote2._id + '/share')
                    .auth(authToken, { type: 'bearer' })
                    .send({email: testUser2.email});
                expect(statusCode).toBe(401);
                expect(body.success).toBe(false);
            })
        })
    })
    describe('Search Notes route', () => {
        describe('given not using authorized user', () => {
            it('should return 401', async () => {
                const {body, statusCode} = await supertest(app)
                    .get('/api/search?content=test');
                expect(statusCode).toBe(401);
            })
        })
        describe('given using authorized user and valid text', () => {
            it('should return 200 and notes', async () => {
                const {body, statusCode} = await supertest(app)
                    .get('/api/search?content=test')
                    .auth(authToken, { type: 'bearer' })
                expect(statusCode).toBe(200);
            })
        })
    })
})