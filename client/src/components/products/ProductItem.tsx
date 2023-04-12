import * as React from 'react';

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
      <Card sx={{ width: "24%", mr: 1}}>
        <CardActionArea sx={{padding: "5px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-around", height: "100%" }} onClick={handleOpen}>
          <CardMedia
            component="img"
            image={product.image}
            alt={product.name}
            sx={{width:"70%", height: "50%", margin: "0 auto"}}
          />
          <Box sx={{height: "40%"}}>
            <CardContent>
              <Rating name="half-rating-read" value={product.rating} precision={0.5} readOnly />
              <Typography variant="body1" color="text.secondary">
              {product.brand} {product.category}
              </Typography>
              <Typography gutterBottom variant="h6" sx={{fontWeight: "normal"}}>
              {product.name}
              </Typography>
            </CardContent>
          </Box>
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
    );
    
}