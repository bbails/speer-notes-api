import supertest  from 'supertest';
import { app } from '../index.js';

describe('Note', () => {
    describe('get Note route', () => {
        describe('given note does not exist', () => {
            it('should return 404 not found', async () => {
                const noteId = 'note-123';
                await supertest(app).get('/api/notes/' + noteId).expect(404);
            })
        })
        describe('given note exists', () => {
            it('should return 200 ok', async () => {
                const noteId = 'note-123';
                await supertest(app).get('/api/notes/' + noteId).expect(200);
            })
        })
    })
})