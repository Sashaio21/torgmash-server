import { Schema, model } from "mongoose";

const employeeShema = new Schema({
    numberPassport:{
        type:String,
        unique: true
    },
    password: String,
    name: String,
    dob: Date,
    department: Schema.Types.ObjectId,
    contacts: Number,
    jobTitle: {
        type: Schema.Types.ObjectId,
        ref: "JobTitle"
    },
    dateEmployment: Date
})
export default model('Employee', employeeShema)