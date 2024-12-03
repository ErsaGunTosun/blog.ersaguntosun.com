'use client';
import React from 'react'
import { useRouter } from 'next/navigation';

import Editor from '@/components/Editor/Editor';
import Modal from '@/components/Modal/Modal';
import PostDetails from '@/components/PostDetails/PostDetails';
import { CreatePost } from '@/utils/adminFunc';

function createPage() {
  const [title, setTitle] = React.useState('')
  const [category, setCategory] = React.useState([])
  const [introduction, setIntroduction] = React.useState('')
  const [mdStr, setMdStr] = React.useState(`# This is a H1  \n## This is a H2  \n###### This is a H6`)

  const router = useRouter()
  
  // modal
  const [isFieldVisible, setIsFieldVisible] = React.useState(true)
  const [isModalVisible, setIsModalVisible] = React.useState(false)
  const [modalStatus, setModalStatus] = React.useState('')
  const [modalRes, setModalRes] = React.useState('')
  const [modalData, setModalData] = React.useState({})


  const handleEditorChange = (value, viewUpdate) => {
    setMdStr(value)
  }

  const handlePublish = () => {
    try {
      setIsModalVisible(true)
      setModalStatus('publish')
      setModalData({ title: title, category: category, introduction: introduction, content: mdStr })
    }
    catch (e) {
      console.log(e)
    }
  }

  const publishPost = async () => {
    try {
      await CreatePost(title, mdStr, category, introduction).then((res) => {
        setIsModalVisible(false)
        router.push('/admin')
      })
        .catch((err) => {
          console.log(err)
        })
    }
    catch (e) {
      console.log(e)
    }
  }

  React.useEffect(() => {
    if (modalRes == 'success') {
      publishPost()
    }
  }, [modalRes])

  return (
    <div className='w-full h-full'>
      <div className='w-full h-full flex flex-col px-10'>
        <div className='font-medium py-2 text-3xl text-center mb-3 mt-10 '>Create Post</div>

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
            <button onClick={() => handlePublish()}
              type="button" className="text-green-700 hover:underline hover:underline-offset-2 hover:decoration-1 hover:decoration-dotted font-bold rounded-lg text-sm px-3 py-2.5 text-center mb-2">
              Publish Post
            </button>
          </div>

        </div>

        <Modal isVisible={isModalVisible} setVisible={setIsModalVisible} Status={modalStatus} res={setModalRes} />

      </div>

    </div >
  )
}

export default createPage