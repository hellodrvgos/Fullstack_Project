import { useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";

import { Avatar, Box, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';

import { AppDispatch, RootState } from "../../redux/store";
import { getFavoritesListInfo } from "../../redux/thunks/favorites";
import { Product } from "../../types/Product";

export default function Favorites() {

    const token = localStorage.getItem("token");

    const userId = localStorage.getItem("id") || "{}";

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getFavoritesListInfo(userId));
    }, [dispatch, userId]);


    const favoritesList = useSelector((state: RootState) => state.favorites.favoriteList);

    return (
        <Box
        sx={{
            mx: 2,
            pt: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: "900px",
            margin: "0 auto",
            }}
        >
        <Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', columnGap: 2 }}>
              <Avatar sx={{ my: 4, bgcolor: "black"}}>
                  <FavoriteIcon />
              </Avatar>
              <Typography variant="h6">Favorites</Typography>
          </Box>
          <Box sx={{bgcolor: "#eee", p: 2, borderRadius: 1, minWidth: "900px"}}>
            <Box sx={{bgcolor: "white", p: 5, borderRadius: 1, flexGrow: 1, display: "flex", flexDirection: "column", minHeight: "50vh", justifyContent: "space-around"}}>
            {
              token === null ?
              <Box sx={{ flexGrow: 1, display: "flex", minHeight: "50vh", justifyContent: "center"}}>
              <Typography sx={{mt: 5}}>Please SIGN IN.</Typography>
              </Box> :
              favoritesList.length > 0 ?
              favoritesList.map((product) => {
                return <FavoriteProduct product={product}/>
              }) :
              <Box sx={{ flexGrow: 1, display: "flex", minHeight: "50vh", justifyContent: "center"}}>
              <Typography sx={{mt: 5}}>You don't have products in the Favorites list.</Typography>
              </Box>
            } 
            </Box>
          </Box>
        </Box>
    </Box>
)
}

type Favorite = {
    product: {
        favorites: Product;
        userId: string;
    }
  }

function FavoriteProduct({product}: Favorite) {
    return (
        <Box>
        <Typography sx={{textAlign: "left", mb: 1}}>{product.favorites.name} {product.favorites.category} by PURINA {product.favorites.brand} for {product.favorites.pet}s - ${product.favorites.price}</Typography>
        <Box sx={{display: "flex", columnGap: 1, color: "#aaa"}}>
        <Typography sx={{textAlign: "left"}} variant="body2">Remove from Favorites</Typography> | <Typography variant="body2">Add to Cart</Typography>
        </Box>
        </Box>
    )
}