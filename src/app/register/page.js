'use client'
import React, { useState, useContext } from 'react';
import ProductContext from '../context/ProductContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import Style from '@/app/styles/auth.module.css';
function Page() {
    const context = useContext(ProductContext);
    const { signUp, theme, userTheme } = (context);
    const [credencials, setCredencials] = useState({ name: "", email: "", password: "", conPass: "", address: "" })

    // Set color based on theme
    const fontColor = (theme === "system") ? userTheme() === 'dark' ? "#1C1C1C" : "#000" : (theme === 'dark') ? "#1C1C1C" : "#000";
    const backColor = (theme === "system") ? userTheme() === 'dark' ? "#d5d5d5" : "#D8D8D8" : (theme === 'dark') ? "#d5d5d5d" : "#D8D8D8";
    const handleSubmit = async (e) => {
        e.preventDefault();
        // const response = await fetch("http://localhost:3000/api/auth/register", {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         name: credencials.name,
        //         email: credencials.email,
        //         password: credencials.password,
        //         conPass:credencials.conPass,
        //         address: credencials.address
        //     })
        // });
        // const json = await response.json()
        // console.log(json.authtoken);


        //     if (json) {
        //         // Save the auth token and redirect
        //         localStorage.setItem('auth-token', json.authtoken);


        //     }
        //     else {
        //         alert("Sorry a user with this email is already exits")
        //     }
        const response = await signUp(credencials.name, credencials.email, credencials.password, credencials.conPass, credencials.address);
        if (response && response.status === 400) {
            toast.error('Fill all credencials and Enter valid credentials', {
                position: toast.POSITION.TOP_CENTER
            });

        }
    }

    const onChange = (e) => {
        setCredencials({ ...credencials, [e.target.name]: e.target.value })
    }
    return (
        <div className={Style.box_container} style={{ backgroundColor: backColor, color: fontColor }}>


            <h2>SignUp</h2>

            <div className={Style.container}>
                <div className={Style.input_container}>
                    <input className={Style.inputField} type="text" name="name" id="" required value={credencials.name} onChange={onChange} />
                    <label className={Style.label} htmlFor="" style={{ backgroundColor: backColor, color: fontColor }}>Name</label>
                </div>
                <div className={Style.input_container}>
                    <input className={Style.inputField} type="text" name="email" id="" required value={credencials.email} onChange={onChange} />
                    <label className={Style.label} htmlFor="" style={{ backgroundColor: backColor, color: fontColor }}>Email</label>
                </div>
                <div className={Style.input_container}>
                    <input className={Style.inputField} type="text" name="password" id="" required value={credencials.password} onChange={onChange} />
                    <label className={Style.label} htmlFor="" style={{ backgroundColor: backColor, color: fontColor }}>Password</label>
                </div>
                <div className={Style.input_container}>
                    <input className={Style.inputField} type="text" name="conPass" id="" required value={credencials.conPass} onChange={onChange} />
                    <label className={Style.label} htmlFor="" style={{ backgroundColor: backColor, color: fontColor }}>Confirm Password</label>
                </div>
                <div className={Style.input_container}>
                    <input className={Style.inputField} type="text" name="address" id="" required value={credencials.address} onChange={onChange} />
                    <label className={Style.label} htmlFor="" style={{ backgroundColor: backColor, color: fontColor }}>Address</label>
                </div>
                <button onClick={handleSubmit} className={Style.btn} style={{border:`1px solid ${fontColor}`, color:fontColor}}>Submit</button>
                <p>You have an account <Link style={{color:'blue'}} href="/login">Click here</Link></p>
            </div>

            <ToastContainer />

        </div >

    )
}

export default Page