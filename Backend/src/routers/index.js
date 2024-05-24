import express from 'express'


const router = express.Router();
import { userLogin, userRegister } from '../controllers/user.controllers.js';

router.post("/register", userRegister)
router.post("/login", userLogin)

//.........................................................................................................

const todo = express.Router();
import {addTodo,updateTodo, deleteTodo, getTodos} from '../controllers/todo.controllers.js';


todo.post('/add-todos', addTodo);
todo.put('/update-todos/:id', updateTodo);
todo.delete('/delete-todos/:id', deleteTodo);
todo.get('/get-todos/:id', getTodos);


export {router, todo}