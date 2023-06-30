"use client"
import React, { useState } from 'react'
import Styles from "@/app/styles/home.module.css"
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai"
import CartItem from './CartItem'
function Home() {
    const [product, setProduct] = useState([])
    const [cart, setCart] = useState({})
    const [subTotal, setSubTotal] = useState(0)
    const [cartList, setCartList] = useState([{ title: "", id: "", qty: "", price: "" }])
    const onChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
        // console.log("Set product", product)
    }
    const handleClick = () => {
        console.log("My cart", cart)
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
        setCart([{ product, cardCode: cardCode }])
        console.log(cardCode)

    }
    // console.log("Cart", cart, Date.now().toString())
    // console.log("Type of cart.map", typeof cart)
console.log("Cart List", cartList)
    return (
        <div className={Styles.container}>
            <div className={Styles.leftSide}>

                {/* What is Unhandled Runtime Error: Which return cart.map is not a function*/}
                {cart.product && cart.product.map(element => {
                    <CartItem product={element} key={element.cardCode} keyValue={element.cardCode} />

                })}
            </div>
            <div className={Styles.rightSide}>
                <form autoComplete='off' className={Styles.addCart}>
                    <h4 className={Styles.heading}>Buy Product</h4>

                    <button type="submit" onClick={handleClick}>Add product</button>
                    {/* Add dynamically input tag, which is write downn below */}
                    {cartList.map((singleProduct, index) => {
                        <div className={Styles.productDetails} key={index}>
                            <input type="text" className={Styles.input} name="title" id="" placeholder='Product name' onChange={onChange} />
                            <input type="text" className={Styles.input} name="id" id="" placeholder='Product Id' onChange={onChange} />
                            <input type="number" className={Styles.input} name="qty" id="" placeholder='Product quantity' onChange={onChange} />
                            <input type="number" className={Styles.input} name="price" id="" placeholder='Product Price' onChange={onChange} />
                            <AiOutlineMinusCircle className={Styles.addIcon} />
                            <AiOutlinePlusCircle className={Styles.addIcon} />

                        </div>
                    })}

                    <button type="submit" >Save</button> <br />
                </form>

            </div>
        </div>
    )
}

export default Home