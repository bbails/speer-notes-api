import { Note, User } from '../models/index.js';
import { createNote, findNotesForUser, findNoteById, updateNote, deleteNote, shareNote, findNotesByQuery } from '../services/note.js';

export async function createNoteHandler(req, res) {
    // Create new Note
    let content = req.body.content;
    let user = await User.findById(req.user.id);

    try {
        var note = await createNote(content, user._id);
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }

    return res.status(200).json({
        success: true,
        message: 'Note created successfully',
        note: note
    });
}

export async function getNotesHandler(req, res){
    let notes = await findNotesForUser(req.user.id);
    if (!notes) {
        return res.status(404).json({
            success: false,
            message: 'No notes found'
        });
    }

    return res.status(200).json(notes);
}

export async function getNoteByIdHandler (req, res) {
    let id  = req.params.id;
    let note = await findNoteById(id);
    if (!note || (note.user != req.user.id && !note.sharedWith.includes(req.user.id))) {
        return res.status(404).json({
            success: false,
            message: 'Note not found'
        }); 
    }
    return res.json(note);
}

export async function updateNoteHandler (req, res) {
    let id = req.params.id;
    let content = req.body.content;

    let note = await findNoteById(id);
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
    note = updateNote(id, content);

    return res.status(200).json({
        success: true, 
        message: 'Note updated successfully', 
        note: note
    });
}

export async function deleteNoteHandler (req, res) {
    const { id } = req.params;  

    let note = await findNoteById(id);
    if (!note) {
        return res.status(404).json({
            success: false,
            message: 'Note not found'
        });
    }
    if (note.user != req.user.id) {
        return res.status(401).json({
            success: false,
            message: 'Cannot delete note that is not yours'
        })
    }
    const deletedNote = deleteNote(id)

    return res.status(200).json({
        success: true,
        message: 'Note deleted successfully',
        note: deletedNote
    });
}

export async function shareNoteHandler (req, res) {
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

    note = shareNote(id, user._id)
    return res.status(200).json({
        success: true, 
        message: 'Note shared successfully'
    });
}

export async function searchNoteHandler (req, res) {
    let query  = req.query.content;
    let notes = await findNotesByQuery({user: req.user.id, content : new RegExp(query, 'i')});
    if (notes.length == 0) 
        return res.status(404).json(
        { 
            message: 'Sorry, no notes found, remember to search by content and I can only search your notes!' 
        });
    return res.json(notes);
}

export default { createNoteHandler, getNotesHandler, getNoteByIdHandler, updateNoteHandler, deleteNoteHandler, shareNoteHandler, searchNoteHandler } 