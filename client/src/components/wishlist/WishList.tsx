import { RootState } from "../../redux/store";
import { useSelector} from "react-redux";
import WishListItem from "./WishListItem";
import NavBarAccount from "../../components/navBar/NavBarAccount";

export default function WishList() {

    const wishList = useSelector((state: RootState) => state.wishlist.wishList);

    return <div>
        <NavBarAccount/>
        <p><strong>WishList</strong></p>
        {
            wishList.map((product, index) => {
                return <WishListItem key={index} product={product}/>
            })
        }
    </div>
}