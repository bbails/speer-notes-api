import { Router } from 'express';
import { userAuth } from '../middlewares/auth-guard.js';
import validator from '../middlewares/validation-middleware.js';
import { noteValidations } from '../validators/index.js';
import noteController from '../controllers/note.js';

const noteRouter = Router();

/**
 * @description Create Note from Authenticated User
 * @access private
 * @method POST
 * @path /api/notes
 * @body {content}
 */
noteRouter.post('/', userAuth, noteValidations, validator, noteController.createNoteHandler);

/**
 * @description Get All Notes from User
 * @access Private
 * @method GET
 * @path /api/notes
 */
noteRouter.get('/', userAuth, validator, noteController.getNotesHandler);

/**
 * @description Get Note by ID for Authenticated User
 * @access Private
 * @method GET
 * @path /api/notes/:id
 */
noteRouter.get('/:id', userAuth, validator, noteController.getNoteByIdHandler);

/**
 * @description Update Note by Id for Authenticated User
 * @access Private
 * @method PUT
 * @path /api/notes/:id
 * @body {content}
 */
noteRouter.put('/:id', userAuth, noteValidations, validator, noteController.updateNoteHandler);

/**
 * @description Delete Note by Id for Authenticated User
 * @access Private
 * @method DELETE
 * @path /api/notes/:id
 */
noteRouter.delete('/:id', userAuth, validator, noteController.deleteNoteHandler);

/**
 * @description Share Note with Other User for Authenticated User
 * @access Private
 * @method POST
 * @path /api/notes/:id/share
 * @body {email}
 */
noteRouter.post('/:id/share', userAuth, validator, noteController.shareNoteHandler);

export default noteRouter