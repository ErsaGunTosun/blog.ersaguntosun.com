import { MdSearch } from "react-icons/md";

function Search() {
  return (
    <div className="h-full">
        <div className="flex items-center">
            <input type="text" id="first_name" class="bg-white border border-black text-black text-base rounded-base px-1 focus:outline-none" 
            placeholder="search..." required />
            <MdSearch className="text-black text-xl ms-2" />
        </div>
    </div>
  )
}

export default Search