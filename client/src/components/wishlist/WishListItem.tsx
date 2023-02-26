import { Product } from "../../types/Product";

export default function WishListItem({product}: {product: Product}) {
    return <div>
        <p>This is WishListItem</p>
        <p>{product.name}</p>
    </div>
}