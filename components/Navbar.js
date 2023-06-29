import Link from 'next/link'
import React from 'react'
import Styles from "../src/app/styles/navbar.module.css"
import Common from "../src/app/styles/common.module.css"
function Navbar() {
    return (
        <nav className={Styles.navbar}>
            <div className="logo">Logo</div>
            <ul className={`${Common["df"]} ${Common["jc_sb"]} ${Common["wh_30"]} ${Styles.ul}`}>
                <li>
                <Link href="/dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link href="/contact">Contact</Link>
                </li>
                <li><Link href="/logout">Logout</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar