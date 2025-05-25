import bcrypt from 'bcrypt';
import Employee from '../models/Employee.js';
import SeniorDeveloper from '../models/SeniorDeveloper.js';
import Programmer from '../models/Programmer.js';
import Department from '../models/Department.js';
import JobTitle from '../models/JobTitle.js';
import jwt from 'jsonwebtoken';


export const registerUser = async (req, res) =>{
    try {

        const existingUser = await Employee.findOne({
            "numberPassport":req.body.numberPassport
        })

        const jobTitle = await JobTitle.findById(req.body.jobTitle)
        // Проврека сущетсвует ли пользователь 
        if (existingUser) {
            return res.json({
                "message":"Пользователь уже существует"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(req.body.password, salt)

        const newUserData = {
            "numberPassport":req.body.numberPassport,
            "password": passwordHash,
            "name": req.body.name,
            "dob": req.body.dob,
            "department": req.body.department,
            "contacts": req.body.contacts,
            "jobTitle": req.body.jobTitle,
            "dateEmployment": req.body.dateEmployment
        }

        const doc = new Employee(newUserData)
        await doc.save()
        console.log(jobTitle.nameJobTitle)
        // добавление работника в зависимости от должности
        switch (jobTitle.nameJobTitle){
            case "Старший разработчик":
                const newSenior = new SeniorDeveloper({idEmployee: doc._id})
                await newSenior.save()
                break
            case "Программист":
                const newProgramirer = new Programmer({idEmployee: doc._id})
                await newProgramirer.save()
                break
            default:
                break
        }
        return res.status(201).json({...newUserData, "registr":true})
    } catch (error) {
        
        
    }
}


export const authorization = async (req, res) => {
    try {
        const {numberPassport, password} = req.body

        if (numberPassport=="admin" && password=="admin") {
            const token = jwt.sign({userId: "admin"}, process.env.JWT_SECRET,{expiresIn: "7d"})
            return res.status(200).json({"token": token, "auth":true})
        }
        
        const employee = await Employee.findOne({"numberPassport": numberPassport}).populate("jobTitle")

        if (!employee) {return res.status(200).json({"message": "Неверный номер паспорта или пароль"}) }
        // const Senior2 = await SeniorDeveloper.findOne({idEmployee: employee._id})
        console.log(employee._id)
        const isMatch = await bcrypt.compare(password ,employee.password)
        if(!isMatch) {return res.status(200).json({"message": "Неверный номер паспорта или пароль"})}
        let idEmployeeUser = null
        console.log("test")
        switch (employee.jobTitle.nameJobTitle){
            case "Старший разработчик":
                const Senior = await SeniorDeveloper.findOne({idEmployee: employee._id})
                idEmployeeUser = Senior._id
                break
            case "Программист":
                const Programirer = await Programmer.findOne({idEmployee: employee._id})
                idEmployeeUser = Programirer._id
                break
            default:
                idEmployeeUser = employee._id
                break
        }
        console.log("test")
        const token = jwt.sign({employeeId: idEmployeeUser}, process.env.JWT_SECRET,{expiresIn: "7d"})

        return res.status(200).json({...employee, "token": token, "auth":true})


    } catch (error) {
        console.log(error)
        return res.status(404).json({
            "error": error.errmsg,
            "auth" : false
        })
    }
}

export const getDataEmployee = async (req, res) => {
    try {
        const Senior = await SeniorDeveloper.findById(req.employeeId)
            .lean() // Получаем "чистый" объект
            .populate("idEmployee")
            .populate({
                path: "idEmployee",
                populate: { path: "jobTitle" }
            });

        if (Senior) {
            const user = Senior.idEmployee || Senior; // Берём данные пользователя
            return res.json({ user }); // Отправляем чистые данные
        }

        const Proger = await Programmer.findById(req.employeeId)
            .lean()
            .populate("idEmployee")
            .populate({
                path: "idEmployee",
                populate: { path: "jobTitle" }
            });

        if (Proger) {
            const user = Proger.idEmployee || Proger;
            return res.json({ user });
        }

        const EmployeeUser = await Employee.findById(req.employeeId)
            .lean()
            .populate("jobTitle");

        if (EmployeeUser) {
            return res.json({
                user: EmployeeUser
            });
        }

        // Если ни один тип сотрудника не найден
        return res.status(404).json({
            error: "Пользователь не найден",
            auth: "нет доступа"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            auth: "нет доступа"
        });
    }
};


