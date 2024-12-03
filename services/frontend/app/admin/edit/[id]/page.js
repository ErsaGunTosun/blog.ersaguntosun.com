'use client';
import React from 'react'
import { useRouter } from 'next/navigation';

import PostDetails from '@/components/PostDetails/PostDetails';
import Modal from '@/components/Modal/Modal';
import Editor from '@/components/Editor/Editor';

//API
import { GetPost, GetCategoriesWithID } from '@/utils/blogFunc';
import { UpdatePost } from '@/utils/adminFunc';


function editpage({ params }) {
  
  const [categories, setCategories] = React.useState([])
  const [title, setTitle] = React.useState("")
  const [category, setCategory] = React.useState([])
  const [introduction, setIntroduction] = React.useState("")
  const [mdStr, setMdStr] = React.useState(``)
  const [post, setPost] = React.useState({})
  
  const router = useRouter()
  
  // modal
  const [isFieldVisible, setIsFieldVisible] = React.useState(true)
  const [isModalVisible, setIsModalVisible] = React.useState(false)
  const [modalStatus, setModalStatus] = React.useState('')
  const [modalRes, setModalRes] = React.useState('')
  const [modalData, setModalData] = React.useState({})

  const getPostData = async () => {
    try {
      const res = await GetPost(params.id)
      setPost(res.data)
    }
    catch (e) {
      console.log(e)
    }
  }


  const getCategories = async () => {
    try {
      let categories = await GetCategoriesWithID(params.id)
      return setCategories(categories.data)
    }
    catch (e) {
      console.log(e)
    }
  }


  const updateHandler = async () => {
    try {
      const res = await UpdatePost(title, mdStr, category, introduction, params.id).then(res => {
        setIsModalVisible(false)
        router.push('/admin')
      })
    }
    catch (e) {
      console.log(e)
    }
  }


  const handleEditorChange = (value, viewUpdate) => {
    setMdStr(value)
  }

  const handleUpdate = () => {
    setIsModalVisible(true)
    setModalStatus('update')
    setModalData({
      title: title,
      content: mdStr,
      introduction: introduction,
      category: category
    })
  }

  React.useEffect(() => {
    try {
      if (params.id) {
        getPostData()
        getCategories()
      }
    }
    catch (e) {
      console.log(e)
    }
  }, [])

  React.useEffect(() => {
    if (modalStatus === 'update') {
      updateHandler()
    }
  }, [modalRes])

  React.useEffect(() => {
    if (post.id !== undefined) {
      console.log(post)
      setTitle(post.title)
      setMdStr(post.content)
      setIntroduction(post.introduction)
      categories.map(item => setCategory((prev) => [...prev, item.name]))
    }
  }, [post])

  return (
    <div className='w-full h-full'>
      <div className='w-full h-full flex flex-col px-10'>
        <div className='font-medium py-2 text-3xl text-center mb-3 m-10 '>Edit Post</div>

        <div className='w-full' >

          <PostDetails isFieldVisible={isFieldVisible} setIsFieldVisible={setIsFieldVisible}
            title={title} setTitle={setTitle} category={category} setCategory={setCategory}
            introduction={introduction} setIntroduction={setIntroduction}
          />

        </div>

        <div className='w-full h-full' >
          <div className='font-medium text-xl custom-border py-2.5 mb-4'>Content</div>
          <Editor mdStr={mdStr} handleEditorChange={handleEditorChange} />

          <div className='w-full flex justify-end'>
            <button onClick={() => { router.back() }}
              type="button" className="text-red-700 hover:underline hover:underline-offset-2 hover:decoration-1 hover:decoration-dotted font-bold rounded-lg text-sm px-3 py-2.5 text-center mb-2">
              Exit Without Saving
            </button>
            <button onClick={() => handleUpdate()}
              type="button" className="text-green-700 hover:underline hover:underline-offset-2 hover:decoration-1 hover:decoration-dotted font-bold rounded-lg text-sm px-3 py-2.5 text-center mb-2">
              Update Post
            </button>
          </div>
        </div>

        <Modal isVisible={isModalVisible} setVisible={setIsModalVisible} Status={modalStatus} res={setModalRes} />
      </div>

    </div >
  )
}

export default editpage