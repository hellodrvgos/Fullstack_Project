import * as React from 'react';
import { Link } from "react-router-dom";

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaymentIcon from '@mui/icons-material/Payment';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Button } from '@mui/material';

export default function DashboardMenu() {
  return (
    <Box sx={{ width: '100%', mt: 1 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ my: 4 }}>
          <PersonIcon />
        </Avatar>
      </Box>
      <Box sx={{ width: '100%', ml: 5 }}>
        <ListSubheader component="div"  >
          DASHBOARD
        </ListSubheader>
        <ListItemButton component={Link} to="/orders">
          <ListItemIcon>
            <ShoppingBagIcon />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <SupportAgentIcon />
          </ListItemIcon>
          <ListItemText primary="Support Tickets" />
        </ListItemButton>

      <Divider sx={{my: 3}}/>

        <ListSubheader component="div" >
            ACCOUNT SETTINGS
          </ListSubheader>
          <ListItemButton component={Link} to="/profile">
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile Info" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <LocationOnIcon />
            </ListItemIcon>
            <ListItemText primary="Addresses" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <PaymentIcon />
            </ListItemIcon>
            <ListItemText primary="Payment Methods" />
          </ListItemButton>

      <Divider sx={{my: 3}}/>

        <Button
          type="submit"
          variant="outlined"
          sx={{ my: 1 }}
        >
          Log Out
        </Button>
      </Box>
    </Box>
  )
}