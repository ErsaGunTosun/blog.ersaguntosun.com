function Panel() {
    return (
        <div className="hidden xl:flex xl:fixed w-3/12 h-full items-start pt-40 justify-end px-20">
            <div className="h-52 w-full text-end text-sm">
                <p className="font-bold">Control Panel</p>
                <ul className="max-w-md space-y-1  list-none list-inside font-light">
                    <a href="/admin/create">
                        <li className="cursor-pointer underline decoration-dotted underline-offset-4 ">
                            Create Post
                        </li>
                    </a>
                    <a href="/admin/create">
                        <li className="cursor-pointer underline decoration-dotted underline-offset-4">
                            Analytics
                        </li>
                    </a>
                    <a>
                        <li className="cursor-pointer underline decoration-dotted underline-offset-4">
                            Settings
                        </li>
                    </a>

                    <a href='/admin/logout'>
                        <li className="cursor-pointer text-red-600 underline decoration-dotted underline-offset-4">
                            Logout
                        </li>
                    </a>
                </ul>
            </div>
        </div>
    )
}

export default Panel