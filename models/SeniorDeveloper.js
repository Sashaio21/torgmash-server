import { Schema, model } from "mongoose";

const seniorDeveloperSchema = new Schema({
    idEmployee: {
        type: Schema.Types.ObjectId,
        ref: "Employee"
    }
})

export default model('SeniorDeveloper', seniorDeveloperSchema)