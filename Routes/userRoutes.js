import express from "express"
import { registerUser , loginUser,updateProfile , forgotPassword,addTodo, removeTodo, deleteUser} from "../Controller/userController.js";

const routes = express.Router();

routes.post("/register",registerUser);
routes.post('/login',loginUser)
routes.patch('/update',updateProfile)
routes.post('/user',forgotPassword)
routes.post('/todo',addTodo)
routes.post('/remove',removeTodo)
routes.delete('/delete',deleteUser)

export default routes;