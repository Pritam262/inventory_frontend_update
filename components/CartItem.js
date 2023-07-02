import React from 'react'

function CartItem(item, keyValue) {
    
  return (
    <div>
    <p>{keyValue}</p> <br />
    <p>{item.price}</p> <br />
   
    
    </div>
  )
}

export default CartItem