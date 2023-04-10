import { Link, useNavigate } from "react-router-dom";

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import PersonIcon from '@mui/icons-material/Person';
import PaymentIcon from '@mui/icons-material/Payment';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Button } from '@mui/material';

type StateAccountDrawer = {
  setStateAccountDrawer: Function;
  setCheckoutInfo: Function
}

export default function DashboardMenu({setStateAccountDrawer, setCheckoutInfo}: StateAccountDrawer) {

  const navigate = useNavigate();

  function closeMenu() {
    setStateAccountDrawer(false)
    setCheckoutInfo(false);
  }

  function logOut() {
    localStorage.removeItem("token");
    closeMenu()
    setTimeout(() => {navigate("/")}, 1000)
  }

  return (
    <Box sx={{ width: '100%', mt: 1, overflow: "hidden" }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ my: 4 }}>
          <PersonIcon />
        </Avatar>
      </Box>
      <Box sx={{ width: '100%', ml: 5 }}>
        <ListSubheader component="div"  >
          DASHBOARD
        </ListSubheader>
        <ListItemButton component={Link} to="/orders" onClick={closeMenu}>
          <ListItemIcon>
            <ShoppingBagIcon />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItemButton>

        <ListItemButton component={Link} to="/favorites" onClick={closeMenu}>
          <ListItemIcon>
            <FavoriteIcon />
          </ListItemIcon>
          <ListItemText primary="Favorites" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <QuestionAnswerIcon />
          </ListItemIcon>
          <ListItemText primary="Support Chat - soon" />
        </ListItemButton>

      <Divider sx={{my: 3}}/>

        <ListSubheader component="div" >
            ACCOUNT SETTINGS
          </ListSubheader>
          <ListItemButton component={Link} to="/profile" onClick={closeMenu}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile Info" />
          </ListItemButton>
          <ListItemButton component={Link} to="/payments" onClick={closeMenu}>
            <ListItemIcon>
              <PaymentIcon />
            </ListItemIcon>
            <ListItemText primary="Payment Methods" />
          </ListItemButton>

      <Divider sx={{my: 3}}/>

        <Button
          onClick={logOut}
          variant="outlined"
          sx={{ my: 1, color: "black", borderColor: "black" }}
        >
          Log Out
        </Button>
      </Box>
    </Box>
  )
}