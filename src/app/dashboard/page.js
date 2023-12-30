"use client"
import React, { useState, useContext, useEffect } from 'react';
import Style from "../styles/dashboard.module.css";
import ProductContext from '@/app/context/ProductContext';
import Sells from '../../../components/Sells';
function Page() {
  const [activeMenu, setActiveMenu] = useState('analysis')
  // const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");
  const [showSells, setShowSells] = useState(false);
  // const context = useContext(ProductContext)
  // const { startDate,setStartDate,endDate,setEndDate} = context

  const [startDate, setStartDate] = useState('2023-01-01');
  const [endDate, setEndDate] = useState('2023-12-31');
const [products, setproducts] = useState([]);
  const getProductData = async () => {
    const response = await fetch(`http://127.0.0.1:3000/api/sells/salesproduct?startDate=${startDate}&endDate=${endDate}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("auth-token")
      },
      cache:'no-cache'
    });
    const data = await response.json();
    setproducts(data.salesProduct);
  }

  const context = useContext(ProductContext);
  const { rangeSellData, salesData,theme,userTheme  } = context;
  const fontColor = (theme==="system")? userTheme()==='dark'?"#fff":"#000":(theme==='dark')?"#fff" :"#000";
  const backColor = (theme==="system")? userTheme()==='dark'?"#515151":"#D8D8D8":(theme==='dark')?"#515151" :"#D8D8D8";
  const tableFontColor = (theme==="system")? userTheme()==='dark'?"#000":"#fff":(theme==='dark')?"#000" :"#fff";
  const tableHeadingBackColor = (theme==="system")? userTheme()==='dark'?"#C6C6C6":"#E63131":(theme==='dark')?"#C6C6C6" :"#E63131";
  const tableBackColor = (theme==="system")? userTheme()==='dark'?"#C6C6C6":"#FA65E1":(theme==='dark')?"#C6C6C6" :"#FA65E1";

  useEffect(() => {

    rangeSellData(startDate, endDate);
    getProductData();

  }, [])


  const handleClick = (componentName) => {
    setActiveMenu(componentName);
  };

  const handleSellsSubmenuClick = (submenuOption) => {
    setActiveMenu(submenuOption);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleBtnClick = () => {
    setShowSells(true);
  };

  return (
    <>
      {/* <div className={Style.dashboard}> */}

      {/* Dashboard analysis component start */}
      <div className={Style.analysisComponent} style={{color:fontColor, backgroundColor:backColor, border:` 1px solid ${fontColor}`}}>
        {/* Analysis card component */}
        <div className={Style.details}>
          <div className={`${Style.totalsells} ${Style.card}`} style={{border:`1px solid ${fontColor}`}}>
            <h4>Total Sells</h4>
            <p>{salesData.totalPrice} Rs.</p>
          </div>
          <div className={`${Style.cashpayment} ${Style.card}`} style={{border:`1px solid ${fontColor}`}}>
            <h4>Cash Payment</h4>
            <p>{salesData.cashAmount} Rs.</p>
          </div>
          <div className={`${Style.onlinepayment} ${Style.card}`} style={{border:`1px solid ${fontColor}`}}>
            <h4>Online Payment</h4>
            <p>{salesData.onlineAmount} Rs.</p>
          </div>
        </div>
        {/* Analysis card component end */}

        <div className={Style.chartComponent} style={{border:`1px solid ${fontColor}`}}>
          <Sells props={{ startDate: '2023-01-01', endDate: '2023-12-31' }} />
        </div>

        {/* Dashboard  static graph table start */}
        <div className={Style.graphCom} >
          <div className={Style.tableComp} style={{border:`1px solid ${fontColor}`}}>
            <div className={Style.selectionOption}>
              <p>Static Graph</p>
              <select className={Style.optionTag} style={{color:fontColor}}>
                <option value="all" id='prooption'>All</option>
                <option value="pro1">product 1</option>
                <option value="pro2">Product 2</option>
                <option value="pro3">Product 3</option>
                <option value="pro4">Product 4</option>
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
                {products &&  products.map((data, index) => (
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

          {/* Static graph */}
          <div className={Style.categoryComp} style={{border:`1px solid ${fontColor}`}}>
            <div className={Style.selectionOption}>
              <p>Static Graph</p>
              <select className={Style.optionTag} id='catoption' style={{color:fontColor}}>
                <option value="all">All</option>
                <option value="cat1" >Category 1</option>
                <option value="cat2">Category 2</option>
                <option value="cat3">Category 3</option>
                <option value="cat4">Category 4</option>
              </select>
            </div>
            {/* Selection option end */}

          </div>
        </div>
      </div>
      {/* Dashboard analysis component end */}


      {/* Chart page */}
      {/* <ChartPage/> */}


      {/* </div> */}
    </>
  )
}

export default Page;