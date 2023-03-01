import { orderListActions } from "../slices/orders";
import { AppDispatch } from "../store";

export function getOrderListInfo(id: string) {
    const token = localStorage.getItem("token");
    const url = `http://localhost:8000/orders/${id}`
    return async (dispatch: AppDispatch) => {
        const res = await fetch(url, {headers: {Authorization: `Bearer ${token}`}});
        const orderListData = await res.json();
        dispatch(orderListActions.getOrderList(orderListData));
    }
}