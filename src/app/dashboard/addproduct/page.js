"use client"
import React, { useState, useContext } from 'react'
import Styles from "../../styles/dashboard.module.css"
import Common from "../../styles/common.module.css"
import ProductContext from '@/app/context/ProductContext'
function page() {
  const context = useContext(ProductContext)
  const { addProduct } = context;
  const [product, setProduct] = useState({ title: "", id: "", qty: "", unit: "", price: "" })
  console.log("Console product on addProduct: ", product)
  // const [addHiden, setAddHiden] = useState('block')
  // const hidenOnclick= ()=>{
  //   if(addHiden === "block"){
  //     setAddHiden('hidden')
  //     console.log("Display hidden")
  //   }else{
  //     setAddHiden('block')
  //     console.log("Display block")
  //   }
  // }
  const handleClick = (e) => {
    e.preventDefault();
    addProduct(product.title, product.id, product.qty, product.unit, product.price)
    setProduct({ title: "", id: "", qty: "", unit: "", price: "" })
  }
  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }
  return (
    <>
      <div className={` ${Styles.main}`}>
        <div className={Styles.container}>
          <div className={Styles.box_container}>
            <div>
              <h2>Add Product</h2>
            </div>
            <div className={Styles.input_Container}>
              <input className={Styles.input} name='title' id='title' type="text" placeholder='Enter your product name' value={product.title} onChange={onChange} />
              <input className={Styles.input} name='id' id='id' type="number" placeholder='Enter your product id' value={product.id} onChange={onChange} />
              <input className={Styles.input} type="text" name='unit' id='unit' placeholder='Enter your product unit' value={product.unit} onChange={onChange} />
              <input className={Styles.input} name='qty' id='qty' type="number" placeholder='Enter your product quentity' value={product.qty} onChange={onChange} />
              <input className={Styles.input} type="number" name='price' id='price' placeholder='Enter your product price' value={product.price} onChange={onChange} />
            </div>
            <button type="submit" className={Styles.btn} onClick={handleClick}>Add product</button>
          </div>

        </div>
      </div>





    </>
  )
}

export default page