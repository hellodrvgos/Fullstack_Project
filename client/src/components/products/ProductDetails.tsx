import { useState } from "react";
import { useDispatch } from "react-redux";

import { cartActions } from "../../redux/slices/cart";
import { wishActions } from "../../redux/slices/wishlist";
import { AppDispatch } from "../../redux/store";
import { Product } from "../../types/Product";

export default function ProductDetails({product}: {product: Product}) {

    const dispatch = useDispatch<AppDispatch>();

    const [isShown, setIsShown] = useState(false);

    const [userQuantity, setUserQuantity] = useState("");
    
    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (Number(event.target.value) > product.quantity) {
            alert(`We only have ${product.quantity} items. Please order less!`);
            setIsShown(false);
            return;
        }
        setUserQuantity(event.target.value);
        setIsShown(true);
    }

    return <div>
        <p>ProductDetails</p>
        {/* <p>Name: {product.name}</p> */}
        <p>Category: {product.category}</p>
        <p>Price: {product.price}</p>
        <p>Description: {product.description}</p>
        <p>Image: {product.image}</p>
        <p>Quantity: {product.quantity}</p>
        <input type="text" placeholder="quantity" onChange={onChangeHandler}/>
        {
            isShown && <button onClick={() => {dispatch(cartActions.addToCart({
                _id: product._id,
                name: product.name,
                category: product.category,
                price: product.price,
                description: product.description,
                image: product.image,
                quantity: product.quantity,
                userQuantity: Number(userQuantity)
            }))}}>Add To Cart</button>
        }
        <button onClick={() => {dispatch(wishActions.addToWishList(product))}}>Add To Wishlist</button>
    </div>
}