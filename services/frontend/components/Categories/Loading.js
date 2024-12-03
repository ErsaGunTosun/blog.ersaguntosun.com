
function CategoriesSkeleton() {
    return (
        <div className="hidden xl:flex xl:fixed w-3/12 h-full items-start pt-40 justify-end px-20">
            <div className="h-52 w-full text-end text-sm">
                <p className="font-bold">Categories</p>
                <div className="flex justify-end ">
                    <ul className="flex flex-col justify-start w-1/2 space-y-1 animate-pulse ">
                        <li className="h-2.5 bg-gray-200 rounded w-2/3 ms-auto"></li>
                        <li className="h-2.5 bg-gray-200 rounded w-1/2 ms-auto"></li>
                        <li className="h-2.5 bg-gray-200 rounded w-3/4 ms-auto"></li>
                        <li className="h-2.5 bg-gray-200 rounded w-2/5 ms-auto"></li>
                        <li className="h-2.5 bg-gray-200 rounded w-3/5 ms-auto"></li>
                        <li className="h-2.5 bg-gray-200 rounded w-1/4 ms-auto"></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default CategoriesSkeleton