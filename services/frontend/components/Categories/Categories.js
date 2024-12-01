import { GetCategories } from "@/utils/blogFunc"

async function Categories() {
    let categories = await GetCategories()

    return (
        <div className="hidden xl:flex xl:fixed w-3/12 h-full items-start pt-40 justify-end px-20">
            <div className="h-52 w-full text-end text-sm">
                <p className="font-bold">Categories</p>
                <ul className="max-w-md space-y-1 underline decoration-dotted underline-offset-4 text-black list-none list-inside font-light">
                    {
                        categories.data.map((category, index) => {
                            return (
                                <a href={`/category/${category.id}`}>
                                    <li key={index} className="cursor-pointer">
                                        {category.name}
                                    </li>
                                </a>
                            )
                        })
                    }
                    <a href='/'>
                        <li className="cursor-pointer">
                            All
                        </li>
                    </a>
                </ul>
            </div>
        </div>
    )
}

export default Categories