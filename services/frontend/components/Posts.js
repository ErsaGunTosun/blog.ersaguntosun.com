'use client';
import React from 'react'
import Post from '@/components/Post'


import { GetPosts } from '@/utils/blogApi';


function Posts() {
    const [posts, setPosts] = React.useState([])
    const getAllPosts = async () => {
        let postsReq = await GetPosts()
        setPosts(postsReq.data)
    }

    React.useEffect(() => {
        try {
            getAllPosts()
        }
        catch (err) {
            console.log(err)
        }
    }, [])

    React.useEffect(() => {
        console.log(posts)
    }, [posts])
    return (
        <div>
            {
              posts.map((item)=>{
                return <Post post={item} key={item.id}/>
              })
            }
        </div>
    )
}

export default Posts