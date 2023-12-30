'use client'
import React,{useContext, useState} from 'react';
import Style from '@/app/styles/dashboard.module.css'
import ProductContext from '@/app/context/ProductContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function page() {
    const context = useContext(ProductContext);
    const {addProduct,theme, userTheme} = context;
    const [product, setProduct] = useState({protitle: "", proid: "", proqty: "", prounit: "", proprice: "" });
    const handleClick = async (e) => {
        e.preventDefault();
      const response = await addProduct(product.protitle, product.proid, product.proqty, product.prounit, product.proprice);
      if(response && response.status === 200){
          toast.success('Product add Successfully', {
              position: toast.POSITION.TOP_CENTER
          });
          setProduct({ protitle: "", proid: "", proqty: "", prounit: "", proprice: "" })

      }else{
        toast.success(`${response.statusText}`, {
            position: toast.POSITION.TOP_CENTER
        });
      }
        
      }
      const onChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
      }

      const fontColor = (theme === "system") ? userTheme() === 'dark' ? "#1C1C1C" : "#000" : (theme === 'dark') ? "#1C1C1C" : "#000";
      const backColor = (theme === "system") ? userTheme() === 'dark' ? "#d5d5d5" : "#D8D8D8" : (theme === 'dark') ? "#d5d5d5d" : "#D8D8D8";
    return (
        <div className={Style.addProductComponent} style={{ backgroundColor: backColor}}>
            <div className={Style.form}>
                <div className={Style.input_container}>
                    <input className={Style.inputField} type="text" name="protitle" id="" required value={product.protitle} onChange={onChange}/>
                    <label  className={Style.label} htmlFor="" style={{backgroundColor:backColor}}>Product name</label>
                </div>
                {/* <input className={Style.inputField} type="text" name="title" id="" placeholder='Product Name'color='pink'/> */}
                <div className={Style.input_container}>
                    <input className={Style.inputField} type="number" name="proid" id="" required value={product.proid} onChange={onChange}/>
                    <label  className={Style.label} htmlFor="" style={{backgroundColor:backColor}}>Product ID</label>
                </div>
                <div className={Style.input_container}>
                    <input className={Style.inputField} type="text" name="prounit" id="" required value={product.prounit} onChange={onChange}/>
                    <label  className={Style.label} htmlFor="" style={{backgroundColor:backColor}}>Product Unit</label>
                </div>
                <div className={Style.input_container}>
                    <input className={Style.inputField} type="number" name="proqty" id="" required value={product.proqty} onChange={onChange}/>
                    <label  className={Style.label} htmlFor="" style={{backgroundColor:backColor}}>Product Quentity</label>
                </div>
                <div className={Style.input_container}>
                    <input className={Style.inputField} type="number" name="proprice" id="" required value={product.proprice} onChange={onChange}/>
                    <label  className={Style.label} htmlFor="" style={{backgroundColor:backColor}}>Product Price</label>
                </div>

                <button type="submit" className={Style.addSubBtn} onClick={handleClick}>Submit</button>
            </div>
            <ToastContainer/>
        </div>
    )
}

