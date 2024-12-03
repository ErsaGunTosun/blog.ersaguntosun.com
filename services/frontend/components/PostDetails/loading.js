import React from 'react'
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

function PostDetailsSkeleton() {
    return (
        <div class="rounded-lg animate-pulse">

            <button
                type="button" className="flex text-xl items-center justify-between w-full py-2.5 font-medium text-black custom-border gap-3 mb-4">
                <span>Details</span>
                <MdOutlineKeyboardArrowDown />

            </button>
            <div class="mb-4 px-2">
                <div class="h-4 w-32 bg-gray-300 rounded"></div>
                <div class="mt-2 h-10 bg-gray-200 rounded"></div>
            </div>


            <div class="mb-4 px-2">
                <div class="h-4 w-40 bg-gray-300 rounded"></div>
                <div class="mt-2 h-10 bg-gray-200 rounded"></div>
            </div>


            <div className='px-2'>
                <div class="h-4 w-28 bg-gray-300 rounded"></div>
                <div class="mt-2 h-24 bg-gray-200 rounded"></div>
            </div>
        </div>


    )
}

export default PostDetailsSkeleton