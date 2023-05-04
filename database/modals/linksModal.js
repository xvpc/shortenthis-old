// import {Schema, models, model} from "mongoose";

// const linksSchema = new Schema({
//     id: String,
//     originalLink: String,
//     clicked: Number,
// }, {timestamps: true})

// const Links = models.Links || model('Links', linksSchema)
// export default Links

import mongoose from 'mongoose';

const linksSchema = new mongoose.Schema({
    id: String,
    originalLink: String,
    clicked: Number,
}, {timestamps: true})

let Links;

try {
    Links = mongoose.model('Links')
} catch {
    Links = mongoose.model('Links', linksSchema)
}

export default Links;
