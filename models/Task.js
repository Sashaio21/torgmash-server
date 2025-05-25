import { Schema, model } from "mongoose";

const taskSchema = new Schema({
    titleTask: String,
    descriptionTask: String,
    statusTask: String,
    executor: Schema.Types.ObjectId, // тот кто выполняет задачу 
    responsible: Schema.Types.ObjectId, // ответственный за выполнение заявки
    aplication: Schema.Types.ObjectId, // заявка, к которой относиться задача
    deadline: Date,
    createdAt: Date,
    updatedAt: Date,
},
{
    timestamps: true
})

export default model('Task', taskSchema)