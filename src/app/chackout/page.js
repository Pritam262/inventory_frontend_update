"use client"
import React, { useContext, useState } from 'react';
import ProductContext from '@/app/context/ProductContext';
import Styles from "@/app/styles/chackout.module.css"

function Page() {
  const context = useContext(ProductContext);
  const { cartList, subTotal, addSellsProduct } = context;
  const [selectedPayment, setSelectedPayment] = useState('');
  const [cashAmount, setCashAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handlePaymentModeChange = (event) => {
    setSelectedPayment(event.target.value);
  };


  const handlePayNow = async () => {
    if (selectedPayment === 'cash') {
      let orderId = (Number(Date.now() * 100).toString())
      if (cashAmount > subTotal) {

        // Calculate the return amount
        const returnAmount = cashAmount - subTotal;

        // console.log(orderId)

        try {
          // Save cartList, subTotal, and returnAmount to MongoDB database

          await addSellsProduct(cartList, cashAmount, subTotal, returnAmount, selectedPayment, orderId);

          // console.log('Saving to MongoDB:', cartList, subTotal, returnAmount);
        } catch (error) {
          console.error('Failed to save sells product:', error);
        }
      }
      else if (cashAmount === subTotal) {

        const returnAmount = cashAmount - subTotal;

        try {
          // Save cartList, subTotal, and returnAmount to MongoDB database
          await addSellsProduct(cartList, cashAmount, subTotal, returnAmount, selectedPayment, orderId);
          // console.log('Saving to MongoDB:', cartList, subTotal,cashAmount);
        } catch (error) {
          console.error('Failed to save sells product:', error);
        }
      }
    } else if (selectedPayment === 'online') {
      // Redirect to Razorpay payment gateway
      console.log('Redirecting to Razorpay payment gateway...');
    }
  };




  return (
    <div className={Styles.main}>
      <div className={Styles.container}>
        <h4 className={Styles.title}><strong>Your pay amount is:</strong> {subTotal}</h4>

        <div className={Styles.paymentOption}>
          <span className={Styles.inputType}>

            <input
              type="radio"
              id="contactChoice1"
              name="paymentMode"
              value="cash"
              checked={selectedPayment === 'cash'}
              onChange={handlePaymentModeChange}
            />
            <label htmlFor="contactChoice1">Cash</label>

          </span>
          <span className={Styles.inputType}>



            <input
              type="radio"
              id="contactChoice2"
              name="paymentMode"
              value="online"
              checked={selectedPayment === 'online'}
              onChange={handlePaymentModeChange}
            />
            <label htmlFor="contactChoice2">Online</label>
          </span>

        </div>

        {selectedPayment === 'cash' && (
          <>
            <input
              type="number"
              name="cashAmount"
              value={cashAmount}
              onChange={(event) => setCashAmount(event.target.value)}
              placeholder="Enter cash amount"
              className={Styles.inputPayamount}
            />
            {cashAmount < subTotal && <p style={{ color: 'red' }}>Cash amount should be equal to or greater than the subTotal.</p>}
          </>
        )}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button onClick={handlePayNow} className={Styles.payNowBtn}>Pay Now</button>
      </div>
    </div>
  );
}

export default Page;