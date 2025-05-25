import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const dbMongo = mongoose.connect(process.env.CONNECTDB)
        .then(()=>console.log("Db ok"))
        .catch((err)=>{console.log(`error db ${err}`)})

export default dbMongo