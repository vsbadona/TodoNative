import express from "express"
import { registerUser , loginUser,updateProfile,allTodo,forgotPassword,addTodo, removeTodo, deleteUser, getUser} from "../Controller/userController.js";

const routes = express.Router();

routes.post("/register",registerUser);
routes.post('/login',loginUser)
routes.patch('/update',updateProfile)
routes.post('/forgot',forgotPassword)
routes.post('/getuser',getUser)
routes.post('/todo',addTodo)
routes.post('/alltodo',allTodo)
routes.post('/remove',removeTodo)
routes.delete('/delete',deleteUser)

export default routes;