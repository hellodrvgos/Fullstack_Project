import * as React from 'react';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import { RootState } from "../../redux/store";
import { cartActions } from "../../redux/slices/cart";
import { AppDispatch } from "../../redux/store";
import { Product } from "../../types/Product";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: "none"
}));

export default function ProductDetails({product}: {product: Product}) {

  const dispatch = useDispatch<AppDispatch>();

  const [userQuantity, setUserQuantity] = useState("1");
  
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (Number(event.target.value) > product.quantity) {
          alert(`We only have ${product.quantity} items. Please order less!`);
          return;
      }
      setUserQuantity(event.target.value);
  }

  const cartList = useSelector((state: RootState) => state.cartlist.cartList);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Item>
            <CardMedia
                component="img"
                height="300px"
                image={product.image}
                alt={product.name}
                sx={{width: "60%", margin: "0 auto"}}
              />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item sx={{ textAlign: "left" }}>
          <Rating name="half-rating-read" value={product.rating} precision={0.5} readOnly />
              <Typography variant="body1" color="text.secondary">
              {product.brand} {product.category}
              </Typography>
                <Typography gutterBottom variant="h5" component="div">
              {product.name}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
              Price: ${product.price}
              </Typography>
              <Typography gutterBottom variant="body1" component="div">
              In stock: {product.quantity}
              </Typography>
              <br/>
              <Stack direction="row" spacing={2}>
                <TextField
                    label="Quantity"
                    id="outlined-size-small"
                    defaultValue="1"
                    size="small"
                    sx={{width: "20%"}}
                    onChange={onChangeHandler}
                />
                <Button 
                type="submit"
                variant="contained"
                onClick={() => {dispatch(cartActions.addToCart({
                        _id: product._id,
                        name: product.name,
                        category: product.category,
                        price: product.price,
                        description: product.description,
                        // image: product.image,
                        quantity: product.quantity,
                        userQuantity: Number(userQuantity)
                    }))}}
                >Add to cart</Button><Button variant="outlined">Add to Wishlist</Button>
              </Stack>
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item sx={{ textAlign: "left"}}>
            <Typography gutterBottom variant="h6" component="div">
              Description
            </Typography>
            <Typography gutterBottom variant="body1" component="div">
              {product.description}
            </Typography>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}