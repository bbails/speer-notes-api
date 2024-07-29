import Router from 'express';
import { Note } from '../models/index.js';

const searchRouter = Router();

/**
 * @description Search Notes by content
 * @method GET
 * @path /api/search?q=:query:
 */
searchRouter.get('/', async (req, res) => {
    const { query } = req.query;
    const notes = await Note.find({ content: new RegExp(query, 'i') });
    if (!notes) 
        return res.sendStatus(404).json(
            { 
                message: 'Sorry, no notes found, remember to search by content and I can only search your notes!' 
            });

    return res.json(notes);
});

export default searchRouter