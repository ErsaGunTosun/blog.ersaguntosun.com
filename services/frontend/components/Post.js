'use client';
import React from "react"

import { GetCategories } from "@/utils/categoryAPI"

function Post({ post, border }) {
    const [categories, setCategories] = React.useState([])
    let date = new Date(post.created_at)

    const getAllCategories = async () => {
        try {
            let response = await GetCategories(post.id)
            setCategories(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    React.useEffect(() => {
        try {
            getAllCategories()
        } catch (e) {
            console.log(e)
        }
    }, [])

    React.useEffect(() => {
        console.log(categories)
    }, [categories])


    return (
        <div className={border ? "post-border my-12 pb-10" : "post my-2 pb-2"}>

            <a href={"posts/"+post.id} className="post-title text-3xl font-bold hover:underline hover:underline-offset-8 hover:decoration-1 hover:decoration-dotted cursor-pointer">
                {post.title}
            </a>
            <p className="text-black">
                {
                    date.toDateString() + " "
                }
                -
                {
                    categories?.map(item=>{
                        return <span key={item?.id} className="category"> · {item?.name} </span> 
                    })
                }

            </p>
            <p className="my-6">
                {post.introduction}
            </p>
            <a className="cursor-pointer underline underline-offset-4 decoration-1 decoration-dotted">
                Midjourney / Discord to Lightroom automation - step by step - for 2023 »
            </a>
        </div>
    )
}

export default Post