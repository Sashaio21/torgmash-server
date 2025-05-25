import { Schema, model } from "mongoose";

const departmentSchema = new Schema({
    nameDepartment: {
        type: String,
        unique: true
    }
})

export default model("Department", departmentSchema)