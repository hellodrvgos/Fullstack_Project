import { Order } from "../../types/Order";
import OrderProduct from "./OrderProduct";

export default function OrderListItem({order}: {order: Order}) {
    console.log(order, "OrderListItem.tsx")
    const orderProducts = order.products
    return (
        <div>
            <p>This is OrderListItem</p>
            <p>OrderDate: {order.orderCreated}</p>
            {
                orderProducts.map((orderProduct, index) => {
                    return <OrderProduct key={index} orderproduct={orderProduct}/>
                })
            }
        </div>
    )
}