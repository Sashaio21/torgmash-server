import { Schema, model } from "mongoose";

const newFunctionSchema = new Schema({
    title: String,
    description: String,
    status: String,
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

export default model('newFunction', newFunctionSchema)