import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Typography } from "@mui/material";

import { Product } from "../../types/Product";

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
        ${product.price} x {product.userQuantity}
        </Typography>
        <Divider sx={{mt: 1}}/>
    </Box>
    )
}