import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState, AppDispatch } from "../../redux/store";
import { getProductListInfo } from "../../redux/thunks/product";
import ProductItem from "./ProductItem";

export default function ProductList() {

  const productList = useSelector((state: RootState) => state.productlist.productList);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getProductListInfo());
  }, [dispatch]);

  return <div>
    <p><strong>This is ProductList</strong></p>
    {
      productList.map((product, index) => {
        return <ProductItem key={index} product={product}/>
      })
    }
  </div>
}