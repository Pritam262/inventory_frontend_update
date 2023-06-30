"use client"
import React, { useState } from 'react'
import Styles from "@/app/styles/home.module.css"
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai"
import CartItem from './CartItem'
function Home() {
    const [product, setProduct] = useState({})
    const [cart, setCart] = useState([])
    const [subTotal, setSubTotal] = useState(0)
    const [cartList, setCartList] = useState([{ title: "", id: "", qty: "", price: "" }])
    const onChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })

        // console.log("Set product", product)
    }
    const handleClick = () => {
        const inputTagArray = [...cartList, cartList[0]]
        setCartList(inputTagArray)
        setCart(cart.concat(product))


    }
    const addtoCart = (e) => {

        // let myCart = cart;
        let cardCode = Number(Date.now().toString())
        // if(cardCode in cart){
        //     newCart[cardCode] = {title,id,qty:1,price}
        // }
        // else{
        //     newCart[cardCode] = {title,id,qty:1,price}
        // }
        e.preventDefault()
        setCart(cart.concat(product))
        localStorage.setItem(JSON.stringify(cardCode), JSON.stringify({ "productItem": cart},{"CardCode":cardCode}))
        setCart([])
        setProduct({})
        setCartList([{ title: "", id: "", qty: "", price: "" }])


        // console.log({ cardCode }, [{ product: cart.concat(product) }])

    }

    const data = JSON.parse(localStorage.getItem("1688149106394"))
    // console.log(data)

    // console.log("Cart List", cartList)
    // console.log("Cart", cart)



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

                    {/* Add dynamically input tag, which is write downn below */}
                    {cartList.map((singleProduct, index) => {
                        return (
                            <div className={Styles.productDetails} key={index}>
                                <input type="text" className={Styles.input} name="title" id="" placeholder='Product name' onChange={onChange} />
                                <input type="text" className={Styles.input} name="id" id="" placeholder='Product Id' onChange={onChange} />
                                <input type="number" className={Styles.input} name="qty" id="" placeholder='Product quantity' onChange={onChange} />
                                <input type="number" className={Styles.input} name="price" id="" placeholder='Product Price' onChange={onChange} />
                                <AiOutlineMinusCircle className={Styles.addIcon} />

                                {cartList.length - 1 === index && <AiOutlinePlusCircle className={Styles.addIcon} onClick={handleClick} />}


                            </div>
                        )
                    })}
                    {/* On submit create an state which store all the created input tag's value   like {cardcode:Date.now().toString(), product:{{{ title: "product1", id: "1", qty: "1", price: "1" },{ title: "product2", id: "2", qty: "2", price: "3" }}}  */}

                    <button type="submit" onClick={addtoCart}>Save</button> <br />
                </form>

            </div>
        </div>
    )
}

export default Home