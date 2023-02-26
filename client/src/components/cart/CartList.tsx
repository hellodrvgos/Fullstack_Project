import { RootState } from "../../redux/store";
import { useSelector} from "react-redux";
import CartItem from "./CartItem";

export default function CartList() {

    const cartList = useSelector((state: RootState) => state.cartlist.cartList);

    return <div>
        <p><strong>This is CartList</strong></p>
        {
            cartList.map((product, index) => {
                return <CartItem key={index} product={product}/>
            })
        }
    </div>
}