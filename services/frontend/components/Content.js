

function Content() {
    return (

        <div className="hidden xl:flex xl:fixed xl:right-0 w-3/12 h-full items-start pt-40 justify-end px-20">
            <div className="h-52 w-full text-start text-sm">
                <p className="font-bold">Content</p>
                <ul class="max-w-md space-y-1  text-black list-none list-inside font-light">
                    <li className="cursor-pointer">
                        Overview
                    </li>
                    <li className="cursor-pointer">
                        Clone & set up the project
                    </li>
                    <li className="cursor-pointer">
                        Lightroom CC API key
                    </li>
                    <li className="cursor-pointer" >
                        Discord server
                    </li>
                    <li className="cursor-pointer" >
                        Final thoughts
                        <div className="ms-5">
                            <ul class="max-w-md space-y-1  text-black list-none list-inside font-light">
                                <li className="cursor-pointer">
                                    Overview
                                </li>
                                <li className="cursor-pointer">
                                    Clone & set up the project
                                </li>
                                <li className="cursor-pointer">
                                    Lightroom CC API key
                                </li>
                                <li className="cursor-pointer" >
                                    Discord server
                                </li>
                            </ul>
                        </div>

                    </li>

                </ul>

            </div>
        </div>
    )
}

export default Content