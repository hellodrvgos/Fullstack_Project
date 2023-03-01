import {Routes, Route} from "react-router-dom";

import "./App.css";
import CartList from "./components/cart/CartList";
import NavBar from "./components/navBar/NavBar";
import Checkout from "./components/checkout/Checkout";
import ProductList from "./components/products/ProductList";
import UserInformation from "./components/users/UserInformation";
import UserLogIn from "./components/users/UserLogIn";
import UserRegister from "./components/users/UserRegister";
import WishList from "./components/wishlist/WishList";
import HomePage from "./pages/HomePage";
import OrderList from "./components/orders/OrderList";
import Account from "./pages/Accounts";

function App() {

  return <div className="App">
          App here
          <NavBar/>
          <Routes>
            <Route path="" element={<HomePage/>}></Route>
            <Route path="/products" element={<ProductList/>}></Route>
            <Route path="/account/wishlist" element={<WishList/>}></Route>
            <Route path="/register" element={<UserRegister/>}></Route>
            <Route path="/login" element={<UserLogIn/>}></Route>
            <Route path="/account" element={<Account/>}></Route>
            <Route path="/account/checkout" element={<Checkout/>}></Route>
            <Route path="/account/orders" element={<OrderList/>}></Route>
          </Routes>
    </div>;
}

export default App;
