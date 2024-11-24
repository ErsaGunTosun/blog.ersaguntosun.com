'use client';
import { useRouter } from 'next/navigation';
import React from 'react'
import axios from 'axios';

import Header from '@/components/Header';
import Post from '@/components/Post';
import Panel from '@/components/Panel';

// API
import { DeletePost } from '@/utils/adminAPIFUnc';
import { GetPosts } from '@/utils/blogAPIFunc';

function AdminPage() {
  const router = useRouter();

  const [posts, setPosts] = React.useState([])
  const [deleteStatus, setDeleteStatus] = React.useState('')

  const getAllPosts = async () => {
    let postsReq = await GetPosts()
    setPosts(postsReq.data)
  }

  const deletePost = async (id) => {
    let status = await DeletePost(id, router)
    setDeleteStatus(status)
  }


  React.useEffect(() => {
    try {
      if (localStorage.getItem('token') != null) {
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
            if (res.status === 200) {
            }
          }).catch((err) => {
            if (err.response.status === 401) {
              localStorage.removeItem('token')
              router.push('/admin/login')
            }
            console.log(err)
          })
      } else {
        router.push('/admin/login')
      }

      getAllPosts();
    }
    catch (error) {
      console.log(error)
    }
  }, [])

  React.useEffect(() => {
    if (deleteStatus === 'success') {
      getAllPosts()
    }
  }, [deleteStatus])

  return (
    <div className="h-full w-full">
      <Header />
      <Panel />
      <div className="xl:px-88 lg:px-28 md:px-12 px-4">
        <div className="w-full">
          {
            posts.map((post) => {
              return (
                <div key={post.id} className='post-border mb-10'>
                  <Post post={post} border={false} />
                  <button 
                    onClick={() => deletePost(post.id)}
                    type="button" className="text-red-700 hover:underline hover:underline-offset-2 hover:decoration-1 hover:decoration-dotted  font-bold rounded-lg text-sm px-3 py-2.5 text-center mb-2">
                    Delete Post
                  </button>
                  <button onClick={() => router.push(`/admin/edit/${post.id}`)}
                    type="button" className="text-blue-700 hover:underline hover:underline-offset-2 hover:decoration-1 hover:decoration-dotted font-bold rounded-lg text-sm px-3 py-2.5 text-center mb-2">
                    Edit Post
                  </button>
                </div>
              )
            })
          }
        </div>
      </div>


    </div>
  )
}

export default AdminPage