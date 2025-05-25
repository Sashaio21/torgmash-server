import { Schema, model } from "mongoose";

const programmerSchema = new Schema({
    idEmployee: {
        type: Schema.Types.ObjectId,
        ref: "Employee"
    }
})

export default model('Programmer', programmerSchema)