import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Container from '@mui/material/Container';

import { RootState, AppDispatch } from "../../redux/store";
import { getProductListInfo } from "../../redux/thunks/product";
import ProductItem from "./ProductItem";

export default function ProductList() {

const dispatch = useDispatch<AppDispatch>();

useEffect(() => {
  dispatch(getProductListInfo());
}, [dispatch]);

const productList = useSelector((state: RootState) => state.productlist.productList);
const pet = useSelector((state: RootState) => state.productlist.pet);

const [brand, setBrand] = useState("")

const byBrand = productList.filter(product => {
  return product.brand === brand
});

  return <div>
      <Box sx={{mt: "50px"}}>
      <Container maxWidth="xl">
        <Stack direction="row" spacing={6} sx={{width: "85%", mx: "auto"}}>
          <Card sx={{ minWidth: 350}}>
            <CardActionArea sx={{padding: "15px 5px 15px 5px", height: "100%" }} onClick={() => setBrand("Beyond®")}>
              <CardMedia
                component="img"
                width="100%"
                image="https://www.purina.com/sites/default/files/2021-12/Beyond-Logo-235x175.png"
                alt="Beyond® Natural"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                Beyond® Natural {pet} Food
                </Typography>
                <Typography variant="body2" color="text.secondary">
                We believe food choices are the most important daily decisions we make for our health and well-being, and it’s not any different when it comes to feeding our pets. At Beyond®, we believe that when we connect with what’s natural, we reconnect with what’s good in food.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card sx={{ minWidth: 350}}>
            <CardActionArea sx={{ padding: "15px 5px 15px 5px", height: "100%"   }} onClick={() => setBrand("Pro Plan®")}>
              <CardMedia
                component="img"
                width="100%"
                image="https://images.squarespace-cdn.com/content/5e7788d4f80a4423cc7c1c13/1586787003325-NEZ48JLN5X7KPU8S4IPP/ProPlan+Logo+for+Menu+1500.jpg?format=1500w&content-type=image%2Fjpeg"
                alt="Pro Plan"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                Purina® Pro Plan® {pet} Food
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Purina Pro Plan is the most advanced nutrition for your pet’s best life. That’s why we’re proud to offer a full spectrum of performance and specialized nutrition formulas, including options that support healthy aging, reduce cat allergens, provide guaranteed live probiotics, and more.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card sx={{ minWidth: 350}}>
            <CardActionArea sx={{ padding: "15px 5px 15px 5px", height: "100%"   }} onClick={() => setBrand("ONE®")}>
              <CardMedia
                component="img"
                width="100%"
                image="https://www.purina.com/sites/default/files/2021-09/purina-one-dog-logo.png"
                alt="ONE"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                Purina ONE® {pet} Food
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Purina ONE′s goal is to provide pet owners with tailored nutrition for the pets they love, featuring dry dog food, wet dog food, dry cat food and wet cat food.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Stack>
        <Typography variant="h4" sx={{mt: "100px"}}>
              Shop for {brand} Products
        </Typography>
        <Box sx={{display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly", rowGap: "25px", mt: 5}}>
        {
          brand === "" ? productList.map((product, index) => {
            return <ProductItem key={index} product={product}/>
          }) : byBrand.map((product, index) => {
            return <ProductItem key={index} product={product}/>
        })
        };
        </Box>
    </Container>
    </Box>
  </div>
}