"use client"
import ProductContext from "./ProductContext";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

const ProductState = ({ children }) => {
  const router = useRouter();
  // const host = "http://13.48.56.199"
  const host = "http://127.0.0.1:3000"
  // const productInitial = []
  const [products, setproducts] = useState([])

  const [subTotal, setSubTotal] = useState(0);
  const [cartList, setCartList] = useState([{ title: "", id: "", qty: "", price: "" }]);
  const [cartItem, setCartItem] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [theme, setTheme] = useState('');
  const [transections, setTransections] = useState([]);

  const [user, setUser] = useState([]);

  // const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");

  // console.log(products)

  const getUser = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/api/auth/getuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token')
        }
      });
      const data = await response.json();
      // console.log('User data Product State', data);
      localStorage.setItem('user', JSON.stringify(data));
    } catch (error) {

    }
  }
  // User Login
  const logIn = async (email, password) => {
    const response = await fetch(`${host}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });
    const authtoken = await response.json()

    if (response.status === 200) {
      localStorage.setItem("auth-token", authtoken.authtoken)
      setIsLogin(true);
      router.push('/');
      return response;
    }
    return response;


  }


  // User sign up

  const signUp = async (name, email, password, conPass, address) => {
    const response = await fetch(`${host}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, conPass, address })
    });

    const authtoken = await response.json()
    if (response.status === 200) {
      localStorage.setItem("auth-token", authtoken.authtoken)
      setIsLogin(true);
      router.push('/');
      return response;
    }
    return response;
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
  const addProduct = async (protitle, proid, proqty, prounit, proprice) => {
    const title = protitle; const id = parseInt(proid); const qty = parseInt(proqty); const unit = prounit; const price = parseFloat(proprice)
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
    setproducts(products.concat(product));
    return (response);
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

  const addSellsProduct = async (cartList, cashAmount, subTotal, returnAmount, selectedPayment, orderId) => {
    try {
      const response = await fetch(`${host}/api/sells/addproduct`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem("auth-token")
        },
        body: JSON.stringify({
          product: cartList,
          paymenttype: selectedPayment,
          totalprice: subTotal,
          cashamount: Number(cashAmount),
          returnamount: returnAmount,
          orderid: orderId
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
      const response = await fetch(`${host}/api/sells/sellsbardata?startDate=${startDate}&endDate=${endDate}`, {
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

  // Get all transection
  const getAllTransections = async (startDate, endDate) => {
    try {
      const response = await fetch(`${host}/api/transection/alltransection`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem("auth-token")
        }
      });
      const data = await response.json();
      setTransections(data);
    } catch (error) {
      console.log(error);
    }
  }

  // Get transection

  const getTransections = async (id) => {
    try {
      const response = await fetch(`${host}/api/transection/gettransection?id=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem("auth-token")
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  // Get transection Between two dates

  const getTransBtnDate = async (startDate, endDate) => {
    try {
      const response = await fetch(`${host}/api/transection/gettransection?startdate=${startDate}&enddate=${endDate}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem("auth-token")
        }
      });
      const data = await response.json();
      setTransections(data);
    } catch (error) {
      console.log(error);
    }
  }

  // Check user is login

  useEffect(() => {
    // Check if there's an "auth-token" in local storage to determine if the user is logged in
    const authToken = localStorage.getItem("auth-token");
    setIsLogin(!!authToken); // Set isLogin to true if authToken is present
    if (isLogin) {
      getUser();
    }
  }, [isLogin]);

  // check user theme
  const userTheme = () => {
    if (theme === 'system') {
      const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      const prefersLightMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;

      if (prefersDarkMode) {
        // System prefers dark mode
        localStorage.setItem('theme', 'system');
        return 'dark';
      } else if (prefersLightMode) {
        // System prefers light mode
        localStorage.setItem('theme', 'system')
        return 'light'
      }
      else {
        localStorage.setItem('theme', 'dark');
        return 'dark';
      }
    }
    else if (theme === 'dark') {
      return 'dark';
    }
    else {
      return 'light'
    }
  }

  //Set user theme 
  const setUserTheme = (theme) => {
    setTheme(theme);
    localStorage.setItem('theme', theme);
  }

  useEffect(() => {
    setTheme((localStorage.getItem('theme') === null) ? 'system' : localStorage.getItem('theme'));
    userTheme();
  }, [theme])


  return (
    <ProductContext.Provider value={{ products, getProducts, addProduct, deleteProduct, editProduct, setSubTotal, subTotal, setCartList, cartList, setCartItem, cartItem, addSellsProduct, logIn, signUp, salesData, setSalesData, rangeSellData, isLogin, setIsLogin, theme, setTheme, userTheme, setUserTheme, transections, setTransections, getAllTransections, getTransections, getTransBtnDate }}>
      {children}
    </ProductContext.Provider>
  )

}
export default ProductState;