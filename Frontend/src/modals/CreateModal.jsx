import { createCodeSnippet } from "../services/api";
import CreateUpdateInput from "../components/ui/CreateUpdateInput";
import { getUserId } from "../utils/utils";
import { useContext } from "react";
import { SnippetDataContext } from "../pages/HomePage";
import { toast } from "sonner";

const CreateModal = ({ open, onOpenChange }) => {
  const userId = getUserId();
  const { snippetData, setSnippetData } = useContext(SnippetDataContext);

  const handleSubmit = async (snippetDataInput) => {
    try {
      const response = await createCodeSnippet(snippetDataInput, userId);

      // console.log("Snippet created:", snippetDataInput);
      // Update the snippetData state with the new snippet
      setSnippetData([response, ...snippetData]);
      // console.log("snippet data server", response);
      toast.success("Snippet created successfully!");
      // Close the modal
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating snippet:", error);
    }
  };

  return (
    <CreateUpdateInput
      onSubmit={handleSubmit}
      open={open}
      onOpenChange={onOpenChange}
      modalTitle="Create Snippet"
      submitButtonText="Create"
      initialData={{}}
    />
  );
};

export default CreateModal;
