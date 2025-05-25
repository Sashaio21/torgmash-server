import { Schema, model } from "mongoose";

const JobTitleSchema = new Schema({
    nameJobTitle: {
        type: String,
        unique: true
    },
    department : Schema.Types.ObjectId
})

export default model("JobTitle", JobTitleSchema)