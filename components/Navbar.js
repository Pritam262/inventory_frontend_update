'use client'
import Link from 'next/link';
import React, { useEffect,  useContext } from 'react';
import Styles from "../src/app/styles/navbar.module.css";
import Common from "../src/app/styles/common.module.css";
import { useRouter } from 'next/navigation';
import ProductContext from '@/app/context/ProductContext'

function Navbar() {
    const context= useContext(ProductContext)
    const {authToken, setAuthToken} = context
  const router = useRouter();
//   const [authToken, setAuthToken] = useState('');

  useEffect(() => {
    setAuthToken(localStorage.getItem('auth-token'));
  }, [authToken]);

  const logout = () => {
    localStorage.removeItem('auth-token');
    router.push('/login');
    window.location.reload()
  };

  return (
    <nav className={Styles.navbar}>
      <div className="logo">Logo</div>
      <ul className={`${Common['df']} ${Common['jc_sb']} ${Common['wh_30']} ${Styles.ul}`}>
        {authToken ? (
          <>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
                <Link href="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
