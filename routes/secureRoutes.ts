import { Router, Request, Response } from 'express';
import { createUser, getUser, logout } from '../controllers/index.js';
import { createProducts, deleteProducts, getProducts, updateProducts } from '../controllers/products.js';

const secuteRoute = Router()

secuteRoute.get("/getUser", getUser)
secuteRoute.get("/logout", logout)
secuteRoute.get("/products", getProducts)
secuteRoute.post("/createProducts", createProducts)
secuteRoute.put("/product", updateProducts)
secuteRoute.delete("/product/:id", deleteProducts)

export default secuteRoute