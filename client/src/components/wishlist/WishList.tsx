import { useSelector} from "react-redux";

import { RootState } from "../../redux/store";
import WishListItem from "./WishListItem";

export default function WishList() {

    const wishList = useSelector((state: RootState) => state.wishlist.wishList);

    return <div>
        <p><strong>WishList</strong></p>
        {
            wishList.map((product, index) => {
                return <WishListItem key={index} product={product}/>
            })
        }
    </div>
}