var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import Product from '../database/models/project.js';
import mongoose from 'mongoose';
export const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const products = yield Product.find({ addedBy: id });
        res.status(200).json({
            success: true,
            message: "Products Fetched Successfully",
            body: {
                productsData: products
            }
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Something Went Wrong",
        });
    }
});
export const createProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { productsData } = req.body;
        const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const data = productsData.map((item) => (Object.assign(Object.assign({}, item), { addedBy: id })));
        const productsCreated = yield Product.insertMany(data);
        res.status(200).json({
            success: true,
            message: "Products Added Successfully",
            body: {
                productsData: productsCreated
            }
        });
    }
    catch (error) {
        console.log("error", error);
        res.status(400).json({
            success: false,
            message: "Something Went Wrong",
        });
    }
});
export const updateProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const _b = req.body, { productId } = _b, data = __rest(_b, ["productId"]);
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const updateProduct = yield Product.findOneAndUpdate({ _id: productId, addedBy: userId }, Object.assign({}, data));
        if (updateProduct) {
            res.status(200).json({
                success: true,
                message: "Product Updated Successfully",
                body: {
                    productData: updateProduct
                }
            });
        }
        else {
            res.status(400).json({
                success: false,
                message: "Something Went Wrong",
            });
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Something Went Wrong",
        });
    }
});
export const deleteProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const productId = req.params.id;
        const deletedProduct = yield Product.findByIdAndDelete({ addedBy: id, _id: new mongoose.Types.ObjectId(productId) });
        res.status(200).json({
            success: true,
            message: "Product Deleted Successfully",
            body: {
                productData: deletedProduct
            }
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Something Went Wrong",
        });
    }
});
