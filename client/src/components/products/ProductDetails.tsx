import { useDispatch } from "react-redux";

import { cartActions } from "../../redux/slices/cart";
import { wishActions } from "../../redux/slices/wishlist";
import { AppDispatch } from "../../redux/store";
import { Product } from "../../types/Product";

export default function ProductDetails({product}: {product: Product}) {

    const dispatch = useDispatch<AppDispatch>();

    return <div>
        This is ProductDetails
        <p>Name: {product.name}</p>
        <p>Category: {product.category}</p>
        <p>Price: {product.price}</p>
        <p>Description: {product.description}</p>
        <p>Image: {product.image}</p>
        <input type="text" placeholder="quantity"/>
        <button onClick={() => {dispatch(cartActions.addToCart(product))}}>Add To Cart</button>
        <button onClick={() => {dispatch(wishActions.addToWishList(product))}}>Add To Wishlist</button>
    </div>
}