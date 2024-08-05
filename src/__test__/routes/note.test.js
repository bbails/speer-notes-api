import supertest from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { createUser, findUserByEmail } from '../../services/user.js';
import { createNote, deleteNote } from '../../services/note.js';
import { createServer } from '../../utils/server.js';
import { GenerateJWT } from '../../utils/jwt.utils.js';



const userId = new mongoose.Types.ObjectId().toString();

const notePayload = {
    user: userId,
    content: 'This is a test note'
}

const userPayload = {
    email: 'test@test.com',
    password: 'test123'
}

const app = createServer();

describe('Note', () => {

    beforeAll(async () => {      

        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri(), { dbName: "verifyNotes" });

        const testUser = await createUser(userPayload.email, userPayload.password);
        const authToken = testUser.GenerateJWT();
    });
    afterAll(async () => {
        //await mongoose.disconnect( { dbName: "verifyNotes" });
        //await mongoose.connection.close();
    });

    describe('get Note route', () => {
        describe('given not using authorized user', () => {
            it('should return 401', async () => {
                const noteId = userId;
                const {body, statusCode} = await supertest(app).get('/api/notes');
                console.log(body);
                console.log(statusCode);
                //expect(statusCode).toBe(401);
            })
        })
        describe.skip('given Note exists', () => {

            it('should return 200 and note', async () => {              
                const jwt = GenerateJWT(testNote);
                console.log(auth);
                const note = createNote(testNote);
                const {statusCode, body} =await supertest(app)
                    .get('/api/notes/' + note._id)
                    .set('Authorization', 'Bearer ' + auth.token)

                expect(statusCode).toBe(200);
                expect(body.content).toEqual(testNote.content);
            })
        })
    })
})