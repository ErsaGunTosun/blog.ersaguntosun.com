import { useRouter } from 'next/navigation'
import React from 'react'

import { Logout } from '../utils/adminFunc'

function Panel() {
    const router = useRouter()

    return (
        <div className="hidden xl:flex xl:fixed w-3/12 h-full items-start pt-40 justify-end px-20">
            <div className="h-52 w-full text-end text-sm">
                <p className="font-bold">Control Panel</p>
                <ul className="max-w-md space-y-1  list-none list-inside font-light">
                    <li onClick={() => router.push("admin/create")} className="cursor-pointer underline decoration-dotted underline-offset-4 ">
                        Create Post
                    </li>
                    <li className="cursor-pointer underline decoration-dotted underline-offset-4">
                        Analytics
                    </li>
                    <li className="cursor-pointer underline decoration-dotted underline-offset-4">
                        Settings
                    </li>
                    <li onClick={() => Logout(router)} className="cursor-pointer text-red-600 underline decoration-dotted underline-offset-4">
                        Logout
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Panel