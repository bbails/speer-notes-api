import { Note, User } from '../models/index.js';
import { Router } from 'express';
import { userAuth } from '../middlewares/auth-guard.js';
import validator from '../middlewares/validation-middleware.js';
import { noteValidations } from '../validators/index.js';

const noteRouter = Router();

/**
 * @description Create Note from Authenticated User
 * @access private
 * @method POST
 * @path /api/notes
 * @body {content}
 */
noteRouter.post('/', userAuth, noteValidations, validator, async (req, res) => {
    try{
        // Create new Note
        let content = req.body.content;
        let user = await User.findById(req.user.id);
        let note = new Note({content: content, user: user._id});
        await note.save();
        return res.status(200).json({
            success: true,
            message: 'Note created successfully',
            note: note
        });
    }
    catch(err) {
        return res.status(400).json({
            success: false,
            message: 'Unable to Create Note'
        });
    }
});

/**
 * @description Get All Notes from User
 * @access Private
 * @method GET
 * @path /api/notes
 */
noteRouter.get('/', userAuth, async (req, res) => {
    let notes = await Note.find().or([{user: req.user.id}, {sharedWith: req.user.id}]);
    if (!notes) {
        return res.status(404).json({
            success: false,
            message: 'No notes found'
        });
    }

    return res.json(notes);
});

/**
 * @description Get Note by ID for Authenticated User
 * @access Private
 * @method GET
 * @path /api/notes/:id
 */
noteRouter.get('/:id', userAuth, async (req, res) => {
    let id  = req.params.id;
    let note = await Note.findById(id);
    if (!note || (note.user != req.user.id && !note.sharedWith.includes(req.user.id))) {
        return res.status(404).json({
            success: false,
            message: 'Note not found'
        }); 
    }
    return res.json(note);
});

/**
 * @description Update Note by Id for Authenticated User
 * @access Private
 * @method PUT
 * @path /api/notes/:id
 * @body {content}
 */
noteRouter.put('/:id', userAuth, noteValidations, validator, async (req, res) => {
    try {
        let id = req.params.id;
        let content = req.body.content;

        let note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({
                success: false,
                message: 'Note not found'
            });
        }
        if (note.user != req.user.id) {
            return res.status(401).json({
                success: false,
                message: 'Cannot update note that is not yours'
            })
        }
        note = await Note.findOneAndUpdate(
            {_id: id}, 
            {content: content}
        );

        return res.status(200).json({
            success: true, 
            message: 'Note updated successfully', 
            note: note
        });
    }
    catch(err) {
        console.log(err);
        return res.json({
            success: false,
            message: 'Unable to Update Note'
        });
    }

});

/**
 * @description Delete Note by Id for Authenticated User
 * @access Private
 * @method DELETE
 * @path /api/notes/:id
 */
noteRouter.delete('/:id', userAuth, async (req, res) => {
    const { id } = req.params;
    const note = await Note.findByIdAndDelete(id);
    if (!note){
        return res.status(404).json({
            success: false,
            message: 'Note not found'
        });
    }

    return res.status(200).json({
        success: true,
        message: 'Note deleted successfully',
        note: note
    });
});

/**
 * @description Share Note with Other User for Authenticated User
 * @access Private
 * @method POST
 * @path /api/notes/:id/share
 * @body {email}
 */
noteRouter.post('/:id/share', userAuth, async (req, res) => {
    let id = req.params.id;
    let email = req.body.email;

    let user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'Cannot find user with the email provided'
        });
    }

    let note = await Note.findById(id);
    if (!note) {
        return res.status(404).json({
            success: false,
            message: 'Note not found'
        });
    }
    if (note.user != req.user.id) {
        return res.status(401).json({
            success: false,
            message: 'Cannot share note that is not yours'
        })
    }   

    note = await Note.findOneAndUpdate(
        {_id: id}, 
        {sharedWith: [...note.sharedWith, user._id]}
    );
    return res.status(200).json({
        success: true, 
        message: 'Note shared successfully'
    });
});

export default noteRouter