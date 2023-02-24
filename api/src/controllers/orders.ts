import { Request, Response } from "express";
import Order from "../models/Order";

import OrderServices from "../services/orders";

export const createOrderController = async (
    req: Request,
    res: Response
) => {
    try {
        const { name, category, price, description, image, sku } =  req.body;

        const newOrder = new Order({
            userId: req.params.id,
            products: req.body.productList
        });
        const order = await OrderServices.createOrder(newOrder);
        res.json(order);
    } catch (error) {
        console.log(error);
    }
}

export const getAllOrdersByUserIdController = async (
    req: Request,
    res: Response
) => {
    try {
        const orderList = await OrderServices.getAllOrdersByUserId(req.params.id);
        res.json(orderList);
    } catch (error) {
        console.log(error);
    }
};