'use client';
import React from 'react'
import Header from '@/components/Header/Header';
import Panel from '@/components/Panel/Panel';
import PostControl from '@/components/PostsControl/PostControl';


import { Verify } from '@/utils/adminFunc';


function PostsPage({params}) {
  React.useEffect(() => {
    let verify = Verify().then((res) => {
      if (res.status != 200) {
        window.location.href = '/admin/login'
      }
      
    }).catch((err) => {
        if(err.response.status === 401) {
            window.location.href = '/admin/login'
        }
      console.log(err)
    })
  }, [])

  return (
    <div className="h-full w-full">
      <Header />
      <Panel />
      
      <div className="xl:px-88 lg:px-28 md:px-12 px-4">
        <div className="w-full">
          <PostControl page={params.page} path={"/admin/posts/"} />
        </div>
      </div>

    </div>
  )
}

export default PostsPage