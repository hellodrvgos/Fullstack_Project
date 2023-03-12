import * as React from 'react';
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { useSelector} from "react-redux";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PetsIcon from '@mui/icons-material/Pets';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import { Divider } from '@mui/material';

import { AppDispatch } from "../../redux/store"
import { RootState } from "../../redux/store";
import { getUserInformation } from "../../redux/thunks/user";
import { productListActions } from "../../redux/slices/product";

import LoginRegisterTabs from '../users/LoginRegisterTabs';
import CartList from '../cart/CartList';

import DashboardMenu from "./DashboardMenu";
import CheckoutUserInformation from '../checkout/CheckoutUserInformation';

const pages = ['For Cats', 'For Dogs'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export default function TopMenu() {

const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
  setAnchorElNav(event.currentTarget);
};
const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
  setAnchorElUser(event.currentTarget);
};

const handleCloseNavMenu = () => {
  setAnchorElNav(null);
};

const handleCloseUserMenu = () => {
  setAnchorElUser(null);
};

const cartList = useSelector((state: RootState) => state.cartlist.cartList);

const [stateAccountDrawer, setStateAccountDrawer] = React.useState(false);

const [stateCartDrawer, setStateCartDrawer] = React.useState(false);

const toggleAccountDrawer = (open: boolean) => (event: React.MouseEvent) => {
    if (event.type === 'keydown') {
      return;
    }
    setStateAccountDrawer(open);
  };

const toggleCartDrawer = (open: boolean) => (event: React.MouseEvent) => {
  if (event.type === 'keydown') {
    return;
  }
  setStateCartDrawer(open);
};

const [cartSideWidth, setCartSideWidth] = useState("400px");

function checkoutSide(width: string) {
  setCartSideWidth(width);
}

const tokenId = localStorage.getItem("token") || "{}";

const userId = localStorage.getItem("id") || "{}";

const dispatch = useDispatch<AppDispatch>();

useEffect(() => {
    dispatch(getUserInformation(userId));
}, [dispatch, userId]);

const userInfoDetails = useSelector((state: RootState) => state.userinformation.userInfo);

const [petState, setPetState] = useState("Dog")

function handleDogState() {
  setPetState("Dog");
  dispatch(productListActions.getPet(petState));
}

function handleCatState() {
  setPetState("Cat");
  dispatch(productListActions.getPet(petState));
}

  return (
    <AppBar position="fixed" sx={{backgroundColor: "black"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <PetsIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          {/* <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
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
          </Typography> */}

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>

              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            BESTIES
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))} */}
              <Button
                onClick={handleCatState}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >FOR CATS
              </Button>
              <Button
                onClick={handleDogState}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >FOR DOGS
              </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <FavoriteIcon />
            </IconButton>
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
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>

      <Drawer
            anchor="right"
            open={stateAccountDrawer}
            onClose={toggleAccountDrawer(false)}
          >
          <Box
            sx={{ width: 400 }}
            role="presentation"
          >
            {
          tokenId !== "{}" ? <DashboardMenu/> : <LoginRegisterTabs/>
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
          <CartList checkoutSide={checkoutSide}/>
          <Divider orientation='vertical'/>
          <CheckoutUserInformation/>
        </Box>
      </Drawer>
    </AppBar>
  );
}