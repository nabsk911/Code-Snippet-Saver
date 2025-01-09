import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import CreateModal from "../modals/CreateModal";

import SearchSnippets from "../components/SearchSnippets";
import UserButton from "@/components/UserButton";

const HeaderContent = () => {
  // State and context hooks
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background py-6 px-4 md:px-8 lg:px-16 flex justify-between items-center gap-4 md:gap-12 ">
      <UserButton />

      {/* Search component */}
      <SearchSnippets />

      {/* Create button to open the modal */}
      <Button onClick={() => setOpen(true)} className="text-sm  md:text-lg">
        Create
      </Button>

      {/* Modal for creating snippets */}
      <CreateModal open={open} onOpenChange={setOpen} />
    </div>
  );
};

export default HeaderContent;
