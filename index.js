import express from 'express';
import dotenv  from 'dotenv';
import testController from './controllers/test.js';
import {registerUser, authorization, getDataEmployee} from './controllers/userControlers.js';
import {checkAuthorization} from './utilites/checkAuth.js';
import { sendApplications, getAllApplicationsEmployee, getOneApplication, setStatusApplication } from './controllers/applicationControlers.js';
import { getAllApplicationsSenior, getAllProgrammer, takeApplication,getActiveApplication, addTask, patchTask, deleteTask } from './controllers/senoirDeveloperControler.js';
import { addDepartament, addJobTitle } from './controllers/PersonnelDepartment.js';
import { addUpdate, addNewFunction } from './controllers/senoirDeveloperControler.js';
import { getAllDepartemnt, getDepartmentPositions } from './controllers/PersonnelDepartment.js';
import dbMongo from './config/db.js';
import { getOneUpdate } from './controllers/senoirDeveloperControler.js';
import { getOneFunction } from './controllers/senoirDeveloperControler.js';
import { getNewFunction } from './controllers/senoirDeveloperControler.js';
import { getAllUpdate } from './controllers/senoirDeveloperControler.js';
import cors from 'cors';
import { getAllTasksForSenior, getAllTasksForProgrammer } from './controllers/senoirDeveloperControler.js';

const app = express()
app.use(express.json());
dotenv.config()


app.use(cors());  

app.post( '/test',(req,res)=>{
    const dataUser = req.body
    return res.status(200).json({
        "message":"success",
        "dataUser":dataUser
    })
})
//-------------------------------------отдел кадров----------------------------------------------------------------------
//Добавить отдел
app.post('/personnel/add/departament', addDepartament)
//Добавить должность
app.post('/personnel/add/jobtitle', addJobTitle)

//Получить все отделы
app.get('/personnel/all/departaments', getAllDepartemnt)
//Получить все должности отдела
app.get('/personnel/all/jobtitle/:idDepartament', getDepartmentPositions)

//-------------------------------------Работа с пользователями-----------------------------------------------------------------------------
// Авторизация
app.post('/user/login', authorization)
// Регистрация (только актёр "Отдел кадров")
app.post('/user/registry',registerUser)
// Проеврка пользователя
app.get('/user/auth/me',checkAuthorization, getDataEmployee)

//-------------------------------------Общие для всех-----------------------------------------------------------------------------




//--------------------------------Сотрудник "Торгмаш"----------------------------------------------------------------------------------
// Получить все заявки для сотрудника
app.get('/employee/application/all',checkAuthorization, getAllApplicationsEmployee)

// Получить одну заявку
app.get('/employee/application/one/:idApplication', checkAuthorization, getOneApplication)

// Изменить заявку 
app.patch('/employee/application/one/:idApplication')

// Удалить заявку
app.delete('/employee/application/one/:idApplication')

//Подать заявку
app.post('/employee/send',checkAuthorization ,sendApplications)

//-----------------------------------Старший разработчик-------------------------------------------------------------------------------
// Получить все заявки для старшего разработчика
app.get('/senior/developer/application/all', getAllApplicationsSenior)

// Получить все активные заявки
app.get('/senior/developer/application/active', checkAuthorization, getActiveApplication)

// Получить одну заявку
app.get('/senior/developer/application/one/:idApplication', checkAuthorization, getOneApplication)

app.patch('/senior/developer/application/status/:idApplication', checkAuthorization, setStatusApplication)


// Перейти к выполнению заявки ( назначен ответсенный )
app.patch('/senior/developer/application/take/:idApplication', checkAuthorization, takeApplication)


// Получить всех программистов
app.get('/senior/developer/programmer', getAllProgrammer)

// Добавить задачу заявки
app.post('/senior/developer/task/:idApplication', checkAuthorization, addTask)

// Добавить задачу заявки
app.post('/senior/developer/all/task', checkAuthorization, getAllTasksForSenior)


// Получить все задачи для программиста
app.get('/senior/programmer/all/task', checkAuthorization, getAllTasksForProgrammer)

// Удалить задачу заявки
app.delete('/senior/developer/task/:idTask',checkAuthorization,deleteTask)

// Добавление обновления
app.post("/senior/developer/add/update", checkAuthorization, addUpdate)

// отображение обновлений
app.post("/senior/developer/get/update", checkAuthorization, getAllUpdate)

// Получить одно обновление
app.post("/senior/developer/get/one/update", checkAuthorization, getOneUpdate)



// Добавление новой функции
app.post("/senior/developer/add/function", checkAuthorization, addNewFunction)

// Поулчить все новые функции
app.get("/senior/developer/get/function", checkAuthorization, getNewFunction)

// Поулчить одну новую функции
app.get("/senior/developer/get/function/:idFunction", checkAuthorization, getOneFunction)


// !!!!!!!!!!!!!Потом сделать
/* Изменить задачу заявки
app.patch('/senior/developer/task/:idApplication',checkAuthorization,patchTask)

// Перейти к выполнению заявки (назначить испольнителя)
app.patch('/senior/developer/application/execute/:idApplication', checkAuthorization, )
*/


//-----------------------------------Программист-------------------------------------------------------------------------------
// Получить все активные задачи
app.get('/programmer/task/all')

// Выполнить задачу
app.patch('/programmer/task/execute')



app.listen(process.env.PORT,(err)=>{
    if(err){
        return console.log(`Произошла ошибка ${err}`)
    }
    console.log(`Сервер запустился на порту ${process.env.PORT}`)
})  