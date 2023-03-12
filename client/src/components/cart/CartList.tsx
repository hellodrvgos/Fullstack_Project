import Box from '@mui/material/Box';
import { Typography } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

import { RootState } from "../../redux/store";
import { useSelector} from "react-redux";

import CartItem from "./CartItem";
import emptybowl from "../../assets/emptybowl.png"

const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: 'none'
  }));

  type CheckOut = {
    checkoutSide: Function
  }

export default function CartList({checkoutSide}: CheckOut ) {

const cartList = useSelector((state: RootState) => state.cartlist.cartList);

return (
<Box sx={{ minWidth: "400px" }}>   

    <Grid container spacing={2}>
        <Grid item xs={12} >
            <Item>
                <Box sx={{ width: '100%'}}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Avatar sx={{ my: 3}}>
                            <ShoppingCartIcon />
                        </Avatar>
                    </Box>
                </Box>
                <Box sx={{ mx: 2, display: "flex", flexDirection: "column", rowGap: 2, minHeight: "350px"}}>
                {
                    cartList.map((product, index) => {
                        return <CartItem key={index} product={product}/>
                    })
                }
                </Box>
            </Item>
        </Grid>
    </Grid>

        {
        cartList.length > 0 ? (<Grid container spacing={2}>
            <Grid item xs={12}>
                <Box sx={{ display: "flex", flexDirection: "column", rowGap: 2}}>
                    <Item sx={{ px: 3, textAlign: "left", bgcolor: "#eee", borderRadius: 0 }}>
                        <Typography>Subtotal: $
                        {
                            cartList.reduce<number>((sum: number, value) => {
                                return sum + value.price * value.userQuantity
                            }, 0)
                        }
                        </Typography>
                        <Typography>Estimated Shipping: $8.00</Typography>
                        <Typography>Estimated tax: $0.00</Typography>
                        <Typography variant="h6">TOTAL: $
                        {
                            cartList.reduce<number>((sum: number, value) => {
                                return (sum + value.price * value.userQuantity)
                            }, 0) + 8
                        }
                        </Typography>
                    </Item>
                </Box>
            </Grid>

            <Grid item xs={12}>
                <Box sx={{ mx: 2, display: "flex", flexDirection: "row"}}>
                    <Item>
                        <Button variant="outlined" fullWidth startIcon={<ShoppingCartIcon />} onClick={() => {checkoutSide("800px")}}>
                            Continue Shopping
                        </Button>
                    </Item>
                    <Item>
                        <Button variant="contained" fullWidth endIcon={<ShoppingCartCheckoutIcon />} onClick={() => {checkoutSide("800px")}}>
                            Checkout
                        </Button>
                    </Item>
                </Box>
            </Grid>
        </Grid>) : 
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: -30, rowGap: 5 }}>
                <img
            src={emptybowl}
            alt="Empty Cart"
            loading="lazy"
            width="50%"
          />
        <Typography variant="h5">Please add some food!</Typography>
        <Typography>X</Typography>
        </Box>

        }
</Box> 
)
}