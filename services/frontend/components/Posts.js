import Post from '@/components/Post/Post'
import PageNavigations from './PageNavigation/PageNavigations';

import { GetPosts, GetPostsWithID } from '@/utils/blogFunc';

async function Posts({ isPosts, id = 0, page = 1, path = "/" }) {
    let posts = isPosts ? await GetPosts() : await GetPostsWithID(id)

    const pageNumbers = () => {
        let numbers = []
        let item = Math.ceil(posts.data.length / 5)
        for (var i = 0; i < item; i++) {
            numbers.push(i)
        }
        return numbers
    }

    return (
        <div className='my-5'>
            {
                posts.data.length == 0 &&
                <div className='text-center my-10'>
                    <p className='text-3xl'>No Posts Found</p>
                </div>
            }
            {
                posts.data.map((item, index) => {
                    if (index < (5 * page) && index >= ((page - 1) * 5)) {
                        {
                            return <Post post={item} key={item.id} border={false} />
                        }
                    }
                })
            }
            {
                posts.data.length > 0 &&
                <PageNavigations pageNumbers={pageNumbers()} currentPage={page} path={path} />
            }

        </div>
    )
}

export default Posts