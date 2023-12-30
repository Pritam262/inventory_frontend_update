'use client'
import React, { useContext } from 'react'
import ProductContext from '@/app/context/ProductContext';
import Style from '@/app/styles/userpage.module.css'
import Image from 'next/image';
import { CiEdit } from "react-icons/ci";
import Link from 'next/link';
export default function page() {
  const context = useContext(ProductContext)
  const { theme, userTheme} = context;

  const fontColor = (theme==="system")? userTheme()==='dark'?"#fff":"#000":(theme==='dark')?"#fff" :"#000";
  const backColor = (theme==="system")? userTheme()==='dark'?"#515151":"#D8D8D8":(theme==='dark')?"#515151" :"#D8D8D8";

  const containerColor = (theme==="system")? userTheme()==='dark'?"#565656":"#c5c5c5":(theme==='dark')?"#565656" :"#c5c5c5";

  const userData = JSON.parse(localStorage.getItem('user'));
  return (
    <div style={{backgroundColor:backColor, color:fontColor}} className={Style.container}>
      {/* Admin page */}


      <div className={Style.box} style={{backgroundColor:containerColor, border:`1px solid ${fontColor}`}}>
        <Image src='/person.jpg' width={100} height={100} alt='' className={Style.image} style={{borderBottom: `5px solid #fff`}}/>
        <div className={Style.details}>
        <p className={Style.text}>Name: {userData.name}</p>
        <p className={Style.text}>Email: {userData.email}</p>
        <p className={Style.text}><span>Password: xxxxxxxxxx </span><Link href="/user/changepassword"><CiEdit /></Link></p>
        <p className={Style.text}>Address: {userData.address}</p>
        <p className={Style.text}>Ph. No.: {userData.number}</p>
        </div>
        <button className={Style.btn} style={{border: `1px solid ${fontColor}`}}>Update</button>

      </div>
    </div>
  )
}

