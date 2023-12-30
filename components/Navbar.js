'use client'
import Link from 'next/link';
import React, { useEffect, useContext, useState } from 'react';
import Styles from "../src/app/styles/navbar.module.css";
import Common from "../src/app/styles/common.module.css";
import { useRouter } from 'next/navigation';
import ProductContext from '@/app/context/ProductContext'
import Image from 'next/image';

function Navbar() {
  const context = useContext(ProductContext);
  const { isLogin, setIsLogin, theme, userTheme, setUserTheme } = context;
  const [isModelShow, setisModelShow] = useState(false);
  const router = useRouter();
  //   const [authToken, setAuthToken] = useState('');

  // useEffect(() => {
  //   setAuthToken(localStorage.getItem('auth-token'));
  // }, [authToken]);

  const logout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user');
    router.push('/login');
    setIsLogin(false);
  };

  //Showpoup model

  const handleModel = () => {
    setisModelShow((prev) => !prev);
  }
  // NavBack color
  const navBack = (theme === "system") ? userTheme() === 'dark' ? '#000' : '#cacaca' : (theme === 'dark') ? '#000' : "#cacaca";
  // NaveFont color
  const navFont = (theme === "system") ? userTheme() === 'dark' ? '#fff' : '#000' : (theme === 'dark') ? '#fff' : "#000";
  //Model back color
  const modelBack = (theme === "system") ? userTheme() === 'dark' ? '#000' : '#C0BFBF' : (theme === 'dark') ? '#000' : "#C0BFBF";
  //Model font color

  const modelFont = (theme === "system") ? userTheme() === 'dark' ? '#fff' : '#000' : (theme === 'dark') ? '#fff' : "#000";
  return (
    <nav style={{ backgroundColor: navBack, color: navFont }} className={Styles.navbar}>
      {/* <div className="logo">Logo</div> */}
      {(theme === "system") ? userTheme() === 'dark' ? <Image src='/logo_white_italic.png' width={100} height={25} alt='' priority /> : <Image src='/logo_black_italic.png' width={100} height={25} alt='' priority /> : (theme === 'dark') ? <Image src='/logo_white_italic.png' width={100} height={25} alt='' priority /> : <Image src='/logo_black_italic.png' width={100} height={25} alt='' priority />}

      <ul className={`${Common['df']} ${Common['jc_sb']} ${Common['wh_30']} ${Common['ai_c']} ${Styles.ul}`}>
        {/* If isLogin logic*/}
        {isLogin ? (
          <>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <button onClick={logout} className={Styles.btn} style={{ border: `1px solid ${navFont}`, color: navFont }}>Logout</button>
            </li>

            {/* <Image src='/settingIcon.png' width={10} height={20} alt='' priority onClick={handleModel}/> */}
          </>
        ) : (
          <>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <button className={Styles.btn} style={{ border: `1px solid ${navFont}` , color:navFont}} onClick={() => router.push("/login")}> Login</button>
              {/* <Link href="/login">Login</Link> */}
            </li>
          </>
        )}
{/* If isLogin logic end */}

        {(theme === "system") ? userTheme() === 'dark' ? <Image src='/settingIcon.png' width={10} height={20} alt='' priority onClick={handleModel} style={{ cursor: 'pointer' }} /> : <Image src='/settingIconBlack.png' width={10} height={20} alt='' priority onClick={handleModel} style={{ cursor: 'pointer' }} /> : (theme === 'dark') ? <Image src='/settingIcon.png' width={10} height={20} alt='' priority onClick={handleModel} style={{ cursor: 'pointer' }} /> : <Image src='/settingIconBlack.png' width={10} height={20} alt='' priority onClick={handleModel} style={{ cursor: 'pointer' }} />}

        {/* Theme selection */}
        <div className={isModelShow ? Styles.settingContainer : Styles.hidden} style={{ backgroundColor: modelBack, color: modelFont }}>
          <h5>User theme: {theme === 'system' ? `${userTheme()} ${theme}` : theme}</h5>
          <input type="radio" name="theme" id="" value='system' onChange={() => setUserTheme('system')} defaultChecked={theme === "system"} />
          <label htmlFor="system">System default</label>
          <br />
          <input type="radio" name="theme" id="dark" value='dark' checked={theme === "dark"} onChange={() => setUserTheme('dark')} />
          <label htmlFor="dark">Dark</label>
          <br />
          <input type="radio" name="theme" id="light" value='light' checked={theme === "light"} onChange={() => setUserTheme('light')} />
          <label htmlFor="light">Light</label>
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
