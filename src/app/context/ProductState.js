"use client"
import ProductContext from "./ProductContext";
import { useEffect, useState } from "react";

const ProductState = ({ children }) => {
  const host = "http://localhost:3000"
  // const productInitial = []
  const [products, setproducts] = useState([])

  const [subTotal, setSubTotal] = useState(0);
  const [cartList, setCartList] = useState([{ title: "", id: "", qty: "", price: "" }]);
  const [cartItem, setCartItem] = useState([]);

  // console.log(products)


  // Get all products
  const getProducts = async () => {
    // API Call 
    const response = await fetch(`${host}/api/product/fetchallproduct`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1OTM5ZTcwODA1ODNkMTY4ZTA0NGVkIn0sImlhdCI6MTY4MzU2OTEyN30.smEdVJQ2Fc2fL5SxrTYofEOcLy4OtoEaCQPn3ifCCzg'
      },
    });
    const data = await response.json()
    setproducts(data)
  }

// console.log("Type of getProducts in productState is: ", typeof getProducts)

  // getproducts();
  // Add a Note
  const addProduct = async (title, id, qty, unit, price) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/product/addproduct`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1OTM5ZTcwODA1ODNkMTY4ZTA0NGVkIn0sImlhdCI6MTY4MzU2OTEyN30.smEdVJQ2Fc2fL5SxrTYofEOcLy4OtoEaCQPn3ifCCzg'
      },
      body: JSON.stringify([{title, id, qty, unit, price }])
      
    });

    const product = await response.json();
    setproducts(products.concat(product))
  }

  // Delete a Note
  const deleteProduct = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/product/deleteproduct/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1OTM5ZTcwODA1ODNkMTY4ZTA0NGVkIn0sImlhdCI6MTY4MzU2OTEyN30.smEdVJQ2Fc2fL5SxrTYofEOcLy4OtoEaCQPn3ifCCzg'
      },
    });
    // eslint-disable-next-line
    const json = response.json();
    const newproducts = products.filter((product) => { return product._id !== id })
    setproducts(newproducts)
  }

  // Edit a Note
  const editProduct = async (title, id, qty, unit, price) => {
    // API Call 
    const response = await fetch(`${host}/api/product/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1OTM5ZTcwODA1ODNkMTY4ZTA0NGVkIn0sImlhdCI6MTY4MzU2OTEyN30.smEdVJQ2Fc2fL5SxrTYofEOcLy4OtoEaCQPn3ifCCzg'
      },
      body: JSON.stringify([{title, id, qty, unit, price }])
    });
    // eslint-disable-next-line
    const json = await response.json();

    let newproducts = JSON.parse(JSON.stringify(products))

    // Logic to edit in client
    for (let index = 0; index < newproducts.length; index++) {
      const element = newproducts[index];
      if (element._id === id) {
        newproducts[index].title = title;
        newproducts[index].description = description;
        newproducts[index].tag = tag;
        break;
      }
    }
    setproducts(newproducts);
  }

    // Add a sells product
    const addSellsProduct = async (cartList,subTotal,returnAmount) => {
      // TODO: API Call
      // API Call 
      const response = await fetch(`${host}/api/sells/addproduct`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1OTM5ZTcwODA1ODNkMTY4ZTA0NGVkIn0sImlhdCI6MTY4MzU2OTEyN30.smEdVJQ2Fc2fL5SxrTYofEOcLy4OtoEaCQPn3ifCCzg'
        },
        body: JSON.stringify([{"productlist":cartList},{'totalprice':subTotal}, {'amount':cashAmount},{"returnAmount":returnAmount}])
        
      });
  
      const product = await response.json();
      setproducts(products.concat(product))
    }

  return (
    <ProductContext.Provider value={{ products, getProducts, addProduct, deleteProduct, editProduct,setSubTotal, subTotal , setCartList, cartList,setCartItem,cartItem,addSellsProduct }}>
      {children}
    </ProductContext.Provider>
  )

}
export default ProductState;