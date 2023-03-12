import Order, { OrderDocument } from "../models/Order";

const createOrder = async (
    order: OrderDocument
): Promise<OrderDocument> => {
    return order.save();
}

const getAllOrdersByUserId = async (
    userIdRequest: string,
    ): Promise<OrderDocument[]> => {
    return Order.find({userId: userIdRequest}).populate("cart.productId");
}

export default { createOrder, getAllOrdersByUserId };