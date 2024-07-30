import { Note, User } from '../models/index.js';

export async function createNote(req, res) {
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

export async function getAllNotesForUser(req, res){
    let notes = await Note.find().or([{user: req.user.id}, {sharedWith: req.user.id}]);
    if (!notes) {
        return res.status(404).json({
            success: false,
            message: 'No notes found'
        });
    }

    return res.status(200).json(notes);
}

export async function getNoteById (req, res) {
    let id  = req.params.id;
    let note = await Note.findById(id);
    if (!note || (note.user != req.user.id && !note.sharedWith.includes(req.user.id))) {
        return res.status(404).json({
            success: false,
            message: 'Note not found'
        }); 
    }
    return res.json(note);
}

export async function UpdateNote (req, res) {
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

export async function deleteNote (req, res) {
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
}

export async function shareNote (req, res) {
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
}

export async function searchForNoteByContent (req, res) {
    let query  = req.query.content;
    let notes = await Note.find({user: req.user.id, content : new RegExp(query, 'i')});
    if (notes.length == 0) 
        return res.status(404).json(
        { 
            message: 'Sorry, no notes found, remember to search by content and I can only search your notes!' 
        });
    return res.json(notes);
}

export default { createNote, getAllNotesForUser, getNoteById, UpdateNote, deleteNote, shareNote, searchForNoteByContent } 