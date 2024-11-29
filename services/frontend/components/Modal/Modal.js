import React from 'react'
import { MdOutlineClose } from "react-icons/md";
import { FaCircleExclamation } from "react-icons/fa6";

function Modal({ isVisible, setVisible, Status, res }) {

    return (
        <div id="popup-modal" tabIndex="-1"
            className={!isVisible ? "hidden" : "flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"}>
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-gray-100 rounded-lg shadow">
                    <button onClick={() => setVisible(false)}
                        type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="popup-modal">
                        <MdOutlineClose className="w-5 h-5" />
                    </button>
                    {
                        Status === 'delete' ?
                            <div className="p-4 md:p-5 text-center">
                                <FaCircleExclamation className="mx-auto mb-4 text-red-600 w-12 h-12" />
                                <h3 className="mb-5 text-lg font-normal text-black ">Are you sure you want to delete this Post?</h3>
                                <button onClick={() => res('success')}
                                    data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                    Yes, I'm sure
                                </button>
                                <button onClick={() => setVisible(false)}
                                    data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 ">No, cancel</button>
                            </div>
                            : ""
                    }
                    {
                        Status === 'publish' ?
                            <div className="p-4 md:p-5 text-center">
                                <FaCircleExclamation className="mx-auto mb-4 text-green-600 w-12 h-12" />
                                <h3 className="mb-5 text-lg font-normal text-black ">Are you sure you want to publish this Post?</h3>
                                <button onClick={() => res('success')}
                                    data-modal-hide="popup-modal" type="button" className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                    Yes, I'm sure
                                </button>
                                <button onClick={() => setVisible(false)}
                                    data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 ">No, cancel</button>
                            </div>
                            : ""
                    }
                    {
                        Status === 'update' ?
                            <div className="p-4 md:p-5 text-center">
                                <FaCircleExclamation className="mx-auto mb-4 text-blue-600 w-12 h-12" />
                                <h3 className="mb-5 text-lg font-normal text-black ">Are you sure you want to update this Post?</h3>
                                <button onClick={() => res('success')}
                                    data-modal-hide="popup-modal" type="button" className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                    Yes, I'm sure
                                </button>
                                <button onClick={() => setVisible(false)}
                                    data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 ">No, cancel</button>
                            </div>
                            : ""
                    }

                </div>
            </div>
        </div>

    )
}

export default Modal