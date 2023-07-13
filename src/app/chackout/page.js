"use client"
import React, { useContext, useState } from 'react';
import ProductContext from '@/app/context/ProductContext';

function Page() {
  const context = useContext(ProductContext);
  const { cartList, subTotal } = context;
  const [selectedPayment, setSelectedPayment] = useState('');
  const [cashAmount, setCashAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handlePaymentModeChange = (event) => {
    setSelectedPayment(event.target.value);
  };

  const handlePayNow = () => {
    if (selectedPayment === 'cash') {
      if (cashAmount === subTotal) {
        // Save cartList and subTotal to MongoDB database
        console.log('Saving to MongoDB:', cartList, subTotal);
      } else if (p > subTotal) {
        // Calculate the return amount
        const returnAmount = cashAmount - subTotal;
  
        // Save cartList, subTotal, and returnAmount to MongoDB database
        console.log('Saving to MongoDB:', cartList, subTotal, returnAmount);
      } else {
        setErrorMessage('Cash amount should be equal to or greater than the subTotal.');
      }
    } else if (selectedPayment === 'online') {
      // Redirect to Razorpay payment gateway
      console.log('Redirecting to Razorpay payment gateway...');
    }
  };

  return (
    <div>
      <div>
        <h4>Your pay amount is: {subTotal}</h4>
        <input
          type="radio"
          id="contactChoice1"
          name="paymentMode"
          value="cash"
          checked={selectedPayment === 'cash'}
          onChange={handlePaymentModeChange}
        />
        <label htmlFor="contactChoice1">Cash</label>

        <input
          type="radio"
          id="contactChoice2"
          name="paymentMode"
          value="online"
          checked={selectedPayment === 'online'}
          onChange={handlePaymentModeChange}
        />
        <label htmlFor="contactChoice2">Online</label>

        {selectedPayment === 'cash' && (
          <>
            <input
              type="number"
              name="cashAmount"
              value={cashAmount}
              onChange={(event) => setCashAmount(event.target.value)}
              placeholder="Enter cash amount"
            />
            {cashAmount < subTotal && <p style={{ color: 'red' }}>Cash amount should be equal to or greater than the subTotal.</p>}
          </>
        )}
      </div>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button onClick={handlePayNow}>Pay Now</button>
    </div>
  );
}

export default Page;