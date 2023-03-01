import Product, { ProductDocument } from "../models/Product";

const createProduct = async (
    product: ProductDocument
): Promise<ProductDocument> => {
    return product.save();
}

const getAllProducts = async (): Promise<ProductDocument[]> => {
    return Product.find();
}

const updateQuantityById = async (
    productId: string, update: Partial<ProductDocument>
): Promise<ProductDocument | null> => {
    return Product.findByIdAndUpdate(productId, update, {new: true});
}

export default { createProduct, getAllProducts, updateQuantityById };