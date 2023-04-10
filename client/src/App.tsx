import {Routes, Route} from "react-router-dom";

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import "./App.css";
import HomePage from "./pages/HomePage";
import OrderList from "./components/orders/OrderList";
import TopMenu from "./components/navigation/TopMenu";
import Footer from "./components/footer/Footer";
import UserInformation from "./components/users/UserInformation";

import { Typography } from "@mui/material";
import PaymentMethods from "./components/payment/PaymentMethods";
import Favorites from "./components/favorites/Favorites";

function App() {

  return <div className="App">
      <CssBaseline />
        <Box component={Paper} elevation={6} square sx={{display: { md: 'none', lg: "block" }}}>
        <TopMenu/>
        <Routes>
          <Route path="" element={<HomePage/>}></Route>
          <Route path="/orders" element={<OrderList/>}></Route>
          <Route path="/favorites" element={<Favorites/>}></Route>
          <Route path="/profile" element={<UserInformation/>}></Route>
          <Route path="/payments" element={<PaymentMethods/>}></Route>
        </Routes>
        <Footer/>
        </Box>
        <Box sx={{display: { xs: "flex", lg: "none" }, height: "50vh", justifyContent: "center", alignItems: "center", bgcolor: "white"}}>
          <Typography variant="h6" sx={{fontWeight: "normal"}}>Website is not optimized yet for mobile & tablet screen resolutions. <br/> Please view it on a resolution higher than 1200px.</Typography>
        </Box>
    </div>;
}

export default App;
