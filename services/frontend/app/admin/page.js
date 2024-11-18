'use client';
import React from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { CreateCategory } from '@/utils/categoryAPI';
import { DeletePost} from '@/utils/postAPI';
import { GetPosts } from '@/utils/blogApi';

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
              console.log(res)
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
    <div>
      <h1>Admin Page</h1>
      <button onClick={() => router.push('/admin/create')}>Create Post</button>
      {
        posts.map((post) => {
          return (
            <div key={post.id}>
              <h2>{post.title} + {post.id}</h2>
              <p>{post.content}</p>
              <div className='space-x-2'>
                <button onClick={() => router.push(`/admin/edit/${post.id}`)}>Edit</button>
                <button onClick={() => deletePost(post.id)}>Delete</button>
              </div>
            </div>
          )
        })
      }

    </div>
  )
}

export default AdminPage