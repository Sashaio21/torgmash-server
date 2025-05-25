import Application from "../models/Application.js"
import Employee from '../models/Employee.js';
import SeniorDeveloper from "../models/SeniorDeveloper.js";

// Получить все заявки для одного сотрудника
export const getAllApplicationsEmployee = async (req,res)=>{
    try {
        console.log(req.employeeId)
        const senior = await SeniorDeveloper.findById(req.employeeId)
        let allApplications = []
        if (senior) {
            allApplications = await Application.find()
        } else {
            allApplications = await Application.find({"applicant": req.employeeId})
        }
        // console.log(user.jobTitle.nameJobTitle)
        return res.status(200).json({
            "message" : "success",
            "applications": allApplications
        })
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            "error": error.errmsg,
            "message": "Ошибка получения заявок для сотрудника"
        })
    }
}

// Получить одну заявку
export const getOneApplication = async (req,res) => {
    try {
        const oneApplication = await Application.find({
            "_id": req.params.idApplication
        })
        
        return res.status(200).json({
            "message" : "success",
            "oneApplication": oneApplication
        })
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            "error": error.errmsg,
            "message": "Ошибка получения заявки"
        })
    }
}


// Отправить одну заявку
export const sendApplications = async (req,res)=>{
    try {
        console.log(req.employeeId)

        const dataApplications = {
            title: req.body.title,
            description: req.body.description,
            status: "Не просмотрено", 
            applicant: req.employeeId, // тот кто отправил заявку
            urgency: req.body.urgency,
            responsible: null, // ответственный за выполнение заявки
        }

        const doc = new Application(dataApplications)
        await doc.save()

        return res.status(200).json({
            "message" : "success",
            "employee": req.employeeId
        })
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            "error": error.errmsg,
            "message": "Ошибка отправки заявки"
        })
    }
}


// Изменить статус заявки
export const setStatusApplication = async (req,res) => {
    try {
        console.log("fsdfsdfsdfdsfdsf",req.body.responsible)
        let oneApplication = {}
        if (req.body.responsible) {
            oneApplication = await Application.findByIdAndUpdate({
                "_id": req.params.idApplication,
            },
            {
                "status": req.body.status,
                "responsible" : req.body.responsible
            }, 
            { new: true }   
            )
        } else {
            oneApplication = await Application.findByIdAndUpdate({
                "_id": req.params.idApplication
            },
            {"status": req.body.status}, 
            { new: true }   
            )
        }

        
        return res.status(200).json({
            "message" : "success",
            "oneApplication": oneApplication
        })
    } catch (error) {
        return res.status(404).json({
            "error": error.errmsg,
            "message": "Ошибка получения заявки"
        })
    }
}