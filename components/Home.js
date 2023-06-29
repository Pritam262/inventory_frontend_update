"use client"
import React, { useState } from 'react'
import Styles from "@/app/styles/home.module.css"
import { AiOutlinePlusCircle } from "react-icons/ai"
import CartItem from './CartItem'
function Home() {
    const [product, setProduct] = useState([])
    const [cart, setCart] = useState({})
    const [subTotal, setSubTotal] = useState(0)
    const onChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
        // console.log("Set product", product)
    }
const handleClick = ()=>{
    console.log("My cart",cart)
}
    const addtoCart = (e) => {
        let myCart = cart;
        let cardCode = Date.now().toString()
        // if(cardCode in cart){
        //     newCart[cardCode] = {title,id,qty:1,price}
        // }
        // else{
        //     newCart[cardCode] = {title,id,qty:1,price}
        // }
        e.preventDefault()
        setCart([{product,cardCode:cardCode}])
        console.log(cardCode)
       
    }
    console.log("Cart", cart, Date.now().toString())
    console.log("Type of cart.map", typeof cart)
    let htmlTemp = `
            <div class=${Styles.productDetails}>
            <input type="text" class=${Styles.input} name="title" id="" placeholder='Product name'/>
            <input type="text" class=${Styles.input} name="id" id="" placeholder='Product Id' />
            <input type="number" class=${Styles.input} name="qty" id="" placeholder='Product quantity' />
            <input type="number" class=${Styles.input} name="price" id="" placeholder='Product Price' />
            
            <AiOutlinePlusCircle class=${Styles.addIcon}/>
            </div>`
    const addDiv = () => {
        const id = document.getElementById('product')
        id.insertAdjacentHTML('afterend', htmlTemp)

    }
    return (
        <div className={Styles.container}>
            <div className={Styles.leftSide}>

            {/* What is Unhandled Runtime Error: Which return cart.map is not a function*/}
         {cart.product && cart.product.map(element => {
            <CartItem product = {element} key={element.cardCode} keyValue = {element.cardCode}/>
            
         })}
            </div>
            <div className={Styles.rightSide}>
                <div>
                    <h4 className={Styles.heading}>Buy Product</h4>
                    <div className={Styles.productDetails} id='product'>
                        <input type="text" className={Styles.input} name="title" id="" placeholder='Product name' onChange={onChange} />
                        <input type="text" className={Styles.input} name="id" id="" placeholder='Product Id' onChange={onChange} />
                        <input type="number" className={Styles.input} name="qty" id="" placeholder='Product quantity' onChange={onChange} />
                        <input type="number" className={Styles.input} name="price" id="" placeholder='Product Price' onChange={onChange} />

                        <AiOutlinePlusCircle className={Styles.addIcon} onClick={addDiv} />
                    </div>

                    <div className={Styles.productDetails} id='product'>
                    <input type="text" className={Styles.input} name="title" id="" placeholder='Product name' onChange={onChange} />
                    <input type="text" className={Styles.input} name="id" id="" placeholder='Product Id' onChange={onChange} />
                    <input type="number" className={Styles.input} name="qty" id="" placeholder='Product quantity' onChange={onChange} />
                    <input type="number" className={Styles.input} name="price" id="" placeholder='Product Price' onChange={onChange} />

                    <AiOutlinePlusCircle className={Styles.addIcon} onClick={addDiv} />
                </div>



                    <button type="submit" onClick={addtoCart}>Save</button>
                    <button type="submit" onClick={handleClick}>Show Product</button>

                </div>
            </div>
        </div>
    )
}

export default Home