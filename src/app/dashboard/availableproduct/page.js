'use client';
import React, { useContext, useEffect } from 'react'
import ProductContext from '@/app/context/ProductContext';
import Style from '@/app/styles/availableproduct.module.css'
import Image from 'next/image';
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
export default function page() {
  const context = useContext(ProductContext);
  const { products, getProducts, deleteProduct, theme, userTheme } = context;

  const handleDelete = (id) => {
    deleteProduct(id);
  }
  useEffect(() => {
    getProducts()
  }, [handleDelete])

  const fontColor = (theme === "system") ? userTheme() === 'dark' ? "#fff" : "#000" : (theme === 'dark') ? "#fff" : "#000";
  const tableFontColor = (theme === "system") ? userTheme() === 'dark' ? "#000" : "#fff" : (theme === 'dark') ? "#000" : "#fff";
  const backColor = (theme === "system") ? userTheme() === 'dark' ? "#515151" : "#D8D8D8" : (theme === 'dark') ? "#515151" : "#D8D8D8";
  const tableHeadingBackColor = (theme === "system") ? userTheme() === 'dark' ? "#C6C6C6" : "#E63131" : (theme === 'dark') ? "#C6C6C6" : "#E63131";
  const tableBackColor = (theme === "system") ? userTheme() === 'dark' ? "#C6C6C6" : "#FA65E1" : (theme === 'dark') ? "#C6C6C6" : "#FA65E1";
  return (
    <div style={{ color: fontColor, backgroundColor: backColor, border: ` 1px solid ${fontColor}`, width: '100%' }}>
      <table style={{ width: '100%', textAlign: 'center' }}>
        <thead style={{ fontSize: '18px', backgroundColor: tableHeadingBackColor, color: '#000' }}>
          <tr>
            <th className={Style.tableHeading}>#</th>
            <th className={Style.tableHeading}>ID</th>
            <th className={Style.tableHeading}>PRODUCT NAME</th>
            <th className={Style.tableHeading}>QTY</th>
            <th className={Style.tableHeading}>PRICE</th>
            <th className={Style.tableHeading}>TOTAL</th>
            <th className={Style.tableHeading}></th>
          </tr>

        </thead>
        <tbody>
          {products && products.map((data, index) => (
            <tr key={index} className={Style.tableRow} style={index % 2 ? { backgroundColor: tableBackColor, color: tableFontColor } : {}}>
              <td className={Style.tableData}>{index + 1}</td>
              <td className={Style.tableData}>{data.productId}</td>
              <td className={Style.tableData}>{data.title}</td>
              <td className={Style.tableData}>{data.qty}</td>
              <td className={Style.tableData}>{data.price}</td>
              <td className={Style.tableData}>{data.totalPrice}</td>
              <td className={Style.tableData}><MdDeleteOutline key={data.id} onClick={() => handleDelete(data.id)} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

