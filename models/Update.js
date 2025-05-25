import { Schema, model } from "mongoose";

const updateSchema = new Schema({
    title: String,
    description: String,
    responsible:{
        type: Schema.Types.ObjectId,
        ref: "SeniorDeveloper"
    } , // ответственный за выполнение заявки
    application: {
        type: Schema.Types.ObjectId,
        ref: "UpdateApplication"
    } ,
    createdAt: Date,
    updatedAt: Date,
},  
{
    timestamps: true 
})

export default model('update', updateSchema)