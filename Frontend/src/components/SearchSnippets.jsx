import { LuSearch, LuX } from "react-icons/lu";
import { useState, useRef, useEffect } from "react";
import FilterModal from "@/modals/FilterModal";
import { useSnippetFilter } from "./FilterSnippets";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [showPopover, setShowPopover] = useState(false);
  const inputRef = useRef(null);
  const debounceTimer = useRef(null); // Timer reference for debounce
  const { handleSearch, handleTagFilter, handleLanguageFilter } =
    useSnippetFilter();

  // Update query and handle debounced search
  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    // Clear the previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Set a new debounce timer
    debounceTimer.current = setTimeout(() => {
      handleSearch(newQuery);
    }, 300);

    setShowPopover(inputRef.current === document.activeElement && !newQuery);
  };

  // Clear search and reset popover
  const clearSearch = () => {
    setQuery("");
    handleSearch(""); // Trigger immediate clear
    setShowPopover(false);
  };

  // Toggle popover based on focus/blur state
  const handleFocus = () => setShowPopover(true);
  const handleBlur = () => {
    setTimeout(() => {
      if (!query) setShowPopover(false);
    }, 100);
  };

  // Handle filtering by tag or language
  const handleTagClick = (tag) => {
    setQuery(tag);
    handleTagFilter(tag);
    setShowPopover(false);
  };

  const handleLanguageClick = (language) => {
    setQuery(language);
    handleLanguageFilter(language);
    setShowPopover(false);
  };

  // Cleanup debounce timer on component unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full flex items-center">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Search snippets..."
        className="w-full p-3 pl-10 bg-background rounded-lg outline-none focus:outline-ring border border-border"
      />
      <LuSearch className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2" />
      {query && (
        <LuX
          className="w-6 h-6 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
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
