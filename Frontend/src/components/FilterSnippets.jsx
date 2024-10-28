import { useState, useMemo, useContext, createContext } from "react";
import SnippetCard from "./SnippetsCard";
import HeaderContent from "../layout/HeaderContent";

const SnippetFilterContext = createContext();

export const useSnippetFilter = () => useContext(SnippetFilterContext);

const FilterSnippets = ({ snippet }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState({ type: null, value: null });

  const filteredSnippets = useMemo(() => {
    let filtered = [...snippet].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    if (activeFilter.type === "tag") {
      filtered = filtered.filter((s) =>
        s.tags.some(
          (t) => t.tag.toLowerCase() === activeFilter.value.toLowerCase()
        )
      );
    } else if (activeFilter.type === "language") {
      filtered = filtered.filter(
        (s) => s.language.toLowerCase() === activeFilter.value.toLowerCase()
      );
    }

    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((s) => {
        const titleMatch = s.title.toLowerCase().includes(lowerCaseQuery);
        const tagsMatch = s.tags.some((tag) =>
          tag.tag.toLowerCase().includes(lowerCaseQuery)
        );
        const languageMatch = s.language.toLowerCase().includes(lowerCaseQuery);

        return titleMatch || tagsMatch || languageMatch;
      });
    }

    return filtered;
  }, [searchQuery, snippet, activeFilter]);

  // Handlers
  const handleSearch = (query) => {
    setSearchQuery(query);
    setActiveFilter({ type: null, value: null });
  };

  const handleTagFilter = (tag) => {
    setActiveFilter({ type: "tag", value: tag });
    setSearchQuery("");
  };

  const handleLanguageFilter = (language) => {
    setActiveFilter({ type: "language", value: language });
    setSearchQuery("");
  };

  const renderContent = () => {
    if (filteredSnippets.length === 0 && searchQuery) {
      return (
        <div className="col-span-full flex items-center justify-center h-[70vh]">
          <p className="text-3xl">Snippet not found!</p>
        </div>
      );
    }

    if (snippet.length === 0) {
      return (
        <div className="col-span-full flex items-center justify-center h-[70vh]">
          <p className="text-3xl">Create a snippet.</p>
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
      <SnippetFilterContext.Provider
        value={{
          handleSearch,
          handleTagFilter,
          handleLanguageFilter,
        }}
      >
        <HeaderContent />
      </SnippetFilterContext.Provider>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-28 mb-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default FilterSnippets;
