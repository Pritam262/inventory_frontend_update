"use client"
import React, { useState } from 'react'
import Styles from "../styles/dashboard.module.css"
import Common from "../styles/common.module.css"
import Link from 'next/link'
function page() {
  return (
    <>
    <div className={`${Styles.dash_navbar} ${Common.ai_c} ${Common.df}`}>
    <ul className={`${Common.ul_none} ${Common.df}`}>
    <Link href="/dashboard/addproduct"> 
    <li className={Styles.li} >Add product</li>
    
    </Link>
    <Link href="/dashboard/inventory">
    <li className={Styles.li}>Inventory</li>
    </Link>
      <li className={Styles.li}>Sells</li>
    </ul>
    </div>


    </>
  )
}

export default page