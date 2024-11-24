'use client';
import React, { use } from 'react'
import { useRouter } from 'next/navigation';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";

import CategoriesDropdown from '@/components/CategoriesDropdown';
import { CreatePost } from '@/utils/adminFunc';

function createPage() {
  const [isFieldVisible, setIsFieldVisible] = React.useState(true)
  const editorRef = React.useRef(null)
  const [mdStr, setMdStr] = React.useState(`# This is a H1  \n## This is a H2  \n###### This is a H6`)
  const [introduction , setIntroduction] = React.useState('')
  const [title, setTitle] = React.useState('')
  const [category, setCategory] = React.useState([])

  const router = useRouter()

  const handleEditorChange = (value, viewUpdate) => {
    setMdStr(value)
  }

  const handlePublish = () => {
    try {
      CreatePost(title, mdStr, category, introduction)
    }
    catch (e) {
      console.log(e)
    }
  }
  return (
    <div className='w-full h-full'>
      <div className='w-full h-full flex flex-col px-10'>
        <div className='font-medium py-2 text-3xl text-center mb-3 '>Create Post</div>

        <div className='w-full' >

          <button onClick={() => setIsFieldVisible(!isFieldVisible)}
            type="button" className="flex text-xl items-center justify-between w-full py-2.5 font-medium text-black custom-border gap-3 mb-4">
            <span>Details</span>
            {
              isFieldVisible ? <MdOutlineKeyboardArrowDown /> : <MdOutlineKeyboardArrowUp />
            }
          </button>

          <div id="accordion-flush-body-1" className={isFieldVisible ? "block" : "hidden"} aria-labelledby="accordion-flush-heading-1">
            <div className=" px-2 border-b border-gray-200 dark:border-gray-700">

              <div className="relative z-0 w-full mb-5 group text-black">
                <input autoComplete='off' type="text" name="floating_title" id="floating_title" value={title} onChange={(e) => setTitle(e.target.value)}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-gray-200 appearance-non peer outline-none" placeholder=" " required />
                <label htmlFor="floating_title" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Post Title</label>
              </div>


              <div className="relative z-0 w-full mb-5 group text-black">
                <CategoriesDropdown category={category} setCategory={setCategory} />
              </div>

              <div>
                <label for="message" class="block mb-2 text-sm font-medium text-gray-500">Introduction</label>
                <textarea id="message" rows="4" maxLength={500} value={introduction} onChange={(e) => setIntroduction(e.target.value)}
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300  outline-none" placeholder="Write your here...">
                </textarea>
                <p className='text-xs text-gray-400 text-end'>{500-introduction.length}</p>
              </div>

            </div>
          </div>

        </div>

        <div className='w-full h-full' >
          <div className='font-medium text-xl custom-border py-2.5 mb-4'>Content</div>
          <MarkdownEditor
            ref={editorRef}
            className='w-full h-full max-h-full bg-white'
            visible={true}
            enablePreview={true}
            value={mdStr}
            enableScroll={true}
            onChange={(value, viewUpdate) => handleEditorChange(value, viewUpdate)}
          />

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


      </div>

    </div >
  )
}

export default createPage