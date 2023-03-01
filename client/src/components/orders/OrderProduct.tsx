import { Product } from "../../types/Product"

export default function OrderProduct({orderproduct}: {orderproduct: Product}) {
    return (
        <div>
            <p>This is OrderProduct</p>
            Name: {orderproduct.name}
        </div>
    )
}