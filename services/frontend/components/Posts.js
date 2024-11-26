'use client';
import React from 'react'
import Post from '@/components/Post/Post'

import PageNavigations from './PageNavigation/PageNavigations';

import { GetPosts, GetPostsWithID } from '@/utils/blogFunc';

function Posts({ isPosts, id = 0, page=1, path="/"}) {
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
    }, [posts])

    const pageNumbers = ()=>{
        let numbers = []
        // let item = posts.length > 5 && posts.length % 5 != 0? Math.round(posts.length % 5): Math.round(posts.length / 5)
        let item = Math.ceil(posts.length / 5)
        for(var  i= 0; i < item; i++){
            numbers.push(i)
        }
        return numbers
    }

    return (
        <div>
            {
                posts.length == 0 &&
                <div className='text-center my-10'>
                    <p className='text-3xl'>No Posts Found</p>
                </div>
            }
            {
                posts.map((item,index) => {
                    if(index < (5*page) && index >= ((page-1)*5)){ {
                        return <Post post={item} key={item.id} border={false} />
                    }
                }})
            }
            {
                posts.length > 0 &&
                <PageNavigations pageNumbers={pageNumbers()} currentPage={page} path={path}/>
            }
           
        </div>
    )
}

export default Posts