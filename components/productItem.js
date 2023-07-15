"use client"
const { useContext, useState, useEffect } = require("react");
import Styles from "@/app/styles/productitem.module.css"
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"
import ProductContext from '@/app/context/ProductContext'
const ProductItem = ({data}) => {
    const context = useContext(ProductContext)
    const { deleteProduct } = context;
    // const { product, keyValue } = props;

    

    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        setTableData(data)
    },[deleteProduct])
    

    return (
     /*    <div className={Styles.card}>
            <h2 className={Styles.title}>{product.title}</h2>
            <p className={Styles.p_text}>Product Id: {product.id}</p>
            <p className={Styles.p_text}>Available qty: {product.qty}</p>
            <p className={Styles.p_text}>Product Unit: {product.unit}</p>
            <p className={Styles.p_text}>Product Price: {product.price}</p>
            <div>
                <AiOutlineEdit /> <AiOutlineDelete onClick={() => { deleteProduct(keyValue) }} />

            </div>
        </div> */
        <>




        {tableData.length > 0 && (
            <table className={Styles.table}>
              <thead className={Styles.tableTitle}>
                <tr >
                  <th className={Styles.tableRow}>Product Title</th>
                  <th className={Styles.tableRow}>Product ID</th>
                  <th className={Styles.tableRow}>Product Qty</th>
                  <th className={Styles.tableRow}>Product Unit</th>
                  <th className={Styles.tableRow}>Product Price</th>
                  <th className={Styles.tableRow}>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((item) => (
                  <tr key={item.id}>
                    <td className={Styles.tableData}>{item.title}</td>
                    <td className={Styles.tableData}>{item.id}</td>
                    <td className={Styles.tableData}>{item.qty}</td>
                    <td className={Styles.tableData}>{item.unit}</td>
                    <td className={Styles.tableData}>{item.price}</td>
                    <td className={Styles.tableData}><AiOutlineDelete onClick={() => { deleteProduct(item._id) }} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}




          </>
    )
}
export default ProductItem