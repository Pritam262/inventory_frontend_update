"use client"
import React, { useContext, useEffect, useState } from 'react';
import Styles from "@/app/styles/home.module.css";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import CartItem from './CartItem';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import ProductContext from '@/app/context/ProductContext';
function Home() {
  // const host = "http://localhost:3000"
  const context = useContext(ProductContext)
  const {subTotal,setSubTotal,cartList,setCartList,cartItem,setCartItem} = context
  // Declare the default variable with its value

  // const [subTotal, setSubTotal] = useState(0);
  // const [cartList, setCartList] = useState([{ title: "", id: "", qty: "", price: "" }]);
  // const [cartItem, setCartItem] = useState([]);

  const [orderId, setOrderId] = useState('');
  const [paymentId, setPaymentId] = useState('');
  const [signature, setSignature] = useState('');

  // This function will update the cartList onChane

  const handleChange = (index, event) => {
    const values = [...cartList];
    values[index][event.target.name] = event.target.value;
    setCartList(values);

  };


  // This function revove the current cartList using the onClick index value

  const removeInputList = (index) => {
    const values = [...cartList];
    values.splice(index, 1);
    setCartList(values);
    updateTotalPrice(values)

    toast.success(`Remove ${index +1} no. cartList !`, {
      position: toast.POSITION.TOP_CENTER
  });


  };

  // This function add the CartList

  const addInputList = (e) => {
    e.preventDefault();
    setCartList([...cartList, { title: "", id: "", qty: "", price: "" }]);
  };

  // This function will be update the SubTotal value

  const updateTotalPrice = (cartList) => {
    let total = 0;
    for (let i = 0; i < cartList.length; i++) {
      const element = cartList[i];
      if (element.qty > 0 && element.price > 0) {
        const itemPrice = element.qty * element.price;
        total += itemPrice;
      }
    }
    setSubTotal(total);
  };

  // This function will update the SubTotal value using the updateTotalPrice function which is call every cartList update time
  useEffect(() => {
    updateTotalPrice(cartList)


  }, [cartList])




  // This function work for Save the cartList in localStorage with curtCode which is currentTime

  const handleSubmit = () => {


    let totalPrice = 0;
    for (let i = 0; i < cartList.length; i++) {
      const element = cartList[i];

      if (
        element.title.length > 0 &&
        element.id.length > 0 &&
        element.qty > 0 &&
        element.price > 0
      ) {
        const itemPrice = element.qty * element.price;
        totalPrice += itemPrice;
      } else {
        console.error("Please fill in all fields for item", i + 1);
        return;
      }
    }

    const cartCode = Number(Date.now().toString());
    const cartData = { cartCode, cartList, totalPrice };

    localStorage.setItem(cartCode.toString(), JSON.stringify(cartData));
    setCartList([{ title: "", id: "", qty: "", price: "" }]);

    // Update cartItem state with the new cartCode and totalPrice
    setCartItem([...cartItem, { cartCode, totalPrice }]);
    toast.success(`Product add in your localStorage !`, {
      position: toast.POSITION.TOP_CENTER
  });
  };


  // Get all the storage data which key length >= 12 and set the cartItem


  const getStorageData = () => {
    const keys = Object.keys(localStorage);
    const filteredKeys = keys.filter((key) => key.length >= 12 && !isNaN(Number(key)));

    const data = filteredKeys.map((key) => {
      const value = JSON.parse(localStorage.getItem(key));
      return { cartCode: value.cartCode, totalPrice: value.totalPrice };
    });

    // console.log("Cart data", data);
    setCartItem(data);
  };



  // GetStorageData on every time

  useEffect(() => {
    getStorageData();
  }, []);


  // This function use for payment

  const handlePayNow = async () => {
    for (let i = 0; i < cartList.length; i++) {
      const element = cartList[i];

      if (
        element.title.length > 0 &&
        element.id.length > 0 &&
        element.qty > 0 &&
        element.price > 0
      ) {
        
    setCartList(cartList,subTotal)
    // console.log("Cart List", cartList)
      } else {
        console.error("Please fill in all fields for item", i + 1);
        return;
      }
    }

  };
  

  return (
    <div className={Styles.container}>

      <div className={Styles.leftSide}>
        {/* Show the cart Item in the left site */}
        {cartItem.map((item) => (
          <CartItem  key={item.cartCode} cartCode={item.cartCode} totalPrice={item.totalPrice} setCartList={setCartList} getStorageData={getStorageData}/>
        ))}
      </div>

      <div className={Styles.rightSide}>
        <form autoComplete="off" className={Styles.addCart}>
          <h4 className={Styles.heading}>Buy Product</h4>

          {/* Show the add cartList input field */}

          {cartList.map((singleProduct, index) => {
            return (
              <div className={Styles.productDetails} key={index}>
                <input
                  type="text"
                  className={Styles.input}
                  name="title"
                  placeholder="Product name"
                  onChange={(event) => handleChange(index, event)}
                  value={singleProduct.title}
                  required
                />
                <input
                  type="text"
                  className={Styles.input}
                  name="id"
                  placeholder="Product Id"
                  onChange={(event) => handleChange(index, event)}
                  value={singleProduct.id}
                  required
                />
                <input
                  type="number"
                  className={Styles.input}
                  name="qty"
                  placeholder="Product quantity"
                  onChange={(event) => handleChange(index, event)}
                  value={singleProduct.qty}
                  required
                />
                <input
                  type="number"
                  className={Styles.input}
                  name="price"
                  placeholder="Product Price"
                  onChange={(event) => handleChange(index, event)}
                  value={singleProduct.price}
                  required
                />

                {cartList.length > 1 && (
                  <AiOutlineMinusCircle className={Styles.icon} onClick={() => removeInputList(index)} />
                )}



                {cartList.length - 1 === index && <AiOutlinePlusCircle className={Styles.icon} onClick={addInputList} />}
              </div>
            );
          })}

          <div className={Styles.buttonOption}>
            <button type="submit" className={Styles.button} onClick={() => handleSubmit()}>
              Save
            </button> <br />
            <Link href={'/chackout'}>

            <button type="button" className={Styles.button} onClick={handlePayNow} disabled={subTotal === 0}>
              {subTotal > 0 ? `Pay Now: ${subTotal}` : "Pay Now"}
            </button>
            </Link>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Home;
