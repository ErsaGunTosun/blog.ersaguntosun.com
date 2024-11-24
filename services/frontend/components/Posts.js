'use client';
import React from 'react'
import Post from '@/components/Post'


import { GetPosts, GetPostsWithID } from '@/utils/blogFunc';

function Posts({ isPosts, id = 0 }) {
    const [posts, setPosts] = React.useState([])
    const getAllPosts = async () => {
        let postsReq = await GetPosts()
        setPosts(postsReq.data)
    }
    const getPostsWithID = async () => {
        let postsReq = await GetPostsWithID(id)
        setPosts(postsReq.data)
    }

    React.useEffect(() => {
        try {
            if (isPosts) {
                getAllPosts()
            }
            else {
                getPostsWithID()
            }
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
                posts.length == 0 &&
                <div className='text-center my-10'>
                    <p className='text-3xl'>No Posts Found</p>
                </div>
            }
            {
                posts.map((item) => {
                    return <Post post={item} key={item.id} border={true} />
                })
            }
        </div>
    )
}

export default Posts