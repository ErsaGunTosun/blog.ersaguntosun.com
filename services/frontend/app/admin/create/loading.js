import { MarkdownEditorSkeleton } from "@/components/Editor/Loading"
import PostDetailsSkeleton from "@/components/PostDetails/loading"
function loading() {
    return (
        <div className='w-full h-full'>
            <div className='w-full h-full flex flex-col px-10'>
                <div className='font-medium py-2 text-3xl text-center mb-3 mt-10 '>Create Post</div>


                <div className='w-full' >
                    <PostDetailsSkeleton />
                </div>

                <div className='w-full h-full' >
                    <div className='font-medium text-xl custom-border py-2.5 mb-4'>Content</div>
                    <MarkdownEditorSkeleton />

                    <div className='w-full flex justify-end gap-4 mt-6 mb-2'>

                        <div class="h-6 w-36 bg-gray-300 rounded"></div>
                        
                        <div class="h-6 w-28 bg-gray-300 rounded"></div>

                    </div>

                </div>

            </div>

        </div >
    )
}

export default loading