import CartList from "../cart/CartList";
import UserInformation from "../users/UserInformation";
import CheckoutContactInfo from "./CheckoutContactInfo";
import NavBarAccount from "../../components/navBar/NavBarAccount";

export default function Checkout() {

    return <div>
        <NavBarAccount/>
        <p><strong>CHECKOUT</strong></p>
        <CartList/>
        <UserInformation/>
        <CheckoutContactInfo/>
        <br/>
    </div>
}