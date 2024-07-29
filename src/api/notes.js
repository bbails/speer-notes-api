import { Note } from '../models/index.js';
import { Router } from 'express';
import { userAuth } from '../middlewares/auth-guard.js';

const noteRouter = Router();

/**
 * @description Create Note
 * @method POST
 * @path /api/notes
 * @body {content}
 */
noteRouter.post('/', userAuth, async (req, res) => {
    const note = new Note({...req.body});
    await note.save();
    return res.json(note);
});

/**
 * @description Get All Notes from User
 * @method GET
 * @path /api/notes
 */
noteRouter.get('/', async (req, res) => {
    const notes = await Note.find();
    return res.json(notes);
});

export default noteRouter