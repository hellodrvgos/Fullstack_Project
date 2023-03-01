import { Request, Response } from "express";

import Product from "../models/Product";
import ProductServices from "../services/products";

export const createProductController = async (
    req: Request,
    res: Response
) => {
    try {
        const { name, category, price, description, quantity, image } =  req.body;

        const newProduct = new Product({
            name: name,
            category: category,
            price: price,
            description: description,
            quantity: quantity,
            image: image,
        });
        const product = await ProductServices.createProduct(newProduct);
        res.json(product);
    } catch (error) {
        console.log(error);
    }
}

export const getAllProductsController = async (
    req: Request, 
    res: Response
) => {
    try {
        const productList = await ProductServices.getAllProducts();
        res.json(productList);
    } catch (error) {
        console.log(error);
    }
};

export const updateProductQuantityController = async (
    req: Request,
    res: Response
) => {
    try {
        const updatedQuantity = await ProductServices.updateQuantityById(req.params.id, req.body);
        res.json(updatedQuantity);
    } catch (error) {
        console.log(error);
    }
}