"use client"
import React, { useContext, useEffect } from 'react'
import ProductContext from '@/app/context/ProductContext'
import ProductItem from '../../../../components/productItem'
import Styles from "@/app/styles/productitem.module.css"
function page() {
  const context = useContext(ProductContext)
  const { products, getProducts} = context;
  // console.log("Console product", products)
  // console.log("Invertory page")
  useEffect(() => {
    getProducts()
    // console.log("Use Effect")
  }, [])
  // console.log("Type of getProducts in inventoryPage is: ", typeof getProducts)

  return (
<div className={Styles.container}>
{products.map((product) => {
  return <ProductItem key={product._id} keyValue={product._id} product={product} />
})}

</div>



)
}

export default page