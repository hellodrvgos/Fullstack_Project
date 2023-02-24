import Product, { ProductDocument } from "../models/Product";

const createProduct = async (
    product: ProductDocument
): Promise<ProductDocument> => {
    return product.save();
}

const getAllProducts = async (): Promise<ProductDocument[]> => {
    return Product.find();
}

export default { createProduct, getAllProducts };