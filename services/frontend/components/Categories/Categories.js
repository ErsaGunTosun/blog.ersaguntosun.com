"use client"
import React, { Suspense } from "react"
import { useRouter } from "next/navigation"

import { GetCategories } from "@/utils/blogFunc"

function Categories() {
    const [categories, setCategories] = React.useState([])
    const router = useRouter()

    const getCategories = async () => {
        let categories = await GetCategories()
        setCategories(categories.data)
    }

    React.useEffect(() => {
        try {
            getCategories()
        }
        catch (error) {
            console.log(error)
        }
    }, [])

    return (
        <div className="hidden xl:flex xl:fixed w-3/12 h-full items-start pt-40 justify-end px-20">
            <div className="h-52 w-full text-end text-sm">
                <p className="font-bold">Categories</p>

                    <ul className="max-w-md space-y-1 underline decoration-dotted underline-offset-4 text-black list-none list-inside font-light">
                        {
                            categories.map((category, index) => {
                                return (
                                    <li onClick={() => router.push("/category/" + category.id)} key={index} className="cursor-pointer">
                                        {category.name}
                                    </li>
                                )
                            })
                        }
                        <li onClick={() => router.push("/")} className="cursor-pointer">
                            All
                        </li>
                    </ul>
            </div>
        </div>
    )
}

export default Categories