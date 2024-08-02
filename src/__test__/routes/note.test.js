import supertest from 'supertest';
//import { app } from '../../index.js';
import mongoose from 'mongoose';
import { createNote, deleteNote } from '../../services/note.js';
import { createServer } from '../../utils/server.js';
import { GenerateJWT } from '../../utils/jwt.utils.js';

const userId = new mongoose.Types.ObjectId().toString();

const testNote = {
    user: userId,
    content: 'This is a test note'
}

const testUser = {
    userId: userId,
    email: 'test@test.com',
    password: 'test123'
}

const app = createServer();

describe.skip('Note', () => {
    describe('get Note route', () => {
        describe('given not using authorized user', () => {
            it('should return 401', async () => {
                const noteId = testNote;
                await supertest(app).get('/api/notes/' + noteId).expect(401);
            })
        })
        /*describe('given product exists', () => {

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
        })*/
    })
})