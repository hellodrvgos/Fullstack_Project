import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Divider, Typography } from "@mui/material";

import { ProductOrdered } from "../../types/Order";
import { Order } from "../../types/Order";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: "none"
}));

export default function OrderListItem({order}: {order: Order}) {

    let orderTotal = 0;

    order.cart.forEach(function(product: ProductOrdered) {
        if (product.hasOwnProperty("productId") && product.productId.hasOwnProperty("price")){
            orderTotal += product.productId.price * product.userQuantity;
        }
    })

    const userInfoDetails = useSelector((state: RootState) => state.userinformation.userInfo);

    return (
    <Box sx={{ flexGrow: 1, width: "800px"}}>
    <Grid container spacing={2}>
        <Grid item xs={12} >
            <Item>
            <Typography variant='h6' sx={{textAlign: "left", mb: 1}}>Products</Typography>
            {
                order.cart.map((product, index) => {
                    return <ProductsOrdered key={index} product={product}/>
                })
            }
            </Item>
        </Grid>
        <Grid item xs={8}>
        <Item>
        <Typography variant='h6' sx={{textAlign: "left", mb: 1}}>Shipping information</Typography>
        <Typography sx={{textAlign: "left", pl: 1}} variant='body1'>Address:</Typography>
        <Typography sx={{textAlign: "left", mb: 1 , pl: 1}} variant='body2'>{userInfoDetails.address}, {userInfoDetails.city}, {userInfoDetails.country}</Typography>
        <Typography sx={{textAlign: "left", pl: 1}} variant='body1'>Phone:</Typography>
        <Typography sx={{textAlign: "left", pl: 1}} variant='body2'>{userInfoDetails.phone}</Typography>
        </Item>
        </Grid>
        <Grid item xs={4}>
          <Item sx={{textAlign: "right"}}>
          <Typography variant='h6' sx={{textAlign: "right", mb: 1}}>Total summary</Typography>
            <Typography >Subtotal: ${orderTotal}</Typography>
            <Typography variant='body2'>Shipping fee: $8.00</Typography>
            <Typography variant='body2'>Tax: $0.00</Typography>
            <Divider sx={{my: 1}}/>
            <Typography variant='body1'>Total: ${orderTotal + 8}
            <Typography variant='body2'>Paid by Credit Card</Typography>
            </Typography>
          </Item>
        </Grid>
    </Grid>
    </Box>
    )
}

function ProductsOrdered({product}: {product: ProductOrdered}) {

    return (
        <Box sx={{p: 1, textAlign: "left"}}>
            <Typography variant="body1">
            {product.productId.name}
            </Typography>
            <Typography variant="body2">
            ${product.productId.price} x {product.userQuantity}
            </Typography>
        </Box>
    )
}