"use client"
import React, { useContext, useEffect } from 'react'

import LineChart from './LineChart'
import ProductContext from '@/app/context/ProductContext'
import Style from "@/app/styles/sells.module.css";
function Sells({ props }) {

  const context = useContext(ProductContext)
  const { rangeSellData, salesData,theme,userTheme } = context
  const color = (theme==="system")? userTheme()==='dark'?"#fff":"#000":(theme==='dark')?"#fff" :"#000";
  const fontColor = '#fff';
  const { startDate, endDate } = props

  // console.log(startDate.startDate, endDate.endDate)
  // const { startDate,endDate} = context
  useEffect(() => {
    rangeSellData(startDate, endDate);

  }, [1000])

  // console.log(salesData)

  // console.log(salesData.salesData)
  return (
    <div className={Style.chartCom} >
      <h4 style={{color:color}}>Sales Chart - between {salesData.salesData === undefined || salesData.totalLength === 0 ? "No Date" : salesData.salesData[0].date} and  {salesData.salesData === undefined || salesData.totalLength === 0 ? "No Date" : salesData.salesData[salesData.salesData.length - 1].date}</h4>

      {salesData.salesData === undefined || salesData.totalLength === 0 ? <p style={{color:color}}>Chart is not availabe</p> : <LineChart salesData={salesData.salesData} />}

    </div>
  )
}

export default Sells