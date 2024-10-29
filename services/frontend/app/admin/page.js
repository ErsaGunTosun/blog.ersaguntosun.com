'use client';
import React from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';

function AdminPage() {
  const router = useRouter();

  React.useEffect(() => {
    if(localStorage.getItem('token') != null){
      axios({
        method: 'get',
        url: `http://localhost:8080/api/auth/verify`,
        withCredentials: false,
      },)
        .then((res) => {
          if(res.status === 200){
            console.log(res)
          }
          else{
            localStorage.removeItem('token')
            router.push('/admin/login')
          }
        }).catch((err) => {
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