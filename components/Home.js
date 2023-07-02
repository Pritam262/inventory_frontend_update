"use client"
import React, { useEffect, useState } from 'react';
import Styles from "@/app/styles/home.module.css";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import CartItem from './CartItem';

function Home() {
  const [subTotal, setSubTotal] = useState(0);
  const [cartList, setCartList] = useState([{ title: "", id: "", qty: "", price: "" }]);
  const [cartItem, setCartItem] = useState([]);

  const handleChange = (index, event) => {
    const values = [...cartList];
    values[index][event.target.name] = event.target.value;
    setCartList(values);
  };

  const removeInputList = (index) => {
    const values = [...cartList];
    values.splice(index, 1);
    setCartList(values);
  };

  const addInputList = (e) => {
    e.preventDefault();
    setCartList([...cartList, { title: "", id: "", qty: "", price: "" }]);
  };

  const handleSubmit = () => {
    if (cartList.length === 0) {
      console.error("Cart is empty");
      return;
    }

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

    console.log("Cart data saved to local storage:", cartData);

    setCartList([{ title: "", id: "", qty: "", price: "" }]);

    // Update cartItem state with the new cartCode and totalPrice
    setCartItem([...cartItem, { cartCode, totalPrice }]);
  };

  const getStorageData = () => {
    const keys = Object.keys(localStorage);
    const filteredKeys = keys.filter((key) => key.length >= 12 && !isNaN(Number(key)));

    const data = filteredKeys.map((key) => {
      const value = JSON.parse(localStorage.getItem(key));
      return { cartCode: value.cartCode, totalPrice: value.totalPrice };
    });

    console.log("Cart data", data);
    setCartItem(data);
  };

  useEffect(() => {
    getStorageData();
  }, []);

  return (
    <div className={Styles.container}>
      <div className={Styles.leftSide}>
        {cartItem.map((item) => (
          <CartItem key={item.cartCode} cartCode={item.cartCode} totalPrice={item.totalPrice} />
        ))}
      </div>
      <div className={Styles.rightSide}>
        <form autoComplete="off" className={Styles.addCart}>
          <h4 className={Styles.heading}>Buy Product</h4>

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
                <AiOutlineMinusCircle className={Styles.addIcon} onClick={() => removeInputList()} />

                {cartList.length - 1 === index && <AiOutlinePlusCircle className={Styles.addIcon} onClick={addInputList} />}
              </div>
            );
          })}

          <button type="submit" onClick={() => handleSubmit()}>
            Save
          </button> <br />
          <button type="button" onClick={getStorageData}>
            Get Data
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;
