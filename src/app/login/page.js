'use client'
import React, { useState, useContext } from 'react';
import ProductContext from '../context/ProductContext';
import Style from '@/app/styles/auth.module.css';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Page() {
  const context = useContext(ProductContext);
  const { logIn, theme, userTheme } = (context);

  // Set color based on theme
  const fontColor = (theme === "system") ? userTheme() === 'dark' ? "#1C1C1C" : "#000" : (theme === 'dark') ? "#1C1C1C" : "#000";
      const backColor = (theme === "system") ? userTheme() === 'dark' ? "#d5d5d5" : "#D8D8D8" : (theme === 'dark') ? "#d5d5d5d" : "#D8D8D8";
  const [loginData, setLoginData] = useState({ email: "", password: "" })

  const onChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }

  const handleClick = async (e) => {
    e.preventDefault();
    const response = await logIn(loginData.email, loginData.password)
    if (response && response.status === 400) {
      toast.error('Enter valid credentials', {
        position: toast.POSITION.TOP_CENTER
      })
    };
    // console.log("Login Data", loginData)
  }


  return (
    <div className={Style.box_container} style={{ backgroundColor: backColor, color: fontColor }}>
      <div>
        <h2>Login</h2>
      </div>
      <div className={Style.container}>


      <div className={Style.input_container}>
        <input className={Style.inputField} type="text" name="email" id="" required value={loginData.email} onChange={onChange} />
        <label className={Style.label} htmlFor="" style={{ backgroundColor: backColor, color:fontColor }}>Email</label>
      </div>
      <div className={Style.input_container}>
        <input className={Style.inputField} type="text" name="password" id="" required value={loginData.password} onChange={onChange} />
        <label className={Style.label} htmlFor="" style={{ backgroundColor: backColor, color:fontColor }}>Password</label>
      </div>
      <button onClick={handleClick} className={Style.btn} style={{border:`1px solid ${fontColor}`, color:fontColor}}>Submit</button>
      <p>You don't have an account <Link style={{color:'blue'}} href="/register">Click here</Link></p>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Page