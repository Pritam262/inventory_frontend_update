"use client"
import React, { useContext, useEffect } from 'react'

import LineChart from './LineChart'
import ProductContext from '@/app/context/ProductContext'
function Sells({props}) {

  const context = useContext(ProductContext)
  const { rangeSellData, salesData} = context

  const {startDate, endDate} = props

  // console.log(startDate.startDate, endDate.endDate)
  // const { startDate,endDate} = context
  useEffect(() => {
    rangeSellData(startDate,endDate);

  }, [1000])

  // console.log(salesData)

  // console.log(salesData.salesData)
  return (
    <div style={{ width: '100%', minWidth: '800px', padding:"1rem"}}>
      <h1>Sales Chart - between {salesData.salesData===undefined?"No date":salesData.salesData[0].date} and  {salesData.salesData===undefined?"No date":salesData.salesData[salesData.salesData.length - 1].date}</h1>
      
      <LineChart salesData={salesData.salesData}/>
      
    </div>
  )
}

export default Sells