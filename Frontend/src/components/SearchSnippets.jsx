import { LuSearch, LuX } from "react-icons/lu";

import { useState, useRef } from "react";
import FilterModal from "@/modals/FilterModal";
const SearchBar = ({ onSearch, onTagFilter, onLanguageFilter }) => {
  const [query, setQuery] = useState("");
  const [showPopover, setShowPopover] = useState(false);
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
    setShowPopover(inputRef.current === document.activeElement && !newQuery);
  };

  const clearSearch = () => {
    setQuery("");
    onSearch("");
    setShowPopover(false);
  };

  const handleInputFocus = () => {
    setShowPopover(true);
  };

  const handleInputBlur = () => {
    if (!query) {
      setShowPopover(false);
    }
  };

  // Directly filter by tag
  const handleTagClick = (tag) => {
    setQuery(tag);
    onTagFilter(tag);
    setShowPopover(false);
  };

  // Directly filter by language
  const handleLanguageClick = (language) => {
    setQuery(language);
    onLanguageFilter(language);
    setShowPopover(false);
  };

  return (
    <div className="relative w-full flex items-center">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder="Search snippets..."
        className="w-full p-3 pl-10  bg-background text-foreground rounded-lg outline-none focus:outline-ring border border-border"
      />
      <LuSearch className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground" />
      {query && (
        <LuX
          className="w-6 h-6 absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground cursor-pointer"
          onClick={clearSearch}
        />
      )}
      {showPopover && (
        <div className="absolute top-14 w-full">
          <FilterModal
            onTagClick={handleTagClick}
            onLanguageClick={handleLanguageClick}
          />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
