import { useState } from "react";

import ProductDetails from "./ProductDetails";
import { Product } from "../../types/Product";

export default function ProductItem({product}: {product: Product}) {

    const [isShown, setIsShown] = useState(false);

    function handleClick() {
        setIsShown(current => !current);
      };

    return <div>
        This is ProductItem
        <p>Name: {product.name}</p>
        <p>Price: {product.price}</p>
        <p>Image: {product.image}</p>
        <button onClick={handleClick}>More Details</button>
        {
            isShown && <ProductDetails product={product}/>
        }
    </div>
}