import mongoose from "mongoose";
import { Schema } from "mongoose";

const personSchema  = new Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    }
});

const Person = mongoose.model('Person',personSchema);
export default Person;