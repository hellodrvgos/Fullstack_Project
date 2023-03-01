import { Link } from "react-router-dom"

export default function NavBar() {
  return <div>
    <br/>
    <Link to="/">Home</Link><span> | </span>
    <Link to="/products">Products</Link><span> | </span>
    {/* <Link to="/wishlist">WishList </Link> */}
    <Link to="/register">Register</Link><span> | </span>
    <Link to="/login">Login</Link><span> | </span>
    <Link to="/account">Account </Link>
    {/* <Link to="/cart">Cart </Link> */}
    {/* <Link to="/checkout">Checkout </Link> */}
    {/* <Link to="/orders">OrdersList </Link> */}
    </div>;
}
