import {Routes, Route} from "react-router-dom";

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import "./App.css";
import HomePage from "./pages/HomePage";
import Products from "./pages/Products";
import OrderList from "./components/orders/OrderList";
import TopMenu from "./components/navigation/TopMenu";
import Footer from "./components/footer/Footer";
import UserInformation from "./components/users/UserInformation";

function App() {

  return <div className="App">
      <CssBaseline />
      {/* <Container maxWidth="xl"> */}
        <Box component={Paper} elevation={6} square>
        <TopMenu/>
        <Routes>
          <Route path="" element={<HomePage/>}></Route>
          <Route path="/products" element={<Products/>}></Route>
          <Route path="/orders" element={<OrderList/>}></Route>
          <Route path="/profile" element={<UserInformation/>}>
          </Route>
        </Routes>
        <Footer/>
        </Box>
      {/* </Container> */}
    </div>;
}

export default App;
