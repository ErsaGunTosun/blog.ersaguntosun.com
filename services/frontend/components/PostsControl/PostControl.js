'use client';
import React, { Suspense } from 'react'
import { useRouter } from 'next/navigation'

import PageNavigations from '../PageNavigation/PageNavigations';
import PostWrapper from '../PostWrapper';
import Modal from '../Modal/Modal'

import { DeletePost } from '@/utils/adminFunc'
import { GetPosts } from '@/utils/blogFunc'

function PostControl({id = 0, page = 1, path = "/"}) {
  const [isModalVisible, setIsModalVisible] = React.useState(false)
  const [modalStatus, setModalStatus] = React.useState('')
  const [modalRes, setModalRes] = React.useState('')
  const [modalData, setModalData] = React.useState({})
  const [deleteStatus, setDeleteStatus] = React.useState('')
  const [posts, setPosts] = React.useState([])
  const router = useRouter()

  const getAllPosts = async () => {
    let postsReq = await GetPosts()
    setPosts(postsReq.data)
  }
  const deleteHandler = (id) => {
    setModalStatus('delete')
    setIsModalVisible(true)
    setModalData({ id: id })
  }
  const deletePost = async (id) => {
    let status = await DeletePost(id, router)
    setDeleteStatus(status)
    setIsModalVisible(false)
  }
  const pageNumbers = () => {
    let numbers = []
    let item = Math.ceil(posts.length / 5)
    for (var i = 0; i < item; i++) {
        numbers.push(i)
    }
    return numbers
} 

  React.useEffect(() => {
    try {
      getAllPosts()
    }
    catch (error) {
      console.log(error)
    }
  }, [])

  React.useEffect(() => {
    if (modalRes === 'success') {
      deletePost(modalData.id)
      setModalData({})
      setModalRes('')
      setDeleteStatus('success')
      setIsModalVisible(false)
      if (((posts.length-1) / 5) <= page) {
        router.push('/admin/posts/'+(page-1))
      }
    }
  }, [modalRes])

  React.useEffect(() => {
    if (deleteStatus === 'success') {
      getAllPosts()
      setDeleteStatus('')
    }
  }, [deleteStatus])





  return (
    <div className='pb-2'>
      {
        posts.map((post,index) => {
          if (index < (5 * page) && index >= ((page - 1) * 5)) {
            {
              return (
                <div key={post.id} className='post-border mb-5'>
                  <PostWrapper post={post} border={false} />
                  <button
                    onClick={() => deleteHandler(post.id)}
                    type="button" className="text-red-700 hover:underline hover:underline-offset-2 hover:decoration-1 hover:decoration-dotted  font-bold rounded-lg text-sm px-3 py-2.5 text-center mb-2">
                    Delete Post
                  </button>
                  <button onClick={() => router.push(`/admin/edit/${post.id}`)}
                    type="button" className="text-blue-700 hover:underline hover:underline-offset-2 hover:decoration-1 hover:decoration-dotted font-bold rounded-lg text-sm px-3 py-2.5 text-center mb-2">
                    Edit Post
                  </button>
                </div>
              )
            }
          }

        })
      }
      {
        posts.length > 0 &&
        <PageNavigations pageNumbers={pageNumbers()} currentPage={page} path={path} />
      }
      <Modal isVisible={isModalVisible} setVisible={setIsModalVisible} Status={modalStatus} res={setModalRes} data={modalData} />
    </div>
  )
}

export default PostControl