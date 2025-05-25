import { Schema, model } from "mongoose";

const applicationSchema = new Schema({
    title: String,
    description: String,
    status: String, 
    applicant: Schema.Types.ObjectId, // тот кто отправил заявку
    urgency: String,
    responsible:{
        type: Schema.Types.ObjectId,
        ref: "SeniorDeveloper"
    } , // ответственный за выполнение заявки
    createdAt: Date,
    updatedAt: Date,
},  
{
    timestamps: true 
})

export default model('Application', applicationSchema)