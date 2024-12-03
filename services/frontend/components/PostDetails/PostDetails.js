import React from 'react'
import CategoriesDropdown from '@/components/CategoriesDropdown';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";

function PostDetails({isFieldVisible, setIsFieldVisible, title, setTitle, category, setCategory, introduction, setIntroduction}) {
    return (
        <>
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
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-500">Introduction</label>
                        <textarea id="message" rows="4" maxLength={500} value={introduction} onChange={(e) => setIntroduction(e.target.value)}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300  outline-none" placeholder="Write your here...">
                        </textarea>
                        <p className='text-xs text-gray-400 text-end'>{500 - introduction.length}</p>
                    </div>

                </div>
            </div>
        </>
    )
}

export default PostDetails