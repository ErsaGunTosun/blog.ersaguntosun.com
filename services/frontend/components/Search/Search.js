'use client';
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MdSearch } from "react-icons/md";

import { GetPosts } from "@/utils/blogFunc";

function Search() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const dropdownRef = useRef(null);
  const router = useRouter();

  const getSearchParams = async () => {
    try {
      let post = await GetPosts()
      post.data.map((post) => {
        setOptions((prev) => [...prev, { title: post.title, introduction: post.introduction, id: post.id }]);
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleInputChange = (e) => {
    const query = e.target.value.toLowerCase();
    setInputValue(e.target.value);

    if (query) {
      const filtered = options.filter((option) =>
        option.title.toLowerCase().includes(query)
      );
      setFilteredOptions(filtered);
      setIsDropdownVisible(true);

    } else {
      setFilteredOptions([]);
      setIsDropdownVisible(false);
    }
    console.log(options)
  };

  // Bir seçenek seçildiğinde
  const handleAddNewOption = () => {
    if (inputValue && !options.includes(inputValue)) {
      setOptions((prev) => [...prev, inputValue]);
      setCategory((prev) => [...prev, inputValue]);
      setInputValue("");
      setIsDropdownVisible(false);
    }
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownVisible(false);
    }
  };
  useEffect(() => {
    try {
      getSearchParams();
      window.document.addEventListener("mousedown", handleClickOutside);
      return () => window.document.removeEventListener("mousedown", handleClickOutside);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="h-full">
      <div className="flex items-center ">
        <input type="text" id="search_input"
          autoComplete="off"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => { if (inputValue.length > 0) setIsDropdownVisible(true) }}
          className="bg-white border border-black text-black text-base rounded-base px-1 focus:outline-none"
          placeholder="search..." required />
        <MdSearch className="text-black text-xl ms-2" />
      </div>
      <div className="relative w-full">
        {isDropdownVisible && (
          <ul
            className="absolute flex flex-col bg-white z-10 mt-1 w-full mx-auto text-black border border-gray-400  shadow-lg max-h-28 md:max-h-60  overflow-auto"
          >
            {filteredOptions.length > 0 && filteredOptions.map((option, index) => (
              <li
                key={index}
                onClick={() => { router.push("/post/" + option.id) }}
                className="cursor-pointer hover:bg-gray-200 px-3 py-2"
              >
                <a href={"/post/" + option.id} className="post-title text-sm font-bold hover:underline hover:underline-offset-8 hover:decoration-1 hover:decoration-dotted cursor-pointer">
                  {option.title}
                </a>

                <p className="text-black text-xs">
                  {option.introduction}
                </p>
              </li>))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Search