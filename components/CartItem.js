"use client"
import React, { useEffect } from 'react';
import Styles from "@/app/styles/cartitem.module.css"
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

function CartItem({ cartCode, totalPrice,setCartList, getStorageData }) {

{/* on editData btn click get the id and get the data from localStorage then it show on home page  using cartItem react state addHookAliases. */}

  const editData = (id) => {
    if (id) {

      // console.log(id)

      // Retrieve the data from localStorage using the cartCode
      const cartData = JSON.parse(localStorage.getItem(id.toString()));
      
      // Check if the cartData exists
      if (cartData) {
        // Extract the cartList from the cartData
        const { cartList } = cartData;
        
        // console.log(cartData)

        // Set the cartItem state in the Home component using setCartItem

        setCartList(cartData.cartList);
        deleteData(id)
      }
    }
  };

  const deleteData = (id)=>{
    localStorage.removeItem(id)
    getStorageData()
  }
useEffect(() => {
  getStorageData()
}, [])


  return (
    <div className={Styles.data}>
      <table className={Styles.table}>
        <thead>
          <tr>
            <th>Cart Code</th>
            <th>Total Price</th>
            <th>
              <AiOutlinePlusCircle className={Styles.addIcon} onClick={() => editData(cartCode)} /> {/* Pass the cartCode as the argument */}
            </th>
            <th>
              <AiOutlineMinusCircle className={Styles.addIcon}  onClick={()=>deleteData(cartCode)}/> {/* Pass the cartCode as the argument */}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr key={cartCode}>
            <td>{cartCode}</td>
            <td>{totalPrice}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CartItem;
