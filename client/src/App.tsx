import {Routes, Route} from "react-router-dom";

import "./App.css";
import Order from "./components/orders/Order";
import UserInformation from "./components/users/UserInformation";
import UserLogIn from "./components/users/UserLogIn";
import UserRegister from "./components/users/UserRegister";
import HomePage from "./pages/HomePage";

function App() {

  return <div className="App">
          App here
          <Routes>
            <Route path="" element={<HomePage/>}></Route>
            <Route path="/register" element={<UserRegister/>}></Route>
            <Route path="/login" element={<UserLogIn/>}></Route>
            <Route path="/account" element={<UserInformation/>}></Route>
            <Route path="/order" element={<Order/>}></Route>
          </Routes>
    </div>;
}

export default App;
