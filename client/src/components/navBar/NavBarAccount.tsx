import { Link } from "react-router-dom"

export default function NavBarAccount() {
    return (
        <div>
            <p><strong>ACCOUNT</strong></p>
            <Link to="/account/checkout">Checkout</Link><span> | </span>
            <Link to="/account/orders">OrdersList</Link><span> | </span>
            <Link to="/account/wishlist">WishList</Link>
        </div>
    )
}