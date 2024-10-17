import Search from "./Search"

import { BsArrowReturnRight } from "react-icons/bs";
function Footer() {
    return (
        <div className="text-center pb-12">
            <div className="flex md:hidden justify-center">
                <Search />
            </div>
            <p className="flex justify-center">
                Found something wrong, broken, or just have feedback? 
                <span className="flex items-center font-bold mx-1 cursor-pointer"> <BsArrowReturnRight/> Please let me know.</span> Thanks!
            </p>
            <p className="text-sm">
                © 2024 John Mueller. The example code, unless otherwise noted, is released under MIT license and may be used appropriately.
                Some items may be subject to license terms and copyrights from third parties.
                The views expressed here are mine and not those of my employer.
            </p>
        </div>
    )
}

export default Footer