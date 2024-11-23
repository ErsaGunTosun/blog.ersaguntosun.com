'use client';
import React from "react";

import MarkdownEditor from "@uiw/react-markdown-editor"
import Categories from "@/components/Categories"
import Content from "@/components/Content"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

import { GetCategories } from "@/utils/categoryAPI"
import { GetPost } from "@/utils/blogApi"


export default function Posts({ params }) {
  const [post, setPost] = React.useState({})
  const [categories, setCategories] = React.useState([])
  const date = new Date(post.created_at)


  const getPost = async () => {
    let post = await GetPost(params.id)

    return setPost(post.data)
  }

  const getCategories = async () => {
    let categories = await GetCategories(params.id)
    return setCategories(categories.data)
  }


  React.useEffect(() => {
    try {
      getPost()
      getCategories()
    }
    catch (err) {
      console.log(err)
    }
  }, [])


  return (
    <div className="h-full w-full">
      <Categories />
      <Content />
      <Header />
      <div className="xl:px-88 lg:px-28 md:px-12 px-4">
        <div className="post my-12 pb-10">

          <a href={"posts/" + post.id} className="post-title text-3xl font-bold hover:underline hover:underline-offset-8 hover:decoration-1 hover:decoration-dotted cursor-pointer">
            {post.title}
          </a>
          <p>
            {date.toDateString()}-
            {
              categories?.map(item => {
                return <span key={item?.id} className="category"> · {item?.name} </span>
              })
            }
          </p>
            <div className="mt-5">
              <MarkdownEditor.Markdown source={post?.content} />
            </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}
