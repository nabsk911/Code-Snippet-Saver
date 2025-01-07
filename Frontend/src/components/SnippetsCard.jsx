import React, { useState } from "react";
import DeleteSnippet from "./DeleteSnippet";
import ViewModal from "../modals/ViewModal";
import { languageIcons } from "../utils/utils";
import { formatDate } from "../utils/utils";

// Tags component for rendering tags
const Tags = ({ tags }) => (
  <div className="flex flex-wrap gap-1 sm:gap-2">
    {tags.map((tagObj, index) => (
      <span
        key={index}
        className="text-xs sm:text-sm px-2 sm:px-3 py-1 bg-accent text-accent-foreground rounded-lg"
      >
        {tagObj.tag}
      </span>
    ))}
  </div>
);

// Snippet card component
const SnippetsCard = ({
  title,
  description,
  language,
  code,
  tags,
  createdAt,
  snippetid,
}) => {
  const [showViewModal, setShowViewModal] = useState(false);

  return (
    <div
      className="border-2 border-border bg-card rounded-lg p-3 sm:p-4 cursor-pointer h-full hover:shadow-md transition-shadow"
      onClick={() => {
        setShowViewModal(true);
      }}
    >
      <div className="space-y-2 sm:space-y-3">
        {/* Title */}
        <p className="text-lg sm:text-2xl font-semibold ">{title}</p>

        {/* Tags */}
        <Tags tags={tags} />

        {/* Description */}
        <p className="text-sm sm:text-lg line-clamp-2">{description}</p>

        {/* Language */}
        <p className="text-xs sm:text-sm px-2 sm:px-3 py-1 bg-accent text-accent-foreground rounded-lg w-max flex items-center">
          {languageIcons[language]}{" "}
          <span className="ml-1 sm:ml-2">{language}</span>
        </p>
      </div>

      {/* Card Footer */}
      <div className="flex justify-between gap-3 sm:gap-4 mt-3 sm:mt-4 items-center">
        <p className="text-xs sm:text-sm">{formatDate(createdAt)}</p>

        {/* Delete Button */}
        <DeleteSnippet snippetId={snippetid} />
      </div>

      {/* View Modal */}
      <ViewModal
        setShowViewModal={setShowViewModal}
        showViewModal={showViewModal}
        snippetData={{
          title,
          description,
          language,
          tags,
          code,
          id: snippetid,
        }}
      />
    </div>
  );
};

export default SnippetsCard;
