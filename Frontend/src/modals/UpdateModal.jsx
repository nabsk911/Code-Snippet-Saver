import { updateCodeSnippet } from "../services/api"; // API service for updating
import CreateUpdateInput from "../components/ui/CreateUpdateInput";
import { getUserId } from "../utils/utils";
import { useContext } from "react";
import { SnippetDataContext } from "../pages/HomePage"; // Import the context
import { toast } from "sonner";

const UpdateModal = ({ open, onOpenChange, initialData }) => {
  if (!open) {
    return null;
  }

  const userId = getUserId();
  const { setSnippetData, snippetData } = useContext(SnippetDataContext);

  const handleSubmit = async (updatedSnippetData) => {
    try {
      const response = await updateCodeSnippet(
        initialData,
        updatedSnippetData,
        userId
      );
      // Update the snippet data state
      setSnippetData(
        snippetData.map((snippet) =>
          snippet.id === response.id ? response : snippet
        )
      );

      // Close the modal and show success toast
      onOpenChange(false);
      toast.success("Snippet updated successfully");
    } catch (error) {
      console.error("Error updating snippet:", error);
      toast.error("Error updating snippet");
    }
  };

  return (
    <CreateUpdateInput
      onSubmit={handleSubmit}
      open={open}
      onOpenChange={onOpenChange}
      initialData={initialData} // Prepopulate with existing data
      modalTitle="Update Snippet"
      submitButtonText="Update"
    />
  );
};

export default UpdateModal;
