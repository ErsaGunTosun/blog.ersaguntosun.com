'use client';
import React from 'react'
import Header from '@/components/Header/Header';
import Panel from '@/components/Panel';
import PostControl from '@/components/PostsControl/PostControl';

// API
import { Verify } from '@/utils/adminFunc';


function AdminPage() {
  React.useEffect(() => {
    let verify = Verify().then((res) => {
      if (res.status != 200) {
        window.location.href = '/admin/login'
      }
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  return (
    <div className="h-full w-full">
      <Header />
      <Panel />
      
      <div className="xl:px-88 lg:px-28 md:px-12 px-4">
        <div className="w-full">
          <PostControl />
        </div>
      </div>

    </div>
  )
}

export default AdminPage