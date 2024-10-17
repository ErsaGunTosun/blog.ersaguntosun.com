
function PageNavigations() {
    return (
        <div className="w-full my-12 text-center">
            <p>
                <a className="text-white bg-black py-3 px-4 rounded-xl">
                    1
                </a>
                <a className="text-black py-3 px-4 rounded-xl hover:underline hover:underline-offset-2 hover:decoration-1 hover:decoration-dotted cursor-pointer">
                    2
                </a>
                <a className="text-black py-3 px-4 rounded-xl hover:underline hover:underline-offset-2 hover:decoration-1 hover:decoration-dotted cursor-pointer">
                    Next »
                </a>
            </p>
        </div>
    )
}

export default PageNavigations