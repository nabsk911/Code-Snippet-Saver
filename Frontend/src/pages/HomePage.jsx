import FilterSnippets from "../components/FilterSnippets";
import { useState, useEffect, createContext } from "react";
import { getUserId } from "../utils/utils";
import { getUserCodeSnippets } from "../services/api";
import { LuLoader2 } from "react-icons/lu";

export const SnippetDataContext = createContext();

const HomePage = () => {
  const [snippetData, setSnippetData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const userId = getUserId();

  useEffect(() => {
    const getSnippets = async () => {
      try {
        setIsLoading(true);
        const response = await getUserCodeSnippets(userId);
        if (response) {
          setSnippetData(response.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getSnippets();
  }, [userId]);

  return (
    <div>
      <SnippetDataContext.Provider value={{ snippetData, setSnippetData }}>
        {isLoading ? (
          <div className="col-span-full flex items-center justify-center h-[100vh]">
            <LuLoader2 className="w-8 h-8 animate-spin text-foreground" />
            <span className="ml-2 text-3xl">Loading snippets...</span>
          </div>
        ) : (
          <FilterSnippets snippet={snippetData} />
        )}
      </SnippetDataContext.Provider>
    </div>
  );
};

export default HomePage;
