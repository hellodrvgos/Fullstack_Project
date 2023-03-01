import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { getOrderListInfo } from "../../redux/thunks/orders";
import OrderListItem from "./OrderListItem";
import NavBarAccount from "../../components/navBar/NavBarAccount";

export default function OrderList() {

    const userId = localStorage.getItem("id") || "{}";

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getOrderListInfo(userId));
    }, [dispatch, userId]);

    const orderList = useSelector((state: RootState) => state.orderlist.orderList);

    return (
        <div>
            <NavBarAccount/>
            <p><strong>OrderList</strong></p>
            {
                orderList.map((order, index) => {
                    return <OrderListItem key={index} order={order}/>
                })
            }
        </div>
    )
}