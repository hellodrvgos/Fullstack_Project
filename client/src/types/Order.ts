import { Product } from "./Product";

export type Order = {
    _id: string;
    contactInfo: {
        country: string,
        city: string,
        address: string
    };
    products: Product[];
    orderCreated: string;
}