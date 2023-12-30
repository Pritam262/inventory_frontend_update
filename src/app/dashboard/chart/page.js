'use client';
import React,{useContext} from 'react'
import ProductContext from '@/app/context/ProductContext';
export default function page() {
    const context = useContext(ProductContext);
    const {theme,userTheme  } = context;
    const fontColor = (theme==="system")? userTheme()==='dark'?"#1C1C1C":"#000":(theme==='dark')?"#1C1C1C" :"#000";
    const backColor = (theme==="system")? userTheme()==='dark'?"#AAAAAA":"#C9C9C9":(theme==='dark')?"#AAAAAA" :"#C9C9C9";
  return (
    <div style={{color:fontColor}}>Chart Page</div>
  )
}
