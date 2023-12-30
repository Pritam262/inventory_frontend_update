'use client'
import React, { useState, useContext } from 'react';
import Style from "@/app/styles/userpage.module.css";
import ProductContext from '@/app/context/ProductContext';
import { FaEye,FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function page() {
    const context = useContext(ProductContext)
    const { theme, userTheme } = context;
    const fontColor = (theme === "system") ? userTheme() === 'dark' ? "#fff" : "#000" : (theme === 'dark') ? "#fff" : "#000";
    const backColor = (theme === "system") ? userTheme() === 'dark' ? "#515151" : "#D8D8D8" : (theme === 'dark') ? "#515151" : "#D8D8D8";
    const [password, setPassword] = useState({ pass: "", newPass: "", conPass: "" });
const [isHidden, setisHidden] = useState(true);
    // Set password on Change
    const onChange = (e) => {
        setPassword({ ...password, [e.target.name]: e.target.value })
    }

    // Handle change password

    const handleSubmit = ()=>{
        toast.success('Password update Successfully', {
            position: toast.POSITION.TOP_CENTER
        });
        setPassword({ pass: "", newPass: "", conPass: "" });

        console.log('Password Object', password);
    }

    // Set isHidden
    const handleHidden = ()=>{
        setisHidden((prev)=>!prev);
    }
    return (
        <div className={Style.hrefd} style={{ backgroundColor: backColor }}>
            <div style={{border: `1px solid ${fontColor}`}} className={Style.dsju24}>

                <div className={Style.input_container}>
                    <input style={{ border: `1px solid ${fontColor}`, color:fontColor }} className={Style.inputField} type={isHidden?'password':'text'} name="pass"  required value={password.pass} onChange={onChange} />
                    <label className={Style.label} htmlFor="" style={{ backgroundColor: backColor , color:fontColor}}>Previous Password</label>
                </div>

                <div className={Style.input_container}>
                    <input style={{ border: `1px solid ${fontColor}`, color:fontColor }} className={Style.inputField} type={isHidden?'password':'text'} name="newPass"  required value={password.newPass} onChange={onChange} />
                    <label className={Style.label} htmlFor="" style={{ backgroundColor: backColor , color:fontColor}}>New Password</label>
                </div>
                <div className={Style.input_container}>
                    <input style={{ border: `1px solid ${fontColor}`, color:fontColor }} className={Style.inputField} type={isHidden?'password':'text'} name="conPass"  required value={password.conPass} onChange={onChange} />
                    <label className={Style.label} htmlFor="" style={{ backgroundColor: backColor , color:fontColor}}>Confirm Password</label>
                </div>
                <div className={Style.sdu46}>

                <span style={{color:fontColor}}>{isHidden?<FaEye className={Style.icon}  onClick={()=>handleHidden()}/>:<FaEyeSlash className={Style.icon}  onClick={()=>handleHidden()}/>} {isHidden?'Show':"Hide"} Password</span>
                </div>
                <button className={Style.btn} style={{ border: `1px solid ${fontColor}` , color:fontColor}} onClick={handleSubmit}>Update</button>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default page