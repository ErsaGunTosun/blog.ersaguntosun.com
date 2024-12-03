'use client';
import React, { Suspense } from 'react'
import PostWrapper from '../PostWrapper';
import Modal from '../Modal/Modal'
import { useRouter } from 'next/navigation'

import { DeletePost } from '@/utils/adminFunc'
import { GetPosts } from '@/utils/blogFunc'

function PostControl() {
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
    }
  }, [modalRes])

  React.useEffect(() => {
    if (deleteStatus === 'success') {
      getAllPosts()
      setDeleteStatus('')
    }
  }, [deleteStatus])





  return (
    <div>
      {
        posts.map((post) => {
          return (
            <div key={post.id} className='post-border mb-10'>
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
        })
      }
      <Modal isVisible={isModalVisible} setVisible={setIsModalVisible} Status={modalStatus} res={setModalRes} data={modalData} />
    </div>
  )
}

export default PostControl