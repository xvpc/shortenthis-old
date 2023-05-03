import { Schema, models, model } from "mongoose";

const linksSchema = new Schema({
    id: String,
    originalLink: String,
    clicked: Number,
}, {timestamps: true})

const Links = models.Links || model('Links', linksSchema)
export default Links