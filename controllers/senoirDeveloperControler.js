import Application from "../models/Application.js"
import Programmer from "../models/Programmer.js"
import Task from "../models/Task.js"
import Update from "../models/Update.js"
import NewFunction from "../models/NewFunction.js"


export const getAllProgrammer = async (req,res) => {
    try {
        const allProgrammer = await Programmer.find().populate("idEmployee")
        return res.status(200).json({
            "message" : "success",
            "allProgrammer": allProgrammer
        })
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            "error": error.errmsg,
            "message": "Ошибка получения списка программистов"
        })
    }
} 

export const getActiveApplication = async (req,res)=>{
    try {
        const allActiveApplication = await Application.find({
            "responsible": req.employeeId
        })

        return res.status(200).json({
            "message" : "success",
            "allActiveApplication": allActiveApplication
        })
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            "error": error.errmsg,
            "message": "Ошибка получения активных заявок"
        })
    }
}

export const getAllApplicationsSenior = async (req,res)=>{
    try {
        const allApplications = await Application.find()
        
        return res.status(200).json({
            "message" : "success",
            "applications": allApplications
        })
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            "error": error.errmsg,
            "message": "Ошибка получения заявок для старшего разработчика"
        })
    }
}

export const takeApplication = async (req, res)=>{
    try {
        const updateApplication = await Application.findOneAndUpdate(
            {
                "_id" : req.params.idApplication
            },
            {
                "status" : "Выполняется",
                "responsible" : req.employeeId
            },
            {
                "new": true
            }
        )

        return res.status(200).json({
            "message" : "success",
            "updateApplication" : updateApplication
        })
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            "error": error.errmsg,
            "message": "Ошибка взятия заявки"
        })
    }
}
 

export const addTask = async (req,res) => {
    try {
        const newTask = {
            titleTask: req.body.titleTask,
            descriptionTask: req.body.descriptionTask,
            statusTask: "Не просмотрено",
            executor: req.body.executor, // тот кто выполняет задачу 
            responsible: req.employeeId, // ответственный за выполнение заявки
            aplication: req.params.idApplication, // заявка/функция, к которой относиться задача
            deadline: req.body.deadline,
        }

        const doc = new Task(newTask)
        await doc.save()

        return res.status(200).json({
            "message" : "success",
            "newTask" : doc
        })
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            "error": error.errmsg,
            "message": "Ошибка добавления задачи"
        })
    }
}

export const patchTask = async (req,res) => {
    try {
        
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            "error": error.errmsg,
            "message": "Ошибка изменения задачи"
        })
    }
}

export const deleteTask = async (req,res) => {
    try {
        const deleteOneTask = await Task.findOneAndDelete({
            "_id" : req.params.idTask
        })

        return res.status(200).json({
            "message" : "success",
            "deleteTask" : deleteOneTask
        })
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            "error": error.errmsg,
            "message": "Ошибка удаления задачи"
        })
    }
} 



export const getAllTasksForSenior = async (req, res) => {
    try {
        const allTasks = await Task.find({
            "responsible" : req.employeeId,
            "aplication" : req.body.aplication
        })

        console.log(allTasks)

        return res.status(200).json({
            "message" : "success",
            "allTasks" : allTasks
        })
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            "error": error.errmsg,
            "message": "Ошибка удаления задачи"
        })
    }
}



export const getAllTasksForProgrammer = async (req, res) => {
    try {
        console.log(req.employeeId)

        const programmer = await Programmer.findById(req.employeeId)
        console.log(programmer.idEmployee)
        const allTasks = await Task.find({
            "executor" : programmer.idEmployee
        })

        console.log(allTasks)

        return res.status(200).json({
            "message" : "success",
            "allTasks" : allTasks
        })
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            "error": error.errmsg,
            "message": "Ошибка удаления задачи"
        })
    }
}




export const addUpdate = async (req,res) => {
    try {
        const newUpdate = {
            title: req.body.title,
            description: req.body.description,
            responsible: req.employeeId, // ответственный за выполнение заявки
            application: req.body.application
        }

        const doc = new Update(newUpdate)
        await doc.save()

        return res.status(200).json({
            "message" : "success",
            "newTask" : doc
        })
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            "error": error.errmsg,
            "message": "Ошибка добавления задачи"
        })
    }
}


export const addNewFunction = async (req,res) => {
    try {
        const NewFunctionData = {
            title: req.body.title,
            description: req.body.description,
            responsible: req.employeeId,
            status: "Активно"
        }

        const doc = new NewFunction(NewFunctionData)
        await doc.save()

        return res.status(200).json({
            "message" : "success", 
            "newTask" : doc
        })
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            "error": error.errmsg,
            "message": "Ошибка добавления задачи"
        })
    }
}


export const getNewFunction = async (req,res) => {
    try {
        const allNewFunction = await NewFunction.find({
            responsible: req.employeeId
        })
        


        return res.status(200).json({
            "message" : "success", 
            "allFunction" : allNewFunction
        })
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            "error": error.errmsg,
            "message": "Ошибка добавления задачи"
        })
    }
}


export const getOneFunction = async (req,res) => {
    try {
        const oneFunction = await NewFunction.find({
            "_id": req.params.idFunction
        })
        
        return res.status(200).json({
            "message" : "success",
            "oneFunction": oneFunction
        })
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            "error": error.errmsg,
            "message": "Ошибка получения заявки"
        })
    }
}

export const getAllUpdate = async (req,res) => {
    try {
        let allUpdates = []
        if (req.body.developer) {
            allUpdates = await Update.find({
                responsible: req.employeeId
            })
        } else {
            allUpdates = await Update.find()
        }

        return res.status(200).json({
            "message" : "success",
            "allProgrammer": allUpdates
        })
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            "error": error.errmsg,
            "message": "Ошибка получения списка программистов"
        })
    }
} 


export const getOneUpdate = async (req,res) => {
    try {
        let allUpdates = []
        if (req.body.developer) {
            allUpdates = await Update.find({
                application: req.body.application
            })
        } else {
            allUpdates = await Update.find()
        }

        return res.status(200).json({
            "message" : "success",
            "allProgrammer": allUpdates
        })
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            "error": error.errmsg,
            "message": "Ошибка получения списка программистов"
        })
    }
} 

// Назначение исполнителя
// export const executeAppliaction = async (req,res) => {
//     try {
//         const updateApplication = await Application.findOneAndUpdate(
//             {
//                 "_id" : req.params.idApplication
//             },
//             {
//                 "status" : "Назначен исполнитель",

//             },
//             {
//                 "new": true
//             }
//         )

//         return res.status(200).json({
//             "message" : "success",
//             "updateApplication" : updateApplication
//         })
//     } catch (error) {
//         console.log(error)
//         return res.status(404).json({
//             "error": error.errmsg,
//             "message": "Ошибка назначения исполнителя"
//         })
//     }
// }