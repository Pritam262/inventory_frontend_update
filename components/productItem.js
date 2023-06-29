"use client"
const { useContext } = require("react");
import Styles from "@/app/styles/productitem.module.css"
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"
import ProductContext from '@/app/context/ProductContext'
const ProductItem = (props) => {
    const context = useContext(ProductContext)
    const { deleteProduct } = context;
    const { product, keyValue } = props;

    return (


        <div className={Styles.card}>
            <h2 className={Styles.title}>{product.title}</h2>
            <p className={Styles.p_text}>Product Id: {product.id}</p>
            <p className={Styles.p_text}>Available qty: {product.qty}</p>
            <p className={Styles.p_text}>Product Unit: {product.unit}</p>
            <p className={Styles.p_text}>Product Price: {product.price}</p>
            <div>
                <AiOutlineEdit /> <AiOutlineDelete onClick={() => { deleteProduct(keyValue) }} />

            </div>
        </div>


    )
}

export default ProductItem