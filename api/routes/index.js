import { Router } from 'express';
import { createUser } from '../controllers/index.js';
const route = Router();
route.post("/signup", createUser);
route.post("/login");
export default route;
