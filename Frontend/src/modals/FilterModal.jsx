import React, { useContext } from "react";
import { LuArrowUpRight } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { SnippetDataContext } from "../pages/HomePage";
import { languageIcons } from "../utils/utils";

const FilterModal = ({ onTagClick, onLanguageClick }) => {
  const { snippetData } = useContext(SnippetDataContext);

  if (snippetData.length === 0) return null;

  const tags = new Set();
  const languages = new Set();

  snippetData.forEach((snippet) => {
    snippet.tags.forEach((tagObj) => tags.add(tagObj.tag));
    languages.add(
      typeof snippet.languages === "object"
        ? snippet.language.name
        : snippet.language
    );
  });

  const uniqueTags = Array.from(tags);
  const uniqueLanguages = Array.from(languages);

  return (
    <div className="border border-border rounded-lg p-4 bg-background shadow-lg w-full">
      <div className="flex flex-col gap-4">
        {/* Tags Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Tags</h3>
          <div className="overflow-x-auto">
            <div className="flex gap-2 pb-2 min-w-min">
              {uniqueTags.map((tag) => (
                <button
                  key={tag}
                  className="inline-flex items-center px-3 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors whitespace-nowrap"
                  onMouseDown={() => onTagClick(tag)}
                >
                  <LuArrowUpRight className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span>{tag}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Languages Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Languages</h3>
          <div className="max-h-[175px] overflow-y-auto">
            <div className="space-y-1 pr-2">
              {uniqueLanguages.map((language) => (
                <Button
                  variant="outline"
                  key={language}
                  onMouseDown={() => onLanguageClick(language)}
                  className="w-full flex items-center justify-start py-2 px-4 rounded-lg hover:bg-accent/10 transition-colors"
                >
                  {languageIcons[language]}
                  <span className="ml-2">{language}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
