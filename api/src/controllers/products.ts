import { Request, Response } from "express";

import Product from "../models/Product";
import ProductServices from "../services/products";

export const createProductController = async (
    req: Request,
    res: Response
) => {
    try {
        const { pet, name, category, brand, price, description, image, rating, quantity  } =  req.body;

        const newProduct = new Product({
            pet: pet,
            name: name,
            category: category,
            brand: brand,
            price: price,
            description: description,
            image: image,
            rating: rating,
            quantity: quantity
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