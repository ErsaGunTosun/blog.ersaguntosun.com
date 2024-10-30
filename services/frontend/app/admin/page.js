'use client';
import React from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { CreatePost } from '@/utils/adminApi';

function AdminPage() {
  const router = useRouter();

  React.useEffect(() => {
    if(localStorage.getItem('token') != null){
      axios({
        method: 'get',
        url: `http://localhost:8080/api/auth/verify`,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token')}`
        },
      },)
        .then((res) => {
          if(res.status === 200){
            console.log(res)
          }
        }).catch((err) => {
          if (err.response.status === 401){
            localStorage.removeItem('token')
            router.push('/admin/login')
          }
          console.log(err)
        })
    }else{
      router.push('/admin/login')
    }
  },[])

  return (
    <div>AdminPage</div>
  )
}

export default AdminPage