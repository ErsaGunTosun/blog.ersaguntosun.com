'use client';
import { useState, useRef, use, useEffect } from "react";

import { GetCategories } from "@/utils/blogAPIFunc";

const CategoriesDropdown = ({ category, setCategory }) => {
    const [inputValue, setInputValue] = useState("");
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [options, setOptions] = useState([]);
    const dropdownRef = useRef(null);

    const getAllCategories = async () => {
        try {
            let categories = await GetCategories()
            categories.data.map((category) => {
                setOptions((prev) => [...prev, category.name]);
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleInputChange = (e) => {
        const query = e.target.value.toLowerCase();
        setInputValue(e.target.value);

        if (query) {
            if(!category.includes(query)){
                const filtered = options.filter(
                    (option) =>
                        option.toLowerCase().includes(query) &&
                        !category.includes(option)
                );
                setFilteredOptions(filtered);
                setIsDropdownVisible(true);
            }
        } else {
            setFilteredOptions([]);
            setIsDropdownVisible(false);
        }

    };

    // Bir seçenek seçildiğinde
    const handleOptionClick = (option) => {
        if (!category.includes(option)) {
            setCategory((prev) => [...prev, option]);
            setInputValue("");
            setFilteredOptions([]);
            setIsDropdownVisible(false);
        }
    };

    const handleBadgeRemove = (option) => {
        setCategory((prev) => prev.filter((item) => item !== option));
    };

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
            getAllCategories();
            window.document.addEventListener("mousedown", handleClickOutside);
            return () => window.document.removeEventListener("mousedown", handleClickOutside);
        } catch (error) {
            console.log(error);
        }
    }, []);



    return (
        <div className="relative w-full custom-border" ref={dropdownRef}>
            <div className="flex items-center flex-wrap gap-2 border border-gray-500 rounded-md py-2.5 bg-transparent">

                {category?.map((option, index) => (
                    <span
                        key={index}
                        className="flex items-center px-3 py-1 text-sm text-gray-800 bg-gray-100 rounded"
                    >
                        {option}
                        <button
                            onClick={() => handleBadgeRemove(option)}
                            className="ml-2 text-black hover:text-gray-300"
                        >
                            &times;
                        </button>
                    </span>
                ))}

                <div className="relative flex-1">
                    <input
                        autoComplete="off"
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onFocus={() => { if (inputValue.length > 0) setIsDropdownVisible(true) }}
                        id="floating_category"
                        name="floating_category"
                        placeholder=""
                        className="block appearance-non w-full peer bg-transparent text-sm text-black focus:outline-none placeholder:text-gray-500"
                    />
                    <label htmlFor="floating_category" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 bottom-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Category to search...</label>
                </div>
            </div>

            {/* Dropdown */}
            {isDropdownVisible && (
                <ul
                    className="absolute z-10 mt-1 w-full bg-white text-black border border-gray-400  shadow-lg max-h-60 overflow-auto"
                >
                    {filteredOptions.length > 0 ? filteredOptions.map((option, index) => (
                        <li
                            key={index}
                            onClick={() => handleOptionClick(option)}
                            className="cursor-pointer hover:bg-gray-200 px-3 py-2"
                        >
                            {option}
                        </li>))
                        :
                        (<li
                            onClick={handleAddNewOption}
                            className="cursor-pointer hover:bg-gray-200 px-3 py-2"
                        >
                            Add "{inputValue}" to the list
                        </li>
                        )}
                </ul>
            )}
        </div>
    );
};

export default CategoriesDropdown;
