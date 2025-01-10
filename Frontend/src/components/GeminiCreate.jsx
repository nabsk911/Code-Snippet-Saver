import { useState } from "react";
import { createCodeSnippet } from "../services/api";
import { getUserId } from "../utils/utils";
import { useContext } from "react";
import { SnippetDataContext } from "../pages/HomePage";
import { toast } from "sonner";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { languageIcons, AllLanguages } from "../utils/utils";

const GeminiCreate = () => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const userId = getUserId();
  const { snippetData, setSnippetData } = useContext(SnippetDataContext);
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const apikey = import.meta.env.VITE_GEMINI_API;

  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apikey}`;

  const handleSelectChange = (selectedLang) => {
    setSelectedLanguage(selectedLang);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputValue.trim() === "") {
      toast.info("Please enter your request");
      return; // Prevent submitting if input is empty
    }

    if (!selectedLanguage) {
      toast.info("Please select a language");
      return;
    }

    setLoading(true); // Set loading state

    try {
      const requestBody = {
        contents: [
          {
            parts: [{ text: `${inputValue} in ${selectedLanguage}` }],
          },
        ],
        generationConfig: {
          response_mime_type: "application/json",
          response_schema: {
            type: "object",
            properties: {
              code: { type: "string" },
              description: { type: "string" },
              language: { type: "string" },
              tags: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    tag: { type: "string" },
                  },
                  required: ["tag"],
                },
              },
              title: { type: "string" },
            },
            required: ["code", "description", "language", "tags", "title"],
          },
        },
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch data from API. Status: ${response.status}`
        );
      }

      const data = await response.json();
      const generatedSnippet = data.candidates[0].content.parts[0].text;
      const snippetDataInput = JSON.parse(generatedSnippet);

      snippetDataInput.language = snippetDataInput.language
        .split(",")[0]
        .trim()
        .toLowerCase();

      const responseServer = await createCodeSnippet(snippetDataInput, userId);

      toast.success("Snippet created successfully!");
      setSnippetData([responseServer, ...snippetData]);
      setInputValue("");
      setSelectedLanguage("");
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      toast.error(
        "An error occurred while creating the snippet. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-0 bg-background w-full px-4 md:px-8 lg:px-16">
      <div className=" relative flex flex-col h-28 rounded-lg border-2 border-border bg-background p-3">
        <form onSubmit={handleSubmit} className=" flex w-full gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Create snippet with AI..."
            disabled={loading}
            className="flex-1 bg-background p-2 text-foreground focus:outline-none"
          />
          <Button
            type="submit"
            disabled={loading}
            className="bg-primary px-4 text-secondary rounded-lg"
          >
            {loading ? "Creating..." : "Submit"}
          </Button>

          <div className="mt-2">
            <Select
              value={selectedLanguage}
              onValueChange={handleSelectChange}
              required
            >
              <SelectTrigger className="absolute bottom-2 z-20 bg-accent w-max border-none left-4 ">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>

              <SelectContent className="max-h-48">
                {AllLanguages.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    <div className="flex items-center gap-2">
                      {languageIcons[lang]}
                      <span>{lang}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </form>
      </div>
      <p className="flex justify-center text-sm sm:text-base">
        You have limited requests, make sure to double check the prompt before
        submitting.
      </p>
    </div>
  );
};

export default GeminiCreate;
