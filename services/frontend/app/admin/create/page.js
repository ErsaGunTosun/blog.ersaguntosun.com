"use client"
import React from 'react'
import MarkdownEditor from '@uiw/react-markdown-editor';

const mdStr = `# This is a H1  \n## This is a H2  \n###### This is a H6`;

function createPage() {
  const [isFieldVisible, setIsFieldVisible] = React.useState(false)
  return (
    <div className='w-full h-full'>
      <div className='w-full h-full flex flex-col px-10'>
        <div className='font-medium py-5 text-3xl  text-center mb-4'>Create Post</div>

        <div className='w-full' >
          <button onClick={() => setIsFieldVisible(!isFieldVisible)}
            type="button" className="flex text-xl items-center justify-between w-full py-2.5 font-medium text-black custom-border gap-3 mb-4">
            <span>Details</span>
            <svg className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
            </svg>
          </button>

          <div id="accordion-flush-body-1" className={isFieldVisible ? "block" : "hidden"} aria-labelledby="accordion-flush-heading-1">
            <div className="py-5 border-b border-gray-200 dark:border-gray-700">
              <p className="mb-2 text-gray-500 dark:text-gray-400">Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.</p>
              <p className="text-gray-500 dark:text-gray-400">Check out this guide to learn how to <a href="/docs/getting-started/introduction/" className="text-blue-600 dark:text-blue-500 hover:underline">get started</a> and start developing websites even faster with components on top of Tailwind CSS.</p>
            </div>
          </div>
        </div>

        <div className='w-full h-full'>
          <div className='font-medium text-xl custom-border py-2.5 mb-4'>Content</div>
          <MarkdownEditor
            className='w-full h-full bg-white'
            visible={true}
            enablePreview={true}
            value={mdStr}
            onChange={(value, viewUpdate) => {
              console.log(value, viewUpdate)
            }}
          />
        </div>


      </div>

    </div>
  )
}

export default createPage