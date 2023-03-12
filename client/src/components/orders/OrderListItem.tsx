import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography } from "@mui/material";

import { ProductOrdered } from "../../types/Order";

export default function OrderListItem({product}: {product: ProductOrdered}) {

    console.log(product, "productOrderListItem")

    return (
        <div>
        <Box sx={{width: "50%", mx: "auto", mt: 10}}>
            <Paper elevation={1}>
            <Typography variant="h6">Name: {product.productId.name}</Typography>
            <Typography variant="h6">Quantity ordered: {product.userQuantity}</Typography>
            </Paper>
        </Box>
        </div>
    )
}