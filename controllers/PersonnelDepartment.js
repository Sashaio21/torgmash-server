import Department from '../models/Department.js';
import JobTitle from '../models/JobTitle.js';



export const addDepartament = async (req,res) => {
    try {
        const newDepartament = new Department({
            "nameDepartment" : req.body.nameDepartment
        })

        await newDepartament.save()

        return res.json({
            "message" : "success",
            "departament" : newDepartament
        })
    } catch (error) {
        return res.status(404).json({
            "error": error.errmsg
        })
    }
}

export const addJobTitle = async (req,res) => {
    try {
        const newJobTitle = new JobTitle({
            "nameJobTitle" : req.body.nameJobTitle,
            "department" : req.body.department
        })

        await newJobTitle.save()

        return res.json({
            "message" : "success",
            "job title" : newJobTitle
        })
    } catch (error) {
        return res.status(404).json({
            "error": error.errmsg
        })
    }
}


export const getAllDepartemnt = async (req,res) =>{
    try {
        const departments = await Department.find()

        return res.json({
            "message" : "success",
            "departments" : departments
        })
    } catch (error) {
        return res.status(404).json({
            "error": error.errmsg
        })
    }
}

export const getDepartmentPositions = async (req,res) =>{
    try {
        const departments = await JobTitle.find({
            department: req.params.idDepartament
        })

        
        return res.json({
            "message" : "success",
            "departments" : departments
        })
    } catch (error) {
        return res.status(404).json({
            "error": error.errmsg
        })
    }
}