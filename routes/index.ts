import { Router, Request, Response } from 'express';
import { createUser, login } from '../controllers/index.js';

const route = Router()

route.post("/signup", createUser)

route.post("/login" , login)

export default route