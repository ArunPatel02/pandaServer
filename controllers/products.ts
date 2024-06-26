import { Request, Response } from 'express';
import { SecureRequest } from '../middelware/index.js';
import Product from '../database/models/project.js';
import mongoose from 'mongoose';

export const getProducts = async (req: SecureRequest, res: Response) => {
    try {
        const id = req.user?.id
        console.log('get products')
        const products = await Product.find({ addedBy: id })
        res.status(200).json({
            success: true,
            message: "Products Fetched Successfully",
            body: {
                productsData: products
            }
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something Went Wrong",
        })
    }
}

interface Product {
    productsData: {
        name: string,
        quantity: number,
        discription: string,
    }[]
}

export const createProducts = async (req: SecureRequest, res: Response) => {
    try {
        const { productsData }: Product = req.body
        const id = req.user?.id
        const data = productsData.map((item) => ({ ...item, addedBy: id }))
        const productsCreated = await Product.insertMany(data)
        res.status(200).json({
            success: true,
            message: "Products Added Successfully",
            body: {
                productsData: productsCreated
            }
        })
    } catch (error) {
        console.log("error" , error)
        res.status(400).json({
            success: false,
            message: "Something Went Wrong",
        })
    }
}

export const updateProducts = async (req: SecureRequest, res: Response) => {
    try {
        const { productId, ...data }: {
            productId: string, name?: string, quantity?: number,
            discription?: string,
        } = req.body
        const userId = req.user?.id
        const updateProduct = await Product.findOneAndUpdate({ _id: productId, addedBy: userId }, { ...data })
        if (updateProduct) {
            res.status(200).json({
                success: true,
                message: "Product Updated Successfully",
                body: {
                    productData: updateProduct
                }
            })
        } else {
            res.status(400).json({
                success: false,
                message: "Something Went Wrong",
            })
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something Went Wrong",
        })
    }
}

export const deleteProducts = async (req: SecureRequest, res: Response) => {
    try {
        const id = req.user?.id
        const productId = req.params.id
        const deletedProduct = await Product.findByIdAndDelete({ addedBy: id, _id: new mongoose.Types.ObjectId(productId) })
        res.status(200).json({
            success: true,
            message: "Product Deleted Successfully",
            body: {
                productData: deletedProduct
            }
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something Went Wrong",
        })
    }
}