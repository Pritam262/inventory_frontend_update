'use client'
import { useState, useEffect, useContext } from 'react'
import Style from '@/app/styles/dashboard.module.css'
import Image from 'next/image'
import Link from 'next/link';
import ProductContext from '@/app/context/ProductContext';


export default function DashboardLayout({
    children, // will be a page or nested layout
}) {
    const [activeMenu, setActiveMenu] = useState('analysis');
    const [isClient, setIsClient] = useState(false);
    const handleClick = (componentName) => {
        setActiveMenu(componentName);
    };
    const context = useContext(ProductContext);
    const { theme, userTheme } = context;
    const fontColor = (theme === "system") ? userTheme() === 'dark' ? "#1C1C1C" : "#000" : (theme === 'dark') ? "#1C1C1C" : "#000";
    const backColor = (theme === "system") ? userTheme() === 'dark' ? "#AAAAAA" : "#C9C9C9" : (theme === 'dark') ? "#AAAAAA" : "#C9C9C9";
    const navMenus = [
        { title: 'Add Product', name: 'addproduct', link: '/dashboard/addproduct' },
        { title: 'Analysis', name: 'analysis', link: '/dashboard/analysis' },
        { title: 'Chart', name: 'chart', link: '/dashboard/chart' },
        { title: 'Stats', name: 'stats', link: '/dashboard/stats' },
        { title: 'Transection History', name: 'transection', link: '/dashboard/transection' },
        { title: 'Available Product', name: 'available', link: '/dashboard/availableproduct' },
        { title: 'User', name: 'user', link: '/user' },
    ];
    useEffect(() => {
        setIsClient(true);
    }, [])

    useEffect(() => {
        if (isClient) {

            const pathname = window.location.pathname;
            const menu = getMenuFromPathname(pathname); // Implement this function to extract the menu name from the pathname
            setActiveMenu(menu);

            // Listen for popstate (back/forward navigation) to update active menu
            const handlePopstate = () => {
                const newPathname = window.location.pathname;
                const newMenu = getMenuFromPathname(newPathname);
                setActiveMenu(newMenu);
            };
            window.addEventListener('popstate', handlePopstate);

            return () => {
                window.removeEventListener('popstate', handlePopstate);
            };
        }
    }, [isClient])

    // Function to extract menu name from the pathname
    const getMenuFromPathname = (pathname) => {
        // Implement your logic here to extract the menu name from the pathname
        // For example, if your URL is '/dashboard/transection', extract 'transection' from it
        const parts = pathname.split('/');
        const menuName = parts[parts.length - 1];
        // You might need to handle special cases like '/dashboard/' or '/dashboard' to set 'analysis' as default
        return ((menuName === 'dashboard') ? 'analysis' : menuName); // Return 'analysis' as default if dashboard name found
    };

    const userData =JSON.parse(localStorage.getItem('user'));
    // console.log("User Data Layout", userData);  
    return (
        <div className={Style.dashboard} >
            {/* Include shared UI here e.g. a header or sidebar */}
            {/* Dashboard navmenu bar Start */}
            <div className={Style.dashNavBar} style={{ backgroundColor: backColor, color: fontColor }}>
                {/* <div className={Style.dashBar}>
                <Image className={Style.userImage} src='/person.jpg' width={100} height={100} alt="" priority/>
            </div> */}
                <Image className={Style.userImage} src='/person.jpg' width={100} height={100} alt="" priority />
                <h2>{userData.name}</h2>
                <h3>{userData.address}</h3>
                <div className={Style.dashBar}>
                    <div className={Style.dashMenuBar}>
                        {navMenus.map((item, index) => (
                            <Link href={item.link} key={index}><span className={Style.span} onClick={() => handleClick(item.name)}><p className={activeMenu === item.name ? `${Style.active} ${Style.navMenu}` : Style.navMenu}>{item.title}</p></span> </Link>
                        ))}
                    </div>
                </div>
            </div>
            {/* Dashboard navmenubar end */}


            {children}
        </div>
    )
}