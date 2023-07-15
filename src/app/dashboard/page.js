"use client"
import React, { useState } from 'react'
import Styles from "../styles/dashboard.module.css"
import Common from "../styles/common.module.css"
import Addproduct from '../../../components/Addproduct';
import Inventory from '../../../components/Inventory';
import Sells from '../../../components/Sells';
// import { useRouter } from 'next/navigation';
function page() {
  const [activeMenu, setActiveMenu] = useState("inventory");
  // const router = useRouter();

  const handleClick = (componentName) => {
    setActiveMenu(componentName);

    // router.push(`/dashboard/${componentName.toLowerCase()}`);
  };
  return (
 <div>

      {/* Dashboard main div */}
      <div className={Styles.main}>
        {/* Dashboard menu start */}
        <div className={`${Styles.dash_navbar}`}>
          <ul className={`${Common.ul_none} `}>
            <li className={`${Styles.li} ${activeMenu === 'addProduct' ? Styles.active : ''}`} onClick={() => handleClick("addProduct")}>
              Add product
            </li>
            <li className={`${Styles.li} ${activeMenu === 'inventory' ? Styles.active : ''}`} onClick={() => handleClick("inventory")}>
              Inventory
            </li>
            <li className={`${Styles.li} ${activeMenu === 'sells' ? Styles.active : ''}`} onClick={() => handleClick("sells")}>
              Sells
            </li>
          </ul>
        </div>
        {/* Dashboard right side div */}
        <div>
          {activeMenu === "addProduct" && <Addproduct key="addProduct" />}
          {activeMenu === "inventory" && <Inventory key="inventory" />}
          {activeMenu === "sells" && <Sells key="sells" />}
        </div>
      </div>
 </div>
   
  );
}
export default page