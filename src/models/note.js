import { Schema, model } from "mongoose"; 
import pkg from 'lodash';
const { lodash } = pkg;

const NoteSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    sharedWith: {
        type: [Schema.Types.ObjectId],
        ref: 'user'
    }
}, { timestamps: true });

NoteSchema.methods.getNoteContent = function() {
    return pick(this, ['_id', 'content']);
}

const Note = model("notes", NoteSchema);
export default Note;