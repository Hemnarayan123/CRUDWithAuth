import express from 'express'


const router = express.Router();
import { userLogin, userRegister } from '../controllers/user.controllers.js';

router.post("/register", userRegister)
router.post("/login", userLogin)

//.........................................................................................................

const todo = express.Router();
import {addTodo} from '../controllers/todo.controllers.js';


todo.post('/add-todos', addTodo);


export {router, todo}