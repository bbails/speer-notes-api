import Router from 'express';
import { userAuth } from '../middlewares/auth-guard.js';
import noteController from '../controllers/note.js';

const searchRouter = Router();

/**
 * @description Search Notes by content
 * @access Private
 * @method GET
 * @path /api/search?q=:query:
 */
searchRouter.get('/', userAuth, noteController.searchNoteHandler);

export default searchRouter