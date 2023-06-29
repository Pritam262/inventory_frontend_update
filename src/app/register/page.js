'use client'
import React, { useState } from 'react'
import Styles from "../styles/dashboard.module.css"
import { Router } from 'next/router'
function page() {
    const [credencials, setCredencials] = useState({ name: "", email: "", password: "", address: "" })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3000/api/auth/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: credencials.name,
                email: credencials.email,
                password: credencials.password,
                address: credencials.address
            })
        });
        const json = await response.json()
        console.log(json.authtoken);
      

            if (json) {
                // Save the auth token and redirect
                localStorage.setItem('auth-token', json.authtoken);
                

            }
            else {
                alert("Sorry a user with this email is already exits")
            }
        
       
    }

    const onChange = (e) => {
        setCredencials({ ...credencials, [e.target.name]: e.target.value })
    }
    return (
        <form method="post" onSubmit={handleSubmit}>
            <input className={Styles.input} type="text" placeholder='Enter your name' value={credencials.name} onChange={onChange} name='name' />
            <input className={Styles.input} type="email" placeholder='Enter your email' onChange={onChange} value={credencials.email} name='email' />
            <input className={Styles.input} type="text" placeholder='Enter your password' onChange={onChange} value={credencials.password} name='password' />
            <input className={Styles.input} type="address" placeholder='Enter your address' onChange={onChange} value={credencials.address} name='address' />
            <button type="submit" className={Styles.btn}>Sign up</button>

        </form>

    )
}

export default page