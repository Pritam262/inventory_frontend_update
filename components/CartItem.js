import React from 'react'

function CartItem(cart, keyValue) {
    let product = cart.product;
  return (
    <div>
    <p>{product.title}</p> <br />
    <p>{product.id}</p> <br />
    <p>{product.qty}</p>
    <p>{product.price}</p>
    
    </div>
  )
}

export default CartItem