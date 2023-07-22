'use client'
import React, { useState, useContext } from 'react'
import ProductContext from '../context/ProductContext'
import Styles from '@/app/styles/auth.module.css'

function page() {
  const context = useContext(ProductContext)
  const { logIn , signUp} = (context)

  const [authType, setAuthType] = useState("login")

  const [loginData, setLoginData] = useState({ email: "", password: "" })

  const [regData, setRegData] = useState({name: "", email: "", password: "", address: "" })

  const onChange = (e) => {
    if (authType === 'login') {
      setLoginData({ ...loginData, [e.target.name]: e.target.value })
    }
    else {
      setRegData({ ...regData, [e.target.name]: e.target.value })
    }
  }

  const handleClick = (e) => {
    e.preventDefault();
    if (authType === 'login') {
      logIn(loginData.email, loginData.password)
      // console.log("Login Data", loginData)
      console.log(process.env.HOST_URL)

    }
    else {
      signUp(regData.name,regData.email, regData.password, regData.password)
      // console.log("SignUp data", regData)
    }
  }

  const autheType = () => {
    if (authType === "login") {

      setAuthType('signup')
      console.log("Set auth type signup")
    }
    else {

      setAuthType('login')
      console.log("set auth type login")
    }
  }

  return (
    <div className={Styles.box_container}>
      {authType === "login" ? (<>
        <div>
          <h2>Login Page</h2>
        </div>
        <div className={Styles.input_Container}>
          <input className={Styles.input} name='email' id='email' type='email' placeholder='Enter your email Id' value={loginData.email} onChange={onChange} />
          <input className={Styles.input} name='password' id='password' type="password" placeholder='Enter your password' value={loginData.password} onChange={onChange} />
        </div>
        <button type="submit" className={Styles.btn} onClick={handleClick}>Login</button>
        <p >You dont' have an account <button onClick={autheType}> click here</button></p>


      </>) :
        <>
          <div>
            <h2>SignUp page</h2>
          </div>
          <div className={Styles.input_Container}>
          <input className={Styles.input} name='name' id='name' type='name' placeholder='Enter your company name' value={regData.name} onChange={onChange} />
            <input className={Styles.input} name='email' id='email' type='email' placeholder='Enter your email Id' value={regData.email} onChange={onChange} />
            <input className={Styles.input} name='password' id='password' type="password" placeholder='Enter your password' value={regData.password} onChange={onChange} />
            <input className={Styles.input} name='address' id='address' type="text" placeholder='Enter your address' value={regData.address} onChange={onChange} />
          </div>

          <button type="submit" className={Styles.btn} onClick={handleClick}>Sign Up</button>
          <p >You dont' have an account <button onClick={autheType}> click here</button></p>
        </>

      }
    </div>
  )
}

export default page