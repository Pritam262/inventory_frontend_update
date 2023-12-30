import Navbar from '../../components/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import ProductState from './context/ProductState'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'IMS - App',
  description: 'This is a inventory management system',
}

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProductState>
          <Navbar/>
          {children}
        </ProductState>

      </body>
    </html>
  )
}
