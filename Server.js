import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoutes from "./Routes/userRoutes.js"

dotenv.config();

const app = express()

app.use(cors())
app.use(express.json())

app.use("/",userRoutes)

app.listen(5000 , () => console.log("App is listening on PORT 5000"))

mongoose.connect(process.env.CONNECTION_URL)
mongoose.set('strictQuery', true);
const db = mongoose.connection
db.on("error",(err)=>console.log(err))
db.once("open",()=>console.log("Connected To Db"))

