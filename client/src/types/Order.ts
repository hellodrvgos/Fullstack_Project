export type Order = {
    _id: string;
    cart: [];
    orderCreated: string;
}

export type ProductOrdered = {
    productId: {
        name: string,
        price: number
    },
    userQuantity: number,
    _id: string
}