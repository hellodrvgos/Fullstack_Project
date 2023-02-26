import { productListActions } from "../slices/product";
import { AppDispatch } from "../store";

export function getProductListInfo() {
    const url = `http://localhost:8000/products`
    return async (dispatch: AppDispatch) => {
        const res = await fetch(url);
        const productListData = await res.json();
        dispatch(productListActions.getProductList(productListData));
    }
}