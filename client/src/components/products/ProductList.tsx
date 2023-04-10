import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import { RootState, AppDispatch } from "../../redux/store";
import { getProductListInfo } from "../../redux/thunks/product";
import ProductItem from "./ProductItem";

export default function ProductList() {

const dispatch = useDispatch<AppDispatch>();

useEffect(() => {
  dispatch(getProductListInfo());
}, [dispatch]);

const productList = useSelector((state: RootState) => state.productlist.productList);

const [brand, setBrand] = useState("all")

const byBrand = productList.filter(product => {
  return product.brand === brand
});

  return <div>
      <Box sx={{mt: -10, pb: 15, mb: -15}}>
        <Stack direction="row" spacing={3} sx={{width: "85%", mx: "auto"}}>
          <Card sx={{ width: "33%", borderRadius: "20px 0 0 20px"}}>
            <CardActionArea sx={{padding: "15px 5px 15px 5px", height: "100%", bgcolor: "white" }} onClick={() => setBrand("Beyond®")}>
              <CardMedia
                component="img"
                width="100%"
                image="https://www.purina.com/sites/default/files/2021-12/Beyond-Logo-235x175.png"
                alt="Beyond® Natural"
              />
              <CardContent>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card sx={{ width: "33%", borderRadius: 0}}>
            <CardActionArea sx={{ padding: "15px 5px 15px 5px", height: "100%", bgcolor: "white"   }} onClick={() => setBrand("Pro Plan®")}>
              <CardMedia
                component="img"
                width="100%"
                image="https://images.squarespace-cdn.com/content/5e7788d4f80a4423cc7c1c13/1586787003325-NEZ48JLN5X7KPU8S4IPP/ProPlan+Logo+for+Menu+1500.jpg?format=1500w&content-type=image%2Fjpeg"
                alt="Pro Plan"
              />
              <CardContent>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card sx={{ width: "33%", borderRadius: "0 10px 10px 0"}}>
            <CardActionArea sx={{ padding: "15px 5px 15px 5px", height: "100%", bgcolor: "white" }} onClick={() => setBrand("ONE®")}>
              <CardMedia
                component="img"
                width="100%"
                image="https://www.purina.com/sites/default/files/2021-09/purina-one-dog-logo.png"
                alt="ONE"
              />
              <CardContent>
              </CardContent>
            </CardActionArea>
          </Card>
        </Stack>
        <Typography variant="h4" sx={{mt: "100px"}}>
              Shop for {brand} Products
        </Typography>
        <Box sx={{width: "85%", mx: "auto", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly", rowGap: "25px", mt: 5}}>
        {
          brand === "all" ? productList.map((product, index) => {
            return <ProductItem key={index} product={product}/>
          }) : byBrand.map((product, index) => {
            return <ProductItem key={index} product={product}/>
        })
        }
        </Box>
    </Box>
  </div>
}