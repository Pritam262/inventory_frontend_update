"use client"
import ProductContext from "./ProductContext";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

const ProductState = ({ children }) => {
  const router = useRouter();
  const host = "http://localhost:3000"
  // const productInitial = []
  const [products, setproducts] = useState([])

  const [subTotal, setSubTotal] = useState(0);
  const [cartList, setCartList] = useState([{ title: "", id: "", qty: "", price: "" }]);
  const [cartItem, setCartItem] = useState([]);
  const [authToken, setAuthToken] = useState('');
  const [salesData, setSalesData] = useState([]);
  // const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");

  // console.log(products)

  // User Login
  const logIn = async (email, password)=>{
    const response = await fetch(`${host}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password})
    });
    const authtoken = await response.json()

    localStorage.setItem("auth-token",authtoken.authtoken)
    
    router.push('/');
    

  }


  // User sign up

  const signUp = async (name, email, password, address  )=>{
    const response = await fetch(`${host}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email, password, address  })
    });
    const authtoken = await response.json()
    localStorage.setItem("auth-token",authtoken.authtoken)
    
    router.push('/');
    // window.location.reload()
  }

  // Get all products
  const getProducts = async () => {
    // API Call 
    const response = await fetch(`${host}/api/product/fetchallproduct`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("auth-token")
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
        'auth-token': localStorage.getItem("auth-token")
      },
      body: JSON.stringify([{ title, id, qty, unit, price }])

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
        'auth-token': localStorage.getItem("auth-token")
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
        'auth-token': localStorage.getItem("auth-token")
      },
      body: JSON.stringify([{ title, id, qty, unit, price }])
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

  // // Add a sells product
  // const addSellsProduct = async (cartList,cashAmount,subTotal,returnAmount) => {
  //   // TODO: API Call
  //   // API Call 
  //   const response = await fetch(`${host}/api/sells/addproduct`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1OTM5ZTcwODA1ODNkMTY4ZTA0NGVkIn0sImlhdCI6MTY4MzU2OTEyN30.smEdVJQ2Fc2fL5SxrTYofEOcLy4OtoEaCQPn3ifCCzg'
  //     },
  //     body: JSON.stringify([{"productitem":cartList},{'totalprice':subTotal}, {'amount':cashAmount},{"returnamount":returnAmount}])


  //   });

  //   const product = await response.json();
  //   setproducts(products.concat(product))
  // }

  const addSellsProduct = async (cartList, cashAmount, subTotal, returnAmount,selectedPayment,orderId) => {
    try {
      const response = await fetch(`${host}/api/sells/addproduct`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem("auth-token")
        },
        body: JSON.stringify({
          product: cartList,
          paymenttype:selectedPayment,
          totalprice:subTotal,
          cashamount:Number(cashAmount),
          returnamount:returnAmount,
          orderid:orderId
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add sells product');
      }

      const data = await response.json();
      // console.log('Sells product added:', data);
    } catch (error) {
      throw new Error(error.message);
    }

    
    
    
  };

  // Get sells data between two date

  const rangeSellData = async (startDate, endDate) => {
    const stDate = startDate; // Replace with your desired start date
    const enDate = endDate; // Replace with your desired end date

    try {
      const response = await fetch(`http://localhost:3000/api/sells/sellsbardata?startDate=${startDate}&endDate=${endDate}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem("auth-token")
        },
      });
      const data = await response.json()
      
      setSalesData(data);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <ProductContext.Provider value={{ products, getProducts, addProduct, deleteProduct, editProduct, setSubTotal, subTotal, setCartList, cartList, setCartItem, cartItem, addSellsProduct, logIn, signUp, authToken, setAuthToken,salesData, setSalesData, rangeSellData}}>
      {children}
    </ProductContext.Provider>
  )

}
export default ProductState;