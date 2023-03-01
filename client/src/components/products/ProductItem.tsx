import { useState } from "react";

import ProductDetails from "./ProductDetails";
import { Product } from "../../types/Product";

export default function ProductItem({product}: {product: Product}) {

    const [isShown, setIsShown] = useState(false);

    function handleClick() {
        setIsShown(current => !current);
      };

    return <div>
        <p>ProductItem</p>
        <p>Name: {product.name}</p>
        <button onClick={handleClick}>More Details</button>
        {
            isShown && <ProductDetails product={product}/>
        }
    </div>
}