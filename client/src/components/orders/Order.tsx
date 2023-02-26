import CartList from "../cart/CartList";
import UserInformation from "../users/UserInformation";
import OrderContactInfo from "./OrderContactInfo";

export default function Order() {

    return <div>
        <p><strong>THIS IS ORDER</strong></p>
        <CartList/>
        <UserInformation/>
        <OrderContactInfo/>
        <br/>
    </div>
}