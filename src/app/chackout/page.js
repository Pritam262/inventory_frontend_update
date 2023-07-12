"use client"
import React, { useContext} from 'react';
import ProductContext from '@/app/context/ProductContext';
function page() {
  const context = useContext(ProductContext)
  const {cartList,subTotal} = context
  console.log("This chackout page",cartList, subTotal)
  return (
    <div>Chackout</div>
  )
}

export default page