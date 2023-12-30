'use client';
import React, { useEffect, useContext } from 'react'
import Style from '@/app/styles/analysispage.module.css'
import Sells from '../../../../components/Sells'
import { useState } from 'react';
import ProductContext from '@/app/context/ProductContext';
export default function page() {
  const context = useContext(ProductContext)
  const { salesData, theme, userTheme } = context

  const [startDate, setStartDate] = useState('2023-01-01');
  const [endDate, setEndDate] = useState('2023-12-31');
  const [products, setproducts] = useState([]);

  const fontColor = (theme === "system") ? userTheme() === 'dark' ? "#fff" : "#000" : (theme === 'dark') ? "#fff" : "#000";
  const tableFontColor = (theme === "system") ? userTheme() === 'dark' ? "#000" : "#fff" : (theme === 'dark') ? "#000" : "#fff";
  const backColor = (theme === "system") ? userTheme() === 'dark' ? "#515151" : "#D8D8D8" : (theme === 'dark') ? "#515151" : "#D8D8D8";
  const tableHeadingBackColor = (theme === "system") ? userTheme() === 'dark' ? "#C6C6C6" : "#E63131" : (theme === 'dark') ? "#C6C6C6" : "#E63131";
  const tableBackColor = (theme === "system") ? userTheme() === 'dark' ? "#C6C6C6" : "#FA65E1" : (theme === 'dark') ? "#C6C6C6" : "#FA65E1";

  const getProductData = async () => {
    const response = await fetch(`http://127.0.0.1:3000/api/sells/salesproduct?startDate=${startDate}&endDate=${endDate}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("auth-token")
      },
      cache: 'no-cache'
    });
    const data = await response.json();
    setproducts(data.salesProduct);
  }
  useEffect(() => {
    getProductData();
  }, [])

  return (
    <>
      {/* Dashboard analysis component start */}
      <div className={Style.analysisComponent} style={{ backgroundColor: backColor, color: fontColor }}>
        <div className={Style.header}>

        <input type="date" name="stdate" id="" defaultValue={'2023-01-01'} style={{ color: fontColor, border: `1px solid ${fontColor}` }} />
          <input type="date" name="endate" id="" defaultValue={'2023-12-31'} style={{ color: fontColor, border: `1px solid ${fontColor}` }} />
          <button type="submit" className={`${Style.ml_10} ${Style.subBtn}`}>Submit</button>
        </div>
        {/* Analysis card component */}
        <div className={Style.details}>
          <div className={`${Style.totalsells} ${Style.card}`} style={{ border: `1px solid ${fontColor}` }}>
            <h4>Total Sells</h4>
            <p>{salesData.totalPrice} Rs.</p>
          </div>
          <div className={`${Style.cashpayment} ${Style.card}`} style={{ border: `1px solid ${fontColor}` }}>
            <h4>Cash Payment</h4>
            <p>{salesData.cashAmount} Rs.</p>
          </div>
          <div className={`${Style.onlinepayment} ${Style.card}`} style={{ border: `1px solid ${fontColor}` }}>
            <h4>Online Payment</h4>
            <p>{salesData.onlineAmount} Rs.</p>
          </div>
        </div>
        {/* Analysis card component end */}

        <div className={Style.chartComponent} style={{ border: `1px solid ${fontColor}` }}>
          <Sells props={{ startDate: startDate, endDate: endDate }} />
        </div>

        {/* Dashboard  static graph table start */}
        <div className={Style.graphCom}>
          <div className={Style.tableComp} style={{ border: `1px solid ${fontColor}` }}>
            <div className={Style.selectionOption}>
              <p>Static Graph</p>
              <select className={Style.optionTag} style={{color:fontColor}}>
                <option value="all" id='prooption' style={{color:'#000'}}>All</option>
                <option value="pro1" style={{color:'#000'}}>product 1</option>
                <option value="pro2" style={{color:'#000'}}>Product 2</option>
                <option value="pro3" style={{color:'#000'}}>Product 3</option>
                <option value="pro4" style={{color:'#000'}}>Product 4</option>
              </select>
            </div>
            {/* Selection option end */}
            <table style={{ width: '100%', textAlign: 'left' }}>
              <thead style={{ fontSize: '18px', backgroundColor:tableHeadingBackColor, color:'#000' }}>
                <tr>
                  <th className={Style.tableHeading}>#</th>
                  <th className={Style.tableHeading}>PRODUCT NAME</th>
                  <th className={Style.tableHeading}>QTY</th>
                  <th className={Style.tableHeading}>PRICE</th>
                  <th className={Style.tableHeading}>TOTAL</th>
                </tr>

              </thead>
              <tbody>
                {products && products.map((data, index) => (
                  <tr key={index} className={Style.tableRow} style={index % 2 ? { backgroundColor: tableBackColor, color:tableFontColor} : {}}>
                    <td className={Style.tableData}>{index + 1}</td>
                    <td className={Style.tableData}>{data.title}</td>
                    <td className={Style.tableData}>{data.qty}</td>
                    <td className={Style.tableData}>{data.price}</td>
                    <td className={Style.tableData}>{data.totalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Static graph component */}
          <div className={Style.categoryComp} style={{ border: `1px solid ${fontColor}` }}>
            <div className={Style.selectionOption}>
              <p>Static Graph</p>
              <select className={Style.optionTag} id='catoption' style={{color:fontColor}}>
                <option value="all" style={{color:'#000'}}>All</option>
                <option value="cat1"  style={{color:'#000'}}>Category 1</option>
                <option value="cat2" style={{color:'#000'}}>Category 2</option>
                <option value="cat3" style={{color:'#000'}}>Category 3</option>
                <option value="cat4" style={{color:'#000'}}>Category 4</option>
              </select>
            </div>
            {/* Selection option end */}

          </div>
        </div>
      </div>
      {/* Dashboard analysis component end */}
    </>
  )
}

