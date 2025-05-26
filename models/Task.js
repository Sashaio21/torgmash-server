import { Schema, model } from "mongoose";

const taskSchema = new Schema({
    titleTask: String,
    descriptionTask: String,
    statusTask: String,
    executor: { type: Schema.Types.ObjectId, ref: 'Employee' },
    responsible: { type: Schema.Types.ObjectId, ref: 'Employee' },
    aplication: { type: Schema.Types.ObjectId, ref: 'Application' },
    deadline: Date,
    createdAt: Date,
    updatedAt: Date,
},
{
    timestamps: true
})

export default model('Task', taskSchema)