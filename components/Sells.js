"use client"
import React, { useContext, useEffect } from 'react'
import ProductContext from '@/app/context/ProductContext'
function Sells() {
  const context = useContext(ProductContext)
  const { rangeSellData, salesData } = context
  useEffect(() => {
    rangeSellData();


  }, [1000])

  // console.log(salesData)

  // console.log(salesData)
  return (
    <>
      {Array.isArray(salesData.salesData) ? (
        salesData.salesData.map((item, index) => (
          <div key={index}>
            <p>Date: {item.date}</p>
            <ul>
              {item.product.map((productItem, productIndex) => (
                <li key={productIndex}>
                  Title: {productItem.title} - Sells: {productItem.sells}
                </li>
              ))}
            </ul>
            <p>Total Price: {item.totalprice}</p>
          </div>
        ))
      ) : (
        <p>No sales data available.</p>
      )}
    </>
  )
}

export default Sells