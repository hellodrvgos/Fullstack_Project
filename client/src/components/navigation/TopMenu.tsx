import * as React from 'react';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector} from "react-redux";
import { Link } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PetsIcon from '@mui/icons-material/Pets';
import PersonIcon from '@mui/icons-material/Person';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import { Divider } from '@mui/material';

import { AppDispatch } from "../../redux/store"
import { RootState } from "../../redux/store";
import { getUserInformation } from "../../redux/thunks/user";
import LoginRegisterTabs from '../users/LoginRegisterTabs';
import CartList from '../cart/CartList';
import DashboardMenu from "./DashboardMenu";
import CheckoutUserInformation from '../checkout/CheckoutUserInformation';
import CheckoutPayment from '../checkout/CheckoutPayment';

export default function TopMenu() {

const cartList = useSelector((state: RootState) => state.cartlist.cartList);

const [stateAccountDrawer, setStateAccountDrawer] = React.useState(false);

const toggleAccountDrawer = (open: boolean) => (event: React.MouseEvent) => {
    if (event.type === 'keydown') {
      return;
    }
    setStateAccountDrawer(open);
  };

const [stateCartDrawer, setStateCartDrawer] = React.useState(false);

const toggleCartDrawer = (open: boolean) => (event: React.MouseEvent) => {
  if (event.type === 'keydown') {
    return;
  }
  setStateCartDrawer(open);
};

const [cartSideWidth, setCartSideWidth] = useState("400px");

const [checkoutInfo, setCheckoutInfo] = useState(false);

const [payementInfo, setPayementInfo] = useState(false);

function checkoutSide(width: string) {
  setCartSideWidth(width);
  setCheckoutInfo(true);
}

function paymentSide(width: string) {
  setCartSideWidth(width);
  setPayementInfo(true);
}

const [loginState, setLoginState] = useState(false);

const tokenId = localStorage.getItem("token");

const userId = localStorage.getItem("id") || "{}";

const dispatch = useDispatch<AppDispatch>();

useEffect(() => {
    dispatch(getUserInformation(userId));
}, [dispatch, userId]);

  return (
    <AppBar position="fixed" sx={{backgroundColor: "black"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton component={Link} to="/">
          <PetsIcon sx={{  mr: 1, color: "white" }} />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component={Link} to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            BESTIES
          </Typography>

          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end"}}>
            <IconButton
              size="large"
              color="inherit"
              onClick={toggleCartDrawer(true)}
            >
              <Badge badgeContent={cartList.length} color="primary">
              <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              color="inherit"
              onClick={toggleAccountDrawer(true)}
            >
              <PersonIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      <Drawer
            anchor="right"
            open={stateAccountDrawer}
            onClose={toggleAccountDrawer(false)}
          >
          <Box
            sx={{ width: "400px" }}
            role="presentation"
          >
            {
          tokenId !== null ? <DashboardMenu setStateAccountDrawer={setStateAccountDrawer} setCheckoutInfo={setCheckoutInfo}/> : <LoginRegisterTabs setStateAccountDrawer={setStateAccountDrawer} setLoginState={setLoginState}/>
            }
          </Box>
      </Drawer>
      
      <Drawer
          anchor="right"
          open={stateCartDrawer}
          onClose={toggleCartDrawer(false)}
        >
        <Box
          sx={{ width: `${cartSideWidth}`, display: "flex", flexDirection: "row" }}
          role="presentation"
        >
          <CartList checkoutSide={checkoutSide} toggleCartDrawer={toggleCartDrawer}/>
          <Divider orientation='vertical'/>
          {
          (checkoutInfo && tokenId !== null || loginState) ? 
          <CheckoutUserInformation paymentSide={paymentSide}/> :
           (checkoutInfo && tokenId === null) ?
           <LoginRegisterTabs setStateAccountDrawer={setStateAccountDrawer} setLoginState={setLoginState}/> :
           null
          }
          <Divider orientation='vertical'/>
          {
            payementInfo ? <CheckoutPayment setStateCartDrawer={setStateCartDrawer} setCartSideWidth={setCartSideWidth} setCheckoutInfo={setCheckoutInfo} setPayementInfo={setPayementInfo}/> : null
          }
        </Box>
      </Drawer>
    </AppBar>
  );
}