import { Schema, model } from "mongoose"; 

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

const Note = model("notes", NoteSchema);
export default Note;