import * as React from 'react';
import { useState } from "react";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import ProductDetails from "./ProductDetails";
import { Product } from "../../types/Product";

export default function ProductItem({product}: {product: Product}) {

  const [isShown, setIsShown] = useState(false);

  function handleClick() {
      setIsShown(current => !current);
    };

  const style = {
      borderRadius: "5px",
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: "70%",
      height: "80%",
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
    };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
      // <Stack direction="row" spacing={8}>
      <Card sx={{ width: "30%"}}>
        <CardActionArea sx={{padding: "15px 5px 15px 5px", height: "100%" }} onClick={handleOpen}>
          <CardMedia
            component="img"
            height="300px"
            image={product.image}
            alt={product.name}
            sx={{width: "60%", margin: "0 auto"}}
          />
          <CardContent>
            {
            // isShown && <ProductDetails product={product}/>
            isShown && <Typography>Hello</Typography>
            }
            <Rating name="half-rating-read" value={product.rating} precision={0.5} readOnly />
            <Typography variant="body1" color="text.secondary">
            {product.brand} {product.category}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
            {product.name}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <ProductDetails product={product}/>
          </Box>
        </Modal>
      </Card>  
      // </Stack>
    );
    
}