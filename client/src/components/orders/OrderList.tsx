import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState, AppDispatch } from "../../redux/store";
import { getOrderListInfo } from "../../redux/thunks/orders";
import OrderListItem from "./OrderListItem";

export default function OrderList() {

    const userId = localStorage.getItem("id") || "{}";

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getOrderListInfo(userId));
    }, [dispatch, userId]);

    const orderList = useSelector((state: RootState) => state.orderlist.orderList);

    if (orderList[0]) {
        return (
            <div>
                {
                    orderList[0].cart.map((product, index) => {
                        return <OrderListItem key={index} product={product}/>
                    })
                }
            </div>
        )
    }

    return (
        <div>Loading</div>
    )
}