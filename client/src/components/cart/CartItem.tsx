import { Product } from "../../types/Product";

export default function CartItem({product}: {product: Product}) {
    return <div>
        <p>This is CartItem</p>
        <p>{product.name}</p>
    </div>
}