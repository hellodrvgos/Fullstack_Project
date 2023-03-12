import { Product } from "../../types/Product";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Typography } from "@mui/material";

export default function CartItem({product}: {product: Product}) {

    const totalProduct: number = Number(`${product.price}`)*Number(`${product.userQuantity}`)

    return (
    <Box sx={{textAlign: "left"}}>
        <Typography variant="h6">
        ${totalProduct}
        </Typography>
        <Typography variant="body1">
        {product.name}
        </Typography>
        <Typography variant="body2">
        x {product.userQuantity}
        </Typography>
        <Divider sx={{mt: 1}}/>
    </Box>
    )
}