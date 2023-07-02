"use client"
import React, { useState } from 'react'
import Styles from "@/app/styles/home.module.css"
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai"
import CartItem from './CartItem'
function Home() {
  

    const [subTotal, setSubTotal] = useState(0)

    const [cartList, setCartList] = useState([{ title: "", id: "", qty: "", price: "" }])

    const handleChange = (index, event) => {
        const values = [...cartList];
        values[index][event.target.name] = event.target.value
       
        setCartList(values)

    }

const removeInputList = (index)=>{
    const values = [...cartList];
    values.splice(index,1);
    setCartList(values)
}

const addInputList = (e)=>{
    e.preventDefault()
setCartList([...cartList,{ title: "", id: "", qty: "", price: "" }])
}


// const handleSubmit = ()=>{
    
//     let cartCode = Number(Date.now().toString())
//     // setCartList({cartCode,cartList})
// console.log(cartList.length)
// console.log(cartList)
//     for (let i = 0; i < cartList.length; i++) {
//         const element = cartList[i];
//         console.log("Element", i, element)
//        if (element, i){
            
//             const boll =element.title.length>1 && element.id.length>1 && element.qty.length>1 && element.price.length>1
//             // console.log("Element price length",element.price.length)
//             // console.log("Value of bool", boll)
//             if(boll=== true && cartList[i]){
//                 localStorage.setItem(JSON.stringify(cartCode), JSON.stringify({cartCode,cartList}))
//                 console.log({cartCode, cartList})
//                 setCartList([{ title: "", id: "", qty: "", price: "" }])
//             }
//             else{
//                 console.error("Fill every fiels")
//             }
//         }
//         else(console.log("Element is not available"))

//     }
    
//     // localStorage.setItem(JSON.stringify(cartCode), JSON.stringify({cartCode,cartList}))
//     // console.log({cartCode, cartList})

// }



const handleSubmit = () => {
    let cartCode = Number(Date.now().toString());
    console.log(cartList.length);
    console.log(cartList);
  
    let allFieldsValid = true; // Flag to track if all fields are valid
  
    for (let i = 0; i < cartList.length; i++) {
      const element = cartList[i];
    //   console.log("Element", i, element);
  
      const isFieldValid =
        element.title.length > 1 &&
        element.id.length > 1 &&
        element.qty.length > 1 &&
        element.price.length > 1;
  
      if (!isFieldValid) {
        allFieldsValid = false;
        console.error("Fill every field");
        break; // Exit the loop if any field is invalid
      }
    }
  
    if (allFieldsValid) {
      localStorage.setItem(
        JSON.stringify(cartCode),
        JSON.stringify({ cartCode, cartList })
      );
      console.log({ cartCode, cartList });
      setCartList([{ title: "", id: "", qty: "", price: "" }]);
    }
  };

const getData = (key)=>{
    let data =JSON.parse(localStorage.getItem(key))
    console.log("Cart data",data)

}


return (
        <div className={Styles.container}>
            <div className={Styles.leftSide}>

                {/* What is Unhandled Runtime Error: Which return cart.map is not a function*/}

                { /*  {cart.product && cart.product.map(element => {
                    <CartItem product={element} key={element.cardCode} keyValue={element.cardCode} />

                })}
                */
                }


            </div>
            <div className={Styles.rightSide}>
                <form autoComplete='off' className={Styles.addCart} >
                    <h4 className={Styles.heading}>Buy Product</h4>

                    {/* Add dynamically input tag, which is write downn below */}
                    {cartList.map((singleProduct, index) => {
                        return (
                            <div className={Styles.productDetails} key={index}>
                                <input type="text" className={Styles.input} name="title" id="" placeholder='Product name' onChange={event => handleChange(index, event)} value={singleProduct.title} required/>
                                <input type="text" className={Styles.input} name="id" id="" placeholder='Product Id' onChange={event => handleChange(index, event)} value={singleProduct.id} required/>
                                <input type="number" className={Styles.input} name="qty" id="" placeholder='Product quantity' onChange={event => handleChange(index, event)} value={singleProduct.qty} required/>
                                <input type="number" className={Styles.input} name="price" id="" placeholder='Product Price' onChange={event => handleChange(index, event)} value={singleProduct.price} required/>
                                <AiOutlineMinusCircle className={Styles.addIcon} onClick={()=>removeInputList()}/>

                                

                              
                                    {cartList.length - 1 === index && <AiOutlinePlusCircle className={Styles.addIcon} onClick={addInputList}/>}
                               


                            </div>
                        )
                    })}

                    <button type='submit' onClick={()=>handleSubmit()}>Save</button> <br />
                    <button type="button" onClick={()=>getData(1688205053723)}>Get Data</button>

                    
                </form>

            </div>
        </div>
    )
}

export default Home