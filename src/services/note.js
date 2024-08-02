import Note from "../models/note.js";

export async function createNote(content, user) {
    let note = new Note({content: content, user: user._id});
    return await note.save();
}

export async function findNotesForUser(userId) {
    return await Note.find().or([{user: userId}, {sharedWith: userId}]);
}

export async function findNoteById(noteId) {
    return await Note.findById(noteId);
}

export async function findNotesByQuery(query) {
    return await Note.find(query);
}

export async function updateNote(id, content) {
    return await Note.findOneAndUpdate(
        {_id: id}, 
        {content: content}
    );
}

export async function deleteNote(noteId) {
    return await Note.findByIdAndDelete(noteId);
}

export async function shareNote(noteId, userId) {
    return await Note.findOneAndUpdate(
        {_id: noteId}, 
        {sharedWith: [...note.sharedWith, userId]}
    );
}