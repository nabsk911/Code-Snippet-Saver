import { useState, useEffect } from "react";
import SnippetCard from "./SnippetsCard";
import HeaderContent from "../layout/HeaderContent";
import { LuLoader2 } from "react-icons/lu";

const FilterSnippets = ({ snippet }) => {
  const [filteredSnippets, setFilteredSnippets] = useState(snippet);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState({ type: null, value: null });
  const [isLoading, setIsLoading] = useState(true);

  // Handle general search by text
  const handleSearch = (query) => {
    setSearchQuery(query);
    setActiveFilter({ type: null, value: null });
  };

  // Handle filtering by tag
  const handleTagFilter = (tag) => {
    setActiveFilter({ type: "tag", value: tag });
    setSearchQuery("");
  };

  // Handle filtering by language
  const handleLanguageFilter = (language) => {
    setActiveFilter({ type: "language", value: language });
    setSearchQuery("");
  };

  // Effect to simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Effect to handle filtering
  useEffect(() => {
    let filtered = snippet;

    // Prioritize active filters first
    if (activeFilter.type === "tag") {
      filtered = snippet.filter((s) =>
        s.tags.some(
          (t) =>
            typeof t === "object" &&
            t.tag.toLowerCase() === activeFilter.value.toLowerCase()
        )
      );
    } else if (activeFilter.type === "language") {
      filtered = snippet.filter(
        (s) => s.language.toLowerCase() === activeFilter.value.toLowerCase()
      );
    } else if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase().trim();
      filtered = snippet.filter((s) => {
        const titleWords = s.title.toLowerCase().split(/\s+/);
        const tagsWords = s.tags.map((tag) =>
          typeof tag === "object" ? tag.tag.toLowerCase() : tag.toLowerCase()
        );
        const languageWords = s.language.toLowerCase().split(/\s+/);

        const titleMatch = titleWords.some((word) =>
          word.startsWith(lowerCaseQuery)
        );
        const tagsMatch = tagsWords.some((tag) =>
          tag.startsWith(lowerCaseQuery)
        );
        const languageMatch = languageWords.some((language) =>
          language.startsWith(lowerCaseQuery)
        );
        return titleMatch || tagsMatch || languageMatch;
      });
    }

    setFilteredSnippets(filtered);
  }, [searchQuery, snippet, activeFilter]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="col-span-full flex items-center justify-center h-[70vh]">
          <LuLoader2 className="w-8 h-8 animate-spin text-foreground" />
          <span className="ml-2 text-lg">Loading snippets...</span>
        </div>
      );
    }

    if (!snippet || snippet.length === 0) {
      return (
        <div className="col-span-full flex items-center justify-center h-[70vh]">
          <p className="text-lg text-foreground">Create a new snippet!</p>
        </div>
      );
    }

    if (filteredSnippets.length === 0 && searchQuery) {
      return (
        <div className="col-span-full flex items-center justify-center h-[70vh]">
          <p className="text-lg text-foreground">Snippet not found</p>
        </div>
      );
    }

    return filteredSnippets.map((snippet) => (
      <SnippetCard
        key={snippet.id}
        snippetid={snippet.id}
        title={snippet.title}
        description={snippet.description}
        tags={snippet.tags}
        language={snippet.language}
        createdAt={snippet.createdAt}
        code={snippet.code}
      />
    ));
  };

  return (
    <div className="px-4 md:px-8 lg:px-16">
      <HeaderContent
        onSearch={handleSearch}
        onTagFilter={handleTagFilter}
        onLanguageFilter={handleLanguageFilter}
      />

      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4 mt-28 mb-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default FilterSnippets;
