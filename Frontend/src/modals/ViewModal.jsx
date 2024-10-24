import React, { useState, useEffect } from "react";
import { LuClipboard, LuClipboardCheck } from "react-icons/lu";
import CodeHighlighter from "../components/CodeHighlighter";
import UpdateModal from "../modals/UpdateModal";
import { Button } from "@/components/ui/button";

const ViewModal = ({ snippetData, showViewModal, setShowViewModal }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    if (isCopied) {
      const timeoutId = setTimeout(() => setIsCopied(false), 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [isCopied]);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(snippetData.code).then(() => {
      setIsCopied(true);
    });
  };

  const handleShowUpdate = (e) => {
    e.stopPropagation(); // Prevent closing the modal when clicking inside
    setShowUpdateModal(true);
    setShowViewModal(false);
  };

  const handleCloseModals = (e) => {
    e.stopPropagation();
    setShowViewModal(false);
  };

  const primaryLanguage = snippetData.language?.toLowerCase() || "text";

  return (
    <>
      <div
        className={`fixed inset-0 flex justify-center items-center bg-black/50 ${
          showViewModal ? "block" : "hidden"
        }`}
        onClick={handleCloseModals}
      >
        <div
          className="bg-background border border-border rounded-lg max-h-full p-6 w-full space-y-4 max-w-xl"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal content
        >
          <p className="text-xl md:text-3xl font-bold">{snippetData.title}</p>

          <div className="flex flex-wrap gap-2">
            {snippetData.tags.map((tagObj, index) => (
              <span
                key={index}
                className="text-sm md:text-lg px-3 py-1 bg-accent rounded-lg text-foreground"
              >
                {tagObj.tag}
              </span>
            ))}
          </div>

          <p className="text-base md:text-xl">{snippetData.description}</p>

          <div className="mt-5">
            <strong className="text-sm md:text-lg">Code:</strong>
            <div className="mt-2 rounded relative">
              <div className="flex justify-between items-center p-3 z-10 bg-accent text-accent-foreground absolute w-full text rounded-t-lg">
                <span>{primaryLanguage}</span>
                <button
                  onClick={handleCopyToClipboard}
                  className="flex items-center text-sm"
                >
                  {isCopied ? (
                    <LuClipboardCheck className="w-5 h-5 mr-2" />
                  ) : (
                    <LuClipboard className="w-5 h-5 mr-2" />
                  )}
                  <span>{isCopied ? "Copied!" : "Copy code"}</span>
                </button>
              </div>
              <CodeHighlighter
                code={snippetData.code}
                language={primaryLanguage}
              />
            </div>
          </div>

          <div className="mt-4 flex gap-4 justify-end">
            <Button onClick={handleShowUpdate}>Edit</Button>
            <Button onClick={handleCloseModals} variant="outline">
              Close
            </Button>
          </div>
        </div>
      </div>

      <UpdateModal
        open={showUpdateModal}
        onOpenChange={() => setShowUpdateModal(false)}
        initialData={{
          title: snippetData.title,
          description: snippetData.description,
          language: snippetData.language,
          tags: snippetData.tags,
          code: snippetData.code,
          id: snippetData.id,
        }}
      />
    </>
  );
};

export default ViewModal;
