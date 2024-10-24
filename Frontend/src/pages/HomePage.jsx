import FilterSnippets from "../components/FilterSnippets";
import { useState, useEffect, createContext } from "react";
import { getUserId } from "../utils/utils";
import { getUserCodeSnippets } from "../services/api";

export const SnippetDataContext = createContext();

const HomePage = () => {
  const [snippetData, setSnippetData] = useState([]);
  const userId = getUserId();

  useEffect(() => {
    const getSnippets = async () => {
      try {
        const response = await getUserCodeSnippets(userId);
        if (response) {
          setSnippetData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getSnippets();
  }, [userId]);

  return (
    <div>
      <SnippetDataContext.Provider value={{ snippetData, setSnippetData }}>
        <FilterSnippets snippet={snippetData} />
      </SnippetDataContext.Provider>
    </div>
  );
};

export default HomePage;
