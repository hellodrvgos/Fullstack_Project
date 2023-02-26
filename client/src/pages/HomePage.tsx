import Order from "../components/orders/Order";
import ProductList from "../components/products/ProductList";
import WishList from "../components/wishlist/WishList";

export default function HomePage() {

  return <div>
    <p><strong>THIS IS HOMEPAGE</strong></p>
    <ProductList/>
    <WishList/>
    <Order/>
  </div>
}