import { Schema, model } from "mongoose"; 
import Paginator from 'mongoose-paginate-v2'
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


NoteSchema.plugin(Paginator);

const Note = model("notes", NoteSchema);
export default Note;