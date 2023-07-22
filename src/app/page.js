'use client'

import Home from '../../components/Home'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react'

export default function Page() {
  
  const router = useRouter();
  useEffect(() => {

    if(!localStorage.getItem('auth-token' || (localStorage.getItem('auth-token')===undefined))){
      router.push('/login')
    }
  }, [])
  
  return (
    <div className='styles.body'>
    <Home/>
    </div>
  )
}
