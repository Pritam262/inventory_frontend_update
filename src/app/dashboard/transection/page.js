'use client'
import React, { useContext, useEffect, useState, useRef} from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ProductContext from '@/app/context/ProductContext'
import Style from '@/app/styles/transection.module.css'
import Image from 'next/image';
import html2pdf  from 'html2pdf.js';
export default function page() {
  const context = useContext(ProductContext);
  const { theme, userTheme, transections, setTransections, getAllTransections, getTransections, getTransBtnDate } = context;

  const fontColor = (theme === "system") ? userTheme() === 'dark' ? "#fff" : "#000" : (theme === 'dark') ? "#fff" : "#000";
  const tableFontColor = (theme === "system") ? userTheme() === 'dark' ? "#000" : "#fff" : (theme === 'dark') ? "#000" : "#fff";
  const backColor = (theme === "system") ? userTheme() === 'dark' ? "#515151" : "#D8D8D8" : (theme === 'dark') ? "#515151" : "#D8D8D8";
  const tableHeadingBackColor = (theme === "system") ? userTheme() === 'dark' ? "#C6C6C6" : "#E63131" : (theme === 'dark') ? "#C6C6C6" : "#E63131";
  const tableBackColor = (theme === "system") ? userTheme() === 'dark' ? "#C6C6C6" : "#FA65E1" : (theme === 'dark') ? "#C6C6C6" : "#FA65E1";
  const [transData, setTransData] = useState([]);
  const [isModelHidden, setisModelHidden] = useState(true);
  // const [transections, setTransections] = useState([]);
  // const transections = [
  //   {id:'16384484fgd', orderId:'89526546785474', paymentType:'cash',totalPrice:595, returnAmount:5},
  //   {id:'16384484fgd', orderId:'89526546785474', paymentType:'cash',totalPrice:595, returnAmount:5},
  //   {id:'16384484fgd', orderId:'89526546785474', paymentType:'cash',totalPrice:595, returnAmount:5},
  //   {id:'16384484fgd', orderId:'89526546785474', paymentType:'cash',totalPrice:595, returnAmount:5},
  //   {id:'16384484fgd', orderId:'89526546785474', paymentType:'cash',totalPrice:595, returnAmount:5},
  //   {id:'16384484fgd', orderId:'89526546785474', paymentType:'cash',totalPrice:595, returnAmount:5},
  // ]

  // Get transection
  const handleTransection = async (id) => {
    const data = await getTransections(id);
    setTransData(data);
    setisModelHidden(false);
  }
  // Date formator
  function formatReceivedDate(receivedDate) {
    const dateObj = new Date(receivedDate); // Convert received date string to a Date object
  
    const year = dateObj.getFullYear();
    const month = `0${dateObj.getMonth() + 1}`.slice(-2); // Adding leading zero if month is a single digit
    const date = `0${dateObj.getDate()}`.slice(-2); // Adding leading zero if date is a single digit
  
    const hours = `0${dateObj.getHours()}`.slice(-2); // Adding leading zero if hours is a single digit
    const minutes = `0${dateObj.getMinutes()}`.slice(-2); // Adding leading zero if minutes is a single digit
    const seconds = `0${dateObj.getSeconds()}`.slice(-2); // Adding leading zero if seconds is a single digit
  
    return `${date}-${month}-${year}:${hours}:${minutes}:${seconds}`;
  }

  // Generate pdf from html
const modelRef = useRef(null);
  const generatePDF = (id) => {
    const element = modelRef.current; // Select the element to convert to PDF
  
    html2pdf()
      .from(element)
      .save(`${id}.pdf`);

      console.log(element);
  };

  useEffect(() => {
    getAllTransections();
    // getTransBtnDate('2023-01-01','2023-12-31');

  }, [])

  return (
    <>
      <div className={Style.transectionComponent} style={{ color: fontColor, backgroundColor: backColor }} >
        <div className={Style.header}>

          Transection History
          <input type="date" name="stdate" id="" defaultValue={'2023-01-01'} style={{ color: fontColor, border: `1px solid ${fontColor}` }} />
          <input type="date" name="endate" id="" defaultValue={'2023-12-31'} style={{ color: fontColor, border: `1px solid ${fontColor}` }} />
        </div>

        <table style={{ width: '100%', textAlign: 'center' }}>
          <thead style={{ fontSize: '18px', backgroundColor: tableHeadingBackColor, color: '#000' }}>
            <tr>
              <th className={Style.tableHeading}>#</th>
              <th className={Style.tableHeading}>ID</th>
              <th className={Style.tableHeading}>ORDER ID</th>
              <th className={Style.tableHeading}>TYPE</th>
              <th className={Style.tableHeading}>TOTAL PRICE</th>
              <th className={Style.tableHeading}>RETURN AMOUNT</th>
              <th className={Style.tableHeading}>DATE</th>
              <th className={Style.tableHeading}></th>
            </tr>

          </thead>
          <tbody>
            {transections.transections && transections.transections.map((data, index) => (
              <tr key={index} className={Style.tableRow} style={index % 2 ? { backgroundColor: tableBackColor, color: tableFontColor } : {}}>
                <td className={Style.tableData}>{index + 1}</td>
                <td className={Style.tableData}>{data.id}</td>
                <td className={Style.tableData}>{data.orderId}</td>
                <td className={Style.tableData}>{data.paymentType}</td>
                <td className={Style.tableData}>{data.totalPrice}</td>
                <td className={Style.tableData}>{data.returnAmount}</td>
                <td className={Style.tableData}>{formatReceivedDate(data.date)}</td>
                <td className={Style.tableData}><FaEye key={data.id} onClick={() => handleTransection(data.id)} /></td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Transection model */}
        {transData?.data && transData.data[0] && (<div className={isModelHidden ? Style.hidden : Style.model } style={{backgroundColor:backColor, border: `1px solid ${fontColor}`, color:fontColor}} ref={modelRef}>
          <h1 className={Style.closeIcon} style={{color:fontColor}} onClick={()=>setisModelHidden(true)}>X</h1>
          <h4>Transection Id: {transData.data[0]._id}</h4>
          <h4>Order Id: {transData.data[0].orderid}</h4>
          <h4>Payment Type: {transData.data[0].paymenttype}</h4>
          <table style={{ width: '100%', textAlign: 'center' }}>
            <thead style={{ fontSize: '18px', backgroundColor: tableHeadingBackColor, color: '#000' }}>
              <tr>
              <th className={Style.tableHeading}>#</th>
                <th className={Style.tableHeading}>PRODUCT NAME</th>
                <th className={Style.tableHeading}>ID</th>
                <th className={Style.tableHeading}>QTY</th>
                <th className={Style.tableHeading}>PRICE</th>
              </tr>

            </thead>
            <tbody>
              {transData.data && transData.data[0].product.map((data, index) => (
                <tr key={index} className={Style.tableRow} style={index % 2 ? { backgroundColor: tableBackColor, color: tableFontColor } : {}}>
                  <td className={Style.tableData}>{index+1}</td>
                  <td className={Style.tableData}>{data.title}</td>
                  <td className={Style.tableData}>{data.id}</td>
                  <td className={Style.tableData}>{data.qty}</td>
                  <td className={Style.tableData}>{data.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4>Total Price: {transData.data[0].totalprice}</h4>
          <h4>Payment Amount: {transData.data[0].cashamount}</h4>
          {(transData.data[0].returnamount > 0) ? <h4>Return Amount: {transData.data[0].returnamount}</h4> : ''}
          <h4>Transection Date: {formatReceivedDate(transData.data[0].date)}</h4>
          <Image src="/export.png" width={20} height={20} alt='' onClick={()=>generatePDF(transData.data[0]._id)}/>
        </div>)}

      </div>

    </>
  )
}

