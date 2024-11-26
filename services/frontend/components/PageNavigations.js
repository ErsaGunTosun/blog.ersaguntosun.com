import React from "react"

function PageNavigations({pageNumbers, currentPage = 1 }) {
    let pageId = parseInt(currentPage)
    return (
        <div className="w-full my-12 text-center">
            <p>
                {
                    pageId != pageNumbers[0] + 1 &&
                    <a href={`/${parseInt(currentPage) - 1}`}
                        className="text-black py-3 px-4 rounded-xl hover:underline hover:underline-offset-2 hover:decoration-1 hover:decoration-dotted cursor-pointer">
                        « Previous
                    </a>
                }

                {
                    pageNumbers?.map((item, index) => {
                        return (
                            <a href={"/" + (item + 1)}
                                key={index} className={currentPage == item + 1 ? "text-white bg-black py-3 px-4 rounded-xl" : "text-black py-3 px-4 rounded-xl hover:underline hover:underline-offset-2 hover:decoration-1 hover:decoration-dotted cursor-pointer"}>
                                {item + 1}
                            </a>
                        )
                    })

                }
                {
                    pageId != pageNumbers[pageNumbers.length - 1] + 1 &&
                    <a href={`/${parseInt(currentPage) + 1}`}
                        className="text-black py-3 px-4 rounded-xl hover:underline hover:underline-offset-2 hover:decoration-1 hover:decoration-dotted cursor-pointer">
                        Next »
                    </a>
                }
            </p>
        </div>
    )
}

export default PageNavigations