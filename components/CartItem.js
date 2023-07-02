import React from 'react'
import Styles from "@/app/styles/cartitem.module.css"
// CartItem component
function CartItem({ cartCode, totalPrice }) {
  return (<div className={Styles.data}>
    <table className={Styles.table}>
    <tr>
      <th>Id</th>
      <th>Price</th>
    </tr>
    <tr>
      <td>{cartCode}</td>
      <td>{totalPrice}</td>
      </tr>
      </table>
      
      </div>
   
    );
}

export default CartItem