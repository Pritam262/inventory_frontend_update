"use client"
import React, { useState,useContext } from 'react';
import Styles from "../styles/dashboard.module.css";
import Common from "../styles/common.module.css";
import Addproduct from '../../../components/Addproduct';
import Inventory from '../../../components/Inventory';
import Sells from '../../../components/Sells';




function Page() {
  const [activeMenu, setActiveMenu] = useState("inventory");
  // const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");
  const [showSells, setShowSells] = useState(false);
  // const context = useContext(ProductContext)
  // const { startDate,setStartDate,endDate,setEndDate} = context

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");



  const handleClick = (componentName) => {
    setActiveMenu(componentName);
  };

  const handleSellsSubmenuClick = (submenuOption) => {
    setActiveMenu(submenuOption);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleBtnClick = () => {
    setShowSells(true);
  };

  return (
    <div>
      {/* Dashboard main div */}
      <div className={Styles.main}>
        {/* Dashboard menu start */}
        <div className={`${Styles.dash_navbar}`}>
          <ul className={`${Common.ul_none}`}>
            <li className={`${Styles.li} ${activeMenu === "addProduct" ? Styles.active : ""}`} onClick={() => handleClick("addProduct")}>
              Add product
            </li>
            <li className={`${Styles.li} ${activeMenu === "inventory" ? Styles.active : ""}`} onClick={() => handleClick("inventory")}>
              Inventory
            </li>
            <li className={`${Styles.li} ${activeMenu === "sells" ? Styles.active : ""}`}>
              <span onClick={() => handleClick("sells")}>Sells</span>
              {activeMenu === "sells" && (
                <ul className={`${Common.ul_none}`}>
                  <li className={`${Styles.li} ${activeMenu === "allData" ? Styles.active : ""}`} onClick={() => handleSellsSubmenuClick("allData")}>
                    All Data
                  </li>
                  <li className={`${Styles.li} ${activeMenu === "range" ? Styles.active : ""}`} onClick={() => handleSellsSubmenuClick("range")}>
                    Range
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
        {/* Dashboard right side div */}
        <div>
          {activeMenu === "addProduct" && <Addproduct key="addProduct" />}
          {activeMenu === "inventory" && <Inventory key="inventory" />}
      {activeMenu === "range" && (
        <div>
          <input type="date" value={startDate} onChange={handleStartDateChange} />
          <input type="date" value={endDate} onChange={handleEndDateChange} />
          <button type="submit" onClick={handleBtnClick}>Submit</button>
        </div>
      )}
          {showSells && <Sells key="range" props ={{startDate, endDate}} />}
        </div>
      </div>
    </div>
  );
}

export default Page;