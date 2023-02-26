import { RootState } from "../../redux/store";
import { useSelector} from "react-redux";
import WishListItem from "./WishListItem";

export default function WishList() {

    const wishList = useSelector((state: RootState) => state.wishlist.wishList);

    return <div>
        <p><strong>THIS IS WISHLIST</strong></p>
        {
            wishList.map((product, index) => {
                return <WishListItem key={index} product={product}/>
            })
        }
    </div>
}